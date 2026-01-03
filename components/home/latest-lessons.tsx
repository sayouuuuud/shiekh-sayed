import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { ar } from "date-fns/locale"
import { Podcast, Play, Download, ArrowLeft, Clock } from "lucide-react"

export const revalidate = 60

interface Lesson {
  id: string
  title: string
  description: string
  type: string
  media_source: string
  media_path_or_url: string
  created_at: string
  lesson_type?: string
  thumbnail_path?: string | null
}

interface LatestLessonsProps {
  lessons: Lesson[]
}

export function LatestLessons({ lessons }: LatestLessonsProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <span className="bg-green-100 dark:bg-green-900/30 text-primary dark:text-green-300 p-2.5 rounded-xl shadow-sm">
            <Podcast className="h-5 w-5" />
          </span>
          <h3 className="text-2xl font-bold font-serif text-foreground dark:text-white">أحدث الدروس</h3>
        </div>
        <Link
          href="/dars"
          className="text-sm text-primary dark:text-secondary font-medium hover:underline flex items-center gap-1"
        >
          عرض المكتبة
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>

      <div className="space-y-3">
        {lessons.length === 0 ? (
          <div className="text-center py-12 bg-surface dark:bg-background-alt rounded-2xl border border-border">
            <Podcast className="h-12 w-12 mx-auto text-text-muted mb-4" />
            <p className="text-text-muted dark:text-text-subtext">لا توجد دروس حالياً</p>
          </div>
        ) : (
          lessons.map((lesson) => (
            <Link
              key={lesson.id}
              href={`/dars/${lesson.id}`}
              className="bg-surface dark:bg-background-alt p-4 rounded-xl flex items-center justify-between group hover:shadow-md transition-all border border-transparent hover:border-primary/20 dark:hover:border-primary/20"
            >
              <div className="flex items-center gap-4">
                {lesson.thumbnail_path ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
                    <img
                      src={lesson.thumbnail_path || "/placeholder.svg"}
                      alt={lesson.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-card dark:bg-card text-primary flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-all group-hover:scale-105">
                    <Play className="h-6 w-6" />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2 text-xs text-text-muted mb-1.5">
                    <span className="bg-muted dark:bg-border px-2.5 py-0.5 rounded-full text-[10px] font-medium">
                      {lesson.lesson_type || (lesson.type === "video" ? "مرئي" : "صوتي")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" />
                      {formatDistanceToNow(new Date(lesson.created_at), { addSuffix: true, locale: ar })}
                    </span>
                  </div>
                  <h4 className="font-bold text-foreground dark:text-white group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                    {lesson.title}
                  </h4>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-text-muted group-hover:text-primary transition-colors">
                  <Download className="h-5 w-5" />
                </span>
                <ArrowLeft className="h-5 w-5 text-text-muted group-hover:text-primary transition-colors" />
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
