import { type NextRequest, NextResponse } from "next/server"
import { createSubscriber } from "@/lib/appwrite/subscribers"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email) {
      return NextResponse.json({ error: "البريد الإلكتروني مطلوب" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "البريد الإلكتروني غير صحيح" }, { status: 400 })
    }

    const subscriber = await createSubscriber(email)

    return NextResponse.json({
      success: true,
      message: "تم الاشتراك بنجاح! شكراً لانضمامك",
      subscriber,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "حدث خطأ في الاشتراك"
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
