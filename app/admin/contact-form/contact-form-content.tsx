"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import {
  Loader2,
  Mail,
  Eye,
  Trash2,
  Download,
  CheckCircle,
  Settings,
  Search,
  Filter,
  RefreshCw,
  MailOpen,
} from "lucide-react"
import Link from "next/link"

interface Submission {
  id: string
  form_data: Record<string, string>
  is_read: boolean
  submitted_at: string
}

export default function ContactFormContent() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "unread" | "read">("all")
  const supabase = createClient()

  useEffect(() => {
    loadSubmissions()
  }, [])

  useEffect(() => {
    let result = submissions

    // Filter by status
    if (filterStatus === "unread") {
      result = result.filter((s) => !s.is_read)
    } else if (filterStatus === "read") {
      result = result.filter((s) => s.is_read)
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (s) =>
          (s.form_data.name || "").toLowerCase().includes(term) ||
          (s.form_data.email || "").toLowerCase().includes(term) ||
          (s.form_data.subject || "").toLowerCase().includes(term) ||
          (s.form_data.message || "").toLowerCase().includes(term),
      )
    }

    setFilteredSubmissions(result)
  }, [submissions, searchTerm, filterStatus])

  async function loadSubmissions() {
    setLoading(true)
    const { data } = await supabase.from("contact_submissions").select("*").order("submitted_at", { ascending: false })

    if (data) {
      setSubmissions(data)
      setFilteredSubmissions(data)
    }
    setLoading(false)
  }

  async function markAsRead(id: string) {
    await supabase.from("contact_submissions").update({ is_read: true }).eq("id", id)
    loadSubmissions()
  }

  async function markAllAsRead() {
    const unreadIds = submissions.filter((s) => !s.is_read).map((s) => s.id)
    if (unreadIds.length === 0) return

    for (const id of unreadIds) {
      await supabase.from("contact_submissions").update({ is_read: true }).eq("id", id)
    }
    loadSubmissions()
  }

  async function deleteSubmission(id: string) {
    if (!confirm("هل أنت متأكد من حذف هذه الرسالة؟")) return
    await supabase.from("contact_submissions").delete().eq("id", id)
    setSelectedSubmission(null)
    loadSubmissions()
  }

  async function deleteAllRead() {
    const readIds = submissions.filter((s) => s.is_read).map((s) => s.id)
    if (readIds.length === 0) return
    if (!confirm(`هل أنت متأكد من حذف ${readIds.length} رسالة مقروءة؟`)) return

    for (const id of readIds) {
      await supabase.from("contact_submissions").delete().eq("id", id)
    }
    setSelectedSubmission(null)
    loadSubmissions()
  }

  function exportCSV() {
    const headers = ["الاسم", "البريد", "الموضوع", "الرسالة", "التاريخ", "الحالة"]
    const rows = filteredSubmissions.map((s) => [
      `"${(s.form_data.name || "").replace(/"/g, '""')}"`,
      `"${(s.form_data.email || "").replace(/"/g, '""')}"`,
      `"${(s.form_data.subject || "").replace(/"/g, '""')}"`,
      `"${(s.form_data.message || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
      `"${new Date(s.submitted_at).toLocaleDateString("ar-EG")}"`,
      `"${s.is_read ? "مقروءة" : "غير مقروءة"}"`,
    ])

    // Add BOM for UTF-8 encoding to properly display Arabic in Excel
    const BOM = "\uFEFF"
    const csv = BOM + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `contact-messages-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(link.href)
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
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground dark:text-white font-serif flex items-center gap-3">
            <Mail className="h-8 w-8 text-primary" />
            رسائل التواصل
          </h1>
          <p className="text-text-muted mt-1">إدارة الرسائل الواردة من نموذج التواصل</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" onClick={loadSubmissions}>
            <RefreshCw className="h-4 w-4 ml-2" />
            تحديث
          </Button>
          <Link href="/admin/contact-form/settings">
            <Button variant="outline">
              <Settings className="h-4 w-4 ml-2" />
              إعدادات النموذج
            </Button>
          </Link>
          <Button variant="outline" onClick={exportCSV} disabled={filteredSubmissions.length === 0}>
            <Download className="h-4 w-4 ml-2" />
            تصدير CSV
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-2xl font-bold text-primary">{submissions.length}</p>
          <p className="text-sm text-text-muted">إجمالي الرسائل</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-2xl font-bold text-blue-600">{submissions.filter((s) => !s.is_read).length}</p>
          <p className="text-sm text-text-muted">غير مقروءة</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-2xl font-bold text-green-600">{submissions.filter((s) => s.is_read).length}</p>
          <p className="text-sm text-text-muted">مقروءة</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-2xl font-bold text-gray-600">
            {
              submissions.filter((s) => {
                const date = new Date(s.submitted_at)
                const today = new Date()
                return date.toDateString() === today.toDateString()
              }).length
            }
          </p>
          <p className="text-sm text-text-muted">اليوم</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <Input
            placeholder="بحث في الرسائل..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("all")}
          >
            <Filter className="h-4 w-4 ml-1" />
            الكل
          </Button>
          <Button
            variant={filterStatus === "unread" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("unread")}
          >
            غير مقروءة
          </Button>
          <Button
            variant={filterStatus === "read" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("read")}
          >
            مقروءة
          </Button>
        </div>

        {submissions.filter((s) => !s.is_read).length > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <MailOpen className="h-4 w-4 ml-1" />
            تحديد الكل كمقروء
          </Button>
        )}

        {submissions.filter((s) => s.is_read).length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={deleteAllRead}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 bg-transparent"
          >
            <Trash2 className="h-4 w-4 ml-1" />
            حذف المقروءة
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submissions List */}
        <div className="lg:col-span-1 bg-card rounded-2xl border border-border overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="font-bold text-foreground dark:text-white">الرسائل ({filteredSubmissions.length})</h3>
          </div>
          {filteredSubmissions.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <Mail className="h-8 w-8 mx-auto mb-2 text-text-muted opacity-50" />
              <p className="text-sm text-text-muted">
                {searchTerm || filterStatus !== "all" ? "لا توجد نتائج" : "لا توجد رسائل"}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
              {filteredSubmissions.map((submission) => (
                <button
                  key={submission.id}
                  onClick={() => {
                    setSelectedSubmission(submission)
                    if (!submission.is_read) markAsRead(submission.id)
                  }}
                  className={`w-full text-right px-4 py-3 hover:bg-background transition-colors ${
                    selectedSubmission?.id === submission.id ? "bg-primary/5" : ""
                  } ${!submission.is_read ? "bg-primary/10" : ""}`}
                >
                  <div className="flex items-start gap-2">
                    {!submission.is_read && <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">
                        {submission.form_data.name || "بدون اسم"}
                      </p>
                      <p className="text-xs text-text-muted truncate">{submission.form_data.subject}</p>
                      <p className="text-xs text-text-muted">
                        {new Date(submission.submitted_at).toLocaleDateString("ar-EG")}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Submission Detail */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border">
          {selectedSubmission ? (
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {selectedSubmission.is_read && <CheckCircle className="h-5 w-5 text-green-500" />}
                  <h3 className="text-lg font-bold text-foreground dark:text-white">تفاصيل الرسالة</h3>
                </div>
                <Button variant="ghost" size="icon" onClick={() => deleteSubmission(selectedSubmission.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background rounded-xl p-4">
                    <p className="text-xs text-text-muted mb-1">الاسم</p>
                    <p className="font-medium text-foreground">{selectedSubmission.form_data.name}</p>
                  </div>
                  <div className="bg-background rounded-xl p-4">
                    <p className="text-xs text-text-muted mb-1">البريد الإلكتروني</p>
                    <p className="font-medium text-foreground" dir="ltr">
                      {selectedSubmission.form_data.email}
                    </p>
                  </div>
                </div>
                <div className="bg-background rounded-xl p-4">
                  <p className="text-xs text-text-muted mb-1">الموضوع</p>
                  <p className="font-medium text-foreground">{selectedSubmission.form_data.subject}</p>
                </div>
                <div className="bg-background rounded-xl p-4">
                  <p className="text-xs text-text-muted mb-1">الرسالة</p>
                  <p className="text-foreground whitespace-pre-wrap">{selectedSubmission.form_data.message}</p>
                </div>
                <div className="text-xs text-text-muted">
                  تم الإرسال في:{" "}
                  {new Date(selectedSubmission.submitted_at).toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <Eye className="h-12 w-12 mx-auto mb-4 text-text-muted opacity-50" />
                <p className="text-text-muted">اختر رسالة لعرض التفاصيل</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
