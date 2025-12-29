import Link from "next/link"

interface HeroData {
  hadith_arabic: string | null
  hadith_translation: string | null
  hadith_explanation: string | null
  hadith_button_text: string | null
  hadith_button_link: string | null
  book_custom_text: string | null
  book_button_text: string | null
  book_button_link: string | null
}

interface HeroSectionProps {
  data: HeroData | null
}

export function HeroSection({ data }: HeroSectionProps) {
  // Default data if none provided
  const heroData = {
    hadith_arabic: data?.hadith_arabic || "من سلك طريقاً يلتمس فيه علماً سهل الله له به طريقاً إلى الجنة",
    hadith_translation: data?.hadith_translation || "رواه مسلم",
    hadith_explanation: data?.hadith_explanation || "حديث عظيم يبين فضل طلب العلم",
    hadith_button_text: data?.hadith_button_text || "اقرأ المزيد",
    hadith_button_link: data?.hadith_button_link || "/articles",
    book_custom_text: data?.book_custom_text || "أحدث إصدارات الشيخ",
    book_button_text: data?.book_button_text || "تصفح الكتب",
    book_button_link: data?.book_button_link || "/books",
  }

  // Split hadith into parts for styling
  const hadithText = heroData.hadith_arabic?.trim() || ""
  const hadithParts = hadithText.length > 0 ? hadithText.split(" ") : ["من", "سلك", "طريقاً", "يلتمس", "فيه", "علماً"]
  const firstPart = hadithParts.slice(0, 4).join(" ")
  const highlightedWord = hadithParts[4] || ""
  const lastPart = hadithParts.slice(5).join(" ")

  return (
    <header className="relative overflow-hidden py-16 lg:py-24 bg-background">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(var(--primary) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Content */}
          <div className="flex-1 text-center lg:text-right space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-background-alt dark:bg-card px-4 py-1.5 rounded-full border border-border dark:border-border">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span className="text-sm text-secondary font-medium">حديث اليوم</span>
            </div>

            {/* Title - Display hadith */}
            <h1 className="text-4xl lg:text-6xl leading-tight font-medium text-foreground dark:text-white font-serif">
              {firstPart}{" "}
              {highlightedWord && (
                <span className="relative inline-block text-primary dark:text-primary-light">
                  {highlightedWord}
                  <svg
                    className="absolute w-full h-3 -bottom-1 right-0 text-secondary/30"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 10"
                  >
                    <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="3" />
                  </svg>
                </span>
              )}
              <br />
              {lastPart}
            </h1>

            {/* Description */}
            <p className="text-lg lg:text-xl text-text-muted dark:text-text-subtext leading-loose max-w-2xl mx-auto lg:mx-0">
              {heroData.hadith_explanation}
            </p>

            {/* Source */}
            <p className="text-sm text-secondary font-medium">{heroData.hadith_translation}</p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                href={heroData.hadith_button_link}
                className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-lg shadow-lg transition-colors text-lg font-medium"
              >
                <span className="material-icons-outlined text-xl">menu_book</span>
                {heroData.hadith_button_text}
              </Link>
              <Link
                href="/dars"
                className="flex items-center gap-2 bg-surface dark:bg-card border border-border dark:border-border text-foreground dark:text-white px-8 py-3.5 rounded-lg hover:bg-background dark:hover:bg-background-alt transition-colors shadow-sm text-lg font-medium"
              >
                <span className="material-icons-outlined text-xl">play_circle</span>
                استمع للدرس
              </Link>
            </div>
          </div>

          {/* Featured Book */}
          <div className="flex-shrink-0 relative group">
            <div className="absolute inset-0 bg-primary opacity-20 blur-2xl rounded-full transform scale-90 group-hover:scale-100 transition duration-700"></div>
            <div className="relative bg-background-alt dark:bg-card p-3 rounded-2xl shadow-xl border border-border dark:border-border">
              <div className="relative bg-primary w-[300px] h-[450px] rounded-lg shadow-inner flex flex-col items-center justify-center text-center p-8 border-[6px] border-primary-hover">
                <div className="absolute inset-4 border border-secondary opacity-30"></div>
                <div className="absolute inset-6 border border-secondary opacity-20"></div>
                <span className="text-secondary text-xs font-medium tracking-widest mb-4">
                  {heroData.book_custom_text}
                </span>
                <h2 className="text-white text-5xl font-serif font-bold mb-2">فقه</h2>
                <h2 className="text-white text-5xl font-serif font-bold mb-6">السنة</h2>
                <div className="w-12 h-0.5 bg-secondary mb-6"></div>
                <p className="text-gray-300 text-sm">دراسة منهجية</p>
              </div>
              <Link
                href={heroData.book_button_link}
                className="mt-4 flex items-center justify-center gap-2 text-primary dark:text-secondary font-medium cursor-pointer hover:underline"
              >
                <span className="material-icons-outlined text-sm">visibility</span>
                <span className="text-sm">{heroData.book_button_text}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
