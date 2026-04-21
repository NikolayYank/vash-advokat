import type { ReactNode } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import type { Dict, Locale } from "@/lib/i18n";

interface LegalPageContentProps {
  dict: Dict;
  locale: Locale;
  switchPath: string;
  breadcrumbs: { name: string; path: string }[];
  breadcrumbLabel: string;
  title: string;
  lastUpdatedLabel: string;
  lastUpdatedDate: string;
  children: ReactNode;
}

export default function LegalPageContent({
  dict,
  locale,
  switchPath,
  breadcrumbs,
  breadcrumbLabel,
  title,
  lastUpdatedLabel,
  lastUpdatedDate,
  children,
}: LegalPageContentProps) {
  return (
    <>
      <SiteHeader dict={dict} locale={locale} switchPath={switchPath} />
      <main className="container legal-main">
        <Breadcrumbs items={breadcrumbs} ariaLabel={breadcrumbLabel} />
        <h1 className="legal-title">{title}</h1>
        <p className="body-sm legal-meta">
          {lastUpdatedLabel}: <time dateTime={lastUpdatedDate}>{lastUpdatedDate}</time>
        </p>
        <article className="legal-content">{children}</article>
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </>
  );
}
