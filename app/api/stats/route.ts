import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Fetch all stats from database
    const [
      { count: sermonsCount },
      { count: lessonsCount },
      { count: articlesCount },
      { count: booksCount },
      { count: subscribersCount },
      { data: analyticsData },
    ] = await Promise.all([
      supabase.from("sermons").select("*", { count: "exact", head: true }),
      supabase.from("lessons").select("*", { count: "exact", head: true }),
      supabase.from("articles").select("*", { count: "exact", head: true }),
      supabase.from("books").select("*", { count: "exact", head: true }),
      supabase.from("subscribers").select("*", { count: "exact", head: true }),
      supabase
        .from("site_analytics")
        .select("*")
        .gte("date", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0])
        .order("date", { ascending: true }),
    ])

    // Calculate total views from analytics
    const totalViews = analyticsData?.reduce((sum, day) => sum + (day.views_count || 0), 0) || 0

    const stats = {
      sermons: sermonsCount || 0,
      lessons: lessonsCount || 0,
      articles: articlesCount || 0,
      books: booksCount || 0,
      subscribers: subscribersCount || 0,
      totalViews,
      analytics: analyticsData || [],
    }

    return NextResponse.json({ stats })
  } catch (error) {
    console.error("Stats API Error:", error)
    return NextResponse.json({ error: "حدث خطأ في جلب الإحصائيات" }, { status: 500 })
  }
}
