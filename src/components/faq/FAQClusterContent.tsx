import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import QACard from "./QACard";
import CategoryCard from "./CategoryCard";
import AIDisclosureBox from "./AIDisclosureBox";
import StickyCTA from "./StickyCTA";
import {
  type FaqCluster,
  type FaqCard,
  cardQuestion,
  cardAnchor,
  clusterTitle,
  clusterDescription,
  getRelatedClusters,
  faqHubPath,
} from "@/lib/faq";
import { getDict, type Locale } from "@/lib/i18n";

interface Props {
  locale: Locale;
  cluster: FaqCluster;
  cards: FaqCard[];
}

const labels = {
  uk: {
    backLabel: "На головну",
    breadcrumbHome: "Головна",
    breadcrumbHub: "Що робити",
    questions: "питань",
    lastUpdateLabel: "Останнє оновлення",
    lastUpdateValue: "квітень 2026",
    reviewedLabel: "Перевірив",
    reviewedValue: "С. Веприцький",
    tocHeader: "Питання у розділі",
    tocMobileLabel: (n: number) => `Усі питання розділу (${n})`,
    answersHeading: "Відповіді",
    relatedHeading: "Схожі категорії",
    extraContext:
      "Матеріали підготовлені за реальними запитами клієнтів 2024–2026. Не замінює індивідуальну консультацію.",
  },
  ru: {
    backLabel: "На главную",
    breadcrumbHome: "Главная",
    breadcrumbHub: "Что делать",
    questions: "вопросов",
    lastUpdateLabel: "Последнее обновление",
    lastUpdateValue: "апрель 2026",
    reviewedLabel: "Проверил",
    reviewedValue: "С. Веприцкий",
    tocHeader: "Вопросы в разделе",
    tocMobileLabel: (n: number) => `Все вопросы раздела (${n})`,
    answersHeading: "Ответы",
    relatedHeading: "Смежные категории",
    extraContext:
      "Материалы подготовлены по реальным запросам клиентов 2024–2026. Не заменяет индивидуальную консультацию.",
  },
} as const;

export default function FAQClusterContent({ locale, cluster, cards }: Props) {
  const l = labels[locale];
  const homeHref = locale === "uk" ? "/" : "/ru";
  const hubHref = faqHubPath(locale);
  const title = clusterTitle(cluster, locale);
  const description = clusterDescription(cluster, locale);
  const related = getRelatedClusters(cluster.cluster_num, 3);
  const dict = getDict(locale);
  const switchPath = locale === "uk" ? "/ru/chto-delat" : "/shcho-robyty";

  return (
    <div className="faq-scope">
      <SiteHeader dict={dict} locale={locale} switchPath={switchPath} />

      <section className="faq-narrow faq-hero">
        <nav className="faq-breadcrumbs" aria-label="breadcrumbs">
          <Link href={homeHref}>{l.breadcrumbHome}</Link>
          <span className="sep">/</span>
          <Link href={hubHref}>{l.breadcrumbHub}</Link>
          <span className="sep">/</span>
          <span className="cur">{title}</span>
        </nav>

        <h1 className="faq-h-1" lang={locale}>
          {title}
        </h1>

        <p className="faq-lead">
          {description}{" "}
          <span className="faq-lead-muted">{l.extraContext}</span>
        </p>

        <div className="faq-meta">
          <div>
            <b>{cluster.question_count}</b> {l.questions}
          </div>
          <div className="sep">·</div>
          <div>
            {l.lastUpdateLabel}: <b>{l.lastUpdateValue}</b>
          </div>
          <div className="sep">·</div>
          <div>
            {l.reviewedLabel}: <b>{l.reviewedValue}</b>
          </div>
        </div>
      </section>

      <section className="faq-narrow cluster-layout">
        {/* TOC */}
        <aside className="toc-aside">
          {/* Mobile — collapsible */}
          <details className="toc-mobile toc-mobile-only">
            <summary>
              <span>{l.tocMobileLabel(cards.length)}</span>
              <svg
                className="chev"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </summary>
            <div>
              {cards.map((c, i) => (
                <a
                  key={c.question_id}
                  href={`#${cardAnchor(c, locale)}`}
                  className="toc-link"
                >
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <span>{cardQuestion(c, locale)}</span>
                </a>
              ))}
            </div>
          </details>

          {/* Desktop — sticky sidebar */}
          <div className="toc-desktop-only">
            <div className="toc-header">{l.tocHeader}</div>
            <div>
              {cards.map((c, i) => (
                <a
                  key={c.question_id}
                  href={`#${cardAnchor(c, locale)}`}
                  className="toc-link"
                >
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <span>{cardQuestion(c, locale)}</span>
                </a>
              ))}
            </div>
          </div>
        </aside>

        {/* CARDS */}
        <div>
          <div className="faq-section-head">
            <h2 className="faq-h-2">{l.answersHeading}</h2>
            <span className="count">
              {cards.length} {l.questions}
            </span>
          </div>
          <div className="cards-grid">
            {cards.map((c) => (
              <QACard
                key={c.question_id}
                card={c}
                locale={locale}
                featured
                withAnchorId
              />
            ))}
          </div>
        </div>
      </section>

      {/* RELATED CLUSTERS */}
      <section className="faq-narrow faq-section">
        <div className="faq-section-head">
          <h2 className="faq-h-2">{l.relatedHeading}</h2>
        </div>
        <div className="cat-grid-3">
          {related.map((cl) => (
            <CategoryCard key={cl.cluster_num} cluster={cl} locale={locale} />
          ))}
        </div>
      </section>

      {/* AI DISCLOSURE */}
      <section className="faq-narrow faq-section-last">
        <AIDisclosureBox locale={locale} />
      </section>

      <SiteFooter dict={dict} locale={locale} />
      <StickyCTA locale={locale} />
    </div>
  );
}
