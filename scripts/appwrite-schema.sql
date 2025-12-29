-- Appwrite Database Schema for Islamic Platform
-- Run these commands in Appwrite Console or via CLI

-- Note: Appwrite uses a different schema syntax, this is a reference for creating collections

/*
=== COLLECTION: sermons ===
Attributes:
- title: string (required, size: 500)
- content: string (required, size: 1000000) -- Rich text HTML
- audio_file_path: string (optional, size: 1000)
- thumbnail_path: string (optional, size: 1000)
- category_id: string (optional, size: 36)
- tags: string[] (optional)
- publish_status: enum ['draft', 'published'] (required)
- views_count: integer (required, default: 0)

Indexes:
- title_search: fulltext on [title]
- publish_status_idx: key on [publish_status]
- category_idx: key on [category_id]
- created_at_idx: key on [$createdAt]

=== COLLECTION: lessons ===
Attributes:
- title: string (required, size: 500)
- description: string (required, size: 1000000)
- type: enum ['audio', 'video'] (required)
- media_source: enum ['local', 'youtube'] (required)
- media_path_or_url: string (required, size: 1000)
- thumbnail_path: string (optional, size: 1000)
- transcript: string (optional, size: 1000000)
- category_id: string (optional, size: 36)
- tags: string[] (optional)
- publish_status: enum ['draft', 'published'] (required)
- views_count: integer (required, default: 0)

Indexes:
- title_search: fulltext on [title]
- type_idx: key on [type]
- publish_status_idx: key on [publish_status]

=== COLLECTION: articles ===
Attributes:
- title: string (required, size: 500)
- content: string (required, size: 1000000)
- featured_image_path: string (optional, size: 1000)
- author: string (required, size: 200)
- category_id: string (optional, size: 36)
- tags: string[] (optional)
- seo_title: string (optional, size: 200)
- seo_description: string (optional, size: 500)
- seo_keywords: string (optional, size: 500)
- publish_status: enum ['draft', 'published'] (required)
- views_count: integer (required, default: 0)

=== COLLECTION: books ===
Attributes:
- title: string (required, size: 500)
- author: string (required, size: 200)
- description: string (required, size: 1000000)
- cover_image_path: string (optional, size: 1000)
- pdf_file_path: string (optional, size: 1000)
- category_id: string (optional, size: 36)
- publish_status: enum ['draft', 'published'] (required)
- download_count: integer (required, default: 0)

=== COLLECTION: categories ===
Attributes:
- name: string (required, size: 100)
- slug: string (required, size: 100, unique)
- content_type: enum ['sermon', 'lesson', 'article', 'book', 'media'] (required)

=== COLLECTION: comments ===
Attributes:
- content_id: string (required, size: 36)
- content_type: string (required, size: 50)
- author_name: string (required, size: 100)
- author_email: string (required, size: 255)
- comment_text: string (required, size: 5000)
- approved: boolean (required, default: false)

Indexes:
- content_idx: key on [content_id, content_type]
- approved_idx: key on [approved]

=== COLLECTION: subscribers ===
Attributes:
- email: string (required, size: 255, unique)
- subscribed_at: datetime (required)
- active: boolean (required, default: true)

=== COLLECTION: hero_section ===
Attributes:
- hadith_arabic: string (required, size: 10000)
- hadith_translation: string (required, size: 5000)
- hadith_explanation: string (required, size: 10000)
- hadith_button_text: string (required, size: 100)
- hadith_button_link: string (required, size: 500)
- featured_book_id: string (optional, size: 36)
- book_custom_text: string (optional, size: 500)
- book_button_text: string (required, size: 100)
- book_button_link: string (required, size: 500)

=== COLLECTION: site_content ===
Attributes:
- section_key: string (required, size: 100, unique)
- content: string (required, size: 1000000)

=== COLLECTION: seo_settings ===
Attributes:
- page_identifier: string (required, size: 100, unique)
- title: string (required, size: 200)
- description: string (required, size: 500)
- keywords: string (required, size: 500)
- og_image: string (optional, size: 1000)
- custom_meta: string (optional, size: 10000) -- JSON string

=== COLLECTION: sections_order ===
Attributes:
- section_name: string (required, size: 100)
- display_order: integer (required)
- enabled: boolean (required, default: true)
- page: string (required, size: 100)

Indexes:
- page_order_idx: key on [page, display_order]
*/

-- Storage Bucket Configuration
/*
Bucket: media-files
- File size limit: 100MB
- Allowed file extensions: jpg, jpeg, png, webp, gif, mp3, wav, mp4, webm, pdf
- Enabled: File security, Antivirus
- Permissions:
  - Read: Any (for public access to uploaded files)
  - Create: Users (authenticated admins only)
  - Update: Users (authenticated admins only)
  - Delete: Users (authenticated admins only)
*/
