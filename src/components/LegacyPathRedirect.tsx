"use client";

import { useEffect } from "react";

export default function LegacyPathRedirect() {
  useEffect(() => {
    const p = window.location.pathname;
    if (p.startsWith("/ua") || p.startsWith("/en")) {
      window.location.replace("/");
    }
  }, []);
  return null;
}
