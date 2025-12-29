"use server"

import { databases, DATABASE_ID, COLLECTIONS, Query } from "./config"
import { getPendingCommentsCount } from "./comments"

export interface DashboardStats {
  sermons: number
  lessons: number
  articles: number
  books: number
  subscribers: number
  pendingComments: number
  totalViews: number
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [sermons, lessons, articles, books, subscribers, pendingComments] = await Promise.all([
    databases.listDocuments(DATABASE_ID, COLLECTIONS.SERMONS, [Query.limit(1)]),
    databases.listDocuments(DATABASE_ID, COLLECTIONS.LESSONS, [Query.limit(1)]),
    databases.listDocuments(DATABASE_ID, COLLECTIONS.ARTICLES, [Query.limit(1)]),
    databases.listDocuments(DATABASE_ID, COLLECTIONS.BOOKS, [Query.limit(1)]),
    databases.listDocuments(DATABASE_ID, COLLECTIONS.SUBSCRIBERS, [Query.equal("active", true), Query.limit(1)]),
    getPendingCommentsCount(),
  ])

  // Calculate total views from all content types
  const allSermons = await databases.listDocuments(DATABASE_ID, COLLECTIONS.SERMONS, [Query.limit(1000)])
  const allLessons = await databases.listDocuments(DATABASE_ID, COLLECTIONS.LESSONS, [Query.limit(1000)])
  const allArticles = await databases.listDocuments(DATABASE_ID, COLLECTIONS.ARTICLES, [Query.limit(1000)])

  const totalViews =
    allSermons.documents.reduce((sum, doc) => sum + ((doc as Record<string, number>).views_count || 0), 0) +
    allLessons.documents.reduce((sum, doc) => sum + ((doc as Record<string, number>).views_count || 0), 0) +
    allArticles.documents.reduce((sum, doc) => sum + ((doc as Record<string, number>).views_count || 0), 0)

  return {
    sermons: sermons.total,
    lessons: lessons.total,
    articles: articles.total,
    books: books.total,
    subscribers: subscribers.total,
    pendingComments,
    totalViews,
  }
}
