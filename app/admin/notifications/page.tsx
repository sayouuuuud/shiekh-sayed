"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { Loader2, Trash2, Check, CheckCheck, Bell, MessageSquare, UserPlus, RefreshCw } from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error" | "contact" | "subscriber"
  is_read: boolean
  created_at: string
  source_id?: string
  source_type?: string
}

const typeColors = {
  info: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  success: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  warning: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  error: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  contact: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  subscriber: "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400",
}

const typeLabels = {
  info: "معلومة",
  success: "نجاح",
  warning: "تحذير",
  error: "خطأ",
  contact: "رسالة تواصل",
  subscriber: "مشترك جديد",
}

const typeIcons = {
  info: Bell,
  success: Check,
  warning: Bell,
  error: Bell,
  contact: MessageSquare,
  subscriber: UserPlus,
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const supabase = createClient()

  const loadNotifications = useCallback(async () => {
    const { data } = await supabase.from("notifications").select("*").order("created_at", { ascending: false })

    if (data) {
      setNotifications(data)
    }
  }, [supabase])

  async function checkNewContactMessages() {
    try {
      // Get unread contact messages that don't have notifications yet
      const { data: messages } = await supabase
        .from("contact_messages")
        .select("id, name, subject, created_at")
        .eq("read", false)

      if (!messages || messages.length === 0) return

      // Check which ones already have notifications
      const { data: existingNotifications } = await supabase
        .from("notifications")
        .select("source_id")
        .eq("source_type", "contact")
        .in(
          "source_id",
          messages.map((m) => m.id),
        )

      const existingIds = new Set(existingNotifications?.map((n) => n.source_id) || [])

      // Create notifications for new messages
      const newNotifications = messages
        .filter((m) => !existingIds.has(m.id))
        .map((m) => ({
          title: "رسالة تواصل جديدة",
          message: `رسالة من ${m.name || "زائر"}: ${m.subject || "بدون موضوع"}`,
          type: "contact" as const,
          is_read: false,
          source_id: m.id,
          source_type: "contact",
        }))

      if (newNotifications.length > 0) {
        await supabase.from("notifications").insert(newNotifications)
      }
    } catch (error) {
      console.error("[v0] Error checking contact messages:", error)
    }
  }

  async function checkNewSubscribers() {
    try {
      // Get recent subscribers (last 24 hours)
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      const { data: subscribers } = await supabase
        .from("subscribers")
        .select("id, whatsapp, telegram, created_at")
        .gte("created_at", oneDayAgo)

      if (!subscribers || subscribers.length === 0) return

      // Check which ones already have notifications
      const { data: existingNotifications } = await supabase
        .from("notifications")
        .select("source_id")
        .eq("source_type", "subscriber")
        .in(
          "source_id",
          subscribers.map((s) => s.id),
        )

      const existingIds = new Set(existingNotifications?.map((n) => n.source_id) || [])

      // Create notifications for new subscribers
      const newNotifications = subscribers
        .filter((s) => !existingIds.has(s.id))
        .map((s) => ({
          title: "مشترك جديد",
          message: `انضم مشترك جديد: ${s.whatsapp || s.telegram || "بدون رقم"}`,
          type: "subscriber" as const,
          is_read: false,
          source_id: s.id,
          source_type: "subscriber",
        }))

      if (newNotifications.length > 0) {
        await supabase.from("notifications").insert(newNotifications)
      }
    } catch (error) {
      console.error("[v0] Error checking subscribers:", error)
    }
  }

  useEffect(() => {
    async function init() {
      setLoading(true)
      await checkNewContactMessages()
      await checkNewSubscribers()
      await loadNotifications()
      setLoading(false)
    }
    init()
  }, [loadNotifications])

  async function handleRefresh() {
    setRefreshing(true)
    await checkNewContactMessages()
    await checkNewSubscribers()
    await loadNotifications()
    setRefreshing(false)
  }

  async function markAsRead(id: string) {
    await supabase.from("notifications").update({ is_read: true }).eq("id", id)
    loadNotifications()
  }

  async function markAllAsRead() {
    await supabase.from("notifications").update({ is_read: true }).eq("is_read", false)
    loadNotifications()
  }

  async function deleteNotification(id: string) {
    await supabase.from("notifications").delete().eq("id", id)
    loadNotifications()
  }

  async function clearAllRead() {
    if (!confirm("هل أنت متأكد من حذف جميع الإشعارات المقروءة؟")) return
    await supabase.from("notifications").delete().eq("is_read", true)
    loadNotifications()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const unreadCount = notifications.filter((n) => !n.is_read).length

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground dark:text-white font-serif flex items-center gap-3">
            <Bell className="h-8 w-8 text-primary" />
            الإشعارات
            {unreadCount > 0 && (
              <span className="text-sm px-2 py-1 rounded-full bg-primary text-white">{unreadCount} جديد</span>
            )}
          </h1>
          <p className="text-text-muted mt-1">إشعارات رسائل التواصل والمشتركين الجدد</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 ml-2 ${refreshing ? "animate-spin" : ""}`} />
            تحديث
          </Button>
          <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <CheckCheck className="h-4 w-4 ml-2" />
            تحديد الكل كمقروء
          </Button>
          <Button
            variant="outline"
            onClick={clearAllRead}
            disabled={notifications.filter((n) => n.is_read).length === 0}
          >
            <Trash2 className="h-4 w-4 ml-2" />
            حذف المقروءة
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">
              {notifications.filter((n) => n.type === "contact").length}
            </p>
            <p className="text-sm text-text-muted">رسائل التواصل</p>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
            <UserPlus className="h-6 w-6 text-teal-600 dark:text-teal-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">
              {notifications.filter((n) => n.type === "subscriber").length}
            </p>
            <p className="text-sm text-text-muted">مشتركين جدد</p>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <Bell className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{unreadCount}</p>
            <p className="text-sm text-text-muted">غير مقروءة</p>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {notifications.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <Bell className="h-12 w-12 mx-auto mb-4 text-text-muted opacity-50" />
            <h3 className="text-lg font-bold text-foreground mb-2">لا توجد إشعارات</h3>
            <p className="text-text-muted">ستظهر الإشعارات الجديدة هنا عند وصول رسائل تواصل أو اشتراك مشتركين جدد</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {notifications.map((notification) => {
              const IconComponent = typeIcons[notification.type] || Bell
              return (
                <div
                  key={notification.id}
                  className={`px-6 py-4 flex items-start gap-4 ${
                    !notification.is_read ? "bg-primary/5 dark:bg-primary/10" : ""
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${typeColors[notification.type]}`}
                  >
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-foreground">{notification.title}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[notification.type]}`}>
                        {typeLabels[notification.type]}
                      </span>
                      {!notification.is_read && <span className="w-2 h-2 rounded-full bg-primary"></span>}
                    </div>
                    <p className="text-sm text-text-muted">{notification.message}</p>
                    <p className="text-xs text-text-muted mt-2">
                      {new Date(notification.created_at).toLocaleDateString("ar-EG", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!notification.is_read && (
                      <Button variant="ghost" size="icon" onClick={() => markAsRead(notification.id)}>
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => deleteNotification(notification.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
