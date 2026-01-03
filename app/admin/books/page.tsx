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

interface Book {
  id: string
  title: string
  author: string
  description: string
  cover_image_path: string | null
  pdf_file_path: string | null
  publish_status: string
  download_count: number
  created_at: string
}

const ITEMS_PER_PAGE = 10

export default function ManageBooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    author: "الشيخ السيد مراد",
    description: "",
    cover_image_path: "",
    pdf_file_path: "",
    publish_status: "draft",
  })
  const [submitting, setSubmitting] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  const supabase = createClient()

  const fetchBooks = async () => {
    setLoading(true)
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE - 1

    const { data, count, error } = await supabase
      .from("books")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(start, end)

    if (!error) {
      setBooks(data || [])
      setTotalCount(count || 0)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchBooks()
  }, [currentPage])

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const { error } = await supabase.from("books").insert({
      title: formData.title,
      author: formData.author,
      description: formData.description,
      cover_image_path: formData.cover_image_path || null,
      pdf_file_path: formData.pdf_file_path || null,
      publish_status: formData.publish_status,
    })

    if (!error) {
      setIsAddModalOpen(false)
      resetForm()
      fetchBooks()
    } else {
      alert("حدث خطأ أثناء إضافة الكتاب: " + error.message)
    }
    setSubmitting(false)
  }

  const handleEditBook = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingBook) return
    setSubmitting(true)

    const { error } = await supabase
      .from("books")
      .update({
        title: formData.title,
        author: formData.author,
        description: formData.description,
        cover_image_path: formData.cover_image_path || null,
        pdf_file_path: formData.pdf_file_path || null,
        publish_status: formData.publish_status,
      })
      .eq("id", editingBook.id)

    if (!error) {
      setIsEditModalOpen(false)
      setEditingBook(null)
      fetchBooks()
    }
    setSubmitting(false)
  }

  const handleDeleteBook = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الكتاب؟")) return
    const { error } = await supabase.from("books").delete().eq("id", id)
    if (!error) fetchBooks()
  }

  const openEditModal = (book: Book) => {
    setEditingBook(book)
    setFormData({
      title: book.title,
      author: book.author,
      description: book.description,
      cover_image_path: book.cover_image_path || "",
      pdf_file_path: book.pdf_file_path || "",
      publish_status: book.publish_status,
    })
    setIsEditModalOpen(true)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      author: "الشيخ السيد مراد",
      description: "",
      cover_image_path: "",
      pdf_file_path: "",
      publish_status: "draft",
    })
  }

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const totalDownloads = books.reduce((acc, b) => acc + (b.download_count || 0), 0)
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-secondary font-medium mb-1">
            <span>المكتبة العلمية</span>
            <span className="material-icons-outlined text-[10px]">arrow_back_ios</span>
            <span>الإدارة</span>
          </div>
          <h1 className="text-3xl font-bold text-primary dark:text-white flex items-center gap-3 font-serif">
            <span className="material-icons-outlined text-4xl">menu_book</span>
            إدارة الكتب والمؤلفات
          </h1>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl shadow-md flex items-center gap-2 font-bold group">
              <span className="material-icons-outlined group-hover:rotate-90 transition-transform">add</span>
              إضافة كتاب جديد
            </Button>
          </DialogTrigger>
          <DialogContent
            className="sm:max-w-3xl bg-card dark:bg-card max-h-[90vh] overflow-y-auto"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-primary dark:text-white">إضافة كتاب جديد</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddBook} className="space-y-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2 space-y-2">
                  <Label>عنوان الكتاب</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="مثال: فقه المعاملات المعاصرة"
                    className="bg-muted dark:bg-background-alt"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>المؤلف</Label>
                  <Input
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="اسم المؤلف"
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
                      <SelectValue placeholder="اختر الحالة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">مسودة</SelectItem>
                      <SelectItem value="published">منشور</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FileUpload
                  accept="image/*"
                  folder="books/covers"
                  label="غلاف الكتاب"
                  onUploadComplete={(path) => setFormData({ ...formData, cover_image_path: path })}
                  currentFile={formData.cover_image_path}
                />
                <FileUpload
                  accept=".pdf,application/pdf"
                  folder="books/pdfs"
                  label="ملف PDF"
                  onUploadComplete={(path) => setFormData({ ...formData, pdf_file_path: path })}
                  currentFile={formData.pdf_file_path}
                />
              </div>

              <div className="space-y-2">
                <Label>وصف الكتاب</Label>
                <RichTextEditor
                  content={formData.description}
                  onChange={(html) => setFormData({ ...formData, description: html })}
                  placeholder="نبذة عن محتوى الكتاب..."
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
                  {submitting ? "جاري الحفظ..." : "حفظ الكتاب"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card dark:bg-card p-6 rounded-2xl shadow-soft border border-border flex items-center justify-between">
          <div>
            <span className="block text-text-muted dark:text-gray-400 text-sm mb-1">إجمالي الكتب</span>
            <span className="text-3xl font-bold text-primary dark:text-white">{totalCount}</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-primary dark:text-green-400">
            <span className="material-icons-outlined">library_books</span>
          </div>
        </div>
        <div className="bg-card dark:bg-card p-6 rounded-2xl shadow-soft border border-border flex items-center justify-between">
          <div>
            <span className="block text-text-muted dark:text-gray-400 text-sm mb-1">إجمالي التحميلات</span>
            <span className="text-3xl font-bold text-secondary">{totalDownloads.toLocaleString()}</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-yellow-50 dark:bg-yellow-900/30 flex items-center justify-center text-secondary">
            <span className="material-icons-outlined">cloud_download</span>
          </div>
        </div>
        <div className="bg-card dark:bg-card p-6 rounded-2xl shadow-soft border border-border flex items-center justify-between">
          <div>
            <span className="block text-text-muted dark:text-gray-400 text-sm mb-1">مسودات</span>
            <span className="text-3xl font-bold text-gray-600 dark:text-gray-300">
              {books.filter((b) => b.publish_status === "draft").length}
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300">
            <span className="material-icons-outlined">edit_note</span>
          </div>
        </div>
      </div>

      {/* Books Table */}
      <div className="bg-card dark:bg-card rounded-3xl shadow-soft border border-border overflow-hidden">
        <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/50 dark:bg-background-alt/50">
          <h2 className="font-bold text-xl text-primary dark:text-white">قائمة الكتب ({totalCount})</h2>
          <div className="relative">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-10 py-2 rounded-lg w-64 bg-card dark:bg-card"
              placeholder="بحث عن كتاب..."
            />
            <span className="material-icons-outlined absolute right-3 top-2.5 text-text-muted text-lg">search</span>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-text-muted">جاري التحميل...</div>
        ) : filteredBooks.length === 0 ? (
          <div className="p-12 text-center text-text-muted">
            {searchQuery ? "لا توجد نتائج للبحث" : "لا توجد كتب بعد"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-muted/50 dark:bg-background-alt text-xs font-bold text-text-muted dark:text-gray-400 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 w-16">#</th>
                  <th className="px-6 py-4">تفاصيل الكتاب</th>
                  <th className="px-6 py-4">الحالة</th>
                  <th className="px-6 py-4">التحميلات</th>
                  <th className="px-6 py-4">تاريخ الإضافة</th>
                  <th className="px-6 py-4 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredBooks.map((book, index) => (
                  <tr
                    key={book.id}
                    className="group hover:bg-muted/50 dark:hover:bg-background-alt/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-text-muted text-sm">{String(index + 1).padStart(2, "0")}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {book.cover_image_path ? (
                          <img
                            src={book.cover_image_path || "/placeholder.svg"}
                            alt={book.title}
                            className="w-12 h-16 rounded object-cover"
                          />
                        ) : (
                          <div className="w-12 h-16 rounded bg-primary/10 flex items-center justify-center">
                            <span className="material-icons-outlined text-primary">menu_book</span>
                          </div>
                        )}
                        <div>
                          <h3 className="font-bold text-foreground dark:text-gray-200 text-sm mb-1 group-hover:text-primary transition-colors">
                            {book.title}
                          </h3>
                          <span className="text-xs text-text-muted dark:text-gray-500">{book.author}</span>
                          {book.pdf_file_path && (
                            <span className="text-xs text-primary mr-2">
                              <span className="material-icons-outlined text-xs align-middle">picture_as_pdf</span> PDF
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${
                          book.publish_status === "published"
                            ? "bg-green-50 dark:bg-green-900/30 text-primary dark:text-green-400"
                            : "bg-yellow-50 dark:bg-yellow-900/30 text-secondary"
                        }`}
                      >
                        {book.publish_status === "published" ? "منشور" : "مسودة"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted dark:text-gray-400">{book.download_count || 0}</td>
                    <td className="px-6 py-4 text-sm text-text-muted dark:text-gray-400">
                      {new Date(book.created_at).toLocaleDateString("ar-EG")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => window.open(`/books/${book.id}`, "_blank")}
                          className="p-2 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                          title="عرض"
                        >
                          <span className="material-icons-outlined text-lg">visibility</span>
                        </button>
                        <button
                          onClick={() => openEditModal(book)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                          title="تعديل"
                        >
                          <span className="material-icons-outlined text-lg">edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteBook(book.id)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
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
        <DialogContent
          className="sm:max-w-3xl bg-card dark:bg-card max-h-[90vh] overflow-y-auto"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-primary dark:text-white">تعديل الكتاب</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditBook} className="space-y-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2 space-y-2">
                <Label>عنوان الكتاب</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-muted dark:bg-background-alt"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>المؤلف</Label>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUpload
                accept="image/*"
                folder="books/covers"
                label="غلاف الكتاب"
                onUploadComplete={(path) => setFormData({ ...formData, cover_image_path: path })}
                currentFile={formData.cover_image_path}
              />
              <FileUpload
                accept=".pdf,application/pdf"
                folder="books/pdfs"
                label="ملف PDF"
                onUploadComplete={(path) => setFormData({ ...formData, pdf_file_path: path })}
                currentFile={formData.pdf_file_path}
              />
            </div>

            <div className="space-y-2">
              <Label>وصف الكتاب</Label>
              <RichTextEditor
                content={formData.description}
                onChange={(html) => setFormData({ ...formData, description: html })}
                placeholder="نبذة عن محتوى الكتاب..."
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
