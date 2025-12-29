# Appwrite Integration Setup Guide

## Step 1: Create Appwrite Cloud Account

1. Go to https://cloud.appwrite.io
2. Click "Create Account"
3. Sign up with email and password
4. Verify your email
5. Create a new Project (name it after your site, e.g., "Sayed Mourad")

## Step 2: Get Your Project Credentials

After creating your project, go to **Settings** and find:
- **Project ID** - Copy this
- **API Endpoint** - Should be `https://cloud.appwrite.io/v1`

## Step 3: Create Database

1. In your Appwrite Console, go to **Databases** section
2. Click **Create Database**
3. Name it "IslamicContent"
4. Copy the **Database ID**

## Step 4: Create Collections

Create the following collections in your database:

### 4.1 Sermons Collection
\`\`\`
Collection ID: sermons
Attributes:
- title (string, required)
- content (string, required)
- audio_file_path (string)
- thumbnail_path (string)
- category_id (string)
- tags (array of strings)
- publish_status (enum: draft, published) - default: draft
- views_count (integer) - default: 0
\`\`\`

### 4.2 Lessons Collection
\`\`\`
Collection ID: lessons
Attributes:
- title (string, required)
- description (string, required)
- type (enum: audio, video) - required
- media_source (enum: local, youtube) - required
- media_path_or_url (string, required)
- thumbnail_path (string)
- transcript (string)
- category_id (string)
- tags (array of strings)
- publish_status (enum: draft, published) - default: draft
- views_count (integer) - default: 0
\`\`\`

### 4.3 Articles Collection
\`\`\`
Collection ID: articles
Attributes:
- title (string, required)
- content (string, required)
- featured_image_path (string)
- author (string, required)
- category_id (string)
- tags (array of strings)
- seo_title (string)
- seo_description (string)
- seo_keywords (string)
- publish_status (enum: draft, published) - default: draft
- views_count (integer) - default: 0
\`\`\`

### 4.4 Books Collection
\`\`\`
Collection ID: books
Attributes:
- title (string, required)
- author (string, required)
- description (string, required)
- cover_image_path (string)
- pdf_file_path (string)
- category_id (string)
- publish_status (enum: draft, published) - default: draft
- download_count (integer) - default: 0
\`\`\`

### 4.5 Categories Collection
\`\`\`
Collection ID: categories
Attributes:
- name (string, required)
- slug (string, required)
- content_type (enum: sermon, lesson, article, book, media)
\`\`\`

### 4.6 Comments Collection
\`\`\`
Collection ID: comments
Attributes:
- content_id (string, required)
- content_type (string, required)
- author_name (string, required)
- author_email (string, required)
- comment_text (string, required)
- approved (boolean) - default: false
\`\`\`

### 4.7 Subscribers Collection
\`\`\`
Collection ID: subscribers
Attributes:
- email (string, required, unique)
- subscribed_at (datetime, required)
- active (boolean) - default: true
\`\`\`

### 4.8 Hero Section Collection
\`\`\`
Collection ID: hero_section
Attributes:
- hadith_arabic (string, required)
- hadith_translation (string, required)
- hadith_explanation (string)
- hadith_button_text (string)
- hadith_button_link (string)
- featured_book_id (string)
- book_custom_text (string)
- book_button_text (string)
- book_button_link (string)
\`\`\`

## Step 5: Create Storage Bucket

1. Go to **Storage** section
2. Click **Create Bucket**
3. Name it "media"
4. Copy the **Bucket ID**
5. Configure Bucket Permissions:
   - Allow reads for all users (public)
   - Restrict writes to authenticated users only

## Step 6: Create Admin User

You can create an admin user in two ways:

### Option A: Using Appwrite Console (Recommended for first admin)
1. Go to **Auth** → **Users**
2. Click **Create User**
3. Enter email and password
4. The user is now an admin

### Option B: Using the Application
1. The application has logic to create admins (see `lib/appwrite/auth.ts`)
2. Modify the login page to expose a registration endpoint

## Step 7: Configure Environment Variables

1. Copy `.env.example` to `.env.local`
2. Fill in the values:

\`\`\`env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id_here
NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID=media

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME=الشيخ السيد مراد
\`\`\`

## Step 8: Test the Setup

### Test Authentication
\`\`\`bash
npm run dev
# Visit http://localhost:3000/admin/login
# Try to login (should fail until you create a user)
\`\`\`

### Test Database Operations
Create a simple test in `scripts/test-appwrite.ts`:

\`\`\`typescript
import { getSermons, createSermon } from "@/lib/appwrite/sermons"

async function testAppwrite() {
  try {
    // Test create
    const sermon = await createSermon({
      title: "خطبة الاختبار",
      content: "محتوى الخطبة",
      publish_status: "draft",
      tags: [],
    })
    console.log("Created sermon:", sermon)

    // Test read
    const sermons = await getSermons()
    console.log("Fetched sermons:", sermons)
  } catch (error) {
    console.error("Error:", error)
  }
}

testAppwrite()
\`\`\`

## How to Use in Your Pages

### Example 1: Display Sermons
\`\`\`tsx
import { getSermons } from "@/lib/appwrite/sermons"

export default async function SermonsPage() {
  const { documents: sermons } = await getSermons()

  return (
    <div>
      {sermons.map((sermon) => (
        <div key={sermon.$id}>
          <h3>{sermon.title}</h3>
          <p>{sermon.views_count} views</p>
        </div>
      ))}
    </div>
  )
}
\`\`\`

### Example 2: Submit Comment (Client)
\`\`\`tsx
"use client"

async function handleCommentSubmit(data) {
  const response = await fetch("/api/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content_id: contentId,
      content_type: "sermon",
      author_name: data.name,
      author_email: data.email,
      comment_text: data.text,
    }),
  })

  const result = await response.json()
  console.log(result.message) // "تم إرسال تعليقك بنجاح وسيتم مراجعته قبل النشر"
}
\`\`\`

### Example 3: Admin - Approve Comments
\`\`\`tsx
async function approveComment(commentId: string) {
  const response = await fetch("/api/comments", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: commentId,
      action: "approve",
    }),
    credentials: "include", // Send cookies
  })

  const result = await response.json()
  console.log(result.comment) // Approved comment
}
\`\`\`

### Example 4: Upload File (Admin)
\`\`\`tsx
async function uploadBookCover(file: File) {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("fileType", "image")

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
    credentials: "include", // Send auth cookie
  })

  const { url } = await response.json()
  return url // Use this URL when creating a book
}
\`\`\`

### Example 5: Admin Dashboard Statistics
\`\`\`tsx
import { getDashboardStats } from "@/lib/appwrite/stats"

export default async function DashboardPage() {
  const stats = await getDashboardStats()

  return (
    <div className="grid grid-cols-4 gap-4">
      <Card title="Sermons" value={stats.sermons} />
      <Card title="Lessons" value={stats.lessons} />
      <Card title="Articles" value={stats.articles} />
      <Card title="Books" value={stats.books} />
      <Card title="Subscribers" value={stats.subscribers} />
      <Card title="Pending Comments" value={stats.pendingComments} />
      <Card title="Total Views" value={stats.totalViews} />
    </div>
  )
}
\`\`\`

## Troubleshooting

### "Invalid API Endpoint"
- Check your `.env.local` file
- Ensure `NEXT_PUBLIC_APPWRITE_ENDPOINT` is exactly `https://cloud.appwrite.io/v1`
- Restart your dev server after changing env variables

