"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"

const settingsSections = [
  { id: "general", label: "عام", icon: "settings" },
  { id: "appearance", label: "المظهر والألوان", icon: "palette" },
  { id: "social", label: "التواصل الاجتماعي", icon: "share" },
]

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("general")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  const [settings, setSettings] = useState({
    site_name: "",
    site_description: "",
    contact_email: "",
    youtube_channel: "",
    telegram_channel: "",
    facebook_page: "",
  })

  const supabase = createClient()

  useEffect(() => {
    loadSettings()
  }, [])

  async function loadSettings() {
    setLoading(true)
    const { data, error } = await supabase.from("site_settings").select("key, value")

    if (data) {
      const settingsObj: Record<string, string> = {}
      data.forEach((item) => {
        settingsObj[item.key] = item.value || ""
      })
      setSettings({
        site_name: settingsObj.site_name || "",
        site_description: settingsObj.site_description || "",
        contact_email: settingsObj.contact_email || "",
        youtube_channel: settingsObj.youtube_channel || "",
        telegram_channel: settingsObj.telegram_channel || "",
        facebook_page: settingsObj.facebook_page || "",
      })
    }
    setLoading(false)
  }

  async function saveSettings() {
    setSaving(true)
    setMessage("")

    try {
      // Update each setting
      for (const [key, value] of Object.entries(settings)) {
        const { error } = await supabase.from("site_settings").upsert(
          {
            key: key,
            value: value,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "key",
          },
        )

        if (error) throw error
      }

      setMessage("تم حفظ الإعدادات بنجاح")
    } catch (error) {
      console.error("Error saving settings:", error)
      setMessage("حدث خطأ أثناء حفظ الإعدادات")
    }

    setSaving(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-muted">جاري تحميل الإعدادات...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center relative">
        <span className="inline-block bg-background-alt dark:bg-primary/20 text-secondary px-3 py-1 rounded-full text-xs font-bold mb-3 tracking-wide">
          لوحة التحكم
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-white mb-4 leading-tight font-serif">
          إعدادات{" "}
          <span className="relative inline-block text-primary">
            الموقع
            <svg
              className="absolute w-full h-3 -bottom-1 left-0 text-secondary/30 dark:text-secondary/50 -z-10"
              preserveAspectRatio="none"
              viewBox="0 0 100 10"
            >
              <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="8" />
            </svg>
          </span>{" "}
          العامة
        </h1>
        <p className="text-text-muted dark:text-gray-400 max-w-2xl mx-auto">
          قم بتهيئة الخيارات الأساسية للموقع، معلومات التواصل، الروابط الاجتماعية، وتفضيلات العرض.
        </p>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div
          className={`p-4 rounded-xl text-center ${message.includes("خطأ") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
        >
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="bg-card dark:bg-card rounded-2xl p-4 shadow-soft sticky top-24">
            <h3 className="font-bold text-lg mb-4 px-2 text-foreground dark:text-white">قائمة الإعدادات</h3>
            <nav className="space-y-1">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeSection === section.id
                      ? "bg-primary/5 text-primary font-bold dark:bg-primary/20 dark:text-white"
                      : "text-text-muted hover:bg-muted hover:text-primary dark:hover:bg-white/5 dark:hover:text-white"
                  }`}
                >
                  <span className="material-icons-outlined">{section.icon}</span>
                  <span>{section.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-8">
          {/* Basic Site Info */}
          {activeSection === "general" && (
            <section className="bg-card dark:bg-card rounded-2xl p-8 shadow-soft border border-border">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                  <span className="material-icons-outlined text-2xl">info</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground dark:text-white">معلومات الموقع الأساسية</h2>
                  <p className="text-sm text-text-muted dark:text-gray-400">
                    تخصيص العناوين والأوصاف التي تظهر في محركات البحث
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>اسم الموقع</Label>
                  <Input
                    value={settings.site_name}
                    onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                    className="bg-muted dark:bg-background-alt rounded-xl py-3"
                  />
                </div>
                <div className="space-y-2">
                  <Label>البريد الإلكتروني للإدارة</Label>
                  <Input
                    type="email"
                    value={settings.contact_email}
                    onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                    className="bg-muted dark:bg-background-alt rounded-xl py-3"
                  />
                </div>
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label>وصف الموقع (Meta Description)</Label>
                  <Textarea
                    value={settings.site_description}
                    onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
                    rows={3}
                    className="bg-muted dark:bg-background-alt rounded-xl resize-none"
                  />
                  <p className="text-xs text-text-muted">يستخدم هذا الوصف في نتائج محركات البحث.</p>
                </div>
              </div>
            </section>
          )}

          {/* Social Media Links */}
          {activeSection === "social" && (
            <section className="bg-card dark:bg-card rounded-2xl p-8 shadow-soft border border-border">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <span className="material-icons-outlined text-2xl">share</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground dark:text-white">روابط التواصل الاجتماعي</h2>
                  <p className="text-sm text-text-muted dark:text-gray-400">أضف روابط حسابات التواصل الاجتماعي</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <span className="material-icons-outlined text-red-500">smart_display</span>
                    قناة يوتيوب
                  </Label>
                  <Input
                    value={settings.youtube_channel}
                    onChange={(e) => setSettings({ ...settings, youtube_channel: e.target.value })}
                    placeholder="https://youtube.com/@channel"
                    className="bg-muted dark:bg-background-alt rounded-xl py-3"
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <span className="material-icons-outlined text-blue-500">send</span>
                    قناة تيليجرام
                  </Label>
                  <Input
                    value={settings.telegram_channel}
                    onChange={(e) => setSettings({ ...settings, telegram_channel: e.target.value })}
                    placeholder="https://t.me/channel"
                    className="bg-muted dark:bg-background-alt rounded-xl py-3"
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <span className="material-icons-outlined text-blue-700">facebook</span>
                    صفحة فيسبوك
                  </Label>
                  <Input
                    value={settings.facebook_page}
                    onChange={(e) => setSettings({ ...settings, facebook_page: e.target.value })}
                    placeholder="https://facebook.com/page"
                    className="bg-muted dark:bg-background-alt rounded-xl py-3"
                    dir="ltr"
                  />
                </div>
              </div>
            </section>
          )}

          {/* Appearance Settings */}
          {activeSection === "appearance" && (
            <section className="bg-card dark:bg-card rounded-2xl p-8 shadow-soft border border-border">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-icons-outlined text-2xl">palette</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground dark:text-white">المظهر والألوان</h2>
                  <p className="text-sm text-text-muted dark:text-gray-400">تخصيص مظهر الموقع والألوان</p>
                </div>
              </div>
              <div className="text-center py-8 text-text-muted">
                <span className="material-icons-outlined text-4xl mb-2">construction</span>
                <p>قريباً - إعدادات المظهر والألوان</p>
              </div>
            </section>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row justify-end items-center gap-4 pt-4">
            <Button variant="ghost" className="w-full md:w-auto" onClick={loadSettings}>
              إلغاء التغييرات
            </Button>
            <Button
              className="w-full md:w-auto bg-primary hover:bg-primary-hover text-white px-8 shadow-lg"
              onClick={saveSettings}
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="animate-spin material-icons-outlined ml-2">refresh</span>
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <span className="material-icons-outlined ml-2">save</span>
                  حفظ جميع التغييرات
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
