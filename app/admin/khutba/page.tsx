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
import { Mic, Plus, Eye, Search, Edit, Trash2, Loader2, CheckCircle, FileEdit } from "lucide-react"

interface Sermon {
  id: string
  title: string
  description: string
  transcript: string
  date: string
  video_url?: string
  audio_url?: string
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

export default function ManageKhutbaPage() {
  const [sermons, setSermons] = useState<Sermon[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingSermon, setEditingSermon] = useState<Sermon | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    transcript: "",
    date: new Date().toISOString().split("T")[0],
    video_url: "",
    audio_url: "",
    publish_status: "draft",
    is_active: true,
    category_id: "none", // Added category_id
  })
  const [submitting, setSubmitting] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  const supabase = createClient()

  const fetchSermons = async () => {
    setLoading(true)
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE - 1

    const { data, count, error } = await supabase
      .from("sermons")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(start, end)

    if (!error) {
      setSermons(data || [])
      setTotalCount(count || 0)
    }
    setLoading(false)
  }

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("*").eq("type", "sermon")
    if (data) setCategories(data)
  }

  useEffect(() => {
    fetchSermons()
    fetchCategories() // Fetch categories on mount
  }, [currentPage])

  const handleAddSermon = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const categoryIdToSend = formData.category_id === "none" ? null : formData.category_id

    const { error } = await supabase.from("sermons").insert({
      ...formData,
      video_url: formData.video_url || null,
      audio_url: formData.audio_url || null,
      category_id: categoryIdToSend,
    })
    if (!error) {
      setIsAddModalOpen(false)
      resetForm()
      fetchSermons()
    } else {
      alert("حدث خطأ أثناء الإضافة: " + error.message)
    }
    setSubmitting(false)
  }

  const handleEditSermon = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingSermon) return
    setSubmitting(true)

    const categoryIdToSend = formData.category_id === "none" ? null : formData.category_id

    const { error } = await supabase
      .from("sermons")
      .update({
        ...formData,
        video_url: formData.video_url || null,
        audio_url: formData.audio_url || null,
        category_id: categoryIdToSend,
      })
      .eq("id", editingSermon.id)
    if (!error) {
      setIsEditModalOpen(false)
      setEditingSermon(null)
      fetchSermons()
    }
    setSubmitting(false)
  }

  const handleDeleteSermon = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الخطبة؟")) return
    const { error } = await supabase.from("sermons").delete().eq("id", id)
    if (!error) fetchSermons()
  }

  const toggleActive = async (id: string, currentStatus: boolean) => {
    await supabase.from("sermons").update({ is_active: !currentStatus }).eq("id", id)
    fetchSermons()
  }

  const openEditModal = (sermon: Sermon) => {
    setEditingSermon(sermon)
    setFormData({
      title: sermon.title,
      description: sermon.description,
      transcript: sermon.transcript || "",
      date: sermon.date,
      video_url: sermon.video_url || "",
      audio_url: sermon.audio_url || "",
      publish_status: sermon.publish_status,
      is_active: sermon.is_active ?? true,
      category_id: sermon.category_id || "none", // Handle category_id
    })
    setIsEditModalOpen(true)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      transcript: "",
      date: new Date().toISOString().split("T")[0],
      video_url: "",
      audio_url: "",
      publish_status: "draft",
      is_active: true,
      category_id: "none", // Reset category_id
    })
  }

  const filteredSermons = sermons.filter((s) => s.title.toLowerCase().includes(searchQuery.toLowerCase()))
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  const getCategoryName = (categoryId: string | undefined) => {
    if (!categoryId) return null
    const category = categories.find((c) => c.id === categoryId)
    return category?.name
  }

  const SermonForm = ({ onSubmit, isEdit = false }: { onSubmit: (e: React.FormEvent) => void; isEdit?: boolean }) => (
    <form onSubmit={onSubmit} className="space-y-6 mt-4">
      <div className="space-y-2">
        <Label>عنوان الخطبة *</Label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="عنوان الخطبة"
          className="bg-muted dark:bg-background-alt"
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>التاريخ *</Label>
          <Input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="bg-muted dark:bg-background-alt"
            required
          />
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

      <div className="space-y-2">
        <Label>الوصف</Label>
        <RichTextEditor
          content={formData.description}
          onChange={(html) => setFormData({ ...formData, description: html })}
          placeholder="وصف مختصر للخطبة..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>رابط الفيديو (يوتيوب)</Label>
          <Input
            value={formData.video_url}
            onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
            placeholder="https://youtube.com/watch?v=..."
            className="bg-muted dark:bg-background-alt"
            dir="ltr"
          />
        </div>
        <FileUpload
          accept="audio/*"
          folder="sermons/audio"
          label="الملف الصوتي"
          onUploadComplete={(path) => setFormData({ ...formData, audio_url: path })}
          currentFile={formData.audio_url}
        />
      </div>

      <div className="space-y-2">
        <Label>نص الخطبة (تفريغ)</Label>
        <RichTextEditor
          content={formData.transcript}
          onChange={(html) => setFormData({ ...formData, transcript: html })}
          placeholder="النص الكامل للخطبة..."
        />
      </div>

      <div className="flex items-center gap-2">
        <Switch
          checked={formData.is_active}
          onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
        />
        <Label>نشط</Label>
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
            "إضافة الخطبة"
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
            <Mic className="h-8 w-8 text-primary" />
            إدارة الخطب
          </h1>
          <p className="text-text-muted dark:text-gray-400 mt-2">إضافة وتعديل خطب الجمعة والمناسبات</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-bold">
              <Plus className="h-5 w-5 ml-2" />
              إضافة خطبة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent
            className="sm:max-w-3xl bg-card max-h-[90vh] overflow-y-auto"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-primary dark:text-white">إضافة خطبة جديدة</DialogTitle>
            </DialogHeader>
            <SermonForm onSubmit={handleAddSermon} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-2xl border border-border flex items-center justify-between">
          <div>
            <span className="block text-text-muted text-sm mb-1">إجمالي الخطب</span>
            <span className="text-3xl font-bold text-primary dark:text-white">{totalCount}</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600">
            <Mic className="h-6 w-6" />
          </div>
        </div>
        <div className="bg-card p-6 rounded-2xl border border-border flex items-center justify-between">
          <div>
            <span className="block text-text-muted text-sm mb-1">المنشورة</span>
            <span className="text-3xl font-bold text-green-600">
              {sermons.filter((s) => s.publish_status === "published").length}
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
              {sermons.filter((s) => s.publish_status === "draft").length}
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
          <h2 className="font-bold text-xl text-primary dark:text-white">قائمة الخطب ({totalCount})</h2>
          <div className="relative">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-10 py-2 rounded-lg w-64 bg-card dark:bg-card"
              placeholder="بحث عن خطبة..."
            />
            <Search className="absolute right-3 top-2.5 text-text-muted h-5 w-5" />
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-text-muted flex items-center justify-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            جاري التحميل...
          </div>
        ) : filteredSermons.length === 0 ? (
          <div className="p-12 text-center text-text-muted">{searchQuery ? "لا توجد نتائج" : "لا توجد خطب بعد"}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-muted/50 dark:bg-background-alt text-xs font-bold text-text-muted uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">#</th>
                  <th className="px-6 py-4">الخطبة</th>
                  <th className="px-6 py-4">التاريخ</th>
                  <th className="px-6 py-4">التصنيف</th>
                  <th className="px-6 py-4">المشاهدات</th>
                  <th className="px-6 py-4">الحالة</th>
                  <th className="px-6 py-4">نشط</th>
                  <th className="px-6 py-4 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredSermons.map((sermon, index) => (
                  <tr
                    key={sermon.id}
                    className="group hover:bg-muted/50 dark:hover:bg-background-alt/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-text-muted text-sm">{String(index + 1).padStart(2, "0")}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
                          <Mic className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground dark:text-gray-200 text-sm">{sermon.title}</h3>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted">
                      {new Date(sermon.date).toLocaleDateString("ar-EG")}
                    </td>
                    <td className="px-6 py-4">
                      {getCategoryName(sermon.category_id) ? (
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {getCategoryName(sermon.category_id)}
                        </span>
                      ) : (
                        <span className="text-xs text-text-muted">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted">{sermon.views_count || 0}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${sermon.publish_status === "published" ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400" : "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"}`}
                      >
                        {sermon.publish_status === "published" ? "منشور" : "مسودة"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Switch
                        checked={sermon.is_active ?? true}
                        onCheckedChange={() => toggleActive(sermon.id, sermon.is_active ?? true)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => window.open(`/khutba/${sermon.id}`, "_blank")}
                          className="p-2 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                          title="عرض"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => openEditModal(sermon)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                          title="تعديل"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteSermon(sermon.id)}
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
            <DialogTitle className="text-lg font-bold text-primary dark:text-white">تعديل الخطبة</DialogTitle>
          </DialogHeader>
          <SermonForm onSubmit={handleEditSermon} isEdit />
        </DialogContent>
      </Dialog>
    </div>
  )
}
