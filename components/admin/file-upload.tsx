"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Upload, X, FileAudio, FileVideo, FileImage, FileText, CheckCircle } from "lucide-react"

interface FileUploadProps {
  accept: string
  folder: string
  onUploadComplete: (path: string) => void
  currentFile?: string
  label: string
}

export function FileUpload({ accept, folder, onUploadComplete, currentFile, label }: FileUploadProps) {
  const [filePath, setFilePath] = useState(currentFile || "")
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Determine file type for icons and help text
  const isImage = accept.includes("image")
  const isAudio = accept.includes("audio")
  const isVideo = accept.includes("video")
  const isPdf = accept === "application/pdf" || accept.includes("pdf")

  const getIcon = () => {
    if (isImage) return <FileImage className="h-10 w-10 text-primary" />
    if (isAudio) return <FileAudio className="h-10 w-10 text-primary" />
    if (isVideo) return <FileVideo className="h-10 w-10 text-primary" />
    return <FileText className="h-10 w-10 text-primary" />
  }

  const getAcceptText = () => {
    if (isImage) return "صور (PNG, JPG, WEBP, GIF)"
    if (isAudio) return "ملفات صوتية (MP3, WAV, OGG)"
    if (isVideo) return "ملفات فيديو (MP4, WEBM)"
    if (isPdf) return "ملفات PDF"
    return "جميع الملفات المدعومة"
  }

  const handleFileSelect = async (file: File) => {
    if (!file) return

    setUploading(true)
    setError("")
    setSuccess(false)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", folder)

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 10
        })
      }, 100)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "فشل في رفع الملف")
      }

      const data = await response.json()

      setFilePath(data.url)
      onUploadComplete(data.url)
      setSuccess(true)

      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error("Upload error:", err)
      setError(err instanceof Error ? err.message : "حدث خطأ أثناء رفع الملف")
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      await handleFileSelect(file)
    }
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      await handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleRemove = () => {
    setFilePath("")
    onUploadComplete("")
    setSuccess(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleManualPathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const path = e.target.value
    setFilePath(path)
    onUploadComplete(path)
  }

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-foreground dark:text-gray-200">{label}</Label>

      {/* Success Message */}
      {success && (
        <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg">
          <CheckCircle className="h-5 w-5" />
          <span className="text-sm">تم رفع الملف بنجاح!</span>
        </div>
      )}

      {/* Preview Section */}
      {filePath && (
        <div className="mb-3 p-4 bg-muted dark:bg-background-alt rounded-xl border border-border">
          {isImage ? (
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={filePath || "/placeholder.svg"}
                  alt="معاينة"
                  className="w-24 h-24 object-cover rounded-lg shadow-sm"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=96&width=96"
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-text-muted mb-1">مسار الملف:</p>
                <p
                  className="text-sm text-foreground dark:text-white truncate font-mono bg-background p-2 rounded"
                  dir="ltr"
                >
                  {filePath}
                </p>
                <Button type="button" variant="destructive" size="sm" onClick={handleRemove} className="mt-3">
                  <X className="h-4 w-4 ml-1" />
                  حذف الملف
                </Button>
              </div>
            </div>
          ) : isAudio ? (
            <div className="space-y-3">
              {!filePath.includes("youtube") && !filePath.includes("youtu.be") && (
                <audio src={filePath} controls className="w-full" />
              )}
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-text-muted mb-1">مسار الملف:</p>
                  <p className="text-sm text-foreground truncate font-mono bg-background p-2 rounded" dir="ltr">
                    {filePath}
                  </p>
                </div>
                <Button type="button" variant="destructive" size="sm" onClick={handleRemove}>
                  <X className="h-4 w-4 ml-1" />
                  حذف
                </Button>
              </div>
            </div>
          ) : isVideo ? (
            <div className="space-y-3">
              {filePath.includes("youtube") || filePath.includes("youtu.be") ? (
                <p className="text-sm text-primary">رابط يوتيوب</p>
              ) : (
                <video src={filePath} controls className="w-full max-h-48 rounded-lg" />
              )}
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-text-muted mb-1">مسار الملف:</p>
                  <p className="text-sm text-foreground truncate font-mono bg-background p-2 rounded" dir="ltr">
                    {filePath}
                  </p>
                </div>
                <Button type="button" variant="destructive" size="sm" onClick={handleRemove}>
                  <X className="h-4 w-4 ml-1" />
                  حذف
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-text-muted mb-1">مسار الملف:</p>
                  <p className="text-sm text-foreground truncate font-mono bg-background p-2 rounded" dir="ltr">
                    {filePath}
                  </p>
                </div>
              </div>
              <Button type="button" variant="destructive" size="sm" onClick={handleRemove} className="flex-shrink-0">
                <X className="h-4 w-4 ml-1" />
                حذف
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Upload Area */}
      {!filePath && (
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer ${
            dragOver
              ? "border-primary bg-primary/10 scale-[1.02]"
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !uploading && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleInputChange}
            className="hidden"
            disabled={uploading}
          />

          {uploading ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <div className="w-full max-w-xs">
                <div className="flex justify-between text-sm text-text-muted mb-2">
                  <span>جاري الرفع...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              {getIcon()}
              <div>
                <p className="text-base font-medium text-foreground">اسحب الملف هنا أو اضغط للاختيار</p>
                <p className="text-sm text-text-muted mt-1">{getAcceptText()}</p>
                <p className="text-xs text-text-muted mt-1">الحد الأقصى: 50 ميجابايت</p>
              </div>
              <Button type="button" variant="outline" size="default" className="mt-2 bg-transparent">
                <Upload className="h-4 w-4 ml-2" />
                اختر ملف من جهازك
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
          <X className="h-5 w-5" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Manual Path Input (fallback for YouTube links, etc.) */}
      <details className="mt-3">
        <summary className="text-xs text-text-muted cursor-pointer hover:text-primary transition-colors">
          أو أدخل الرابط يدوياً (مثل روابط يوتيوب)
        </summary>
        <div className="mt-2 space-y-2">
          <Input
            type="text"
            value={filePath}
            onChange={handleManualPathChange}
            placeholder="/uploads/images/filename.jpg أو https://youtube.com/..."
            className="bg-muted dark:bg-background-alt font-mono text-sm"
            dir="ltr"
          />
          <p className="text-xs text-text-muted">يمكنك إدخال مسار ملف محلي أو رابط خارجي مباشرة</p>
        </div>
      </details>
    </div>
  )
}
