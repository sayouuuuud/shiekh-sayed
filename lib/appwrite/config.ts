import { Client, Databases, Storage, ID, Query, Account } from "appwrite"

// Client-side Appwrite configuration (for browser)
const client = new Client()

if (typeof window !== "undefined") {
  if (process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT && process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) {
    client
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
  }
}

// Export client-side services
export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)

// Export helpers
export { ID, Query }

// Database IDs
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || ""
export const STORAGE_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID || ""

// Collection IDs
export const COLLECTIONS = {
  SERMONS: "sermons",
  LESSONS: "lessons",
  ARTICLES: "articles",
  BOOKS: "books",
  MEDIA: "media",
  CATEGORIES: "categories",
  COMMENTS: "comments",
  SUBSCRIBERS: "subscribers",
  HERO_SECTION: "hero_section",
  SITE_CONTENT: "site_content",
  SEO_SETTINGS: "seo_settings",
  SECTIONS_ORDER: "sections_order",
  ABOUT_PAGE: "about_page",
} as const

export default client
