import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleContent from "@/components/ArticleContent";
import JsonLd from "@/components/JsonLd";
import { ru } from "@/lib/i18n";
import { getBlogPostingSchema } from "@/lib/schema/blog-posting";
import { getBreadcrumbSchema } from "@/lib/schema/breadcrumbs";
import { SITE_URL } from "@/lib/schema/constants";

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

  const imageUrl = article.image.startsWith("http")
    ? article.image
    : `${SITE_URL}${article.image}`;

  const blogPostingSchema = getBlogPostingSchema({
    slug: article.slug,
    title: article.title,
    description: article.metaDescription,
    image: imageUrl,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    locale: "ru",
    authorName: article.author,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Главная", path: "/ru/" },
    { name: "Полезные материалы", path: "/ru/blog/" },
    { name: article.title, path: `/ru/blog/${article.slug}/` },
  ]);

  return (
    <>
      <JsonLd data={[blogPostingSchema, breadcrumbSchema]} id="article-schema" />
      <ArticleContent article={article} dict={ru} locale="ru" />
    </>
  );
}
