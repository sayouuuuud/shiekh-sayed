"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/khutba", label: "خطب" },
  { href: "/dars", label: "دروس" },
  { href: "/articles", label: "مقالات" },
  { href: "/books", label: "كتب" },
  { href: "/videos", label: "مرئيات" },
  { href: "/about", label: "عن الشيخ" },
]

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

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
      <header className="bg-surface dark:bg-card shadow-sm sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="text-primary text-3xl">
                <span className="material-icons-outlined text-4xl">mosque</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-primary dark:text-white font-serif">الشيخ السيد مراد</span>
                <span className="text-xs text-text-muted dark:text-text-subtext">عالم أزهري</span>
              </div>
            </Link>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "hover:text-primary dark:hover:text-secondary transition-colors",
                    pathname === link.href
                      ? "text-primary dark:text-secondary font-bold"
                      : "text-text-muted dark:text-text-subtext",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSearchOpen(true)}
                className="text-text-muted dark:text-text-subtext hover:text-primary dark:hover:text-secondary transition-colors"
              >
                <span className="material-icons-outlined">search</span>
              </button>
              <Link
                href="/subscribe"
                className="hidden sm:block bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-md"
              >
                اشترك
              </Link>
              {/* Mobile menu button */}
              <button
                className="md:hidden text-text-muted dark:text-text-subtext"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="material-icons-outlined">{mobileMenuOpen ? "close" : "menu"}</span>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-border dark:border-border">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "py-2 hover:text-primary dark:hover:text-secondary transition-colors",
                      pathname === link.href
                        ? "text-primary dark:text-secondary font-bold"
                        : "text-text-muted dark:text-text-subtext",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-20 bg-black/50 backdrop-blur-sm"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-2xl mx-4 bg-card rounded-2xl shadow-2xl p-6 border border-border"
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
                className="bg-primary hover:bg-primary-hover text-white px-6 rounded-xl transition-colors"
              >
                <span className="material-icons-outlined">search</span>
              </button>
            </form>
            <div className="mt-4 text-sm text-text-muted">
              اضغط <kbd className="px-2 py-1 bg-muted rounded text-xs">Enter</kbd> للبحث أو{" "}
              <kbd className="px-2 py-1 bg-muted rounded text-xs">Esc</kbd> للإغلاق
            </div>
          </div>
        </div>
      )}
    </>
  )
}
