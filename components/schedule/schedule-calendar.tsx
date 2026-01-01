"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface ScheduleEvent {
  id: string
  title: string
  description: string | null
  event_type: "fiqh" | "seerah" | "friday" | "aqeedah" | "general"
  event_date: string
  event_time: string | null
  location: string | null
  is_live: boolean
  is_recurring: boolean
}

interface WeeklySchedule {
  id: string
  category: string
  title: string
  time: string
  location: string
}

interface ScheduleCalendarProps {
  events: ScheduleEvent[]
  weeklySchedule: WeeklySchedule[]
  initialMonth: number
  initialYear: number
}

const WEEKDAYS = ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"]

const ARABIC_MONTHS = [
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

// Simple Hijri approximation (for display purposes)
function getHijriDate(date: Date): { month: string; year: number } {
  const hijriMonths = [
    "محرم",
    "صفر",
    "ربيع الأول",
    "ربيع الثاني",
    "جمادى الأولى",
    "جمادى الآخرة",
    "رجب",
    "شعبان",
    "رمضان",
    "شوال",
    "ذو القعدة",
    "ذو الحجة",
  ]

  // Approximate conversion (not precise, but good for display)
  const gregorianYear = date.getFullYear()
  const gregorianMonth = date.getMonth()

  // Rough estimate: Hijri year is approximately Gregorian year - 579
  const hijriYear = Math.floor((gregorianYear - 622) * (33 / 32)) + 1
  const hijriMonth = (gregorianMonth + 6) % 12

  return {
    month: hijriMonths[hijriMonth],
    year: hijriYear,
  }
}

function getEventColor(type: string) {
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
        border: "border-gray-400",
        text: "text-gray-600 dark:text-gray-300",
      }
  }
}

function getEventTypeLabel(type: string) {
  switch (type) {
    case "fiqh":
      return "مجلس الفقه"
    case "seerah":
      return "دروس السيرة"
    case "friday":
      return "خطبة الجمعة"
    case "aqeedah":
      return "دروس العقيدة"
    default:
      return "درس عام"
  }
}

