import type { Metadata } from "next";
import BlogListContent from "@/components/BlogListContent";
import { ru } from "@/lib/i18n";

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
  return <BlogListContent dict={ru} locale="ru" />;
}
