"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="p-2 rounded-full hover:bg-background dark:hover:bg-background-alt text-text-muted transition-colors">
        <span className="material-icons-outlined">dark_mode</span>
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full hover:bg-background dark:hover:bg-background-alt text-text-muted dark:text-text-subtext transition-colors"
    >
      {theme === "dark" ? (
        <span className="material-icons-outlined">light_mode</span>
      ) : (
        <span className="material-icons-outlined">dark_mode</span>
      )}
    </button>
  )
}
