"use client"

import { useState } from "react"

interface ShareButtonsProps {
  title: string
  url?: string
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "")

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: shareUrl,
        })
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      handleCopyLink()
    }
  }

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
      "_blank",
    )
  }

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank")
  }

  const shareToWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${title} ${shareUrl}`)}`, "_blank")
  }

  const shareToTelegram = () => {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
      "_blank",
    )
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleShare}
        className="flex items-center gap-2 bg-surface dark:bg-card border border-border px-4 py-2 rounded-lg text-sm text-text-muted hover:text-primary hover:border-primary transition-colors"
        title="مشاركة"
      >
        <span className="material-icons-outlined text-lg">share</span>
        مشاركة
      </button>

      <button
        onClick={shareToWhatsApp}
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
        title="مشاركة عبر واتساب"
      >
        <span className="material-icons-outlined">chat</span>
      </button>

      <button
        onClick={shareToTelegram}
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition-colors"
        title="مشاركة عبر تيليجرام"
      >
        <span className="material-icons-outlined">send</span>
      </button>

      <button
        onClick={shareToTwitter}
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-black text-white hover:bg-gray-800 transition-colors"
        title="مشاركة عبر تويتر"
      >
        <span className="text-sm font-bold">X</span>
      </button>

      <button
        onClick={shareToFacebook}
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        title="مشاركة عبر فيسبوك"
      >
        <span className="material-icons-outlined">facebook</span>
      </button>

      <button
        onClick={handleCopyLink}
        className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-colors ${
          copied
            ? "bg-green-500 text-white border-green-500"
            : "bg-surface dark:bg-card border-border text-text-muted hover:text-primary hover:border-primary"
        }`}
        title={copied ? "تم النسخ!" : "نسخ الرابط"}
      >
        <span className="material-icons-outlined">{copied ? "check" : "link"}</span>
      </button>
    </div>
  )
}
