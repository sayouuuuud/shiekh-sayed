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
    hadith_explanation:
      data?.hadith_explanation ||
      "حديث عظيم يبين فضل طلب العلم والسعي في تحصيله، وأن الله يسهل لطالب العلم طريقه إلى الجنة",
    hadith_button_text: data?.hadith_button_text || "اقرأ المزيد",
    hadith_button_link: data?.hadith_button_link || "/articles",
    book_custom_text: data?.book_custom_text || "أحدث إصدارات الشيخ",
    book_button_text: data?.book_button_text || "تصفح الكتب",
    book_button_link: data?.book_button_link || "/books",
  }

  // Split hadith into parts for styling
  const hadithText = heroData.hadith_arabic?.trim() || ""
  const hadithWords = hadithText.split(" ")

  const midPoint = Math.ceil(hadithWords.length / 2)
  const firstLine = hadithWords.slice(0, midPoint).join(" ")
  const secondLine = hadithWords.slice(midPoint).join(" ")

  // Find highlighted word (5th word or middle word)
  const highlightIndex = Math.min(4, hadithWords.length - 1)
  const highlightedWord = hadithWords[highlightIndex] || ""

  return (
    <header className="relative overflow-hidden py-16 lg:py-24 bg-background">
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none dark:opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(var(--primary) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Content */}
          <div className="flex-1 text-center lg:text-right space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-surface dark:bg-card px-4 py-2 rounded-full border border-border shadow-sm">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="text-sm text-secondary font-medium">حديث اليوم</span>
            </div>

            {/* Title - Display hadith */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight font-medium text-foreground dark:text-white font-serif">
              <span className="block mb-2">{firstLine}</span>
              <span className="block relative">
                {secondLine.split(" ").map((word, index) => {
                  const isHighlighted = word === highlightedWord && index === 0
                  if (isHighlighted) {
                    return (
                      <span key={index} className="relative inline-block text-primary dark:text-primary mx-1">
                        {word}
                        <svg
                          className="absolute w-full h-3 -bottom-1 right-0 text-secondary/40"
                          preserveAspectRatio="none"
                          viewBox="0 0 100 10"
                        >
                          <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="3" />
                        </svg>
                      </span>
                    )
                  }
                  return <span key={index}> {word}</span>
                })}
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg lg:text-xl text-text-muted dark:text-text-subtext leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {heroData.hadith_explanation}
            </p>

            {/* Source */}
            <p className="text-sm text-secondary font-medium flex items-center justify-center lg:justify-start gap-2">
              <span className="material-icons-outlined text-sm">format_quote</span>
              {heroData.hadith_translation}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                href={heroData.hadith_button_link}
                className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all text-lg font-medium group"
              >
                <span className="material-icons-outlined text-xl group-hover:scale-110 transition-transform">
                  menu_book
                </span>
                {heroData.hadith_button_text}
              </Link>
              <Link
                href="/dars"
                className="flex items-center gap-2 bg-surface dark:bg-card border border-border text-foreground dark:text-white px-8 py-3.5 rounded-xl hover:bg-muted dark:hover:bg-background-alt transition-all shadow-sm hover:shadow-md text-lg font-medium group"
              >
                <span className="material-icons-outlined text-xl group-hover:scale-110 transition-transform">
                  play_circle
                </span>
                استمع للدرس
              </Link>
            </div>
          </div>

          {/* Featured Book */}
          <div className="flex-shrink-0 relative group">
            <div className="absolute inset-0 bg-primary opacity-20 blur-3xl rounded-full transform scale-90 group-hover:scale-100 transition duration-700"></div>
            <div className="relative bg-surface dark:bg-card p-4 rounded-2xl shadow-xl border border-border">
              {/* Book Cover */}
              <div className="relative bg-gradient-to-br from-primary to-primary-hover w-[280px] sm:w-[320px] h-[400px] sm:h-[460px] rounded-xl shadow-inner flex flex-col items-center justify-center text-center p-8 border-[8px] border-primary-hover/50">
                {/* Decorative borders */}
                <div className="absolute inset-4 border border-secondary/30 rounded-lg pointer-events-none"></div>
                <div className="absolute inset-6 border border-secondary/20 rounded pointer-events-none"></div>

                {/* Content */}
                <span className="text-secondary text-xs font-medium tracking-widest mb-4 uppercase">
                  {heroData.book_custom_text}
                </span>
                <h2 className="text-white text-4xl sm:text-5xl font-serif font-bold mb-1">فقه</h2>
                <h2 className="text-white text-4xl sm:text-5xl font-serif font-bold mb-6">السنة</h2>
                <div className="w-16 h-0.5 bg-secondary mb-6"></div>
                <p className="text-gray-300/80 text-sm">دراسة منهجية</p>

                {/* Spine effect */}
                <div className="absolute left-0 top-4 bottom-4 w-4 bg-gradient-to-r from-black/20 to-transparent rounded-l-lg"></div>
              </div>

              {/* View Book Link */}
              <Link
                href={heroData.book_button_link}
                className="mt-4 flex items-center justify-center gap-2 text-primary dark:text-secondary font-medium cursor-pointer hover:underline py-2 group/link"
              >
                <span className="material-icons-outlined text-sm group-hover/link:scale-110 transition-transform">
                  visibility
                </span>
                <span className="text-sm">{heroData.book_button_text}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
