import { SITE_URL } from "./constants";

type LegalPageType = "privacy" | "terms" | "cookie";

interface LegalPageMeta {
  title: string;
  path: string;
  description: string;
  locale: "uk" | "ru";
  dateModified: string;
}

const LOCALE_STRING: Record<"uk" | "ru", string> = {
  uk: "uk-UA",
  ru: "ru-UA",
};

const PUBLISHER_NAME: Record<"uk" | "ru", string> = {
  uk: "Адвокатське об'єднання «Фундація адвокатів України»",
  ru: "Адвокатское объединение «Фундация адвокатов Украины»",
};

export const getLegalWebPageSchema = (
  type: LegalPageType,
  meta: LegalPageMeta,
) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}${meta.path}#webpage`,
  url: `${SITE_URL}${meta.path}`,
  name: meta.title,
  description: meta.description,
  inLanguage: LOCALE_STRING[meta.locale],
  isPartOf: { "@id": `${SITE_URL}/#website` },
  publisher: {
    "@id": `${SITE_URL}/#organization`,
    name: PUBLISHER_NAME[meta.locale],
  },
  dateModified: meta.dateModified,
  // policy type хинт: browser-crawler могут использовать для классификации.
  about: { "@type": "Thing", name: type },
});
