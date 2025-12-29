import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

const quickActions = [
  { label: "إضافة خطبة", href: "/admin/khutba", icon: "add_circle", color: "text-blue-500" },
  { label: "إضافة درس", href: "/admin/dars", icon: "add_circle", color: "text-green-500" },
  { label: "إضافة مقال", href: "/admin/articles", icon: "add_circle", color: "text-amber-500" },
  { label: "إضافة كتاب", href: "/admin/books", icon: "add_circle", color: "text-purple-500" },
]

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch real stats from database
  const [
    { count: sermonsCount },
    { count: lessonsCount },
    { count: articlesCount },
    { count: booksCount },
    { count: subscribersCount },
    { data: recentSermons },
    { data: recentLessons },
    { data: recentArticles },
  ] = await Promise.all([
    supabase.from("sermons").select("*", { count: "exact", head: true }),
    supabase.from("lessons").select("*", { count: "exact", head: true }),
    supabase.from("articles").select("*", { count: "exact", head: true }),
    supabase.from("books").select("*", { count: "exact", head: true }),
    supabase.from("subscribers").select("*", { count: "exact", head: true }),
    supabase
      .from("sermons")
      .select("id, title, publish_status, created_at")
      .order("created_at", { ascending: false })
      .limit(2),
    supabase
      .from("lessons")
      .select("id, title, publish_status, created_at")
      .order("created_at", { ascending: false })
      .limit(2),
    supabase
      .from("articles")
      .select("id, title, publish_status, created_at")
      .order("created_at", { ascending: false })
      .limit(2),
  ])

  const stats = [
    {
      label: "الخطب",
      value: sermonsCount?.toString() || "0",
      icon: "mic",
      color: "bg-blue-500",
      href: "/admin/khutba",
    },
    {
      label: "الدروس",
      value: lessonsCount?.toString() || "0",
      icon: "school",
      color: "bg-green-500",
      href: "/admin/dars",
    },
    {
      label: "المقالات",
      value: articlesCount?.toString() || "0",
      icon: "article",
      color: "bg-amber-500",
      href: "/admin/articles",
    },
    {
      label: "الكتب",
      value: booksCount?.toString() || "0",
      icon: "menu_book",
      color: "bg-purple-500",
      href: "/admin/books",
    },
    {
      label: "المشتركين",
      value: subscribersCount?.toString() || "0",
      icon: "group",
      color: "bg-teal-500",
      href: "/admin/subscribers",
    },
  ]

  // Combine recent items
  const recentItems = [
    ...(recentSermons || []).map((s) => ({ ...s, type: "خطبة", icon: "mic" })),
    ...(recentLessons || []).map((l) => ({ ...l, type: "درس", icon: "school" })),
    ...(recentArticles || []).map((a) => ({ ...a, type: "مقال", icon: "article" })),
  ]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Welcome Section */}
      <div className="bg-gradient-to-l from-primary to-primary-hover rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">مرحباً بك في لوحة التحكم</h2>
          <p className="text-green-100 text-sm mb-4">إدارة محتوى موقع الشيخ السيد مراد بكل سهولة</p>
          <div className="flex flex-wrap gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition-colors"
              >
                <span className="material-icons-outlined text-lg">{action.icon}</span>
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-surface dark:bg-card rounded-xl p-5 border border-border dark:border-border hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center text-white`}>
                <span className="material-icons-outlined text-xl">{stat.icon}</span>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-foreground dark:text-white mb-1">{stat.value}</h3>
            <p className="text-sm text-text-muted dark:text-text-subtext">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Items */}
        <div className="lg:col-span-2 bg-surface dark:bg-card rounded-xl border border-border dark:border-border">
          <div className="px-6 py-4 border-b border-border dark:border-border flex items-center justify-between">
            <h3 className="font-bold text-foreground dark:text-white">آخر المحتويات</h3>
          </div>
          <div className="divide-y divide-border dark:divide-border">
            {recentItems.length === 0 ? (
              <div className="px-6 py-8 text-center text-text-muted dark:text-text-subtext">لا توجد محتويات بعد</div>
            ) : (
              recentItems.map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className="px-6 py-4 flex items-center justify-between hover:bg-background dark:hover:bg-background-alt transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-background dark:bg-background-alt flex items-center justify-center">
                      <span className="material-icons-outlined text-text-muted dark:text-text-subtext">
                        {item.icon}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground dark:text-white text-sm line-clamp-1">{item.title}</h4>
                      <p className="text-xs text-text-muted dark:text-text-subtext">
                        {item.type} • {new Date(item.created_at).toLocaleDateString("ar-EG")}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      item.publish_status === "published"
                        ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                        : "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
                    }`}
                  >
                    {item.publish_status === "published" ? "منشور" : "مسودة"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <div className="bg-surface dark:bg-card rounded-xl border border-border dark:border-border p-6">
            <h3 className="font-bold text-foreground dark:text-white mb-4">روابط سريعة</h3>
            <div className="space-y-2">
              {[
                { label: "إدارة الكتب", href: "/admin/books", icon: "menu_book" },
                { label: "إدارة الفيديوهات", href: "/admin/media", icon: "videocam" },
                { label: "إعدادات الموقع", href: "/admin/settings", icon: "settings" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 p-2 rounded-lg text-text-muted dark:text-text-subtext hover:text-foreground dark:hover:text-white hover:bg-background dark:hover:bg-background-alt transition-colors"
                >
                  <span className="material-icons-outlined text-lg">{link.icon}</span>
                  <span className="text-sm">{link.label}</span>
                  <span className="material-icons-outlined text-sm mr-auto rtl-flip">chevron_left</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
