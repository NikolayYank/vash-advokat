import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FAQClusterContent from "@/components/faq/FAQClusterContent";
import JsonLd from "@/components/JsonLd";
import {
  getAllClusters,
  getClusterBySlug,
  getCardsForCluster,
} from "@/lib/faq";
import { getBreadcrumbSchema } from "@/lib/schema/breadcrumbs";
import { getFaqPageSchema } from "@/lib/schema/faq";
import "../../../../faq.css";

export async function generateStaticParams() {
  return getAllClusters().map((c) => ({ slug: c.slug_ru }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cluster = getClusterBySlug(slug, "ru");
  if (!cluster) return { title: "Раздел не найден" };

  const title = `${cluster.title_ru} — что делать?`;
  const description = cluster.description_ru;

  return {
    title,
    description,
    alternates: {
      canonical: `/ru/chto-delat/${cluster.slug_ru}`,
      languages: {
        "uk-UA": `/shcho-robyty/${cluster.slug_uk}`,
        "ru-UA": `/ru/chto-delat/${cluster.slug_ru}`,
        "x-default": `/shcho-robyty/${cluster.slug_uk}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      locale: "ru_UA",
      url: `https://vash-advokat.org/ru/chto-delat/${cluster.slug_ru}/`,
      siteName: "Фундация адвокатов Украины",
    },
  };
}

export default async function FaqClusterRuPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cluster = getClusterBySlug(slug, "ru");
  if (!cluster) notFound();
  const cards = getCardsForCluster(cluster.cluster_num);

  const breadcrumbs = [
    { name: "Главная", path: "/ru/" },
    { name: "Что делать", path: "/ru/chto-delat/" },
    { name: cluster.title_ru, path: `/ru/chto-delat/${cluster.slug_ru}/` },
  ];
  const schemas = [
    getBreadcrumbSchema(breadcrumbs),
    getFaqPageSchema(cluster, cards, "ru"),
  ];

  return (
    <>
      <JsonLd data={schemas} id={`faq-${cluster.slug_ru}-ru`} />
      <FAQClusterContent locale="ru" cluster={cluster} cards={cards} />
    </>
  );
}
