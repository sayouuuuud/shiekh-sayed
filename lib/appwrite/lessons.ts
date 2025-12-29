"use server"

import { databases, DATABASE_ID, COLLECTIONS, ID, Query } from "./config"
import type { Lesson, PaginatedResponse, PublishStatus, MediaType } from "./types"

export async function getLessons(
  page = 1,
  limit = 20,
  status?: PublishStatus,
  type?: MediaType,
  categoryId?: string,
  search?: string,
): Promise<PaginatedResponse<Lesson>> {
  const queries = [Query.orderDesc("$createdAt"), Query.limit(limit), Query.offset((page - 1) * limit)]

  if (status) {
    queries.push(Query.equal("publish_status", status))
  }

  if (type) {
    queries.push(Query.equal("type", type))
  }

  if (categoryId) {
    queries.push(Query.equal("category_id", categoryId))
  }

  if (search) {
    queries.push(Query.search("title", search))
  }

  const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.LESSONS, queries)

  return {
    documents: response.documents as unknown as Lesson[],
    total: response.total,
  }
}

export async function getLessonById(id: string): Promise<Lesson | null> {
  try {
    const lesson = await databases.getDocument(DATABASE_ID, COLLECTIONS.LESSONS, id)
    return lesson as unknown as Lesson
  } catch {
    return null
  }
}

export async function createLesson(
  data: Omit<Lesson, "$id" | "$createdAt" | "$updatedAt" | "views_count">,
): Promise<Lesson> {
  const lesson = await databases.createDocument(DATABASE_ID, COLLECTIONS.LESSONS, ID.unique(), {
    ...data,
    views_count: 0,
  })
  return lesson as unknown as Lesson
}

export async function updateLesson(id: string, data: Partial<Lesson>): Promise<Lesson> {
  const lesson = await databases.updateDocument(DATABASE_ID, COLLECTIONS.LESSONS, id, data)
  return lesson as unknown as Lesson
}

export async function deleteLesson(id: string): Promise<void> {
  await databases.deleteDocument(DATABASE_ID, COLLECTIONS.LESSONS, id)
}

export async function incrementLessonViews(id: string): Promise<void> {
  const lesson = await getLessonById(id)
  if (lesson) {
    await databases.updateDocument(DATABASE_ID, COLLECTIONS.LESSONS, id, {
      views_count: lesson.views_count + 1,
    })
  }
}
