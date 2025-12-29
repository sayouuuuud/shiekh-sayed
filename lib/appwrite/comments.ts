"use server"

import { databases, DATABASE_ID, COLLECTIONS, ID, Query } from "./config"
import type { Comment, PaginatedResponse } from "./types"

export async function getComments(
  page = 1,
  limit = 20,
  approved?: boolean,
  contentId?: string,
): Promise<PaginatedResponse<Comment>> {
  const queries = [Query.orderDesc("$createdAt"), Query.limit(limit), Query.offset((page - 1) * limit)]

  if (approved !== undefined) {
    queries.push(Query.equal("approved", approved))
  }

  if (contentId) {
    queries.push(Query.equal("content_id", contentId))
  }

  const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.COMMENTS, queries)

  return {
    documents: response.documents as unknown as Comment[],
    total: response.total,
  }
}

export async function getApprovedComments(contentId: string, contentType: string): Promise<Comment[]> {
  const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.COMMENTS, [
    Query.equal("content_id", contentId),
    Query.equal("content_type", contentType),
    Query.equal("approved", true),
    Query.orderDesc("$createdAt"),
  ])
  return response.documents as unknown as Comment[]
}

export async function getPendingCommentsCount(): Promise<number> {
  const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.COMMENTS, [Query.equal("approved", false)])
  return response.total
}

export async function createComment(data: Omit<Comment, "$id" | "$createdAt" | "approved">): Promise<Comment> {
  const comment = await databases.createDocument(DATABASE_ID, COLLECTIONS.COMMENTS, ID.unique(), {
    ...data,
    approved: false,
  })
  return comment as unknown as Comment
}

export async function approveComment(id: string): Promise<Comment> {
  const comment = await databases.updateDocument(DATABASE_ID, COLLECTIONS.COMMENTS, id, {
    approved: true,
  })
  return comment as unknown as Comment
}

export async function rejectComment(id: string): Promise<void> {
  await databases.deleteDocument(DATABASE_ID, COLLECTIONS.COMMENTS, id)
}
