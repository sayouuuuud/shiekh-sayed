"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { Plus, Pencil, Trash2, Users, Eye, EyeOff, Save, X, Upload, ImageIcon, Loader2 } from "lucide-react"
import Image from "next/image"

interface CommunityPage {
  id: string
  title: string
  content: string
  images: string[]
  publish_status: string
  created_at: string
}

export default function CommunityAdminPage() {
  const [pages, setPages] = useState<CommunityPage[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })
  const [uploading, setUploading] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    images: [] as string[],
    publish_status: "draft",
  })

  const supabase = createClient()

  useEffect(() => {
    loadPages()
  }, [])

  async function loadPages() {
    setLoading(true)
    const { data, error } = await supabase.from("community_pages").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error loading pages:", error)
      setMessage({ type: "error", text: "حدث خطأ أثناء تحميل الصفحات: " + error.message })
    } else if (data) {
      setPages(data)
    }
    setLoading(false)
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const fileExt = file.name.split(".").pop()
      const fileName = `community/${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage.from("uploads").upload(fileName, file)

      if (uploadError) throw uploadError

      const {
        data: { publicUrl },
      } = supabase.storage.from("uploads").getPublicUrl(fileName)

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, publicUrl],
      }))

      setMessage({ type: "success", text: "تم رفع الصورة بنجاح" })
    } catch (error: any) {
      console.error("[v0] Upload error:", error)
      setMessage({ type: "error", text: "حدث خطأ أثناء رفع الصورة: " + error.message })
    } finally {
      setUploading(false)
    }
  }

  function removeImage(index: number) {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  async function handleSave() {
    if (!formData.title || !formData.content) {
      setMessage({ type: "error", text: "يرجى ملء العنوان والمحتوى" })
      return
    }

    try {
      const payload = {
        title: formData.title,
        content: formData.content,
        images: formData.images,
        publish_status: formData.publish_status,
      }

      let error
      if (editingId) {
        const result = await supabase.from("community_pages").update(payload).eq("id", editingId)
        error = result.error
      } else {
        const result = await supabase.from("community_pages").insert(payload)
        error = result.error
      }

      if (error) throw error

      setMessage({ type: "success", text: editingId ? "تم تحديث الصفحة بنجاح" : "تم إضافة الصفحة بنجاح" })
      resetForm()
      loadPages()
    } catch (error: any) {
      console.error("[v0] Save error:", error)
      setMessage({ type: "error", text: "حدث خطأ أثناء الحفظ: " + error.message })
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("هل أنت متأكد من حذف هذه الصفحة؟")) return

    const { error } = await supabase.from("community_pages").delete().eq("id", id)
    if (error) {
      setMessage({ type: "error", text: "حدث خطأ أثناء الحذف: " + error.message })
    } else {
      setMessage({ type: "success", text: "تم حذف الصفحة بنجاح" })
      loadPages()
    }
  }

  async function togglePublish(id: string, currentStatus: string) {
    const newStatus = currentStatus === "published" ? "draft" : "published"
    const { error } = await supabase.from("community_pages").update({ publish_status: newStatus }).eq("id", id)
    if (error) {
      setMessage({ type: "error", text: "حدث خطأ أثناء تغيير الحالة" })
    } else {
      loadPages()
    }
  }

  function startEdit(page: CommunityPage) {
    setFormData({
      title: page.title,
      content: page.content,
      images: page.images || [],
      publish_status: page.publish_status,
    })
    setEditingId(page.id)
    setIsAdding(true)
  }

  function resetForm() {
    setFormData({ title: "", content: "", images: [], publish_status: "draft" })
    setEditingId(null)
    setIsAdding(false)
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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold text-foreground dark:text-white">صفحات المجتمع</h1>
          </div>
          <p className="text-text-muted">إدارة صفحات الأنشطة والفعاليات المجتمعية</p>
        </div>
        <Button
          onClick={() => setIsAdding(true)}
          disabled={isAdding}
          className="bg-primary hover:bg-primary-hover text-white"
        >
          <Plus className="h-4 w-4 ml-2" />
          إضافة صفحة جديدة
        </Button>
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

      {/* Add/Edit Form */}
      {isAdding && (
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground dark:text-white">
              {editingId ? "تعديل الصفحة" : "إضافة صفحة جديدة"}
            </h2>
            <Button variant="ghost" size="icon" onClick={resetForm}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>العنوان *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="عنوان الصفحة"
                className="bg-muted dark:bg-background-alt"
              />
            </div>
            <div className="space-y-2">
              <Label>المحتوى *</Label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={8}
                className="bg-muted dark:bg-background-alt resize-none"
                placeholder="محتوى الصفحة..."
              />
            </div>

            <div className="space-y-2">
              <Label>الصور</Label>
              <div className="border-2 border-dashed border-border rounded-xl p-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  disabled={uploading}
                />
                <label htmlFor="image-upload" className="flex flex-col items-center justify-center cursor-pointer py-4">
                  {uploading ? (
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                  ) : (
                    <Upload className="h-8 w-8 text-text-muted mb-2" />
                  )}
                  <span className="text-sm text-text-muted">{uploading ? "جاري الرفع..." : "اضغط لرفع صورة"}</span>
                </label>
              </div>

              {/* Image previews */}
              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {formData.images.map((url, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden border border-border">
                        <Image
                          src={url || "/placeholder.svg"}
                          alt={`صورة ${index + 1}`}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <Label>الحالة:</Label>
              <select
                value={formData.publish_status}
                onChange={(e) => setFormData({ ...formData, publish_status: e.target.value })}
                className="bg-muted dark:bg-background-alt rounded-lg px-3 py-2 border border-border"
              >
                <option value="draft">مسودة</option>
                <option value="published">منشور</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={resetForm}>
              إلغاء
            </Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary-hover text-white">
              <Save className="h-4 w-4 ml-2" />
              {editingId ? "تحديث" : "إضافة"}
            </Button>
          </div>
        </div>
      )}

      {/* Pages List */}
      <div className="grid gap-4">
        {pages.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-2xl border border-border">
            <Users className="h-12 w-12 mx-auto text-text-muted mb-4" />
            <p className="text-text-muted">لا توجد صفحات مجتمعية</p>
          </div>
        ) : (
          pages.map((page) => (
            <div key={page.id} className="bg-card rounded-xl p-4 border border-border flex items-center gap-4">
              {/* Thumbnail */}
              <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                {page.images && page.images.length > 0 ? (
                  <Image
                    src={page.images[0] || "/placeholder.svg"}
                    alt={page.title}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="h-6 w-6 text-text-muted" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      page.publish_status === "published"
                        ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {page.publish_status === "published" ? "منشور" : "مسودة"}
                  </span>
                  {page.images && page.images.length > 0 && (
                    <span className="text-xs text-text-muted">{page.images.length} صورة</span>
                  )}
                </div>
                <h3 className="font-bold text-foreground dark:text-white truncate">{page.title}</h3>
                <p className="text-sm text-text-muted truncate">{page.content.slice(0, 100)}...</p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => togglePublish(page.id, page.publish_status)}
                  title={page.publish_status === "published" ? "إلغاء النشر" : "نشر"}
                >
                  {page.publish_status === "published" ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => startEdit(page)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(page.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
