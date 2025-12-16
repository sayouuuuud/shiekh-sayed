"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  ImageIcon,
  Star,
  FileText,
  Languages,
  MessageSquare,
  Settings,
  Layout,
  FolderTree,
  Globe,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useStore } from "@/lib/store-context"
import { useLanguage } from "@/lib/language-context"

export function AdminSidebar() {
  const pathname = usePathname()
  const { storeSettings, adminTranslations } = useStore()
  const { locale } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const t = adminTranslations.sidebar
  const isRTL = locale === "ar"

  const sidebarItems = [
    { href: "/admin", icon: LayoutDashboard, label: mounted ? t.dashboard[locale] : "Dashboard" },
    { href: "/admin/products", icon: Package, label: mounted ? t.products[locale] : "Products" },
    { href: "/admin/categories", icon: FolderTree, label: mounted ? t.categories[locale] : "Categories" },
    { href: "/admin/gallery", icon: ImageIcon, label: mounted ? t.gallery[locale] : "Gallery" },
    { href: "/admin/reviews", icon: Star, label: mounted ? t.reviews[locale] : "Reviews" },
    { href: "/admin/contacts", icon: MessageSquare, label: mounted ? t.contacts[locale] : "Contact Messages" },
    { href: "/admin/content", icon: FileText, label: mounted ? t.content[locale] : "Content" },
    { href: "/admin/translations", icon: Languages, label: mounted ? t.translations[locale] : "Translations" },
    {
      href: "/admin/admin-translations",
      icon: Globe,
      label: mounted ? t.adminTranslations[locale] : "Admin Translations",
    },
    { href: "/admin/footer", icon: Layout, label: mounted ? t.footer[locale] : "Footer" },
    { href: "/admin/settings", icon: Settings, label: mounted ? t.settings[locale] : "Settings" },
  ]

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border flex flex-col z-40 ${isRTL ? "font-arabic" : ""}`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <h1 className="font-serif text-xl text-rose-900">{mounted ? storeSettings.storeName : "Whispering Petals"}</h1>
        <p className="text-xs text-muted-foreground mt-1">{isRTL ? "لوحة الإدارة" : "Admin Panel"}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    isActive ? "bg-rose-500 text-white" : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
