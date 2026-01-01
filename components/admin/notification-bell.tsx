"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Notification {
  id: string
  title: string
  message: string
  type: string
  is_read: boolean
  created_at: string
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const supabase = createClient()

  useEffect(() => {
    loadNotifications()
  }, [])

  async function loadNotifications() {
    const { data, count } = await supabase
      .from("notifications")
      .select("*", { count: "exact" })
      .eq("is_read", false)
      .order("created_at", { ascending: false })
      .limit(5)

    if (data) {
      setNotifications(data)
      setUnreadCount(count || 0)
    }
  }

  async function markAsRead(id: string) {
    await supabase.from("notifications").update({ is_read: true }).eq("id", id)

    loadNotifications()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="px-4 py-3 border-b border-border">
          <h4 className="font-bold text-foreground">الإشعارات</h4>
        </div>
        {notifications.length === 0 ? (
          <div className="px-4 py-8 text-center text-text-muted">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">لا توجد إشعارات جديدة</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className="px-4 py-3 cursor-pointer"
              onClick={() => markAsRead(notification.id)}
            >
              <div>
                <p className="font-medium text-foreground text-sm">{notification.title}</p>
                <p className="text-xs text-text-muted line-clamp-1">{notification.message}</p>
              </div>
            </DropdownMenuItem>
          ))
        )}
        <div className="px-4 py-2 border-t border-border">
          <Link href="/admin/notifications" className="text-sm text-primary hover:underline block text-center">
            عرض الكل
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
