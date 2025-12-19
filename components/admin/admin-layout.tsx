"use client"

import type React from "react"
import { useEffect } from "react"
import { AdminSidebar } from "./admin-sidebar"
import { AdminHeader } from "./admin-header"
import { useStore } from "@/lib/store-context"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { setIsAdminPage } = useStore()

  // This ensures notification sounds only play in admin panel
  useEffect(() => {
    setIsAdminPage(true)
    return () => setIsAdminPage(false)
  }, [setIsAdminPage])

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="ml-64 min-h-screen flex flex-col">
        <AdminHeader />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
