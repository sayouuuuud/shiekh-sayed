"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { Loader2, Shield, Key, Eye, EyeOff } from "lucide-react"

export default function SecurityPage() {
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [showPasswords, setShowPasswords] = useState(false)
  const supabase = createClient()

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage("")

    if (passwords.new !== passwords.confirm) {
      setMessage("كلمة المرور الجديدة غير متطابقة")
      setSaving(false)
      return
    }

    if (passwords.new.length < 6) {
      setMessage("كلمة المرور يجب أن تكون 6 أحرف على الأقل")
      setSaving(false)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwords.new,
      })

      if (error) throw error

      setMessage("تم تغيير كلمة المرور بنجاح")
      setPasswords({ current: "", new: "", confirm: "" })
    } catch (error: any) {
      console.error("Error changing password:", error)
      setMessage(error.message || "حدث خطأ أثناء تغيير كلمة المرور")
    }
    setSaving(false)
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mb-3">
          الأمان
        </span>
        <h1 className="text-4xl font-bold text-foreground dark:text-white mb-4 font-serif">إعدادات الأمان</h1>
        <p className="text-text-muted max-w-2xl mx-auto">إدارة كلمة المرور وإعدادات الأمان لحسابك</p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-center max-w-md mx-auto ${
            message.includes("خطأ") || message.includes("غير متطابقة") || message.includes("يجب")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </div>
      )}

      <div className="max-w-md mx-auto">
        {/* Change Password */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Key className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground dark:text-white">تغيير كلمة المرور</h2>
              <p className="text-sm text-text-muted">تحديث كلمة مرور حسابك</p>
            </div>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-2">
              <Label>كلمة المرور الحالية</Label>
              <div className="relative">
                <Input
                  type={showPasswords ? "text" : "password"}
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                  onClick={() => setShowPasswords(!showPasswords)}
                >
                  {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>كلمة المرور الجديدة</Label>
              <Input
                type={showPasswords ? "text" : "password"}
                value={passwords.new}
                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <Label>تأكيد كلمة المرور</Label>
              <Input
                type={showPasswords ? "text" : "password"}
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" disabled={saving} className="w-full bg-primary hover:bg-primary-hover text-white">
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                  جاري التحديث...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 ml-2" />
                  تحديث كلمة المرور
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
