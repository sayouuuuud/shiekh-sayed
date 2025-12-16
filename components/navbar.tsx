"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { useStore } from "@/lib/store-context"
import { LanguageSwitcher } from "./language-switcher"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { t, isRTL } = useLanguage()
  const { storeSettings } = useStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 50)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  if (pathname.startsWith("/admin")) {
    return null
  }

  const navItems = [
    { href: "/", label: t.home },
    { href: "/shop", label: t.shop },
    { href: "/about", label: isRTL ? "من نحن والتواصل" : "About & Contact" },
  ]

  return (
    <>
      <header
        className={cn(
          "fixed top-4 z-50 transition-all duration-300",
          "left-4 right-4",
          "md:top-6 lg:top-8",
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
        )}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="w-full">
          <nav
            className="flex items-center justify-between px-4 py-2 md:px-8 md:py-2.5 lg:px-12 lg:py-3 rounded-full shadow-[0_-1px_4px_-1px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)]"
            style={{ backgroundColor: "var(--navbar-bg)" }}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 md:gap-3">
              {mounted && storeSettings.logo ? (
                <div className="relative w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10">
                  <Image
                    src={storeSettings.logo || "/placeholder.svg"}
                    alt={storeSettings.storeName}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : null}
              <span className="font-serif text-lg md:text-xl lg:text-xl text-rose-900">
                {mounted ? storeSettings.storeName : "Whispering Petals"}
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-5 py-2 lg:px-6 lg:py-2 text-sm lg:text-base font-medium rounded-full transition-all duration-200",
                      isActive ? "bg-rose-600 text-white shadow-md" : "text-rose-800 hover:bg-rose-200/50",
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
              <LanguageSwitcher />

              {/* Mobile Menu Button - removed dark: classes */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-rose-200/50 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-rose-800" />
                ) : (
                  <Menu className="w-5 h-5 text-rose-800" />
                )}
              </button>
            </div>
          </nav>

          {/* Mobile Menu - removed dark: classes */}
          <div
            className={cn(
              "md:hidden overflow-hidden transition-all duration-300 mt-2 rounded-2xl shadow-lg",
              isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0",
            )}
            style={{ backgroundColor: "var(--navbar-bg)" }}
          >
            <nav className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    pathname === item.href ? "bg-rose-600 text-white" : "text-rose-800 hover:bg-rose-200/50",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-20 md:h-24" />
    </>
  )
}
