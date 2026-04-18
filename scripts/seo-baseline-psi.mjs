#!/usr/bin/env node
// PSI baseline — обращается к PageSpeed Insights API без ключа (rate-limited, но сайт маленький).
// Для 7 страниц × 2 стратегии = 14 запросов ~ 5-7 минут.
//
// Usage: node scripts/seo-baseline-psi.mjs [outDir]

import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR =
  process.argv[2] || "../seo_work_reports/attachments/sprint_00";

const PAGES = [
  { slug: "home_uk", url: "https://vash-advokat.org/", type: "Home (hero)" },
  { slug: "home_ru", url: "https://vash-advokat.org/ru/", type: "Home (hero)" },
  { slug: "blog_list_uk", url: "https://vash-advokat.org/blog/", type: "Blog list" },
  { slug: "blog_list_ru", url: "https://vash-advokat.org/ru/blog/", type: "Blog list" },
  {
    slug: "article_7oznak_uk",
    url: "https://vash-advokat.org/blog/7-oznak-shahrajstva/",
    type: "Blog article",
  },
  {
    slug: "article_7oznak_ru",
    url: "https://vash-advokat.org/ru/blog/7-oznak-shahrajstva/",
    type: "Blog article",
  },
  {
    slug: "article_abonement_uk",
    url: "https://vash-advokat.org/blog/abonement-yak-pratsuye/",
    type: "Blog article",
  },
];

const STRATEGIES = ["mobile", "desktop"];

const runPsi = async (url, strategy) => {
  const api = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&category=performance`;
  const res = await fetch(api);
  if (!res.ok) throw new Error(`PSI ${res.status}: ${await res.text()}`);
  const json = await res.json();
  const audits = json.lighthouseResult?.audits || {};
  const metrics = json.lighthouseResult?.audits?.metrics?.details?.items?.[0] || {};
  return {
    fetchedAt: new Date().toISOString(),
    url,
    strategy,
    performanceScore: json.lighthouseResult?.categories?.performance?.score ?? null,
    // Lab metrics (из Lighthouse)
    lcp_ms: audits["largest-contentful-paint"]?.numericValue ?? null,
    fcp_ms: audits["first-contentful-paint"]?.numericValue ?? null,
    tbt_ms: audits["total-blocking-time"]?.numericValue ?? null,
    cls: audits["cumulative-layout-shift"]?.numericValue ?? null,
    si_ms: audits["speed-index"]?.numericValue ?? null,
    tti_ms: audits["interactive"]?.numericValue ?? null,
    // CrUX field data (реальные пользователи)
    cruxLcp_ms:
      json.loadingExperience?.metrics?.LARGEST_CONTENTFUL_PAINT_MS?.percentile ?? null,
    cruxFcp_ms:
      json.loadingExperience?.metrics?.FIRST_CONTENTFUL_PAINT_MS?.percentile ?? null,
    cruxInp_ms:
      json.loadingExperience?.metrics?.INTERACTION_TO_NEXT_PAINT?.percentile ?? null,
    cruxCls:
      json.loadingExperience?.metrics?.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile
        ? json.loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile / 100
        : null,
    cruxHasData: Boolean(json.loadingExperience?.metrics),
    rawJsonPath: null, // filled below
  };
};

const main = async () => {
  mkdirSync(OUT_DIR, { recursive: true });
  const summary = [];

  for (const page of PAGES) {
    for (const strategy of STRATEGIES) {
      const label = `${page.slug}_${strategy}`;
      process.stdout.write(`  ${label} (${page.url}) ... `);
      try {
        const r = await runPsi(page.url, strategy);
        r.slug = page.slug;
        r.pageType = page.type;
        summary.push(r);
        const score = r.performanceScore != null ? Math.round(r.performanceScore * 100) : "?";
        const lcp = r.lcp_ms ? (r.lcp_ms / 1000).toFixed(2) + "s" : "?";
        const cls = r.cls != null ? r.cls.toFixed(3) : "?";
        process.stdout.write(`perf=${score} LCP=${lcp} CLS=${cls}\n`);
      } catch (e) {
        process.stdout.write(`ERROR: ${e.message}\n`);
        summary.push({ slug: page.slug, strategy, url: page.url, error: e.message });
      }
      await new Promise((r) => setTimeout(r, 2000)); // throttle
    }
  }

  const outFile = join(OUT_DIR, "psi_baseline.json");
  writeFileSync(outFile, JSON.stringify({ runAt: new Date().toISOString(), results: summary }, null, 2));
  console.log(`\nSaved: ${outFile}`);
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
