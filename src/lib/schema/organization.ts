import type { Locale } from "@/lib/i18n";
import {
  SITE_URL,
  SCHEMA_IDS,
  ORG_NAME_UK,
  ORG_NAME_RU,
  ORG_EMAIL,
  ORG_PHONE,
  ORG_FOUNDING_DATE,
  ORG_AREA_SERVED,
  ORG_LOGO_URL,
  ORG_ADDRESS,
  ORG_OPENING_HOURS,
} from "./constants";

// LegalService — специализированный подтип Organization для юрфирмы.
// Google понимает оба типа, LegalService даёт сигнал ниши.
export const getOrganizationSchema = (locale: Locale = "uk") => ({
  "@context": "https://schema.org",
  "@type": ["LegalService", "Organization"],
  "@id": SCHEMA_IDS.organization,
  name: locale === "uk" ? ORG_NAME_UK : ORG_NAME_RU,
  alternateName: "Фундація адвокатів України",
  url: SITE_URL,
  logo: ORG_LOGO_URL,
  image: ORG_LOGO_URL,
  email: ORG_EMAIL,
  telephone: ORG_PHONE,
  foundingDate: ORG_FOUNDING_DATE,
  areaServed: {
    "@type": "Country",
    name: ORG_AREA_SERVED,
  },
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
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: ORG_PHONE,
    email: ORG_EMAIL,
    availableLanguage: ["uk", "ru"],
    areaServed: ORG_AREA_SERVED,
  },
  knowsLanguage: ["uk", "ru"],
  priceRange: "₴₴",
  sameAs: [
    "https://www.facebook.com/profile.php?id=1124189754102416",
  ],
});
