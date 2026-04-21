import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage";
import Breadcrumbs, { type BreadcrumbUiItem } from "@/components/Breadcrumbs";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import type { Dict, Locale } from "@/lib/i18n";

function localizeHref(href: string, locale: Locale): string {
  if (!href) return href;
  if (href.startsWith("#") || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) return href;
  if (locale === "uk") return href;
  return `/ru${href === "/" ? "" : href}` || "/ru";
}

interface Props {
  dict: Dict;
  locale: Locale;
  breadcrumbs?: BreadcrumbUiItem[];
  breadcrumbLabel?: string;
}

export default function BlogListContent({ dict, locale, breadcrumbs, breadcrumbLabel }: Props) {
  const switchPath = locale === "uk" ? "/ru/blog" : "/blog";

  return (
    <>
      <SiteHeader dict={dict} locale={locale} switchPath={switchPath} />

      {/* PAGE TITLE */}
      <section className="page-title">
        <div className="container">
          {breadcrumbs && breadcrumbLabel && (
            <Breadcrumbs items={breadcrumbs} ariaLabel={breadcrumbLabel} />
          )}
          <h1>{dict.blogList.h1}</h1>
          <p>{dict.blogList.subtitle}</p>
        </div>
      </section>

      {/* ARTICLES */}
      <section>
        <div className="container">
          <div className="articles-grid">
            {dict.blogList.articles.map((a) => (
              <Link key={a.slug} href={localizeHref(`/blog/${a.slug}`, locale)} className="article-card">
                <div className="article-card-image">
                  {a.image && (
                    <OptimizedImage
                      src={a.image}
                      alt={a.title}
                      width={480}
                      height={270}
                      sizes="(max-width: 720px) 100vw, 360px"
                    />
                  )}
                </div>
                <div className="article-card-body">
                  <div className="article-card-tag">{a.tag}</div>
                  <h3>{a.title}</h3>
                  <p className="article-card-excerpt">{a.excerpt}</p>
                  <div className="article-card-meta">
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      {a.date}
                    </span>
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {a.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter dict={dict} locale={locale} />
    </>
  );
}
