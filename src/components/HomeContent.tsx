"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ShieldAlert,
  Briefcase,
  Scale,
  Shield,
  Building2,
  Heart,
  ScrollText,
  Car,
  ArrowRight,
  Award,
  Newspaper,
  Tv,
  ShieldCheck,
  FileBadge,
  MapPin,
  Check,
  Minus,
  Menu,
  X,
  Phone,
  Mail,
  Clock,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { asset } from "@/lib/asset";
import type { Dict, Locale } from "@/lib/i18n";
import ContactForm from "@/components/ContactForm";
import OptimizedImage from "@/components/OptimizedImage";

/* ===== Scroll reveal hook ===== */
function useReveal() {
  useEffect(() => {
    const revealEls = document.querySelectorAll(
      ".section-header, .pain-card, .step-item, .service-card, .partner, .blog-card, .cta-form, .gold-divider, .award-badge, [style*=\"border-top:3px\"]"
    );
    revealEls.forEach((el) => el.classList.add("reveal"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));

    const trustCard = document.querySelector(".trust-numbers");
    if (trustCard) {
      trustCard.classList.add("reveal");
      const trustObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.95) {
              entry.target.classList.add("visible");
              trustObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: [0.95, 1], rootMargin: "0px 0px -10% 0px" }
      );
      trustObserver.observe(trustCard);
    }

    document
      .querySelectorAll(".steps-grid, .services-grid, .blog-grid")
      .forEach((grid) => {
        Array.from(grid.children).forEach((child, i) => {
          (child as HTMLElement).style.transitionDelay = i * 0.08 + "s";
        });
      });

    return () => observer.disconnect();
  }, []);
}

/* ===== Counter animation hook ===== */
function useCounters(locale: Locale) {
  useEffect(() => {
    const trustCard = document.querySelector(".trust-numbers");
    if (!trustCard) return;

    const localeTag = locale === "ru" ? "ru-RU" : "uk-UA";

    const runCounters = () => {
      document.querySelectorAll(".trust-number").forEach((node) => {
        const el = node as HTMLElement;
        if (el.dataset.counted === "1") return;
        el.dataset.counted = "1";
        const text = el.textContent?.trim() || "";
        const match = text.match(/^([\d\s]+)/);
        if (!match) return;
        const target = parseInt(match[1].replace(/\s/g, ""));
        const suffix = text.replace(match[1], "");
        const duration = 1800;
        const start = performance.now();

        function tick(now: number) {
          const progress = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(target * ease);
          el.textContent =
            current.toLocaleString(localeTag).replace(/,/g, " ") + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    };

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.95) {
            runCounters();
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: [0.95, 1], rootMargin: "0px 0px -10% 0px" }
    );
    cardObserver.observe(trustCard);
    return () => cardObserver.disconnect();
  }, [locale]);
}

const socials: { title: string; href: string; svg: React.ReactNode; viewBox: string }[] = [
  {
    title: "Facebook",
    href: "#",
    svg: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />,
    viewBox: "0 0 24 24",
  },
  {
    title: "Instagram",
    href: "#",
    svg: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />,
    viewBox: "0 0 24 24",
  },
  {
    title: "YouTube",
    href: "#",
    svg: <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />,
    viewBox: "0 0 24 24",
  },
  {
    title: "Telegram",
    href: "#",
    svg: <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />,
    viewBox: "0 0 24 24",
  },
  {
    title: "TikTok",
    href: "#",
    svg: <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />,
    viewBox: "0 0 24 24",
  },
  {
    title: "Threads",
    href: "#",
    svg: <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.24-38.37 34.76.384 9.848 5.063 18.348 13.179 23.937 6.86 4.727 15.684 7.084 24.853 6.644 12.098-.58 21.592-5.179 28.218-13.657 5.028-6.433 8.207-14.756 9.573-25.14 5.716 3.452 9.972 8.003 12.382 13.542 4.085 9.381 4.328 24.793-8.472 37.621-11.254 11.275-24.79 16.138-45.156 16.318-22.593-.2-39.679-7.417-50.785-21.449C33.469 140.534 27.336 119.65 27.12 96c.215-23.65 6.35-44.534 18.228-62.117C56.454 19.83 73.54 12.617 96.133 12.417c22.744.202 40.058 7.455 51.44 21.551 5.614 6.955 9.81 15.465 12.525 25.328l14.7-3.89c-3.238-11.694-8.268-21.933-15.063-30.378C146.158 8.312 125.583-.077 96.19 0h-.114C66.86.077 46.593 8.56 33.236 25.27 18.16 44.16 10.48 70.493 10.217 96l-.002.073c.263 25.507 7.944 51.84 23.019 70.73 13.357 16.71 33.625 25.194 62.81 25.27h.114c24.26-.194 41.697-6.875 56.482-21.642 19.719-19.7 18.585-43.972 12.088-58.907-4.664-10.718-13.515-19.404-25.19-24.536zm-43.89 41.558c-10.164.488-20.74-3.993-21.38-14.065-.467-7.326 5.238-15.502 24.628-16.617 2.16-.124 4.276-.183 6.349-.183 6.27 0 12.137.597 17.463 1.7-1.987 24.327-14.58 28.613-27.06 29.165z" />,
    viewBox: "0 0 192 192",
  },
];

const serviceIcons: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  shahrajstvo: ShieldAlert,
  "kryminalnyj-zahyst": Scale,
  "vijskove-pravo": Shield,
  neruhomist: Building2,
  "simejne-pravo": Heart,
  "spadkove-pravo": ScrollText,
  dtp: Car,
  "zahyst-biznesu": Briefcase,
};