export function ScheduleCalendar({ events, initialMonth, initialYear }: ScheduleCalendarProps) {
  const router = useRouter()
  const [currentMonth, setCurrentMonth] = useState(initialMonth)
  const [currentYear, setCurrentYear] = useState(initialYear)
  const [viewMode, setViewMode] = useState<"month" | "week">("month")

  // Get first day of month and total days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()

  // Get the day of week for the first day (0 = Saturday in our case)
  // JavaScript: 0 = Sunday, 6 = Saturday
  // We want: 0 = Saturday, 6 = Friday
  const jsFirstDay = firstDayOfMonth.getDay()
  const firstDayIndex = jsFirstDay === 6 ? 0 : jsFirstDay + 1

  // Get Hijri date
  const hijriDate = getHijriDate(firstDayOfMonth)

  // Group events by date
  const eventsByDate: Record<string, ScheduleEvent[]> = {}
  events.forEach((event) => {
    const dateKey = event.event_date.split("T")[0]
    if (!eventsByDate[dateKey]) {
      eventsByDate[dateKey] = []
    }
    eventsByDate[dateKey].push(event)
  })

  // Generate calendar days
  const calendarDays: (number | null)[] = []

  // Add empty cells for days before the first day of month
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push(null)
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  // Fill remaining cells to complete the grid
  const remainingCells = 7 - (calendarDays.length % 7)
  if (remainingCells < 7) {
    for (let i = 0; i < remainingCells; i++) {
      calendarDays.push(null)
    }
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const isToday = (day: number) => {
    const today = new Date()
    return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
  }

  const isFriday = (day: number) => {
    const date = new Date(currentYear, currentMonth, day)
    return date.getDay() === 5 // Friday
  }

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center bg-surface dark:bg-card rounded-xl shadow-sm p-2 border border-border">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-background dark:hover:bg-background-alt rounded-lg text-text-muted transition"
          >
            <span className="material-icons-outlined">chevron_right</span>
          </button>
          <h2 className="px-6 font-bold text-lg text-primary dark:text-white">
            {ARABIC_MONTHS[currentMonth]} {currentYear}
            <span className="text-sm font-normal text-text-muted mx-2">|</span>
            {hijriDate.month} {hijriDate.year}
          </h2>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-background dark:hover:bg-background-alt rounded-lg text-text-muted transition"
          >
            <span className="material-icons-outlined">chevron_left</span>
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("month")}
            className={`px-4 py-2 rounded-lg text-sm shadow-sm flex items-center gap-2 transition ${
              viewMode === "month"
                ? "bg-primary text-white"
                : "bg-surface dark:bg-card text-text-muted border border-border hover:bg-background dark:hover:bg-background-alt"
            }`}
          >
            <span className="material-icons-outlined text-base">calendar_view_month</span>
            شهر
          </button>
          <button
            onClick={() => setViewMode("week")}
            className={`px-4 py-2 rounded-lg text-sm shadow-sm flex items-center gap-2 transition ${
              viewMode === "week"
                ? "bg-primary text-white"
                : "bg-surface dark:bg-card text-text-muted border border-border hover:bg-background dark:hover:bg-background-alt"
            }`}
          >
            <span className="material-icons-outlined text-base">calendar_view_week</span>
            أسبوع
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-surface dark:bg-card rounded-2xl shadow-sm overflow-hidden border border-border">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 border-b border-border bg-background dark:bg-background-alt">
          {WEEKDAYS.map((day, index) => (
            <div
              key={day}
              className={`py-4 text-center text-sm font-bold ${
                index === 6 ? "text-primary dark:text-secondary" : "text-text-muted dark:text-text-subtext"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 auto-rows-fr bg-border dark:bg-border gap-px">
          {calendarDays.map((day, index) => {
            if (day === null) {
              return (
                <div
                  key={`empty-${index}`}
                  className="bg-surface dark:bg-card min-h-[140px] p-2 text-text-muted/30 dark:text-text-subtext/30"
                />
              )
            }

            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
            const dayEvents = eventsByDate[dateStr] || []
            const fridayDay = isFriday(day)
            const todayDay = isToday(day)

            return (
              <div
                key={day}
                className={`min-h-[140px] p-2 relative group transition ${
                  fridayDay
                    ? "bg-green-50/50 dark:bg-green-900/10 hover:bg-green-50 dark:hover:bg-green-900/20"
                    : "bg-surface dark:bg-card hover:bg-accent-light dark:hover:bg-background-alt"
                }`}
              >
                <span
                  className={`text-sm ${
                    todayDay
                      ? "bg-primary text-white w-7 h-7 rounded-full flex items-center justify-center font-bold"
                      : fridayDay
                        ? "font-bold text-primary dark:text-secondary"
                        : "font-medium text-foreground dark:text-white"
                  }`}
                >
                  {day}
                </span>

                {/* Events */}
                <div className="mt-2 space-y-1">
                  {dayEvents.slice(0, 2).map((event) => {
                    const colors = getEventColor(event.event_type)
                    return (
                      <div
                        key={event.id}
                        className={`p-2 rounded-lg ${colors.bg} border-r-2 ${colors.border} cursor-pointer hover:shadow-md transition relative overflow-hidden`}
                      >
                        {event.is_live && (
                          <div className="absolute top-0 left-0 bg-red-500 text-white text-[8px] px-1 py-0.5 rounded-br">
                            مباشر
                          </div>
                        )}
                        <div className={`text-[10px] ${colors.text} font-bold mb-1`}>
                          {getEventTypeLabel(event.event_type)}
                        </div>
                        <div className="text-xs text-foreground dark:text-white font-medium line-clamp-2">
                          {event.title}
                        </div>
                        {event.event_time && (
                          <div className="flex items-center gap-1 mt-1 text-[10px] text-text-muted">
                            <span className="material-icons-outlined text-[10px]">schedule</span>
                            {event.event_time.slice(0, 5)}
                          </div>
                        )}
                      </div>
                    )
                  })}
                  {dayEvents.length > 2 && (
                    <div className="text-[10px] text-text-muted text-center">+{dayEvents.length - 2} المزيد</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
