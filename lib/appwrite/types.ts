// Database types for Appwrite collections

export type PublishStatus = "draft" | "published"
export type MediaType = "audio" | "video"
export type MediaSource = "local" | "youtube"
export type ContentType = "sermon" | "lesson" | "article" | "book" | "media"

export interface Sermon {
  $id: string
  $createdAt: string
  $updatedAt: string
  title: string
  content: string
  audio_file_path?: string
  thumbnail_path?: string
  category_id?: string
  tags: string[]
  publish_status: PublishStatus
  views_count: number
}

export interface Lesson {
  $id: string
  $createdAt: string
  $updatedAt: string
  title: string
  description: string
  type: MediaType
  media_source: MediaSource
  media_path_or_url: string
  thumbnail_path?: string
  transcript?: string
  category_id?: string
  tags: string[]
  publish_status: PublishStatus
  views_count: number
}

export interface Article {
  $id: string
  $createdAt: string
  $updatedAt: string
  title: string
  content: string
  featured_image_path?: string
  author: string
  category_id?: string
  tags: string[]
  seo_title?: string
  seo_description?: string
  seo_keywords?: string
  publish_status: PublishStatus
  views_count: number
}

export interface Book {
  $id: string
  $createdAt: string
  $updatedAt: string
  title: string
  author: string
  description: string
  cover_image_path?: string
  pdf_file_path?: string
  category_id?: string
  publish_status: PublishStatus
  download_count: number
}

export interface Media {
  $id: string
  $createdAt: string
  title: string
  type: MediaType
  source: MediaSource
  path_or_url: string
  thumbnail_path?: string
  category_id?: string
  views_count: number
}

export interface Category {
  $id: string
  $createdAt: string
  name: string
  slug: string
  content_type: ContentType
}

export interface Comment {
  $id: string
  $createdAt: string
  content_id: string
  content_type: string
  author_name: string
  author_email: string
  comment_text: string
  approved: boolean
}

export interface Subscriber {
  $id: string
  subscribed_at: string
  email: string
  active: boolean
}

export interface HeroSection {
  $id: string
  $updatedAt: string
  hadith_arabic: string
  hadith_translation: string
  hadith_explanation: string
  hadith_button_text: string
  hadith_button_link: string
  featured_book_id?: string
  book_custom_text?: string
  book_button_text: string
  book_button_link: string
}

export interface SiteContent {
  $id: string
  $updatedAt: string
  section_key: string
  content: string
}

export interface SeoSettings {
  $id: string
  $updatedAt: string
  page_identifier: string
  title: string
  description: string
  keywords: string
  og_image?: string
  custom_meta?: Record<string, string>
}

export interface SectionsOrder {
  $id: string
  $updatedAt: string
  section_name: string
  display_order: number
  enabled: boolean
  page: string
}

// Pagination types
export interface PaginatedResponse<T> {
  documents: T[]
  total: number
}
