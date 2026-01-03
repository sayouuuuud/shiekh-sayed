-- =====================================================
-- ADD MISSING COLUMNS TO EXISTING TABLES
-- =====================================================

-- 1. Add missing columns to sermons (check if table exists first)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'sermons') THEN
    BEGIN
      ALTER TABLE sermons ADD COLUMN IF NOT EXISTS category_id UUID;
    EXCEPTION WHEN others THEN NULL;
    END;
    BEGIN
      ALTER TABLE sermons ADD COLUMN IF NOT EXISTS media_source VARCHAR(20) DEFAULT 'local';
    EXCEPTION WHEN others THEN NULL;
    END;
    BEGIN
      ALTER TABLE sermons ADD COLUMN IF NOT EXISTS thumbnail_path TEXT;
    EXCEPTION WHEN others THEN NULL;
    END;
    BEGIN
      ALTER TABLE sermons ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
    EXCEPTION WHEN others THEN NULL;
    END;
  END IF;
END $$;

-- 2. Add missing columns to lessons
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'lessons') THEN
    BEGIN
      ALTER TABLE lessons ADD COLUMN IF NOT EXISTS category_id UUID;
    EXCEPTION WHEN others THEN NULL;
    END;
    BEGIN
      ALTER TABLE lessons ADD COLUMN IF NOT EXISTS lesson_type VARCHAR(50) DEFAULT 'general';
    EXCEPTION WHEN others THEN NULL;
    END;
    BEGIN
      ALTER TABLE lessons ADD COLUMN IF NOT EXISTS thumbnail_path TEXT;
    EXCEPTION WHEN others THEN NULL;
    END;
    BEGIN
      ALTER TABLE lessons ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
    EXCEPTION WHEN others THEN NULL;
    END;
    BEGIN
      ALTER TABLE lessons ADD COLUMN IF NOT EXISTS is_archived BOOLEAN DEFAULT false;
    EXCEPTION WHEN others THEN NULL;
    END;
  END IF;
END $$;

-- 3. Add missing columns to articles
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'articles') THEN
    BEGIN
      ALTER TABLE articles ADD COLUMN IF NOT EXISTS category_id UUID;
    EXCEPTION WHEN others THEN NULL;
    END;
  END IF;
END $$;

-- 4. Add missing columns to books
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'books') THEN
    BEGIN
      ALTER TABLE books ADD COLUMN IF NOT EXISTS category_id UUID;
    EXCEPTION WHEN others THEN NULL;
    END;
  END IF;
END $$;

-- 5. Add missing columns to media
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'media') THEN
    BEGIN
      ALTER TABLE media ADD COLUMN IF NOT EXISTS category_id UUID;
    EXCEPTION WHEN others THEN NULL;
    END;
    BEGIN
      ALTER TABLE media ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
    EXCEPTION WHEN others THEN NULL;
    END;
  END IF;
END $$;

-- 6. Add missing columns to hero_settings
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'hero_settings') THEN
    BEGIN
      ALTER TABLE hero_settings ADD COLUMN IF NOT EXISTS underline_text VARCHAR(255);
    EXCEPTION WHEN others THEN NULL;
    END;
    BEGIN
      ALTER TABLE hero_settings ADD COLUMN IF NOT EXISTS featured_book_id UUID;
    EXCEPTION WHEN others THEN NULL;
    END;
  END IF;
END $$;

SELECT 'Master Schema Fix Part 2 - Columns Added!' as message;
