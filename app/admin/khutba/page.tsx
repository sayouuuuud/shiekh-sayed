"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { createClient } from "@/lib/supabase/client"
import { RichTextEditor } from "@/components/admin/rich-text-editor"
import { FileUpload } from "@/components/admin/file-upload"
import { Pagination } from "@/components/admin/pagination"
import { Loader2, Mic, CheckCircle, FileEdit, Eye, Trash2, ExternalLink, Edit } from "lucide-react"

interface Sermon {
  id: string
  title: string
  content: string
  introduction?: string
  main_topic?: string
  conclusion?: string
  audio_file_path?: string
  youtube_url?: string
  media_source?: "youtube" | "local"
  thumbnail_path?: string
  publish_status: string
  is_active: boolean
  views_count: number
  created_at: string
}

const ITEMS_PER_PAGE = 10

export default function ManageKhutbaPage() {
  const [sermons, setSermons] = useState<Sermon[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingSermon, setEditingSermon] = useState<Sermon | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [formData, setFormData] = useState({
    title: "",
    introduction: "",
    main_topic: "",
    conclusion: "",
    audio_file_path: "",
    youtube_url: "",
    media_source: "local" as "youtube" | "local",
    thumbnail_path: "",
    publish_status: "draft",
    is_active: true,
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

  useEffect(() => {
    fetchSermons()
  }, [currentPage])

  const handleAddSermon = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const content = JSON.stringify({
      introduction: formData.introduction,
      main_topic: formData.main_topic,
      conclusion: formData.conclusion,
    })

    const { error } = await supabase.from("sermons").insert({
      title: formData.title,
      content: content,
      audio_file_path: formData.media_source === "local" ? formData.audio_file_path : null,
      youtube_url: formData.media_source === "youtube" ? formData.youtube_url : null,
      media_source: formData.media_source,
      thumbnail_path: formData.thumbnail_path || null,
      publish_status: formData.publish_status,
      is_active: formData.is_active,
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

    const content = JSON.stringify({
      introduction: formData.introduction,
      main_topic: formData.main_topic,
      conclusion: formData.conclusion,
    })

    const { error } = await supabase
      .from("sermons")
      .update({
        title: formData.title,
        content: content,
        audio_file_path: formData.media_source === "local" ? formData.audio_file_path : null,
        youtube_url: formData.media_source === "youtube" ? formData.youtube_url : null,
        media_source: formData.media_source,
        thumbnail_path: formData.thumbnail_path || null,
        publish_status: formData.publish_status,
        is_active: formData.is_active,
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

  const handleBulkDelete = async () => {
    if (!confirm(`هل أنت متأكد من حذف ${selectedItems.length} خطبة؟`)) return
    for (const id of selectedItems) {
      await supabase.from("sermons").delete().eq("id", id)
    }
    setSelectedItems([])
    fetchSermons()
  }

  const toggleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((i) => i !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  const openEditModal = (sermon: Sermon) => {
    setEditingSermon(sermon)

    let introduction = ""
    let main_topic = ""
    let conclusion = ""

    try {
      const parsed = JSON.parse(sermon.content || "{}")
      introduction = parsed.introduction || ""
      main_topic = parsed.main_topic || ""
      conclusion = parsed.conclusion || ""
    } catch {
      main_topic = sermon.content || ""
    }

    setFormData({
      title: sermon.title,
      introduction,
      main_topic,
      conclusion,
      audio_file_path: sermon.audio_file_path || "",
      youtube_url: sermon.youtube_url || "",
      media_source: sermon.media_source || "local",
      thumbnail_path: sermon.thumbnail_path || "",
      publish_status: sermon.publish_status,
      is_active: sermon.is_active ?? true,
    })
    setIsEditModalOpen(true)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      introduction: "",
      main_topic: "",
      conclusion: "",
      audio_file_path: "",
      youtube_url: "",
      media_source: "local",
      thumbnail_path: "",
      publish_status: "draft",
      is_active: true,
    })
  }

  const filteredSermons = sermons.filter((s) => s.title.toLowerCase().includes(searchQuery.toLowerCase()))
  const publishedCount = sermons.filter((s) => s.publish_status === "published").length
  const draftCount = sermons.filter((s) => s.publish_status === "draft").length
  const totalViews = sermons.reduce((acc, s) => acc + (s.views_count || 0), 0)
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  const SermonForm = ({ onSubmit, isEdit = false }: { onSubmit: (e: React.FormEvent) => void; isEdit?: boolean }) => (
    <form onSubmit={onSubmit} className="space-y-6 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>عنوان الخطبة</Label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="مثال: فضل الذكر وأثره على القلب"
            className="bg-muted dark:bg-background-alt"
            required
          />
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

      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
        <div>
          <Label className="text-base">نشط في الموقع</Label>
          <p className="text-sm text-text-muted">إظهار الخطبة في الموقع العام</p>
        </div>
        <Switch
          checked={formData.is_active}
          onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-lg font-semibold text-primary">المقدمة</Label>
        <RichTextEditor
          content={formData.introduction}
          onChange={(html) => setFormData({ ...formData, introduction: html })}
          placeholder="اكتب مقدمة الخطبة..."
        />
      </div>

      <div className="space-y-2">
        <Label className="text-lg font-semibold text-primary">الموضوع الرئيسي</Label>
        <RichTextEditor
          content={formData.main_topic}
          onChange={(html) => setFormData({ ...formData, main_topic: html })}
          placeholder="اكتب موضوع الخطبة..."
        />
      </div>

      <div className="space-y-2">
        <Label className="text-lg font-semibold text-primary">الخاتمة</Label>
        <RichTextEditor
          content={formData.conclusion}
          onChange={(html) => setFormData({ ...formData, conclusion: html })}
          placeholder="اكتب خاتمة الخطبة..."
        />
      </div>

      <div className="space-y-4 p-4 bg-muted/50 rounded-xl">
        <Label className="text-lg font-semibold">مصدر الصوت</Label>
        <RadioGroup
          value={formData.media_source}
          onValueChange={(value: "youtube" | "local") => setFormData({ ...formData, media_source: value })}
          className="flex gap-6"
        >
          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="local" id="local" />
            <Label htmlFor="local" className="cursor-pointer">
              ملف محلي
            </Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="youtube" id="youtube" />
            <Label htmlFor="youtube" className="cursor-pointer">
              رابط يوتيوب
            </Label>
          </div>
        </RadioGroup>

        {formData.media_source === "local" && (
          <FileUpload
            accept="audio/*"
            folder="sermons"
            label="ملف الخطبة الصوتي"
            onUploadComplete={(path) => setFormData({ ...formData, audio_file_path: path })}
            currentFile={formData.audio_file_path}
          />
        )}

        {formData.media_source === "youtube" && (
          <div className="space-y-2">
            <Label>رابط يوتيوب</Label>
            <Input
              value={formData.youtube_url}
              onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
              placeholder="https://youtube.com/watch?v=..."
              dir="ltr"
            />
          </div>
        )}
      </div>

      <FileUpload
        accept="image/*"
        folder="thumbnails"
        label="الصورة المصغرة"
        onUploadComplete={(path) => setFormData({ ...formData, thumbnail_path: path })}
        currentFile={formData.thumbnail_path}
      />

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
          ) : (
            "حفظ الخطبة"
          )}
        </Button>
      </div>
    </form>
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary dark:text-white flex items-center gap-3 font-serif">
            <Mic className="h-8 w-8 text-primary" />
            إدارة الخطب المنبرية
          </h1>
          <p className="text-text-muted dark:text-gray-400 mt-2">إضافة وتعديل الخطب والمواعظ</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-bold">
              <span className="material-icons-outlined ml-2">add_circle</span>
              إضافة خطبة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl bg-card max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-primary dark:text-white">إضافة خطبة جديدة</DialogTitle>
            </DialogHeader>
            <SermonForm onSubmit={handleAddSermon} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card p-6 rounded-xl border border-border flex items-center justify-between">
          <div>
            <p className="text-sm text-text-muted mb-1">إجمالي الخطب</p>
            <h3 className="text-3xl font-bold text-foreground dark:text-white">{totalCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
            <Mic className="h-6 w-6 text-primary" />
          </div>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border flex items-center justify-between">
          <div>
            <p className="text-sm text-text-muted mb-1">المنشورة</p>
            <h3 className="text-3xl font-bold text-green-600">{publishedCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border flex items-center justify-between">
          <div>
            <p className="text-sm text-text-muted mb-1">المسودات</p>
            <h3 className="text-3xl font-bold text-yellow-600">{draftCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-yellow-50 dark:bg-yellow-900/20 flex items-center justify-center">
            <FileEdit className="h-6 w-6 text-yellow-600" />
          </div>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border flex items-center justify-between">
          <div>
            <p className="text-sm text-text-muted mb-1">المشاهدات</p>
            <h3 className="text-3xl font-bold text-blue-600">{totalViews.toLocaleString()}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
            <Eye className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-card p-4 rounded-xl border border-border flex flex-col md:flex-row items-center gap-4">
        <div className="relative w-full md:w-1/3">
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-muted">
            <span className="material-icons-outlined">search</span>
          </span>
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 bg-muted dark:bg-background-alt"
            placeholder="ابحث عن خطبة..."
          />
        </div>
        {selectedItems.length > 0 && (
          <Button variant="destructive" onClick={handleBulkDelete}>
            <Trash2 className="h-4 w-4 ml-2" />
            حذف المحدد ({selectedItems.length})
          </Button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredSermons.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-xl border border-border">
          <Mic className="h-12 w-12 mx-auto mb-4 text-text-muted opacity-50" />
          <h3 className="text-lg font-bold text-foreground mb-2">
            {searchQuery ? "لا توجد نتائج للبحث" : "لا توجد خطب بعد"}
          </h3>
          <p className="text-text-muted">ابدأ بإضافة خطبة جديدة</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredSermons.map((sermon) => (
            <div
              key={sermon.id}
              className="bg-card p-4 rounded-xl border border-border flex flex-col md:flex-row items-center gap-6 relative overflow-hidden"
            >
              <div
                className={`absolute right-0 top-0 bottom-0 w-1 ${sermon.publish_status === "published" ? "bg-green-500" : "bg-yellow-500"}`}
              ></div>
              <input
                type="checkbox"
                checked={selectedItems.includes(sermon.id)}
                onChange={() => toggleSelectItem(sermon.id)}
                className="h-5 w-5 rounded border-border text-primary focus:ring-primary"
              />
              {sermon.thumbnail_path ? (
                <img
                  src={sermon.thumbnail_path || "/placeholder.svg"}
                  alt={sermon.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mic className="h-6 w-6 text-primary" />
                </div>
              )}
              <div className="flex-grow text-center md:text-right">
                <h3 className="text-lg font-bold text-foreground dark:text-white">{sermon.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mt-2">
                  <span className="flex items-center gap-1">
                    <span className="material-icons-outlined text-base">calendar_today</span>
                    {new Date(sermon.created_at).toLocaleDateString("ar-EG")}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-icons-outlined text-base">visibility</span>
                    {sermon.views_count || 0}
                  </span>
                  {sermon.audio_file_path && (
                    <span className="flex items-center gap-1 text-primary">
                      <span className="material-icons-outlined text-base">audiotrack</span>
                      صوتي
                    </span>
                  )}
                  {sermon.youtube_url && (
                    <span className="flex items-center gap-1 text-red-500">
                      <span className="material-icons-outlined text-base">smart_display</span>
                      يوتيوب
                    </span>
                  )}
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${sermon.publish_status === "published" ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"}`}
                  >
                    {sermon.publish_status === "published" ? "منشور" : "مسودة"}
                  </span>
                  {!sermon.is_active && (
                    <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                      غير نشط
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => window.open(`/khutba/${sermon.id}`, "_blank")}>
                  <ExternalLink className="h-4 w-4 text-text-muted" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => openEditModal(sermon)}>
                  <Edit className="h-4 w-4 text-blue-600" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteSermon(sermon.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={totalCount}
        itemsPerPage={ITEMS_PER_PAGE}
      />

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-4xl bg-card max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-primary dark:text-white">تعديل الخطبة</DialogTitle>
          </DialogHeader>
          <SermonForm onSubmit={handleEditSermon} isEdit />
        </DialogContent>
      </Dialog>
    </div>
  )
}
