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
  Check,
  Minus,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { asset } from "@/lib/asset";
import type { Dict, Locale } from "@/lib/i18n";
import ContactForm from "@/components/ContactForm";
import OptimizedImage from "@/components/OptimizedImage";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

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

  const [expandedService, setExpandedService] = useState<number | null>(null);

  const switchPath = locale === "uk" ? "/ru" : "/";

  return (
    <>
      <SiteHeader dict={dict} locale={locale} switchPath={switchPath} />

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
              <div style={{ color: "var(--text-on-dark-caption)", fontSize: "0.875rem", marginTop: 6 }}>
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
                    color: "var(--text-on-dark)",
                    fontSize: "0.9375rem",
                    lineHeight: 1.55,
                  }}
                >
                  <Check style={{ width: 18, height: 18, color: "var(--color-accent)", flexShrink: 0, marginTop: 3 }} />
                  <span>
                    <strong style={{ color: "var(--color-surface)" }}>{item.strong}</strong>
                    <span style={{ color: "var(--text-on-dark-muted)" }}>{item.thin}</span>
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
              <div style={{ gridColumn: "1 / span 2", padding: "var(--space-md) var(--space-lg)", textAlign: "left", color: "var(--text-on-dark-caption)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", lineHeight: 1.4 }}>
                {dict.abonement.compareOnceHeader}
              </div>
              <div style={{ gridColumn: "3 / span 1", padding: "var(--space-md) var(--space-lg)", textAlign: "left", background: "rgba(212,175,55,0.08)", borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-accent)", lineHeight: 1.4 }}>
                  {dict.abonement.compareYearlyHeader}
                </div>
              </div>
            </div>
            {dict.abonement.compareRows.map((row, i, arr) => {
              const isLast = i === arr.length - 1;
              const isEmergency = row.label === dict.abonement.compareMobileLabels.emergency;
              return (
                <div key={i} className={`compare-row${isLast ? " compare-last" : ""}`}>
                  <div style={{ padding: "12px var(--space-lg)", color: "var(--text-on-dark-muted)", fontSize: "0.8125rem" }}>
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
                      : { padding: "12px var(--space-lg)", background: "rgba(212,175,55,0.05)", borderLeft: "1px solid rgba(255,255,255,0.06)", color: "var(--text-on-dark)", fontSize: "0.8125rem", fontWeight: 700, ...(row.label === "Як побудовані стосунки" ? { whiteSpace: "nowrap" } : {}) }
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
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-on-dark-caption)", marginBottom: "var(--space-md)", lineHeight: 1.4 }}>
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
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-accent)", marginBottom: "var(--space-md)", fontWeight: 700, lineHeight: 1.4 }}>
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

      <SiteFooter dict={dict} locale={locale} />
    </>
  );
}
