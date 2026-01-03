"use client"

import DOMPurify from "dompurify"
import { useEffect, useState } from "react"

interface SafeHtmlProps {
  html: string | null | undefined
  className?: string
  as?: "div" | "p" | "span"
}

function parseRichTextJSON(content: string): string {
  if (!content) return ""

  // First check if it looks like JSON
  const trimmed = content.trim()
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) {
    // Not JSON, return as plain text or HTML
    return content
  }

  try {
    const parsed = JSON.parse(content)

    // Handle TipTap/ProseMirror format
    if (parsed.type === "doc" && Array.isArray(parsed.content)) {
      return parseNodes(parsed.content)
    }

    // Handle simple object with text fields (sermon intro/main/conclusion format)
    if (typeof parsed === "object" && !Array.isArray(parsed)) {
      const parts: string[] = []

      // Check for common field names
      const textFields = ["introduction", "intro", "main_topic", "main", "body", "content", "conclusion", "text"]

      for (const field of textFields) {
        if (parsed[field] && typeof parsed[field] === "string") {
          parts.push(`<div class="mb-4">${parsed[field]}</div>`)
        }
      }

      if (parts.length > 0) return parts.join("")

      // If no known fields, try to stringify nicely
      return `<pre class="whitespace-pre-wrap">${JSON.stringify(parsed, null, 2)}</pre>`
    }

    // If array of strings/objects
    if (Array.isArray(parsed)) {
      return parsed
        .map((item) => {
          if (typeof item === "string") return `<p>${item}</p>`
          if (typeof item === "object") return parseRichTextJSON(JSON.stringify(item))
          return String(item)
        })
        .join("")
    }

    return content
  } catch {
    // Not valid JSON, return as-is (it's probably HTML or plain text)
    return content
  }
}

function parseNodes(nodes: any[]): string {
  if (!Array.isArray(nodes)) return ""
  return nodes.map(parseNode).join("")
}

function parseNode(node: any): string {
  if (!node) return ""

  switch (node.type) {
    case "paragraph":
      const pContent = node.content ? parseNodes(node.content) : ""
      return `<p class="mb-4">${pContent || "&nbsp;"}</p>`

    case "heading":
      const level = node.attrs?.level || 2
      const hContent = node.content ? parseNodes(node.content) : ""
      return `<h${level} class="font-bold mb-3 text-${level === 1 ? "2xl" : level === 2 ? "xl" : "lg"}">${hContent}</h${level}>`

    case "text":
      let text = node.text || ""
      if (node.marks) {
        for (const mark of node.marks) {
          switch (mark.type) {
            case "bold":
            case "strong":
              text = `<strong>${text}</strong>`
              break
            case "italic":
            case "em":
              text = `<em>${text}</em>`
              break
            case "underline":
              text = `<u>${text}</u>`
              break
            case "strike":
              text = `<s>${text}</s>`
              break
            case "link":
              text = `<a href="${mark.attrs?.href || "#"}" class="text-primary hover:underline" target="_blank" rel="noopener">${text}</a>`
              break
            case "code":
              text = `<code class="bg-muted px-1 rounded">${text}</code>`
              break
          }
        }
      }
      return text

    case "bulletList":
      const ulContent = node.content ? parseNodes(node.content) : ""
      return `<ul class="list-disc list-inside mb-4 space-y-1">${ulContent}</ul>`

    case "orderedList":
      const olContent = node.content ? parseNodes(node.content) : ""
      return `<ol class="list-decimal list-inside mb-4 space-y-1">${olContent}</ol>`

    case "listItem":
      const liContent = node.content ? parseNodes(node.content) : ""
      // Remove paragraph wrapper from list items
      return `<li>${liContent.replace(/<\/?p[^>]*>/g, "")}</li>`

    case "blockquote":
      const bqContent = node.content ? parseNodes(node.content) : ""
      return `<blockquote class="border-r-4 border-primary pr-4 italic my-4 text-text-muted">${bqContent}</blockquote>`

    case "codeBlock":
      const codeContent = node.content ? parseNodes(node.content) : ""
      return `<pre class="bg-muted p-4 rounded-lg overflow-x-auto my-4"><code>${codeContent}</code></pre>`

    case "horizontalRule":
      return `<hr class="my-6 border-border" />`

    case "hardBreak":
      return "<br />"

    case "image":
      const src = node.attrs?.src || ""
      const alt = node.attrs?.alt || ""
      return `<img src="${src}" alt="${alt}" class="max-w-full h-auto rounded-lg my-4" />`

    default:
      if (node.content) {
        return parseNodes(node.content)
      }
      return node.text || ""
  }
}

export function SafeHtml({ html, className = "", as: Tag = "div" }: SafeHtmlProps) {
  const [sanitizedHtml, setSanitizedHtml] = useState<string>("")

  useEffect(() => {
    if (!html) {
      setSanitizedHtml("")
      return
    }

    // First, try to parse as JSON Rich Text
    const parsedHtml = parseRichTextJSON(html)

    // Then sanitize the HTML
    if (typeof window !== "undefined") {
      setSanitizedHtml(
        DOMPurify.sanitize(parsedHtml, {
          ADD_TAGS: ["iframe"],
          ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling", "target"],
        }),
      )
    } else {
      setSanitizedHtml(parsedHtml)
    }
  }, [html])

  if (!sanitizedHtml) return null

  return <Tag className={className} dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
}
