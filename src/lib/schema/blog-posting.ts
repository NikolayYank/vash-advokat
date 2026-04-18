import type { Locale } from "@/lib/i18n";
import {
  SITE_URL,
  SCHEMA_IDS,
  ORG_NAME_UK,
  ORG_NAME_RU,
  ORG_LOGO_URL,
  FOUNDER_NAME_UK,
  FOUNDER_NAME_RU,
} from "./constants";

export interface BlogPostingInput {
  slug: string;
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  locale: Locale;
  // authorName не используется в schema напрямую — автор всегда Веприцкий (@id=Person).
  // Оставлен для совместимости со старым вызовом.
  authorName?: string;
}

const pathForLocale = (slug: string, locale: Locale) =>
  locale === "uk" ? `/blog/${slug}/` : `/ru/blog/${slug}/`;

export const getBlogPostingSchema = (input: BlogPostingInput) => {
  const url = `${SITE_URL}${pathForLocale(input.slug, input.locale)}`;
  const imageUrl = input.image.startsWith("http")
    ? input.image
    : `${SITE_URL}${input.image}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title.slice(0, 110),
    description: input.description,
    image: [imageUrl],
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    // Author — Person (Веприцкий). Важно для E-E-A-T YMYL: Google понимает кто эксперт.
    author: {
      "@type": "Person",
      "@id": SCHEMA_IDS.founder,
      name: input.locale === "uk" ? FOUNDER_NAME_UK : FOUNDER_NAME_RU,
    },
    // Publisher — Organization (Фундация).
    publisher: {
      "@type": "Organization",
      "@id": SCHEMA_IDS.organization,
      name: input.locale === "uk" ? ORG_NAME_UK : ORG_NAME_RU,
      logo: {
        "@type": "ImageObject",
        url: ORG_LOGO_URL,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    inLanguage: input.locale === "uk" ? "uk-UA" : "ru-UA",
    url,
  };
};
