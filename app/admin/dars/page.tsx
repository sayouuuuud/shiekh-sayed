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
import { BookOpen, Plus, Eye, Search, Edit, Trash2, Loader2, CheckCircle, FileEdit } from "lucide-react"

interface Lesson {
  id: string
  title: string
  description: string
  content: string
  lesson_type: string
  type: string
  media_source: string
  media_url?: string
  thumbnail_path?: string
  duration?: string
  publish_status: string
  is_active: boolean
  views_count: number
  created_at: string
  category_id?: string
}

interface Category {
  id: string
  name: string
  type: string
}

const ITEMS_PER_PAGE = 10

export default function ManageDarsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    lesson_type: "fiqh",
    type: "video",
    media_source: "youtube",
    media_url: "",
    thumbnail_path: "",
    duration: "",
    publish_status: "draft",
    is_active: true,
    category_id: "none", // Added category_id
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

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("*").eq("type", "lesson")
    if (data) setCategories(data)
  }

  useEffect(() => {
    fetchLessons()
    fetchCategories() // Fetch categories on mount
  }, [currentPage])

  const handleAddLesson = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const categoryIdToSend = formData.category_id === "none" ? null : formData.category_id

    const { error } = await supabase.from("lessons").insert({
      ...formData,
      media_url: formData.media_url || null,
      thumbnail_path: formData.thumbnail_path || null,
      category_id: categoryIdToSend,
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

    const categoryIdToSend = formData.category_id === "none" ? null : formData.category_id

    const { error } = await supabase
      .from("lessons")
      .update({
        ...formData,
        media_url: formData.media_url || null,
        thumbnail_path: formData.thumbnail_path || null,
        category_id: categoryIdToSend,
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
      description: lesson.description || "",
      content: lesson.content || "",
      lesson_type: lesson.lesson_type,
      type: lesson.type,
      media_source: lesson.media_source,
      media_url: lesson.media_url || "",
      thumbnail_path: lesson.thumbnail_path || "",
      duration: lesson.duration || "",
      publish_status: lesson.publish_status,
      is_active: lesson.is_active ?? true,
      category_id: lesson.category_id || "none", // Handle category_id
    })
    setIsEditModalOpen(true)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      content: "",
      lesson_type: "fiqh",
      type: "video",
      media_source: "youtube",
      media_url: "",
      thumbnail_path: "",
      duration: "",
      publish_status: "draft",
      is_active: true,
      category_id: "none", // Reset category_id
    })
  }

  const filteredLessons = lessons.filter((l) => l.title.toLowerCase().includes(searchQuery.toLowerCase()))
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  const getLessonTypeLabel = (type: string) => {
    switch (type) {
      case "fiqh":
        return "فقه"
      case "seerah":
        return "سيرة"
      default:
        return "عام"
    }
  }

  const getCategoryName = (categoryId: string | undefined) => {
    if (!categoryId) return null
    const category = categories.find((c) => c.id === categoryId)
    return category?.name
  }

  const LessonForm = ({ onSubmit, isEdit = false }: { onSubmit: (e: React.FormEvent) => void; isEdit?: boolean }) => (
    <form onSubmit={onSubmit} className="space-y-6 mt-4">
      <div className="space-y-2">
        <Label>عنوان الدرس *</Label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="عنوان الدرس"
          className="bg-muted dark:bg-background-alt"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>الوصف</Label>
        <RichTextEditor
          content={formData.description}
          onChange={(html) => setFormData({ ...formData, description: html })}
          placeholder="وصف مختصر للدرس..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>نوع الدرس</Label>
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
          <Label>التصنيف</Label>
          <Select
            value={formData.category_id || "none"}
            onValueChange={(value) => setFormData({ ...formData, category_id: value })}
          >
            <SelectTrigger className="bg-muted dark:bg-background-alt">
              <SelectValue placeholder="اختر التصنيف" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">بدون تصنيف</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>

      {formData.media_source === "local" ? (
        <FileUpload
          accept={formData.type === "audio" ? "audio/*" : "video/*"}
          folder={formData.type === "audio" ? "lessons/audio" : "lessons/video"}
          label={formData.type === "audio" ? "الملف الصوتي" : "ملف الفيديو"}
          onUploadComplete={(path) => setFormData({ ...formData, media_url: path })}
          currentFile={formData.media_url}
        />
      ) : (
        <div className="space-y-2">
          <Label>رابط يوتيوب</Label>
          <Input
            value={formData.media_url}
            onChange={(e) => setFormData({ ...formData, media_url: e.target.value })}
            placeholder="https://youtube.com/watch?v=..."
            className="bg-muted dark:bg-background-alt"
            dir="ltr"
          />
        </div>
      )}

      <FileUpload
        accept="image/*"
        folder="lessons/thumbnails"
        label="الصورة المصغرة"
        onUploadComplete={(path) => setFormData({ ...formData, thumbnail_path: path })}
        currentFile={formData.thumbnail_path}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>المدة</Label>
          <Input
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="مثال: 45 دقيقة"
            className="bg-muted dark:bg-background-alt"
          />
        </div>
        <div className="flex items-center gap-2 pt-6">
          <Switch
            checked={formData.is_active}
            onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
          />
          <Label>نشط</Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label>محتوى الدرس (تفريغ)</Label>
        <RichTextEditor
          content={formData.content}
          onChange={(html) => setFormData({ ...formData, content: html })}
          placeholder="المحتوى الكامل للدرس..."
        />
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
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 ml-2 animate-spin" />
              جاري الحفظ...
            </>
          ) : isEdit ? (
            "حفظ التغييرات"
          ) : (
            "إضافة الدرس"
          )}
        </Button>
      </div>
    </form>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary dark:text-white flex items-center gap-3 font-serif">
            <BookOpen className="h-8 w-8 text-primary" />
            إدارة الدروس العلمية
          </h1>
          <p className="text-text-muted dark:text-gray-400 mt-2">إضافة وتعديل الدروس والشروحات العلمية</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-bold">
              <Plus className="h-5 w-5 ml-2" />
              إضافة درس جديد
            </Button>
          </DialogTrigger>
          <DialogContent
            className="sm:max-w-3xl bg-card max-h-[90vh] overflow-y-auto"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-primary dark:text-white">إضافة درس جديد</DialogTitle>
            </DialogHeader>
            <LessonForm onSubmit={handleAddLesson} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-2xl border border-border flex items-center justify-between">
          <div>
            <span className="block text-text-muted text-sm mb-1">إجمالي الدروس</span>
            <span className="text-3xl font-bold text-primary dark:text-white">{totalCount}</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
            <BookOpen className="h-6 w-6" />
          </div>
        </div>
        <div className="bg-card p-6 rounded-2xl border border-border flex items-center justify-between">
          <div>
            <span className="block text-text-muted text-sm mb-1">المنشورة</span>
            <span className="text-3xl font-bold text-green-600">
              {lessons.filter((l) => l.publish_status === "published").length}
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600">
            <CheckCircle className="h-6 w-6" />
          </div>
        </div>
        <div className="bg-card p-6 rounded-2xl border border-border flex items-center justify-between">
          <div>
            <span className="block text-text-muted text-sm mb-1">مسودات</span>
            <span className="text-3xl font-bold text-yellow-600">
              {lessons.filter((l) => l.publish_status === "draft").length}
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-yellow-50 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600">
            <FileEdit className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-3xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/50 dark:bg-background-alt/50">
          <h2 className="font-bold text-xl text-primary dark:text-white">قائمة الدروس ({totalCount})</h2>
          <div className="relative">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-10 py-2 rounded-lg w-64 bg-card dark:bg-card"
              placeholder="بحث عن درس..."
            />
            <Search className="absolute right-3 top-2.5 text-text-muted h-5 w-5" />
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-text-muted flex items-center justify-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            جاري التحميل...
          </div>
        ) : filteredLessons.length === 0 ? (
          <div className="p-12 text-center text-text-muted">{searchQuery ? "لا توجد نتائج" : "لا توجد دروس بعد"}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-muted/50 dark:bg-background-alt text-xs font-bold text-text-muted uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">#</th>
                  <th className="px-6 py-4">الدرس</th>
                  <th className="px-6 py-4">النوع</th>
                  <th className="px-6 py-4">التصنيف</th>
                  <th className="px-6 py-4">المشاهدات</th>
                  <th className="px-6 py-4">الحالة</th>
                  <th className="px-6 py-4">نشط</th>
                  <th className="px-6 py-4 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredLessons.map((lesson, index) => (
                  <tr
                    key={lesson.id}
                    className="group hover:bg-muted/50 dark:hover:bg-background-alt/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-text-muted text-sm">{String(index + 1).padStart(2, "0")}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {lesson.thumbnail_path ? (
                          <img
                            src={lesson.thumbnail_path || "/placeholder.svg"}
                            alt=""
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-blue-600" />
                          </div>
                        )}
                        <div>
                          <h3 className="font-bold text-foreground dark:text-gray-200 text-sm mb-1">{lesson.title}</h3>
                          <span className="text-xs text-text-muted">
                            {new Date(lesson.created_at).toLocaleDateString("ar-EG")}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                        {getLessonTypeLabel(lesson.lesson_type)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {getCategoryName(lesson.category_id) ? (
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {getCategoryName(lesson.category_id)}
                        </span>
                      ) : (
                        <span className="text-xs text-text-muted">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted">{lesson.views_count || 0}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${lesson.publish_status === "published" ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400" : "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"}`}
                      >
                        {lesson.publish_status === "published" ? "منشور" : "مسودة"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Switch
                        checked={lesson.is_active ?? true}
                        onCheckedChange={() => toggleActive(lesson.id, lesson.is_active ?? true)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => window.open(`/dars/${lesson.id}`, "_blank")}
                          className="p-2 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                          title="عرض"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => openEditModal(lesson)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                          title="تعديل"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteLesson(lesson.id)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                          title="حذف"
                        >
                          <Trash2 className="h-5 w-5" />
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
        <DialogContent
          className="sm:max-w-3xl bg-card max-h-[90vh] overflow-y-auto"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-primary dark:text-white">تعديل الدرس</DialogTitle>
          </DialogHeader>
          <LessonForm onSubmit={handleEditLesson} isEdit />
        </DialogContent>
      </Dialog>
    </div>
  )
}
