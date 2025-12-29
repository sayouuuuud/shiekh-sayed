"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Button } from "@/components/ui/button"

export default function AdminHeroPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [heroData, setHeroData] = useState({
    hadith_arabic: "",
    hadith_translation: "",
    hadith_explanation: "",
    hadith_button_text: "",
    hadith_button_link: "",
    book_custom_text: "",
    book_button_text: "",
    book_button_link: "",
  })
  const [books, setBooks] = useState<any[]>([])
  const [selectedBookId, setSelectedBookId] = useState<string>("")

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    fetchHeroData()
    fetchBooks()
  }, [])

  const fetchHeroData = async () => {
    setLoading(true)
    const { data, error } = await supabase.from("hero_section").select("*").single()

    if (data) {
      setHeroData(data)
      setSelectedBookId(data.featured_book_id || "")
    }
    setLoading(false)
  }

  const fetchBooks = async () => {
    const { data } = await supabase.from("books").select("id, title").eq("publish_status", "published").order("title")

    if (data) {
      setBooks(data)
    }
  }

  const handleSave = async () => {
    setSaving(true)

    const updateData = {
      ...heroData,
      featured_book_id: selectedBookId || null,
      updated_at: new Date().toISOString(),
    }

    const { error } = await supabase.from("hero_section").upsert(updateData)

    if (error) {
      alert("حدث خطأ أثناء الحفظ: " + error.message)
    } else {
      alert("تم الحفظ بنجاح!")
      fetchHeroData()
    }

    setSaving(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-muted">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">إدارة قسم البطل (Hero)</h1>
        <p className="text-text-muted mt-2">تحديث محتوى القسم الرئيسي في الصفحة الرئيسية</p>
      </div>

      <div className="bg-card rounded-xl p-6 border border-border space-y-6">
        {/* Hadith Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground border-b border-border pb-2">قسم الحديث</h2>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">الحديث (بالعربية)</label>
            <textarea
              value={heroData.hadith_arabic}
              onChange={(e) => setHeroData({ ...heroData, hadith_arabic: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              placeholder="أدخل نص الحديث بالعربية"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">ترجمة/راوي الحديث</label>
            <input
              type="text"
              value={heroData.hadith_translation}
              onChange={(e) => setHeroData({ ...heroData, hadith_translation: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              placeholder="مثال: رواه البخاري"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">شرح الحديث</label>
            <textarea
              value={heroData.hadith_explanation || ""}
              onChange={(e) => setHeroData({ ...heroData, hadith_explanation: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              placeholder="شرح مختصر للحديث"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">نص زر الحديث</label>
              <input
                type="text"
                value={heroData.hadith_button_text || ""}
                onChange={(e) => setHeroData({ ...heroData, hadith_button_text: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
                placeholder="اقرأ المزيد"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">رابط زر الحديث</label>
              <input
                type="text"
                value={heroData.hadith_button_link || ""}
                onChange={(e) => setHeroData({ ...heroData, hadith_button_link: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
                placeholder="/articles"
              />
            </div>
          </div>
        </div>

        {/* Book Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground border-b border-border pb-2">قسم الكتاب المميز</h2>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">اختر الكتاب المميز</label>
            <select
              value={selectedBookId}
              onChange={(e) => setSelectedBookId(e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
            >
              <option value="">بدون كتاب</option>
              {books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">نص مخصص للكتاب</label>
            <input
              type="text"
              value={heroData.book_custom_text || ""}
              onChange={(e) => setHeroData({ ...heroData, book_custom_text: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              placeholder="أحدث إصدارات الشيخ"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">نص زر الكتاب</label>
              <input
                type="text"
                value={heroData.book_button_text || ""}
                onChange={(e) => setHeroData({ ...heroData, book_button_text: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
                placeholder="تصفح الكتب"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">رابط زر الكتاب</label>
              <input
                type="text"
                value={heroData.book_button_link || ""}
                onChange={(e) => setHeroData({ ...heroData, book_button_link: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
                placeholder="/books"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t border-border">
          <Button onClick={handleSave} disabled={saving} className="bg-primary hover:bg-primary-hover text-white px-8">
            {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
          </Button>
        </div>
      </div>
    </div>
  )
}
