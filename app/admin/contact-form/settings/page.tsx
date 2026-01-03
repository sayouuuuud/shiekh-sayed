"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { createClient } from "@/lib/supabase/client"
import { Loader2, Settings, Save, ArrowRight } from "lucide-react"
import Link from "next/link"

interface ContactFormSettings {
  id?: string
  form_title: string
  form_description: string
  success_message: string
  email_notifications: boolean
  notification_email: string
  require_subject: boolean
  require_phone: boolean
}

const defaultSettings: ContactFormSettings = {
  form_title: "تواصل معنا",
  form_description: "نسعد بتواصلكم معنا. يرجى ملء النموذج أدناه وسنرد عليكم في أقرب وقت.",
  success_message: "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.",
  email_notifications: false,
  notification_email: "",
  require_subject: true,
  require_phone: false,
}

export default function ContactFormSettingsPage() {
  const [settings, setSettings] = useState<ContactFormSettings>(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })

  const supabase = createClient()

  useEffect(() => {
    loadSettings()
  }, [])

  async function loadSettings() {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("key", "contact_form_settings")
        .single()

      if (data && data.value) {
        setSettings({ ...defaultSettings, ...data.value, id: data.id })
      }
    } catch (error) {
      console.error("[v0] Error loading settings:", error)
    }
    setLoading(false)
  }

  async function handleSave() {
    setSaving(true)
    setMessage({ type: "", text: "" })

    try {
      const { id, ...settingsData } = settings

      if (id) {
        // Update existing
        const { error } = await supabase
          .from("site_settings")
          .update({ value: settingsData, updated_at: new Date().toISOString() })
          .eq("id", id)

        if (error) throw error
      } else {
        // Insert new
        const { error } = await supabase.from("site_settings").insert({
          key: "contact_form_settings",
          value: settingsData,
        })

        if (error) throw error
      }

      setMessage({ type: "success", text: "تم حفظ الإعدادات بنجاح" })
      loadSettings()
    } catch (error: any) {
      console.error("[v0] Save error:", error)
      setMessage({ type: "error", text: "حدث خطأ أثناء الحفظ: " + error.message })
    } finally {
      setSaving(false)
    }
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
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/admin/contact-form" className="text-text-muted hover:text-foreground transition-colors">
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Settings className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold text-foreground dark:text-white">إعدادات نموذج التواصل</h1>
          </div>
          <p className="text-text-muted">تخصيص نموذج التواصل والرسائل</p>
        </div>
      </div>

      {/* Message */}
      {message.text && (
        <div
          className={`p-4 rounded-xl text-center ${
            message.type === "error"
              ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Settings Form */}
      <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-foreground dark:text-white">إعدادات النموذج</h3>

          <div className="space-y-2">
            <Label>عنوان النموذج</Label>
            <Input
              value={settings.form_title}
              onChange={(e) => setSettings({ ...settings, form_title: e.target.value })}
              className="bg-muted dark:bg-background-alt"
            />
          </div>

          <div className="space-y-2">
            <Label>وصف النموذج</Label>
            <Textarea
              value={settings.form_description}
              onChange={(e) => setSettings({ ...settings, form_description: e.target.value })}
              className="bg-muted dark:bg-background-alt resize-none"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>رسالة النجاح</Label>
            <Textarea
              value={settings.success_message}
              onChange={(e) => setSettings({ ...settings, success_message: e.target.value })}
              className="bg-muted dark:bg-background-alt resize-none"
              rows={2}
            />
          </div>
        </div>

        <div className="border-t border-border pt-6 space-y-4">
          <h3 className="text-lg font-bold text-foreground dark:text-white">الحقول المطلوبة</h3>

          <div className="flex items-center justify-between">
            <div>
              <Label>حقل الموضوع</Label>
              <p className="text-sm text-text-muted">جعل حقل الموضوع إلزامياً</p>
            </div>
            <Switch
              checked={settings.require_subject}
              onCheckedChange={(checked) => setSettings({ ...settings, require_subject: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>حقل رقم الهاتف</Label>
              <p className="text-sm text-text-muted">إضافة حقل رقم الهاتف وجعله إلزامياً</p>
            </div>
            <Switch
              checked={settings.require_phone}
              onCheckedChange={(checked) => setSettings({ ...settings, require_phone: checked })}
            />
          </div>
        </div>

        <div className="border-t border-border pt-6 space-y-4">
          <h3 className="text-lg font-bold text-foreground dark:text-white">إشعارات البريد الإلكتروني</h3>

          <div className="flex items-center justify-between">
            <div>
              <Label>تفعيل إشعارات البريد</Label>
              <p className="text-sm text-text-muted">إرسال إشعار بالبريد عند استلام رسالة جديدة</p>
            </div>
            <Switch
              checked={settings.email_notifications}
              onCheckedChange={(checked) => setSettings({ ...settings, email_notifications: checked })}
            />
          </div>

          {settings.email_notifications && (
            <div className="space-y-2">
              <Label>البريد الإلكتروني للإشعارات</Label>
              <Input
                type="email"
                value={settings.notification_email}
                onChange={(e) => setSettings({ ...settings, notification_email: e.target.value })}
                placeholder="example@domain.com"
                className="bg-muted dark:bg-background-alt"
                dir="ltr"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={handleSave} disabled={saving} className="bg-primary hover:bg-primary-hover text-white">
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
    </div>
  )
}
