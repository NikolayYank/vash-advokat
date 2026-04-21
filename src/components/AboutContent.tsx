"use client";

import Link from "next/link";
import { asset } from "@/lib/asset";
import Breadcrumbs, { type BreadcrumbUiItem } from "@/components/Breadcrumbs";
import OptimizedImage from "@/components/OptimizedImage";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import type { Dict, Locale } from "@/lib/i18n";

interface Props {
  dict: Dict;
  locale: Locale;
  breadcrumbs?: BreadcrumbUiItem[];
  breadcrumbLabel?: string;
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

export default function AboutContent({ dict, locale, breadcrumbs, breadcrumbLabel }: Props) {
  const about = dict.about;
  const switchPath = locale === "uk" ? "/ru/o-nas" : "/pro-nas";

  // Partner blocks — Veprytsky (extended from about dict) + Galavan (compact from home dict)
  const veprytsky = {
    image: "/images/ava.jpg",
    imageAlt: about.imageAlt,
    name:
      locale === "uk"
        ? "Сергій Сергійович Веприцький"
        : "Сергей Сергеевич Веприцкий",
    title:
      locale === "uk" ? (
        <>Засновник Фундації адвокатів України</>
      ) : (
        <>Основатель Фундации адвокатов Украины</>
      ),
    badges: about.credentials,
    bio: about.bio,
    quote: dict.partners.items[0]?.quote,
  };
  const galavan = dict.partners.items[1];

  return (
    <>
      <SiteHeader dict={dict} locale={locale} switchPath={switchPath} />

      <main>
      <article className="article about-page">
        {breadcrumbs && breadcrumbLabel && (
          <Breadcrumbs items={breadcrumbs} ariaLabel={breadcrumbLabel} />
        )}
        <h1>{about.h1}</h1>
        <p className="about-lead">{about.lead}</p>

        <div className="partners-grid about-partners">
          {/* Veprytsky — extended */}
          <article className="partner">
            <div className="partner-photo">
              <OptimizedImage
                src={veprytsky.image}
                alt={veprytsky.imageAlt}
                width={280}
                height={350}
                className="partner-photo-img"
                sizes="(max-width: 720px) 220px, 280px"
                priority
              />
            </div>
            <div className="partner-info">
              <h2 className="partner-name">{veprytsky.name}</h2>
              <div className="partner-title">{veprytsky.title}</div>
              <ul className="partner-badges">
                {veprytsky.badges.map((b, i) => (
                  <li key={i} className="badge">
                    <span aria-hidden="true" className="badge-icon">
                      {b.icon}
                    </span>
                    <span>{b.label}</span>
                  </li>
                ))}
              </ul>
              <div className="partner-bio">
                {veprytsky.bio.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              {veprytsky.quote ? (
                <blockquote className="partner-quote">{veprytsky.quote}</blockquote>
              ) : null}
            </div>
          </article>

          {/* Galavan — compact (reused from home dict) */}
          {galavan ? (
            <article className={`partner${galavan.reverse ? " partner--reverse" : ""}`}>
              <div className="partner-photo">
                <OptimizedImage
                  src={galavan.image}
                  alt={galavan.imageAlt}
                  width={280}
                  height={350}
                  className="partner-photo-img"
                  sizes="(max-width: 720px) 220px, 280px"
                />
              </div>
              <div className="partner-info">
                <h2 className="partner-name">{galavan.name}</h2>
                <div className="partner-title">{galavan.title}</div>
                {galavan.badges?.length ? (
                  <ul className="partner-badges">
                    {galavan.badges.map((b, i) => (
                      <li key={i} className="badge">
                        <span aria-hidden="true" className="badge-icon">
                          {b.icon}
                        </span>
                        <span>{b.label}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <div className="partner-bio">
                  {galavan.bio.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                {galavan.quote ? (
                  <blockquote className="partner-quote">{galavan.quote}</blockquote>
                ) : null}
              </div>
            </article>
          ) : null}
        </div>

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
          <Link
            href={localizeHref("/#konsultaciya", locale)}
            className="article-end-link"
          >
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
      </main>

      <SiteFooter dict={dict} locale={locale} />
    </>
  );
}
