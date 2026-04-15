import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleContent from "./ArticleContent";
import { asset } from "@/lib/asset";

/* ===== Article data (will be replaced with MDX later) ===== */
interface Article {
  slug: string;
  tag: string;
  title: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  toc: { id: string; label: string }[];
}

const articles: Record<string, Article> = {
  "7-oznak-shahrajstva": {
    slug: "7-oznak-shahrajstva",
    tag: "Шахрайство",
    title: "7 ознак шахрайства: як розпізнати і що робити",
    date: "Квітень 2026",
    readTime: "8 хв читання",
    author: "Фундація адвокатів",
    image: asset("/images/blog_fraud.jpeg"),
    toc: [
      { id: "signs", label: "7 ознак шахрайства" },
      { id: "online", label: "Актуальні схеми 2026" },
      { id: "documents", label: "Документи і договори" },
      { id: "what-to-do", label: "Якщо вже стали жертвою" },
      { id: "prevention", label: "Як захиститися заздалегідь" },
    ],
  },
  "abonement-yak-pratsuye": {
    slug: "abonement-yak-pratsuye",
    tag: "Абонементний договір",
    title: "Свій адвокат на рік: коли абонементний договір окуповує себе одним дзвінком",
    date: "Квітень 2026",
    readTime: "10 хв читання",
    author: "Фундація адвокатів",
    image: asset("/images/b2b_shield.jpeg"),
    toc: [
      { id: "mechanics", label: "Що це і як працює" },
      { id: "cases", label: "5 ситуацій, де він окуповується" },
      { id: "not-for-everyone", label: "Кому НЕ потрібен" },
      { id: "math", label: "Скільки реально економить" },
      { id: "how-to-start", label: "Як підключитися" },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return { title: "Стаття не знайдена" };
  return {
    title: article.title,
    description: `${article.tag} — ${article.title}. Фундація адвокатів України.`,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) notFound();

  return <ArticleContent article={article} />;
}
