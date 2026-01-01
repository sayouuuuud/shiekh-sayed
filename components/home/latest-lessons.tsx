import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { ar } from "date-fns/locale"

interface Lesson {
  id: string
  title: string
  description: string
  type: string
  media_source: string
  media_path_or_url: string
  created_at: string
  categories: { name: string } | null
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
            <span className="material-icons-outlined text-xl">podcasts</span>
          </span>
          <h3 className="text-2xl font-bold font-serif text-foreground dark:text-white">أحدث الدروس</h3>
        </div>
        <Link
          href="/dars"
          className="text-sm text-primary dark:text-secondary font-medium hover:underline flex items-center gap-1"
        >
          عرض المكتبة
          <span className="material-icons-outlined text-sm rtl-flip">arrow_back</span>
        </Link>
      </div>

      <div className="space-y-3">
        {lessons.length === 0 ? (
          <div className="text-center py-12 bg-surface dark:bg-background-alt rounded-2xl border border-border">
            <span className="material-icons-outlined text-5xl text-text-muted mb-4">school</span>
            <p className="text-text-muted dark:text-text-subtext">لا توجد دروس حالياً</p>
          </div>
        ) : (
          lessons.map((lesson, index) => (
            <Link
              key={lesson.id}
              href={`/dars/${lesson.id}`}
              className="bg-surface dark:bg-background-alt p-4 rounded-xl flex items-center justify-between group hover:shadow-md transition-all border border-transparent hover:border-primary/20 dark:hover:border-primary/20"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-card dark:bg-card text-primary flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-all group-hover:scale-105">
                  <span className="material-icons-outlined text-2xl">play_arrow</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs text-text-muted mb-1.5">
                    <span className="bg-muted dark:bg-border px-2.5 py-0.5 rounded-full text-[10px] font-medium">
                      {lesson.categories?.name || (lesson.type === "video" ? "مرئي" : "صوتي")}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-icons-outlined text-[10px]">schedule</span>
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
                  <span className="material-icons-outlined">download</span>
                </span>
                <span className="material-icons-outlined text-text-muted group-hover:text-primary transition-colors rtl-flip">
                  arrow_back
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
