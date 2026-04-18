import type { Locale } from "@/lib/i18n";
import {
  SITE_URL,
  SCHEMA_IDS,
  ORG_NAME_UK,
  ORG_NAME_RU,
  ORG_LOGO_URL,
} from "./constants";

export interface BlogPostingInput {
  slug: string;
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  locale: Locale;
  authorName: string;
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
    author: {
      "@type": "Organization",
      "@id": SCHEMA_IDS.organization,
      name: input.authorName,
    },
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
