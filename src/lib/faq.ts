import type { Locale } from "@/lib/i18n";
import clustersData from "@/data/faq_clusters.json";
import cardsData from "@/data/faq_cards.json";

export interface FaqCluster {
  cluster_num: number;
  slug_uk: string;
  slug_ru: string;
  segment: string;
  question_count: number;
  title_ru: string;
  title_uk: string;
  description_ru: string;
  description_uk: string;
}

export interface FaqCard {
  question_id: string;
  cluster: number;
  cluster_slug_ru: string;
  cluster_slug_uk: string;
  segment: string;
  question_ru: string;
  answer_ru: string;
  first_step_ru: string;
  keywords_ru: string[];
  anchor_slug: string;
  question_uk: string;
  answer_uk: string;
  first_step_uk: string;
  keywords_uk: string[];
  anchor_slug_uk: string;
}

const clusters = clustersData as FaqCluster[];
const cards = cardsData as FaqCard[];

export const getAllClusters = (): FaqCluster[] => clusters;

export const getClusterBySlug = (
  slug: string,
  locale: Locale,
): FaqCluster | undefined => {
  const key = locale === "uk" ? "slug_uk" : "slug_ru";
  return clusters.find((c) => c[key] === slug);
};

export const getCardsForCluster = (clusterNum: number): FaqCard[] =>
  cards.filter((c) => c.cluster === clusterNum);

export const getAllCards = (): FaqCard[] => cards;

export const getRelatedClusters = (
  currentClusterNum: number,
  limit = 3,
): FaqCluster[] =>
  clusters.filter((c) => c.cluster_num !== currentClusterNum).slice(0, limit);

export const clusterTitle = (cluster: FaqCluster, locale: Locale): string =>
  locale === "uk" ? cluster.title_uk : cluster.title_ru;

export const clusterDescription = (
  cluster: FaqCluster,
  locale: Locale,
): string => (locale === "uk" ? cluster.description_uk : cluster.description_ru);

export const clusterSlug = (cluster: FaqCluster, locale: Locale): string =>
  locale === "uk" ? cluster.slug_uk : cluster.slug_ru;

export const cardQuestion = (card: FaqCard, locale: Locale): string =>
  locale === "uk" ? card.question_uk : card.question_ru;

export const cardAnswer = (card: FaqCard, locale: Locale): string =>
  locale === "uk" ? card.answer_uk : card.answer_ru;

export const cardFirstStep = (card: FaqCard, locale: Locale): string =>
  locale === "uk" ? card.first_step_uk : card.first_step_ru;

export const cardKeywords = (card: FaqCard, locale: Locale): string[] =>
  locale === "uk" ? card.keywords_uk : card.keywords_ru;

export const cardAnchor = (card: FaqCard, locale: Locale): string =>
  locale === "uk" ? card.anchor_slug_uk : card.anchor_slug;

export const FAQ_HUB_PATH = {
  uk: "/shcho-robyty/",
  ru: "/ru/chto-delat/",
} as const;

export const faqClusterPath = (cluster: FaqCluster, locale: Locale): string =>
  locale === "uk"
    ? `${FAQ_HUB_PATH.uk}${cluster.slug_uk}/`
    : `${FAQ_HUB_PATH.ru}${cluster.slug_ru}/`;

export const faqHubPath = (locale: Locale): string => FAQ_HUB_PATH[locale];
