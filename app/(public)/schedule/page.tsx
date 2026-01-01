import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "الجدول الزمني",
  description: "الجدول الشهري للدروس والمحاضرات والخطب للشيخ السيد مراد",
}

interface ScheduleEvent {
  id: string
  title: string
  description: string | null
  event_type: "fiqh" | "seerah" | "friday" | "aqeedah" | "general"
  event_date: string
  event_time: string | null
  location: string | null
  is_live: boolean
}

// Helper function to get Arabic day name
function getArabicDayName(dayIndex: number): string {
  const days = ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"]
  return days[dayIndex]
}

// Helper to get Arabic month name
function getArabicMonthName(month: number): string {
  const months = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ]
  return months[month]
}

// Get event type styles
function getEventTypeStyles(type: string) {
  switch (type) {
    case "fiqh":
      return {
        bg: "bg-blue-50 dark:bg-blue-900/30",
        border: "border-blue-500",
        text: "text-blue-600 dark:text-blue-300",
      }
    case "seerah":
      return {
        bg: "bg-orange-50 dark:bg-orange-900/30",
        border: "border-orange-500",
        text: "text-orange-600 dark:text-orange-300",
      }
    case "friday":
      return {
        bg: "bg-primary/10 dark:bg-primary/30",
        border: "border-primary",
        text: "text-primary dark:text-white",
      }
    case "aqeedah":
      return {
        bg: "bg-purple-50 dark:bg-purple-900/30",
        border: "border-purple-500",
        text: "text-purple-600 dark:text-purple-300",
      }
    default:
      return {
        bg: "bg-gray-50 dark:bg-gray-800",
        border: "border-gray-500",
        text: "text-gray-600 dark:text-gray-300",
      }
  }
}

// Get event type label
function getEventTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    fiqh: "مجلس الفقه",
    seerah: "دروس السيرة",
    friday: "خطبة الجمعة",
    aqeedah: "عقيدة",
    general: "درس عام",
  }
  return labels[type] || "درس"
}

