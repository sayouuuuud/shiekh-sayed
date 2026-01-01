"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { Settings, Plus, Trash2, GripVertical, Save, AlertCircle } from "lucide-react"

interface FormField {
  id: string
  name: string
  label: string
  type: "text" | "email" | "tel" | "textarea" | "select"
  required: boolean
  options?: string[] // For select fields
}

interface ContactSettings {
  id?: string
  fields: FormField[]
  subject_options: string[]
  important_notice: string
  email_notifications: boolean
  notification_email: string
}

const defaultSettings: ContactSettings = {
  fields: [
    { id: "1", name: "name", label: "الاسم الكامل", type: "text", required: true },
    { id: "2", name: "email", label: "البريد الإلكتروني", type: "email", required: true },
    { id: "3", name: "subject", label: "الموضوع", type: "select", required: true },
    { id: "4", name: "message", label: "الرسالة", type: "textarea", required: true },
  ],
  subject_options: ["استفسار عام", "طلب فتوى", "اقتراح", "شكوى", "أخرى"],
  important_notice: "",
  email_notifications: true,
  notification_email: "",
}

export default function ContactSettingsPage() {
  const [settings, setSettings] = useState<ContactSettings>(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [newSubject, setNewSubject] = useState("")

  const supabase = createClient()

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    setLoading(true)
    const { data, error } = await supabase.from("contact_form_settings").select("*").single()

    if (!error && data) {
      setSettings({
        id: data.id,
        fields: data.fields || defaultSettings.fields,
        subject_options: data.subject_options || defaultSettings.subject_options,
        important_notice: data.important_notice || "",
        email_notifications: data.email_notifications ?? true,
        notification_email: data.notification_email || "",
      })
    }
    setLoading(false)
  }

  const saveSettings = async () => {
    setSaving(true)

    const payload = {
      fields: settings.fields,
      subject_options: settings.subject_options,
      important_notice: settings.important_notice,
      email_notifications: settings.email_notifications,
      notification_email: settings.notification_email,
      updated_at: new Date().toISOString(),
    }

    if (settings.id) {
      await supabase.from("contact_form_settings").update(payload).eq("id", settings.id)
    } else {
      await supabase.from("contact_form_settings").insert(payload)
    }

    setSaving(false)
    fetchSettings()
  }

  const addField = () => {
    const newField: FormField = {
      id: Date.now().toString(),
      name: `field_${Date.now()}`,
      label: "حقل جديد",
      type: "text",
      required: false,
    }
    setSettings({ ...settings, fields: [...settings.fields, newField] })
  }

  const updateField = (id: string, updates: Partial<FormField>) => {
    setSettings({
      ...settings,
      fields: settings.fields.map((f) => (f.id === id ? { ...f, ...updates } : f)),
    })
  }

  const removeField = (id: string) => {
    // Don't allow removing core fields
    const coreFields = ["name", "email", "message"]
    const field = settings.fields.find((f) => f.id === id)
    if (field && coreFields.includes(field.name)) {
      alert("لا يمكن حذف هذا الحقل الأساسي")
      return
    }
    setSettings({
      ...settings,
      fields: settings.fields.filter((f) => f.id !== id),
    })
  }

  const addSubjectOption = () => {
    if (newSubject.trim()) {
      setSettings({
        ...settings,
        subject_options: [...settings.subject_options, newSubject.trim()],
      })
      setNewSubject("")
    }
  }

  const removeSubjectOption = (index: number) => {
    setSettings({
      ...settings,
      subject_options: settings.subject_options.filter((_, i) => i !== index),
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground">جاري التحميل...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <Settings className="h-7 w-7 text-primary" />
            إعدادات نموذج التواصل
          </h1>
          <p className="text-sm text-muted-foreground mt-1">تخصيص حقول نموذج التواصل وخيارات الموضوعات</p>
        </div>
        <Button onClick={saveSettings} disabled={saving}>
          <Save className="h-4 w-4 ml-2" />
          {saving ? "جاري الحفظ..." : "حفظ الإعدادات"}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form Fields */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">حقول النموذج</CardTitle>
            <CardDescription>إدارة الحقول التي تظهر في نموذج التواصل</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {settings.fields.map((field, index) => (
              <div key={field.id} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <GripVertical className="h-5 w-5 text-muted-foreground mt-2 cursor-move" />
                <div className="flex-grow grid gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">اسم الحقل</Label>
                      <Input
                        value={field.label}
                        onChange={(e) => updateField(field.id, { label: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">نوع الحقل</Label>
                      <select
                        value={field.type}
                        onChange={(e) => updateField(field.id, { type: e.target.value as FormField["type"] })}
                        className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background"
                      >
                        <option value="text">نص</option>
                        <option value="email">بريد إلكتروني</option>
                        <option value="tel">هاتف</option>
                        <option value="textarea">نص طويل</option>
                        <option value="select">قائمة اختيار</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={field.required}
                      onCheckedChange={(checked) => updateField(field.id, { required: checked })}
                    />
                    <Label className="text-sm">حقل مطلوب</Label>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => removeField(field.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-transparent" onClick={addField}>
              <Plus className="h-4 w-4 ml-2" />
              إضافة حقل جديد
            </Button>
          </CardContent>
        </Card>

        {/* Subject Options */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">خيارات الموضوع</CardTitle>
            <CardDescription>الموضوعات المتاحة للاختيار في النموذج</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {settings.subject_options.map((subject, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                  <span className="flex-grow text-sm">{subject}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => removeSubjectOption(index)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder="موضوع جديد..."
                onKeyDown={(e) => e.key === "Enter" && addSubjectOption()}
              />
              <Button onClick={addSubjectOption}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              ملاحظة مهمة
            </CardTitle>
            <CardDescription>نص يظهر أعلى النموذج للزوار</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={settings.important_notice}
              onChange={(e) => setSettings({ ...settings, important_notice: e.target.value })}
              placeholder="مثال: يرجى العلم أن الرد على الرسائل قد يستغرق 3-5 أيام عمل..."
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Email Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">إشعارات البريد</CardTitle>
            <CardDescription>استلام إشعارات عند وصول رسائل جديدة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Switch
                checked={settings.email_notifications}
                onCheckedChange={(checked) => setSettings({ ...settings, email_notifications: checked })}
              />
              <Label>تفعيل إشعارات البريد الإلكتروني</Label>
            </div>
            {settings.email_notifications && (
              <div>
                <Label className="text-sm">البريد الإلكتروني للإشعارات</Label>
                <Input
                  type="email"
                  value={settings.notification_email}
                  onChange={(e) => setSettings({ ...settings, notification_email: e.target.value })}
                  placeholder="admin@example.com"
                  className="mt-1"
                  dir="ltr"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
