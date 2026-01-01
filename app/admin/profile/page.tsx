"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { Loader2, Plus, X, Save } from "lucide-react"

interface Tag {
  icon: string
  text: string
}

const availableIcons = [
  { value: "school", label: "تعليم" },
  { value: "location_on", label: "موقع" },
  { value: "mic", label: "خطيب" },
  { value: "work", label: "عمل" },
  { value: "star", label: "نجمة" },
  { value: "book", label: "كتاب" },
  { value: "mosque", label: "مسجد" },
  { value: "groups", label: "مجموعات" },
]

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const supabase = createClient()

  const [profile, setProfile] = useState({
    name: "",
    title: "",
    bio: "",
    photo_path: "",
    education: "",
    achievements: "",
    current_positions: "",
  })

  const [tags, setTags] = useState<Tag[]>([])
  const [socialMedia, setSocialMedia] = useState({
    youtube: "",
    telegram: "",
    facebook: "",
    twitter: "",
  })
  const [stats, setStats] = useState({
    students: "",
    books: "",
    lectures: "",
    years: "",
  })

  useEffect(() => {
    loadProfile()
  }, [])

  async function loadProfile() {
    setLoading(true)
    const { data, error } = await supabase.from("sheikh_profile").select("*").single()

    if (data) {
      setProfile({
        name: data.name || "",
        title: data.title || "",
        bio: data.bio || "",
        photo_path: data.photo_path || "",
        education: data.education || "",
        achievements: data.achievements || "",
        current_positions: data.current_positions || "",
      })
      setTags(data.tags || [])
      setSocialMedia(data.social_media || {})
      setStats(data.stats || {})
    }
    setLoading(false)
  }

  async function saveProfile() {
    setSaving(true)
    setMessage("")

    try {
      const { error } = await supabase.from("sheikh_profile").upsert({
        id: "00000000-0000-0000-0000-000000000001",
        ...profile,
        tags,
        social_media: socialMedia,
        stats,
        updated_at: new Date().toISOString(),
      })

      if (error) throw error
      setMessage("تم حفظ الملف الشخصي بنجاح")
    } catch (error) {
      console.error("Error saving profile:", error)
      setMessage("حدث خطأ أثناء الحفظ")
    }
    setSaving(false)
  }

  const addTag = () => {
    setTags([...tags, { icon: "star", text: "" }])
  }

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index))
  }

  const updateTag = (index: number, field: keyof Tag, value: string) => {
    const updated = [...tags]
    updated[index][field] = value
    setTags(updated)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Page Header */}
      <div className="text-center relative">
        <span className="inline-block bg-background-alt dark:bg-primary/20 text-secondary px-3 py-1 rounded-full text-xs font-bold mb-3">
          إدارة المحتوى
        </span>
        <h1 className="text-4xl font-bold text-foreground dark:text-white mb-4 font-serif">الملف الشخصي للشيخ</h1>
        <p className="text-text-muted dark:text-gray-400 max-w-2xl mx-auto">
          تحديث معلومات الشيخ التي تظهر في صفحة &quot;من هو الشيخ&quot;
        </p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-center ${message.includes("خطأ") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
        >
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-2xl p-6 border border-border space-y-6">
            <h2 className="text-xl font-bold text-foreground dark:text-white flex items-center gap-2">
              <span className="material-icons-outlined text-primary">person</span>
              المعلومات الأساسية
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>اسم الشيخ</Label>
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="الشيخ السيد مراد"
                />
              </div>
              <div className="space-y-2">
                <Label>اللقب / المسمى</Label>
                <Input
                  value={profile.title}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  placeholder="عالم أزهري ومفكر تربوي"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>مسار الصورة</Label>
              <Input
                value={profile.photo_path}
                onChange={(e) => setProfile({ ...profile, photo_path: e.target.value })}
                placeholder="/images/sheikh/photo.jpg"
                dir="ltr"
              />
              <p className="text-xs text-text-muted">ارفع الصورة يدوياً إلى /public/images/sheikh/ ثم اكتب المسار هنا</p>
            </div>

            <div className="space-y-2">
              <Label>السيرة الذاتية المختصرة</Label>
              <Textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows={4}
                placeholder="نبذة مختصرة عن الشيخ..."
              />
            </div>

            <div className="space-y-2">
              <Label>المسيرة العلمية</Label>
              <Textarea
                value={profile.education}
                onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                rows={4}
                placeholder="المؤهلات العلمية والشهادات..."
              />
            </div>

            <div className="space-y-2">
              <Label>الإنجازات</Label>
              <Textarea
                value={profile.achievements}
                onChange={(e) => setProfile({ ...profile, achievements: e.target.value })}
                rows={4}
                placeholder="أبرز الإنجازات والمؤلفات..."
              />
            </div>
          </div>

          {/* Tags Section */}
          <div className="bg-card rounded-2xl p-6 border border-border space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground dark:text-white flex items-center gap-2">
                <span className="material-icons-outlined text-secondary">label</span>
                العلامات والتصنيفات
              </h2>
              <Button variant="outline" size="sm" onClick={addTag}>
                <Plus className="h-4 w-4 ml-2" />
                إضافة علامة
              </Button>
            </div>

            <div className="space-y-4">
              {tags.map((tag, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border">
                  <select
                    value={tag.icon}
                    onChange={(e) => updateTag(index, "icon", e.target.value)}
                    className="bg-card border border-border rounded-lg px-3 py-2 text-sm"
                  >
                    {availableIcons.map((icon) => (
                      <option key={icon.value} value={icon.value}>
                        {icon.label}
                      </option>
                    ))}
                  </select>
                  <Input
                    value={tag.text}
                    onChange={(e) => updateTag(index, "text", e.target.value)}
                    placeholder="نص العلامة"
                    className="flex-1"
                  />
                  <Button variant="ghost" size="icon" onClick={() => removeTag(index)}>
                    <X className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="bg-card rounded-2xl p-6 border border-border space-y-4">
            <h3 className="font-bold text-foreground dark:text-white flex items-center gap-2">
              <span className="material-icons-outlined text-primary">analytics</span>
              الإحصائيات
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>عدد الطلاب</Label>
                <Input
                  value={stats.students}
                  onChange={(e) => setStats({ ...stats, students: e.target.value })}
                  placeholder="5000+"
                />
              </div>
              <div className="space-y-2">
                <Label>عدد الكتب</Label>
                <Input
                  value={stats.books}
                  onChange={(e) => setStats({ ...stats, books: e.target.value })}
                  placeholder="20+"
                />
              </div>
              <div className="space-y-2">
                <Label>عدد المحاضرات</Label>
                <Input
                  value={stats.lectures}
                  onChange={(e) => setStats({ ...stats, lectures: e.target.value })}
                  placeholder="1000+"
                />
              </div>
              <div className="space-y-2">
                <Label>سنوات في الدعوة</Label>
                <Input
                  value={stats.years}
                  onChange={(e) => setStats({ ...stats, years: e.target.value })}
                  placeholder="25+"
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-card rounded-2xl p-6 border border-border space-y-4">
            <h3 className="font-bold text-foreground dark:text-white flex items-center gap-2">
              <span className="material-icons-outlined text-blue-500">share</span>
              التواصل الاجتماعي
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>يوتيوب</Label>
                <Input
                  value={socialMedia.youtube}
                  onChange={(e) => setSocialMedia({ ...socialMedia, youtube: e.target.value })}
                  placeholder="https://youtube.com/@channel"
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <Label>تيليجرام</Label>
                <Input
                  value={socialMedia.telegram}
                  onChange={(e) => setSocialMedia({ ...socialMedia, telegram: e.target.value })}
                  placeholder="https://t.me/channel"
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <Label>فيسبوك</Label>
                <Input
                  value={socialMedia.facebook}
                  onChange={(e) => setSocialMedia({ ...socialMedia, facebook: e.target.value })}
                  placeholder="https://facebook.com/page"
                  dir="ltr"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <Button
            onClick={saveProfile}
            disabled={saving}
            className="w-full bg-primary hover:bg-primary-hover text-white"
          >
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
      </div>
    </div>
  )
}
