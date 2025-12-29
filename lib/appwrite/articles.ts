"use server"

import { databases, DATABASE_ID, COLLECTIONS, ID, Query } from "./config"
import type { Article, PaginatedResponse, PublishStatus } from "./types"

export async function getArticles(
  page = 1,
  limit = 20,
  status?: PublishStatus,
  categoryId?: string,
  search?: string,
): Promise<PaginatedResponse<Article>> {
  const queries = [Query.orderDesc("$createdAt"), Query.limit(limit), Query.offset((page - 1) * limit)]

  if (status) {
    queries.push(Query.equal("publish_status", status))
  }

  if (categoryId) {
    queries.push(Query.equal("category_id", categoryId))
  }

  if (search) {
    queries.push(Query.search("title", search))
  }

  const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.ARTICLES, queries)

  return {
    documents: response.documents as unknown as Article[],
    total: response.total,
  }
}

export async function getArticleById(id: string): Promise<Article | null> {
  try {
    const article = await databases.getDocument(DATABASE_ID, COLLECTIONS.ARTICLES, id)
    return article as unknown as Article
  } catch {
    return null
  }
}

export async function createArticle(
  data: Omit<Article, "$id" | "$createdAt" | "$updatedAt" | "views_count">,
): Promise<Article> {
  const article = await databases.createDocument(DATABASE_ID, COLLECTIONS.ARTICLES, ID.unique(), {
    ...data,
    views_count: 0,
  })
  return article as unknown as Article
}

export async function updateArticle(id: string, data: Partial<Article>): Promise<Article> {
  const article = await databases.updateDocument(DATABASE_ID, COLLECTIONS.ARTICLES, id, data)
  return article as unknown as Article
}

export async function deleteArticle(id: string): Promise<void> {
  await databases.deleteDocument(DATABASE_ID, COLLECTIONS.ARTICLES, id)
}

export async function incrementArticleViews(id: string): Promise<void> {
  const article = await getArticleById(id)
  if (article) {
    await databases.updateDocument(DATABASE_ID, COLLECTIONS.ARTICLES, id, {
      views_count: article.views_count + 1,
    })
  }
}
