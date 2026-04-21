#!/usr/bin/env node
// Image optimization: generates responsive AVIF + WebP + JPG/PNG variants
// next to every JPG/JPEG/PNG in public/images/. Idempotent.
//
// For each source `name.jpg`:
//   - legacy single-size siblings `name.avif`, `name.webp` (kept for OG / backward-compat)
//   - multi-width variants `name-{w}w.{avif,webp,jpg|png}` for w in WIDTHS
//   - widths skipped if >= source width (no upscaling)
//
// Usage: node scripts/optimize-images.mjs [--force]

import { readdirSync, statSync, existsSync, writeFileSync } from "node:fs";
import { join, extname, basename } from "node:path";
import sharp from "sharp";

const IMAGES_DIR = new URL("../public/images/", import.meta.url).pathname;
const FORCE = process.argv.includes("--force");

// Responsive widths (px). Mobile phones map to 400w, larger to 800w/1200w,
// retina desktop / big hero to 2400w.
const WIDTHS = [400, 800, 1200, 2400];

// Legacy single-size targets (kept for OG metadata / backward compat).
const LEGACY_FORMATS = [
  { ext: "avif", options: { quality: 55, effort: 6 } },
  { ext: "webp", options: { quality: 80, effort: 5 } },
];

// Per-width encoder settings. AVIF is aggressive (hero images typically
// display at width/2 on retina, so compression artefacts are invisible).
const RESPONSIVE_ENCODERS = {
  avif: { quality: 50, effort: 6 },
  webp: { quality: 78, effort: 5 },
  jpeg: { quality: 82, progressive: true, mozjpeg: true },
  png:  { compressionLevel: 9, palette: true },
};

const SUPPORTED_IN = new Set([".jpg", ".jpeg", ".png"]);

// Exclude our own responsive outputs (e.g. `foo-400w.jpg`) from the source list.
const RESPONSIVE_SUFFIX = /-\d+w$/;
function isOurOutput(filename) {
  const ext = extname(filename).toLowerCase();
  const stem = basename(filename, ext);
  return RESPONSIVE_SUFFIX.test(stem);
}

function log(...args) {
  process.stdout.write(args.join(" ") + "\n");
}
function formatKb(bytes) {
  return (bytes / 1024).toFixed(1) + " KB";
}
function isUpToDate(outPath, inPath) {
  if (!existsSync(outPath)) return false;
  return statSync(outPath).mtimeMs >= statSync(inPath).mtimeMs;
}

async function encodeLegacy(inputPath, stem, srcMtime) {
  // Single-size AVIF + WebP at source dimensions (for OG metadata).
  const out = [];
  for (const t of LEGACY_FORMATS) {
    const outPath = join(IMAGES_DIR, `${stem}.${t.ext}`);
    if (!FORCE && isUpToDate(outPath, inputPath)) {
      out.push({ kind: "legacy", ext: t.ext, skipped: true, size: statSync(outPath).size });
      continue;
    }
    const pipeline = sharp(inputPath);
    if (t.ext === "avif") await pipeline.avif(t.options).toFile(outPath);
    else if (t.ext === "webp") await pipeline.webp(t.options).toFile(outPath);
    out.push({ kind: "legacy", ext: t.ext, size: statSync(outPath).size });
  }
  return out;
}

async function encodeResponsive(inputPath, stem, srcExt, srcWidth) {
  // Multi-width variants. Skip widths that would enlarge the source.
  const out = [];
  const rasterExt = srcExt === ".png" ? "png" : "jpeg"; // sharp format
  const fileExt = srcExt === ".png" ? "png" : "jpg"; // filename suffix
  const widths = WIDTHS.filter((w) => w < srcWidth); // strictly smaller (we keep original for desktop-max)

  for (const w of widths) {
    for (const fmt of ["avif", "webp", fileExt]) {
      const outPath = join(IMAGES_DIR, `${stem}-${w}w.${fmt}`);
      if (!FORCE && isUpToDate(outPath, inputPath)) {
        out.push({ kind: "resp", w, ext: fmt, skipped: true, size: statSync(outPath).size });
        continue;
      }
      let pipeline = sharp(inputPath).resize({ width: w, withoutEnlargement: true });
      if (fmt === "avif") pipeline = pipeline.avif(RESPONSIVE_ENCODERS.avif);
      else if (fmt === "webp") pipeline = pipeline.webp(RESPONSIVE_ENCODERS.webp);
      else if (fmt === "jpg") pipeline = pipeline.jpeg(RESPONSIVE_ENCODERS.jpeg);
      else if (fmt === "png") pipeline = pipeline.png(RESPONSIVE_ENCODERS.png);
      await pipeline.toFile(outPath);
      out.push({ kind: "resp", w, ext: fmt, size: statSync(outPath).size });
    }
  }
  return out;
}

