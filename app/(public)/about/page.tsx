import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

export default async function AboutPage() {
  const supabase = await createClient()

  const { data: aboutData } = await supabase.from("about_page").select("*").single()

  // Default data if none in DB
  const about = aboutData || {
    sheikh_name: "الشيخ السيد مراد",
    sheikh_photo: "/islamic-scholar-portrait.jpg",
    biography:
      "عالم أزهري ومفكر تربوي، كرس حياته لخدمة العلم والدعوة. يتميز بأسلوبه الهادئ والرزين في طرح القضايا المعاصرة.",
    achievements: "",
    education: "",
    current_positions: "",
    social_media: {},
    stats: { students: "5000+", books: "20+", lectures: "1000+", years: "25+" },
  }

  const stats = about.stats as Record<string, string>
  const socialMedia = about.social_media as Record<string, string>

  return (
    <main className="min-h-screen py-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle,var(--primary)_1px,transparent_1px)] bg-[length:20px_20px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-muted dark:text-text-subtext mb-8">
          <Link href="/" className="hover:text-primary dark:hover:text-secondary">
            الرئيسية
          </Link>
          <span className="material-icons-outlined text-xs rtl-flip">chevron_left</span>
          <span className="text-primary dark:text-secondary font-medium">من هو الشيخ</span>
        </div>

        {/* Hero Card */}
        <div className="bg-surface dark:bg-card rounded-2xl shadow-sm border border-border dark:border-border p-8 lg:p-12 mb-12 flex flex-col lg:flex-row items-center lg:items-start gap-12">
          <div className="w-full lg:w-1/3 flex justify-center lg:justify-start relative group">
            <div className="absolute inset-0 bg-secondary blur-2xl opacity-20 rounded-full group-hover:opacity-30 transition-opacity"></div>
            <div className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full lg:rounded-2xl overflow-hidden border-4 border-surface dark:border-border shadow-xl">
              <img
                src={about.sheikh_photo || "/placeholder.svg?height=400&width=400&query=islamic scholar"}
                alt={`صورة ${about.sheikh_name}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="w-full lg:w-2/3 text-center lg:text-right">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary dark:text-secondary dark:bg-secondary/10 text-sm font-medium rounded-full mb-4">
              سيرة عطرة
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground dark:text-white mb-6 leading-tight font-serif">
              {about.sheikh_name} <br />
              <span className="text-2xl lg:text-3xl font-normal text-text-muted dark:text-text-subtext mt-2 block">
                عالم أزهري ومصلح اجتماعي
              </span>
            </h1>
            <p className="text-lg text-text-muted dark:text-text-subtext leading-relaxed mb-8 max-w-3xl font-light">
              {about.biography}
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {about.education && (
                <div className="flex items-center gap-2 bg-background dark:bg-background-alt px-4 py-2 rounded-lg border border-border dark:border-border">
                  <span className="material-icons-outlined text-secondary">school</span>
                  <span className="text-sm font-medium">دكتوراه في الفقه المقارن</span>
                </div>
              )}
              <div className="flex items-center gap-2 bg-background dark:bg-background-alt px-4 py-2 rounded-lg border border-border dark:border-border">
                <span className="material-icons-outlined text-secondary">location_on</span>
                <span className="text-sm font-medium">القاهرة، مصر</span>
              </div>
              <div className="flex items-center gap-2 bg-background dark:bg-background-alt px-4 py-2 rounded-lg border border-border dark:border-border">
                <span className="material-icons-outlined text-secondary">mic</span>
                <span className="text-sm font-medium">خطيب وإمام</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            {/* Education Section */}
            {about.education && (
              <div className="bg-surface dark:bg-card rounded-xl shadow-sm border border-border dark:border-border p-8 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                    <span className="material-icons-outlined text-3xl">history_edu</span>
                  </div>
                  <h2 className="text-2xl font-bold text-foreground dark:text-white font-serif">المسيرة العلمية</h2>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none text-text-muted dark:text-text-subtext font-light whitespace-pre-line">
                  {about.education}
                </div>
              </div>
            )}

            {/* Achievements Section */}
            {about.achievements && (
              <div className="bg-surface dark:bg-card rounded-xl shadow-sm border border-border dark:border-border p-8 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg text-primary dark:text-green-400">
                    <span className="material-icons-outlined text-3xl">emoji_events</span>
                  </div>
                  <h2 className="text-2xl font-bold text-foreground dark:text-white font-serif">الإنجازات</h2>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none text-text-muted dark:text-text-subtext font-light whitespace-pre-line">
                  {about.achievements}
                </div>
              </div>
            )}

            {/* Stats Card */}
            <div className="bg-primary rounded-xl shadow-lg p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-secondary opacity-10 rounded-full translate-x-1/2 translate-y-1/2"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-6 font-serif">أبرز المؤلفات والأنشطة</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/10 text-center">
                    <span className="block text-4xl font-bold text-secondary mb-2">{stats?.students || "5000+"}</span>
                    <span className="text-white/90 text-sm">طالب علم</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/10 text-center">
                    <span className="block text-4xl font-bold text-secondary mb-2">{stats?.books || "20+"}</span>
                    <span className="text-white/90 text-sm">مؤلفاً وكتاباً</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/10 text-center">
                    <span className="block text-4xl font-bold text-secondary mb-2">{stats?.lectures || "1000+"}</span>
                    <span className="text-white/90 text-sm">محاضرة ودرس</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/10 text-center">
                    <span className="block text-4xl font-bold text-secondary mb-2">{stats?.years || "25+"}</span>
                    <span className="text-white/90 text-sm">سنة في الدعوة</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-surface dark:bg-card rounded-xl shadow-sm border border-border dark:border-border p-6 sticky top-24">
              <h3 className="text-lg font-bold border-r-4 border-secondary pr-3 mb-6 dark:text-white">
                تواصل مع الشيخ
              </h3>
              <div className="space-y-4">
                {socialMedia?.youtube && (
                  <a
                    href={socialMedia.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-background dark:hover:bg-background-alt transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                      <span className="material-icons-outlined text-sm">smart_display</span>
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-foreground dark:text-white">يوتيوب</span>
                      <span className="text-xs text-text-muted dark:text-text-subtext">شاهد الدروس والمرئيات</span>
                    </div>
                  </a>
                )}
                {socialMedia?.telegram && (
                  <a
                    href={socialMedia.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-background dark:hover:bg-background-alt transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center text-sky-600 dark:text-sky-400">
                      <span className="material-icons-outlined text-sm">send</span>
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-foreground dark:text-white">تيليجرام</span>
                      <span className="text-xs text-text-muted dark:text-text-subtext">اشترك في القناة</span>
                    </div>
                  </a>
                )}
                {socialMedia?.facebook && (
                  <a
                    href={socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-background dark:hover:bg-background-alt transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <span className="material-icons-outlined text-sm">facebook</span>
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-foreground dark:text-white">فيسبوك</span>
                      <span className="text-xs text-text-muted dark:text-text-subtext">تابع الصفحة الرسمية</span>
                    </div>
                  </a>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-border dark:border-border">
                <Link
                  href="/contact"
                  className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-2.5 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <span className="material-icons-outlined text-sm">mail</span>
                  راسلنا
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div className="mt-16 text-center max-w-4xl mx-auto">
          <span className="material-icons-outlined text-5xl text-secondary opacity-50 mb-4">format_quote</span>
          <blockquote className="text-2xl md:text-3xl font-bold text-primary dark:text-white leading-relaxed font-serif">
            &quot;إنما العلم خشية، وليس العلم بكثرة الرواية، وإنما العالم من يخشى الله تعالى في سره وعلانيته.&quot;
          </blockquote>
          <cite className="block mt-4 text-text-muted dark:text-text-subtext not-italic font-medium">
            - من أقوال الشيخ
          </cite>
        </div>
      </div>
    </main>
  )
}
