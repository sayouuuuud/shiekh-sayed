"use client"

import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const pageTitles: Record<string, string> = {
  "/admin": "لوحة التحكم",
  "/admin/khutba": "إدارة الخطب",
  "/admin/dars": "إدارة الدروس",
  "/admin/articles": "إدارة المقالات",
  "/admin/books": "إدارة الكتب",
  "/admin/videos": "إدارة المرئيات",
  "/admin/media": "إدارة المرئيات",
  "/admin/categories": "التصنيفات",
  "/admin/subscribers": "المشتركين",
  "/admin/messages": "الرسائل",
  "/admin/settings": "الإعدادات",
  "/admin/about": "صفحة عن الشيخ",
  "/admin/hero": "إدارة القسم الرئيسي", // Added hero page title
}

export function AdminHeader({ user }: { user: any }) {
  const pathname = usePathname()
  const { logout } = useAuth()
  const title = pageTitles[pathname] || "لوحة التحكم"

  const getInitials = (email?: string) => {
    if (email) {
      return email[0].toUpperCase()
    }
    return "م"
  }

  return (
    <header className="h-16 bg-surface dark:bg-card border-b border-border dark:border-border px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button className="lg:hidden text-foreground dark:text-foreground">
          <span className="material-icons-outlined">menu</span>
        </button>
        <h1 className="text-xl font-bold text-foreground dark:text-white">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-background dark:bg-background-alt rounded-lg px-3 py-2 border border-border dark:border-border">
          <span className="material-icons-outlined text-text-muted text-lg">search</span>
          <input
            type="text"
            placeholder="بحث..."
            className="bg-transparent border-none outline-none text-sm w-40 text-foreground dark:text-foreground placeholder:text-text-muted"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-text-muted dark:text-text-subtext hover:text-foreground dark:hover:text-white transition-colors">
          <span className="material-icons-outlined">notifications</span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Menu with Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
                {getInitials(user?.email)}
              </div>
              <div className="hidden md:block text-right">
                <p className="text-sm font-bold text-foreground dark:text-white">المدير</p>
                <p className="text-xs text-text-muted dark:text-text-subtext">{user?.email || "admin@site.com"}</p>
              </div>
              <span className="material-icons-outlined text-text-muted text-lg hidden md:block">expand_more</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">المدير</p>
              <p className="text-xs text-text-muted">{user?.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <a href="/admin/settings" className="flex items-center gap-2 cursor-pointer">
                <span className="material-icons-outlined text-lg">settings</span>
                <span>الإعدادات</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="/" target="_blank" className="flex items-center gap-2 cursor-pointer" rel="noreferrer">
                <span className="material-icons-outlined text-lg">open_in_new</span>
                <span>عرض الموقع</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={logout}
              className="flex items-center gap-2 cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
            >
              <span className="material-icons-outlined text-lg">logout</span>
              <span>تسجيل الخروج</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