export default async function SchedulePage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string; year?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  // Get current month/year or from params
  const now = new Date()
  const currentMonth = params.month ? Number.parseInt(params.month) : now.getMonth()
  const currentYear = params.year ? Number.parseInt(params.year) : now.getFullYear()

  // Get first and last day of month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)

  // Get events for current month
  const { data: events } = await supabase
    .from("schedule_events")
    .select("*")
    .gte("event_date", firstDayOfMonth.toISOString().split("T")[0])
    .lte("event_date", lastDayOfMonth.toISOString().split("T")[0])
    .eq("is_active", true)
    .order("event_date", { ascending: true })

  // Generate calendar grid
  const daysInMonth = lastDayOfMonth.getDate()
  // Adjust for Saturday start (0 = Saturday in our calendar)
  let firstDayIndex = firstDayOfMonth.getDay() + 1
  if (firstDayIndex === 7) firstDayIndex = 0

  // Previous month days
  const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate()

  // Create calendar days array
  const calendarDays: Array<{
    day: number
    isCurrentMonth: boolean
    isFriday: boolean
    events: ScheduleEvent[]
  }> = []

  // Add previous month days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    calendarDays.push({
      day: prevMonthLastDay - i,
      isCurrentMonth: false,
      isFriday: false,
      events: [],
    })
  }

  // Add current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day)
    const dayOfWeek = date.getDay()
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`

    const dayEvents = (events || []).filter((e) => e.event_date === dateStr)

    calendarDays.push({
      day,
      isCurrentMonth: true,
      isFriday: dayOfWeek === 5,
      events: dayEvents,
    })
  }

  // Add next month days to complete the grid
  const remainingDays = 42 - calendarDays.length
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: false,
      isFriday: false,
      events: [],
    })
  }

  // Calculate navigation months
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear
  const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1
  const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-accent-light dark:bg-card py-12 relative overflow-hidden">
        <div className="absolute -left-10 -top-10 opacity-5 dark:opacity-10 text-primary dark:text-white pointer-events-none select-none">
          <span className="material-icons-outlined" style={{ fontSize: "300px" }}>
            calendar_month
          </span>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block px-3 py-1 bg-white dark:bg-card text-secondary text-xs rounded-full mb-4 border border-secondary/20">
            تنظيم الوقت
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4 font-serif">
            الجدول الشهري للدروس والمحاضرات
          </h1>
          <p className="text-text-muted dark:text-text-subtext max-w-2xl mx-auto text-sm leading-relaxed">
            تابع مواعيد الدروس العلمية والمحاضرات العامة والخطب، وكن على اطلاع دائم بمجالس العلم والذكر.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Month Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center bg-card rounded-xl shadow-sm p-2 border border-border">
            <Link
              href={`/schedule?month=${prevMonth}&year=${prevYear}`}
              className="p-2 hover:bg-muted rounded-lg text-text-muted transition"
            >
              <span className="material-icons-outlined">chevron_right</span>
            </Link>
            <h2 className="px-6 font-bold text-lg text-primary dark:text-white">
              {getArabicMonthName(currentMonth)} {currentYear}
            </h2>
            <Link
              href={`/schedule?month=${nextMonth}&year=${nextYear}`}
              className="p-2 hover:bg-muted rounded-lg text-text-muted transition"
            >
              <span className="material-icons-outlined">chevron_left</span>
            </Link>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm shadow-sm flex items-center gap-2">
              <span className="material-icons-outlined text-base">calendar_view_month</span>
              شهر
            </button>
            <button className="px-4 py-2 bg-card text-text-muted border border-border hover:bg-muted rounded-lg text-sm transition flex items-center gap-2">
              <span className="material-icons-outlined text-base">calendar_view_week</span>
              أسبوع
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-card rounded-2xl shadow-sm overflow-hidden border border-border">
          {/* Day Headers */}
          <div className="grid grid-cols-7 border-b border-border bg-muted/50">
            {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => (
              <div
                key={dayIndex}
                className={`py-4 text-center text-sm font-bold ${dayIndex === 6 ? "text-primary dark:text-secondary" : "text-text-muted"}`}
              >
                {getArabicDayName(dayIndex)}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 auto-rows-fr bg-border gap-px">
            {calendarDays.map((calDay, index) => (
              <div
                key={index}
                className={`min-h-[140px] p-2 relative group transition ${
                  !calDay.isCurrentMonth
                    ? "bg-card text-text-muted/30"
                    : calDay.isFriday
                      ? "bg-green-50/50 dark:bg-green-900/10 hover:bg-green-50 dark:hover:bg-green-900/20"
                      : "bg-card hover:bg-accent-light dark:hover:bg-background-alt"
                }`}
              >
                <span
                  className={`text-sm ${
                    calDay.isFriday && calDay.isCurrentMonth
                      ? "font-bold text-primary dark:text-secondary"
                      : calDay.isCurrentMonth
                        ? "font-medium text-foreground dark:text-foreground"
                        : ""
                  }`}
                >
                  {calDay.day}
                </span>

                {/* Events */}
                <div className="mt-2 space-y-1">
                  {calDay.events.map((event) => {
                    const styles = getEventTypeStyles(event.event_type)
                    return (
                      <div
                        key={event.id}
                        className={`p-2 rounded-lg ${styles.bg} border-r-2 ${styles.border} cursor-pointer hover:shadow-md transition relative overflow-hidden`}
                      >
                        {event.is_live && (
                          <div className="absolute top-0 left-0 bg-red-500 text-white text-[8px] px-1 py-0.5 rounded-br">
                            مباشر
                          </div>
                        )}
                        <div className={`text-[10px] ${styles.text} font-bold mb-1`}>
                          {getEventTypeLabel(event.event_type)}
                        </div>
                        <div className="text-xs text-foreground dark:text-foreground font-medium line-clamp-2">
                          {event.title}
                        </div>
                        {event.event_time && (
                          <div className="flex items-center gap-1 mt-1 text-[10px] text-text-muted">
                            <span className="material-icons-outlined text-[10px]">schedule</span>
                            {event.event_time.substring(0, 5)}
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center gap-1 mt-0.5 text-[10px] text-text-muted">
                            <span className="material-icons-outlined text-[10px]">location_on</span>
                            {event.location}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-text-muted">فقه</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-sm text-text-muted">سيرة</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm text-text-muted">خطبة الجمعة</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-sm text-text-muted">عقيدة</span>
          </div>
        </div>
      </div>
    </main>
  )
}