const serviceOrder = [
  "shahrajstvo",
  "kryminalnyj-zahyst",
  "vijskove-pravo",
  "neruhomist",
  "simejne-pravo",
  "spadkove-pravo",
  "dtp",
  "zahyst-biznesu",
];

function localizeHref(href: string, locale: Locale): string {
  if (!href) return href;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("tel:") || href.startsWith("mailto:")) return href;
  if (locale === "uk") return href;
  return `/ru${href === "/" ? "" : href}` || "/ru";
}

export default function HomeContent({ dict, locale }: { dict: Dict; locale: Locale }) {
  useReveal();
  useCounters(locale);

  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const homeHref = locale === "uk" ? "/" : "/ru";
  const switchPath = locale === "uk" ? "/ru" : "/";

  return (
    <>
      {/* ===== HEADER ===== */}
      <header className="header">
        <div className="container">
          <Link href={homeHref} className="header-logo">
            <Image
              src={asset("/images/logo_mini.png")}
              alt={dict.header.logoAlt}
              width={48}
              height={48}
            />
            <div className="header-logo-text">
              {dict.header.logoTitle}
              <small>{dict.header.logoSubtitle}</small>
            </div>
          </Link>

          <nav>
            <ul className="header-nav">
              {dict.header.nav.map((link) => (
                <li key={link.href}>
                  <Link href={localizeHref(link.href, locale)}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-right">
            <Link href={switchPath} className="lang-switch" aria-label={dict.header.langSwitchLabel}>
              {dict.header.otherLangLabel}
            </Link>
            <a href="tel:+380505940785" className="header-phone">
              {dict.header.phoneLabel}
            </a>
            <Link
              href={localizeHref("#konsultaciya", locale)}
              className="btn btn-primary btn-header-cta"
            >
              {dict.header.ctaLabel}
            </Link>
          </div>

          <Link
            href={switchPath}
            className="lang-switch-mobile"
            aria-label={dict.header.langSwitchLabel}
          >
            {dict.header.otherLangLabel}
          </Link>

          <button
            className="menu-toggle"
            aria-label={dict.header.menuLabel}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X style={{ width: 24, height: 24 }} />
            ) : (
              <Menu style={{ width: 24, height: 24 }} />
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            <nav className="mobile-menu-nav">
              {dict.header.nav.map((link) => (
                <Link
                  key={link.href}
                  href={localizeHref(link.href, locale)}
                  className="mobile-menu-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mobile-menu-cta">
              <a href="tel:+380505940785" className="mobile-menu-phone">
                {dict.header.phoneLabel}
              </a>
              <Link
                href={localizeHref("#konsultaciya", locale)}
                className="btn btn-primary btn-header-cta"
                onClick={() => setMenuOpen(false)}
              >
                {dict.header.ctaLabel}
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="eyebrow-row">
              <span className="eyebrow">{dict.hero.eyebrow}</span>
            </div>
            <h1>{dict.hero.h1}</h1>
            <p className="hero-subtitle">{dict.hero.subtitle}</p>
          </div>
          <div
            className="hero-photo"
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <div className="hero-video-wrap">
              <MuxPlayer
                playbackId="3kWyg0201HO1MAdbmQTlQU81vz9dQOjkZGg4GChJO25Bc"
                streamType="on-demand"
                thumbnailTime={56}
                accentColor="#d4af37"
                style={{ width: "100%", display: "block", aspectRatio: "16/9" }}
              />
            </div>
          </div>
          <div className="hero-actions">
            <Link href={localizeHref("#konsultaciya", locale)} className="btn btn-primary btn-hero">
              {dict.hero.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TRUST NUMBERS ===== */}
      <section className="trust-numbers">
        <div className="container">
          {dict.trust.items.map((item, i) => (
            <div key={i} className="trust-item">
              <div className="trust-number">{item.number}</div>
              <div className="trust-label">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <hr className="gold-divider" />

      {/* ===== SERVICES ===== */}
      <section className="section section-muted" id="poslugy">
        <div className="container">
          <div className="section-header">
            <h2>{dict.services.sectionTitle}</h2>
            <p>{dict.services.sectionHint}</p>
          </div>

          <div className="services-grid" style={{ alignItems: "start" }}>
            {serviceOrder.map((key, idx) => {
              const s = dict.services.items[key];
              const Icon = serviceIcons[key];
              const isExpanded = expandedService === idx;
              return (
                <div
                  key={key}
                  className="service-card"
                  onClick={() => setExpandedService(isExpanded ? null : idx)}
                  style={{
                    cursor: "pointer",
                    flexDirection: "column",
                    alignItems: "stretch",
                    transition: "box-shadow 0.25s ease, transform 0.25s ease",
                    boxShadow: isExpanded ? "0 8px 24px rgba(15,30,77,0.12)" : undefined,
                    borderColor: isExpanded ? "var(--color-accent)" : undefined,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <Icon className="service-icon" style={{ width: 24, height: 24, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ marginBottom: 4 }}>{s.title}</h3>
                      <p style={{ margin: 0 }}>{s.desc}</p>
                    </div>
                    <ChevronDown
                      style={{
                        width: 20,
                        height: 20,
                        flexShrink: 0,
                        color: "var(--color-text-muted)",
                        transition: "transform 0.3s ease",
                        transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      maxHeight: isExpanded ? 400 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.4s ease, margin-top 0.3s ease, padding-top 0.3s ease",
                      marginTop: isExpanded ? 16 : 0,
                      paddingTop: isExpanded ? 16 : 0,
                      borderTop: isExpanded ? "1px solid var(--color-border)" : "none",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.7rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "var(--color-text-muted)",
                        fontWeight: 700,
                        marginBottom: 6,
                      }}
                    >
                      {dict.services.situationsLabel}
                    </div>
                    <p style={{ margin: "0 0 14px", fontSize: "0.9375rem", lineHeight: 1.55 }}>
                      {s.scenarios}
                    </p>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "var(--color-accent)",
                        fontWeight: 700,
                        marginBottom: 6,
                      }}
                    >
                      {dict.services.actionLabel}
                    </div>
                    <p style={{ margin: 0, fontSize: "0.9375rem", lineHeight: 1.55 }}>
                      {s.action}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== HOW WE WORK ===== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>{dict.steps.sectionTitle}</h2>
          </div>

          <div className="steps-grid">
            {dict.steps.items.map((s, i) => (
              <div key={i} className="step-item" style={{ textAlign: "left" }}>
                <div className="step-number" style={{ margin: "0 0 var(--space-md) 0" }}>
                  {i + 1}
                </div>
                <h3 style={{ textAlign: "left", marginBottom: 6 }}>{s.title}</h3>
                <div
                  style={{
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--color-text-muted)",
                    fontWeight: 700,
                    marginBottom: 12,
                  }}
                >
                  {s.note}
                </div>
                <p style={{ textAlign: "left" }}>{s.text}</p>
                {s.hint && (
                  <p
                    style={{
                      textAlign: "left",
                      marginTop: 8,
                      fontSize: "0.8125rem",
                      fontStyle: "italic",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {s.hint}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOUNDER ===== */}
      <section className="section section-muted" id="pro-nas">
        <div className="container">
          {dict.partners.sectionTitle || dict.partners.sectionHint ? (
            <div className="section-header partners-header">
              {dict.partners.sectionTitle ? (
                <h2>{dict.partners.sectionTitle}</h2>
              ) : null}
              {dict.partners.sectionHint ? (
                <p className="section-hint">{dict.partners.sectionHint}</p>
              ) : null}
            </div>
          ) : null}

          <div className="partners-grid">
            {dict.partners.items.map((p, idx) => (
              <article
                key={idx}
                className={`partner${p.reverse ? " partner--reverse" : ""}`}
              >
                <div className="partner-photo">
                  <img
                    src={asset(p.image)}
                    alt={p.imageAlt}
                    className="partner-photo-img"
                  />
                </div>
                <div className="partner-info">
                  <h3 className="partner-name">{p.name}</h3>
                  <div className="partner-title">{p.title}</div>

                  {p.badges?.length ? (
                    <ul className="partner-badges">
                      {p.badges.map((b, bi) => (
                        <li key={bi} className="badge">
                          <span aria-hidden="true" className="badge-icon">{b.icon}</span>
                          <span>{b.label}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="partner-bio">
                    {p.bio.map((para, pi) => (
                      <p key={pi}>{para}</p>
                    ))}
                  </div>

                  {p.quote ? (
                    <blockquote className="partner-quote">{p.quote}</blockquote>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== B2B TEASER ===== */}
      <section className="section section-dark b2b-teaser" id="abonement">
        <div className="container b2b-grid">
          <div>
            <div className="eyebrow-row">
              <span className="eyebrow-hair" />
              <span className="eyebrow">{dict.abonement.eyebrow}</span>
            </div>
            <h2 style={{ color: "var(--color-surface)", marginBottom: "var(--space-md)", lineHeight: 1.15 }}>
              {dict.abonement.h2}
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                marginBottom: "var(--space-lg)",
                lineHeight: 1.7,
              }}
            >
              {dict.abonement.lead}
            </p>

            <div style={{ marginBottom: "var(--space-xl)" }}>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.875rem",
                  fontWeight: 700,
                  color: "var(--color-accent)",
                  lineHeight: 1.2,
                }}
              >
                {dict.abonement.priceLine}
              </div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", marginTop: 6 }}>
                {dict.abonement.priceNote}
              </div>
            </div>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14, marginBottom: "var(--space-xl)" }}>
              {dict.abonement.features.map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "0.9375rem",
                    lineHeight: 1.55,
                  }}
                >
                  <Check style={{ width: 18, height: 18, color: "var(--color-accent)", flexShrink: 0, marginTop: 3 }} />
                  <span>
                    <strong style={{ color: "var(--color-surface)" }}>{item.strong}</strong>
                    <span style={{ color: "rgba(255,255,255,0.7)" }}>{item.thin}</span>
                  </span>
                </li>
              ))}
            </ul>

            <Link href={localizeHref("#konsultaciya", locale)} className="btn btn-outline btn-section abonement-cta-desktop">
              {dict.abonement.ctaLabel} <ArrowRight style={{ width: 18, height: 18 }} />
            </Link>
          </div>

          {/* Desktop comparison table */}
          <div className="compare-desktop" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
            <div className="compare-row compare-header">
              <div style={{ padding: "var(--space-lg)" }} />
              <div style={{ padding: "var(--space-lg)", textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {dict.abonement.compareOnceHeader}
              </div>
              <div style={{ padding: "var(--space-lg)", textAlign: "center", background: "rgba(212,175,55,0.08)", borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-accent)" }}>
                  {dict.abonement.compareYearlyHeader}
                </div>
              </div>
            </div>
            {dict.abonement.compareRows.map((row, i, arr) => {
              const isLast = i === arr.length - 1;
              const isEmergency = row.label === dict.abonement.compareMobileLabels.emergency;
              return (
                <div key={i} className={`compare-row${isLast ? " compare-last" : ""}`}>
                  <div style={{ padding: "12px var(--space-lg)", color: "rgba(255,255,255,0.6)", fontSize: "0.8125rem" }}>
                    {row.label}
                  </div>
                  <div style={
                    i === 0
                      ? { padding: "12px var(--space-lg)", color: "var(--color-surface)", fontFamily: "var(--font-heading)", fontSize: "1.125rem", fontWeight: 700 }
                      : isEmergency
                      ? { padding: "12px var(--space-lg)", color: "rgba(255,255,255,0.25)" }
                      : { padding: "12px var(--space-lg)", color: "rgba(255,255,255,0.35)", fontSize: "0.8125rem" }
                  }>
                    {isEmergency ? <Minus style={{ width: 16, height: 16 }} /> : row.once}
                  </div>
                  <div style={
                    i === 0
                      ? { padding: "12px var(--space-lg)", background: "rgba(212,175,55,0.05)", borderLeft: "1px solid rgba(255,255,255,0.06)", color: "var(--color-accent)", fontFamily: "var(--font-heading)", fontSize: "1.125rem", fontWeight: 700 }
                      : { padding: "12px var(--space-lg)", background: "rgba(212,175,55,0.05)", borderLeft: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.85)", fontSize: "0.8125rem", fontWeight: 700, ...(row.label === "Як побудовані стосунки" ? { whiteSpace: "nowrap" } : {}) }
                  }>
                    {row.yearly}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile comparison cards */}
          <div className="compare-mobile">
            <div className="compare-card" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.4)", marginBottom: "var(--space-md)" }}>
                {dict.abonement.compareMobileOnceLabel}
              </div>
              {dict.abonement.compareRows.map((row, i) => {
                const isEmergency = row.label === dict.abonement.compareMobileLabels.emergency;
                const shortLabel = (() => {
                  const L = dict.abonement.compareMobileLabels;
                  if (i === 0) return L.cost;
                  if (i === 1) return L.history;
                  if (i === 2) return L.availability;
                  if (i === 3) return L.relationship;
                  if (i === 4) return L.emergency;
                  if (i === 5) return L.panic;
                  return row.label;
                })();
                return (
                  <div key={i} className="compare-card-item">
                    <span className="compare-card-label">{shortLabel}</span>
                    <span className="compare-card-value" style={
                      i === 0
                        ? { color: "var(--color-surface)", fontWeight: 700 }
                        : isEmergency
                        ? { color: "rgba(255,255,255,0.25)" }
                        : { color: "rgba(255,255,255,0.35)" }
                    }>
                      {row.once}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="compare-card" style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.2)" }}>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-accent)", marginBottom: "var(--space-md)", fontWeight: 700 }}>
                {dict.abonement.compareMobileYearlyLabel}
              </div>
              {dict.abonement.compareRows.map((row, i) => {
                const isEmergency = row.label === dict.abonement.compareMobileLabels.emergency;
                const shortLabel = (() => {
                  const L = dict.abonement.compareMobileLabels;
                  if (i === 0) return L.cost;
                  if (i === 1) return L.history;
                  if (i === 2) return L.availability;
                  if (i === 3) return L.relationship;
                  if (i === 4) return L.emergency;
                  if (i === 5) return L.panic;
                  return row.label;
                })();
                return (
                  <div key={i} className="compare-card-item">
                    <span className="compare-card-label">{shortLabel}</span>
                    <span className="compare-card-value" style={
                      i === 0
                        ? { color: "var(--color-accent)", fontWeight: 700, fontFamily: "var(--font-heading)", fontSize: "1rem" }
                        : isEmergency
                        ? { color: "var(--color-accent)", fontWeight: 700 }
                        : { color: "rgba(255,255,255,0.85)", fontWeight: 600 }
                    }>
                      {row.yearly}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <Link href={localizeHref("#konsultaciya", locale)} className="btn btn-outline btn-section abonement-cta-mobile">
            {dict.abonement.ctaLabel} <ArrowRight style={{ width: 18, height: 18 }} />
          </Link>
        </div>
      </section>

      {/* ===== MEDIA & AWARDS ===== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>{dict.awards.sectionTitle}</h2>
            <p>{dict.awards.sectionHint}</p>
          </div>

          <div className="awards-grid">
            {dict.awards.cards.map((card, i) => {
              const Icon = [Award, Newspaper, Tv][i];
              const borderColor = i === 0 ? "var(--color-accent)" : "var(--color-primary)";
              const iconBg = i === 0 ? "rgba(212,175,55,0.1)" : "rgba(30,58,138,0.08)";
              const iconColor = i === 0 ? "var(--color-accent)" : "var(--color-primary)";
              return (
                <div
                  key={i}
                  style={{
                    background: "var(--color-surface)",
                    borderRadius: "var(--radius-lg)",
                    padding: "var(--space-xl)",
                    boxShadow: "var(--shadow-card)",
                    textAlign: "left",
                    borderTop: `3px solid ${borderColor}`,
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      margin: "0 0 var(--space-md)",
                      background: iconBg,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon style={{ width: 32, height: 32, color: iconColor }} />
                  </div>
                  <h3 style={{ fontSize: "1.125rem", marginBottom: "var(--space-sm)" }}>
                    {card.title}
                  </h3>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
                    {card.text}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="official-badges-row">
            {dict.awards.badges.map((badge, i) => {
              const IconMap = { file: FileBadge, scroll: ScrollText, shield: ShieldCheck };
              const Icon = IconMap[badge.icon];
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
                  <Icon style={{ width: 20, height: 20, color: "var(--color-accent)" }} />
                  <span>{badge.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== BLOG PREVIEW ===== */}
      <section className="section section-muted">
        <div className="container">
          <div className="section-header">
            <h2>{dict.blogPreview.sectionTitle}</h2>
            <p>{dict.blogPreview.sectionHint}</p>
          </div>

          <div className="blog-grid blog-grid-desktop">
            {dict.blogPreview.cards.map((c) => (
              <Link key={c.href} href={localizeHref(c.href, locale)} className="blog-card">
                <div className="blog-card-image">
                  <OptimizedImage
                    src={c.img}
                    alt={c.title}
                    width={480}
                    height={270}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    sizes="(max-width: 720px) 100vw, 360px"
                  />
                </div>
                <div className="blog-card-body">
                  <div className="blog-card-tag">{c.tag}</div>
                  <h3>{c.title}</h3>
                  <div className="blog-card-meta">{c.metaFull}</div>
                </div>
              </Link>
            ))}
          </div>

          <div className="blog-scroll">
            {dict.blogPreview.cards.map((c) => (
              <Link key={c.href} href={localizeHref(c.href, locale)} className="blog-scroll-card">
                <div className="blog-scroll-image">
                  <OptimizedImage
                    src={c.img}
                    alt={c.title}
                    width={480}
                    height={270}
                    sizes="(max-width: 720px) 80vw, 360px"
                  />
                </div>
                <div className="blog-scroll-body">
                  <div className="blog-scroll-tag">{c.tag}</div>
                  <h3 className="blog-scroll-title">{c.title}</h3>
                  <p className="blog-scroll-excerpt">{c.excerpt}</p>
                  <div className="blog-scroll-meta">
                    <span>{c.meta} {dict.blogPreview.readLabel}</span>
                    <span className="blog-scroll-arrow">{dict.blogPreview.readMoreArrow}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "var(--space-2xl)" }}>
            <Link href={localizeHref("/blog", locale)} className="btn btn-primary btn-section">
              {dict.blogPreview.allButton} <ArrowRight style={{ width: 18, height: 18 }} />
            </Link>
            <div style={{ marginTop: 14, color: "var(--color-text-muted)", fontSize: "0.875rem", fontStyle: "italic" }}>
              {dict.blogPreview.subscribeNote}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="cta-final" id="konsultaciya">
        <div className="container">
          <div className="eyebrow-row">
            <span className="eyebrow-hair" />
            <span className="eyebrow">{dict.ctaFinal.eyebrow}</span>
            <span className="eyebrow-hair" />
          </div>
          <h2>{dict.ctaFinal.h2}</h2>
          <p>{dict.ctaFinal.lead}</p>

          <ContactForm dict={dict.ctaFinal} />
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer" id="kontakty" style={{ borderTop: "2px solid var(--color-accent)" }}>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src={asset("/images/logo_mini.png")} alt={dict.header.logoAlt} />
              <p>{dict.footer.brandText}</p>
            </div>

            <div>
              <h4>{dict.footer.servicesHeader}</h4>
              <ul className="footer-links">
                {dict.footer.servicesLinks.map((s) => (
                  <li key={s.href}>
                    <Link href={localizeHref(s.href, locale)}>{s.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4>{dict.footer.companyHeader}</h4>
              <ul className="footer-links">
                {dict.footer.companyLinks.map((c) => (
                  <li key={c.href}>
                    <Link href={localizeHref(c.href, locale)}>{c.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4>{dict.footer.contactsHeader}</h4>
              <div className="footer-contact-item">
                <Phone style={{ width: 16, height: 16 }} />
                <div>
                  <a href="tel:+380505940785" style={{ color: "rgba(255,255,255,0.8)" }}>
                    +380 50 594 07 85
                  </a>
                </div>
              </div>
              <div className="footer-contact-item">
                <Mail style={{ width: 16, height: 16 }} />
                <div>
                  <a href="mailto:promo.vashadvokat@gmail.com" style={{ color: "rgba(255,255,255,0.8)" }}>
                    promo.vashadvokat@gmail.com
                  </a>
                </div>
              </div>
              <div className="footer-contact-item">
                <MapPin style={{ width: 16, height: 16 }} />
                <div>{dict.footer.addressLines}</div>
              </div>
              <div className="footer-contact-item">
                <Clock style={{ width: 16, height: 16 }} />
                <div>{dict.footer.hoursLines}</div>
              </div>

              {/* Social links */}
              <div className="footer-socials" style={{ display: "flex", gap: 14, marginTop: "var(--space-lg)" }}>
                {socials.map((s) => (
                  <a
                    key={s.title}
                    href={s.href}
                    title={s.title}
                    className="footer-social-link"
                    style={{
                      width: 36,
                      height: 36,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.08)",
                      transition: "background 200ms ease",
                    }}
                    onMouseOver={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(212,175,55,0.25)";
                    }}
                    onMouseOut={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                    }}
                  >
                    <svg width="18" height="18" viewBox={s.viewBox} fill="rgba(255,255,255,0.7)">
                      {s.svg}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>{dict.footer.copyright}</p>
            <div className="footer-badges">
              <span className="footer-badge">
                <ShieldCheck style={{ width: 14, height: 14 }} /> {dict.footer.badgeCouncil}
              </span>
              <span className="footer-badge">
                <FileBadge style={{ width: 14, height: 14 }} /> {dict.footer.badgeOrder}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
