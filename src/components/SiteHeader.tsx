"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { asset } from "@/lib/asset";
import type { Dict, Locale } from "@/lib/i18n";

interface SiteHeaderProps {
  dict: Dict;
  locale: Locale;
  switchPath: string;
}

function localizeHref(href: string, locale: Locale): string {
  if (!href) return href;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("tel:") || href.startsWith("mailto:")) return href;
  if (locale === "uk") return href;
  return `/ru${href === "/" ? "" : href}` || "/ru";
}

export default function SiteHeader({ dict, locale, switchPath }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const homeHref = locale === "uk" ? "/" : "/ru";

  return (
    <header className="header">
      <div className="container">
        <Link href={homeHref} className="header-logo">
          <Image
            src={asset("/images/logo_mini.png")}
            alt={dict.header.logoAlt}
            width={48}
            height={48}
            priority
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
          <Link
            href={switchPath}
            className="lang-switch"
            aria-label={dict.header.langSwitchLabel}
          >
            {dict.header.otherLangLabel}
          </Link>
          <a href="tel:+380505940785" className="header-phone" data-contact="phone">
            {dict.header.phoneLabel}
          </a>
          <Link
            href={localizeHref("/#konsultaciya", locale)}
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
            <a href="tel:+380505940785" className="mobile-menu-phone" data-contact="phone">
              {dict.header.phoneLabel}
            </a>
            <Link
              href={localizeHref("/#konsultaciya", locale)}
              className="btn btn-primary btn-header-cta"
              onClick={() => setMenuOpen(false)}
            >
              {dict.header.ctaLabel}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
