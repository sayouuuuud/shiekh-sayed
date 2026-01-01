"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { createClient } from "@/lib/supabase/client"

interface ScheduleEvent {
  id: string
  title: string
  description: string | null
  event_type: string
  event_date: string
  event_time: string | null
  location: string | null
  is_live: boolean
  is_active: boolean
  created_at: string
}

const eventTypes = [
  { value: "fiqh", label: "فقه", color: "bg-blue-500" },
  { value: "seerah", label: "سيرة", color: "bg-orange-500" },
  { value: "friday", label: "خطبة الجمعة", color: "bg-green-600" },
  { value: "aqeedah", label: "عقيدة", color: "bg-purple-500" },
  { value: "general", label: "عام", color: "bg-gray-500" },
]

export default function AdminSchedulePage() {
  const [events, setEvents] = useState<ScheduleEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<ScheduleEvent | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_type: "fiqh",
    event_date: "",
    event_time: "",
    location: "",
    is_live: false,
    is_active: true,
  })

  const supabase = createClient()

  const fetchEvents = async () => {
    setLoading(true)
    const { data, error } = await supabase.from("schedule_events").select("*").order("event_date", { ascending: false })

    if (!error && data) {
      setEvents(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      if (editingEvent) {
        const { error } = await supabase
          .from("schedule_events")
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingEvent.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from("schedule_events").insert(formData)
        if (error) throw error
      }

      setIsModalOpen(false)
      resetForm()
      fetchEvents()
    } catch (error) {
      console.error("Error saving event:", error)
      alert("حدث خطأ أثناء الحفظ")
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الحدث؟")) return

    const { error } = await supabase.from("schedule_events").delete().eq("id", id)
    if (!error) {
      fetchEvents()
    }
  }

  const toggleActive = async (id: string, currentStatus: boolean) => {
    await supabase.from("schedule_events").update({ is_active: !currentStatus }).eq("id", id)
    fetchEvents()
  }

  const openEditModal = (event: ScheduleEvent) => {
    setEditingEvent(event)
    setFormData({
      title: event.title,
      description: event.description || "",
      event_type: event.event_type,
      event_date: event.event_date,
      event_time: event.event_time || "",
      location: event.location || "",
      is_live: event.is_live,
      is_active: event.is_active,
    })
    setIsModalOpen(true)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      event_type: "fiqh",
      event_date: "",
      event_time: "",
      location: "",
      is_live: false,
      is_active: true,
    })
    setEditingEvent(null)
  }

  const getEventTypeInfo = (type: string) => {
    return eventTypes.find((t) => t.value === type) || eventTypes[4]
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground dark:text-white font-serif flex items-center gap-3">
            <span className="material-icons-outlined text-4xl text-primary">calendar_month</span>
            إدارة الجدول الزمني
          </h1>
          <p className="text-text-muted mt-2">إضافة وتعديل الأحداث والدروس في التقويم</p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-primary hover:bg-primary-hover text-white"
              onClick={() => {
                resetForm()
                setIsModalOpen(true)
              }}
            >
              <span className="material-icons-outlined ml-2">add_circle</span>
              إضافة حدث جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl bg-card max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-primary">
                {editingEvent ? "تعديل الحدث" : "إضافة حدث جديد"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>عنوان الحدث *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="مثال: شرح كتاب منهاج الطالبين"
                    className="bg-muted"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>نوع الحدث *</Label>
                  <Select
                    value={formData.event_type}
                    onValueChange={(value) => setFormData({ ...formData, event_type: value })}
                  >
                    <SelectTrigger className="bg-muted">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${type.color}`}></div>
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>التاريخ *</Label>
                  <Input
                    type="date"
                    value={formData.event_date}
                    onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                    className="bg-muted"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>الوقت</Label>
                  <Input
                    type="time"
                    value={formData.event_time}
                    onChange={(e) => setFormData({ ...formData, event_time: e.target.value })}
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>المكان</Label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="مثال: مسجد الرحمن - مدينة نصر"
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>الوصف</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="وصف مختصر للحدث..."
                    className="bg-muted resize-none"
                    rows={3}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={formData.is_live}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_live: checked })}
                    />
                    <Label>بث مباشر</Label>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label>مفعّل</Label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false)
                    resetForm()
                  }}
                >
                  إلغاء
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary-hover text-white" disabled={submitting}>
                  {submitting ? "جاري الحفظ..." : editingEvent ? "تحديث" : "إضافة"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card p-6 rounded-xl border border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-icons-outlined">event</span>
          </div>
          <div>
            <p className="text-sm text-text-muted">إجمالي الأحداث</p>
            <p className="text-2xl font-bold text-foreground">{events.length}</p>
          </div>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600">
            <span className="material-icons-outlined">check_circle</span>
          </div>
          <div>
            <p className="text-sm text-text-muted">مفعّلة</p>
            <p className="text-2xl font-bold text-green-600">{events.filter((e) => e.is_active).length}</p>
          </div>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center text-red-600">
            <span className="material-icons-outlined">live_tv</span>
          </div>
          <div>
            <p className="text-sm text-text-muted">بث مباشر</p>
            <p className="text-2xl font-bold text-red-600">{events.filter((e) => e.is_live).length}</p>
          </div>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600">
            <span className="material-icons-outlined">upcoming</span>
          </div>
          <div>
            <p className="text-sm text-text-muted">قادمة</p>
            <p className="text-2xl font-bold text-blue-600">
              {events.filter((e) => new Date(e.event_date) >= new Date()).length}
            </p>
          </div>
        </div>
      </div>

      {/* Events List */}
      {loading ? (
        <div className="text-center py-12 text-text-muted">جاري التحميل...</div>
      ) : events.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-2xl border border-border">
          <span className="material-icons-outlined text-6xl text-text-muted mb-4">event_busy</span>
          <p className="text-text-muted">لا توجد أحداث في الجدول</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {events.map((event) => {
            const typeInfo = getEventTypeInfo(event.event_type)
            return (
              <div
                key={event.id}
                className={`bg-card rounded-xl p-4 border border-border flex flex-col md:flex-row md:items-center gap-4 ${!event.is_active ? "opacity-50" : ""}`}
              >
                <div className={`w-12 h-12 rounded-lg ${typeInfo.color} flex items-center justify-center text-white`}>
                  <span className="material-icons-outlined">event</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs bg-muted px-2 py-0.5 rounded text-text-muted">{typeInfo.label}</span>
                    {event.is_live && (
                      <span className="text-xs bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-2 py-0.5 rounded flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                        مباشر
                      </span>
                    )}
                    {!event.is_active && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">معطّل</span>
                    )}
                  </div>
                  <h3 className="font-bold text-foreground truncate">{event.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mt-1">
                    <span className="flex items-center gap-1">
                      <span className="material-icons-outlined text-sm">calendar_today</span>
                      {new Date(event.event_date).toLocaleDateString("ar-EG")}
                    </span>
                    {event.event_time && (
                      <span className="flex items-center gap-1">
                        <span className="material-icons-outlined text-sm">schedule</span>
                        {event.event_time.substring(0, 5)}
                      </span>
                    )}
                    {event.location && (
                      <span className="flex items-center gap-1">
                        <span className="material-icons-outlined text-sm">location_on</span>
                        {event.location}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={event.is_active} onCheckedChange={() => toggleActive(event.id, event.is_active)} />
                  <button
                    onClick={() => openEditModal(event)}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
                    title="تعديل"
                  >
                    <span className="material-icons-outlined">edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                    title="حذف"
                  >
                    <span className="material-icons-outlined">delete</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
