"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { Loader2, Trash2, Check, CheckCheck, Bell } from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  is_read: boolean
  created_at: string
}

const typeColors = {
  info: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  success: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  warning: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  error: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
}

const typeLabels = {
  info: "معلومة",
  success: "نجاح",
  warning: "تحذير",
  error: "خطأ",
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    loadNotifications()
  }, [])

  async function loadNotifications() {
    setLoading(true)
    const { data } = await supabase.from("notifications").select("*").order("created_at", { ascending: false })

    if (data) {
      setNotifications(data)
    }
    setLoading(false)
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground dark:text-white font-serif">الإشعارات</h1>
          <p className="text-text-muted mt-1">إدارة إشعارات النظام</p>
        </div>
        <Button variant="outline" onClick={markAllAsRead}>
          <CheckCheck className="h-4 w-4 ml-2" />
          تحديد الكل كمقروء
        </Button>
      </div>

      {/* Notifications List */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {notifications.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <Bell className="h-12 w-12 mx-auto mb-4 text-text-muted opacity-50" />
            <h3 className="text-lg font-bold text-foreground mb-2">لا توجد إشعارات</h3>
            <p className="text-text-muted">ستظهر الإشعارات الجديدة هنا</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`px-6 py-4 flex items-start gap-4 ${
                  !notification.is_read ? "bg-primary/5 dark:bg-primary/10" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${typeColors[notification.type]}`}
                >
                  <Bell className="h-5 w-5" />
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
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
