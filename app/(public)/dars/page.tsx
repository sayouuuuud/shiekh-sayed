import type { Metadata } from "next"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "الدروس العلمية",
  description: "جداول الدروس العلمية الأسبوعية في الفقه والسيرة النبوية والعقيدة من الشيخ السيد مراد",
  keywords: ["دروس إسلامية", "فقه", "سيرة نبوية", "عقيدة"],
}

export default async function DarsPage() {
  const supabase = await createClient()

  // Fetch Fiqh lessons (audio only, latest 3)
  const { data: fiqhLessons } = await supabase
    .from("lessons")
    .select("*")
    .eq("lesson_type", "fiqh")
    .eq("publish_status", "published")
    .eq("is_active", true)
    .eq("is_archived", false)
    .order("created_at", { ascending: false })
    .limit(3)

  // Fetch Seerah lessons (with featured one)
  const { data: seerahLessons } = await supabase
    .from("lessons")
    .select("*")
    .eq("lesson_type", "seerah")
    .eq("publish_status", "published")
    .eq("is_active", true)
    .eq("is_archived", false)
    .order("created_at", { ascending: false })
    .limit(4)

  // Fetch General lessons
  const { data: generalLessons } = await supabase
    .from("lessons")
    .select("*")
    .eq("lesson_type", "general")
    .eq("publish_status", "published")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(6)

  const featuredSeerah = seerahLessons?.[0]
  const previousSeerah = seerahLessons?.slice(1) || []

  // Helper to format relative time
  function getRelativeTime(dateStr: string): string {
    const date = new Date(dateStr)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "اليوم"
    if (diffDays === 1) return "أمس"
    if (diffDays < 7) return `منذ ${diffDays} أيام`
    if (diffDays < 14) return "منذ أسبوع"
    if (diffDays < 21) return "منذ أسبوعين"
    if (diffDays < 30) return "منذ 3 أسابيع"
    return `منذ ${Math.floor(diffDays / 30)} شهر`
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="text-center py-16 relative">
        <span className="text-sm font-semibold text-primary/80 dark:text-primary bg-primary/5 dark:bg-primary/20 px-4 py-1.5 rounded-full inline-block mb-4">
          العلم الشرعي
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary dark:text-white mb-6 relative inline-block font-serif">
          جداول الدروس العلمية
          <div className="absolute -bottom-2 left-0 w-full h-2 bg-secondary/30 -z-10 rounded-full"></div>
        </h1>
        <p className="text-lg text-text-muted dark:text-text-subtext max-w-2xl mx-auto leading-relaxed">
          متابعة دورية للدروس العلمية الأسبوعية، حيث نغوص في بحور الفقه والسيرة النبوية لنتعلم ديننا الحنيف بفهم وسطي
          مستنير.
        </p>
      </div>

      <div className="container mx-auto px-4 lg:px-8 pb-12">
        {/* Section 1: Fiqh Lessons */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8 border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <span className="material-icons-outlined text-2xl">menu_book</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground dark:text-white font-serif">دروس الفقه</h2>
                <p className="text-sm text-text-muted">{'شرح كتاب "منهاج الطالبين" للإمام النووي'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-lg">
              <span className="material-icons-outlined text-lg">calendar_today</span>
              كل يوم اثنين
            </div>
          </div>

          {!fiqhLessons || fiqhLessons.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-xl border border-border">
              <span className="material-icons-outlined text-5xl text-text-muted mb-4">school</span>
              <p className="text-text-muted">لا توجد دروس فقه حالياً</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fiqhLessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className={`group bg-card rounded-xl shadow-sm hover:shadow-lg border transition-all duration-300 relative overflow-hidden ${
                    index === 0
                      ? "border-primary/20 dark:border-primary/20"
                      : "border-border dark:border-border hover:shadow-md"
                  }`}
                >
                  {index === 0 && (
                    <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
                      الدرس القادم
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-5xl font-black text-gray-100 dark:text-gray-800 absolute -left-2 -top-2 opacity-50 select-none">
                        {fiqhLessons.length - index}
                      </span>
                      <div
                        className={`w-10 h-10 rounded-full ${index === 0 ? "bg-green-50 dark:bg-green-900/30 text-primary dark:text-primary" : "bg-gray-50 dark:bg-gray-800 text-gray-400"} flex items-center justify-center mb-4 z-10 relative`}
                      >
                        <span className="material-icons-outlined">{index === 0 ? "play_arrow" : "done"}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-primary transition-colors">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-text-muted mb-6 line-clamp-2">
                      {lesson.description?.replace(/<[^>]*>/g, "").substring(0, 100)}...
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-xs text-text-muted">
                        <span className="material-icons-outlined text-sm">{index === 0 ? "schedule" : "event"}</span>
                        {index === 0
                          ? "7:30 مساءً"
                          : new Date(lesson.created_at).toLocaleDateString("ar-EG", {
                              day: "numeric",
                              month: "long",
                            })}
                      </div>
                      {index === 0 ? (
                        <Link
                          href={`/dars/${lesson.id}`}
                          className="text-sm font-semibold text-primary hover:underline"
                        >
                          التفاصيل
                        </Link>
                      ) : (
                        <div className="flex gap-2">
                          <button className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-text-muted hover:bg-primary hover:text-white dark:hover:bg-primary transition">
                            <span className="material-icons-outlined text-sm">download</span>
                          </button>
                          <Link
                            href={`/dars/${lesson.id}`}
                            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-text-muted hover:bg-primary hover:text-white dark:hover:bg-primary transition"
                          >
                            <span className="material-icons-outlined text-sm">play_arrow</span>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <Link
              href="/dars/fiqh"
              className="text-sm font-semibold text-text-muted hover:text-primary flex items-center justify-center gap-2 mx-auto transition"
            >
              عرض أرشيف الفقه
              <span className="material-icons-outlined text-sm transform rotate-180">arrow_right_alt</span>
            </Link>
          </div>
        </section>

        {/* Section 2: Seerah Lessons */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8 border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                <span className="material-icons-outlined text-2xl">history_edu</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground dark:text-white font-serif">دروس السيرة النبوية</h2>
                <p className="text-sm text-text-muted">وقفات تربوية مع أحداث السيرة العطرة</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 px-4 py-2 rounded-lg">
              <span className="material-icons-outlined text-lg">live_tv</span>
              بث مباشر (الأربعاء)
            </div>
          </div>

          {!seerahLessons || seerahLessons.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-xl border border-border">
              <span className="material-icons-outlined text-5xl text-text-muted mb-4">history_edu</span>
              <p className="text-text-muted">لا توجد دروس سيرة حالياً</p>
            </div>
          ) : (
            <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden flex flex-col md:flex-row">
              {/* Featured Lesson */}
              {featuredSeerah && (
                <div className="md:w-1/3 bg-primary/5 dark:bg-primary/10 p-8 flex flex-col justify-center border-l border-border relative overflow-hidden">
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 animate-pulse">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    مباشر
                  </div>
                  <div className="mb-6 mt-8">
                    <span className="text-xs font-bold text-primary dark:text-primary uppercase tracking-wider mb-2 block">
                      درس الأسبوع
                    </span>
                    <h3 className="text-3xl font-extrabold text-primary dark:text-white mb-3 leading-tight font-serif">
                      {featuredSeerah.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {featuredSeerah.description?.replace(/<[^>]*>/g, "").substring(0, 150)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 mt-auto">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <span className="material-icons-outlined text-primary">schedule</span>
                      الساعة 8:00 مساءً بتوقيت مكة
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <span className="material-icons-outlined text-primary">place</span>
                      مسجد الرحمن - مدينة نصر
                    </div>
                  </div>
                  <Link
                    href={`/dars/${featuredSeerah.id}`}
                    className="mt-8 w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-hover transition flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
                  >
                    <span className="material-icons-outlined">play_circle</span>
                    شاهد البث المباشر
                  </Link>
                </div>
              )}

              {/* Previous Lessons */}
              <div className="md:w-2/3 p-6 md:p-8">
                <h4 className="text-lg font-bold text-foreground mb-6">دروس سابقة</h4>
                <div className="space-y-4">
                  {previousSeerah.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={`/dars/${lesson.id}`}
                      className="flex items-center justify-between group p-4 rounded-xl hover:bg-muted transition border border-transparent hover:border-border cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-700 dark:text-yellow-400 group-hover:scale-110 transition-transform">
                          <span className="material-icons-outlined">play_arrow</span>
                        </div>
                        <div>
                          <h5 className="font-bold text-foreground group-hover:text-primary transition">
                            {lesson.title}
                          </h5>
                          <span className="text-xs text-text-muted">
                            {getRelativeTime(lesson.created_at)} • {lesson.duration || "45"} دقيقة
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-text-muted hover:text-primary">
                          <span className="material-icons-outlined">download</span>
                        </button>
                        <button className="text-text-muted hover:text-primary">
                          <span className="material-icons-outlined">share</span>
                        </button>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link
              href="/dars/seerah"
              className="text-sm font-semibold text-text-muted hover:text-primary flex items-center justify-center gap-2 mx-auto transition"
            >
              عرض أرشيف السيرة
              <span className="material-icons-outlined text-sm transform rotate-180">arrow_right_alt</span>
            </Link>
          </div>
        </section>

        {/* Section 3: General Lessons */}
        {generalLessons && generalLessons.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center justify-between mb-8 border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400">
                  <span className="material-icons-outlined text-2xl">school</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground dark:text-white font-serif">دروس متنوعة</h2>
                  <p className="text-sm text-text-muted">دروس عامة في مختلف العلوم الشرعية</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generalLessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/dars/${lesson.id}`}
                  className="group bg-card rounded-xl shadow-sm hover:shadow-md border border-border transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${lesson.type === "video" ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600" : "bg-blue-50 dark:bg-blue-900/20 text-blue-600"}`}
                      >
                        <span className="material-icons-outlined">
                          {lesson.type === "video" ? "play_circle" : "audiotrack"}
                        </span>
                      </span>
                      <span className="text-xs bg-muted px-2 py-1 rounded text-text-muted">
                        {lesson.type === "video" ? "مرئي" : "صوتي"}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition mb-2">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-text-muted line-clamp-2 mb-4">
                      {lesson.description?.replace(/<[^>]*>/g, "").substring(0, 80)}...
                    </p>
                    <div className="flex items-center justify-between text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <span className="material-icons-outlined text-sm">visibility</span>
                        {lesson.views_count || 0}
                      </span>
                      <span>{new Date(lesson.created_at).toLocaleDateString("ar-EG")}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
        <section className="bg-primary dark:bg-primary/40 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold text-white mb-2 font-serif">اشترك في القائمة البريدية</h2>
              <p className="text-white/80 text-sm">
                احصل على تنبيهات بالدروس الجديدة والملفات العلمية مباشرة إلى بريدك الإلكتروني.
              </p>
            </div>
            <div className="md:w-1/2 w-full">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  className="flex-1 rounded-lg border-none focus:ring-2 focus:ring-secondary px-4 py-3 text-foreground bg-white/95 dark:bg-black/40 backdrop-blur-sm"
                  placeholder="أدخل بريدك الإلكتروني"
                  type="email"
                />
                <button
                  type="submit"
                  className="bg-secondary hover:bg-secondary-hover text-white font-bold px-6 py-3 rounded-lg transition shadow-lg whitespace-nowrap"
                >
                  اشتراك الآن
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
