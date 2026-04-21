import Link from "next/link";
import type { FaqCard } from "@/lib/faq";
import {
  cardQuestion,
  cardAnswer,
  cardFirstStep,
  cardKeywords,
  cardAnchor,
} from "@/lib/faq";
import type { Locale } from "@/lib/i18n";

interface Props {
  card: FaqCard;
  locale: Locale;
  featured?: boolean;
  withAnchorId?: boolean;
  consultHref?: string;
}

const labels = {
  uk: { firstStep: "Перший крок:", consult: "Потрібна консультація?" },
  ru: { firstStep: "Первый шаг:", consult: "Нужна консультация?" },
} as const;

export default function QACard({
  card,
  locale,
  featured = true,
  withAnchorId = false,
  consultHref = "/#konsultaciya",
}: Props) {
  const l = labels[locale];
  const question = cardQuestion(card, locale);
  const answer = cardAnswer(card, locale);
  const firstStep = cardFirstStep(card, locale);
  const keywords = cardKeywords(card, locale);
  const anchor = cardAnchor(card, locale);

  const href =
    locale === "uk"
      ? consultHref
      : consultHref.startsWith("/")
        ? `/ru${consultHref}`
        : consultHref;

  return (
    <article
      id={withAnchorId ? anchor : undefined}
      className={`qa-card${featured ? " featured" : ""}`}
    >
      <h3 className="faq-h-3" lang={locale}>
        {question}
      </h3>
      <p className="qa-card-answer">{answer}</p>
      <div className="first-step">
        <span className="first-step-label">{l.firstStep}</span>
        <span>{firstStep}</span>
      </div>
      {keywords.length > 0 && (
        <div className="kw">
          {keywords.slice(0, 3).map((k, i) => (
            <span key={`${card.question_id}-kw-${i}`}>
              {i > 0 && <span className="kw-sep">·</span>}
              <span>{k}</span>
            </span>
          ))}
        </div>
      )}
      <Link href={href} className="qa-card-cta">
        {l.consult} →
      </Link>
    </article>
  );
}
