import { notFound } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { AudioPlayer } from "@/components/audio-player"
import { ShareButtons } from "@/components/share-buttons"
import { PrintButton } from "@/components/print-button"

async function getSermon(id: string) {
  const supabase = await createClient()

  // Fetch sermon
  const { data: sermon } = await supabase
    .from("sermons")
    .select("*, category:categories(name)")
    .eq("id", id)
    .eq("publish_status", "published")
    .single()

  if (!sermon) return null

  // Increment views
  await supabase
    .from("sermons")
    .update({ views_count: (sermon.views_count || 0) + 1 })
    .eq("id", id)

  // Fetch related sermons
  const { data: relatedSermons } = await supabase
    .from("sermons")
    .select("id, title, created_at")
    .eq("publish_status", "published")
    .neq("id", id)
    .order("created_at", { ascending: false })
    .limit(3)

  return { sermon, relatedSermons: relatedSermons || [] }
}

export default async function KhutbaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = await getSermon(id)

  if (!data) notFound()

  const { sermon, relatedSermons } = data

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-text-muted dark:text-text-subtext mb-8 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-primary dark:hover:text-secondary">
          الرئيسية
        </Link>
        <span className="material-icons-outlined text-xs mx-2">chevron_left</span>
        <Link href="/khutba" className="hover:text-primary dark:hover:text-secondary">
          الخطب المنبرية
        </Link>
        <span className="material-icons-outlined text-xs mx-2">chevron_left</span>
        <span className="text-primary dark:text-secondary font-medium">{sermon.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          {/* Header Card */}
          <div className="bg-surface dark:bg-card rounded-2xl p-8 border border-border dark:border-border shadow-sm relative overflow-hidden">
            <span className="material-icons-outlined absolute -left-10 -top-10 text-9xl text-background dark:text-card opacity-50 transform rotate-12">
              menu_book
            </span>
            <div className="relative z-10">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs rounded-full font-medium border border-secondary/20">
                  خطبة جمعة
                </span>
                {sermon.category && (
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium border border-primary/20">
                    {sermon.category.name}
                  </span>
                )}
                <span className="px-3 py-1 bg-background dark:bg-background-alt text-text-muted dark:text-text-subtext text-xs rounded-full flex items-center gap-1">
                  <span className="material-icons-outlined text-[14px]">calendar_today</span>
                  {new Date(sermon.created_at).toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="px-3 py-1 bg-background dark:bg-background-alt text-text-muted dark:text-text-subtext text-xs rounded-full flex items-center gap-1">
                  <span className="material-icons-outlined text-[14px]">visibility</span>
                  {sermon.views_count || 0} مشاهدة
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-6 leading-tight font-serif">
                {sermon.title}
              </h1>

              {sermon.audio_file_path && (
                <div className="mb-6">
                  <AudioPlayer src={sermon.audio_file_path} title="استمع للخطبة" />
                </div>
              )}

              <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-border dark:border-border">
                <ShareButtons title={sermon.title} />
                <PrintButton title={sermon.title} content={sermon.content} />
              </div>
            </div>
          </div>

          {/* Article Content - Add id for printing */}
          <article
            id="printable-content"
            className="prose prose-lg dark:prose-invert max-w-none bg-surface dark:bg-card p-8 md:p-12 rounded-2xl border border-border dark:border-border shadow-sm"
          >
            <div
              className="whitespace-pre-wrap font-serif text-lg leading-loose"
              dangerouslySetInnerHTML={{ __html: sermon.content }}
            />
          </article>

          {/* Tags */}
          {sermon.tags && sermon.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {sermon.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-background dark:bg-background-alt text-text-muted dark:text-text-subtext rounded-lg text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          {/* Related Sermons */}
          {relatedSermons.length > 0 && (
            <div className="bg-surface dark:bg-card rounded-xl p-6 border border-border dark:border-border shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-foreground dark:text-white flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full"></span>
                  خطب ذات صلة
                </h3>
              </div>
              <div className="space-y-4">
                {relatedSermons.map((relatedSermon: any) => (
                  <Link key={relatedSermon.id} href={`/khutba/${relatedSermon.id}`} className="group block">
                    <div className="flex gap-4 items-start">
                      <div className="w-20 h-20 rounded-lg bg-background dark:bg-background-alt shrink-0 overflow-hidden relative flex items-center justify-center">
                        <span className="material-icons-outlined text-primary text-3xl">menu_book</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground dark:text-foreground group-hover:text-primary dark:group-hover:text-secondary transition-colors text-sm leading-snug mb-1">
                          {relatedSermon.title}
                        </h4>
                        <span className="text-xs text-text-muted dark:text-text-subtext flex items-center gap-1">
                          <span className="material-icons-outlined text-[12px]">schedule</span>
                          {new Date(relatedSermon.created_at).toLocaleDateString("ar-EG", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href="/khutba"
                className="block text-center text-primary dark:text-secondary text-sm font-bold mt-6 hover:underline"
              >
                عرض المزيد من الخطب
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
