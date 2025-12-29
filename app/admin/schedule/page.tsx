"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { createClient } from "@/lib/supabase/client"
import { Plus, Pencil, Trash2, Calendar, Clock, MapPin, Save, X } from "lucide-react"

interface ScheduleItem {
  id: string
  category: string
  title: string
  time: string
  location: string
  description: string
  enabled: boolean
}

export default function ScheduleManagementPage() {
  const [items, setItems] = useState<ScheduleItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [message, setMessage] = useState("")

  const [formData, setFormData] = useState({
    category: "",
    title: "",
    time: "",
    location: "",
    description: "",
    enabled: true,
  })

  const supabase = createClient()

  useEffect(() => {
    loadSchedule()
  }, [])

  async function loadSchedule() {
    setLoading(true)
    const { data } = await supabase.from("lesson_schedule").select("*").order("created_at", { ascending: true })

    if (data) setItems(data)
    setLoading(false)
  }

  async function handleSave() {
    if (!formData.title || !formData.time || !formData.location) {
      setMessage("يرجى ملء جميع الحقول المطلوبة")
      return
    }

    try {
      if (editingId) {
        await supabase
          .from("lesson_schedule")
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq("id", editingId)
        setMessage("تم تحديث الدرس بنجاح")
      } else {
        await supabase.from("lesson_schedule").insert(formData)
        setMessage("تم إضافة الدرس بنجاح")
      }

      resetForm()
      loadSchedule()
    } catch (error) {
      setMessage("حدث خطأ أثناء الحفظ")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("هل أنت متأكد من حذف هذا الدرس؟")) return

    await supabase.from("lesson_schedule").delete().eq("id", id)
    setMessage("تم حذف الدرس بنجاح")
    loadSchedule()
  }

  async function toggleEnabled(id: string, enabled: boolean) {
    await supabase.from("lesson_schedule").update({ enabled: !enabled }).eq("id", id)
    loadSchedule()
  }

  function startEdit(item: ScheduleItem) {
    setFormData({
      category: item.category,
      title: item.title,
      time: item.time,
      location: item.location,
      description: item.description || "",
      enabled: item.enabled,
    })
    setEditingId(item.id)
    setIsAdding(true)
  }

  function resetForm() {
    setFormData({
      category: "",
      title: "",
      time: "",
      location: "",
      description: "",
      enabled: true,
    })
    setEditingId(null)
    setIsAdding(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">جدول الدروس الأسبوعي</h1>
          <p className="text-muted-foreground">إدارة مواعيد الدروس والمحاضرات</p>
        </div>
        <Button onClick={() => setIsAdding(true)} disabled={isAdding}>
          <Plus className="h-4 w-4 ml-2" />
          إضافة درس جديد
        </Button>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`p-4 rounded-xl text-center ${message.includes("خطأ") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
        >
          {message}
        </div>
      )}

      {/* Add/Edit Form */}
      {isAdding && (
        <div className="bg-card rounded-2xl p-6 border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">{editingId ? "تعديل الدرس" : "إضافة درس جديد"}</h2>
            <Button variant="ghost" size="icon" onClick={resetForm}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>التصنيف *</Label>
              <Input
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="فقه، عقيدة، تفسير..."
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label>عنوان الدرس *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="شرح كتاب..."
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label>الموعد *</Label>
              <Input
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                placeholder="السبت - بعد صلاة المغرب"
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label>المكان *</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="مسجد الرحمن"
                className="bg-muted"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>الوصف (اختياري)</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
                className="bg-muted resize-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.enabled}
                onCheckedChange={(checked) => setFormData({ ...formData, enabled: checked })}
              />
              <Label>مفعّل</Label>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={resetForm}>
              إلغاء
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 ml-2" />
              {editingId ? "تحديث" : "إضافة"}
            </Button>
          </div>
        </div>
      )}

      {/* Schedule List */}
      <div className="grid gap-4">
        {items.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-2xl border">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">لا توجد دروس في الجدول</p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className={`bg-card rounded-xl p-4 border flex items-center gap-4 ${!item.enabled ? "opacity-50" : ""}`}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-secondary/20 text-secondary px-2 py-0.5 rounded">{item.category}</span>
                  {!item.enabled && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">معطّل</span>}
                </div>
                <h3 className="font-bold truncate">{item.title}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {item.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {item.location}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Switch checked={item.enabled} onCheckedChange={() => toggleEnabled(item.id, item.enabled)} />
                <Button variant="ghost" size="icon" onClick={() => startEdit(item)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
