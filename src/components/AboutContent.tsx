"use client";

import Link from "next/link";
import { asset } from "@/lib/asset";
import type { Dict, Locale } from "@/lib/i18n";

interface Props {
  dict: Dict;
  locale: Locale;
}

function localizeHref(href: string, locale: Locale): string {
  if (!href) return href;
  if (
    href.startsWith("#") ||
    href.startsWith("http") ||
    href.startsWith("tel:") ||
    href.startsWith("mailto:")
  )
    return href;
  if (locale === "uk") return href;
  return `/ru${href === "/" ? "" : href}` || "/ru";
}

export default function AboutContent({ dict, locale }: Props) {
  const about = dict.about;
  const homeHref = locale === "uk" ? "/" : "/ru";
  const blogHref = locale === "uk" ? "/blog" : "/ru/blog";
  const switchPath = locale === "uk" ? "/ru/o-nas" : "/pro-nas";

  return (
    <>
      <header className="header-article">
        <div className="container">
          <Link href={homeHref} className="header-logo">
            <img src={asset("/images/logo_mini.png")} alt={dict.header.logoAlt} />
            <div className="header-logo-text">
              {dict.header.logoTitle}
              <small>{dict.header.logoSubtitle}</small>
            </div>
          </Link>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-md)",
            }}
          >
            <Link
              href={switchPath}
              className="lang-switch"
              aria-label={dict.header.langSwitchLabel}
            >
              {dict.header.otherLangLabel}
            </Link>
            <Link href={blogHref} className="header-back">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              {dict.article.backToBlog}
            </Link>
          </div>
        </div>
      </header>

      <article className="article about-page">
        <h1>{about.h1}</h1>

        <img
          src={asset("/images/ava.jpg")}
          alt={about.imageAlt}
          className="article-cover"
        />

        <p className="about-lead">{about.lead}</p>

        <h2>{about.credentialsHeader}</h2>
        <ul className="about-credentials">
          {about.credentials.map((c, i) => (
            <li key={i}>
              <span className="about-credential-icon">{c.icon}</span>
              <span>{c.label}</span>
            </li>
          ))}
        </ul>

        <h2>{about.bioHeader}</h2>
        {about.bio.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        <h2>{about.practiceHeader}</h2>
        <ul className="about-points">
          {about.practicePoints.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>

        <h2>{about.mediaHeader}</h2>
        <ul className="about-points">
          {about.mediaPoints.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>

        <div className="article-end">
          <img
            src={asset("/images/logo_mini.png")}
            alt={dict.header.logoAlt}
            className="article-end-logo"
          />
          <p>
            <strong>{about.ctaHeader}</strong>
            <br />
            {about.ctaText}
          </p>
          <Link href={localizeHref("/#konsultaciya", locale)} className="article-end-link">
            {about.ctaButton}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </article>

      <footer className="footer-minimal">
        <div className="container">
          <p>
            &copy; 2026 {dict.header.logoAlt} &middot;{" "}
            <a href={homeHref}>vash-advokat.org</a>
          </p>
        </div>
      </footer>
    </>
  );
}