async function processFile(filename) {
  const ext = extname(filename).toLowerCase();
  if (!SUPPORTED_IN.has(ext)) return null;

  const inputPath = join(IMAGES_DIR, filename);
  const stem = basename(filename, ext);
  const srcSize = statSync(inputPath).size;
  const srcMtime = statSync(inputPath).mtimeMs;

  // Read source dimensions to skip upscaling.
  const meta = await sharp(inputPath).metadata();
  const srcWidth = meta.width ?? 0;

  const legacy = await encodeLegacy(inputPath, stem, srcMtime);
  const responsive = await encodeResponsive(inputPath, stem, ext, srcWidth);

  return { filename, srcSize, srcWidth, results: [...legacy, ...responsive] };
}

async function main() {
  const files = readdirSync(IMAGES_DIR)
    .filter((f) => SUPPORTED_IN.has(extname(f).toLowerCase()) && !isOurOutput(f))
    .sort();

  log(`[optimize-images] ${files.length} source images in public/images/`);
  log(FORCE ? "[optimize-images] --force: regenerating all outputs" : "[optimize-images] idempotent run (skip up-to-date)");
  log(`[optimize-images] responsive widths: ${WIDTHS.join(", ")}w`);
  log("");

  const manifest = {}; // stem → { srcWidth, widths: [400, 800, ...] }
  let totalWritten = 0;
  let totalSkipped = 0;
  for (const file of files) {
    const res = await processFile(file);
    if (!res) continue;

    const ext = extname(file).toLowerCase();
    const stem = basename(file, ext);
    const availableWidths = Array.from(
      new Set(res.results.filter((r) => r.kind === "resp").map((r) => r.w))
    ).sort((a, b) => a - b);
    manifest[`/images/${file}`] = {
      srcWidth: res.srcWidth,
      widths: availableWidths,
    };

    const legacyLine = res.results
      .filter((r) => r.kind === "legacy")
      .map((r) => `${r.ext}:${formatKb(r.size)}${r.skipped ? "*" : ""}`)
      .join(" ");

    const respByWidth = {};
    for (const r of res.results.filter((r) => r.kind === "resp")) {
      respByWidth[r.w] = respByWidth[r.w] || [];
      respByWidth[r.w].push(`${r.ext}:${formatKb(r.size)}${r.skipped ? "*" : ""}`);
    }
    const respLine = Object.keys(respByWidth)
      .sort((a, b) => +a - +b)
      .map((w) => `[${w}w ${respByWidth[w].join(" ")}]`)
      .join(" ");

    log(
      `${file.padEnd(30)}  ${String(res.srcWidth).padStart(4)}w ${formatKb(res.srcSize).padStart(10)}  |  ${legacyLine}  |  ${respLine || "(no resize — source too small)"}`
    );

    for (const r of res.results) {
      if (r.skipped) totalSkipped++;
      else totalWritten++;
    }
  }

  const manifestPath = new URL("../src/lib/image-manifest.json", import.meta.url).pathname;
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

  log("");
  log(`[optimize-images] done. written ${totalWritten}, cached ${totalSkipped}`);
  log(`[optimize-images] manifest: ${manifestPath} (${Object.keys(manifest).length} entries)`);
}

main().catch((err) => {
  console.error("[optimize-images] FAIL:", err);
  process.exit(1);
});
