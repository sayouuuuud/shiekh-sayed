import Link from "next/link"

const sections = [
  {
    title: "الدروس العلمية",
    description: "سلاسل علمية متكاملة في الفقه والعقيدة والسيرة.",
    icon: "school",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    iconColor: "text-yellow-700 dark:text-yellow-300",
    href: "/dars",
  },
  {
    title: "المقالات والبحوث",
    description: "كتابات دورية تناقش القضايا المعاصرة برؤية شرعية.",
    icon: "article",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    iconColor: "text-blue-700 dark:text-blue-300",
    href: "/articles",
  },
  {
    title: "المكتبة المقروءة",
    description: "مؤلفات الشيخ وكتب مختارة للتحميل بصيغة PDF.",
    icon: "library_books",
    bgColor: "bg-gray-100 dark:bg-gray-700",
    iconColor: "text-gray-800 dark:text-gray-200",
    href: "/books",
  },
  {
    title: "المرئيات",
    description: "مقاطع مرئية قصيرة ومحاضرات مصورة بجودة عالية.",
    icon: "play_circle_filled",
    bgColor: "bg-red-50 dark:bg-red-900/20",
    iconColor: "text-red-700 dark:text-red-300",
    href: "/videos",
  },
]

export function ExploreSections() {
  return (
    <section className="py-20 bg-background dark:bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-surface dark:bg-card rounded-full shadow-md mb-4 text-primary">
            <span className="material-icons-outlined text-3xl">menu_book</span>
          </div>
          <h2 className="text-4xl font-bold mb-4 font-serif dark:text-white">استكشف العلم أكثر</h2>
          <p className="text-text-muted dark:text-text-subtext max-w-xl mx-auto">
            تصفح أقسام الموقع المتنوعة للوصول إلى المحتوى.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/khutba"
            className="bg-primary rounded-2xl p-8 text-white relative overflow-hidden group row-span-2 flex flex-col justify-end min-h-[300px] hover:bg-primary-hover transition-colors"
          >
            <div className="absolute top-0 left-0 p-40 bg-white opacity-5 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                <span className="material-icons-outlined text-2xl text-white">mic</span>
              </div>
              <h3 className="text-3xl font-bold mb-2 font-serif">الخطب المنبرية</h3>
              <p className="text-green-100 text-sm mb-6 leading-relaxed opacity-90">
                استمع إلى خطب الجمعة والأعياد والمناسبات الدينية، مرتبة ومؤرشفة للرجوع إليها في أي وقت.
              </p>
              <span className="flex items-center gap-2 bg-secondary text-primary-foreground group-hover:bg-secondary-hover transition px-4 py-2 rounded-lg text-sm font-bold w-fit">
                استمع الآن
                <span className="material-icons-outlined text-sm rtl-flip">arrow_right_alt</span>
              </span>
            </div>
          </Link>

          {sections.map((section, index) => (
            <Link
              key={index}
              href={section.href}
              className="bg-surface dark:bg-card p-6 rounded-2xl shadow-sm hover:shadow-md transition group border border-border dark:border-border hover:border-primary/30 dark:hover:border-primary/30"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-2 dark:text-white group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-sm text-text-muted dark:text-text-subtext">{section.description}</p>
                </div>
                <div
                  className={`w-10 h-10 ${section.bgColor} rounded-full flex items-center justify-center ${section.iconColor} group-hover:scale-110 transition-transform`}
                >
                  <span className="material-icons-outlined">{section.icon}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
