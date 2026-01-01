"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Loader2, Plus, ChevronDown, ChevronRight, Trash2, Edit, FolderTree } from "lucide-react"

interface Category {
  id: string
  name: string
  slug: string
  content_type: string
  description?: string
  parent_category_id?: string | null
  created_at: string
  children?: Category[]
}

const CONTENT_TYPES = [
  { value: "sermon", label: "خطبة" },
  { value: "lesson", label: "درس" },
  { value: "article", label: "مقال" },
  { value: "book", label: "كتاب" },
  { value: "media", label: "مرئيات" },
]

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [flatCategories, setFlatCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    content_type: "sermon",
    description: "",
    parent_category_id: null,
  })

  const supabase = createClient()

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    setLoading(true)
    const { data } = await supabase.from("categories").select("*").order("created_at", { ascending: false })

    if (data) {
      setFlatCategories(data)
      // Build tree structure
      const tree = buildTree(data)
      setCategories(tree)
    }
    setLoading(false)
  }

  function buildTree(items: Category[]): Category[] {
    const map = new Map<string, Category>()
    const roots: Category[] = []

    items.forEach((item) => {
      map.set(item.id, { ...item, children: [] })
    })

    items.forEach((item) => {
      const node = map.get(item.id)!
      if (item.parent_category_id && map.has(item.parent_category_id)) {
        map.get(item.parent_category_id)!.children!.push(node)
      } else {
        roots.push(node)
      }
    })

    return roots
  }

  function toggleExpand(id: string) {
    const newExpanded = new Set(expandedIds)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedIds(newExpanded)
  }

  function handleEdit(category: Category) {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      slug: category.slug,
      content_type: category.content_type,
      description: category.description || "",
      parent_category_id: category.parent_category_id || null,
    })
    setDialogOpen(true)
  }

  function handleNew() {
    setEditingCategory(null)
    setFormData({
      name: "",
      slug: "",
      content_type: "sermon",
      description: "",
      parent_category_id: null,
    })
    setDialogOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const payload = {
      name: formData.name,
      slug: formData.slug,
      content_type: formData.content_type,
      description: formData.description || null,
      parent_category_id: formData.parent_category_id,
    }

    if (editingCategory) {
      await supabase.from("categories").update(payload).eq("id", editingCategory.id)
    } else {
      await supabase.from("categories").insert([payload])
    }

    setDialogOpen(false)
    fetchCategories()
  }

  async function handleDelete(id: string) {
    if (!confirm("هل أنت متأكد من حذف هذا التصنيف؟")) return
    await supabase.from("categories").delete().eq("id", id)
    fetchCategories()
  }

  // Render category tree item
  function renderCategory(category: Category, depth = 0) {
    const hasChildren = category.children && category.children.length > 0
    const isExpanded = expandedIds.has(category.id)

    return (
      <div key={category.id}>
        <div
          className={`flex items-center gap-3 p-3 hover:bg-muted/50 rounded-lg transition-colors ${depth > 0 ? "mr-8" : ""}`}
          style={{ marginRight: depth * 24 }}
        >
          {hasChildren ? (
            <button onClick={() => toggleExpand(category.id)} className="p-1 hover:bg-muted rounded">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-text-muted" />
              ) : (
                <ChevronRight className="h-4 w-4 text-text-muted" />
              )}
            </button>
          ) : (
            <div className="w-6" />
          )}

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground dark:text-white">{category.name}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                {CONTENT_TYPES.find((t) => t.value === category.content_type)?.label}
              </span>
            </div>
            {category.description && <p className="text-xs text-text-muted mt-1">{category.description}</p>}
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={() => handleEdit(category)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" onClick={() => handleDelete(category.id)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="border-r-2 border-border mr-4">
            {category.children!.map((child) => renderCategory(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground dark:text-white flex items-center gap-3">
            <FolderTree className="h-8 w-8 text-primary" />
            التصنيفات
          </h1>
          <p className="text-text-muted mt-2">إدارة تصنيفات المحتوى بنظام هرمي</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleNew} className="bg-primary hover:bg-primary-hover text-white">
              <Plus className="h-4 w-4 ml-2" />
              إضافة تصنيف
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCategory ? "تعديل التصنيف" : "إضافة تصنيف جديد"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>اسم التصنيف</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>الاسم المختصر (Slug)</Label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                  dir="ltr"
                />
              </div>
              <div>
                <Label>الوصف</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                />
              </div>
              <div>
                <Label>نوع المحتوى</Label>
                <Select
                  value={formData.content_type}
                  onValueChange={(value) => setFormData({ ...formData, content_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CONTENT_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>التصنيف الأب (اختياري)</Label>
                <Select
                  value={formData.parent_category_id}
                  onValueChange={(value) =>
                    setFormData({ ...formData, parent_category_id: value === "" ? null : value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="بدون تصنيف أب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={null}>بدون تصنيف أب</SelectItem>
                    {flatCategories
                      .filter((c) => c.id !== editingCategory?.id)
                      .map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1 bg-primary hover:bg-primary-hover text-white">
                  حفظ
                </Button>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="flex-1">
                  إلغاء
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-xl border border-border p-6">
        {categories.length === 0 ? (
          <div className="text-center py-12">
            <FolderTree className="h-12 w-12 mx-auto mb-4 text-text-muted opacity-50" />
            <h3 className="text-lg font-bold text-foreground mb-2">لا توجد تصنيفات</h3>
            <p className="text-text-muted">ابدأ بإضافة تصنيف جديد</p>
          </div>
        ) : (
          <div className="space-y-1">{categories.map((category) => renderCategory(category))}</div>
        )}
      </div>
    </div>
  )
}
