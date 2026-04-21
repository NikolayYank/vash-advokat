"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CategoryCard from "./CategoryCard";
import QACard from "./QACard";
import SearchBar from "./SearchBar";
import AIDisclosureBox from "./AIDisclosureBox";
import StickyCTA from "./StickyCTA";
import {
  getAllClusters,
  getAllCards,
  cardQuestion,
  cardAnswer,
  cardKeywords,
} from "@/lib/faq";
import { getDict, type Locale } from "@/lib/i18n";

interface Props {
  locale: Locale;
}

const labels = {
  uk: {
    backLabel: "На головну",
    breadcrumbHome: "Головна",
    breadcrumbHere: "Що робити",
    h1: "Що робити в юридичній ситуації",
    leadTemplate: "Короткі відповіді на __N__ питань — обшук, затримання, допит, шахрайство, бізнес-спори.",
    verified: "Кожна відповідь перевірена адвокатом Сергієм Веприцьким.",
    questions: "питань",
    categories: "категорій",
    updatedLabel: "Оновлено",
    updatedValue: "квітень 2026",
    resultsTitle: "Результати пошуку",
    resultsCount: "збігів",
    noResults: (q: string) =>
      `Нічого не знайдено за запитом «${q}». Спробуйте іншими словами або оберіть категорію нижче.`,
    chooseTopic: "Оберіть тему",
    chips: [
      "вручили підозру",
      "обшук в офісі",
      "арешт рахунку",
      "запобіжний захід",
      "рейдерське захоплення",
      "ст. 368",
    ],
  },
  ru: {
    backLabel: "На главную",
    breadcrumbHome: "Главная",
    breadcrumbHere: "Что делать",
    h1: "Что делать в юридической ситуации",
    leadTemplate: "Короткие ответы на __N__ вопросов — обыск, задержание, допрос, мошенничество, бизнес-споры.",
    verified: "Каждый ответ проверен адвокатом Сергеем Веприцким.",
    questions: "вопросов",
    categories: "категорий",
    updatedLabel: "Обновлено",
    updatedValue: "апрель 2026",
    resultsTitle: "Результаты поиска",
    resultsCount: "совпадений",
    noResults: (q: string) =>
      `Ничего не найдено по запросу «${q}». Попробуйте другими словами или выберите категорию ниже.`,
    chooseTopic: "Выберите тему",
    chips: [
      "вручили подозрение",
      "обыск в офисе",
      "арест счёта",
      "мера пресечения",
      "рейдерский захват",
      "ст. 368",
    ],
  },
} as const;

export default function FAQHubContent({ locale }: Props) {
  const l = labels[locale];
  const clusters = getAllClusters();
  const cards = getAllCards();

  const [query, setQuery] = useState("");
  const trimmed = query.trim().toLowerCase();
  const searching = trimmed.length > 0;

  const matched = useMemo(() => {
    if (!searching) return [];
    return cards.filter((c) => {
      const q = cardQuestion(c, locale).toLowerCase();
      const a = cardAnswer(c, locale).toLowerCase();
      const kw = cardKeywords(c, locale).join(" ").toLowerCase();
      return q.includes(trimmed) || a.includes(trimmed) || kw.includes(trimmed);
    });
  }, [cards, searching, trimmed, locale]);

  const homeHref = locale === "uk" ? "/" : "/ru";
  const totalQ = cards.length;
  const totalCat = clusters.length;
  const leadParts = l.leadTemplate.split("__N__");
  const dict = getDict(locale);
  const switchPath = locale === "uk" ? "/ru/chto-delat" : "/shcho-robyty";

  return (
    <div className="faq-scope">
      <SiteHeader dict={dict} locale={locale} switchPath={switchPath} />

      <main>
      {/* HERO */}
      <section className="faq-wide faq-hero">
        <nav className="faq-breadcrumbs" aria-label="breadcrumbs">
          <Link href={homeHref}>{l.breadcrumbHome}</Link>
          <span className="sep">/</span>
          <span className="cur">{l.breadcrumbHere}</span>
        </nav>

        <h1 className="faq-h-display" lang={locale}>
          {l.h1}
        </h1>

        <p className="faq-lead">
          {leadParts[0]}
          <strong>{totalQ}</strong>
          {leadParts[1]}{" "}
          <span className="faq-lead-muted">{l.verified}</span>
        </p>

        <div className="faq-meta">
          <div>
            <b>{totalQ}</b> {l.questions}
          </div>
          <div className="sep">·</div>
          <div>
            <b>{totalCat}</b> {l.categories}
          </div>
          <div className="sep">·</div>
          <div>
            {l.updatedLabel} <b>{l.updatedValue}</b>
          </div>
        </div>
      </section>

      {/* STICKY SEARCH */}
      <SearchBar
        locale={locale}
        query={query}
        setQuery={setQuery}
        chips={l.chips.slice()}
      />

      {/* SEARCH RESULTS */}
      {searching && (
        <section className="faq-wide faq-section">
          <div className="faq-section-head">
            <h2 className="faq-h-2">{l.resultsTitle}</h2>
            <span className="count">
              {matched.length} {l.resultsCount}
            </span>
          </div>
          {matched.length === 0 ? (
            <div className="qa-card">
              <p className="qa-card-answer">{l.noResults(query)}</p>
            </div>
          ) : (
            <div className="cards-grid-2">
              {matched.map((c) => (
                <QACard key={c.question_id} card={c} locale={locale} featured />
              ))}
            </div>
          )}
        </section>
      )}

      {/* CATEGORY GRID — hide while searching */}
      {!searching && (
        <section className="faq-wide faq-section">
          <div className="faq-section-head">
            <h2 className="faq-h-2">{l.chooseTopic}</h2>
            <span className="count">
              {totalCat} {l.categories}
            </span>
          </div>
          <div className="cat-grid">
            {clusters.map((cl) => (
              <CategoryCard key={cl.cluster_num} cluster={cl} locale={locale} />
            ))}
          </div>
        </section>
      )}

      {/* AI DISCLOSURE */}
      <section className="faq-wide faq-section-last">
        <AIDisclosureBox locale={locale} />
      </section>
      </main>

      <SiteFooter dict={dict} locale={locale} />
      <StickyCTA locale={locale} />
    </div>
  );
}
