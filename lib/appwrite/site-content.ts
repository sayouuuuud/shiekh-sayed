"use server"

import { databases, DATABASE_ID, COLLECTIONS, ID, Query } from "./config"
import type { SiteContent, SectionsOrder } from "./types"

export async function getSiteContent(sectionKey: string): Promise<SiteContent | null> {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.SITE_CONTENT, [
      Query.equal("section_key", sectionKey),
    ])
    return response.documents[0] as unknown as SiteContent
  } catch {
    return null
  }
}

export async function getAllSiteContent(): Promise<SiteContent[]> {
  const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.SITE_CONTENT, [Query.limit(100)])
  return response.documents as unknown as SiteContent[]
}

export async function updateSiteContent(sectionKey: string, content: string): Promise<SiteContent> {
  const existing = await getSiteContent(sectionKey)

  if (existing) {
    const siteContent = await databases.updateDocument(DATABASE_ID, COLLECTIONS.SITE_CONTENT, existing.$id, {
      content,
    })
    return siteContent as unknown as SiteContent
  } else {
    const siteContent = await databases.createDocument(DATABASE_ID, COLLECTIONS.SITE_CONTENT, ID.unique(), {
      section_key: sectionKey,
      content,
    })
    return siteContent as unknown as SiteContent
  }
}

export async function getSectionsOrder(page: string): Promise<SectionsOrder[]> {
  const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.SECTIONS_ORDER, [
    Query.equal("page", page),
    Query.orderAsc("display_order"),
  ])
  return response.documents as unknown as SectionsOrder[]
}

export async function updateSectionOrder(id: string, data: Partial<SectionsOrder>): Promise<SectionsOrder> {
  const section = await databases.updateDocument(DATABASE_ID, COLLECTIONS.SECTIONS_ORDER, id, data)
  return section as unknown as SectionsOrder
}

export async function reorderSections(sections: { id: string; display_order: number }[]): Promise<void> {
  await Promise.all(
    sections.map((section) =>
      databases.updateDocument(DATABASE_ID, COLLECTIONS.SECTIONS_ORDER, section.id, {
        display_order: section.display_order,
      }),
    ),
  )
}
