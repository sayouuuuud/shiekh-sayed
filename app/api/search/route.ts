import { type NextRequest, NextResponse } from "next/server"
import { databases, DATABASE_ID, COLLECTIONS, Query } from "@/lib/appwrite/config"

export async function POST(request: NextRequest) {
  try {
    const { query, contentTypes } = await request.json()

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ error: "يجب أن يكون البحث على الأقل حرفين" }, { status: 400 })
    }

    const searchQuery = query.trim()
    const types = contentTypes || ["sermons", "lessons", "articles", "books"]
    const results: Record<string, unknown[]> = {}

    // Search in each content type
    const searchPromises = types.map(async (type: string) => {
      try {
        let collectionId: string
        switch (type) {
          case "sermons":
            collectionId = COLLECTIONS.SERMONS
            break
          case "lessons":
            collectionId = COLLECTIONS.LESSONS
            break
          case "articles":
            collectionId = COLLECTIONS.ARTICLES
            break
          case "books":
            collectionId = COLLECTIONS.BOOKS
            break
          default:
            return { type, documents: [] }
        }

        const response = await databases.listDocuments(DATABASE_ID, collectionId, [
          Query.search("title", searchQuery),
          Query.equal("publish_status", "published"),
          Query.limit(10),
        ])

        return { type, documents: response.documents }
      } catch {
        return { type, documents: [] }
      }
    })

    const searchResults = await Promise.all(searchPromises)

    searchResults.forEach(({ type, documents }) => {
      results[type] = documents
    })

    return NextResponse.json({ results })
  } catch {
    return NextResponse.json({ error: "حدث خطأ في البحث" }, { status: 500 })
  }
}
