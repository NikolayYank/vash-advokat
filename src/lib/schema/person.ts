import type { Locale } from "@/lib/i18n";
import {
  SITE_URL,
  SCHEMA_IDS,
  FOUNDER_NAME_UK,
  FOUNDER_NAME_RU,
  FOUNDER_JOB_TITLE_UK,
  FOUNDER_JOB_TITLE_RU,
  FOUNDER_BAR_CERTIFICATE,
  FOUNDER_IMAGE_URL,
  FOUNDER_ABOUT_PATH_UK,
  FOUNDER_ABOUT_PATH_RU,
} from "./constants";

// Person schema для Веприцкого С.С. — основателя Фундации адвокатов Украины.
// Используется на страницах /pro-nas (главный mainEntity) + в author BlogPosting.
export const getPersonSchema = (locale: Locale = "uk") => {
  const aboutUrl =
    SITE_URL + (locale === "uk" ? FOUNDER_ABOUT_PATH_UK : FOUNDER_ABOUT_PATH_RU);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": SCHEMA_IDS.founder,
    name: locale === "uk" ? FOUNDER_NAME_UK : FOUNDER_NAME_RU,
    givenName: locale === "uk" ? "Сергій" : "Сергей",
    familyName: locale === "uk" ? "Веприцький" : "Веприцкий",
    jobTitle: locale === "uk" ? FOUNDER_JOB_TITLE_UK : FOUNDER_JOB_TITLE_RU,
    worksFor: { "@id": SCHEMA_IDS.organization },
    url: aboutUrl,
    image: FOUNDER_IMAGE_URL,
    knowsLanguage: ["uk", "ru"],
    // Свідоцтво адвоката України (Єдиний реєстр адвокатів України)
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: locale === "uk"
        ? `Свідоцтво адвоката України ${FOUNDER_BAR_CERTIFICATE}`
        : `Свидетельство адвоката Украины ${FOUNDER_BAR_CERTIFICATE}`,
      recognizedBy: {
        "@type": "Organization",
        name: "Національна асоціація адвокатів України",
      },
    },
    award: [
      locale === "uk"
        ? "Орден «Видатний адвокат України» (2013, Рада адвокатів України)"
        : "Орден «Выдающийся адвокат Украины» (2013, Совет адвокатов Украины)",
    ],
    // sameAs — пока пусто, соцсети у фирмы не зарегистрированы.
    // После запуска соцсетей (Sprint 11+) сюда добавляются ссылки на профили Веприцкого.
  };
};

export const getProfilePageSchema = (locale: Locale = "uk") => {
  const path = locale === "uk" ? FOUNDER_ABOUT_PATH_UK : FOUNDER_ABOUT_PATH_RU;
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: { "@id": SCHEMA_IDS.founder },
    url: `${SITE_URL}${path}`,
    inLanguage: locale === "uk" ? "uk-UA" : "ru-UA",
    isPartOf: { "@id": SCHEMA_IDS.website },
  };
};
