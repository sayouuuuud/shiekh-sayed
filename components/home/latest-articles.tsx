import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { ar } from "date-fns/locale"

interface Article {
  id: string
  title: string
  content: string
  author: string
  created_at: string
  views_count: number
}

interface LatestArticlesProps {
  articles: Article[]
}

export function LatestArticles({ articles }: LatestArticlesProps) {
  // Estimate read time based on content length (assuming 200 words per minute in Arabic)
  const getReadTime = (content: string) => {
    const words = content.split(/\s+/).length
    const minutes = Math.ceil(words / 200)
    return `${minutes} دقائق`
  }

  return (
    <section className="py-16 bg-background dark:bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-xs font-bold text-primary bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full mb-3 inline-block">
              المقالات العلمية
            </span>
            <h2 className="text-4xl font-bold font-serif dark:text-white">أحدث المقالات</h2>
          </div>
          <Link
            href="/articles"
            className="hidden sm:flex items-center gap-2 text-text-muted dark:text-text-subtext hover:text-primary transition bg-surface dark:bg-card px-4 py-2 rounded-lg text-sm"
          >
            عرض كل المقالات
            <span className="material-icons-outlined text-sm rtl-flip">arrow_right_alt</span>
          </Link>
        </div>

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <p className="text-text-muted dark:text-text-subtext text-center py-12">لا توجد مقالات حالياً</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link href={`/articles/${article.id}`} key={article.id}>
                <article className="bg-surface dark:bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition border border-border dark:border-border group h-full">
                  <div className="flex items-center gap-2 text-xs text-secondary font-medium mb-3">
                    <span className="material-icons-outlined text-sm">person</span>
                    <span>{article.author}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 dark:text-white group-hover:text-primary transition line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-text-muted dark:text-text-subtext mb-4 line-clamp-3">
                    {article.content.substring(0, 150)}...
                  </p>
                  <div className="flex items-center justify-between text-xs text-text-muted dark:text-text-subtext pt-4 border-t border-border dark:border-border">
                    <span>{formatDistanceToNow(new Date(article.created_at), { addSuffix: true, locale: ar })}</span>
                    <span className="flex items-center gap-1">
                      <span className="material-icons-outlined text-sm">schedule</span>
                      {getReadTime(article.content)}
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
