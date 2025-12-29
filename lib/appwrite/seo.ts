"use server"

import { databases, DATABASE_ID, COLLECTIONS, ID, Query } from "./config"
import type { SeoSettings } from "./types"

export async function getSeoSettings(pageIdentifier: string): Promise<SeoSettings | null> {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.SEO_SETTINGS, [
      Query.equal("page_identifier", pageIdentifier),
    ])
    return response.documents[0] as unknown as SeoSettings
  } catch {
    return null
  }
}

export async function getAllSeoSettings(): Promise<SeoSettings[]> {
  const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.SEO_SETTINGS, [Query.limit(100)])
  return response.documents as unknown as SeoSettings[]
}

export async function updateSeoSettings(pageIdentifier: string, data: Partial<SeoSettings>): Promise<SeoSettings> {
  const existing = await getSeoSettings(pageIdentifier)

  if (existing) {
    const seoSettings = await databases.updateDocument(DATABASE_ID, COLLECTIONS.SEO_SETTINGS, existing.$id, data)
    return seoSettings as unknown as SeoSettings
  } else {
    const seoSettings = await databases.createDocument(DATABASE_ID, COLLECTIONS.SEO_SETTINGS, ID.unique(), {
      page_identifier: pageIdentifier,
      ...data,
    })
    return seoSettings as unknown as SeoSettings
  }
}
