"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { createClient } from "@/lib/supabase/client"

interface Message {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  read: boolean
  created_at: string
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const supabase = createClient()

  const fetchMessages = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
    if (!error) setMessages(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleMarkAsRead = async (id: string) => {
    const { error } = await supabase.from("contact_messages").update({ read: true }).eq("id", id)
    if (!error) fetchMessages()
  }

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الرسالة؟")) return
    const { error } = await supabase.from("contact_messages").delete().eq("id", id)
    if (!error) fetchMessages()
  }

  const openViewDialog = (message: Message) => {
    setSelectedMessage(message)
    setIsViewDialogOpen(true)
    if (!message.read) {
      handleMarkAsRead(message.id)
    }
  }

  const filteredMessages = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.subject && m.subject.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const unreadCount = messages.filter((m) => !m.read).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground dark:text-white flex items-center gap-3">
            <span className="material-icons-outlined text-3xl text-primary">mail</span>
            رسائل التواصل
          </h1>
          <p className="text-sm text-text-muted mt-1">عرض وإدارة الرسائل الواردة من زوار الموقع</p>
        </div>
        {unreadCount > 0 && (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg text-sm font-bold">
            {unreadCount} رسالة غير مقروءة
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card p-5 rounded-xl border border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
            <span className="material-icons-outlined">mail</span>
          </div>
          <div>
            <p className="text-sm text-text-muted">إجمالي الرسائل</p>
            <p className="text-2xl font-bold text-foreground dark:text-white">{messages.length}</p>
          </div>
        </div>
        <div className="bg-card p-5 rounded-xl border border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600">
            <span className="material-icons-outlined">mark_email_unread</span>
          </div>
          <div>
            <p className="text-sm text-text-muted">غير مقروءة</p>
            <p className="text-2xl font-bold text-foreground dark:text-white">{unreadCount}</p>
          </div>
        </div>
        <div className="bg-card p-5 rounded-xl border border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600">
            <span className="material-icons-outlined">mark_email_read</span>
          </div>
          <div>
            <p className="text-sm text-text-muted">مقروءة</p>
            <p className="text-2xl font-bold text-foreground dark:text-white">{messages.length - unreadCount}</p>
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
            placeholder="ابحث عن رسالة..."
          />
        </div>
      </div>

      {/* Messages List */}
      {loading ? (
        <div className="text-center py-12 text-text-muted">جاري التحميل...</div>
      ) : filteredMessages.length === 0 ? (
        <div className="text-center py-12 text-text-muted">
          {searchQuery ? "لا توجد نتائج للبحث" : "لا توجد رسائل بعد"}
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="divide-y divide-border">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`p-4 flex items-start gap-4 hover:bg-muted/50 dark:hover:bg-background-alt/50 transition-colors cursor-pointer ${
                  !message.read ? "bg-primary/5 dark:bg-primary/10" : ""
                }`}
                onClick={() => openViewDialog(message)}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    !message.read ? "bg-primary text-white" : "bg-muted dark:bg-background-alt text-text-muted"
                  }`}
                >
                  <span className="material-icons-outlined text-lg">
                    {!message.read ? "mark_email_unread" : "mail"}
                  </span>
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-bold text-foreground dark:text-white ${!message.read ? "text-primary" : ""}`}>
                      {message.name}
                    </h3>
                    {!message.read && (
                      <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">جديد</span>
                    )}
                  </div>
                  <p className="text-sm text-text-muted truncate">{message.subject || "بدون موضوع"}</p>
                  <p className="text-xs text-text-muted mt-1 line-clamp-1">{message.message}</p>
                </div>
                <div className="text-left shrink-0">
                  <p className="text-xs text-text-muted">{new Date(message.created_at).toLocaleDateString("ar-EG")}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteMessage(message.id)
                      }}
                      className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <span className="material-icons-outlined text-lg">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="material-icons-outlined text-primary">mail</span>
              تفاصيل الرسالة
            </DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-text-muted mb-1">الاسم</p>
                  <p className="font-bold text-foreground dark:text-white">{selectedMessage.name}</p>
                </div>
                <div>
                  <p className="text-sm text-text-muted mb-1">البريد الإلكتروني</p>
                  <p className="font-bold text-foreground dark:text-white" dir="ltr">
                    {selectedMessage.email}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-text-muted mb-1">الموضوع</p>
                <p className="font-bold text-foreground dark:text-white">{selectedMessage.subject || "بدون موضوع"}</p>
              </div>
              <div>
                <p className="text-sm text-text-muted mb-1">الرسالة</p>
                <div className="bg-muted dark:bg-background-alt p-4 rounded-lg">
                  <p className="text-foreground dark:text-white whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>
              <div className="text-sm text-text-muted">
                تاريخ الإرسال: {new Date(selectedMessage.created_at).toLocaleString("ar-EG")}
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  إغلاق
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleDeleteMessage(selectedMessage.id)
                    setIsViewDialogOpen(false)
                  }}
                >
                  <span className="material-icons-outlined text-sm ml-1">delete</span>
                  حذف الرسالة
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
