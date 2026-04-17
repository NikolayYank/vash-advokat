"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { detectLocale } from "@/lib/i18n";

export default function LangSync() {
  const pathname = usePathname();
  useEffect(() => {
    const locale = detectLocale(pathname || "/");
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [pathname]);
  return null;
}
