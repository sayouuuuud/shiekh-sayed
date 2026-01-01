import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { HeroSection } from "@/components/home/hero-section"
import { LatestLessons } from "@/components/home/latest-lessons"
import { WeeklySchedule } from "@/components/home/weekly-schedule"
import { ExploreSections } from "@/components/home/explore-sections"
import { FeaturedBooks } from "@/components/home/featured-books"
import { LatestArticles } from "@/components/home/latest-articles"
import { NewsletterSection } from "@/components/home/newsletter-section"

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

  console.log("[v0] Fetching homepage data...")
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  console.log("[v0] Current user:", user?.id || "anonymous")
  if (userError) {
    console.log("[v0] User error:", userError.message)
  }

  const [
    { data: heroData, error: heroError },
    { data: lessons, error: lessonsError },
    { data: schedule, error: scheduleError },
    { data: books, error: booksError },
    { data: articles, error: articlesError },
  ] = await Promise.all([
    supabase.from("hero_section").select("*").single(),
    supabase
      .from("lessons")
      .select("*, categories(name)")
      .eq("publish_status", "published")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(3),
    supabase
      .from("weekly_schedule")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .limit(5),
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

  if (heroError) console.log("[v0] Hero error:", heroError.message, heroError.code)
  if (lessonsError) console.log("[v0] Lessons error:", lessonsError.message, lessonsError.code)
  if (scheduleError) console.log("[v0] Schedule error:", scheduleError.message, scheduleError.code)
  if (booksError) console.log("[v0] Books error:", booksError.message, booksError.code)
  if (articlesError) console.log("[v0] Articles error:", articlesError.message, articlesError.code)

  return (
    <>
      <HeroSection data={heroData} />

      {/* Latest Lessons & Schedule Section */}
      <section className="py-12 lg:py-16 bg-surface dark:bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <LatestLessons lessons={lessons || []} />
            <WeeklySchedule schedule={schedule || []} />
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
