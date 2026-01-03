-- Script to ensure is_active column exists on all tables that need it
-- This should be run to fix any missing columns

-- Add is_active to lessons if not exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'lessons' AND column_name = 'is_active'
    ) THEN
        ALTER TABLE lessons ADD COLUMN is_active BOOLEAN DEFAULT true;
    END IF;
END $$;

-- Add is_active to sermons if not exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'sermons' AND column_name = 'is_active'
    ) THEN
        ALTER TABLE sermons ADD COLUMN is_active BOOLEAN DEFAULT true;
    END IF;
END $$;

-- Add is_active to articles if not exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'articles' AND column_name = 'is_active'
    ) THEN
        ALTER TABLE articles ADD COLUMN is_active BOOLEAN DEFAULT true;
    END IF;
END $$;

-- Add is_active to books if not exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'books' AND column_name = 'is_active'
    ) THEN
        ALTER TABLE books ADD COLUMN is_active BOOLEAN DEFAULT true;
    END IF;
END $$;

-- Add is_active to weekly_schedule if table exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'weekly_schedule') THEN
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'weekly_schedule' AND column_name = 'is_active'
        ) THEN
            ALTER TABLE weekly_schedule ADD COLUMN is_active BOOLEAN DEFAULT true;
        END IF;
    END IF;
END $$;

-- Add is_active to events if table exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'events') THEN
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'events' AND column_name = 'is_active'
        ) THEN
            ALTER TABLE events ADD COLUMN is_active BOOLEAN DEFAULT true;
        END IF;
    END IF;
END $$;

-- Add is_active to social_links if table exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'social_links') THEN
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'social_links' AND column_name = 'is_active'
        ) THEN
            ALTER TABLE social_links ADD COLUMN is_active BOOLEAN DEFAULT true;
        END IF;
    END IF;
END $$;

-- Add is_active to navbar_items if table exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'navbar_items') THEN
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'navbar_items' AND column_name = 'is_active'
        ) THEN
            ALTER TABLE navbar_items ADD COLUMN is_active BOOLEAN DEFAULT true;
        END IF;
    END IF;
END $$;

-- Update all existing rows to have is_active = true where it's null (only if table exists)
DO $$ BEGIN UPDATE lessons SET is_active = true WHERE is_active IS NULL; EXCEPTION WHEN OTHERS THEN NULL; END $$;
DO $$ BEGIN UPDATE sermons SET is_active = true WHERE is_active IS NULL; EXCEPTION WHEN OTHERS THEN NULL; END $$;
DO $$ BEGIN UPDATE articles SET is_active = true WHERE is_active IS NULL; EXCEPTION WHEN OTHERS THEN NULL; END $$;
DO $$ BEGIN UPDATE books SET is_active = true WHERE is_active IS NULL; EXCEPTION WHEN OTHERS THEN NULL; END $$;
DO $$ BEGIN UPDATE weekly_schedule SET is_active = true WHERE is_active IS NULL; EXCEPTION WHEN OTHERS THEN NULL; END $$;
DO $$ BEGIN UPDATE social_links SET is_active = true WHERE is_active IS NULL; EXCEPTION WHEN OTHERS THEN NULL; END $$;
DO $$ BEGIN UPDATE navbar_items SET is_active = true WHERE is_active IS NULL; EXCEPTION WHEN OTHERS THEN NULL; END $$;
DO $$ BEGIN UPDATE events SET is_active = true WHERE is_active IS NULL; EXCEPTION WHEN OTHERS THEN NULL; END $$;

-- Create indexes for is_active columns for better query performance (ignore errors if they exist or table doesn't exist)
DO $$ BEGIN CREATE INDEX IF NOT EXISTS idx_lessons_is_active ON lessons(is_active); EXCEPTION WHEN OTHERS THEN NULL; END $$;
DO $$ BEGIN CREATE INDEX IF NOT EXISTS idx_sermons_is_active ON sermons(is_active); EXCEPTION WHEN OTHERS THEN NULL; END $$;
DO $$ BEGIN CREATE INDEX IF NOT EXISTS idx_articles_is_active ON articles(is_active); EXCEPTION WHEN OTHERS THEN NULL; END $$;
DO $$ BEGIN CREATE INDEX IF NOT EXISTS idx_books_is_active ON books(is_active); EXCEPTION WHEN OTHERS THEN NULL; END $$;
DO $$ BEGIN CREATE INDEX IF NOT EXISTS idx_weekly_schedule_is_active ON weekly_schedule(is_active); EXCEPTION WHEN OTHERS THEN NULL; END $$;
DO $$ BEGIN CREATE INDEX IF NOT EXISTS idx_navbar_items_is_active ON navbar_items(is_active); EXCEPTION WHEN OTHERS THEN NULL; END $$;

-- Grant permissions (ignore errors if tables don't exist or permissions already granted)
DO $$ BEGIN GRANT ALL ON lessons TO authenticated; EXCEPTION WHEN OTHERS THEN NULL; END $$;
DO $$ BEGIN GRANT ALL ON sermons TO authenticated; EXCEPTION WHEN OTHERS THEN NULL; END $$;
DO $$ BEGIN GRANT ALL ON articles TO authenticated; EXCEPTION WHEN OTHERS THEN NULL; END $$;
DO $$ BEGIN GRANT ALL ON books TO authenticated; EXCEPTION WHEN OTHERS THEN NULL; END $$;
DO $$ BEGIN GRANT ALL ON weekly_schedule TO authenticated; EXCEPTION WHEN OTHERS THEN NULL; END $$;
DO $$ BEGIN GRANT ALL ON navbar_items TO authenticated; EXCEPTION WHEN OTHERS THEN NULL; END $$;

DO $$ BEGIN GRANT SELECT ON lessons TO anon; EXCEPTION WHEN OTHERS THEN NULL; END $$;
DO $$ BEGIN GRANT SELECT ON sermons TO anon; EXCEPTION WHEN OTHERS THEN NULL; END $$;
DO $$ BEGIN GRANT SELECT ON articles TO anon; EXCEPTION WHEN OTHERS THEN NULL; END $$;
DO $$ BEGIN GRANT SELECT ON books TO anon; EXCEPTION WHEN OTHERS THEN NULL; END $$;
DO $$ BEGIN GRANT SELECT ON weekly_schedule TO anon; EXCEPTION WHEN OTHERS THEN NULL; END $$;
DO $$ BEGIN GRANT SELECT ON navbar_items TO anon; EXCEPTION WHEN OTHERS THEN NULL; END $$;
