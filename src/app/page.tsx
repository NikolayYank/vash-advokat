import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";
import { uk } from "@/lib/i18n";

export const metadata: Metadata = {
  title: uk.meta.homeTitle,
  description: uk.meta.homeDescription,
  alternates: {
    canonical: "/",
    languages: {
      "uk-UA": "/",
      "ru-UA": "/ru",
      "x-default": "/",
    },
  },
  openGraph: {
    title: uk.meta.homeOgTitle,
    description: uk.meta.homeOgDescription,
    locale: uk.meta.homeOgLocale,
    type: "website",
  },
};

export default function HomePage() {
  return <HomeContent dict={uk} locale="uk" />;
}
