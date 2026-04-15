import type { Metadata } from "next";
import { EB_Garamond, Lato } from "next/font/google";
import "./globals.css";

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
  title: {
    default: "Фундація адвокатів України — Захист та надійність",
    template: "%s — Фундація адвокатів",
  },
  description:
    "Адвокатське об'єднання «Фундація адвокатів України». Захист та надійність з 2010 року. Безкоштовна перша консультація.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${ebGaramond.variable} ${lato.variable}`}>
      <body>{children}</body>
    </html>
  );
}
