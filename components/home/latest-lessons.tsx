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
          <span className="bg-green-100 dark:bg-green-900/30 text-primary dark:text-green-300 p-2 rounded-full">
            <span className="material-icons-outlined">podcasts</span>
          </span>
          <h3 className="text-2xl font-bold font-serif dark:text-white">أحدث الدروس</h3>
        </div>
        <Link href="/dars" className="text-sm text-primary dark:text-secondary font-medium hover:underline">
          عرض المكتبة
        </Link>
      </div>

      <div className="space-y-4">
        {lessons.length === 0 ? (
          <p className="text-text-muted dark:text-text-subtext text-center py-8">لا توجد دروس حالياً</p>
        ) : (
          lessons.map((lesson) => (
            <Link
              key={lesson.id}
              href={`/dars/${lesson.id}`}
              className="bg-background dark:bg-background-alt p-4 rounded-xl flex items-center justify-between group hover:shadow-md transition border border-transparent hover:border-border dark:hover:border-border"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface dark:bg-card text-primary flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition">
                  <span className="material-icons-outlined text-xl">play_arrow</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs text-text-muted mb-1">
                    <span className="bg-border dark:bg-border-light px-2 py-0.5 rounded text-[10px]">
                      {lesson.categories?.name || lesson.type}
                    </span>
                    <span>{formatDistanceToNow(new Date(lesson.created_at), { addSuffix: true, locale: ar })}</span>
                  </div>
                  <h4 className="font-bold text-foreground dark:text-gray-200">{lesson.title}</h4>
                </div>
              </div>
              <div className="text-text-muted group-hover:text-primary dark:hover:text-white transition">
                <span className="material-icons-outlined">download</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
