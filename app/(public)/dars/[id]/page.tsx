import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { notFound } from "next/navigation"
import { AudioPlayer } from "@/components/audio-player"
import { ShareButtons } from "@/components/share-buttons"
import { SafeHtml } from "@/components/ui/safe-html"
import { ChevronLeft, Play, Headphones, Calendar, Eye, User } from "lucide-react"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  try {
    const supabase = await createClient()
    const { data: lessons } = await supabase.from("lessons").select("id").eq("publish_status", "published").limit(100)

    return (lessons || []).map((lesson) => ({
      id: lesson.id,
    }))
  } catch (e) {
    console.log("[v0] generateStaticParams error:", e)
    return []
  }
}

export const revalidate = 60

export default async function LessonDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: lesson, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", id)
    .eq("publish_status", "published")
    .single()

  if (error || !lesson) {
    notFound()
  }

  // Increment views count
  try {
    await supabase
      .from("lessons")
      .update({ views_count: (lesson.views_count || 0) + 1 })
      .eq("id", id)
  } catch (e) {
    // Ignore view count errors
  }

  // Fetch related lessons
  const { data: relatedLessons } = await supabase
    .from("lessons")
    .select("id, title, type, thumbnail_path, media_source, created_at")
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

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    if (!url) return null
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const mediaUrl = lesson.media_path_or_url || lesson.video_url || lesson.audio_file_path
  const youtubeId = lesson.media_source === "youtube" ? getYouTubeId(mediaUrl) : null

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <nav className="flex items-center text-sm text-text-muted dark:text-text-subtext mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-primary">
            الرئيسية
          </Link>
          <ChevronLeft className="h-4 w-4 mx-2" />
          <Link href="/dars" className="hover:text-primary">
            الدروس
          </Link>
          <ChevronLeft className="h-4 w-4 mx-2" />
          <span className="text-primary font-medium">{lesson.title}</span>
        </nav>

        {/* Lesson Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                lesson.type === "video" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
              }`}
            >
              {lesson.type === "video" ? "درس مرئي" : "درس صوتي"}
            </span>
            {lesson.lesson_type && (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-secondary/10 text-secondary">
                {lesson.lesson_type === "fiqh"
                  ? "فقه"
                  : lesson.lesson_type === "seerah"
                    ? "سيرة"
                    : lesson.lesson_type === "aqeedah"
                      ? "عقيدة"
                      : lesson.lesson_type}
              </span>
            )}
            <span className="text-text-muted text-sm flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(lesson.created_at)}
            </span>
            <span className="text-text-muted text-sm flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {lesson.views_count || 0} مشاهدة
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-serif">{lesson.title}</h1>

          {/* Show sheikh name */}
          <div className="flex items-center gap-2 text-text-muted mb-4">
            <User className="h-5 w-5" />
            <span className="font-medium">الشيخ السيد مراد</span>
          </div>
        </div>

        {/* Thumbnail Image - Now shows properly */}
        {lesson.thumbnail_path && (
          <div className="mb-8 rounded-2xl overflow-hidden">
            <img
              src={lesson.thumbnail_path || "/placeholder.svg"}
              alt={lesson.title}
              className="w-full h-auto max-h-96 object-cover"
            />
          </div>
        )}

        {/* Media Player */}
        <div className="mb-12">
          {lesson.media_source === "youtube" && youtubeId ? (
            <div className="aspect-video rounded-2xl overflow-hidden bg-black">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title={lesson.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ) : lesson.type === "audio" || lesson.audio_file_path ? (
            <AudioPlayer src={mediaUrl || lesson.audio_file_path} title="استمع للدرس" />
          ) : mediaUrl ? (
            <div className="aspect-video rounded-2xl overflow-hidden bg-black">
              <video controls className="w-full h-full">
                <source src={mediaUrl} type="video/mp4" />
                متصفحك لا يدعم تشغيل الفيديو
              </video>
            </div>
          ) : null}
        </div>

        {lesson.transcript && (
          <div className="mb-12 bg-card rounded-2xl p-8 border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4">نص الدرس</h2>
            <div className="prose prose-lg max-w-none">
              <SafeHtml html={lesson.transcript} className="text-text-muted leading-relaxed" />
            </div>
          </div>
        )}

        {/* Tags */}
        {lesson.tags && lesson.tags.length > 0 && (
          <div className="mb-8 pb-8 border-b border-border">
            <h3 className="font-bold text-foreground mb-3">الموضوعات</h3>
            <div className="flex flex-wrap gap-2">
              {lesson.tags.map((tag: string, index: number) => (
                <span key={index} className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Share Section */}
        <div className="mb-12 pb-12 border-b border-border">
          <h3 className="font-bold text-foreground mb-4">مشاركة الدرس</h3>
          <ShareButtons title={lesson.title} />
        </div>

        {relatedLessons && relatedLessons.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">دروس ذات صلة</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedLessons.map((relatedLesson) => (
                <Link key={relatedLesson.id} href={`/dars/${relatedLesson.id}`} className="group">
                  <div className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary transition-colors">
                    <div className="relative aspect-video bg-gradient-to-br from-secondary to-secondary/50">
                      {relatedLesson.thumbnail_path ? (
                        <img
                          src={relatedLesson.thumbnail_path || "/placeholder.svg"}
                          alt={relatedLesson.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          {relatedLesson.type === "video" ? (
                            <Play className="h-16 w-16 text-white/50" />
                          ) : (
                            <Headphones className="h-16 w-16 text-white/50" />
                          )}
                        </div>
                      )}
                      <span
                        className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium ${
                          relatedLesson.type === "video" ? "bg-red-500 text-white" : "bg-blue-500 text-white"
                        }`}
                      >
                        {relatedLesson.type === "video" ? "فيديو" : "صوت"}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {relatedLesson.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
