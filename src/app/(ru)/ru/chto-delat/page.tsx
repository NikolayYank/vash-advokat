import type { Metadata } from "next";
import FAQHubContent from "@/components/faq/FAQHubContent";
import JsonLd from "@/components/JsonLd";
import { getAllClusters } from "@/lib/faq";
import { getBreadcrumbSchema } from "@/lib/schema/breadcrumbs";
import { getFaqHubCollectionSchema } from "@/lib/schema/faq";
import "../../../faq.css";

export const metadata: Metadata = {
  title: "Что делать в юридической ситуации — 114 коротких ответов",
  description:
    "Обыск, задержание, допрос, мошенничество, бизнес-споры — 114 коротких ответов, проверенных адвокатом Сергеем Веприцким.",
  alternates: {
    canonical: "/ru/chto-delat",
    languages: {
      "uk-UA": "/shcho-robyty",
      "ru-UA": "/ru/chto-delat",
      "x-default": "/shcho-robyty",
    },
  },
  openGraph: {
    title: "Что делать в юридической ситуации — FAQ",
    description:
      "114 коротких ответов на юридические вопросы. Проверено адвокатом Сергеем Веприцким.",
    type: "website",
    locale: "ru_UA",
    url: "https://vash-advokat.org/ru/chto-delat/",
    siteName: "Фундация адвокатов Украины",
  },
};

export default function FaqHubRuPage() {
  const clusters = getAllClusters();
  const breadcrumbs = [
    { name: "Главная", path: "/ru/" },
    { name: "Что делать", path: "/ru/chto-delat/" },
  ];
  const schemas = [
    getBreadcrumbSchema(breadcrumbs),
    getFaqHubCollectionSchema(clusters, "ru"),
  ];

  return (
    <>
      <JsonLd data={schemas} id="faq-hub-ru" />
      <FAQHubContent locale="ru" />
    </>
  );
}
