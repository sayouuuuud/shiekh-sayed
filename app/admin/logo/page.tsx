"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

interface Logo {
  id: string
  filename: string
  path: string
  is_active: boolean
  uploaded_at: string
  size: number
}

export default function LogoManagementPage() {
  const [logos, setLogos] = useState<Logo[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState("")
  const [activeLogo, setActiveLogo] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    loadLogos()
  }, [])

  async function loadLogos() {
    setLoading(true)
    const { data, error } = await supabase.from("site_settings").select("setting_value").eq("setting_key", "site_logos")

    // Mock data for now since we don't have a logos table
    setLogos([
      {
        id: "1",
        filename: "logo-main.png",
        path: "/logo.png",
        is_active: true,
        uploaded_at: new Date().toISOString(),
        size: 45000,
      },
      {
        id: "2",
        filename: "logo-light.png",
        path: "/logo-light.png",
        is_active: false,
        uploaded_at: new Date().toISOString(),
        size: 42000,
      },
    ])

    const activeLogo = "1"
    setActiveLogo(activeLogo)
    setLoading(false)
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setMessage("من فضلك اختر صورة")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage("حجم الصورة كبير جداً (الحد الأقصى 5 ميجابايت)")
      return
    }

    setUploading(true)
    setMessage("")

    try {
      const newLogo: Logo = {
        id: Math.random().toString(36).substr(2, 9),
        filename: file.name,
        path: URL.createObjectURL(file),
        is_active: false,
        uploaded_at: new Date().toISOString(),
        size: file.size,
      }

      setLogos([...logos, newLogo])
      setMessage("تم رفع الشعار بنجاح")
      e.target.value = ""
    } catch (error) {
      console.error("Error uploading logo:", error)
      setMessage("حدث خطأ أثناء رفع الشعار")
    }

    setUploading(false)
  }

  async function handleSetActive(logoId: string) {
    setActiveLogo(logoId)
    setMessage("تم تعيين الشعار كشعار رئيسي")

    // Update all logos
    setLogos(
      logos.map((logo) => ({
        ...logo,
        is_active: logo.id === logoId,
      })),
    )
  }

  async function handleDelete(logoId: string) {
    if (!confirm("هل أنت متأكد من حذف هذا الشعار؟")) return

    setLogos(logos.filter((logo) => logo.id !== logoId))
    setMessage("تم حذف الشعار بنجاح")

    if (activeLogo === logoId) {
      setActiveLogo(logos[0]?.id || null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-muted">جاري تحميل الشعارات...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-secondary font-medium mb-2">
          <span>الإعدادات</span>
          <span className="material-icons-outlined text-[10px]">arrow_back_ios</span>
          <span>الشعارات والصور</span>
        </div>
        <h1 className="text-3xl font-bold text-primary dark:text-white flex items-center gap-3 font-serif">
          <span className="material-icons-outlined text-4xl">image_search</span>
          إدارة الشعارات
        </h1>
        <p className="text-text-muted dark:text-gray-400 mt-2">رفع وإدارة شعارات الموقع بمختلف الأحجام والصيغ</p>
      </div>

      {/* Message Alert */}
      {message && (
        <div
          className={`p-4 rounded-xl text-center font-medium ${
            message.includes("خطأ")
              ? "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400"
              : "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
          }`}
        >
          {message}
        </div>
      )}

      {/* Upload Section */}
      <div className="bg-card dark:bg-card rounded-2xl border-2 border-dashed border-border dark:border-border p-8 text-center hover:border-primary transition-colors cursor-pointer">
        <label htmlFor="logo-upload" className="cursor-pointer">
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="material-icons-outlined text-primary text-3xl">cloud_upload</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground dark:text-white mb-1">رفع شعار جديد</h3>
              <p className="text-sm text-text-muted dark:text-gray-400">
                اسحب الصورة هنا أو انقر للاختيار (PNG, JPG, SVG - الحد الأقصى 5 ميجابايت)
              </p>
            </div>
          </div>
          <input
            id="logo-upload"
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Logo List */}
      <div className="bg-card dark:bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
        <div className="p-6 border-b border-border bg-muted/50 dark:bg-background-alt/50">
          <h2 className="font-bold text-xl text-foreground dark:text-white">الشعارات المحفوظة ({logos.length})</h2>
        </div>

        {logos.length === 0 ? (
          <div className="p-12 text-center text-text-muted">
            <span className="material-icons-outlined text-6xl mb-4">image_not_supported</span>
            <p className="text-lg">لا توجد شعارات محفوظة</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {logos.map((logo) => (
              <div key={logo.id} className="p-6 hover:bg-muted/50 dark:hover:bg-background-alt/50 transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                  {/* Logo Preview */}
                  <div className="md:col-span-1 flex justify-center">
                    <div className="w-24 h-24 bg-background dark:bg-background-alt rounded-lg flex items-center justify-center border border-border overflow-hidden">
                      <img
                        src={logo.path || "/placeholder.svg"}
                        alt={logo.filename}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Logo Info */}
                  <div className="md:col-span-3">
                    <h3 className="font-bold text-foreground dark:text-white mb-1">{logo.filename}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-text-muted dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <span className="material-icons-outlined text-sm">storage</span>
                        <span>{(logo.size / 1024).toFixed(1)} KB</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="material-icons-outlined text-sm">calendar_today</span>
                        <span>{new Date(logo.uploaded_at).toLocaleDateString("ar-EG")}</span>
                      </div>
                      {logo.is_active && (
                        <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-1 rounded">
                          <span className="material-icons-outlined text-sm">check_circle</span>
                          <span>شعار رئيسي</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="md:col-span-1 flex flex-col gap-2">
                    {!logo.is_active && (
                      <Button
                        onClick={() => handleSetActive(logo.id)}
                        className="w-full bg-primary hover:bg-primary-hover text-white text-sm"
                      >
                        <span className="material-icons-outlined text-sm ml-1">done</span>
                        تعيين كرئيسي
                      </Button>
                    )}
                    <Button
                      onClick={() => handleDelete(logo.id)}
                      variant="ghost"
                      className="w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 text-sm"
                    >
                      <span className="material-icons-outlined text-sm ml-1">delete</span>
                      حذف
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Logo Guidelines */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-blue-700 dark:text-blue-300 flex-shrink-0">
            <span className="material-icons-outlined text-lg">info</span>
          </div>
          <div>
            <h3 className="font-bold text-blue-900 dark:text-blue-200 mb-2">إرشادات الشعارات</h3>
            <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
              <li>استخدم صور PNG بخلفية شفافة للحصول على أفضل النتائج</li>
              <li>الأبعاد المثالية: 200x200 بكسل أو أكثر</li>
              <li>حجم الملف الموصى به: أقل من 100 كيلو بايت</li>
              <li>تجنب استخدام الصور عالية الدقة جداً للحفاظ على سرعة التحميل</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
