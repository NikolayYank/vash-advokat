"use client";

import { useEffect } from "react";
import Link from "next/link";
import { asset } from "@/lib/asset";
import OptimizedImage from "@/components/OptimizedImage";
import Breadcrumbs, { type BreadcrumbUiItem } from "@/components/Breadcrumbs";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import type { Dict, Locale, ArticleEntry } from "@/lib/i18n";

function localizeHref(href: string, locale: Locale): string {
  if (!href) return href;
  if (href.startsWith("#") || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) return href;
  if (locale === "uk") return href;
  return `/ru${href === "/" ? "" : href}` || "/ru";
}

function formatIsoDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!match) return iso;
  const [, y, m, d] = match;
  return `${d}.${m}.${y}`;
}

interface Props {
  article: ArticleEntry;
  dict: Dict;
  locale: Locale;
  breadcrumbs?: BreadcrumbUiItem[];
  breadcrumbLabel?: string;
  relatedArticles?: ArticleEntry[];
  relatedLabel?: string;
}

export default function ArticleContent({ article, dict, locale, breadcrumbs, breadcrumbLabel, relatedArticles, relatedLabel }: Props) {
  useEffect(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>(".toc-list a");
    const sections: { id: string; el: Element; link: HTMLAnchorElement }[] = [];

    links.forEach((link) => {
      const id = link.getAttribute("href")?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (el) sections.push({ id, el, link });
    });

    function updateActive() {
      let current = sections[0];
      for (const s of sections) {
        if (s.el.getBoundingClientRect().top <= 120) {
          current = s;
        }
      }
      links.forEach((l) => l.classList.remove("active"));
      if (current) current.link.classList.add("active");
    }

    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive();
    return () => window.removeEventListener("scroll", updateActive);
  }, []);

  const switchPath =
    locale === "uk" ? `/ru/blog/${article.slug}` : `/blog/${article.slug}`;

  return (
    <>
      <SiteHeader dict={dict} locale={locale} switchPath={switchPath} />

      {/* LAYOUT */}
      <div className="article-layout">
        {/* Sidebar TOC */}
        <aside className="toc">
          <div className="toc-label">{dict.article.tocLabel}</div>
          <ul className="toc-list">
            {article.toc.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Article Content */}
        <article className="article">
          {breadcrumbs && breadcrumbLabel && (
            <Breadcrumbs items={breadcrumbs} ariaLabel={breadcrumbLabel} />
          )}
          <div className="article-tag">{article.tag}</div>

          <h1>{article.title}</h1>

          <div className="article-meta">
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span>
                {dict.article.authorPrefix}{" "}
                <Link href={dict.article.authorProfilePath} className="article-author-link" rel="author">
                  {article.author}
                </Link>
                , {dict.article.authorCredential}
              </span>
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              {dict.article.publishedLabel}{" "}
              <time dateTime={article.datePublished}>{formatIsoDate(article.datePublished)}</time>
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
              {dict.article.modifiedLabel}{" "}
              <time dateTime={article.dateModified}>{formatIsoDate(article.dateModified)}</time>
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {article.readTime}
            </span>
          </div>

          <OptimizedImage
            src={article.image}
            alt={article.coverAlt}
            width={1200}
            height={675}
            className="article-cover"
            priority
            sizes="(max-width: 720px) 100vw, 720px"
          />

          <div className="article-body">{article.body}</div>

          {/* AUTHOR BIO */}
          <aside className="article-author-bio" aria-labelledby="article-author-bio-header">
            <div className="article-author-bio-body">
              <div id="article-author-bio-header" className="article-author-bio-header">
                {dict.article.authorBioHeader}
              </div>
              <div className="article-author-bio-name">{dict.article.authorBioName}</div>
              <div className="article-author-bio-title">{dict.article.authorBioTitle}</div>
              <ul className="article-author-bio-lines">
                {dict.article.authorBioLines.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
              <Link href={dict.article.authorProfilePath} className="article-author-bio-cta" rel="author">
                {dict.article.authorBioCta}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
            </div>
          </aside>

          {/* RELATED ARTICLES */}
          {relatedArticles && relatedArticles.length > 0 && (
            <section className="related-articles" aria-labelledby="related-articles-header">
              <h2 id="related-articles-header" className="related-articles-header">
                {relatedLabel ?? (locale === "uk" ? "Схожі матеріали" : "Похожие материалы")}
              </h2>
              <ul className="related-articles-list">
                {relatedArticles.map((r) => {
                  const href = locale === "uk" ? `/blog/${r.slug}/` : `/ru/blog/${r.slug}/`;
                  return (
                    <li key={r.slug} className="related-articles-item">
                      <Link href={href} className="related-articles-link">
                        <OptimizedImage
                          src={r.image}
                          alt={r.coverAlt}
                          width={320}
                          height={180}
                          className="related-articles-image"
                          sizes="(max-width: 720px) 100vw, 320px"
                        />
                        <div className="related-articles-body">
                          <div className="related-articles-tag">{r.tag}</div>
                          <div className="related-articles-title">{r.title}</div>
                          <time className="related-articles-date" dateTime={r.datePublished}>
                            {formatIsoDate(r.datePublished)}
                          </time>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* AI DISCLOSURE — ненав'язлива плашка для E-E-A-T, спеціально мінімалістична */}
          <p className="article-ai-disclosure" role="note">
            {dict.article.aiDisclosure}
          </p>

          {/* END BLOCK */}
          <div className="article-end">
            <img src={asset("/images/logo_mini.png")} alt={dict.header.logoAlt} className="article-end-logo" />
            <p>
              <strong>{article.endBlock.strong}</strong>
              <br />
              {article.endBlock.text}
            </p>
            <Link href={localizeHref("/#konsultaciya", locale)} className="article-end-link">
              {article.endBlock.cta}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
        </article>
      </div>

      <SiteFooter dict={dict} locale={locale} />
    </>
  );
}
