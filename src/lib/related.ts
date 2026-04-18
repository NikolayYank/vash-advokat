import type { ArticleEntry } from "@/lib/i18n";

export interface RelatedCandidate {
  article: ArticleEntry;
  score: number;
}

// Возвращает top N статей, релевантных текущей. Порядок скоринга:
//   1. Тот же `category` — +10 очков
//   2. За каждый общий `tag` — +2 очка
//   3. Tie-break по `datePublished` (новее = выше)
// Если после скоринга кандидатов меньше limit — добирает остальные по дате.
export function getRelatedArticles(
  currentSlug: string,
  articles: Record<string, ArticleEntry>,
  limit = 3,
): ArticleEntry[] {
  const current = articles[currentSlug];
  if (!current) return [];

  const others = Object.values(articles).filter((a) => a.slug !== currentSlug);

  const scored: RelatedCandidate[] = others.map((article) => {
    let score = 0;
    if (article.category === current.category) score += 10;
    const tagOverlap = article.tags.filter((t) => current.tags.includes(t)).length;
    score += tagOverlap * 2;
    return { article, score };
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.article.datePublished.localeCompare(a.article.datePublished);
  });

  return scored.slice(0, limit).map((c) => c.article);
}
