import { notFound } from 'next/navigation';

import NewsArticlePage from '@/components/pages/NewsArticlePage';
import { getNewsArticleBySlug, getRelatedArticles, NEWS_ARTICLES } from '@/data/news';

interface NewsArticleRouteProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return NEWS_ARTICLES.map((article) => ({ slug: article.slug }));
}

export default async function NewsArticleRoute({ params }: NewsArticleRouteProps) {
  const { slug } = await params;
  const article = getNewsArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = getRelatedArticles(article);

  return <NewsArticlePage article={article} related={related} />;
}
