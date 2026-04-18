import type { Metadata } from "next";
import BlogListContent from "@/components/BlogListContent";
import JsonLd from "@/components/JsonLd";
import { uk } from "@/lib/i18n";
import { getBreadcrumbSchema } from "@/lib/schema/breadcrumbs";

export const metadata: Metadata = {
  title: uk.meta.blogListTitle,
  description: uk.meta.blogListDescription,
  alternates: {
    canonical: "/blog",
    languages: {
      "uk-UA": "/blog",
      "ru-UA": "/ru/blog",
      "x-default": "/blog",
    },
  },
};

export default function BlogPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Головна", path: "/" },
    { name: "Корисні матеріали", path: "/blog/" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} id="blog-list-schema" />
      <BlogListContent dict={uk} locale="uk" />
    </>
  );
}
