"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { createClient } from "@/lib/supabase/client"
import { Loader2, Save, Palette } from "lucide-react"

export default function AppearancePage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const supabase = createClient()

  const [settings, setSettings] = useState({
    primary_color: "#1c5b45",
    secondary_color: "#d4a04c",
    show_hijri_date: true,
    site_logo_path: "",
  })

  useEffect(() => {
    loadSettings()
  }, [])

  async function loadSettings() {
    setLoading(true)
    const { data } = await supabase.from("appearance_settings").select("*").single()

    if (data) {
      setSettings({
        primary_color: data.primary_color || "#1c5b45",
        secondary_color: data.secondary_color || "#d4a04c",
        show_hijri_date: data.show_hijri_date ?? true,
        site_logo_path: data.site_logo_path || "",
      })
    }
    setLoading(false)
  }

  async function saveSettings() {
    setSaving(true)
    setMessage("")

    try {
      const { error } = await supabase.from("appearance_settings").upsert({
        id: "00000000-0000-0000-0000-000000000001",
        ...settings,
        updated_at: new Date().toISOString(),
      })

      if (error) throw error
      setMessage("تم حفظ الإعدادات بنجاح")
    } catch (error) {
      console.error("Error saving settings:", error)
      setMessage("حدث خطأ أثناء الحفظ")
    }
    setSaving(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mb-3">
          إعدادات
        </span>
        <h1 className="text-4xl font-bold text-foreground dark:text-white mb-4 font-serif">المظهر والألوان</h1>
        <p className="text-text-muted max-w-2xl mx-auto">تخصيص ألوان الموقع وشعاره وإعدادات العرض</p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-center ${message.includes("خطأ") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
        >
          {message}
        </div>
      )}

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Colors Section */}
        <div className="bg-card rounded-2xl p-6 border border-border space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Palette className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground dark:text-white">الألوان</h2>
              <p className="text-sm text-text-muted">تخصيص ألوان الموقع الرئيسية</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label>اللون الأساسي</Label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={settings.primary_color}
                  onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                  className="w-12 h-12 rounded-lg border border-border cursor-pointer"
                />
                <Input
                  value={settings.primary_color}
                  onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                  className="font-mono"
                  dir="ltr"
                />
              </div>
              <div
                className="h-20 rounded-xl flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: settings.primary_color }}
              >
                اللون الأساسي
              </div>
            </div>

            <div className="space-y-3">
              <Label>اللون الثانوي</Label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={settings.secondary_color}
                  onChange={(e) => setSettings({ ...settings, secondary_color: e.target.value })}
                  className="w-12 h-12 rounded-lg border border-border cursor-pointer"
                />
                <Input
                  value={settings.secondary_color}
                  onChange={(e) => setSettings({ ...settings, secondary_color: e.target.value })}
                  className="font-mono"
                  dir="ltr"
                />
              </div>
              <div
                className="h-20 rounded-xl flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: settings.secondary_color }}
              >
                اللون الثانوي
              </div>
            </div>
          </div>
        </div>

        {/* Logo Section */}
        <div className="bg-card rounded-2xl p-6 border border-border space-y-6">
          <h2 className="text-xl font-bold text-foreground dark:text-white">شعار الموقع</h2>
          <div className="space-y-2">
            <Label>مسار الشعار</Label>
            <Input
              value={settings.site_logo_path}
              onChange={(e) => setSettings({ ...settings, site_logo_path: e.target.value })}
              placeholder="/images/logos/logo.png"
              dir="ltr"
            />
            <p className="text-xs text-text-muted">ارفع الشعار يدوياً إلى /public/images/logos/ ثم اكتب المسار هنا</p>
          </div>
          {settings.site_logo_path && (
            <div className="p-4 bg-background rounded-xl border border-border">
              <img
                src={settings.site_logo_path || "/placeholder.svg"}
                alt="شعار الموقع"
                className="h-16 object-contain mx-auto"
              />
            </div>
          )}
        </div>

        {/* Hijri Date Section */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground dark:text-white">التاريخ الهجري</h2>
              <p className="text-sm text-text-muted">إظهار التاريخ الهجري في الموقع</p>
            </div>
            <Switch
              checked={settings.show_hijri_date}
              onCheckedChange={(checked) => setSettings({ ...settings, show_hijri_date: checked })}
            />
          </div>
        </div>

        {/* Save Button */}
        <Button
          onClick={saveSettings}
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
              حفظ الإعدادات
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
