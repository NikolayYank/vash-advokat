import type { Metadata } from "next";
import FAQHubContent from "@/components/faq/FAQHubContent";
import JsonLd from "@/components/JsonLd";
import { getAllClusters } from "@/lib/faq";
import { getBreadcrumbSchema } from "@/lib/schema/breadcrumbs";
import { getFaqHubCollectionSchema } from "@/lib/schema/faq";
import "../../faq.css";

export const metadata: Metadata = {
  title: "Що робити в юридичній ситуації — 114 коротких відповідей",
  description:
    "Обшук, затримання, допит, шахрайство, бізнес-спори — 114 коротких відповідей, перевірених адвокатом Сергієм Веприцьким.",
  alternates: {
    canonical: "/shcho-robyty",
    languages: {
      "uk-UA": "/shcho-robyty",
      "ru-UA": "/ru/chto-delat",
      "x-default": "/shcho-robyty",
    },
  },
  openGraph: {
    title: "Що робити в юридичній ситуації — FAQ",
    description:
      "114 коротких відповідей на юридичні питання українською. Перевірено адвокатом Сергієм Веприцьким.",
    type: "website",
    locale: "uk_UA",
    url: "https://vash-advokat.org/shcho-robyty/",
    siteName: "Фундація адвокатів України",
  },
};

export default function FaqHubUkPage() {
  const clusters = getAllClusters();
  const breadcrumbs = [
    { name: "Головна", path: "/" },
    { name: "Що робити", path: "/shcho-robyty/" },
  ];
  const schemas = [
    getBreadcrumbSchema(breadcrumbs),
    getFaqHubCollectionSchema(clusters, "uk"),
  ];

  return (
    <>
      <JsonLd data={schemas} id="faq-hub-uk" />
      <FAQHubContent locale="uk" />
    </>
  );
}
