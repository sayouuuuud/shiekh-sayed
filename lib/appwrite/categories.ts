"use server"

import { databases, DATABASE_ID, COLLECTIONS, ID, Query } from "./config"
import type { Category, ContentType } from "./types"

export async function getCategories(contentType?: ContentType): Promise<Category[]> {
  const queries = [Query.orderAsc("name")]

  if (contentType) {
    queries.push(Query.equal("content_type", contentType))
  }

  const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.CATEGORIES, queries)
  return response.documents as unknown as Category[]
}

export async function getCategoryById(id: string): Promise<Category | null> {
  try {
    const category = await databases.getDocument(DATABASE_ID, COLLECTIONS.CATEGORIES, id)
    return category as unknown as Category
  } catch {
    return null
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.CATEGORIES, [Query.equal("slug", slug)])
    return response.documents[0] as unknown as Category
  } catch {
    return null
  }
}

export async function createCategory(data: Omit<Category, "$id" | "$createdAt">): Promise<Category> {
  const category = await databases.createDocument(DATABASE_ID, COLLECTIONS.CATEGORIES, ID.unique(), data)
  return category as unknown as Category
}

export async function updateCategory(id: string, data: Partial<Category>): Promise<Category> {
  const category = await databases.updateDocument(DATABASE_ID, COLLECTIONS.CATEGORIES, id, data)
  return category as unknown as Category
}

export async function deleteCategory(id: string): Promise<void> {
  await databases.deleteDocument(DATABASE_ID, COLLECTIONS.CATEGORIES, id)
}
