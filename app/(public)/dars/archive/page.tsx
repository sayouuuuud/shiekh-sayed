import type { Metadata } from "next"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "أرشيف الدروس",
  description: "أرشيف الدروس العلمية القديمة من الشيخ السيد مراد",
}

export default async function ArchiveLessonsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; type?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()
  const currentPage = Number(params.page) || 1
  const itemsPerPage = 12
  const offset = (currentPage - 1) * itemsPerPage

  let query = supabase
    .from("lessons")
    .select("*", { count: "exact" })
    .eq("publish_status", "published")
    .eq("is_archived", true)
    .order("created_at", { ascending: false })
    .range(offset, offset + itemsPerPage - 1)

  if (params.type && params.type !== "all") {
    query = query.eq("lesson_type", params.type)
  }

  const { data: lessons, count } = await query
  const totalPages = Math.ceil((count || 0) / itemsPerPage)

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-100 dark:bg-gray-900/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full text-sm mb-4">
            الأرشيف
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-white mb-4 font-serif">أرشيف الدروس</h1>
          <p className="text-text-muted dark:text-text-subtext max-w-2xl mx-auto text-lg">
            مجموعة من الدروس القديمة المؤرشفة للرجوع إليها
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-text-muted">
          <Link href="/" className="hover:text-primary">
            الرئيسية
          </Link>
          <span>/</span>
          <Link href="/dars" className="hover:text-primary">
            الدروس
          </Link>
          <span>/</span>
          <span className="text-foreground">الأرشيف</span>
        </nav>
      </div>

      {/* Type Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap gap-2">
          <Link
            href="/dars/archive"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              !params.type || params.type === "all"
                ? "bg-gray-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200"
            }`}
          >
            الكل
          </Link>
          <Link
            href="/dars/archive?type=fiqh"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              params.type === "fiqh"
                ? "bg-blue-500 text-white"
                : "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100"
            }`}
          >
            فقه
          </Link>
          <Link
            href="/dars/archive?type=seerah"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              params.type === "seerah"
                ? "bg-orange-500 text-white"
                : "bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 hover:bg-orange-100"
            }`}
          >
            سيرة
          </Link>
          <Link
            href="/dars/archive?type=aqeedah"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              params.type === "aqeedah"
                ? "bg-purple-500 text-white"
                : "bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 hover:bg-purple-100"
            }`}
          >
            عقيدة
          </Link>
        </div>
      </div>

      {/* Lessons Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!lessons || lessons.length === 0 ? (
          <div className="text-center py-16 text-text-muted">
            <span className="material-icons-outlined text-6xl mb-4">archive</span>
            <p className="text-lg">لا توجد دروس مؤرشفة حالياً</p>
            <Link href="/dars" className="text-primary hover:underline mt-2 inline-block">
              تصفح الدروس الحالية
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <article
                key={lesson.id}
                className="bg-surface dark:bg-card rounded-xl shadow-sm hover:shadow-md transition border border-border flex flex-col opacity-80 hover:opacity-100"
              >
                <div className="relative h-48 bg-gray-100 dark:bg-gray-800 rounded-t-xl overflow-hidden flex items-center justify-center">
                  {lesson.thumbnail_path ? (
                    <img
                      src={lesson.thumbnail_path || "/placeholder.svg"}
                      alt={lesson.title}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition"
                    />
                  ) : (
                    <span className="material-icons-outlined text-6xl text-gray-300 dark:text-gray-600">archive</span>
                  )}
                  <div className="absolute top-4 right-4 bg-gray-500 text-white text-xs px-2 py-1 rounded">مؤرشف</div>
                  {lesson.lesson_type && (
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/50 text-xs px-2 py-1 rounded">
                      {lesson.lesson_type === "fiqh" && "فقه"}
                      {lesson.lesson_type === "seerah" && "سيرة"}
                      {lesson.lesson_type === "aqeedah" && "عقيدة"}
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-primary dark:text-white mb-3 line-clamp-2">{lesson.title}</h3>
                  <p className="text-text-muted text-sm mb-4 line-clamp-3">
                    {lesson.description?.replace(/<[^>]*>/g, "").substring(0, 120)}...
                  </p>
                  <div className="mt-auto pt-4 border-t border-border">
                    <Link
                      href={`/dars/${lesson.id}`}
                      className="w-full text-center bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2"
                    >
                      <span className="material-icons-outlined text-sm">visibility</span>
                      عرض الدرس
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <nav className="flex items-center gap-2">
              {currentPage > 1 && (
                <Link
                  href={`/dars/archive?page=${currentPage - 1}${params.type ? `&type=${params.type}` : ""}`}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-border hover:bg-background"
                >
                  <span className="material-icons-outlined">chevron_right</span>
                </Link>
              )}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((pageNum) => (
                <Link
                  key={pageNum}
                  href={`/dars/archive?page=${pageNum}${params.type ? `&type=${params.type}` : ""}`}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium ${
                    currentPage === pageNum ? "bg-gray-500 text-white" : "border border-border hover:bg-background"
                  }`}
                >
                  {pageNum}
                </Link>
              ))}
              {currentPage < totalPages && (
                <Link
                  href={`/dars/archive?page=${currentPage + 1}${params.type ? `&type=${params.type}` : ""}`}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-border hover:bg-background"
                >
                  <span className="material-icons-outlined">chevron_left</span>
                </Link>
              )}
            </nav>
          </div>
        )}
      </main>
    </>
  )
}
