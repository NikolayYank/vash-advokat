"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Dict } from "@/lib/i18n";

const STORAGE_KEY = "va_consent_v1";

type ConsentValue = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

function pushConsentUpdate(value: ConsentValue) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push([
    "consent",
    "update",
    {
      ad_storage: value,
      ad_user_data: value,
      ad_personalization: value,
      analytics_storage: value,
    },
  ]);
}

export default function CookieConsent({ dict }: { dict: Dict["cookieBanner"] }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function decide(value: ConsentValue) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore quota / disabled storage
    }
    pushConsentUpdate(value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="cookie-consent"
      role="dialog"
      aria-label={dict.ariaLabel}
      aria-live="polite"
    >
      <div className="cookie-consent-inner">
        <div className="cookie-consent-text">
          <strong className="cookie-consent-title">{dict.title}</strong>
          <p>
            {dict.body}{" "}
            <Link href={dict.learnMoreHref} className="cookie-consent-link">
              {dict.learnMoreLabel}
            </Link>
          </p>
        </div>
        <div className="cookie-consent-actions">
          <button
            type="button"
            className="cookie-consent-btn-secondary"
            onClick={() => decide("denied")}
          >
            {dict.essentialsOnly}
          </button>
          <button
            type="button"
            className="btn btn-primary cookie-consent-btn-primary"
            onClick={() => decide("granted")}
          >
            {dict.acceptAll}
          </button>
        </div>
      </div>
    </div>
  );
}
