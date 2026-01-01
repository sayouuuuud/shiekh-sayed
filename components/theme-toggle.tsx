"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled className="relative">
        <span className="material-icons-outlined h-[1.2rem] w-[1.2rem]">light_mode</span>
        <span className="sr-only">تبديل المظهر</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="تبديل المظهر"
      className="relative"
    >
      {/* Sun icon - visible in light mode */}
      <span className="material-icons-outlined h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 absolute">
        light_mode
      </span>
      {/* Moon icon - visible in dark mode */}
      <span className="material-icons-outlined h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 absolute">
        dark_mode
      </span>
      <span className="sr-only">تبديل المظهر</span>
    </Button>
  )
}
