#!/usr/bin/env node
// SEO baseline crawl — читает sitemap.xml, для каждого URL собирает:
// status, title, H1 count, meta description, canonical, hreflang, internal links count, image alt coverage, response time.
// Без внешних зависимостей — встроенный fetch (Node 20+) + regex-парсинг.
//
// Usage: node scripts/seo-baseline-crawl.mjs [sitemapUrl] [outFile]
// Default: https://vash-advokat.org/sitemap.xml → ../seo_work_reports/attachments/sprint_00/crawl_baseline.json

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const SITEMAP = process.argv[2] || "https://vash-advokat.org/sitemap.xml";
const OUT = process.argv[3] || "../seo_work_reports/attachments/sprint_00/crawl_baseline.json";
const ORIGIN = new URL(SITEMAP).origin;

const extract = (html, regex, group = 1) => {
  const m = html.match(regex);
  return m ? m[group].trim() : null;
};
const extractAll = (html, regex) => [...html.matchAll(regex)];

const parseUrl = async (url) => {
  const t0 = Date.now();
  try {
    // Первый запрос — no-follow, чтобы зафиксировать 301/302
    const firstRes = await fetch(url, { redirect: "manual" });
    const firstStatus = firstRes.status;
    const firstLocation = firstRes.headers.get("location");

    const redirectChain = [];
    let finalUrl = url;
    let finalStatus = firstStatus;
    let res = firstRes;

    if (firstStatus >= 300 && firstStatus < 400 && firstLocation) {
      redirectChain.push({ from: url, to: firstLocation, status: firstStatus });
      const followed = await fetch(firstLocation, { redirect: "follow" });
      finalUrl = followed.url;
      finalStatus = followed.status;
      res = followed;
    }

    const responseTime = Date.now() - t0;
    const status = finalStatus;

    if (status >= 300 && status < 400) {
      return { url, status, redirectChain, responseTime };
    }

    const html = await res.text();
    const contentLength = html.length;

    const title = extract(html, /<title[^>]*>([^<]*)<\/title>/i);
    const metaDescription = extract(
      html,
      /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i
    );
    const canonical = extract(
      html,
      /<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i
    );
    const htmlLang = extract(html, /<html[^>]*\slang=["']([^"']*)["']/i);

    const h1Matches = extractAll(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/gi);
    const h1Count = h1Matches.length;
    const h1Text = h1Matches.map((m) => m[1].replace(/<[^>]+>/g, "").trim());

    const h2Count = extractAll(html, /<h2\b[^>]*>/gi).length;
    const h3Count = extractAll(html, /<h3\b[^>]*>/gi).length;

    const hreflangs = extractAll(
      html,
      /<link\s+rel=["']alternate["']\s+hreflang=["']([^"']*)["']\s+href=["']([^"']*)["']/gi
    ).map((m) => ({ hreflang: m[1], href: m[2] }));

    const links = extractAll(html, /<a\b[^>]*\shref=["']([^"']+)["'][^>]*>/gi).map(
      (m) => m[1]
    );
    const internalLinks = links.filter((href) => {
      if (href.startsWith("/") && !href.startsWith("//")) return true;
      try {
        return new URL(href, url).origin === ORIGIN;
      } catch {
        return false;
      }
    });
    const externalLinks = links.filter((href) => {
      try {
        return new URL(href, url).origin !== ORIGIN;
      } catch {
        return false;
      }
    });

    const images = extractAll(html, /<img\b[^>]*>/gi);
    const imagesWithAlt = images.filter((m) => {
      const tag = m[0];
      const altMatch = tag.match(/\salt=["']([^"']*)["']/i);
      return altMatch && altMatch[1].trim().length > 0;
    });
    const imgTotal = images.length;
    const imgAltOk = imagesWithAlt.length;

    // JSON-LD scripts
    const jsonLdBlocks = extractAll(
      html,
      /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
    ).map((m) => m[1].trim());

    // OG tags presence
    const ogTitle = extract(
      html,
      /<meta\s+property=["']og:title["']\s+content=["']([^"']*)["']/i
    );
    const ogImage = extract(
      html,
      /<meta\s+property=["']og:image["']\s+content=["']([^"']*)["']/i
    );

    return {
      url,
      finalUrl,
      redirectChain,
      status,
      responseTime,
      contentLength,
      title,
      titleLength: title ? title.length : 0,
      metaDescription,
      metaDescriptionLength: metaDescription ? metaDescription.length : 0,
      canonical,
      canonicalSelfRef: canonical === url || canonical === finalUrl,
      htmlLang,
      h1Count,
      h1Text,
      h2Count,
      h3Count,
      hreflangs,
      internalLinksCount: internalLinks.length,
      externalLinksCount: externalLinks.length,
      internalLinks: [...new Set(internalLinks)].slice(0, 50),
      imgTotal,
      imgAltOk,
      imgAltCoveragePct: imgTotal === 0 ? null : Math.round((imgAltOk / imgTotal) * 100),
      jsonLdCount: jsonLdBlocks.length,
      jsonLdTypes: jsonLdBlocks
        .map((raw) => {
          try {
            const parsed = JSON.parse(raw);
            const arr = Array.isArray(parsed) ? parsed : [parsed];
            return arr.map((x) => x["@type"] || "unknown").flat();
          } catch {
            return ["unparseable"];
          }
        })
        .flat(),
      ogTitle,
      ogImage,
    };
  } catch (err) {
    return { url, error: err.message, responseTime: Date.now() - t0 };
  }
};

const main = async () => {
  console.log(`Fetching sitemap: ${SITEMAP}`);
  const sitemapRes = await fetch(SITEMAP);
  const sitemapXml = await sitemapRes.text();
  const urls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  console.log(`Found ${urls.length} URLs. Crawling sequentially...\n`);

  const results = [];
  for (const url of urls) {
    process.stdout.write(`  ${url} ... `);
    const r = await parseUrl(url);
    results.push(r);
    if (r.error) process.stdout.write(`ERROR: ${r.error}\n`);
    else process.stdout.write(`${r.status} (${r.responseTime}ms)\n`);
  }

  const summary = {
    crawledAt: new Date().toISOString(),
    sitemap: SITEMAP,
    urlCount: urls.length,
    statusBreakdown: results.reduce((acc, r) => {
      const k = r.error ? "error" : r.status;
      acc[k] = (acc[k] || 0) + 1;
      return acc;
    }, {}),
    redirectCount: results.filter(
      (r) => r.redirectChain && r.redirectChain.length > 0
    ).length,
    issues: {
      noCanonical: results.filter((r) => !r.error && !r.canonical).length,
      canonicalMismatch: results.filter(
        (r) => !r.error && r.canonical && !r.canonicalSelfRef
      ).length,
      multipleH1: results.filter((r) => !r.error && r.h1Count > 1).length,
      missingH1: results.filter((r) => !r.error && r.h1Count === 0).length,
      titleTooLong: results.filter((r) => !r.error && r.titleLength > 60).length,
      metaDescTooLong: results.filter(
        (r) => !r.error && r.metaDescriptionLength > 160
      ).length,
      missingMetaDesc: results.filter((r) => !r.error && !r.metaDescription).length,
      imgAltBelow80: results.filter(
        (r) => !r.error && r.imgTotal > 0 && r.imgAltCoveragePct < 80
      ).length,
      noJsonLd: results.filter((r) => !r.error && r.jsonLdCount === 0).length,
      noOgImage: results.filter((r) => !r.error && !r.ogImage).length,
    },
    results,
  };

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(summary, null, 2));
  console.log(`\nSaved: ${OUT}`);
  console.log(`Summary:`, JSON.stringify(summary.statusBreakdown, null, 2));
  console.log(`Issues:`, JSON.stringify(summary.issues, null, 2));
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
