"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    setStatus("loading")

    try {
      const supabase = createClient()
      const { error } = await supabase.from("subscribers").insert({ email })

      if (error) {
        if (error.code === "23505") {
          setMessage("هذا البريد مسجل بالفعل")
        } else {
          setMessage("حدث خطأ، يرجى المحاولة مرة أخرى")
        }
        setStatus("error")
        return
      }

      setMessage("تم الاشتراك بنجاح!")
      setStatus("success")
      setEmail("")
    } catch {
      setMessage("حدث خطأ، يرجى المحاولة مرة أخرى")
      setStatus("error")
    }
  }

  return (
    <section className="py-16 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="2" fill="currentColor" className="text-white" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-medium mb-4 backdrop-blur-sm text-white">
          <span className="material-icons-outlined text-sm">mail</span>
          <span>القائمة البريدية</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white font-serif">ابق على اطلاع بكل جديد</h2>
        <p className="text-green-100 mb-8 max-w-xl mx-auto">
          اشترك في القائمة البريدية لتصلك الدروس والمقالات الجديدة مباشرة إلى بريدك الإلكتروني.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="البريد الإلكتروني"
            disabled={status === "loading"}
            className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/60 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary backdrop-blur-sm disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-secondary hover:bg-secondary-hover text-primary font-bold px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "جاري الاشتراك..." : "اشترك الآن"}
          </button>
        </form>

        {message && (
          <p className={`text-sm mt-4 ${status === "success" ? "text-green-200" : "text-red-200"}`}>{message}</p>
        )}

        <p className="text-xs text-green-200 mt-4 opacity-80">نحترم خصوصيتك. لن نشارك بريدك مع أي طرف ثالث.</p>
      </div>
    </section>
  )
}
