import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Phone, ArrowRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { uk } from "@/lib/i18n";
import "./thank-you.css";

export const metadata: Metadata = {
  title: uk.thankYou.metaTitle,
  description: uk.thankYou.metaDescription,
  robots: { index: false, follow: true },
  alternates: {
    canonical: "/thank-you/",
    languages: {
      "uk-UA": "/thank-you/",
      "ru-UA": "/ru/thank-you/",
      "x-default": "/thank-you/",
    },
  },
};

const dict = uk.thankYou;

export default function ThankYouPageUk() {
  return (
    <>
      <SiteHeader dict={uk} locale="uk" switchPath="/ru/thank-you/" />

      <main className="thank-you">
        <div className="thank-you-container">
          <CheckCircle2 className="thank-you-check" aria-hidden="true" />
          <h1 className="thank-you-h1">{dict.h1}</h1>
          <p className="thank-you-lead">{dict.lead}</p>

          <section className="thank-you-social" aria-labelledby="thank-you-social-h">
            <h2 id="thank-you-social-h" className="thank-you-social-header">
              {dict.socialHeader}
            </h2>
            <p className="thank-you-social-lead">{dict.socialLead}</p>

            <a
              href="https://www.instagram.com/advokat.veprytskyi/"
              target="_blank"
              rel="noopener noreferrer"
              className="thank-you-social-card"
              data-contact="instagram"
            >
              <span className="thank-you-social-icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </span>
              <span className="thank-you-social-body">
                <span className="thank-you-social-label">{dict.instagramLabel}</span>
                <span className="thank-you-social-handle">{dict.instagramHandle}</span>
              </span>
              <span className="thank-you-social-cta">
                {dict.instagramCta}
                <ArrowRight style={{ width: 16, height: 16 }} aria-hidden="true" />
              </span>
            </a>

            <a
              href="https://t.me/advokat_veprytskyi"
              target="_blank"
              rel="noopener noreferrer"
              className="thank-you-social-card"
              data-contact="telegram"
            >
              <span className="thank-you-social-icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </span>
              <span className="thank-you-social-body">
                <span className="thank-you-social-label">{dict.telegramLabel}</span>
                <span className="thank-you-social-handle">{dict.telegramHandle}</span>
              </span>
              <span className="thank-you-social-cta">
                {dict.telegramCta}
                <ArrowRight style={{ width: 16, height: 16 }} aria-hidden="true" />
              </span>
            </a>
          </section>

          <section className="thank-you-contacts" aria-labelledby="thank-you-contacts-h">
            <h2 id="thank-you-contacts-h" className="thank-you-contacts-header">
              {dict.contactsHeader}
            </h2>
            <div className="thank-you-contacts-row">
              <a href="tel:+380505940785" className="thank-you-contact" data-contact="phone">
                <Phone style={{ width: 18, height: 18 }} aria-hidden="true" />
                +380 50 594 07 85
              </a>
            </div>
          </section>

          <Link href="/" className="btn btn-outline thank-you-back">
            {dict.backHomeLabel}
          </Link>
        </div>
      </main>

      <SiteFooter dict={uk} locale="uk" />
    </>
  );
}
