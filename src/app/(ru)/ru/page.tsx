import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";
import { ru } from "@/lib/i18n";

export const metadata: Metadata = {
  title: ru.meta.homeTitle,
  description: ru.meta.homeDescription,
  alternates: {
    canonical: "/ru",
    languages: {
      "uk-UA": "/",
      "ru-UA": "/ru",
      "x-default": "/",
    },
  },
  openGraph: {
    title: ru.meta.homeOgTitle,
    description: ru.meta.homeOgDescription,
    locale: "ru_RU",
    type: "website",
  },
};

export default function HomePageRu() {
  return <HomeContent dict={ru} locale="ru" />;
}
