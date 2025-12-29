import { type NextRequest, NextResponse } from "next/server"
import { getDashboardStats } from "@/lib/appwrite/stats"

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const sessionCookie = request.cookies.get("appwrite-session")
    if (!sessionCookie) {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 })
    }

    const stats = await getDashboardStats()

    return NextResponse.json({ stats })
  } catch {
    return NextResponse.json({ error: "حدث خطأ في جلب الإحصائيات" }, { status: 500 })
  }
}
