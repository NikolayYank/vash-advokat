import Link from "next/link";
import { asset } from "@/lib/asset";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { ru } from "@/lib/i18n";

const recentArticles = [
  {
    slug: "7-oznak-shahrajstva",
    title: "7 признаков мошенничества: как распознать и что делать",
    tag: "Мошенничество",
  },
  {
    slug: "abonement-yak-pratsuye",
    title: "Свой адвокат на год: когда абонементный договор окупается",
    tag: "Абонементный договор",
  },
  {
    slug: "obshuk-shcho-robyty",
    title: "Обыск: пошаговая инструкция до, во время и после",
    tag: "Уголовное право",
  },
];

export default function NotFound() {
  return (
    <>
      <SiteHeader dict={ru} locale="ru" switchPath="/" />
    <main>
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "var(--space-3xl) var(--space-lg)",
        textAlign: "center",
        background: "var(--color-bg)",
      }}
    >
      <img
        src={asset("/images/logo_mini.png")}
        alt="Фундация адвокатов Украины"
        width={64}
        height={64}
        style={{ width: 64, height: 64, marginBottom: "var(--space-xl)" }}
      />
      <h1
        className="h1-display"
        style={{
          color: "var(--color-primary)",
          marginBottom: "var(--space-md)",
        }}
      >
        404
      </h1>
      <p
        className="lead"
        style={{
          color: "var(--color-text-muted)",
          marginBottom: "var(--space-xl)",
          maxWidth: 520,
        }}
      >
        Этой страницы не&nbsp;существует, или она была перемещена. Не&nbsp;спешите закрывать вкладку —
        ниже ссылки, которые могут вам пригодиться.
      </p>

      <Link
        href="/ru/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "14px 32px",
          background: "var(--color-primary)",
          color: "white",
          borderRadius: "var(--radius-md)",
          fontWeight: 700,
          fontSize: "0.9375rem",
          textDecoration: "none",
          marginBottom: "var(--space-3xl)",
        }}
      >
        На&nbsp;главную
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: 18, height: 18 }}
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </Link>

      <section
        aria-label="Полезные материалы"
        style={{
          width: "100%",
          maxWidth: 720,
          borderTop: "1px solid var(--color-border)",
          paddingTop: "var(--space-2xl)",
        }}
      >
        <h2
          className="micro-label micro-label--muted"
          style={{
            marginBottom: "var(--space-lg)",
          }}
        >
          Куда ещё&nbsp;можно зайти
        </h2>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-sm)",
            textAlign: "left",
          }}
        >
          {recentArticles.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/ru/blog/${a.slug}/`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "var(--space-md)",
                  padding: "14px 16px",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--color-text)",
                  textDecoration: "none",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  background: "white",
                }}
              >
                <span>{a.title}</span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-text-muted)",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  {a.tag}
                </span>
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/ru/o-nas/"
              style={{
                display: "block",
                padding: "14px 16px",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-sm)",
                color: "var(--color-primary)",
                textDecoration: "none",
                fontSize: "0.9375rem",
                fontWeight: 600,
                background: "white",
              }}
            >
              Об&nbsp;авторе — Сергей&nbsp;Веприцкий, адвокат
            </Link>
          </li>
          <li>
            <Link
              href="/ru/blog/"
              style={{
                display: "block",
                padding: "14px 16px",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-sm)",
                color: "var(--color-primary)",
                textDecoration: "none",
                fontSize: "0.9375rem",
                fontWeight: 600,
                background: "white",
              }}
            >
              Все&nbsp;материалы блога →
            </Link>
          </li>
        </ul>
      </section>
    </div>
    </main>
      <SiteFooter dict={ru} locale="ru" />
    </>
  );
}
