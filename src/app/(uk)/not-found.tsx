import Link from "next/link";
import { asset } from "@/lib/asset";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { uk } from "@/lib/i18n";

const recentArticles = [
  {
    slug: "7-oznak-shahrajstva",
    title: "7 ознак шахрайства: як розпізнати і що робити",
    tag: "Шахрайство",
  },
  {
    slug: "abonement-yak-pratsuye",
    title: "Свій адвокат на рік: коли абонементний договір окуповує себе",
    tag: "Абонементний договір",
  },
  {
    slug: "obshuk-shcho-robyty",
    title: "Обшук: покрокова інструкція до, під час і після",
    tag: "Кримінальне право",
  },
];

export default function NotFound() {
  return (
    <>
      <SiteHeader dict={uk} locale="uk" switchPath="/ru" />
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
        alt="Фундація адвокатів України"
        width={64}
        height={64}
        style={{ width: 64, height: 64, marginBottom: "var(--space-xl)" }}
      />
      <h1
        style={{
          fontSize: "clamp(2rem, 4vw, 3.5rem)",
          fontWeight: 700,
          color: "var(--color-primary)",
          marginBottom: "var(--space-md)",
        }}
      >
        404
      </h1>
      <p
        style={{
          fontSize: "1.125rem",
          color: "var(--color-text-muted)",
          marginBottom: "var(--space-xl)",
          maxWidth: 520,
        }}
      >
        Цієї сторінки не&nbsp;існує, або її&nbsp;було переміщено. Не&nbsp;поспішайте закривати вкладку —
        нижче посилання, що&nbsp;можуть вам знадобитися.
      </p>

      <Link
        href="/"
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
        На&nbsp;головну
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
        aria-label="Корисні матеріали"
        style={{
          width: "100%",
          maxWidth: 720,
          borderTop: "1px solid var(--color-border)",
          paddingTop: "var(--space-2xl)",
        }}
      >
        <h2
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
            marginBottom: "var(--space-lg)",
          }}
        >
          Куди ще&nbsp;можна зайти
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
                href={`/blog/${a.slug}/`}
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
              href="/pro-nas/"
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
              Про&nbsp;автора — Сергій&nbsp;Веприцький, адвокат
            </Link>
          </li>
          <li>
            <Link
              href="/blog/"
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
              Усі&nbsp;матеріали блогу →
            </Link>
          </li>
        </ul>
      </section>
    </div>
      <SiteFooter dict={uk} locale="uk" />
    </>
  );
}
