import { notFound } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { ShareButtons } from "@/components/share-buttons"

async function getVideo(id: string) {
  const supabase = await createClient()

  // Fetch video
  const { data: video } = await supabase
    .from("media")
    .select("*, category:categories(name)")
    .eq("id", id)
    .eq("publish_status", "published")
    .single()

  if (!video) return null

  // Increment views
  await supabase
    .from("media")
    .update({ views_count: (video.views_count || 0) + 1 })
    .eq("id", id)

  // Fetch related videos
  const { data: relatedVideos } = await supabase
    .from("media")
    .select("id, title, thumbnail_path, created_at, views_count")
    .eq("publish_status", "published")
    .neq("id", id)
    .order("created_at", { ascending: false })
    .limit(4)

  return { video, relatedVideos: relatedVideos || [] }
}

function formatViews(views: number): string {
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`
  }
  return views.toString()
}

export default async function VideoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = await getVideo(id)

  if (!data) notFound()

  const { video, relatedVideos } = data

  const getYouTubeEmbedUrl = (url: string) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.includes("youtu.be/")
        ? url.split("youtu.be/")[1]?.split("?")[0]
        : url.split("v=")[1]?.split("&")[0]
      return `https://www.youtube.com/embed/${videoId}`
    }
    return url
  }

  return (
    <main className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-muted dark:text-text-subtext mb-6">
          <Link href="/" className="hover:text-primary dark:hover:text-secondary">
            الرئيسية
          </Link>
          <span className="material-icons-outlined text-xs rtl-flip">chevron_left</span>
          <Link href="/videos" className="hover:text-primary dark:hover:text-secondary">
            المرئيات
          </Link>
          <span className="material-icons-outlined text-xs rtl-flip">chevron_left</span>
          <span className="text-primary dark:text-secondary font-medium line-clamp-1">{video.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
              {video.source === "youtube" ? (
                <iframe
                  src={getYouTubeEmbedUrl(video.url_or_path)}
                  title={video.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video controls className="w-full h-full">
                  <source src={video.url_or_path} type="video/mp4" />
                  المتصفح لا يدعم عنصر الفيديو.
                </video>
              )}
            </div>

            {/* Video Info */}
            <div className="bg-surface dark:bg-card rounded-xl p-6 border border-border dark:border-border">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  {video.category && (
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary dark:text-secondary text-xs font-medium rounded-full mb-3">
                      {video.category.name}
                    </span>
                  )}
                  <h1 className="text-2xl font-bold text-foreground dark:text-white font-serif">{video.title}</h1>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-text-muted dark:text-text-subtext mb-6 pb-6 border-b border-border dark:border-border">
                <div className="flex items-center gap-2">
                  <span className="material-icons-outlined text-lg">visibility</span>
                  <span>{formatViews(video.views_count || 0)} مشاهدة</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-icons-outlined text-lg">calendar_today</span>
                  <span>
                    {new Date(video.created_at).toLocaleDateString("ar-EG", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {/* Description */}
              {video.description && (
                <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
                  <h3 className="text-lg font-bold text-foreground dark:text-white mb-3">وصف الفيديو</h3>
                  <p className="text-text-muted dark:text-text-subtext whitespace-pre-line">{video.description}</p>
                </div>
              )}

              <div className="pt-6 border-t border-border dark:border-border">
                <h3 className="text-sm font-bold text-foreground dark:text-white mb-3">مشاركة الفيديو</h3>
                <ShareButtons title={video.title} />
              </div>

              {/* Tags */}
              {video.tags && video.tags.length > 0 && (
                <div className="mt-6 pt-6 border-t border-border dark:border-border">
                  <h3 className="text-sm font-bold text-foreground dark:text-white mb-3">الوسوم</h3>
                  <div className="flex flex-wrap gap-2">
                    {video.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-background dark:bg-background-alt text-text-muted dark:text-text-subtext text-sm rounded-lg border border-border dark:border-border"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Videos */}
            {relatedVideos.length > 0 && (
              <div className="bg-surface dark:bg-card rounded-xl p-6 border border-border dark:border-border">
                <h2 className="text-lg font-bold text-foreground dark:text-white mb-4 flex items-center gap-2">
                  <span className="material-icons-outlined text-primary">play_circle</span>
                  مرئيات ذات صلة
                </h2>
                <div className="space-y-4">
                  {relatedVideos.map((relVideo: any) => (
                    <Link key={relVideo.id} href={`/videos/${relVideo.id}`} className="flex gap-3 group">
                      <div className="relative w-32 aspect-video rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={relVideo.thumbnail_path || "/placeholder.svg?height=90&width=160&query=video thumbnail"}
                          alt={relVideo.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-foreground dark:text-white line-clamp-2 group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                          {relVideo.title}
                        </h3>
                        <p className="text-xs text-text-muted dark:text-text-subtext mt-1">
                          {formatViews(relVideo.views_count || 0)} مشاهدة
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/videos"
                  className="block text-center text-sm text-primary dark:text-secondary font-medium mt-4 hover:underline"
                >
                  عرض كل المرئيات
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
