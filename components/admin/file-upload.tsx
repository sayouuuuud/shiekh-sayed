"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FileUploadProps {
  accept: string
  folder: string
  onUploadComplete: (path: string) => void
  currentFile?: string
  label: string
}

export function FileUpload({ accept, folder, onUploadComplete, currentFile, label }: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(currentFile || "")
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", folder)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        const filePath = data.path || data.url
        setPreview(filePath)
        onUploadComplete(filePath)
      } else {
        setError(data.error || "فشل رفع الملف")
      }
    } catch (err) {
      console.error("Upload error:", err)
      setError("حدث خطأ أثناء رفع الملف")
    } finally {
      setUploading(false)
    }
  }

  function handleRemove() {
    setPreview("")
    onUploadComplete("")
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  function handleUrlChange(url: string) {
    setPreview(url)
    onUploadComplete(url)
  }

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground dark:text-gray-200">{label}</label>

      {preview && (
        <div className="mb-3 p-3 bg-muted dark:bg-background-alt rounded-lg">
          {accept.includes("image") ? (
            <div className="flex items-center gap-4">
              <img
                src={preview || "/placeholder.svg"}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=80&width=80"
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground dark:text-white truncate">{preview}</p>
                <Button type="button" variant="destructive" size="sm" onClick={handleRemove} className="mt-2">
                  <span className="material-icons-outlined text-sm ml-1">delete</span>
                  حذف
                </Button>
              </div>
            </div>
          ) : accept.includes("audio") ? (
            <div className="space-y-2">
              <audio src={preview} controls className="w-full" />
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm text-text-muted truncate flex-1">{preview}</p>
                <Button type="button" variant="destructive" size="sm" onClick={handleRemove}>
                  <span className="material-icons-outlined text-sm ml-1">delete</span>
                  حذف
                </Button>
              </div>
            </div>
          ) : accept.includes("video") ? (
            <div className="space-y-2">
              {preview.includes("youtube") || preview.includes("youtu.be") ? (
                <p className="text-sm text-primary">رابط يوتيوب: {preview}</p>
              ) : (
                <video src={preview} controls className="w-full max-h-48 rounded-lg" />
              )}
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm text-text-muted truncate flex-1">{preview}</p>
                <Button type="button" variant="destructive" size="sm" onClick={handleRemove}>
                  <span className="material-icons-outlined text-sm ml-1">delete</span>
                  حذف
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="material-icons-outlined text-primary flex-shrink-0">description</span>
                <p className="text-sm text-foreground dark:text-white truncate">{preview}</p>
              </div>
              <Button type="button" variant="destructive" size="sm" onClick={handleRemove} className="flex-shrink-0">
                <span className="material-icons-outlined text-sm ml-1">delete</span>
                حذف
              </Button>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center gap-3">
        <Input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleUpload}
          disabled={uploading}
          className="bg-muted dark:bg-background-alt cursor-pointer file:cursor-pointer file:bg-primary file:text-white file:border-0 file:px-3 file:py-1 file:rounded file:ml-3"
        />
      </div>

      {uploading && (
        <div className="flex items-center gap-2 text-sm text-primary">
          <span className="material-icons-outlined animate-spin">refresh</span>
          جاري الرفع...
        </div>
      )}

      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <span className="material-icons-outlined text-sm">error</span>
          {error}
        </p>
      )}
    </div>
  )
}
