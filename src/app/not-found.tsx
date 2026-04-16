import Link from "next/link";
import { asset } from "@/lib/asset";

const redirectScript = `
(function() {
  var p = window.location.pathname;
  if (p.startsWith('/ru') || p.startsWith('/ua') || p.startsWith('/en')) {
    window.location.replace('/');
  }
})();
`;

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-2xl) var(--space-lg)",
        textAlign: "center",
        background: "var(--color-bg)",
      }}
    >
      <img
        src={asset("/images/logo_mini.png")}
        alt="Фундація адвокатів України"
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
          marginBottom: "var(--space-2xl)",
          maxWidth: 420,
        }}
      >
        Цієї сторінки не&nbsp;існує, або її&nbsp;було переміщено.
        Перейдіть на&nbsp;головну — там усе&nbsp;на&nbsp;місці.
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
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
    </div>
  );
}
