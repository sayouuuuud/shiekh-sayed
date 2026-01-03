import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ShareButtons } from "@/components/share-buttons"
import { SafeHtml } from "@/components/ui/safe-html"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch article details
  const { data: article, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .eq("publish_status", "published")
    .single()

  if (error || !article) {
    notFound()
  }

  // Increment views count
  await supabase
    .from("articles")
    .update({ views_count: (article.views_count || 0) + 1 })
    .eq("id", id)

  // Fetch related articles (same category or tags)
  const { data: relatedArticles } = await supabase
    .from("articles")
    .select("id, title, author, featured_image_path, created_at")
    .eq("publish_status", "published")
    .neq("id", id)
    .limit(3)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-text-muted dark:text-text-subtext mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-primary">
            الرئيسية
          </Link>
          <span className="material-icons-outlined text-xs mx-2">chevron_left</span>
          <Link href="/articles" className="hover:text-primary">
            المقالات
          </Link>
          <span className="material-icons-outlined text-xs mx-2">chevron_left</span>
          <span className="text-primary font-medium">{article.title}</span>
        </nav>

        {/* Article Header */}
        <article>
          {(article.thumbnail_path || article.featured_image_path) && (
            <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={article.thumbnail_path || article.featured_image_path || "/placeholder.svg"}
                alt={article.title}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-serif leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-text-muted">
              <div className="flex items-center gap-2">
                <span className="material-icons-outlined text-sm">person</span>
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-icons-outlined text-sm">calendar_today</span>
                <span>{formatDate(article.created_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-icons-outlined text-sm">visibility</span>
                <span>{article.views_count || 0} مشاهدة</span>
              </div>
            </div>
          </div>

          <SafeHtml
            html={article.content}
            className="prose prose-lg max-w-none mb-12 prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-li:text-foreground dark:prose-headings:text-white dark:prose-p:text-gray-300 dark:prose-strong:text-white dark:prose-li:text-gray-300"
          />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mb-8 pb-8 border-b border-border">
              <h3 className="font-bold text-foreground mb-3">الوسوم</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag: string, index: number) => (
                  <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mb-12 pb-12 border-b border-border">
            <h3 className="font-bold text-foreground mb-4">مشاركة المقال</h3>
            <ShareButtons title={article.title} />
          </div>

          {/* Related Articles */}
          {relatedArticles && relatedArticles.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">مقالات ذات صلة</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <Link key={relatedArticle.id} href={`/articles/${relatedArticle.id}`} className="group">
                    <div className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary transition-colors">
                      {relatedArticle.featured_image_path ? (
                        <img
                          src={relatedArticle.featured_image_path || "/placeholder.svg"}
                          alt={relatedArticle.title}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-primary/10 flex items-center justify-center">
                          <span className="material-icons-outlined text-4xl text-primary/50">article</span>
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {relatedArticle.title}
                        </h3>
                        <p className="text-sm text-text-muted">{relatedArticle.author}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  )
}
