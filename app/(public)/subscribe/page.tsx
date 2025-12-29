"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export default function SubscribePage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus("loading")
    try {
      const supabase = createClient()
      const { error } = await supabase.from("subscribers").insert({
        email,
        name: name || null,
      })

      if (error) {
        if (error.code === "23505") {
          setMessage("هذا البريد مسجل بالفعل في القائمة البريدية")
        } else {
          setMessage("حدث خطأ، يرجى المحاولة مرة أخرى")
        }
        setStatus("error")
        return
      }

      setMessage("تم الاشتراك بنجاح! شكراً لانضمامك إلى قائمتنا البريدية")
      setStatus("success")
      setEmail("")
      setName("")
    } catch {
      setMessage("حدث خطأ، يرجى المحاولة مرة أخرى")
      setStatus("error")
    }
  }

  return (
    <main className="min-h-screen bg-background py-16">
      <div className="max-w-2xl mx-auto px-4">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-text-muted hover:text-primary mb-8">
          <span className="material-icons-outlined">arrow_back</span>
          العودة للرئيسية
        </Link>

        <div className="bg-surface dark:bg-card rounded-2xl p-8 md:p-12 border border-border shadow-lg">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-icons-outlined text-4xl text-primary">mail</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-serif">
              اشترك في القائمة البريدية
            </h1>
            <p className="text-text-muted text-lg leading-relaxed">
              انضم إلى آلاف المشتركين واحصل على أحدث الدروس والخطب والمقالات مباشرة إلى بريدك الإلكتروني
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="bg-background dark:bg-background-alt rounded-xl p-4 text-center">
              <span className="material-icons-outlined text-secondary text-2xl mb-2">notifications</span>
              <p className="text-sm text-text-muted">تنبيهات بالدروس الجديدة</p>
            </div>
            <div className="bg-background dark:bg-background-alt rounded-xl p-4 text-center">
              <span className="material-icons-outlined text-secondary text-2xl mb-2">menu_book</span>
              <p className="text-sm text-text-muted">ملخصات علمية حصرية</p>
            </div>
            <div className="bg-background dark:bg-background-alt rounded-xl p-4 text-center">
              <span className="material-icons-outlined text-secondary text-2xl mb-2">event</span>
              <p className="text-sm text-text-muted">إعلانات المحاضرات</p>
            </div>
          </div>

          {/* Form */}
          {status === "success" ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-icons-outlined text-3xl text-green-600">check_circle</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">تم الاشتراك بنجاح!</h3>
              <p className="text-text-muted mb-6">{message}</p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-hover transition-colors"
              >
                <span className="material-icons-outlined">home</span>
                العودة للرئيسية
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  الاسم (اختياري)
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="أدخل اسمك"
                  className="w-full px-4 py-3 bg-background dark:bg-background-alt border border-border rounded-xl text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  البريد الإلكتروني <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="أدخل بريدك الإلكتروني"
                  required
                  className="w-full px-4 py-3 bg-background dark:bg-background-alt border border-border rounded-xl text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {status === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-xl font-bold text-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <>
                    <span className="material-icons-outlined animate-spin">sync</span>
                    جاري الاشتراك...
                  </>
                ) : (
                  <>
                    <span className="material-icons-outlined">mail</span>
                    اشترك الآن
                  </>
                )}
              </button>

              <p className="text-xs text-text-muted text-center">
                بالاشتراك، فإنك توافق على{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  سياسة الخصوصية
                </Link>{" "}
                الخاصة بنا
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
