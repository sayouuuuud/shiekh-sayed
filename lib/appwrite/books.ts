"use server"

import { databases, DATABASE_ID, COLLECTIONS, ID, Query } from "./config"
import type { Book, PaginatedResponse, PublishStatus } from "./types"

export async function getBooks(
  page = 1,
  limit = 20,
  status?: PublishStatus,
  categoryId?: string,
  search?: string,
): Promise<PaginatedResponse<Book>> {
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

  const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.BOOKS, queries)

  return {
    documents: response.documents as unknown as Book[],
    total: response.total,
  }
}

export async function getBookById(id: string): Promise<Book | null> {
  try {
    const book = await databases.getDocument(DATABASE_ID, COLLECTIONS.BOOKS, id)
    return book as unknown as Book
  } catch {
    return null
  }
}

export async function createBook(
  data: Omit<Book, "$id" | "$createdAt" | "$updatedAt" | "download_count">,
): Promise<Book> {
  const book = await databases.createDocument(DATABASE_ID, COLLECTIONS.BOOKS, ID.unique(), {
    ...data,
    download_count: 0,
  })
  return book as unknown as Book
}

export async function updateBook(id: string, data: Partial<Book>): Promise<Book> {
  const book = await databases.updateDocument(DATABASE_ID, COLLECTIONS.BOOKS, id, data)
  return book as unknown as Book
}

export async function deleteBook(id: string): Promise<void> {
  await databases.deleteDocument(DATABASE_ID, COLLECTIONS.BOOKS, id)
}

export async function incrementBookDownloads(id: string): Promise<void> {
  const book = await getBookById(id)
  if (book) {
    await databases.updateDocument(DATABASE_ID, COLLECTIONS.BOOKS, id, {
      download_count: book.download_count + 1,
    })
  }
}
