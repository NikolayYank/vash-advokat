import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";
import JsonLd from "@/components/JsonLd";
import { ru } from "@/lib/i18n";
import { getPersonSchema, getProfilePageSchema } from "@/lib/schema/person";
import { getBreadcrumbSchema } from "@/lib/schema/breadcrumbs";

export const metadata: Metadata = {
  title: ru.meta.aboutTitle,
  description: ru.meta.aboutDescription,
  alternates: {
    canonical: "/ru/o-nas",
    languages: {
      "uk-UA": "/pro-nas",
      "ru-UA": "/ru/o-nas",
      "x-default": "/pro-nas",
    },
  },
  openGraph: {
    title: ru.meta.aboutOgTitle,
    description: ru.meta.aboutDescription,
    locale: "ru_RU",
    type: "profile",
    images: [
      {
        url: "/images/ava.jpg",
        width: 1792,
        height: 2400,
        alt: "Сергей Сергеевич Веприцкий",
      },
    ],
  },
};

export default function OnasPageRu() {
  const personSchema = getPersonSchema("ru");
  const profileSchema = getProfilePageSchema("ru");
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Главная", path: "/ru/" },
    { name: "О нас", path: "/ru/o-nas/" },
  ]);

  return (
    <>
      <JsonLd
        data={[personSchema, profileSchema, breadcrumbSchema]}
        id="about-schema"
      />
      <AboutContent dict={ru} locale="ru" />
    </>
  );
}
