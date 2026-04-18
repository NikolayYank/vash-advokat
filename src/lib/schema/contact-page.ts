import type { Locale } from "@/lib/i18n";
import {
  SITE_URL,
  SCHEMA_IDS,
  ORG_NAME_UK,
  ORG_NAME_RU,
  ORG_EMAIL,
  ORG_PHONE,
  ORG_AREA_SERVED,
  ORG_LOGO_URL,
  ORG_ADDRESS,
  ORG_OPENING_HOURS,
} from "./constants";

// Расширенный LegalService для /kontakty — содержит contactPoint[] с несколькими ролями.
// @id — тот же, что и в Organization из layout (Google матчит по @id, не дублирует сущность).
export const getContactLegalServiceSchema = (locale: Locale = "uk") => ({
  "@context": "https://schema.org",
  "@type": ["LegalService", "Organization"],
  "@id": SCHEMA_IDS.organization,
  name: locale === "uk" ? ORG_NAME_UK : ORG_NAME_RU,
  url: SITE_URL,
  logo: ORG_LOGO_URL,
  image: ORG_LOGO_URL,
  email: ORG_EMAIL,
  telephone: ORG_PHONE,
  address: {
    "@type": "PostalAddress",
    ...ORG_ADDRESS,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  openingHours: ORG_OPENING_HOURS,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: ORG_PHONE,
      email: ORG_EMAIL,
      availableLanguage: ["uk", "ru", "en"],
      areaServed: ORG_AREA_SERVED,
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    },
    {
      "@type": "ContactPoint",
      contactType: "emergency",
      telephone: ORG_PHONE,
      availableLanguage: ["uk", "ru"],
      areaServed: ORG_AREA_SERVED,
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    },
  ],
  knowsLanguage: ["uk", "ru"],
  priceRange: "₴₴",
});
