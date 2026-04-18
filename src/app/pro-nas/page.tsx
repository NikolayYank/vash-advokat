import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";
import JsonLd from "@/components/JsonLd";
import { uk } from "@/lib/i18n";
import { getPersonSchema, getProfilePageSchema } from "@/lib/schema/person";
import { getBreadcrumbSchema } from "@/lib/schema/breadcrumbs";

export const metadata: Metadata = {
  title: uk.meta.aboutTitle,
  description: uk.meta.aboutDescription,
  alternates: {
    canonical: "/pro-nas",
    languages: {
      "uk-UA": "/pro-nas",
      "ru-UA": "/ru/o-nas",
      "x-default": "/pro-nas",
    },
  },
  openGraph: {
    title: uk.meta.aboutOgTitle,
    description: uk.meta.aboutDescription,
    locale: "uk_UA",
    type: "profile",
    images: [
      {
        url: "/images/ava.jpg",
        width: 1792,
        height: 2400,
        alt: "Сергій Сергійович Веприцький",
      },
    ],
  },
};

export default function ProNasPage() {
  const personSchema = getPersonSchema("uk");
  const profileSchema = getProfilePageSchema("uk");
  const breadcrumbs = [
    { name: "Головна", path: "/" },
    { name: "Про нас", path: "/pro-nas/" },
  ];
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <JsonLd
        data={[personSchema, profileSchema, breadcrumbSchema]}
        id="about-schema"
      />
      <AboutContent
        dict={uk}
        locale="uk"
        breadcrumbs={breadcrumbs}
        breadcrumbLabel="Хлібні крихти"
      />
    </>
  );
}
