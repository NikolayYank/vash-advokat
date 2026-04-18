import type { MetadataRoute } from "next";
import { uk } from "@/lib/i18n";

export const dynamic = "force-static";

const BASE = "https://vash-advokat.org";

// GH Pages добавляет trailing slash к маршрутам → sitemap должен совпадать с живыми URL.
const withTrailingSlash = (path: string) => {
  if (path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
};

// Last modified для статических страниц (когда менялись компоненты/layout).
const STATIC_LAST_MOD = "2026-04-17";

// Приоритеты по типу страницы (hint для гугла).
const priorityFor = (path: string): number => {
  if (path === "/") return 1.0;
  if (path === "/pro-nas/") return 0.9;
  if (path === "/kontakty/") return 0.9;
  if (path === "/blog/") return 0.8;
  if (path.startsWith("/blog/")) return 0.7;
  return 0.5;
};

const changeFreqFor = (path: string): "daily" | "weekly" | "monthly" => {
  if (path === "/") return "weekly";
  if (path === "/blog/") return "weekly";
  if (path.startsWith("/blog/")) return "monthly";
  return "monthly";
};

// Пути, которые имеют разные slug'и в uk и ru версиях (не просто ru = /ru + uk-path).
// Формат: uk-path → { ru: ru-path, priority?: number, changeFrequency?: ... }.
const LOCALIZED_PATH_OVERRIDES: Record<
  string,
  { ru: string; priority?: number; changeFrequency?: "daily" | "weekly" | "monthly" }
> = {
  "/pro-nas/": { ru: "/ru/o-nas/", priority: 0.9, changeFrequency: "monthly" },
  "/kontakty/": { ru: "/ru/kontakty/", priority: 0.9, changeFrequency: "monthly" },
};

// Изображения, релевантные для image sitemap (GoogleImages / Discover).
// Абсолютные URL, по одному или несколько на страницу.
const imagesFor = (path: string): string[] => {
  if (path === "/") {
    return [
      `${BASE}/images/office_exterior.jpeg`,
      `${BASE}/images/logo_mini.png`,
    ];
  }
  if (path === "/pro-nas/") {
    return [`${BASE}/images/ava.jpg`];
  }
  if (path === "/blog/") {
    return [
      `${BASE}/images/blog_fraud.jpeg`,
      `${BASE}/images/blog_criminal.jpeg`,
      `${BASE}/images/b2b_shield.jpeg`,
    ];
  }
  if (path.startsWith("/blog/")) {
    const slug = path.replace(/^\/blog\//, "").replace(/\/$/, "");
    const article = uk.articles[slug];
    if (article?.image) {
      const abs = article.image.startsWith("http") ? article.image : `${BASE}${article.image}`;
      return [abs];
    }
  }
  return [];
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/blog/", "/pro-nas/", "/kontakty/"];
  const articleSlugs = Object.keys(uk.articles);
  const articlePaths = articleSlugs.map((s) => `/blog/${s}/`);
  const allPaths = [...staticPaths, ...articlePaths];

  return allPaths.flatMap((path) => {
    const normalizedPath = withTrailingSlash(path);
    const override = LOCALIZED_PATH_OVERRIDES[normalizedPath];
    const ukUrl = normalizedPath === "/" ? BASE : `${BASE}${normalizedPath}`;
    const ruUrl = override
      ? `${BASE}${override.ru}`
      : normalizedPath === "/"
        ? `${BASE}/ru/`
        : `${BASE}/ru${normalizedPath}`;

    // Для статей берём реальный dateModified.
    let lastMod: string = STATIC_LAST_MOD;
    if (path.startsWith("/blog/") && path !== "/blog/") {
      const slug = path.replace(/^\/blog\//, "").replace(/\/$/, "");
      const article = uk.articles[slug];
      if (article) lastMod = article.dateModified;
    }

    const alternates = {
      languages: {
        "uk-UA": ukUrl,
        "ru-UA": ruUrl,
        "x-default": ukUrl,
      },
    };

    const ukImages = imagesFor(normalizedPath);
    // Для ru-зеркала используем те же изображения (один физический актив на локали).
    const ruImages = ukImages;

    return [
      {
        url: ukUrl,
        lastModified: new Date(lastMod),
        changeFrequency: changeFreqFor(normalizedPath),
        priority: priorityFor(normalizedPath),
        alternates,
        ...(ukImages.length > 0 ? { images: ukImages } : {}),
      },
      {
        url: ruUrl,
        lastModified: new Date(lastMod),
        changeFrequency: changeFreqFor(normalizedPath),
        priority: priorityFor(normalizedPath),
        alternates,
        ...(ruImages.length > 0 ? { images: ruImages } : {}),
      },
    ];
  });
}
