import type { MetadataRoute } from "next";
import { uk } from "@/lib/i18n";

export const dynamic = "force-static";

const BASE = "https://vash-advokat.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const articleSlugs = Object.keys(uk.articles);

  const staticPaths = ["/", "/blog"];
  const articlePaths = articleSlugs.map((s) => `/blog/${s}`);

  const allPaths = [...staticPaths, ...articlePaths];

  return allPaths.flatMap((path) => {
    const ukUrl = `${BASE}${path === "/" ? "" : path}` || BASE;
    const ruUrl = `${BASE}/ru${path === "/" ? "" : path}`;
    return [
      {
        url: ukUrl,
        lastModified: now,
        alternates: {
          languages: {
            "uk-UA": ukUrl,
            "ru-UA": ruUrl,
            "x-default": ukUrl,
          },
        },
      },
      {
        url: ruUrl,
        lastModified: now,
        alternates: {
          languages: {
            "uk-UA": ukUrl,
            "ru-UA": ruUrl,
            "x-default": ukUrl,
          },
        },
      },
    ];
  });
}
