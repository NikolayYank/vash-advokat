export const SITE_URL = "https://vash-advokat.org";

export const SCHEMA_IDS = {
  organization: `${SITE_URL}/#organization`,
  website: `${SITE_URL}/#website`,
  founder: `${SITE_URL}/#person-vepritsky`,
} as const;

export const ORG_NAME_UK = "Адвокатське об'єднання «Фундація адвокатів України»";
export const ORG_NAME_RU = "Адвокатское объединение «Фундация адвокатов Украины»";
export const ORG_EMAIL = "promo.vashadvokat@gmail.com";
export const ORG_PHONE = "+380505940785";
export const ORG_FOUNDING_DATE = "2010-05-19";
export const ORG_AREA_SERVED = "UA";
export const ORG_BAR_CERTIFICATE = "№647";
export const ORG_MINISTRY_ORDER = "Наказ Мін'юсту №1076/5 від 19.05.2010";
export const ORG_LOGO_URL = `${SITE_URL}/images/logo_mini.png`;
export const ORG_ADDRESS = {
  streetAddress: "вул. Римарська, 19",
  addressLocality: "Харків",
  addressCountry: "UA",
} as const;
export const ORG_OPENING_HOURS = "Mo-Fr 09:00-18:00";

export const FOUNDER_NAME_UK = "Сергій Сергійович Веприцький";
export const FOUNDER_NAME_RU = "Сергей Сергеевич Веприцкий";
export const FOUNDER_JOB_TITLE_UK = "Адвокат, засновник Фундації адвокатів України";
export const FOUNDER_JOB_TITLE_RU = "Адвокат, основатель Фундации адвокатов Украины";
export const FOUNDER_BAR_CERTIFICATE = "№1114";
export const FOUNDER_IMAGE_URL = `${SITE_URL}/images/ava.jpg`;
export const FOUNDER_ABOUT_PATH_UK = "/pro-nas/";
export const FOUNDER_ABOUT_PATH_RU = "/ru/o-nas/";
// 40 лет адвокатской практики (по состоянию на 2026), орден «Видатний адвокат України» 2013,
// Головний редактор газети «Захист прав», автор і ведучий ТВ-програми «Людина і Закон»,
// представник адвокатів Харківської області в Раді адвокатів України.

export const escapeJson = (obj: unknown): string =>
  JSON.stringify(obj).replace(/</g, "\\u003c");
