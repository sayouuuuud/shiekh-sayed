import { createClient } from "@/lib/supabase/server"

export default async function CommunityPage() {
  const supabase = await createClient()

  const { data: pages } = await supabase
    .from("community_pages")
    .select("*")
    .eq("publish_status", "published")
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            المجتمع
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-white mb-4 font-serif">
            مجتمعنا العلمي
          </h1>
          <p className="text-text-muted dark:text-gray-400 max-w-2xl mx-auto">
            نشاطات وفعاليات المجتمع الدينية والاجتماعية
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {!pages || pages.length === 0 ? (
            <div className="text-center py-16">
              <span className="material-icons-outlined text-6xl text-text-muted mb-4">groups</span>
              <h2 className="text-xl font-bold text-foreground dark:text-white mb-2">قريباً</h2>
              <p className="text-text-muted">سيتم إضافة محتوى صفحة المجتمع قريباً إن شاء الله</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pages.map((page) => (
                <article
                  key={page.id}
                  className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-foreground dark:text-white mb-3">{page.title}</h2>
                    <p className="text-text-muted line-clamp-3">{page.content}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
