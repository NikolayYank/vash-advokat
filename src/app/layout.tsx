import type { Metadata } from "next";
import { EB_Garamond, Lato } from "next/font/google";
import "./globals.css";
import { asset } from "@/lib/asset";
import LangSync from "@/components/LangSync";
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
    default: "Фундація адвокатів України — Захист та надійність",
    template: "%s — Фундація адвокатів",
  },
  description:
    "Адвокатське об'єднання «Фундація адвокатів України». Захист та надійність з 2010 року. Безкоштовна перша консультація.",
  icons: {
    icon: [
      { url: asset("/favicon-32x32.png"), sizes: "32x32", type: "image/png" },
      { url: asset("/favicon-16x16.png"), sizes: "16x16", type: "image/png" },
    ],
    apple: asset("/apple-touch-icon.png"),
  },
  openGraph: {
    title: "Фундація адвокатів України — Захист та надійність",
    description:
      "Адвокатське об\u2019єднання з\u00A038-річним досвідом. 11\u00A0500+ справ. Безкоштовна перша консультація.",
    type: "website",
    locale: "uk_UA",
    siteName: "Фундація адвокатів України",
    images: [
      {
        url: asset("/images/office_exterior.jpeg"),
        width: 1200,
        height: 630,
        alt: "Офіс Фундації адвокатів України",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${ebGaramond.variable} ${lato.variable}`}>
      <body>
        <JsonLd data={[getOrganizationSchema("uk"), getWebSiteSchema()]} id="site-schema" />
        <LangSync />
        {children}
      </body>
    </html>
  );
}
