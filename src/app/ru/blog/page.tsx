import type { Metadata } from "next";
import BlogListContent from "@/components/BlogListContent";
import JsonLd from "@/components/JsonLd";
import { ru } from "@/lib/i18n";
import { getBreadcrumbSchema } from "@/lib/schema/breadcrumbs";

export const metadata: Metadata = {
  title: ru.meta.blogListTitle,
  description: ru.meta.blogListDescription,
  alternates: {
    canonical: "/ru/blog",
    languages: {
      "uk-UA": "/blog",
      "ru-UA": "/ru/blog",
      "x-default": "/blog",
    },
  },
};

export default function BlogPageRu() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Главная", path: "/ru/" },
    { name: "Полезные материалы", path: "/ru/blog/" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} id="blog-list-schema" />
      <BlogListContent dict={ru} locale="ru" />
    </>
  );
}
