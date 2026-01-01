"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface MediaPathInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  helperText: string
  accept?: "image" | "audio" | "video" | "pdf"
}

export function MediaPathInput({ label, value, onChange, placeholder, helperText, accept }: MediaPathInputProps) {
  const [preview, setPreview] = useState(value)

  const handleChange = (newValue: string) => {
    setPreview(newValue)
    onChange(newValue)
  }

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-foreground dark:text-gray-200">{label}</Label>

      {/* Preview Section */}
      {preview && (
        <div className="mb-3 p-3 bg-muted dark:bg-background-alt rounded-lg">
          {accept === "image" && (
            <img
              src={preview || "/placeholder.svg"}
              alt="Preview"
              className="w-full max-w-xs h-32 object-cover rounded-lg"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=128&width=320"
              }}
            />
          )}
          {accept === "audio" && <audio src={preview} controls className="w-full" controlsList="nodownload" />}
          {accept === "video" && preview.includes("youtube") && (
            <div className="text-sm text-primary flex items-center gap-2">
              <span className="material-icons-outlined">play_circle</span>
              رابط يوتيوب: {preview}
            </div>
          )}
          {accept === "video" && !preview.includes("youtube") && (
            <video src={preview} controls className="w-full max-h-48 rounded-lg" controlsList="nodownload" />
          )}
          {accept === "pdf" && (
            <div className="flex items-center gap-2 text-sm text-foreground">
              <span className="material-icons-outlined text-red-500">picture_as_pdf</span>
              <span className="truncate">{preview}</span>
            </div>
          )}
        </div>
      )}

      {/* Input Field */}
      <Input
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="bg-muted dark:bg-background-alt"
        dir="ltr"
      />

      {/* Helper Text */}
      <p className="text-xs text-muted-foreground flex items-center gap-1">
        <span className="material-icons-outlined text-sm">info</span>
        {helperText}
      </p>
    </div>
  )
}
