"use server"

import { databases, DATABASE_ID, COLLECTIONS, ID, Query } from "./config"
import type { Sermon, PaginatedResponse, PublishStatus } from "./types"

export async function getSermons(
  page = 1,
  limit = 20,
  status?: PublishStatus,
  categoryId?: string,
  search?: string,
): Promise<PaginatedResponse<Sermon>> {
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

  const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.SERMONS, queries)

  return {
    documents: response.documents as unknown as Sermon[],
    total: response.total,
  }
}

export async function getSermonById(id: string): Promise<Sermon | null> {
  try {
    const sermon = await databases.getDocument(DATABASE_ID, COLLECTIONS.SERMONS, id)
    return sermon as unknown as Sermon
  } catch {
    return null
  }
}

export async function createSermon(
  data: Omit<Sermon, "$id" | "$createdAt" | "$updatedAt" | "views_count">,
): Promise<Sermon> {
  const sermon = await databases.createDocument(DATABASE_ID, COLLECTIONS.SERMONS, ID.unique(), {
    ...data,
    views_count: 0,
  })
  return sermon as unknown as Sermon
}

export async function updateSermon(id: string, data: Partial<Sermon>): Promise<Sermon> {
  const sermon = await databases.updateDocument(DATABASE_ID, COLLECTIONS.SERMONS, id, data)
  return sermon as unknown as Sermon
}

export async function deleteSermon(id: string): Promise<void> {
  await databases.deleteDocument(DATABASE_ID, COLLECTIONS.SERMONS, id)
}

export async function incrementSermonViews(id: string): Promise<void> {
  const sermon = await getSermonById(id)
  if (sermon) {
    await databases.updateDocument(DATABASE_ID, COLLECTIONS.SERMONS, id, {
      views_count: sermon.views_count + 1,
    })
  }
}
