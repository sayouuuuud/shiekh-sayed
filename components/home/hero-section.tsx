import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

interface HeroData {
  hadith_arabic: string | null
  hadith_translation: string | null
  hadith_explanation: string | null
  hadith_button_text: string | null
  hadith_button_link: string | null
  book_custom_text: string | null
  book_button_text: string | null
  book_button_link: string | null
  notice_text: string | null
  notice_link: string | null
  notice_active: boolean | null
  important_notice: string | null
  important_notice_link: string | null
  show_important_notice: boolean | null
  featured_book_id: string | null
  underline_text: string | null
}

interface WeeklyScheduleItem {
  id: string
  title: string
  day_name: string
  time_text: string | null
}

interface FeaturedBook {
  id: string
  title: string
  cover_image_path: string | null
  author: string | null
}

interface HeroSectionProps {
  data: HeroData | null
}

function parseUnderlinedText(text: string, underlineText: string | null): string {
  if (!underlineText || !underlineText.trim()) return text
  // Escape special regex characters in underlineText
  const escaped = underlineText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  return text.replace(
    new RegExp(`(${escaped})`, "g"),
    '<span class="underline decoration-secondary decoration-2 underline-offset-4">$1</span>',
  )
}

export async function HeroSection({ data }: HeroSectionProps) {
  const supabase = await createClient()

  let weeklySchedule: WeeklyScheduleItem[] = []
  try {
    const { data: scheduleData, error } = await supabase
      .from("weekly_schedule")
      .select("id, title, day_name, time_text")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .limit(3)

    if (!error && scheduleData && scheduleData.length > 0) {
      weeklySchedule = scheduleData
    } else {
      const { data: eventsData } = await supabase
        .from("schedule_events")
        .select("id, title, event_type, event_time")
        .eq("is_active", true)
        .limit(3)

      if (eventsData) {
        weeklySchedule = eventsData.map((e) => ({
          id: e.id,
          title: e.title,
          day_name: e.event_type === "friday" ? "الجمعة" : e.event_type === "fiqh" ? "السبت" : "الأربعاء",
          time_text: e.event_time,
        }))
      }
    }
  } catch (e) {
    console.log("[v0] Weekly schedule fetch error - table may not exist yet")
  }

  let featuredBook: FeaturedBook | null = null
  if (data?.featured_book_id && data.featured_book_id !== "none") {
    try {
      const { data: bookData, error } = await supabase
        .from("books")
        .select("id, title, cover_image_path, author")
        .eq("id", data.featured_book_id)
        .single()

      if (!error && bookData) {
        featuredBook = bookData
      }
    } catch (e) {
      console.log("[v0] Could not fetch featured book")
    }
  }

  const heroData = {
    hadith_arabic: data?.hadith_arabic || "من سلك طريقاً يلتمس فيه علماً سهل الله له به طريقاً إلى الجنة",
    hadith_translation: data?.hadith_translation || "رواه مسلم",
    hadith_explanation:
      data?.hadith_explanation ||
      "حديث عظيم يبين فضل طلب العلم والسعي في تحصيله، وأن الله يسهل لطالب العلم طريقه إلى الجنة",
    hadith_button_text: data?.hadith_button_text || "اقرأ المزيد",
    hadith_button_link: data?.hadith_button_link || "/articles",
    book_custom_text: data?.book_custom_text || "أحدث إصدارات الشيخ",
    book_button_text: data?.book_button_text || "تصفح الكتب",
    book_button_link: data?.book_button_link || "/books",
    notice_text: data?.important_notice || data?.notice_text || null,
    notice_link: data?.important_notice_link || data?.notice_link || null,
    notice_active: data?.show_important_notice ?? data?.notice_active ?? false,
    underline_text: data?.underline_text || null,
  }

  const hadithText = heroData.hadith_arabic?.trim() || ""

  return (
    <header className="relative overflow-hidden py-16 lg:py-24 bg-background">
      {heroData.notice_active && heroData.notice_text && (
        <div className="bg-secondary/10 dark:bg-secondary/20 border-b border-secondary/20 mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-center gap-3 text-center">
              <span className="material-icons-outlined text-secondary text-lg">campaign</span>
              <span className="text-sm font-medium text-foreground dark:text-white">{heroData.notice_text}</span>
            </div>
          </div>
        </div>
      )}

      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none dark:opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(var(--primary) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Content */}
          <div className="flex-1 text-center lg:text-right space-y-8 lg:space-y-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-surface dark:bg-card px-4 py-2 rounded-full border border-border shadow-sm">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="text-sm text-secondary font-medium">حديث اليوم</span>
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-relaxed font-medium text-foreground dark:text-white font-serif w-full"
              dangerouslySetInnerHTML={{
                __html: parseUnderlinedText(hadithText, heroData.underline_text),
              }}
            />

            {/* Description */}
            <p className="text-lg lg:text-xl text-text-muted dark:text-text-subtext leading-relaxed max-w-3xl mx-auto lg:mx-0">
              {heroData.hadith_explanation}
            </p>

            {/* Source */}
            <p className="text-sm text-secondary font-medium flex items-center justify-center lg:justify-start gap-2">
              <span className="material-icons-outlined text-sm">format_quote</span>
              {heroData.hadith_translation}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                href={heroData.hadith_button_link}
                className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all text-lg font-medium group"
              >
                <span className="material-icons-outlined text-xl group-hover:scale-110 transition-transform">
                  menu_book
                </span>
                {heroData.hadith_button_text}
              </Link>
              <Link
                href="/dars"
                className="flex items-center gap-2 bg-surface dark:bg-card border border-border text-foreground dark:text-white px-8 py-3.5 rounded-xl hover:bg-muted dark:hover:bg-background-alt transition-all shadow-sm hover:shadow-md text-lg font-medium group"
              >
                <span className="material-icons-outlined text-xl group-hover:scale-110 transition-transform">
                  play_circle
                </span>
                استمع للدرس
              </Link>
            </div>

            {weeklySchedule && weeklySchedule.length > 0 && (
              <div className="mt-8 p-4 bg-surface dark:bg-card rounded-xl border border-border">
                <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="material-icons-outlined text-primary">schedule</span>
                  الدروس الأسبوعية
                </h3>
                <div className="space-y-2">
                  {weeklySchedule.map((item: WeeklyScheduleItem) => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{item.title}</span>
                      <span className="text-text-muted">
                        {item.day_name}
                        {item.time_text && ` - ${item.time_text}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Featured Book - Now properly shows book from database */}
          <div className="flex-shrink-0 relative group">
            <div className="absolute inset-0 bg-primary opacity-20 blur-3xl rounded-full transform scale-90 group-hover:scale-100 transition duration-700"></div>
            <div className="relative bg-surface dark:bg-card p-4 rounded-2xl shadow-xl border border-border">
              {featuredBook?.cover_image_path ? (
                <div className="relative w-[280px] sm:w-[320px] h-[400px] sm:h-[460px] rounded-xl overflow-hidden">
                  <img
                    src={featuredBook.cover_image_path || "/placeholder.svg"}
                    alt={featuredBook.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="relative bg-gradient-to-br from-primary to-primary-hover w-[280px] sm:w-[320px] h-[400px] sm:h-[460px] rounded-xl shadow-inner flex flex-col items-center justify-center text-center p-8 border-[8px] border-primary-hover/50">
                  <div className="absolute inset-4 border border-secondary/30 rounded-lg pointer-events-none"></div>
                  <div className="absolute inset-6 border border-secondary/20 rounded pointer-events-none"></div>

                  <span className="text-secondary text-xs font-medium tracking-widest mb-4 uppercase">
                    {heroData.book_custom_text}
                  </span>
                  <h2 className="text-white text-4xl sm:text-5xl font-serif font-bold mb-1">فقه</h2>
                  <h2 className="text-white text-4xl sm:text-5xl font-serif font-bold mb-6">السنة</h2>
                  <div className="w-16 h-0.5 bg-secondary mb-6"></div>
                  <p className="text-gray-300/80 text-sm">دراسة منهجية</p>

                  <div className="absolute left-0 top-4 bottom-4 w-4 bg-gradient-to-r from-black/20 to-transparent rounded-l-lg"></div>
                </div>
              )}

              {/* View Book Link */}
              <Link
                href={featuredBook ? `/books/${featuredBook.id}` : heroData.book_button_link}
                className="mt-4 flex items-center justify-center gap-2 text-primary dark:text-secondary font-medium cursor-pointer hover:underline py-2 group/link"
              >
                <span className="material-icons-outlined text-sm group-hover/link:scale-110 transition-transform">
                  visibility
                </span>
                <span className="text-sm">{heroData.book_button_text}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
