"use client"

import { useState } from "react"
import { Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ExportPDFButtonProps {
  title: string
  content: string
  type: "sermon" | "article"
}

export function ExportPDFButton({ title, content, type }: ExportPDFButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleExport = async () => {
    setLoading(true)
    try {
      // Dynamic import to reduce bundle size
      const { jsPDF } = await import("jspdf")

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      // Set RTL direction
      doc.setR2L(true)

      // Add title
      doc.setFontSize(18)
      doc.text(title, 105, 20, { align: "center" })

      // Add separator line
      doc.setDrawColor(28, 91, 69) // Primary green color
      doc.line(20, 30, 190, 30)

      // Add content with text wrapping
      doc.setFontSize(12)
      const splitContent = doc.splitTextToSize(content.replace(/<[^>]*>/g, ""), 170)
      doc.text(splitContent, 190, 45, { align: "right" })

      // Add footer
      doc.setFontSize(10)
      doc.setTextColor(100, 100, 100)
      doc.text("الشيخ السيد مراد", 105, 280, { align: "center" })
      doc.text(`${type === "sermon" ? "خطبة" : "مقال"}`, 105, 285, { align: "center" })

      // Save
      doc.save(`${title}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleExport} variant="outline" size="sm" disabled={loading}>
      {loading ? <Loader2 className="h-4 w-4 ml-2 animate-spin" /> : <Download className="h-4 w-4 ml-2" />}
      تصدير PDF
    </Button>
  )
}
