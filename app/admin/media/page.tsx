"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { createClient } from "@/lib/supabase/client"
import { Plus, Search, Edit, Trash2, Video, Music, Eye, Loader2, ExternalLink } from "lucide-react"

interface Media {
  id: string
  title: string
  description: string | null
  type: string
  source: string
  url_or_path: string
  publish_status: string
  is_active: boolean
  views_count: number
  created_at: string
}

export default function AdminMediaPage() {
  const [mediaItems, setMediaItems] = useState<Media[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingMedia, setEditingMedia] = useState<Media | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "video",
    source: "youtube",
    url_or_path: "",
    publish_status: "draft",
    is_active: true,
  })
  const [submitting, setSubmitting] = useState(false)

  const supabase = createClient()

  const fetchMedia = async () => {
    setLoading(true)
    const { data, error } = await supabase.from("media").select("*").order("created_at", { ascending: false })
    if (!error) setMediaItems(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchMedia()
  }, [])

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    const { error } = await supabase.from("media").insert({
      ...formData,
      is_active: formData.is_active,
    })
    if (!error) {
      setIsAddDialogOpen(false)
      setFormData({
        title: "",
        description: "",
        type: "video",
        source: "youtube",
        url_or_path: "",
        publish_status: "draft",
        is_active: true,
      })
      fetchMedia()
    } else {
      alert("حدث خطأ أثناء الإضافة: " + error.message)
    }
    setSubmitting(false)
  }

  const handleEditMedia = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingMedia) return
    setSubmitting(true)
    const { error } = await supabase.from("media").update(formData).eq("id", editingMedia.id)
    if (!error) {
      setIsEditDialogOpen(false)
      setEditingMedia(null)
      fetchMedia()
    }
    setSubmitting(false)
  }

  const handleDeleteMedia = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه المرئية؟")) return
    const { error } = await supabase.from("media").delete().eq("id", id)
    if (!error) fetchMedia()
  }

  const toggleActive = async (id: string, currentStatus: boolean) => {
    await supabase.from("media").update({ is_active: !currentStatus }).eq("id", id)
    fetchMedia()
  }

  const openEditDialog = (media: Media) => {
    setEditingMedia(media)
    setFormData({
      title: media.title,
      description: media.description || "",
      type: media.type,
      source: media.source,
      url_or_path: media.url_or_path,
      publish_status: media.publish_status,
      is_active: media.is_active ?? true,
    })
    setIsEditDialogOpen(true)
  }

  const filteredMedia = mediaItems.filter((m) => m.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const MediaForm = ({ onSubmit, isEdit = false }: { onSubmit: (e: React.FormEvent) => void; isEdit?: boolean }) => (
    <form onSubmit={onSubmit} className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label>عنوان المرئية</Label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="أدخل عنوان المرئية"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>نوع المحتوى</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="video">فيديو</SelectItem>
              <SelectItem value="audio">صوتي</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>المصدر</Label>
          <Select value={formData.source} onValueChange={(value) => setFormData({ ...formData, source: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="youtube">يوتيوب</SelectItem>
              <SelectItem value="local">ملف محلي</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label>رابط الفيديو</Label>
        <Input
          value={formData.url_or_path}
          onChange={(e) => setFormData({ ...formData, url_or_path: e.target.value })}
          placeholder="https://youtube.com/watch?v=..."
          dir="ltr"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>حالة النشر</Label>
          <Select
            value={formData.publish_status}
            onValueChange={(value) => setFormData({ ...formData, publish_status: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">مسودة</SelectItem>
              <SelectItem value="published">منشور</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-3 pt-6">
          <Switch
            checked={formData.is_active}
            onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
          />
          <Label>نشط في الموقع</Label>
        </div>
      </div>
      <div className="space-y-2">
        <Label>الوصف</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="أدخل وصف المرئية"
          rows={4}
        />
      </div>
      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => (isEdit ? setIsEditDialogOpen(false) : setIsAddDialogOpen(false))}
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
            "حفظ المرئية"
          )}
        </Button>
      </div>
    </form>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground dark:text-white flex items-center gap-3">
            <Video className="h-7 w-7 text-primary" />
            إدارة المرئيات
          </h1>
          <p className="text-sm text-text-muted mt-1">إضافة وتعديل وحذف المرئيات</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-hover text-white">
              <Plus className="h-5 w-5 ml-2" />
              إضافة مرئية
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" onOpenAutoFocus={(e) => e.preventDefault()}>
            <DialogHeader>
              <DialogTitle>إضافة مرئية جديدة</DialogTitle>
            </DialogHeader>
            <MediaForm onSubmit={handleAddMedia} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card p-5 rounded-xl border border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Video className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{mediaItems.length}</p>
            <p className="text-sm text-text-muted">إجمالي المرئيات</p>
          </div>
        </div>
        <div className="bg-card p-5 rounded-xl border border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <Eye className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {mediaItems.reduce((acc, m) => acc + (m.views_count || 0), 0).toLocaleString()}
            </p>
            <p className="text-sm text-text-muted">المشاهدات</p>
          </div>
        </div>
        <div className="bg-card p-5 rounded-xl border border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <Music className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {mediaItems.filter((m) => m.publish_status === "published").length}
            </p>
            <p className="text-sm text-text-muted">المنشورة</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl p-4 border border-border">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute inset-y-0 right-0 flex items-center pr-3 h-full w-5 text-text-muted" />
              <Input
                placeholder="بحث في المرئيات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Media Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-text-muted flex items-center justify-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            جاري التحميل...
          </div>
        ) : filteredMedia.length === 0 ? (
          <div className="p-12 text-center text-text-muted">{searchQuery ? "لا توجد نتائج" : "لا توجد مرئيات بعد"}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 dark:bg-background-alt border-b border-border">
                <tr>
                  <th className="text-right px-6 py-4 text-sm font-bold text-foreground dark:text-white">المرئية</th>
                  <th className="text-right px-6 py-4 text-sm font-bold text-foreground dark:text-white">النوع</th>
                  <th className="text-right px-6 py-4 text-sm font-bold text-foreground dark:text-white">المشاهدات</th>
                  <th className="text-right px-6 py-4 text-sm font-bold text-foreground dark:text-white">الحالة</th>
                  <th className="text-right px-6 py-4 text-sm font-bold text-foreground dark:text-white">نشط</th>
                  <th className="text-right px-6 py-4 text-sm font-bold text-foreground dark:text-white">التاريخ</th>
                  <th className="text-center px-6 py-4 text-sm font-bold text-foreground dark:text-white">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredMedia.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/50 dark:hover:bg-background-alt/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          {item.type === "video" ? (
                            <Video className="h-5 w-5 text-primary" />
                          ) : (
                            <Music className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-foreground dark:text-white line-clamp-1">{item.title}</p>
                          <p className="text-xs text-text-muted mt-1 line-clamp-1">{item.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        {item.type === "video" ? "فيديو" : "صوتي"} - {item.source}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted">{(item.views_count || 0).toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${item.publish_status === "published" ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"}`}
                      >
                        {item.publish_status === "published" ? "منشور" : "مسودة"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Switch
                        checked={item.is_active ?? true}
                        onCheckedChange={() => toggleActive(item.id, item.is_active ?? true)}
                      />
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted">
                      {new Date(item.created_at).toLocaleDateString("ar-EG")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <a
                          href={`/videos/${item.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                        <button
                          onClick={() => openEditDialog(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteMedia(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
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
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" onOpenAutoFocus={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>تعديل المرئية</DialogTitle>
          </DialogHeader>
          <MediaForm onSubmit={handleEditMedia} isEdit />
        </DialogContent>
      </Dialog>
    </div>
  )
}
