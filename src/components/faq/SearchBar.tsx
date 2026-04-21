"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { SearchIcon, CloseIcon } from "./Icon";

interface Props {
  locale: Locale;
  query: string;
  setQuery: (q: string) => void;
  chips: string[];
}

const labels = {
  uk: {
    placeholder: "Знайдіть відповідь… наприклад: обшук без ордера",
    aria: "Пошук по FAQ",
    clear: "Очистити",
  },
  ru: {
    placeholder: "Найдите ответ… например: обыск без ордера",
    aria: "Поиск по FAQ",
    clear: "Очистить",
  },
} as const;

export default function SearchBar({ locale, query, setQuery, chips }: Props) {
  const [stuck, setStuck] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const l = labels[locale];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      setStuck(rect.top <= 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleChip = (c: string) => setQuery(query === c ? "" : c);

  return (
    <div ref={ref} className={`sticky-search${stuck ? " stuck" : ""}`}>
      <div className="sticky-search-inner">
        <div className="search-input-wrap">
          <SearchIcon className="search-icon" width={20} height={20} />
          <input
            type="search"
            className="search-input"
            placeholder={l.placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={l.aria}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="search-clear"
              aria-label={l.clear}
              type="button"
            >
              <CloseIcon width={18} height={18} />
            </button>
          )}
        </div>
        <div className="chip-row">
          {chips.map((c) => (
            <button
              key={c}
              className={`chip${query === c ? " active" : ""}`}
              onClick={() => toggleChip(c)}
              type="button"
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
