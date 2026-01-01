"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { createClient } from "@/lib/supabase/client"
import { RichTextEditor } from "@/components/admin/rich-text-editor"
import { FileUpload } from "@/components/admin/file-upload"
import { Pagination } from "@/components/admin/pagination"

interface Lesson {
  id: string
  title: string
  description: string
  type: string
  lesson_type: string | null
  media_source: string
  media_path_or_url: string
  thumbnail_path?: string
  publish_status: string
  is_active: boolean
  is_archived: boolean
  views_count: number
  created_at: string
}

const ITEMS_PER_PAGE = 10

export default function ManageDarsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "audio",
    lesson_type: "general",
    media_source: "youtube",
    media_path_or_url: "",
    thumbnail_path: "",
    publish_status: "draft",
    is_active: true,
    is_archived: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  const supabase = createClient()

  const fetchLessons = async () => {
    setLoading(true)
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE - 1

    const { data, count, error } = await supabase
      .from("lessons")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(start, end)

    if (!error) {
      setLessons(data || [])
      setTotalCount(count || 0)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchLessons()
  }, [currentPage])

  const handleAddLesson = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    const { error } = await supabase.from("lessons").insert({
      ...formData,
      thumbnail_path: formData.thumbnail_path || null,
    })
    if (!error) {
      setIsAddModalOpen(false)
      resetForm()
      fetchLessons()
    } else {
      alert("حدث خطأ أثناء الإضافة: " + error.message)
    }
    setSubmitting(false)
  }

  const handleEditLesson = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingLesson) return
    setSubmitting(true)
    const { error } = await supabase
      .from("lessons")
      .update({
        ...formData,
        thumbnail_path: formData.thumbnail_path || null,
      })
      .eq("id", editingLesson.id)
    if (!error) {
      setIsEditModalOpen(false)
      setEditingLesson(null)
      fetchLessons()
    }
    setSubmitting(false)
  }

  const handleDeleteLesson = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الدرس؟")) return
    const { error } = await supabase.from("lessons").delete().eq("id", id)
    if (!error) fetchLessons()
  }

  const toggleActive = async (id: string, currentStatus: boolean) => {
    await supabase.from("lessons").update({ is_active: !currentStatus }).eq("id", id)
    fetchLessons()
  }

  const openEditModal = (lesson: Lesson) => {
    setEditingLesson(lesson)
    setFormData({
      title: lesson.title,
      description: lesson.description,
      type: lesson.type,
      lesson_type: lesson.lesson_type || "general",
      media_source: lesson.media_source,
      media_path_or_url: lesson.media_path_or_url,
      thumbnail_path: lesson.thumbnail_path || "",
      publish_status: lesson.publish_status,
      is_active: lesson.is_active ?? true,
      is_archived: lesson.is_archived ?? false,
    })
    setIsEditModalOpen(true)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      type: "audio",
      lesson_type: "general",
      media_source: "youtube",
      media_path_or_url: "",
      thumbnail_path: "",
      publish_status: "draft",
      is_active: true,
      is_archived: false,
    })
  }

  const filteredLessons = lessons.filter((l) => l.title.toLowerCase().includes(searchQuery.toLowerCase()))
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  const getLessonTypeLabel = (type: string | null) => {
    const labels: Record<string, string> = {
      fiqh: "فقه",
      seerah: "سيرة",
      general: "عام",
    }
    return labels[type || "general"] || "عام"
  }

  const getLessonTypeColor = (type: string | null) => {
    const colors: Record<string, string> = {
      fiqh: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
      seerah: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
      general: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    }
    return colors[type || "general"] || colors.general
  }

  // Form Component (reused for both Add and Edit)
  const LessonForm = ({ onSubmit, isEdit = false }: { onSubmit: (e: React.FormEvent) => void; isEdit?: boolean }) => (
    <form onSubmit={onSubmit} className="space-y-6 mt-4">
      <div className="space-y-2">
        <Label>عنوان الدرس *</Label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="مثال: شرح صحيح البخاري"
          className="bg-muted dark:bg-background-alt"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>وصف الدرس</Label>
        <RichTextEditor
          content={formData.description}
          onChange={(html) => setFormData({ ...formData, description: html })}
          placeholder="اكتب وصفاً للدرس..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>تصنيف الدرس *</Label>
          <Select
            value={formData.lesson_type}
            onValueChange={(value) => setFormData({ ...formData, lesson_type: value })}
          >
            <SelectTrigger className="bg-muted dark:bg-background-alt">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fiqh">فقه</SelectItem>
              <SelectItem value="seerah">سيرة</SelectItem>
              <SelectItem value="general">عام</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>نوع المحتوى</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger className="bg-muted dark:bg-background-alt">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="video">فيديو</SelectItem>
              <SelectItem value="audio">صوتي</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>مصدر المحتوى</Label>
          <Select
            value={formData.media_source}
            onValueChange={(value) => setFormData({ ...formData, media_source: value })}
          >
            <SelectTrigger className="bg-muted dark:bg-background-alt">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="youtube">يوتيوب</SelectItem>
              <SelectItem value="local">ملف محلي</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {formData.media_source === "local" ? (
        <FileUpload
          accept={formData.type === "audio" ? "audio/*" : "video/*"}
          folder={formData.type === "audio" ? "lessons/audio" : "lessons/video"}
          label={formData.type === "audio" ? "مسار الملف الصوتي" : "مسار ملف الفيديو"}
          onUploadComplete={(path) => setFormData({ ...formData, media_path_or_url: path })}
          currentFile={formData.media_path_or_url}
        />
      ) : (
        <div className="space-y-2">
          <Label>رابط يوتيوب *</Label>
          <Input
            value={formData.media_path_or_url}
            onChange={(e) => setFormData({ ...formData, media_path_or_url: e.target.value })}
            placeholder="https://youtube.com/watch?v=..."
            className="bg-muted dark:bg-background-alt"
            dir="ltr"
            required
          />
        </div>
      )}

      <FileUpload
        accept="image/*"
        folder="thumbnails"
        label="مسار الصورة المصغرة"
        onUploadComplete={(path) => setFormData({ ...formData, thumbnail_path: path })}
        currentFile={formData.thumbnail_path}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>حالة النشر</Label>
          <Select
            value={formData.publish_status}
            onValueChange={(value) => setFormData({ ...formData, publish_status: value })}
          >
            <SelectTrigger className="bg-muted dark:bg-background-alt">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">مسودة</SelectItem>
              <SelectItem value="published">منشور</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-6 pt-6">
          <div className="flex items-center gap-2">
            <Switch
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
            />
            <Label>نشط</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={formData.is_archived}
              onCheckedChange={(checked) => setFormData({ ...formData, is_archived: checked })}
            />
            <Label>أرشيف</Label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        <Button
          variant="outline"
          type="button"
          onClick={() => {
            isEdit ? setIsEditModalOpen(false) : setIsAddModalOpen(false)
            resetForm()
          }}
        >
          إلغاء
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primary-hover text-white" disabled={submitting}>
          {submitting ? "جاري الحفظ..." : isEdit ? "حفظ التغييرات" : "حفظ الدرس"}
        </Button>
      </div>
    </form>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground dark:text-white font-serif flex items-center gap-3">
            <span className="material-icons-outlined text-4xl text-primary">school</span>
            إدارة الدروس العلمية
          </h1>
          <p className="text-text-muted dark:text-gray-400 mt-2">إضافة وتعديل الدروس والمحاضرات</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-bold">
              <span className="material-icons-outlined ml-2">add_circle</span>
              إضافة درس جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-3xl bg-card max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-primary dark:text-white">إضافة درس جديد</DialogTitle>
            </DialogHeader>
            <LessonForm onSubmit={handleAddLesson} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card p-6 rounded-2xl border border-border flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-secondary flex items-center justify-center">
            <span className="material-icons-outlined text-3xl">school</span>
          </div>
          <div>
            <p className="text-sm text-text-muted">إجمالي الدروس</p>
            <p className="text-2xl font-bold text-foreground dark:text-white mt-1">{totalCount}</p>
          </div>
        </div>
        <div className="bg-card p-6 rounded-2xl border border-border flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
            <span className="material-icons-outlined text-3xl">menu_book</span>
          </div>
          <div>
            <p className="text-sm text-text-muted">دروس فقه</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {lessons.filter((l) => l.lesson_type === "fiqh").length}
            </p>
          </div>
        </div>
        <div className="bg-card p-6 rounded-2xl border border-border flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 flex items-center justify-center">
            <span className="material-icons-outlined text-3xl">history_edu</span>
          </div>
          <div>
            <p className="text-sm text-text-muted">دروس سيرة</p>
            <p className="text-2xl font-bold text-orange-600 mt-1">
              {lessons.filter((l) => l.lesson_type === "seerah").length}
            </p>
          </div>
        </div>
        <div className="bg-card p-6 rounded-2xl border border-border flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 flex items-center justify-center">
            <span className="material-icons-outlined text-3xl">check_circle</span>
          </div>
          <div>
            <p className="text-sm text-text-muted">المنشورة</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {lessons.filter((l) => l.publish_status === "published").length}
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-xl font-bold text-foreground dark:text-white">قائمة الدروس</h3>
          <div className="relative">
            <span className="material-icons-outlined absolute top-1/2 right-3 transform -translate-y-1/2 text-text-muted">
              search
            </span>
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 bg-muted dark:bg-background-alt w-full md:w-64"
              placeholder="بحث عن درس..."
            />
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-text-muted">جاري التحميل...</div>
        ) : filteredLessons.length === 0 ? (
          <div className="p-12 text-center text-text-muted">{searchQuery ? "لا توجد نتائج" : "لا توجد دروس بعد"}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-muted/50 dark:bg-background-alt/50 text-text-muted text-sm">
                <tr>
                  <th className="px-6 py-4 font-medium">الدرس</th>
                  <th className="px-6 py-4 font-medium">التصنيف</th>
                  <th className="px-6 py-4 font-medium">النوع</th>
                  <th className="px-6 py-4 font-medium">الحالة</th>
                  <th className="px-6 py-4 font-medium">نشط</th>
                  <th className="px-6 py-4 font-medium">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredLessons.map((lesson) => (
                  <tr key={lesson.id} className="hover:bg-muted/50 dark:hover:bg-background-alt/50 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        {lesson.thumbnail_path ? (
                          <img
                            src={lesson.thumbnail_path || "/placeholder.svg"}
                            alt=""
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <span className="material-icons-outlined text-primary">
                              {lesson.type === "video" ? "play_circle" : "audiotrack"}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-foreground dark:text-white">{lesson.title}</p>
                          <p className="text-xs text-text-muted mt-1">
                            {new Date(lesson.created_at).toLocaleDateString("ar-EG")}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-bold ${getLessonTypeColor(lesson.lesson_type)}`}
                      >
                        {getLessonTypeLabel(lesson.lesson_type)}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm text-text-muted">
                        {lesson.type === "video" ? "فيديو" : "صوتي"} - {lesson.media_source}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${lesson.publish_status === "published" ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"}`}
                      >
                        {lesson.publish_status === "published" ? "منشور" : "مسودة"}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <Switch
                        checked={lesson.is_active ?? true}
                        onCheckedChange={() => toggleActive(lesson.id, lesson.is_active ?? true)}
                      />
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => window.open(`/dars/${lesson.id}`, "_blank")}
                          className="p-2 rounded-lg hover:bg-muted text-text-muted hover:text-gray-600 transition-colors"
                          title="عرض"
                        >
                          <span className="material-icons-outlined">visibility</span>
                        </button>
                        <button
                          onClick={() => openEditModal(lesson)}
                          className="p-2 rounded-lg hover:bg-muted text-text-muted hover:text-primary transition-colors"
                          title="تعديل"
                        >
                          <span className="material-icons-outlined">edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteLesson(lesson.id)}
                          className="p-2 rounded-lg hover:bg-red-50 text-text-muted hover:text-red-600 transition-colors"
                          title="حذف"
                        >
                          <span className="material-icons-outlined">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="p-4 border-t border-border">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={totalCount}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-3xl bg-card max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-primary dark:text-white">تعديل الدرس</DialogTitle>
          </DialogHeader>
          <LessonForm onSubmit={handleEditLesson} isEdit />
        </DialogContent>
      </Dialog>
    </div>
  )
}
