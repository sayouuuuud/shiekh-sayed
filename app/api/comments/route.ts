import { type NextRequest, NextResponse } from "next/server"
import { createComment, getApprovedComments, approveComment, rejectComment } from "@/lib/appwrite/comments"

// GET - Fetch approved comments for content
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const contentId = searchParams.get("contentId")
    const contentType = searchParams.get("contentType")

    if (!contentId || !contentType) {
      return NextResponse.json({ error: "contentId و contentType مطلوبان" }, { status: 400 })
    }

    const comments = await getApprovedComments(contentId, contentType)
    return NextResponse.json({ comments })
  } catch {
    return NextResponse.json({ error: "حدث خطأ في جلب التعليقات" }, { status: 500 })
  }
}

// POST - Submit new comment (public)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content_id, content_type, author_name, author_email, comment_text } = body

    // Validate required fields
    if (!content_id || !content_type || !author_name || !author_email || !comment_text) {
      return NextResponse.json({ error: "جميع الحقول مطلوبة" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(author_email)) {
      return NextResponse.json({ error: "البريد الإلكتروني غير صحيح" }, { status: 400 })
    }

    // Validate comment length
    if (comment_text.length < 10 || comment_text.length > 5000) {
      return NextResponse.json({ error: "يجب أن يكون التعليق بين 10 و 5000 حرف" }, { status: 400 })
    }

    const comment = await createComment({
      content_id,
      content_type,
      author_name,
      author_email,
      comment_text,
    })

    return NextResponse.json({
      success: true,
      message: "تم إرسال تعليقك بنجاح وسيتم مراجعته قبل النشر",
      comment,
    })
  } catch {
    return NextResponse.json({ error: "حدث خطأ في إرسال التعليق" }, { status: 500 })
  }
}

// PATCH - Approve comment (admin only)
export async function PATCH(request: NextRequest) {
  try {
    // Check authentication via cookie
    const sessionCookie = request.cookies.get("appwrite-session")
    if (!sessionCookie) {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 })
    }

    const body = await request.json()
    const { id, action } = body

    if (!id || !action) {
      return NextResponse.json({ error: "id و action مطلوبان" }, { status: 400 })
    }

    if (action === "approve") {
      const comment = await approveComment(id)
      return NextResponse.json({ success: true, comment })
    } else if (action === "reject") {
      await rejectComment(id)
      return NextResponse.json({ success: true, message: "تم حذف التعليق" })
    }

    return NextResponse.json({ error: "إجراء غير صحيح" }, { status: 400 })
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 })
  }
}
