# Database Migration Guide

## Important: Fix Database Errors

The application is currently showing errors because some database columns and tables are missing. Follow these steps to fix the issues:

## Step 1: Run the Migration Script

1. **Open your Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Select your project

2. **Navigate to SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "+ New query"

3. **Copy and Paste the Migration Script**
   - Open the file `scripts/000-run-this-first.sql`
   - Copy ALL the contents
   - Paste into the Supabase SQL Editor

4. **Run the Script**
   - Click the "Run" button (or press Ctrl+Enter / Cmd+Enter)
   - Wait for confirmation message: "Success. No rows returned"

## Step 2: Verify the Changes

After running the migration, verify that the new columns exist:

\`\`\`sql
-- Check lessons table columns
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'lessons';

-- You should see: is_active, lesson_type, is_archived
\`\`\`

## Step 3: Test the Application

1. Refresh your application in the browser
2. The errors should be gone
3. Check these pages to confirm:
   - Home page (should load without errors)
   - Lessons/Dars page (should show categorized lessons)
   - Schedule page (should show calendar)

## What This Migration Does

### Adds Missing Columns:
- `lessons.is_active` - Controls visibility of lessons
- `lessons.lesson_type` - Categories: fiqh, seerah, general
- `lessons.is_archived` - Archive old lessons
- `sermons.is_active` - Controls visibility of sermons
- `sermons.media_source` - YouTube or local audio
- `articles.is_active` - Controls visibility of articles
- `books.is_active` - Controls visibility of books
- `categories.parent_category_id` - Hierarchical categories

### Creates New Tables:
- `schedule_events` - Calendar events
- `hero_section` - Homepage hero content
- `weekly_schedule` - Weekly schedule display
- `sheikh_profile` - Sheikh's profile information
- `notifications` - Admin notifications
- `appearance_settings` - Site theme settings
- `site_analytics` - Page view analytics
- `contact_form_settings` - Contact form configuration
- `contact_submissions` - Contact form submissions

### Performance Optimizations:
- Adds database indexes for faster queries
- Enables Row Level Security (RLS) policies
- Creates proper foreign key relationships

## Troubleshooting

### Error: "relation already exists"
This is normal - it means the table was already created. The script uses `IF NOT EXISTS` to prevent errors.

### Error: "column already exists"
This is also normal - the script uses `ADD COLUMN IF NOT EXISTS` to safely add columns.

### Error: "permission denied"
Make sure you're logged in as the database owner or have admin privileges.

## Need Help?

If you encounter any issues:
1. Check the Supabase logs in the SQL Editor
2. Make sure you copied the ENTIRE script
3. Verify you're running the script in the correct project

## After Migration

Once the migration is complete, all features will work properly:
- ✅ Home page loads without errors
- ✅ Lessons page shows categorized content
- ✅ Schedule page displays events
- ✅ Admin pages can manage all content
- ✅ Dark mode works correctly
- ✅ All filters work properly