### "Project not found"
- Verify `NEXT_PUBLIC_APPWRITE_PROJECT_ID` is correct
- Check it matches your Appwrite Console project ID

### "Database not found"
- Ensure you created the database in Appwrite
- Verify `NEXT_PUBLIC_APPWRITE_DATABASE_ID` matches

### "Unauthorized to create session"
- Make sure your admin user was created in Appwrite Auth
- Check the email and password are correct

### "Files not uploading"
- Create a Storage bucket called "media"
- Set proper permissions (Allow public reads, restrict writes to auth)
- Verify `NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID` is "media"

### "Comments not saving"
- Check that the `comments` collection exists
- Verify all required attributes are defined
- Check browser console for validation errors

## Architecture Overview

\`\`\`
User Interface (Next.js Pages/Components)
           ↓
API Routes (app/api/*)
    ↓           ↓
Server Actions    HTTP Client
    ↓           ↓
lib/appwrite/* (CRUD Functions)
           ↓
Appwrite SDK
           ↓
Appwrite Cloud (Database, Storage, Auth)
\`\`\`

## Security Notes

1. **Session Cookies**: Admin routes are protected by session cookies set during login
2. **Authentication Check**: API routes check for `appwrite-session` cookie
3. **Input Validation**: All API routes validate inputs before processing
4. **File Validation**: File uploads validate type and size
5. **CORS**: Appwrite handles CORS by default for cloud instances

## Next Steps

1. ✅ Create admin user
2. ✅ Add some test data (sermons, books, articles)
3. ✅ Visit http://localhost:3000 to see public pages
4. ✅ Visit http://localhost:3000/admin/login to access admin panel
5. ✅ Start managing your content!

---

For more help, visit:
- Appwrite Docs: https://appwrite.io/docs
- This project's README: See root directory
