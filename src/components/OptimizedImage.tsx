import type { CSSProperties } from "react";
import manifest from "@/lib/image-manifest.json";
import { BASE_PATH, asset } from "@/lib/asset";

interface Props {
  /**
   * Source path. Can be either canonical (e.g. `/images/ava.jpg`) or already
   * prefixed with BASE_PATH (e.g. `/ai-pipeline/images/ava.jpg`).
   * The component normalises both cases internally.
   */
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: CSSProperties;
  /** Set true for above-the-fold / LCP images. */
  priority?: boolean;
  /** Responsive sizes hint for the <img> tag. Required for good srcset picking. */
  sizes?: string;
}

type ManifestEntry = { srcWidth: number; widths: number[] };
const MANIFEST = manifest as Record<string, ManifestEntry>;

function stripExtension(path: string): { base: string; ext: string } {
  const dot = path.lastIndexOf(".");
  if (dot <= path.lastIndexOf("/")) return { base: path, ext: "" };
  return { base: path.slice(0, dot), ext: path.slice(dot) };
}

function canonicalPath(src: string): string {
  // Strip BASE_PATH if caller passed an already-prefixed URL.
  if (BASE_PATH && src.startsWith(BASE_PATH)) return src.slice(BASE_PATH.length);
  return src;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  style,
  priority = false,
  sizes,
}: Props) {
  const canonical = canonicalPath(src);
  const { base, ext } = stripExtension(canonical);
  const entry = MANIFEST[canonical];
  const widths = entry?.widths ?? [];
  const rasterExt = ext.toLowerCase() === ".png" ? ".png" : ".jpg";

  const loading = priority ? "eager" : "lazy";
  const decoding = priority ? "sync" : "async";
  const fetchPriority = priority ? "high" : "auto";

  // Legacy fallback (images smaller than 400px or not in manifest): single-size AVIF/WebP.
  if (widths.length === 0) {
    return (
      <picture>
        <source srcSet={asset(`${base}.avif`)} type="image/avif" sizes={sizes} />
        <source srcSet={asset(`${base}.webp`)} type="image/webp" sizes={sizes} />
        <img
          src={asset(canonical)}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          decoding={decoding}
          fetchPriority={fetchPriority}
          className={className}
          style={style}
          sizes={sizes}
        />
      </picture>
    );
  }

  const avifSrcSet = widths.map((w) => `${asset(`${base}-${w}w.avif`)} ${w}w`).join(", ");
  const webpSrcSet = widths.map((w) => `${asset(`${base}-${w}w.webp`)} ${w}w`).join(", ");
  const rasterSrcSet = widths.map((w) => `${asset(`${base}-${w}w${rasterExt}`)} ${w}w`).join(", ");

  const smallest = widths[0];
  const fallbackSrc = asset(`${base}-${smallest}w${rasterExt}`);

  return (
    <picture>
      <source srcSet={avifSrcSet} type="image/avif" sizes={sizes} />
      <source srcSet={webpSrcSet} type="image/webp" sizes={sizes} />
      <img
        src={fallbackSrc}
        srcSet={rasterSrcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        className={className}
        style={style}
      />
    </picture>
  );
}
