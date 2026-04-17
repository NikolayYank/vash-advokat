import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleContent from "@/components/ArticleContent";
import { ru } from "@/lib/i18n";

export async function generateStaticParams() {
  return Object.keys(ru.articles).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = ru.articles[slug];
  if (!article) return { title: "Статья не найдена" };
  return {
    title: article.title,
    description: article.metaDescription,
    alternates: {
      canonical: `/ru/blog/${slug}`,
      languages: {
        "uk-UA": `/blog/${slug}`,
        "ru-UA": `/ru/blog/${slug}`,
        "x-default": `/blog/${slug}`,
      },
    },
  };
}

export default async function ArticlePageRu({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ru.articles[slug];
  if (!article) notFound();

  return <ArticleContent article={article} dict={ru} locale="ru" />;
}
