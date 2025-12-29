import Link from "next/link"

interface ScheduleItem {
  id: string
  day_name: string
  time_text: string
  title: string
  description: string | null
  is_active: boolean
  display_order: number
}

interface WeeklyScheduleProps {
  schedule: ScheduleItem[]
}

export function WeeklySchedule({ schedule }: WeeklyScheduleProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-300 p-2 rounded-full">
            <span className="material-icons-outlined">calendar_today</span>
          </span>
          <h3 className="text-2xl font-bold font-serif dark:text-white">جدول الدروس الأسبوعية</h3>
        </div>
        <span className="text-xs text-text-muted bg-background dark:bg-background-alt px-2 py-1 rounded">
          بتوقيت القاهرة
        </span>
      </div>

      <div className="bg-background dark:bg-background-alt rounded-xl p-6 border border-border dark:border-border space-y-6">
        {schedule.length === 0 ? (
          <p className="text-text-muted dark:text-text-subtext text-center py-8">لا يوجد جدول حالياً</p>
        ) : (
          schedule.map((item, index) => (
            <div key={item.id}>
              {index > 0 && <div className="border-t border-border dark:border-border mb-6" />}
              <div className="flex items-start gap-4">
                <div className="bg-surface dark:bg-card border border-border rounded-lg p-2 text-center min-w-[70px] shadow-sm">
                  <span className="block text-xs text-text-muted">{item.day_name}</span>
                  <span className="block text-lg font-bold text-primary">{item.time_text}</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg dark:text-white">{item.title}</h4>
                  {item.description && (
                    <p className="text-sm text-text-muted dark:text-text-subtext mt-1">{item.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}

        <div className="mt-4 pt-4 border-t border-border dark:border-border text-center">
          <Link
            href="/schedule"
            className="text-sm text-text-muted hover:text-primary flex items-center justify-center gap-2"
          >
            <span className="material-icons-outlined text-sm">calendar_month</span>
            عرض الجدول الشهري الكامل
          </Link>
        </div>
      </div>
    </div>
  )
}
