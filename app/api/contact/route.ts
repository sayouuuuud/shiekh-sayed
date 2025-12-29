import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "الاسم والبريد الإلكتروني والرسالة مطلوبة" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "البريد الإلكتروني غير صحيح" }, { status: 400 })
    }

    // Validate message length
    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json({ error: "يجب أن تكون الرسالة بين 10 و 5000 حرف" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("messages")
      .insert({
        name,
        email,
        subject: subject || null,
        message,
        is_read: false,
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Contact error:", error)
      return NextResponse.json({ error: "حدث خطأ في إرسال الرسالة" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً",
      data,
    })
  } catch (error) {
    console.error("[v0] Contact error:", error)
    return NextResponse.json({ error: "حدث خطأ في إرسال الرسالة" }, { status: 500 })
  }
}
