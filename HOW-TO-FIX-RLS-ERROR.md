# How to Fix "Permission Denied for Schema Public" Error

## The Problem
You're seeing errors like:
\`\`\`
permission denied for schema public
\`\`\`

This happens because Row Level Security (RLS) is enabled on your database tables, but the policies that allow public read access haven't been created yet.

## The Solution

### Option 1: Run the Emergency RLS Fix (FASTEST)
If you already ran `FINAL-RUN-THIS-FIRST.sql` and still have errors:

1. Go to Supabase Dashboard → SQL Editor
2. Open the file: `scripts/EMERGENCY-FIX-RLS.sql`
3. Copy ALL the code
4. Paste and click "Run"
5. Refresh your v0 preview

This will create proper RLS policies that allow anonymous users to read public content.

### Option 2: Run the Complete Setup (RECOMMENDED)
If you haven't run any migrations yet:

1. Go to Supabase Dashboard → SQL Editor
2. Open the file: `scripts/FINAL-RUN-THIS-FIRST.sql`
3. Copy ALL the code
4. Paste and click "Run"
5. Refresh your v0 preview

This will create all tables AND all RLS policies in one go.

## What These Scripts Do

The RLS policies allow:
- **Anonymous users (public)** can READ all published content (sermons, lessons, articles, books, etc.)
- **Anonymous users** can INSERT contact form submissions and subscribe to newsletters
- **Authenticated users (admin)** can do everything (create, update, delete)

## Verify It Worked

After running the script:
1. Refresh your v0 preview
2. The home page should load without errors
3. Check the browser console - no more "401" or "permission denied" errors

## Still Having Issues?

If you still see errors after running the scripts, check:
1. Did the SQL script run successfully without errors?
2. Are you using the correct Supabase project?
3. Try refreshing the browser cache (Ctrl+Shift+R or Cmd+Shift+R)
