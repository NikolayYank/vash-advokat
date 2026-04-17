const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const STORAGE_KEY = "va_utm";

export type UtmData = Partial<Record<(typeof UTM_KEYS)[number], string>>;

export function captureUtm(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const found: UtmData = {};
    let hasAny = false;
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) {
        found[key] = value.slice(0, 200);
        hasAny = true;
      }
    }
    if (hasAny) {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    }
  } catch {
    // sessionStorage недоступен (Safari private, iframe) — игнорируем
  }
}

export function readUtm(): UtmData {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as UtmData;
  } catch {
    return {};
  }
}
