"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { RichTextEditor } from "@/components/admin/rich-text-editor"
import { FileUpload } from "@/components/admin/file-upload"
import { Pagination } from "@/components/admin/pagination"

interface Article {
  id: string
  title: string
  content: string
  author: string
  featured_image?: string
  publish_status: string
  views_count: number
  created_at: string
}

const ITEMS_PER_PAGE = 10

export default function ManageArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "الشيخ السيد مراد",
    featured_image: "",
    publish_status: "draft",
  })
  const [submitting, setSubmitting] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  const supabase = createClient()

  const fetchArticles = async () => {
    setLoading(true)
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE - 1

    const { data, count, error } = await supabase
      .from("articles")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(start, end)

    if (!error) {
      setArticles(data || [])
      setTotalCount(count || 0)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchArticles()
  }, [currentPage])

  const handleAddArticle = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    const { error } = await supabase.from("articles").insert({
      ...formData,
      featured_image: formData.featured_image || null,
    })
    if (!error) {
      setIsAddModalOpen(false)
      resetForm()
      fetchArticles()
    } else {
      alert("حدث خطأ أثناء الإضافة: " + error.message)
    }
    setSubmitting(false)
  }

  const handleEditArticle = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingArticle) return
    setSubmitting(true)
    const { error } = await supabase
      .from("articles")
      .update({
        ...formData,
        featured_image: formData.featured_image || null,
      })
      .eq("id", editingArticle.id)
    if (!error) {
      setIsEditModalOpen(false)
      setEditingArticle(null)
      fetchArticles()
    }
    setSubmitting(false)
  }

  const handleDeleteArticle = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المقال؟")) return
    const { error } = await supabase.from("articles").delete().eq("id", id)
    if (!error) fetchArticles()
  }

  const openEditModal = (article: Article) => {
    setEditingArticle(article)
    setFormData({
      title: article.title,
      content: article.content,
      author: article.author,
      featured_image: article.featured_image || "",
      publish_status: article.publish_status,
    })
    setIsEditModalOpen(true)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      author: "الشيخ السيد مراد",
      featured_image: "",
      publish_status: "draft",
    })
  }

  const filteredArticles = articles.filter((a) => a.title.toLowerCase().includes(searchQuery.toLowerCase()))
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary dark:text-white flex items-center gap-3 font-serif">
            <span className="material-icons-outlined text-4xl">article</span>
            إدارة المقالات والبحوث
          </h1>
          <p className="text-text-muted dark:text-gray-400 mt-2">إضافة وتعديل المقالات العلمية</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-bold">
              <span className="material-icons-outlined ml-2">add</span>
              إضافة مقال جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-3xl bg-card max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-primary dark:text-white">إضافة مقال جديد</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddArticle} className="space-y-6 mt-4">
              <div className="space-y-2">
                <Label>عنوان المقال</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="عنوان المقال"
                  className="bg-muted dark:bg-background-alt"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>الكاتب</Label>
                  <Input
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
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

              <FileUpload
                accept="image/*"
                folder="articles"
                label="الصورة المميزة"
                onUploadComplete={(path) => setFormData({ ...formData, featured_image: path })}
                currentFile={formData.featured_image}
              />

              <div className="space-y-2">
                <Label>محتوى المقال</Label>
                <RichTextEditor
                  content={formData.content}
                  onChange={(html) => setFormData({ ...formData, content: html })}
                  placeholder="اكتب محتوى المقال هنا..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false)
                    resetForm()
                  }}
                >
                  إلغاء
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary-hover text-white" disabled={submitting}>
                  {submitting ? "جاري الحفظ..." : "نشر المقال"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-2xl border border-border flex items-center justify-between">
          <div>
            <span className="block text-text-muted text-sm mb-1">إجمالي المقالات</span>
            <span className="text-3xl font-bold text-primary dark:text-white">{totalCount}</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
            <span className="material-icons-outlined">article</span>
          </div>
        </div>
        <div className="bg-card p-6 rounded-2xl border border-border flex items-center justify-between">
          <div>
            <span className="block text-text-muted text-sm mb-1">المشاهدات</span>
            <span className="text-3xl font-bold text-secondary">
              {articles.reduce((acc, a) => acc + (a.views_count || 0), 0).toLocaleString()}
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-yellow-50 dark:bg-yellow-900/30 flex items-center justify-center text-secondary">
            <span className="material-icons-outlined">visibility</span>
          </div>
        </div>
        <div className="bg-card p-6 rounded-2xl border border-border flex items-center justify-between">
          <div>
            <span className="block text-text-muted text-sm mb-1">مسودات</span>
            <span className="text-3xl font-bold text-gray-600 dark:text-gray-300">
              {articles.filter((a) => a.publish_status === "draft").length}
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-gray-500">
            <span className="material-icons-outlined">edit_note</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-3xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/50 dark:bg-background-alt/50">
          <h2 className="font-bold text-xl text-primary dark:text-white">قائمة المقالات ({totalCount})</h2>
          <div className="relative">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-10 py-2 rounded-lg w-64 bg-card dark:bg-card"
              placeholder="بحث عن مقال..."
            />
            <span className="material-icons-outlined absolute right-3 top-2.5 text-text-muted text-lg">search</span>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-text-muted">جاري التحميل...</div>
        ) : filteredArticles.length === 0 ? (
          <div className="p-12 text-center text-text-muted">{searchQuery ? "لا توجد نتائج" : "لا توجد مقالات بعد"}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-muted/50 dark:bg-background-alt text-xs font-bold text-text-muted uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">#</th>
                  <th className="px-6 py-4">المقال</th>
                  <th className="px-6 py-4">الكاتب</th>
                  <th className="px-6 py-4">المشاهدات</th>
                  <th className="px-6 py-4">الحالة</th>
                  <th className="px-6 py-4 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredArticles.map((article, index) => (
                  <tr
                    key={article.id}
                    className="group hover:bg-muted/50 dark:hover:bg-background-alt/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-text-muted text-sm">{String(index + 1).padStart(2, "0")}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {article.featured_image ? (
                          <img
                            src={article.featured_image || "/placeholder.svg"}
                            alt=""
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <span className="material-icons-outlined text-primary">article</span>
                          </div>
                        )}
                        <div>
                          <h3 className="font-bold text-foreground dark:text-gray-200 text-sm mb-1">{article.title}</h3>
                          <span className="text-xs text-text-muted">
                            {new Date(article.created_at).toLocaleDateString("ar-EG")}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted">{article.author}</td>
                    <td className="px-6 py-4 text-sm text-text-muted">{article.views_count || 0}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${article.publish_status === "published" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"}`}
                      >
                        {article.publish_status === "published" ? "منشور" : "مسودة"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => window.open(`/articles/${article.id}`, "_blank")}
                          className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                          title="عرض"
                        >
                          <span className="material-icons-outlined text-lg">visibility</span>
                        </button>
                        <button
                          onClick={() => openEditModal(article)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="تعديل"
                        >
                          <span className="material-icons-outlined text-lg">edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteArticle(article.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="حذف"
                        >
                          <span className="material-icons-outlined text-lg">delete_outline</span>
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
            <DialogTitle className="text-lg font-bold text-primary dark:text-white">تعديل المقال</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditArticle} className="space-y-6 mt-4">
            <div className="space-y-2">
              <Label>عنوان المقال</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-muted dark:bg-background-alt"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>الكاتب</Label>
                <Input
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
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

            <FileUpload
              accept="image/*"
              folder="articles"
              label="الصورة المميزة"
              onUploadComplete={(path) => setFormData({ ...formData, featured_image: path })}
              currentFile={formData.featured_image}
            />

            <div className="space-y-2">
              <Label>محتوى المقال</Label>
              <RichTextEditor
                content={formData.content}
                onChange={(html) => setFormData({ ...formData, content: html })}
                placeholder="اكتب محتوى المقال هنا..."
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button variant="outline" type="button" onClick={() => setIsEditModalOpen(false)}>
                إلغاء
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary-hover text-white" disabled={submitting}>
                {submitting ? "جاري الحفظ..." : "حفظ التغييرات"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
