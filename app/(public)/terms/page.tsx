import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

export default async function TermsPage() {
  const supabase = await createClient()

  const { data: terms } = await supabase.from("terms_conditions").select("*").single()

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-muted dark:text-text-subtext mb-8">
          <Link href="/" className="hover:text-primary dark:hover:text-secondary">
            الرئيسية
          </Link>
          <span className="material-icons-outlined text-xs rtl-flip">chevron_left</span>
          <span className="text-primary dark:text-secondary font-medium">شروط الاستخدام</span>
        </div>

        <div className="bg-surface dark:bg-card rounded-2xl shadow-sm border border-border dark:border-border p-8 lg:p-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground dark:text-white mb-8 font-serif">
            شروط الاستخدام
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none text-text-muted dark:text-text-subtext">
            {terms?.content ? (
              <div className="whitespace-pre-line">{terms.content}</div>
            ) : (
              <p>لا توجد شروط استخدام متاحة حالياً.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
