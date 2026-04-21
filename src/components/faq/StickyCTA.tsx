"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { PhoneIcon } from "./Icon";

interface Props {
  locale: Locale;
  href?: string;
}

const labels = {
  uk: "Викликати адвоката",
  ru: "Вызвать адвоката",
} as const;

export default function StickyCTA({ locale, href }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      setVisible(pct > 0.3);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const target = href ?? (locale === "uk" ? "/#konsultaciya" : "/ru/#konsultaciya");

  return (
    <Link
      href={target}
      className={`sticky-cta-pill ${visible ? "visible" : ""}`}
      aria-label={labels[locale]}
    >
      <PhoneIcon width={18} height={18} />
      <span>{labels[locale]}</span>
    </Link>
  );
}
