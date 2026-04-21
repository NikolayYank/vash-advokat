import type { Locale } from "@/lib/i18n";
import type { FaqCard, FaqCluster } from "@/lib/faq";
import { cardQuestion, cardAnswer, faqClusterPath, faqHubPath } from "@/lib/faq";
import { SITE_URL, SCHEMA_IDS } from "./constants";

// FAQPage schema — main entity is Question[] with acceptedAnswer.
// Google no longer shows FAQ rich snippets for non-government/health sites,
// but the schema is still used for AI Overviews and People Also Ask citations.
export const getFaqPageSchema = (
  cluster: FaqCluster,
  cards: FaqCard[],
  locale: Locale,
) => {
  const url = `${SITE_URL}${faqClusterPath(cluster, locale)}`;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    inLanguage: locale === "uk" ? "uk-UA" : "ru-UA",
    mainEntity: cards.map((c) => ({
      "@type": "Question",
      name: cardQuestion(c, locale),
      acceptedAnswer: {
        "@type": "Answer",
        text: cardAnswer(c, locale),
      },
    })),
    publisher: { "@id": SCHEMA_IDS.organization },
  };
};

// CollectionPage schema — for the FAQ hub that lists all 20 clusters.
export const getFaqHubCollectionSchema = (
  clusters: FaqCluster[],
  locale: Locale,
) => {
  const url = `${SITE_URL}${faqHubPath(locale)}`;
  const name =
    locale === "uk"
      ? "Що робити в юридичній ситуації — FAQ"
      : "Что делать в юридической ситуации — FAQ";
  const description =
    locale === "uk"
      ? "Короткі відповіді на 100+ питань про обшук, затримання, допит, шахрайство, бізнес-спори. Перевірено адвокатом Сергієм Веприцьким."
      : "Короткие ответы на 100+ вопросов об обыске, задержании, допросе, мошенничестве, бизнес-спорах. Проверено адвокатом Сергеем Веприцким.";

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    url,
    name,
    description,
    inLanguage: locale === "uk" ? "uk-UA" : "ru-UA",
    publisher: { "@id": SCHEMA_IDS.organization },
    hasPart: clusters.map((cl) => ({
      "@type": "WebPage",
      url: `${SITE_URL}${faqClusterPath(cl, locale)}`,
      name: locale === "uk" ? cl.title_uk : cl.title_ru,
      description:
        locale === "uk" ? cl.description_uk : cl.description_ru,
    })),
  };
};
