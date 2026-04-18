import { SITE_URL, SCHEMA_IDS, ORG_NAME_UK } from "./constants";

export const getWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": SCHEMA_IDS.website,
  url: SITE_URL,
  name: ORG_NAME_UK,
  inLanguage: ["uk-UA", "ru-UA"],
  publisher: { "@id": SCHEMA_IDS.organization },
  // SearchAction не добавляем — внутреннего поиска нет, иначе фейковый сигнал.
});
