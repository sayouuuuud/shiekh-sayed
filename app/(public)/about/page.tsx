import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import {
  GraduationCap,
  MapPin,
  Mic,
  Trophy,
  BookOpen,
  Youtube,
  Send,
  Facebook,
  MessageCircle,
  ChevronLeft,
  Mail,
  Twitter,
  Instagram,
} from "lucide-react"

export const revalidate = 60

export default async function AboutPage() {
  const supabase = await createClient()

  const { data: aboutData, error: aboutError } = await supabase.from("about_page").select("*").limit(1).maybeSingle()

  let socialLinks: Record<string, string> = {}

  // First try to get from about_page social_links field
  if (aboutData?.social_links && Array.isArray(aboutData.social_links)) {
    aboutData.social_links.forEach((link: { platform: string; url: string }) => {
      if (link.platform && link.url) {
        socialLinks[link.platform.toLowerCase()] = link.url
      }
    })
  }

  if (Object.keys(socialLinks).length === 0) {
    try {
      const { data: linksData } = await supabase.from("social_links").select("*")

      if (linksData) {
        // Filter active items in JavaScript if is_active exists
        linksData
          .filter((link: any) => link.is_active !== false)
          .forEach((link: any) => {
            socialLinks[link.platform?.toLowerCase()] = link.url
          })
      }
    } catch {
      // Fallback to about_page social_media if social_links table doesn't exist
      socialLinks = (aboutData?.social_media as Record<string, string>) || {}
    }
  }

  const about = {
    sheikh_name: aboutData?.sheikh_name || "الشيخ السيد مراد",
    sheikh_photo: aboutData?.image_path || aboutData?.sheikh_photo || "/islamic-scholar-portrait.jpg",
    biography:
      aboutData?.content ||
      aboutData?.biography ||
      "عالم أزهري ومفكر تربوي، كرس حياته لخدمة العلم والدعوة. يتميز بأسلوبه الهادئ والرزين في طرح القضايا المعاصرة.",
    achievements: aboutData?.achievements || "",
    education: aboutData?.education || "",
    current_positions: aboutData?.positions || aboutData?.current_positions || "",
    location: aboutData?.location || "القاهرة، مصر",
    title: aboutData?.title || "عالم أزهري ومصلح اجتماعي",
    position: aboutData?.position || "خطيب وإمام",
    quote_text:
      aboutData?.quote ||
      aboutData?.quote_text ||
      "إنما العلم خشية، وليس العلم بكثرة الرواية، وإنما العالم من يخشى الله تعالى في سره وعلانيته.",
    quote_author: aboutData?.quote_author || "- من أقوال الشيخ",
    stats: (aboutData?.stats as Record<string, string>) || {
      students: "5000+",
      books: "20+",
      lectures: "1000+",
      years: "25+",
    },
  }

  const stats = about.stats

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "youtube":
        return <Youtube className="h-5 w-5" />
      case "telegram":
        return <Send className="h-5 w-5" />
      case "facebook":
        return <Facebook className="h-5 w-5" />
      case "twitter":
        return <Twitter className="h-5 w-5" />
      case "instagram":
        return <Instagram className="h-5 w-5" />
      case "whatsapp":
        return <MessageCircle className="h-5 w-5" />
      default:
        return <Mail className="h-5 w-5" />
    }
  }

  const getSocialColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "youtube":
        return "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
      case "telegram":
        return "bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400"
      case "facebook":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
      case "twitter":
        return "bg-sky-100 dark:bg-sky-900/30 text-sky-500 dark:text-sky-400"
      case "instagram":
        return "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400"
      case "whatsapp":
        return "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400"
    }
  }

  const getSocialLabel = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "youtube":
        return { name: "يوتيوب", desc: "شاهد الدروس والمرئيات" }
      case "telegram":
        return { name: "تيليجرام", desc: "اشترك في القناة" }
      case "facebook":
        return { name: "فيسبوك", desc: "تابع الصفحة الرسمية" }
      case "twitter":
        return { name: "تويتر", desc: "تابعنا على تويتر" }
      case "instagram":
        return { name: "إنستجرام", desc: "تابعنا على إنستجرام" }
      case "whatsapp":
        return { name: "واتساب", desc: "تواصل مباشر" }
      default:
        return { name: platform, desc: "تابعنا" }
    }
  }

  return (
    <main className="min-h-screen py-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle,var(--primary)_1px,transparent_1px)] bg-[length:20px_20px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-muted dark:text-text-subtext mb-8">
          <Link href="/" className="hover:text-primary dark:hover:text-secondary">
            الرئيسية
          </Link>
          <ChevronLeft className="h-4 w-4 rtl-flip" />
          <span className="text-primary dark:text-secondary font-medium">من هو الشيخ</span>
        </div>

        {/* Hero Card - Now properly displays data from database */}
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
                {about.title}
              </span>
            </h1>
            <div
              className="text-lg text-text-muted dark:text-text-subtext leading-relaxed mb-8 max-w-3xl font-light prose prose-lg dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: about.biography }}
            />
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {about.education && (
                <div className="flex items-center gap-2 bg-background dark:bg-background-alt px-4 py-2 rounded-lg border border-border dark:border-border">
                  <GraduationCap className="h-5 w-5 text-secondary" />
                  <span className="text-sm font-medium">{about.education.replace(/<[^>]*>/g, "").split("\n")[0]}</span>
                </div>
              )}
              <div className="flex items-center gap-2 bg-background dark:bg-background-alt px-4 py-2 rounded-lg border border-border dark:border-border">
                <MapPin className="h-5 w-5 text-secondary" />
                <span className="text-sm font-medium">{about.location}</span>
              </div>
              <div className="flex items-center gap-2 bg-background dark:bg-background-alt px-4 py-2 rounded-lg border border-border dark:border-border">
                <Mic className="h-5 w-5 text-secondary" />
                <span className="text-sm font-medium">{about.position}</span>
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
                    <BookOpen className="h-8 w-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground dark:text-white font-serif">المسيرة العلمية</h2>
                </div>
                <div
                  className="prose prose-lg dark:prose-invert max-w-none text-text-muted dark:text-text-subtext font-light"
                  dangerouslySetInnerHTML={{ __html: about.education }}
                />
              </div>
            )}

            {/* Achievements Section */}
            {about.achievements && (
              <div className="bg-surface dark:bg-card rounded-xl shadow-sm border border-border dark:border-border p-8 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg text-primary dark:text-green-400">
                    <Trophy className="h-8 w-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground dark:text-white font-serif">الإنجازات</h2>
                </div>
                <div
                  className="prose prose-lg dark:prose-invert max-w-none text-text-muted dark:text-text-subtext font-light"
                  dangerouslySetInnerHTML={{ __html: about.achievements }}
                />
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
                {Object.entries(socialLinks).map(([platform, url]) => {
                  if (!url) return null
                  const label = getSocialLabel(platform)
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-background dark:hover:bg-background-alt transition-colors group"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${getSocialColor(platform)}`}
                      >
                        {getSocialIcon(platform)}
                      </div>
                      <div>
                        <span className="block text-sm font-bold text-foreground dark:text-white">{label.name}</span>
                        <span className="text-xs text-text-muted dark:text-text-subtext">{label.desc}</span>
                      </div>
                    </a>
                  )
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-border dark:border-border">
                <Link
                  href="/contact"
                  className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-2.5 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  راسلنا
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quote Section - Now properly displays quote from database */}
        <div className="mt-16 text-center max-w-4xl mx-auto">
          <span className="text-5xl text-secondary opacity-50 mb-4 block">"</span>
          <blockquote className="text-2xl md:text-3xl font-bold text-primary dark:text-white leading-relaxed font-serif">
            &quot;{about.quote_text}&quot;
          </blockquote>
          <cite className="block mt-4 text-text-muted dark:text-text-subtext not-italic font-medium">
            {about.quote_author}
          </cite>
        </div>
      </div>
    </main>
  )
}
