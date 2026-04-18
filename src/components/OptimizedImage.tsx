import type { CSSProperties } from "react";

interface Props {
  /** JPEG / PNG source path, e.g. "/images/blog_fraud.jpeg". AVIF/WebP siblings are derived automatically. */
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: CSSProperties;
  /** Set true for above-the-fold / LCP images. */
  priority?: boolean;
  /** Responsive sizes hint for the <img> tag. */
  sizes?: string;
}

function stripExtension(path: string): { base: string; ext: string } {
  const dot = path.lastIndexOf(".");
  if (dot <= path.lastIndexOf("/")) return { base: path, ext: "" };
  return { base: path.slice(0, dot), ext: path.slice(dot) };
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
  const { base } = stripExtension(src);
  const avif = `${base}.avif`;
  const webp = `${base}.webp`;

  const loading = priority ? "eager" : "lazy";
  const decoding = priority ? "sync" : "async";
  const fetchPriority = priority ? "high" : "auto";

  return (
    <picture>
      <source srcSet={avif} type="image/avif" sizes={sizes} />
      <source srcSet={webp} type="image/webp" sizes={sizes} />
      <img
        src={src}
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
