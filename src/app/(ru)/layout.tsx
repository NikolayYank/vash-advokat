import type { Metadata } from "next";
import { EB_Garamond, Lato } from "next/font/google";
import "../globals.css";
import { asset } from "@/lib/asset";
import JsonLd from "@/components/JsonLd";
import { getOrganizationSchema } from "@/lib/schema/organization";
import { getWebSiteSchema } from "@/lib/schema/website";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vash-advokat.org"),
  title: {
    default: "Фундация адвокатов Украины — Защита и надёжность",
    template: "%s — Фундация адвокатов",
  },
  description:
    "Адвокатское объединение «Фундация адвокатов Украины». Защита и надёжность с 2010 года. Бесплатная первая консультация.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: asset("/favicon-32x32.png"), sizes: "32x32", type: "image/png" },
      { url: asset("/favicon-16x16.png"), sizes: "16x16", type: "image/png" },
    ],
    apple: asset("/apple-touch-icon.png"),
  },
  openGraph: {
    title: "Фундация адвокатов Украины — Защита и надёжность",
    description:
      "Адвокатское объединение с\u00A038-летним опытом. 11\u00A0500+ дел. Бесплатная первая консультация.",
    type: "website",
    locale: "ru_RU",
    siteName: "Фундация адвокатов Украины",
    images: [
      {
        url: asset("/images/office_exterior.jpeg"),
        width: 1200,
        height: 630,
        alt: "Офис Фундации адвокатов Украины",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayoutRu({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${ebGaramond.variable} ${lato.variable}`}>
      <body>
        <JsonLd data={[getOrganizationSchema("ru"), getWebSiteSchema()]} id="site-schema" />
        {children}
      </body>
    </html>
  );
}
