"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Button } from "@/components/ui/button"

export default function AdminAboutPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [aboutData, setAboutData] = useState({
    sheikh_name: "",
    sheikh_photo: "",
    biography: "",
    achievements: "",
    education: "",
    current_positions: "",
    contact_info: { email: "", phone: "" },
    social_media: { youtube: "", telegram: "", facebook: "", twitter: "" },
    stats: { students: "", books: "", lectures: "", years: "" },
    tags: [] as string[],
  })
  const [tagInput, setTagInput] = useState("")

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    fetchAboutData()
  }, [])

  const fetchAboutData = async () => {
    setLoading(true)
    const { data, error } = await supabase.from("about_page").select("*").single()

    if (data) {
      setAboutData({
        ...data,
        contact_info: data.contact_info || { email: "", phone: "" },
        social_media: data.social_media || { youtube: "", telegram: "", facebook: "", twitter: "" },
        stats: data.stats || { students: "", books: "", lectures: "", years: "" },
        tags: data.tags || [],
      })
    }
    setLoading(false)
  }

  const handleSave = async () => {
    setSaving(true)

    const updateData = {
      ...aboutData,
      updated_at: new Date().toISOString(),
    }

    const { error } = await supabase.from("about_page").upsert(updateData)

    if (error) {
      alert("حدث خطأ أثناء الحفظ: " + error.message)
    } else {
      alert("تم الحفظ بنجاح!")
      fetchAboutData()
    }

    setSaving(false)
  }

  const addTag = () => {
    if (tagInput.trim() && !aboutData.tags.includes(tagInput.trim())) {
      setAboutData({ ...aboutData, tags: [...aboutData.tags, tagInput.trim()] })
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setAboutData({ ...aboutData, tags: aboutData.tags.filter((tag) => tag !== tagToRemove) })
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
        <h1 className="text-3xl font-bold text-foreground">إدارة صفحة عن الشيخ</h1>
        <p className="text-text-muted mt-2">تحديث معلومات الشيخ والسيرة الذاتية</p>
      </div>

      <div className="bg-card rounded-xl p-6 border border-border space-y-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground border-b border-border pb-2">المعلومات الأساسية</h2>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">اسم الشيخ</label>
            <input
              type="text"
              value={aboutData.sheikh_name}
              onChange={(e) => setAboutData({ ...aboutData, sheikh_name: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">رابط صورة الشيخ</label>
            <input
              type="text"
              value={aboutData.sheikh_photo || ""}
              onChange={(e) => setAboutData({ ...aboutData, sheikh_photo: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">السيرة الذاتية</label>
            <textarea
              value={aboutData.biography}
              onChange={(e) => setAboutData({ ...aboutData, biography: e.target.value })}
              rows={5}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">الإنجازات</label>
            <textarea
              value={aboutData.achievements || ""}
              onChange={(e) => setAboutData({ ...aboutData, achievements: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              placeholder="كل سطر إنجاز منفصل"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">التعليم</label>
            <textarea
              value={aboutData.education || ""}
              onChange={(e) => setAboutData({ ...aboutData, education: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">المناصب الحالية</label>
            <textarea
              value={aboutData.current_positions || ""}
              onChange={(e) => setAboutData({ ...aboutData, current_positions: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground border-b border-border pb-2">معلومات التواصل</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                value={aboutData.contact_info.email}
                onChange={(e) =>
                  setAboutData({
                    ...aboutData,
                    contact_info: { ...aboutData.contact_info, email: e.target.value },
                  })
                }
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">رقم الهاتف</label>
              <input
                type="tel"
                value={aboutData.contact_info.phone}
                onChange={(e) =>
                  setAboutData({
                    ...aboutData,
                    contact_info: { ...aboutData.contact_info, phone: e.target.value },
                  })
                }
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground border-b border-border pb-2">وسائل التواصل الاجتماعي</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">يوتيوب</label>
              <input
                type="url"
                value={aboutData.social_media.youtube}
                onChange={(e) =>
                  setAboutData({
                    ...aboutData,
                    social_media: { ...aboutData.social_media, youtube: e.target.value },
                  })
                }
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">تليجرام</label>
              <input
                type="url"
                value={aboutData.social_media.telegram}
                onChange={(e) =>
                  setAboutData({
                    ...aboutData,
                    social_media: { ...aboutData.social_media, telegram: e.target.value },
                  })
                }
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">فيسبوك</label>
              <input
                type="url"
                value={aboutData.social_media.facebook}
                onChange={(e) =>
                  setAboutData({
                    ...aboutData,
                    social_media: { ...aboutData.social_media, facebook: e.target.value },
                  })
                }
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">تويتر</label>
              <input
                type="url"
                value={aboutData.social_media.twitter}
                onChange={(e) =>
                  setAboutData({
                    ...aboutData,
                    social_media: { ...aboutData.social_media, twitter: e.target.value },
                  })
                }
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground border-b border-border pb-2">الإحصائيات</h2>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">الطلاب</label>
              <input
                type="text"
                value={aboutData.stats.students}
                onChange={(e) =>
                  setAboutData({ ...aboutData, stats: { ...aboutData.stats, students: e.target.value } })
                }
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
                placeholder="5000+"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">الكتب</label>
              <input
                type="text"
                value={aboutData.stats.books}
                onChange={(e) => setAboutData({ ...aboutData, stats: { ...aboutData.stats, books: e.target.value } })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
                placeholder="20+"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">المحاضرات</label>
              <input
                type="text"
                value={aboutData.stats.lectures}
                onChange={(e) =>
                  setAboutData({ ...aboutData, stats: { ...aboutData.stats, lectures: e.target.value } })
                }
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
                placeholder="1000+"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">سنوات الخبرة</label>
              <input
                type="text"
                value={aboutData.stats.years}
                onChange={(e) => setAboutData({ ...aboutData, stats: { ...aboutData.stats, years: e.target.value } })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
                placeholder="25+"
              />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground border-b border-border pb-2">التخصصات</h2>

          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTag()}
              className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              placeholder="أضف تخصص جديد واضغط Enter"
            />
            <Button onClick={addTag} className="bg-primary hover:bg-primary-hover text-white">
              إضافة
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {aboutData.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {tag}
                <button onClick={() => removeTag(tag)} className="text-primary hover:text-red-500">
                  ×
                </button>
              </span>
            ))}
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
