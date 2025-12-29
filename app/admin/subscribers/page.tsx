"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { Pagination } from "@/components/admin/pagination"

interface Subscriber {
  id: string
  email: string
  subscribed_at: string
  active: boolean
}

const ITEMS_PER_PAGE = 20

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [exporting, setExporting] = useState(false)

  const supabase = createClient()

  const fetchSubscribers = async () => {
    setLoading(true)
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE - 1

    const { data, count, error } = await supabase
      .from("subscribers")
      .select("*", { count: "exact" })
      .order("subscribed_at", { ascending: false })
      .range(start, end)

    if (!error) {
      setSubscribers(data || [])
      setTotalCount(count || 0)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchSubscribers()
  }, [currentPage])

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase.from("subscribers").update({ active: !currentStatus }).eq("id", id)
    if (!error) fetchSubscribers()
  }

  const handleDeleteSubscriber = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المشترك؟")) return
    const { error } = await supabase.from("subscribers").delete().eq("id", id)
    if (!error) fetchSubscribers()
  }

  const handleExportCSV = async () => {
    setExporting(true)
    try {
      // Fetch all subscribers for export
      const { data: allSubscribers, error } = await supabase
        .from("subscribers")
        .select("email, subscribed_at, active")
        .order("subscribed_at", { ascending: false })

      if (error || !allSubscribers || allSubscribers.length === 0) {
        alert("لا يوجد مشتركون للتصدير")
        return
      }

      // Generate CSV content
      const csvHeader = "البريد الإلكتروني,تاريخ الاشتراك,الحالة\n"
      const csvRows = allSubscribers
        .map((sub) => {
          const date = new Date(sub.subscribed_at).toLocaleDateString("ar-EG")
          const status = sub.active ? "نشط" : "غير نشط"
          return `${sub.email},${date},${status}`
        })
        .join("\n")

      const csvContent = "\uFEFF" + csvHeader + csvRows // Add BOM for Arabic support

      // Create download link
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `subscribers-${new Date().toISOString().split("T")[0]}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error("Export error:", err)
      alert("حدث خطأ أثناء التصدير")
    } finally {
      setExporting(false)
    }
  }

  const filteredSubscribers = subscribers.filter((s) => s.email.toLowerCase().includes(searchQuery.toLowerCase()))
  const activeCount = subscribers.filter((s) => s.active).length
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground dark:text-white flex items-center gap-3">
            <span className="material-icons-outlined text-3xl text-primary">group</span>
            إدارة المشتركين
          </h1>
          <p className="text-sm text-text-muted mt-1">قائمة المشتركين في النشرة البريدية</p>
        </div>
        <Button onClick={handleExportCSV} disabled={exporting} className="bg-primary hover:bg-primary-hover text-white">
          <span className="material-icons-outlined ml-2">{exporting ? "hourglass_empty" : "download"}</span>
          {exporting ? "جاري التصدير..." : "تصدير إلى CSV"}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card p-5 rounded-xl border border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
            <span className="material-icons-outlined">group</span>
          </div>
          <div>
            <p className="text-sm text-text-muted">إجمالي المشتركين</p>
            <p className="text-2xl font-bold text-foreground dark:text-white">{totalCount}</p>
          </div>
        </div>
        <div className="bg-card p-5 rounded-xl border border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600">
            <span className="material-icons-outlined">check_circle</span>
          </div>
          <div>
            <p className="text-sm text-text-muted">نشط</p>
            <p className="text-2xl font-bold text-foreground dark:text-white">{activeCount}</p>
          </div>
        </div>
        <div className="bg-card p-5 rounded-xl border border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-gray-500">
            <span className="material-icons-outlined">cancel</span>
          </div>
          <div>
            <p className="text-sm text-text-muted">غير نشط</p>
            <p className="text-2xl font-bold text-foreground dark:text-white">{totalCount - activeCount}</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-card p-4 rounded-xl border border-border">
        <div className="relative w-full md:w-1/3">
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-muted">
            <span className="material-icons-outlined">search</span>
          </span>
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 bg-muted dark:bg-background-alt"
            placeholder="ابحث بالبريد الإلكتروني..."
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-text-muted">جاري التحميل...</div>
        ) : filteredSubscribers.length === 0 ? (
          <div className="p-12 text-center text-text-muted">
            {searchQuery ? "لا توجد نتائج" : "لا يوجد مشتركون بعد"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 dark:bg-background-alt border-b border-border">
                <tr>
                  <th className="text-right px-6 py-4 text-sm font-bold text-foreground dark:text-white">#</th>
                  <th className="text-right px-6 py-4 text-sm font-bold text-foreground dark:text-white">
                    البريد الإلكتروني
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-bold text-foreground dark:text-white">
                    تاريخ الاشتراك
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-bold text-foreground dark:text-white">الحالة</th>
                  <th className="text-center px-6 py-4 text-sm font-bold text-foreground dark:text-white">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredSubscribers.map((subscriber, index) => (
                  <tr
                    key={subscriber.id}
                    className="hover:bg-muted/50 dark:hover:bg-background-alt/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-text-muted">
                      {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-foreground dark:text-white" dir="ltr">
                        {subscriber.email}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted">
                      {new Date(subscriber.subscribed_at).toLocaleDateString("ar-EG")}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full ${
                          subscriber.active ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {subscriber.active ? "نشط" : "غير نشط"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleToggleActive(subscriber.id, subscriber.active)}
                          className={`p-2 rounded-lg transition-colors ${
                            subscriber.active ? "text-gray-500 hover:bg-gray-50" : "text-green-600 hover:bg-green-50"
                          }`}
                          title={subscriber.active ? "إلغاء التفعيل" : "تفعيل"}
                        >
                          <span className="material-icons-outlined text-lg">
                            {subscriber.active ? "toggle_off" : "toggle_on"}
                          </span>
                        </button>
                        <button
                          onClick={() => handleDeleteSubscriber(subscriber.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="حذف"
                        >
                          <span className="material-icons-outlined text-lg">delete</span>
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
    </div>
  )
}
