import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { HeroSection } from "@/components/home/hero-section"
import { LatestLessons } from "@/components/home/latest-lessons"
import { WeeklySchedule } from "@/components/home/weekly-schedule"
import { ExploreSections } from "@/components/home/explore-sections"
import { FeaturedBooks } from "@/components/home/featured-books"
import { LatestArticles } from "@/components/home/latest-articles"
import { NewsletterSection } from "@/components/home/newsletter-section"

export const revalidate = 60

export const metadata: Metadata = {
  title: "الرئيسية",
  description:
    "منصة إسلامية شاملة تقدم خطب ودروس علمية ومقالات وكتب من الشيخ السيد مراد. تعلم العلم الشرعي بسهولة ويسر.",
  openGraph: {
    title: "الشيخ السيد مراد - الرئيسية",
    description: "منصة إسلامية شاملة تقدم خطب ودروس وكتب إسلامية",
    type: "website",
  },
}

export default async function HomePage() {
  const supabase = await createClient()

  // Also removed is_active from weekly_schedule query
  const [{ data: heroDataArray }, { data: lessons }, { data: weeklySchedule }, { data: books }, { data: articles }] =
    await Promise.all([
      supabase.from("hero_section").select("*").limit(1),
      supabase
        .from("lessons")
        .select("*")
        .eq("publish_status", "published")
        .order("created_at", { ascending: false })
        .limit(3),
      supabase.from("weekly_schedule").select("*").order("sort_order", { ascending: true }).limit(5),
      supabase
        .from("books")
        .select("*")
        .eq("publish_status", "published")
        .order("created_at", { ascending: false })
        .limit(4),
      supabase
        .from("articles")
        .select("*")
        .eq("publish_status", "published")
        .order("created_at", { ascending: false })
        .limit(3),
    ])

  // Get first item from array or null
  const heroData = heroDataArray?.[0] || null

  let schedule = weeklySchedule || []
  if (schedule.length === 0) {
    const { data: eventsData } = await supabase
      .from("events")
      .select("*")
      .eq("type", "weekly")
      .order("created_at", { ascending: false })
      .limit(5)

    // Map events to schedule format
    if (eventsData && eventsData.length > 0) {
      schedule = eventsData.map((event, index) => ({
        id: event.id,
        day_name: getDayName(event.day_of_week),
        time_text: event.event_time ? event.event_time.substring(0, 5) : "",
        title: event.title,
        description: event.description,
        is_active: event.is_active ?? true,
        sort_order: index,
      }))
    }
  }

  return (
    <>
      <HeroSection data={heroData} />

      {/* Latest Lessons & Schedule Section */}
      <section className="py-12 lg:py-16 bg-surface dark:bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <LatestLessons lessons={lessons || []} />
            <WeeklySchedule schedule={schedule} />
          </div>
        </div>
      </section>

      <ExploreSections />
      <FeaturedBooks books={books || []} />
      <LatestArticles articles={articles || []} />
      <NewsletterSection />
    </>
  )
}

function getDayName(day: string | null): string {
  const days: Record<string, string> = {
    sunday: "الأحد",
    monday: "الاثنين",
    tuesday: "الثلاثاء",
    wednesday: "الأربعاء",
    thursday: "الخميس",
    friday: "الجمعة",
    saturday: "السبت",
  }
  return day ? days[day.toLowerCase()] || day : ""
}
