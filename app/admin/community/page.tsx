"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { Plus, Pencil, Trash2, Users, Eye, EyeOff, Save, X } from "lucide-react"

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
  const [message, setMessage] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    images: "",
    publish_status: "draft",
  })

  const supabase = createClient()

  useEffect(() => {
    loadPages()
  }, [])

  async function loadPages() {
    setLoading(true)
    const { data } = await supabase.from("community_pages").select("*").order("created_at", { ascending: false })

    if (data) setPages(data)
    setLoading(false)
  }

  async function handleSave() {
    if (!formData.title || !formData.content) {
      setMessage("يرجى ملء العنوان والمحتوى")
      return
    }

    try {
      const payload = {
        title: formData.title,
        content: formData.content,
        images: formData.images ? formData.images.split("\n").filter(Boolean) : [],
        publish_status: formData.publish_status,
      }

      if (editingId) {
        await supabase.from("community_pages").update(payload).eq("id", editingId)
        setMessage("تم تحديث الصفحة بنجاح")
      } else {
        await supabase.from("community_pages").insert(payload)
        setMessage("تم إضافة الصفحة بنجاح")
      }

      resetForm()
      loadPages()
    } catch (error) {
      setMessage("حدث خطأ أثناء الحفظ")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("هل أنت متأكد من حذف هذه الصفحة؟")) return

    await supabase.from("community_pages").delete().eq("id", id)
    setMessage("تم حذف الصفحة بنجاح")
    loadPages()
  }

  async function togglePublish(id: string, currentStatus: string) {
    const newStatus = currentStatus === "published" ? "draft" : "published"
    await supabase.from("community_pages").update({ publish_status: newStatus }).eq("id", id)
    loadPages()
  }

  function startEdit(page: CommunityPage) {
    setFormData({
      title: page.title,
      content: page.content,
      images: page.images?.join("\n") || "",
      publish_status: page.publish_status,
    })
    setEditingId(page.id)
    setIsAdding(true)
  }

  function resetForm() {
    setFormData({ title: "", content: "", images: "", publish_status: "draft" })
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
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">صفحات المجتمع</h1>
          </div>
          <p className="text-muted-foreground">إدارة صفحات الأنشطة والفعاليات المجتمعية</p>
        </div>
        <Button onClick={() => setIsAdding(true)} disabled={isAdding}>
          <Plus className="h-4 w-4 ml-2" />
          إضافة صفحة جديدة
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
            <h2 className="text-xl font-bold">{editingId ? "تعديل الصفحة" : "إضافة صفحة جديدة"}</h2>
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
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label>المحتوى *</Label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={8}
                className="bg-muted resize-none"
                placeholder="محتوى الصفحة..."
              />
            </div>
            <div className="space-y-2">
              <Label>روابط الصور (رابط في كل سطر)</Label>
              <Textarea
                value={formData.images}
                onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                rows={3}
                className="bg-muted resize-none"
                dir="ltr"
                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
              />
            </div>
            <div className="flex items-center gap-4">
              <Label>الحالة:</Label>
              <select
                value={formData.publish_status}
                onChange={(e) => setFormData({ ...formData, publish_status: e.target.value })}
                className="bg-muted rounded-lg px-3 py-2 border"
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
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 ml-2" />
              {editingId ? "تحديث" : "إضافة"}
            </Button>
          </div>
        </div>
      )}

      {/* Pages List */}
      <div className="grid gap-4">
        {pages.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-2xl border">
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">لا توجد صفحات مجتمعية</p>
          </div>
        ) : (
          pages.map((page) => (
            <div key={page.id} className="bg-card rounded-xl p-4 border flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      page.publish_status === "published"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {page.publish_status === "published" ? "منشور" : "مسودة"}
                  </span>
                </div>
                <h3 className="font-bold truncate">{page.title}</h3>
                <p className="text-sm text-muted-foreground truncate">{page.content.slice(0, 100)}...</p>
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
