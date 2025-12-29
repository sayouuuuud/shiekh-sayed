"use server"

import { databases, DATABASE_ID, COLLECTIONS, ID, Query } from "./config"
import type { Subscriber, PaginatedResponse } from "./types"

export async function getSubscribers(page = 1, limit = 50, active?: boolean): Promise<PaginatedResponse<Subscriber>> {
  const queries = [Query.orderDesc("subscribed_at"), Query.limit(limit), Query.offset((page - 1) * limit)]

  if (active !== undefined) {
    queries.push(Query.equal("active", active))
  }

  const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.SUBSCRIBERS, queries)

  return {
    documents: response.documents as unknown as Subscriber[],
    total: response.total,
  }
}

export async function getSubscriberByEmail(email: string): Promise<Subscriber | null> {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.SUBSCRIBERS, [Query.equal("email", email)])
    return response.documents[0] as unknown as Subscriber
  } catch {
    return null
  }
}

export async function createSubscriber(email: string): Promise<Subscriber> {
  // Check if already exists
  const existing = await getSubscriberByEmail(email)
  if (existing) {
    throw new Error("البريد الإلكتروني مسجل بالفعل")
  }

  const subscriber = await databases.createDocument(DATABASE_ID, COLLECTIONS.SUBSCRIBERS, ID.unique(), {
    email,
    subscribed_at: new Date().toISOString(),
    active: true,
  })
  return subscriber as unknown as Subscriber
}

export async function unsubscribe(id: string): Promise<Subscriber> {
  const subscriber = await databases.updateDocument(DATABASE_ID, COLLECTIONS.SUBSCRIBERS, id, {
    active: false,
  })
  return subscriber as unknown as Subscriber
}

export async function deleteSubscriber(id: string): Promise<void> {
  await databases.deleteDocument(DATABASE_ID, COLLECTIONS.SUBSCRIBERS, id)
}
