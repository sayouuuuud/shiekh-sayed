"use server"

import { databases, DATABASE_ID, COLLECTIONS, ID, Query } from "./config"
import type { HeroSection } from "./types"

export async function getHeroSection(): Promise<HeroSection | null> {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.HERO_SECTION, [Query.limit(1)])
    return response.documents[0] as unknown as HeroSection
  } catch {
    return null
  }
}

export async function updateHeroSection(data: Partial<HeroSection>): Promise<HeroSection> {
  const existing = await getHeroSection()

  if (existing) {
    const heroSection = await databases.updateDocument(DATABASE_ID, COLLECTIONS.HERO_SECTION, existing.$id, data)
    return heroSection as unknown as HeroSection
  } else {
    const heroSection = await databases.createDocument(DATABASE_ID, COLLECTIONS.HERO_SECTION, ID.unique(), data)
    return heroSection as unknown as HeroSection
  }
}
