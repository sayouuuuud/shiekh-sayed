import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

export const metadata = {
  title: "دروس الفقه | الشيخ السيد مراد",
  description: "أرشيف دروس الفقه الإسلامي للشيخ السيد مراد",
}

export default async function FiqhLessonsPage() {
  const supabase = await createClient()

  // Fetch fiqh lessons
  const { data: lessons } = await supabase
    .from("lessons")
    .select("*")
    .eq("publish_status", "published")
    .or("title.ilike.%فقه%,description.ilike.%فقه%")
    .order("created_at", { ascending: false })

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-text-muted dark:text-text-subtext mb-8">
        <Link href="/" className="hover:text-primary">
          الرئيسية
        </Link>
        <span className="material-icons-outlined text-xs mx-2">chevron_left</span>
        <Link href="/dars" className="hover:text-primary">
          الدروس
        </Link>
        <span className="material-icons-outlined text-xs mx-2">chevron_left</span>
        <span className="text-primary font-medium">دروس الفقه</span>
      </nav>

      {/* Header */}
      <div className="text-center mb-16 relative">
        <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-4">
          <span className="material-icons-outlined text-3xl">menu_book</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary dark:text-white mb-6 font-serif">دروس الفقه</h1>
        <p className="text-lg text-text-muted dark:text-text-subtext max-w-2xl mx-auto leading-relaxed">
          شرح مفصل لأحكام الفقه الإسلامي في العبادات والمعاملات، بأسلوب ميسر وواضح.
        </p>
      </div>

      {/* Lessons Grid */}
      {!lessons || lessons.length === 0 ? (
        <div className="text-center py-16 text-text-muted dark:text-text-subtext">
          <span className="material-icons-outlined text-6xl mb-4">school</span>
          <p className="text-lg">لا توجد دروس فقه منشورة حالياً</p>
          <Link href="/dars" className="text-primary hover:underline mt-4 inline-block">
            العودة لجميع الدروس
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <Link
              key={lesson.id}
              href={`/dars/${lesson.id}`}
              className="group bg-surface dark:bg-card rounded-xl shadow-sm hover:shadow-lg border border-border dark:border-border transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                  <span className="material-icons-outlined">
                    {lesson.type === "video" ? "play_circle" : "headphones"}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground dark:text-foreground mb-2 group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-sm text-text-muted dark:text-text-subtext mb-6 line-clamp-2">{lesson.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-border dark:border-border">
                  <div className="flex items-center gap-2 text-xs text-text-muted dark:text-text-subtext">
                    <span className="material-icons-outlined text-sm">event</span>
                    {new Date(lesson.created_at).toLocaleDateString("ar-EG")}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <span className="material-icons-outlined text-sm">visibility</span>
                    {lesson.views_count || 0}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
