import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleContent from "@/components/ArticleContent";
import JsonLd from "@/components/JsonLd";
import { uk } from "@/lib/i18n";
import { getBlogPostingSchema } from "@/lib/schema/blog-posting";
import { getBreadcrumbSchema } from "@/lib/schema/breadcrumbs";
import { SITE_URL } from "@/lib/schema/constants";
import { getRelatedArticles } from "@/lib/related";

export async function generateStaticParams() {
  return Object.keys(uk.articles).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = uk.articles[slug];
  if (!article) return { title: "Стаття не знайдена" };
  const ogImageUrl = article.ogImage ?? article.image;
  return {
    title: article.title,
    description: article.metaDescription,
    alternates: {
      canonical: `/blog/${slug}`,
      languages: {
        "uk-UA": `/blog/${slug}`,
        "ru-UA": `/ru/blog/${slug}`,
        "x-default": `/blog/${slug}`,
      },
    },
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      type: "article",
      locale: "uk_UA",
      siteName: "Фундація адвокатів України",
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      authors: ["https://vash-advokat.org/pro-nas/"],
      url: `https://vash-advokat.org/blog/${slug}/`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 675,
          alt: article.coverAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.metaDescription,
      images: [ogImageUrl],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = uk.articles[slug];
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
    locale: "uk",
    authorName: article.author,
  });

  const breadcrumbs = [
    { name: "Головна", path: "/" },
    { name: "Корисні матеріали", path: "/blog/" },
    { name: article.title, path: `/blog/${article.slug}/` },
  ];
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);

  const relatedArticles = getRelatedArticles(slug, uk.articles, 3);

  return (
    <>
      <JsonLd data={[blogPostingSchema, breadcrumbSchema]} id="article-schema" />
      <ArticleContent
        article={article}
        dict={uk}
        locale="uk"
        breadcrumbs={breadcrumbs}
        breadcrumbLabel="Хлібні крихти"
        relatedArticles={relatedArticles}
        relatedLabel="Схожі матеріали"
      />
    </>
  );
}
