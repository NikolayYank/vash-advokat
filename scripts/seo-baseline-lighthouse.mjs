#!/usr/bin/env node
// Lighthouse baseline (замена PSI API, которое требует ключ).
// Запускает lighthouse CLI через npx для каждой страницы × (mobile, desktop).
// Сохраняет полный JSON каждого прогона + сводный psi_baseline_summary.json.
//
// Usage: node scripts/seo-baseline-lighthouse.mjs [outDir]

import { execFileSync } from "node:child_process";
import { writeFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
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

const runLighthouse = (url, strategy, outPath) => {
  const args = [
    "--yes",
    "lighthouse",
    url,
    `--form-factor=${strategy}`,
    "--throttling-method=simulate",
    "--only-categories=performance",
    "--chrome-flags=--headless=new --no-sandbox",
    "--output=json",
    `--output-path=${outPath}`,
    "--quiet",
  ];
  // Use preset=desktop for desktop strategy to get correct settings
  if (strategy === "desktop") {
    args.push("--preset=desktop");
  }
  execFileSync("npx", args, { stdio: "inherit" });
};

const extractMetrics = (jsonPath) => {
  const j = JSON.parse(readFileSync(jsonPath, "utf8"));
  const a = j.audits;
  return {
    performanceScore: j.categories.performance.score,
    lcp_ms: a["largest-contentful-paint"]?.numericValue ?? null,
    lcp_display: a["largest-contentful-paint"]?.displayValue ?? null,
    fcp_ms: a["first-contentful-paint"]?.numericValue ?? null,
    fcp_display: a["first-contentful-paint"]?.displayValue ?? null,
    cls: a["cumulative-layout-shift"]?.numericValue ?? null,
    tbt_ms: a["total-blocking-time"]?.numericValue ?? null,
    tbt_display: a["total-blocking-time"]?.displayValue ?? null,
    si_ms: a["speed-index"]?.numericValue ?? null,
    si_display: a["speed-index"]?.displayValue ?? null,
    tti_ms: a["interactive"]?.numericValue ?? null,
    // Opportunities для диагностики
    opportunities: Object.entries(a)
      .filter(
        ([_, v]) =>
          v.details?.type === "opportunity" &&
          v.numericValue &&
          v.numericValue > 100
      )
      .map(([k, v]) => ({
        id: k,
        title: v.title,
        savings_ms: v.numericValue,
      }))
      .sort((a, b) => b.savings_ms - a.savings_ms)
      .slice(0, 5),
  };
};

const main = async () => {
  mkdirSync(OUT_DIR, { recursive: true });
  const summary = [];

  for (const page of PAGES) {
    for (const strategy of STRATEGIES) {
      const label = `${page.slug}_${strategy}`;
      const outPath = join(OUT_DIR, `lighthouse_${label}.json`);
      process.stdout.write(`\n→ ${label} (${page.url}) ... `);
      try {
        if (!existsSync(outPath)) {
          runLighthouse(page.url, strategy, outPath);
        } else {
          process.stdout.write("[cached] ");
        }
        const m = extractMetrics(outPath);
        m.slug = page.slug;
        m.strategy = strategy;
        m.url = page.url;
        m.pageType = page.type;
        m.reportPath = `lighthouse_${label}.json`;
        summary.push(m);
        const score = m.performanceScore != null ? Math.round(m.performanceScore * 100) : "?";
        console.log(
          `perf=${score} LCP=${m.lcp_display} CLS=${(m.cls ?? 0).toFixed(3)} TBT=${m.tbt_display}`
        );
      } catch (e) {
        console.log(`ERROR: ${e.message}`);
        summary.push({ slug: page.slug, strategy, url: page.url, error: e.message });
      }
    }
  }

  const outFile = join(OUT_DIR, "psi_baseline_summary.json");
  writeFileSync(
    outFile,
    JSON.stringify({ runAt: new Date().toISOString(), tool: "lighthouse-cli", results: summary }, null, 2)
  );
  console.log(`\nSaved: ${outFile}`);
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
