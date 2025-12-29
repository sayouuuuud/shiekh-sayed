import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

interface LessonSchedule {
  id: string
  category: string
  title: string
  time: string
  location: string
  description: string | null
}

export default async function SchedulePage() {
  const supabase = await createClient()

  const { data: schedules } = await supabase
    .from("lesson_schedule")
    .select("*")
    .eq("enabled", true)
    .order("created_at", { ascending: true })

  // Group schedules by category
  const groupedSchedules = (schedules || []).reduce(
    (acc, schedule) => {
      if (!acc[schedule.category]) {
        acc[schedule.category] = []
      }
      acc[schedule.category].push(schedule)
      return acc
    },
    {} as Record<string, LessonSchedule[]>,
  )

  const categoryColors: Record<string, string> = {
    فقه: "bg-green-500",
    عقيدة: "bg-blue-500",
    سيرة: "bg-amber-500",
    تفسير: "bg-purple-500",
    حديث: "bg-teal-500",
  }

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-muted dark:text-text-subtext mb-8">
          <Link href="/" className="hover:text-primary dark:hover:text-secondary">
            الرئيسية
          </Link>
          <span className="material-icons-outlined text-xs rtl-flip">chevron_left</span>
          <span className="text-primary dark:text-secondary font-medium">جدول الدروس</span>
        </div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary dark:text-secondary text-sm font-medium mb-4">
            المواعيد الأسبوعية
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground dark:text-white mb-4 font-serif">
            جدول الدروس
          </h1>
          <p className="text-lg text-text-muted dark:text-text-subtext">
            مواعيد الدروس والمحاضرات الأسبوعية لفضيلة الشيخ
          </p>
        </div>

        {/* Schedule Grid */}
        {Object.keys(groupedSchedules).length === 0 ? (
          <div className="text-center py-16 bg-surface dark:bg-card rounded-2xl border border-border">
            <span className="material-icons-outlined text-6xl text-text-muted mb-4">event_busy</span>
            <p className="text-text-muted dark:text-text-subtext">لا توجد دروس مجدولة حالياً</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(groupedSchedules).map(([category, lessons]) => (
              <div
                key={category}
                className="bg-surface dark:bg-card rounded-xl border border-border dark:border-border overflow-hidden"
              >
                <div className={`${categoryColors[category] || "bg-gray-500"} px-6 py-4`}>
                  <h2 className="text-xl font-bold text-white">{category}</h2>
                </div>
                <div className="p-6 space-y-4">
                  {lessons.map((lesson) => (
                    <div key={lesson.id} className="border-b border-border dark:border-border pb-4 last:border-0">
                      <h3 className="font-bold text-foreground dark:text-white mb-2">{lesson.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-text-muted dark:text-text-subtext mb-1">
                        <span className="material-icons-outlined text-sm">schedule</span>
                        {lesson.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-text-muted dark:text-text-subtext">
                        <span className="material-icons-outlined text-sm">location_on</span>
                        {lesson.location}
                      </div>
                      {lesson.description && (
                        <p className="text-xs text-text-muted dark:text-text-subtext mt-2">{lesson.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
