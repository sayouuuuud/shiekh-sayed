import { notFound } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { AudioPlayer } from "@/components/audio-player"
import { ShareButtons } from "@/components/share-buttons"
import { PrintButton } from "@/components/print-button"
import { ExportPDFButton } from "@/components/export-pdf-button"
import { SafeHtml } from "@/components/ui/safe-html"
import { ChevronLeft, BookOpen, Calendar, Eye, Download, Clock } from "lucide-react"

export async function generateStaticParams() {
  try {
    const supabase = await createClient()
    const { data: sermons } = await supabase.from("sermons").select("id").eq("publish_status", "published").limit(100)

    return (sermons || []).map((sermon) => ({
      id: sermon.id,
    }))
  } catch (e) {
    console.log("[v0] generateStaticParams error:", e)
    return []
  }
}

export const revalidate = 60

async function getSermon(id: string) {
  const supabase = await createClient()

  const { data: sermon, error } = await supabase
    .from("sermons")
    .select("*")
    .eq("id", id)
    .eq("publish_status", "published")
    .single()

  if (error || !sermon) return null

  // Increment views
  try {
    await supabase
      .from("sermons")
      .update({ views_count: (sermon.views_count || 0) + 1 })
      .eq("id", id)
  } catch (e) {
    // Ignore view count errors
  }

  // Fetch related sermons
  const { data: relatedSermons } = await supabase
    .from("sermons")
    .select("id, title, thumbnail_path, created_at")
    .eq("publish_status", "published")
    .neq("id", id)
    .order("created_at", { ascending: false })
    .limit(3)

  return { sermon, relatedSermons: relatedSermons || [] }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: sermon } = await supabase.from("sermons").select("title, content").eq("id", id).single()

  if (!sermon) {
    return {
      title: "خطبة غير موجودة",
    }
  }

  const description = sermon.content?.replace(/<[^>]*>/g, "").substring(0, 160) || ""

  return {
    title: sermon.title,
    description,
    openGraph: {
      title: sermon.title,
      description,
    },
  }
}

export default async function KhutbaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = await getSermon(id)

  if (!data) notFound()

  const { sermon, relatedSermons } = data

  // Parse content for PDF export
  const plainContent = sermon.content?.replace(/<[^>]*>/g, "") || ""

  const getYouTubeId = (url: string) => {
    const match = url?.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&\n?#]+)/)
    return match ? match[1] : null
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      <nav className="flex items-center text-sm text-text-muted dark:text-text-subtext mb-8 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-primary dark:hover:text-secondary">
          الرئيسية
        </Link>
        <ChevronLeft className="h-4 w-4 mx-2" />
        <Link href="/khutba" className="hover:text-primary dark:hover:text-secondary">
          الخطب المنبرية
        </Link>
        <ChevronLeft className="h-4 w-4 mx-2" />
        <span className="text-primary dark:text-secondary font-medium">{sermon.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          {/* Header Card */}
          <div className="bg-surface dark:bg-card rounded-2xl p-8 border border-border dark:border-border shadow-sm relative overflow-hidden">
            <BookOpen className="absolute -left-10 -top-10 h-32 w-32 text-background dark:text-card opacity-50 transform rotate-12" />
            <div className="relative z-10">
              {sermon.thumbnail_path && (
                <div className="mb-6 rounded-xl overflow-hidden">
                  <img
                    src={sermon.thumbnail_path || "/placeholder.svg"}
                    alt={sermon.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs rounded-full font-medium border border-secondary/20">
                  خطبة جمعة
                </span>
                <span className="px-3 py-1 bg-background dark:bg-background-alt text-text-muted dark:text-text-subtext text-xs rounded-full flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(sermon.created_at).toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="px-3 py-1 bg-background dark:bg-background-alt text-text-muted dark:text-text-subtext text-xs rounded-full flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  {sermon.views_count || 0} مشاهدة
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-6 leading-tight font-serif">
                {sermon.title}
              </h1>

              {sermon.media_source === "youtube" && sermon.youtube_url && (
                <div className="mb-6 aspect-video rounded-xl overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeId(sermon.youtube_url)}`}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              )}

              {(sermon.media_source === "local" || !sermon.media_source) && sermon.audio_file_path && (
                <div className="mb-6">
                  <AudioPlayer src={sermon.audio_file_path} title="استمع للخطبة" />
                  <a
                    href={sermon.audio_file_path}
                    download
                    className="inline-flex items-center gap-2 mt-3 text-sm text-primary hover:underline"
                  >
                    <Download className="h-4 w-4" />
                    تحميل الملف الصوتي
                  </a>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-border dark:border-border">
                <ShareButtons title={sermon.title} />
                <PrintButton title={sermon.title} content={sermon.content} />
                <ExportPDFButton title={sermon.title} content={plainContent} type="sermon" />
              </div>
            </div>
          </div>

          {/* Article Content - Fixed to properly render HTML without showing raw JSON */}
          <article
            id="printable-content"
            className="prose prose-lg dark:prose-invert max-w-none bg-surface dark:bg-card p-8 md:p-12 rounded-2xl border border-border dark:border-border shadow-sm"
          >
            <SafeHtml html={sermon.content} className="whitespace-pre-wrap font-serif text-lg leading-loose" />
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
                        {relatedSermon.thumbnail_path ? (
                          <img
                            src={relatedSermon.thumbnail_path || "/placeholder.svg"}
                            alt={relatedSermon.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <BookOpen className="h-8 w-8 text-primary" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground dark:text-foreground group-hover:text-primary dark:group-hover:text-secondary transition-colors text-sm leading-snug mb-1">
                          {relatedSermon.title}
                        </h4>
                        <span className="text-xs text-text-muted dark:text-text-subtext flex items-center gap-1">
                          <Clock className="h-3 w-3" />
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
