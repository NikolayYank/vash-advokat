#!/usr/bin/env node
// Image optimization: generates AVIF + WebP next to every JPG/JPEG/PNG
// in public/images/. Idempotent — re-running skips up-to-date outputs.
//
// Usage: node scripts/optimize-images.mjs [--force]

import { readdirSync, statSync, existsSync } from "node:fs";
import { join, extname, basename } from "node:path";
import sharp from "sharp";

const IMAGES_DIR = new URL("../public/images/", import.meta.url).pathname;
const FORCE = process.argv.includes("--force");

const TARGETS = [
  { ext: "avif", options: { quality: 55, effort: 6 } },
  { ext: "webp", options: { quality: 80, effort: 5 } },
];

const SUPPORTED_IN = new Set([".jpg", ".jpeg", ".png"]);

function log(...args) {
  process.stdout.write(args.join(" ") + "\n");
}

function formatKb(bytes) {
  return (bytes / 1024).toFixed(1) + " KB";
}

async function processFile(filename) {
  const ext = extname(filename).toLowerCase();
  if (!SUPPORTED_IN.has(ext)) return null;

  const inputPath = join(IMAGES_DIR, filename);
  const stem = basename(filename, ext);
  const srcSize = statSync(inputPath).size;

  const results = [];
  for (const target of TARGETS) {
    const outPath = join(IMAGES_DIR, `${stem}.${target.ext}`);
    if (!FORCE && existsSync(outPath)) {
      const outMtime = statSync(outPath).mtimeMs;
      const inMtime = statSync(inputPath).mtimeMs;
      if (outMtime >= inMtime) {
        results.push({ target: target.ext, skipped: true, size: statSync(outPath).size });
        continue;
      }
    }
    const pipeline = sharp(inputPath);
    if (target.ext === "avif") {
      await pipeline.avif(target.options).toFile(outPath);
    } else if (target.ext === "webp") {
      await pipeline.webp(target.options).toFile(outPath);
    }
    results.push({ target: target.ext, size: statSync(outPath).size });
  }

  return { filename, srcSize, results };
}

async function main() {
  const files = readdirSync(IMAGES_DIR)
    .filter((f) => SUPPORTED_IN.has(extname(f).toLowerCase()))
    .sort();

  log(`[optimize-images] ${files.length} source images in public/images/`);
  log(FORCE ? "[optimize-images] --force: regenerating all outputs" : "[optimize-images] idempotent run (skip up-to-date)");
  log("");

  for (const file of files) {
    const res = await processFile(file);
    if (!res) continue;

    const parts = [
      `${file.padEnd(28)}`,
      `src ${formatKb(res.srcSize).padStart(10)}`,
    ];
    for (const r of res.results) {
      parts.push(
        `${r.target} ${formatKb(r.size).padStart(9)}${r.skipped ? " (cached)" : ""}`
      );
    }
    log(parts.join("  |  "));
  }

  log("");
  log("[optimize-images] done");
}

main().catch((err) => {
  console.error("[optimize-images] FAIL:", err);
  process.exit(1);
});
