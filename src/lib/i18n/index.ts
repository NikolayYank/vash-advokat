import { uk } from "./uk";
import { ru } from "./ru";
import type { Dict, Locale } from "./types";

export { uk, ru };
export type { Dict, Locale };
export { DEFAULT_LOCALE, LOCALES } from "./types";

export const dictionaries: Record<Locale, Dict> = { uk, ru };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale];
}

/**
 * Swap the locale prefix in a path:
 *   "/" + "ru"  -> "/ru"
 *   "/blog" + "ru" -> "/ru/blog"
 *   "/ru/blog" + "uk" -> "/blog"
 *   "/ru" + "uk" -> "/"
 */
export function pathForLocale(currentPath: string, targetLocale: Locale): string {
  // Strip trailing hash/query
  const [pathname] = currentPath.split(/[?#]/);
  const clean = pathname.replace(/\/+$/, "") || "/";

  // Detect current locale prefix
  const hasRu = clean === "/ru" || clean.startsWith("/ru/");
  const basePath = hasRu ? clean.slice(3) || "/" : clean;

  if (targetLocale === "uk") return basePath === "" ? "/" : basePath;
  // target = ru
  return basePath === "/" ? "/ru" : `/ru${basePath}`;
}

export function detectLocale(pathname: string): Locale {
  return pathname === "/ru" || pathname.startsWith("/ru/") ? "ru" : "uk";
}
