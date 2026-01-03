"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Save } from "lucide-react"

interface Book {
  id: string
  title: string
}

export default function AdminHeroPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [heroData, setHeroData] = useState({
    id: "",
    hadith_arabic: "",
    hadith_translation: "",
    hadith_explanation: "",
    hadith_button_text: "",
    hadith_button_link: "",
    book_custom_text: "",
    book_button_text: "",
    book_button_link: "",
    featured_book_id: "",
    important_notice: "",
    important_notice_link: "",
    show_important_notice: false,
    underline_text: "",
  })
  const [books, setBooks] = useState<Book[]>([])

  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)

    // Fetch hero data
    const { data: hero } = await supabase.from("hero_section").select("*").single()

    if (hero) {
      setHeroData({
        id: hero.id || "",
        hadith_arabic: hero.hadith_arabic || "",
        hadith_translation: hero.hadith_translation || "",
        hadith_explanation: hero.hadith_explanation || "",
        hadith_button_text: hero.hadith_button_text || "اقرأ المزيد",
        hadith_button_link: hero.hadith_button_link || "/articles",
        book_custom_text: hero.book_custom_text || "أحدث إصدارات الشيخ",
        book_button_text: hero.book_button_text || "تصفح الكتب",
        book_button_link: hero.book_button_link || "/books",
        featured_book_id: hero.featured_book_id || "",
        important_notice: hero.important_notice || "",
        important_notice_link: hero.important_notice_link || "",
        show_important_notice: hero.show_important_notice ?? false,
        underline_text: hero.underline_text || "",
      })
    }

    // Fetch books for selection
    const { data: booksData } = await supabase
      .from("books")
      .select("id, title")
      .eq("publish_status", "published")
      .order("title")

    if (booksData) {
      setBooks(booksData)
    }

    setLoading(false)
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage("")

    const updateData = {
      hadith_arabic: heroData.hadith_arabic,
      hadith_translation: heroData.hadith_translation,
      hadith_explanation: heroData.hadith_explanation,
      hadith_button_text: heroData.hadith_button_text,
      hadith_button_link: heroData.hadith_button_link,
      book_custom_text: heroData.book_custom_text,
      book_button_text: heroData.book_button_text,
      book_button_link: heroData.book_button_link,
      featured_book_id: heroData.featured_book_id || null,
      important_notice: heroData.important_notice,
      important_notice_link: heroData.important_notice_link,
      show_important_notice: heroData.show_important_notice,
      underline_text: heroData.underline_text || null,
      updated_at: new Date().toISOString(),
    }

    let error
    if (heroData.id) {
      const result = await supabase.from("hero_section").update(updateData).eq("id", heroData.id)
      error = result.error
    } else {
      const result = await supabase.from("hero_section").insert(updateData)
      error = result.error
    }

    if (error) {
      setMessage("حدث خطأ أثناء الحفظ: " + error.message)
    } else {
      setMessage("تم الحفظ بنجاح!")
      fetchData()
    }

    setSaving(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-muted">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground dark:text-white font-serif flex items-center gap-3">
            <span className="material-icons-outlined text-4xl text-primary">view_carousel</span>
            إدارة قسم البطل (Hero)
          </h1>
          <p className="text-text-muted mt-2">تحديث محتوى القسم الرئيسي في الصفحة الرئيسية</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-primary hover:bg-primary-hover text-white px-8">
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 ml-2 animate-spin" />
              جاري الحفظ...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 ml-2" />
              حفظ التغييرات
            </>
          )}
        </Button>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`p-4 rounded-xl text-center ${message.includes("خطأ") ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"}`}
        >
          {message}
        </div>
      )}

      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600">
              <span className="material-icons-outlined">campaign</span>
            </span>
            <div>
              <h2 className="text-xl font-bold text-foreground dark:text-white">التنويه الهام</h2>
              <p className="text-sm text-text-muted">إظهار رسالة تنويه في أعلى الصفحة الرئيسية</p>
            </div>
          </div>
          <Switch
            checked={heroData.show_important_notice}
            onCheckedChange={(checked) => setHeroData({ ...heroData, show_important_notice: checked })}
          />
        </div>

        {heroData.show_important_notice && (
          <div className="pt-4 border-t border-yellow-200 dark:border-yellow-800">
            <div className="space-y-2">
              <Label>نص التنويه</Label>
              <Input
                value={heroData.important_notice}
                onChange={(e) => setHeroData({ ...heroData, important_notice: e.target.value })}
                placeholder="مثال: درس جديد اليوم في مسجد الرحمن الساعة 7 مساءً"
                className="bg-white dark:bg-background-alt"
              />
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hadith Section */}
        <div className="bg-card rounded-2xl p-6 border border-border space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-icons-outlined">format_quote</span>
            </span>
            <h2 className="text-xl font-bold text-foreground dark:text-white">قسم الحديث</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>الحديث (بالعربية) *</Label>
              <Textarea
                value={heroData.hadith_arabic}
                onChange={(e) => setHeroData({ ...heroData, hadith_arabic: e.target.value })}
                rows={3}
                className="bg-muted dark:bg-background-alt resize-none"
                placeholder="أدخل نص الحديث بالعربية"
              />
            </div>

            <div className="space-y-2">
              <Label>الكلمة/الجملة المراد تسطيرها</Label>
              <Input
                value={heroData.underline_text}
                onChange={(e) => setHeroData({ ...heroData, underline_text: e.target.value })}
                className="bg-muted dark:bg-background-alt"
                placeholder="مثال: خيراً - اكتب الكلمة التي تريد وضع خط تحتها"
              />
              <p className="text-xs text-text-muted">اكتب الكلمة أو الجملة التي تريد وضع خط تحتها من نص الحديث</p>
            </div>

            <div className="space-y-2">
              <Label>راوي الحديث</Label>
              <Input
                value={heroData.hadith_translation}
                onChange={(e) => setHeroData({ ...heroData, hadith_translation: e.target.value })}
                className="bg-muted dark:bg-background-alt"
                placeholder="مثال: رواه البخاري ومسلم"
              />
            </div>

            <div className="space-y-2">
              <Label>شرح الحديث</Label>
              <Textarea
                value={heroData.hadith_explanation}
                onChange={(e) => setHeroData({ ...heroData, hadith_explanation: e.target.value })}
                rows={3}
                className="bg-muted dark:bg-background-alt resize-none"
                placeholder="شرح مختصر للحديث يظهر تحت النص الرئيسي"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>نص الزر</Label>
                <Input
                  value={heroData.hadith_button_text}
                  onChange={(e) => setHeroData({ ...heroData, hadith_button_text: e.target.value })}
                  className="bg-muted dark:bg-background-alt"
                  placeholder="اقرأ المزيد"
                />
              </div>
              <div className="space-y-2">
                <Label>رابط الزر</Label>
                <Input
                  value={heroData.hadith_button_link}
                  onChange={(e) => setHeroData({ ...heroData, hadith_button_link: e.target.value })}
                  className="bg-muted dark:bg-background-alt"
                  placeholder="/articles"
                  dir="ltr"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Book Section */}
        <div className="bg-card rounded-2xl p-6 border border-border space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <span className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
              <span className="material-icons-outlined">auto_stories</span>
            </span>
            <h2 className="text-xl font-bold text-foreground dark:text-white">قسم الكتاب المميز</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>اختر الكتاب المميز</Label>
              <Select
                value={heroData.featured_book_id}
                onValueChange={(value) => setHeroData({ ...heroData, featured_book_id: value })}
              >
                <SelectTrigger className="bg-muted dark:bg-background-alt">
                  <SelectValue placeholder="اختر كتاباً..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">بدون كتاب</SelectItem>
                  {books.map((book) => (
                    <SelectItem key={book.id} value={book.id}>
                      {book.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-text-muted">صورة الكتاب المختار ستظهر في الصفحة الرئيسية</p>
            </div>

            <div className="space-y-2">
              <Label>نص مخصص للكتاب</Label>
              <Input
                value={heroData.book_custom_text}
                onChange={(e) => setHeroData({ ...heroData, book_custom_text: e.target.value })}
                className="bg-muted dark:bg-background-alt"
                placeholder="أحدث إصدارات الشيخ"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>نص الزر</Label>
                <Input
                  value={heroData.book_button_text}
                  onChange={(e) => setHeroData({ ...heroData, book_button_text: e.target.value })}
                  className="bg-muted dark:bg-background-alt"
                  placeholder="تصفح الكتب"
                />
              </div>
              <div className="space-y-2">
                <Label>رابط الزر</Label>
                <Input
                  value={heroData.book_button_link}
                  onChange={(e) => setHeroData({ ...heroData, book_button_link: e.target.value })}
                  className="bg-muted dark:bg-background-alt"
                  placeholder="/books"
                  dir="ltr"
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="border-t border-border pt-6">
            <h3 className="text-sm font-bold text-text-muted mb-4 flex items-center gap-2">
              <span className="material-icons-outlined text-sm">preview</span>
              معاينة الكتاب
            </h3>
            <div className="bg-gradient-to-br from-primary to-primary-hover w-40 h-56 rounded-lg shadow-lg mx-auto flex flex-col items-center justify-center text-center p-4 border-4 border-primary-hover/50">
              <span className="text-secondary text-[8px] font-medium tracking-wider mb-2">
                {heroData.book_custom_text || "أحدث إصدارات الشيخ"}
              </span>
              <span className="text-white text-2xl font-serif font-bold">فقه</span>
              <span className="text-white text-2xl font-serif font-bold mb-2">السنة</span>
              <div className="w-8 h-0.5 bg-secondary mb-2"></div>
              <span className="text-gray-300/80 text-[8px]">دراسة منهجية</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
