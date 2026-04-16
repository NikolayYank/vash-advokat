import type { Metadata } from "next";
import Link from "next/link";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Корисні матеріали — Фундація адвокатів України",
  description:
    "Практичні гайди та чеклісти від адвокатів Фундації. Зберігайте, пересилайте близьким.",
};

const articles = [
  {
    slug: "7-oznak-shahrajstva",
    image: asset("/images/blog_fraud.jpeg"),
    tag: "Шахрайство",
    title: "7 ознак шахрайства: як розпізнати і що робити",
    excerpt:
      "Практичний чекліст із\u00A0red flags, які допоможуть розпізнати шахрайську схему до\u00A0того, як\u00A0буде пізно. Конкретні кроки для\u00A0кожної ситуації.",
    date: "Квітень 2026",
    readTime: "8 хв читання",
  },
  {
    slug: "abonement-yak-pratsuye",
    image: asset("/images/b2b_shield.jpeg"),
    tag: "Абонементний договір",
    title: "Свій адвокат на рік: коли абонементний договір окуповує себе одним дзвінком",
    excerpt:
      "Розбираємо чесно: 5\u00A0ситуацій, де\u00A0абонемент окуповує себе одразу. Кому НЕ\u00A0потрібен. І\u00A0скільки реально економить за\u00A0рік — з\u00A0конкретним розрахунком.",
    date: "Квітень 2026",
    readTime: "10 хв читання",
  },
  {
    slug: "obshuk-shcho-robyty",
    image: asset("/images/blog_criminal.jpeg"),
    tag: "Кримінальне право",
    title: "Обшук: покрокова інструкція до, під час і після",
    excerpt:
      "Що\u00A0зробити заздалегідь, як\u00A0поводитися на\u00A0порозі, 7\u00A0правил під\u00A0час обшуку, чого точно НЕ\u00A0робити і\u00A0що\u00A0критично зробити у\u00A0перші 24\u00A0години після.",
    date: "Квітень 2026",
    readTime: "12 хв читання",
  },
];

export default function BlogPage() {
  return (
    <>
      {/* ===== HEADER (minimal) ===== */}
      <header className="header-minimal">
        <div className="container">
          <Link href="/" className="header-logo">
            <img src={asset("/images/logo_mini.png")} alt="Фундація адвокатів України" />
            <div className="header-logo-text">
              Фундація адвокатів
              <small>Захист та надійність</small>
            </div>
          </Link>
          <Link href="/" className="header-back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            На головну
          </Link>
        </div>
      </header>

      {/* ===== PAGE TITLE ===== */}
      <section className="page-title">
        <div className="container">
          <h1>Корисні матеріали</h1>
          <p>Практичні гайди та&nbsp;чеклісти від&nbsp;наших адвокатів. Зберігайте, пересилайте близьким, використовуйте коли знадобиться.</p>
        </div>
      </section>

      {/* ===== ARTICLES ===== */}
      <section>
        <div className="container">
          <div className="articles-grid">
            {articles.map((a) => (
              <Link key={a.slug} href={`/blog/${a.slug}`} className="article-card">
                <div
                  className="article-card-image"
                  style={
                    a.image
                      ? { backgroundImage: `url(${a.image})` }
                      : undefined
                  }
                />
                <div className="article-card-body">
                  <div className="article-card-tag">{a.tag}</div>
                  <h3>{a.title}</h3>
                  <p className="article-card-excerpt">{a.excerpt}</p>
                  <div className="article-card-meta">
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      {a.date}
                    </span>
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {a.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER (minimal) ===== */}
      <footer className="footer-minimal">
        <div className="container">
          <p>&copy; 2026 Фундація адвокатів України &middot; <a href="/">vash-advokat.org</a></p>
        </div>
      </footer>
    </>
  );
}
