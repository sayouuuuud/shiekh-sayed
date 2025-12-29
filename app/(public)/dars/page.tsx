import type { Metadata } from "next"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "الدروس العلمية",
  description: "جداول الدروس العلمية الأسبوعية في الفقه والسيرة النبوية والعقيدة من الشيخ السيد مراد",
  keywords: ["دروس إسلامية", "فقه", "سيرة نبوية", "عقيدة"],
  openGraph: {
    title: "الدروس العلمية",
    description: "دروس علمية متخصصة في الفقه والسيرة والعقيدة",
    type: "website",
  },
}

export default async function DarsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; type?: string; category?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()
  const currentPage = Number(params.page) || 1
  const itemsPerPage = 12
  const offset = (currentPage - 1) * itemsPerPage

  // Fetch categories for lessons
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .eq("type", "lesson")
    .order("name", { ascending: true })

  // Build query
  let query = supabase
    .from("lessons")
    .select("*", { count: "exact" })
    .eq("publish_status", "published")
    .order("created_at", { ascending: false })
    .range(offset, offset + itemsPerPage - 1)

  if (params.type && params.type !== "all") {
    query = query.eq("type", params.type)
  }

  if (params.category && params.category !== "الكل") {
    query = query.eq("category", params.category)
  }

  const { data: lessons, count } = await query
  const totalPages = Math.ceil((count || 0) / itemsPerPage)

  // Helper to get YouTube thumbnail
  function getYoutubeThumbnail(url: string): string | null {
    if (!url) return null
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)
    if (match) {
      return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
    }
    return null
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-accent-light dark:bg-card py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-surface dark:bg-card text-secondary px-3 py-1 rounded-full text-sm mb-4 border border-secondary/20 shadow-sm">
            مكتبة العلم
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-white mb-4 font-serif">
            الدروس العلمية
          </h1>
          <p className="text-text-muted dark:text-text-subtext max-w-2xl mx-auto text-lg leading-relaxed">
            دروس علمية متخصصة في الفقه والسيرة النبوية والعقيدة، متاحة للاستماع والمشاهدة في أي وقت.
          </p>
        </div>
      </section>

      {/* Filters */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-surface dark:bg-card p-4 rounded-xl shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4 border border-border dark:border-border">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="material-icons-outlined text-primary dark:text-secondary">filter_list</span>
            <span className="font-bold text-foreground dark:text-foreground">تصفية الدروس:</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Type Filter */}
            <Link
              href="/dars"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                !params.type || params.type === "all"
                  ? "bg-primary text-white"
                  : "bg-background dark:bg-background-alt border border-border text-foreground hover:border-primary"
              }`}
            >
              الكل
            </Link>
            <Link
              href="/dars?type=video"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1 ${
                params.type === "video"
                  ? "bg-primary text-white"
                  : "bg-background dark:bg-background-alt border border-border text-foreground hover:border-primary"
              }`}
            >
              <span className="material-icons-outlined text-sm">play_circle</span>
              مرئي
            </Link>
            <Link
              href="/dars?type=audio"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1 ${
                params.type === "audio"
                  ? "bg-primary text-white"
                  : "bg-background dark:bg-background-alt border border border-border text-foreground hover:border-primary"
              }`}
            >
              <span className="material-icons-outlined text-sm">audiotrack</span>
              صوتي
            </Link>
          </div>
        </div>

        {/* Category Pills */}
        {categories && categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <Link
              href={`/dars${params.type ? `?type=${params.type}` : ""}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                !params.category || params.category === "الكل"
                  ? "bg-secondary text-white"
                  : "bg-secondary/10 text-secondary hover:bg-secondary/20"
              }`}
            >
              جميع التصنيفات
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/dars?category=${encodeURIComponent(cat.name)}${params.type ? `&type=${params.type}` : ""}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  params.category === cat.name
                    ? "bg-secondary text-white"
                    : "bg-secondary/10 text-secondary hover:bg-secondary/20"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        {/* Lessons Grid */}
        {!lessons || lessons.length === 0 ? (
          <div className="text-center py-16 text-text-muted dark:text-text-subtext">
            <span className="material-icons-outlined text-6xl mb-4">school</span>
            <p className="text-lg">لا توجد دروس منشورة حالياً</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => {
              const thumbnail =
                lesson.thumbnail_path ||
                (lesson.media_source === "youtube" ? getYoutubeThumbnail(lesson.media_path_or_url) : null)

              return (
                <article
                  key={lesson.id}
                  className="bg-surface dark:bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-border dark:border-border flex flex-col h-full group"
                >
                  <div className="relative h-48 bg-primary/5 dark:bg-primary/20 rounded-t-xl overflow-hidden">
                    {thumbnail ? (
                      <img
                        src={thumbnail || "/placeholder.svg"}
                        alt={lesson.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-icons-outlined text-6xl text-primary/30 dark:text-primary/50 group-hover:scale-110 transition-transform duration-500">
                          {lesson.type === "video" ? "play_circle" : "audiotrack"}
                        </span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-surface dark:bg-card text-xs font-bold px-2 py-1 rounded shadow-sm">
                        {lesson.type === "video" ? "مرئي" : "صوتي"}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-surface dark:bg-card text-xs font-bold px-2 py-1 rounded shadow-sm text-text-muted dark:text-text-subtext">
                      {new Date(lesson.created_at).toLocaleDateString("ar-EG")}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    {lesson.category && (
                      <div className="flex items-center gap-2 text-xs text-secondary font-medium mb-3">
                        <span className="material-icons-outlined text-sm">label</span>
                        <span>{lesson.category}</span>
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-primary dark:text-white mb-3 line-clamp-2 hover:text-secondary transition-colors cursor-pointer">
                      {lesson.title}
                    </h3>
                    <p className="text-text-muted dark:text-text-subtext text-sm leading-relaxed mb-6 line-clamp-3">
                      {lesson.description?.replace(/<[^>]*>/g, "").substring(0, 150)}...
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-border dark:border-border">
                      <Link
                        href={`/dars/${lesson.id}`}
                        className="flex-1 text-center bg-primary hover:bg-primary-hover text-white py-2 px-3 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2"
                      >
                        <span className="material-icons-outlined text-sm">
                          {lesson.type === "video" ? "play_circle" : "headphones"}
                        </span>
                        {lesson.type === "video" ? "شاهد الدرس" : "استمع للدرس"}
                      </Link>
                      <div className="flex items-center gap-1 text-xs text-text-muted">
                        <span className="material-icons-outlined text-sm">visibility</span>
                        {lesson.views_count || 0}
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <nav className="flex items-center gap-2">
              {currentPage > 1 && (
                <Link
                  href={`/dars?page=${currentPage - 1}${params.type ? `&type=${params.type}` : ""}${params.category ? `&category=${params.category}` : ""}`}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-border dark:border-border text-text-muted dark:text-text-subtext hover:bg-background dark:hover:bg-background-alt"
                >
                  <span className="material-icons-outlined text-lg">chevron_right</span>
                </Link>
              )}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }
                return (
                  <Link
                    key={pageNum}
                    href={`/dars?page=${pageNum}${params.type ? `&type=${params.type}` : ""}${params.category ? `&category=${params.category}` : ""}`}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium ${
                      currentPage === pageNum
                        ? "bg-primary text-white"
                        : "border border-border dark:border-border text-text-muted dark:text-text-subtext hover:bg-background dark:hover:bg-background-alt"
                    }`}
                  >
                    {pageNum}
                  </Link>
                )
              })}
              {currentPage < totalPages && (
                <Link
                  href={`/dars?page=${currentPage + 1}${params.type ? `&type=${params.type}` : ""}${params.category ? `&category=${params.category}` : ""}`}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-border dark:border-border text-text-muted dark:text-text-subtext hover:bg-background dark:hover:bg-background-alt"
                >
                  <span className="material-icons-outlined text-lg">chevron_left</span>
                </Link>
              )}
            </nav>
          </div>
        )}
      </main>
    </>
  )
}
