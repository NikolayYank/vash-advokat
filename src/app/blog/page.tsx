import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Корисні матеріали — Фундація адвокатів України",
  description:
    "Практичні гайди та чеклісти від адвокатів Фундації. Зберігайте, пересилайте близьким.",
};

const articles = [
  {
    slug: "7-oznak-shahrajstva",
    image: "/images/blog_fraud.jpeg",
    tag: "Шахрайство",
    title: "7 ознак шахрайства: як розпізнати і що робити",
    excerpt:
      "Практичний чекліст із red flags, які допоможуть розпізнати шахрайську схему до того, як буде пізно. Конкретні кроки для кожної ситуації.",
    date: "Квітень 2026",
    readTime: "8 хв читання",
  },
  {
    slug: "abonement-yak-pratsuye",
    image: "/images/b2b_shield.jpeg",
    tag: "Абонементний договір",
    title: "Свій адвокат на рік: коли абонементний договір окуповує себе одним дзвінком",
    excerpt:
      "Розбираємо чесно: 5 ситуацій, де абонемент окуповує себе одразу. Кому НЕ потрібен. І скільки реально економить за рік — з конкретним розрахунком.",
    date: "Квітень 2026",
    readTime: "10 хв читання",
  },
  {
    slug: "shcho-robyty-pry-zatrymannya",
    image: "/images/blog_criminal.jpeg",
    tag: "Кримінальний захист",
    title: "Що робити при затриманні: перші 24 години",
    excerpt:
      "Покроковий алгоритм дій від моменту затримання. Ваші права, обов'язки поліції, і коли обов'язково потрібен адвокат.",
    date: "Скоро",
    readTime: "10 хв читання",
  },
  {
    slug: "cheklist-pokuptsya-neruhomosti",
    image: "/images/blog_realestate.jpeg",
    tag: "Нерухомість",
    title: "Чекліст покупця нерухомості: 10 пасток",
    excerpt:
      "На що звертати увагу перед підписанням договору купівлі-продажу. Реальні схеми, через які люди втрачають квартири та гроші.",
    date: "Скоро",
    readTime: "7 хв читання",
  },
];

export default function BlogPage() {
  return (
    <>
      {/* ===== HEADER (minimal) ===== */}
      <header className="header-minimal">
        <div className="container">
          <Link href="/" className="header-logo">
            <img src="/images/logo_mini.png" alt="Фундація адвокатів України" />
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
          <p>Практичні гайди та чеклісти від наших адвокатів. Зберігайте, пересилайте близьким, використовуйте коли знадобиться.</p>
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
