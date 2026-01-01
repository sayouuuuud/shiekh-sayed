"use client"

import type React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

const defaultNavLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/schedule", label: "الجدول" },
  { href: "/khutba", label: "خطب" },
  { href: "/dars", label: "دروس" },
  { href: "/articles", label: "مقالات" },
  { href: "/books", label: "كتب" },
  { href: "/videos", label: "مرئيات" },
]

interface NavItem {
  id: string
  label: string
  href: string
  order_index: number
  is_active: boolean
}

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const [navLinks] = useState<{ href: string; label: string }[]>(defaultNavLinks)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && searchOpen) {
        setSearchOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [searchOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchOpen(false)
      setSearchQuery("")
    }
  }

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 transition-all duration-200",
          scrolled ? "shadow-md border-b border-border" : "shadow-sm",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="text-primary group-hover:scale-105 transition-transform">
                <span className="material-icons-outlined text-4xl">mosque</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-primary dark:text-white font-serif leading-tight">
                  الشيخ السيد مراد
                </span>
                <span className="text-xs text-text-muted dark:text-text-subtext">عالم أزهري</span>
              </div>
            </Link>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "hover:text-primary dark:hover:text-secondary transition-colors py-1",
                    pathname === link.href
                      ? "text-primary dark:text-secondary font-bold border-b-2 border-primary dark:border-secondary"
                      : "text-foreground dark:text-text-subtext",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-text-muted dark:text-text-subtext hover:text-primary dark:hover:text-secondary hover:bg-muted rounded-lg transition-all"
                aria-label="بحث"
              >
                <span className="material-icons-outlined">search</span>
              </button>
              <ThemeToggle />
              <Link
                href="/subscribe"
                className="hidden sm:flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
              >
                <span className="material-icons-outlined text-sm">notifications</span>
                اشترك
              </Link>
              {/* Mobile menu button */}
              <button
                className="lg:hidden text-text-muted dark:text-text-subtext p-2 hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              >
                <span className="material-icons-outlined">{mobileMenuOpen ? "close" : "menu"}</span>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden py-4 border-t border-border animate-in slide-in-from-top-2 duration-200">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "py-3 px-4 rounded-lg hover:bg-muted transition-colors flex items-center gap-3",
                      pathname === link.href
                        ? "text-primary dark:text-secondary font-bold bg-primary/5"
                        : "text-foreground dark:text-text-subtext",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/subscribe"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 text-center bg-primary hover:bg-primary-hover text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  اشترك الآن
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-20 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-2xl mx-4 bg-card rounded-2xl shadow-2xl p-6 border border-border animate-in slide-in-from-top-4 duration-300"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            <form onSubmit={handleSearch} className="flex gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في الخطب، الدروس، المقالات، والكتب..."
                className="flex-1 px-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-hover text-white px-6 rounded-xl transition-colors flex items-center gap-2"
              >
                <span className="material-icons-outlined">search</span>
              </button>
            </form>
            <div className="mt-4 text-sm text-text-muted flex items-center justify-between">
              <span>
                اضغط <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Enter</kbd> للبحث
              </span>
              <span>
                اضغط <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Esc</kbd> للإغلاق
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
