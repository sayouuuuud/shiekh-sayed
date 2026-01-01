"use client"

interface SafeHtmlProps {
  html: string | null | undefined
  className?: string
  as?: "div" | "p" | "span"
}

export function SafeHtml({ html, className = "", as: Tag = "div" }: SafeHtmlProps) {
  if (!html) return null

  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />
}
