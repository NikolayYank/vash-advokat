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
import "../../../faq.css";

export async function generateStaticParams() {
  return getAllClusters().map((c) => ({ slug: c.slug_uk }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cluster = getClusterBySlug(slug, "uk");
  if (!cluster) return { title: "Розділ не знайдено" };

  const title = `${cluster.title_uk} — що робити?`;
  const description = cluster.description_uk;

  return {
    title,
    description,
    alternates: {
      canonical: `/shcho-robyty/${cluster.slug_uk}`,
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
      locale: "uk_UA",
      url: `https://vash-advokat.org/shcho-robyty/${cluster.slug_uk}/`,
      siteName: "Фундація адвокатів України",
    },
  };
}

export default async function FaqClusterUkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cluster = getClusterBySlug(slug, "uk");
  if (!cluster) notFound();
  const cards = getCardsForCluster(cluster.cluster_num);

  const breadcrumbs = [
    { name: "Головна", path: "/" },
    { name: "Що робити", path: "/shcho-robyty/" },
    { name: cluster.title_uk, path: `/shcho-robyty/${cluster.slug_uk}/` },
  ];
  const schemas = [
    getBreadcrumbSchema(breadcrumbs),
    getFaqPageSchema(cluster, cards, "uk"),
  ];

  return (
    <>
      <JsonLd data={schemas} id={`faq-${cluster.slug_uk}-uk`} />
      <FAQClusterContent locale="uk" cluster={cluster} cards={cards} />
    </>
  );
}
