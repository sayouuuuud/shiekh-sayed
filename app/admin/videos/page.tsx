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
import { Video, Plus, Pencil, Trash2, Eye, Loader2, Search, Youtube, Upload } from "lucide-react"

interface MediaItem {
  id: string
  title: string
  description: string
  media_type: string
  media_source: string
  media_path_or_url: string
  thumbnail_path?: string
  publish_status: string
  is_active: boolean
  views_count: number
  created_at: string
}

const ITEMS_PER_PAGE = 10

export default function ManageVideosPage() {
  const [items, setItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    media_type: "video",
    media_source: "youtube",
    media_path_or_url: "",
    thumbnail_path: "",
    publish_status: "draft",
    is_active: true,
  })
  const [submitting, setSubmitting] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  const supabase = createClient()

  const fetchItems = async () => {
    setLoading(true)
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE - 1

    const { data, count, error } = await supabase
      .from("media")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(start, end)

    if (!error) {
      setItems(data || [])
      setTotalCount(count || 0)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchItems()
  }, [currentPage])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    const { error } = await supabase.from("media").insert({
      ...formData,
      thumbnail_path: formData.thumbnail_path || null,
    })
    if (!error) {
      setIsAddModalOpen(false)
      resetForm()
      fetchItems()
    } else {
      alert("حدث خطأ أثناء الإضافة: " + error.message)
    }
    setSubmitting(false)
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingItem) return
    setSubmitting(true)
    const { error } = await supabase
      .from("media")
      .update({
        ...formData,
        thumbnail_path: formData.thumbnail_path || null,
      })
      .eq("id", editingItem.id)
    if (!error) {
      setIsEditModalOpen(false)
      setEditingItem(null)
      fetchItems()
    } else {
      alert("حدث خطأ أثناء التحديث: " + error.message)
    }
    setSubmitting(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الفيديو؟")) return
    const { error } = await supabase.from("media").delete().eq("id", id)
    if (!error) fetchItems()
  }

  const toggleActive = async (id: string, currentStatus: boolean) => {
    await supabase.from("media").update({ is_active: !currentStatus }).eq("id", id)
    fetchItems()
  }

  const openEditModal = (item: MediaItem) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      description: item.description || "",
      media_type: item.media_type,
      media_source: item.media_source,
      media_path_or_url: item.media_path_or_url,
      thumbnail_path: item.thumbnail_path || "",
      publish_status: item.publish_status,
      is_active: item.is_active ?? true,
    })
    setIsEditModalOpen(true)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      media_type: "video",
      media_source: "youtube",
      media_path_or_url: "",
      thumbnail_path: "",
      publish_status: "draft",
      is_active: true,
    })
  }

  const filteredItems = items.filter((i) => i.title.toLowerCase().includes(searchQuery.toLowerCase()))
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  const MediaForm = ({ onSubmit, isEdit = false }: { onSubmit: (e: React.FormEvent) => void; isEdit?: boolean }) => (
    <form onSubmit={onSubmit} className="space-y-6 mt-4">
      <div className="space-y-2">
        <Label>عنوان الفيديو *</Label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="عنوان الفيديو"
          className="bg-muted dark:bg-background-alt"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>الوصف</Label>
        <RichTextEditor
          content={formData.description}
          onChange={(html) => setFormData({ ...formData, description: html })}
          placeholder="وصف الفيديو..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>نوع المحتوى</Label>
          <Select
            value={formData.media_type}
            onValueChange={(value) => setFormData({ ...formData, media_type: value })}
          >
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
          accept={formData.media_type === "audio" ? "audio/*" : "video/*"}
          folder={formData.media_type === "audio" ? "media/audio" : "media/video"}
          label={formData.media_type === "audio" ? "الملف الصوتي" : "ملف الفيديو"}
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
        label="الصورة المصغرة"
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
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 ml-2 animate-spin" />
              جاري الحفظ...
            </>
          ) : isEdit ? (
            "حفظ التغييرات"
          ) : (
            "إضافة"
          )}
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
            <Video className="h-8 w-8 text-primary" />
            إدارة المرئيات
          </h1>
          <p className="text-text-muted dark:text-gray-400 mt-2">إضافة وتعديل الفيديوهات والمحتوى المرئي</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-bold">
              <Plus className="h-5 w-5 ml-2" />
              إضافة فيديو جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-3xl bg-card max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-primary dark:text-white">إضافة فيديو جديد</DialogTitle>
            </DialogHeader>
            <MediaForm onSubmit={handleAdd} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card p-6 rounded-2xl border border-border flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Video className="h-7 w-7" />
          </div>
          <div>
            <p className="text-sm text-text-muted">إجمالي الفيديوهات</p>
            <p className="text-2xl font-bold text-foreground dark:text-white mt-1">{totalCount}</p>
          </div>
        </div>
        <div className="bg-card p-6 rounded-2xl border border-border flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center">
            <Youtube className="h-7 w-7" />
          </div>
          <div>
            <p className="text-sm text-text-muted">يوتيوب</p>
            <p className="text-2xl font-bold text-red-600 mt-1">
              {items.filter((i) => i.media_source === "youtube").length}
            </p>
          </div>
        </div>
        <div className="bg-card p-6 rounded-2xl border border-border flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
            <Upload className="h-7 w-7" />
          </div>
          <div>
            <p className="text-sm text-text-muted">ملفات محلية</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {items.filter((i) => i.media_source === "local").length}
            </p>
          </div>
        </div>
        <div className="bg-card p-6 rounded-2xl border border-border flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center">
            <Eye className="h-7 w-7" />
          </div>
          <div>
            <p className="text-sm text-text-muted">المنشورة</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {items.filter((i) => i.publish_status === "published").length}
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-xl font-bold text-foreground dark:text-white">قائمة الفيديوهات</h3>
          <div className="relative">
            <Search className="absolute top-1/2 right-3 transform -translate-y-1/2 text-text-muted h-5 w-5" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 bg-muted dark:bg-background-alt w-full md:w-64"
              placeholder="بحث..."
            />
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-text-muted">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
            جاري التحميل...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-12 text-center">
            <Video className="h-12 w-12 mx-auto text-text-muted mb-4" />
            <p className="text-text-muted">{searchQuery ? "لا توجد نتائج" : "لا توجد فيديوهات بعد"}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-muted/50 dark:bg-background-alt/50 text-text-muted text-sm">
                <tr>
                  <th className="px-6 py-4 font-medium">الفيديو</th>
                  <th className="px-6 py-4 font-medium">المصدر</th>
                  <th className="px-6 py-4 font-medium">الحالة</th>
                  <th className="px-6 py-4 font-medium">نشط</th>
                  <th className="px-6 py-4 font-medium">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/50 dark:hover:bg-background-alt/50 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        {item.thumbnail_path ? (
                          <img
                            src={item.thumbnail_path || "/placeholder.svg"}
                            alt=""
                            className="w-16 h-10 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-16 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Video className="h-5 w-5 text-primary" />
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-foreground dark:text-white">{item.title}</p>
                          <p className="text-xs text-text-muted mt-1">
                            {new Date(item.created_at).toLocaleDateString("ar-EG")}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-bold ${
                          item.media_source === "youtube"
                            ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                            : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                        }`}
                      >
                        {item.media_source === "youtube" ? "يوتيوب" : "محلي"}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.publish_status === "published"
                            ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}
                      >
                        {item.publish_status === "published" ? "منشور" : "مسودة"}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <Switch
                        checked={item.is_active ?? true}
                        onCheckedChange={() => toggleActive(item.id, item.is_active ?? true)}
                      />
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => window.open(`/videos/${item.id}`, "_blank")}
                          className="p-2 rounded-lg hover:bg-muted text-text-muted hover:text-foreground transition-colors"
                          title="عرض"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-2 rounded-lg hover:bg-muted text-blue-600 transition-colors"
                          title="تعديل"
                        >
                          <Pencil className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 rounded-lg hover:bg-muted text-red-600 transition-colors"
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

        {totalPages > 1 && (
          <div className="p-4 border-t border-border flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              السابق
            </Button>
            <span className="text-sm text-text-muted px-4">
              صفحة {currentPage} من {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              التالي
            </Button>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-3xl bg-card max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-primary dark:text-white">تعديل الفيديو</DialogTitle>
          </DialogHeader>
          <MediaForm onSubmit={handleEdit} isEdit />
        </DialogContent>
      </Dialog>
    </div>
  )
}
