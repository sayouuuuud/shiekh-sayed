import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

export default async function PrivacyPage() {
  const supabase = await createClient()

  const { data: privacy } = await supabase.from("privacy_policy").select("*").single()

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-muted dark:text-text-subtext mb-8">
          <Link href="/" className="hover:text-primary dark:hover:text-secondary">
            الرئيسية
          </Link>
          <span className="material-icons-outlined text-xs rtl-flip">chevron_left</span>
          <span className="text-primary dark:text-secondary font-medium">سياسة الخصوصية</span>
        </div>

        <div className="bg-surface dark:bg-card rounded-2xl shadow-sm border border-border dark:border-border p-8 lg:p-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground dark:text-white mb-8 font-serif">
            سياسة الخصوصية
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none text-text-muted dark:text-text-subtext">
            {privacy?.content ? (
              <div className="whitespace-pre-line">{privacy.content}</div>
            ) : (
              <p>لا توجد سياسة خصوصية متاحة حالياً.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
