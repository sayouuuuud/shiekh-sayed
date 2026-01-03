-- =====================================================
-- موقع الشيخ السيد مراد - المخطط الكامل للقاعدة
-- FINAL COMPLETE DATABASE SCHEMA
-- =====================================================
-- هذا الملف يحتوي على جميع الجداول والسياسات المطلوبة
-- يمكن تشغيله عدة مرات بأمان (idempotent)
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. CATEGORIES (التصنيفات)
-- =====================================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('sermon', 'lesson', 'article', 'book', 'media')),
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add unique constraint on slug if not exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'categories_slug_key') THEN
    ALTER TABLE categories ADD CONSTRAINT categories_slug_key UNIQUE (slug);
  END IF;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- =====================================================
-- 2. SERMONS (الخطب)
-- =====================================================
CREATE TABLE IF NOT EXISTS sermons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  audio_url TEXT,
  video_url TEXT,
  youtube_url TEXT,
  file_path TEXT,
  thumbnail_path TEXT,
  duration TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  media_source TEXT DEFAULT 'local' CHECK (media_source IN ('local', 'youtube', 'external')),
  publish_status TEXT DEFAULT 'draft' CHECK (publish_status IN ('draft', 'published')),
  is_active BOOLEAN DEFAULT true,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add missing columns to sermons
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sermons' AND column_name = 'is_active') THEN
    ALTER TABLE sermons ADD COLUMN is_active BOOLEAN DEFAULT true;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sermons' AND column_name = 'media_source') THEN
    ALTER TABLE sermons ADD COLUMN media_source TEXT DEFAULT 'local';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sermons' AND column_name = 'youtube_url') THEN
    ALTER TABLE sermons ADD COLUMN youtube_url TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sermons' AND column_name = 'file_path') THEN
    ALTER TABLE sermons ADD COLUMN file_path TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sermons' AND column_name = 'thumbnail_path') THEN
    ALTER TABLE sermons ADD COLUMN thumbnail_path TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sermons' AND column_name = 'category_id') THEN
    ALTER TABLE sermons ADD COLUMN category_id UUID REFERENCES categories(id) ON DELETE SET NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sermons' AND column_name = 'views_count') THEN
    ALTER TABLE sermons ADD COLUMN views_count INTEGER DEFAULT 0;
  END IF;
END $$;

-- =====================================================
-- 3. LESSONS (الدروس)
-- =====================================================
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  audio_url TEXT,
  video_url TEXT,
  youtube_url TEXT,
  file_path TEXT,
  thumbnail_path TEXT,
  duration TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  series TEXT,
  episode_number INTEGER,
  lesson_type TEXT DEFAULT 'general' CHECK (lesson_type IN ('fiqh', 'seerah', 'tafsir', 'hadith', 'aqeedah', 'general')),
  media_source TEXT DEFAULT 'local' CHECK (media_source IN ('local', 'youtube', 'external')),
  publish_status TEXT DEFAULT 'draft' CHECK (publish_status IN ('draft', 'published')),
  is_active BOOLEAN DEFAULT true,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add missing columns to lessons
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'lessons' AND column_name = 'is_active') THEN
    ALTER TABLE lessons ADD COLUMN is_active BOOLEAN DEFAULT true;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'lessons' AND column_name = 'media_source') THEN
    ALTER TABLE lessons ADD COLUMN media_source TEXT DEFAULT 'local';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'lessons' AND column_name = 'youtube_url') THEN
    ALTER TABLE lessons ADD COLUMN youtube_url TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'lessons' AND column_name = 'file_path') THEN
    ALTER TABLE lessons ADD COLUMN file_path TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'lessons' AND column_name = 'thumbnail_path') THEN
    ALTER TABLE lessons ADD COLUMN thumbnail_path TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'lessons' AND column_name = 'category_id') THEN
    ALTER TABLE lessons ADD COLUMN category_id UUID REFERENCES categories(id) ON DELETE SET NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'lessons' AND column_name = 'lesson_type') THEN
    ALTER TABLE lessons ADD COLUMN lesson_type TEXT DEFAULT 'general';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'lessons' AND column_name = 'views_count') THEN
    ALTER TABLE lessons ADD COLUMN views_count INTEGER DEFAULT 0;
  END IF;
END $$;

-- =====================================================
-- 4. ARTICLES (المقالات)
-- =====================================================
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT,
  excerpt TEXT,
  content TEXT NOT NULL,
  thumbnail_path TEXT,
  featured_image_path TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  author TEXT DEFAULT 'الشيخ السيد مراد',
  read_time INTEGER DEFAULT 5,
  publish_status TEXT DEFAULT 'draft' CHECK (publish_status IN ('draft', 'published')),
  is_active BOOLEAN DEFAULT true,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add missing columns to articles
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'articles' AND column_name = 'is_active') THEN
    ALTER TABLE articles ADD COLUMN is_active BOOLEAN DEFAULT true;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'articles' AND column_name = 'thumbnail_path') THEN
    ALTER TABLE articles ADD COLUMN thumbnail_path TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'articles' AND column_name = 'featured_image_path') THEN
    ALTER TABLE articles ADD COLUMN featured_image_path TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'articles' AND column_name = 'category_id') THEN
    ALTER TABLE articles ADD COLUMN category_id UUID REFERENCES categories(id) ON DELETE SET NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'articles' AND column_name = 'views_count') THEN
    ALTER TABLE articles ADD COLUMN views_count INTEGER DEFAULT 0;
  END IF;
END $$;

-- =====================================================
-- 5. BOOKS (الكتب)
-- =====================================================
CREATE TABLE IF NOT EXISTS books (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  author TEXT DEFAULT 'الشيخ السيد مراد',
  description TEXT,
  cover_image_path TEXT,
  file_path TEXT,
  file_url TEXT,
  file_size TEXT,
  pages INTEGER,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  publish_year TEXT,
  isbn TEXT,
  publish_status TEXT DEFAULT 'draft' CHECK (publish_status IN ('draft', 'published')),
  is_active BOOLEAN DEFAULT true,
  download_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add missing columns to books
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'books' AND column_name = 'is_active') THEN
    ALTER TABLE books ADD COLUMN is_active BOOLEAN DEFAULT true;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'books' AND column_name = 'cover_image_path') THEN
    ALTER TABLE books ADD COLUMN cover_image_path TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'books' AND column_name = 'file_path') THEN
    ALTER TABLE books ADD COLUMN file_path TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'books' AND column_name = 'category_id') THEN
    ALTER TABLE books ADD COLUMN category_id UUID REFERENCES categories(id) ON DELETE SET NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'books' AND column_name = 'download_count') THEN
    ALTER TABLE books ADD COLUMN download_count INTEGER DEFAULT 0;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'books' AND column_name = 'views_count') THEN
    ALTER TABLE books ADD COLUMN views_count INTEGER DEFAULT 0;
  END IF;
END $$;

-- =====================================================
-- 6. VIDEOS (الفيديوهات)
-- =====================================================
CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  youtube_url TEXT,
  file_path TEXT,
  thumbnail_path TEXT,
  duration TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  media_source TEXT DEFAULT 'youtube' CHECK (media_source IN ('local', 'youtube', 'external')),
  publish_status TEXT DEFAULT 'draft' CHECK (publish_status IN ('draft', 'published')),
  is_active BOOLEAN DEFAULT true,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add missing columns to videos
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'videos' AND column_name = 'is_active') THEN
    ALTER TABLE videos ADD COLUMN is_active BOOLEAN DEFAULT true;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'videos' AND column_name = 'media_source') THEN
    ALTER TABLE videos ADD COLUMN media_source TEXT DEFAULT 'youtube';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'videos' AND column_name = 'youtube_url') THEN
    ALTER TABLE videos ADD COLUMN youtube_url TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'videos' AND column_name = 'file_path') THEN
    ALTER TABLE videos ADD COLUMN file_path TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'videos' AND column_name = 'thumbnail_path') THEN
    ALTER TABLE videos ADD COLUMN thumbnail_path TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'videos' AND column_name = 'category_id') THEN
    ALTER TABLE videos ADD COLUMN category_id UUID REFERENCES categories(id) ON DELETE SET NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'videos' AND column_name = 'views_count') THEN
    ALTER TABLE videos ADD COLUMN views_count INTEGER DEFAULT 0;
  END IF;
END $$;

-- =====================================================
-- 7. MEDIA (الوسائط - للتوافق مع الكود القديم)
-- =====================================================
CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('video', 'audio', 'image', 'document')),
  url TEXT,
  file_path TEXT,
  thumbnail_path TEXT,
  duration TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  publish_status TEXT DEFAULT 'draft' CHECK (publish_status IN ('draft', 'published')),
  is_active BOOLEAN DEFAULT true,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add missing columns to media
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'media' AND column_name = 'is_active') THEN
    ALTER TABLE media ADD COLUMN is_active BOOLEAN DEFAULT true;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'media' AND column_name = 'file_path') THEN
    ALTER TABLE media ADD COLUMN file_path TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'media' AND column_name = 'thumbnail_path') THEN
    ALTER TABLE media ADD COLUMN thumbnail_path TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'media' AND column_name = 'category_id') THEN
    ALTER TABLE media ADD COLUMN category_id UUID REFERENCES categories(id) ON DELETE SET NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'media' AND column_name = 'views_count') THEN
    ALTER TABLE media ADD COLUMN views_count INTEGER DEFAULT 0;
  END IF;
END $$;

-- =====================================================
-- 8. HERO SECTION (قسم البطل)
-- =====================================================
CREATE TABLE IF NOT EXISTS hero_section (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hadith_arabic TEXT,
  hadith_translation TEXT,
  hadith_explanation TEXT,
  hadith_source TEXT,
  hadith_button_text TEXT DEFAULT 'اقرأ المزيد',
  hadith_button_link TEXT DEFAULT '/articles',
  featured_book_id UUID REFERENCES books(id) ON DELETE SET NULL,
  book_custom_text TEXT DEFAULT 'أحدث إصدارات الشيخ',
  book_button_text TEXT DEFAULT 'تصفح الكتب',
  book_button_link TEXT DEFAULT '/books',
  important_notice TEXT,
  important_notice_link TEXT,
  show_important_notice BOOLEAN DEFAULT false,
  background_image TEXT,
  is_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add missing columns to hero_section
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'hero_section' AND column_name = 'hadith_arabic') THEN
    ALTER TABLE hero_section ADD COLUMN hadith_arabic TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'hero_section' AND column_name = 'hadith_translation') THEN
    ALTER TABLE hero_section ADD COLUMN hadith_translation TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'hero_section' AND column_name = 'hadith_explanation') THEN
    ALTER TABLE hero_section ADD COLUMN hadith_explanation TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'hero_section' AND column_name = 'hadith_source') THEN
    ALTER TABLE hero_section ADD COLUMN hadith_source TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'hero_section' AND column_name = 'featured_book_id') THEN
    ALTER TABLE hero_section ADD COLUMN featured_book_id UUID REFERENCES books(id) ON DELETE SET NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'hero_section' AND column_name = 'important_notice') THEN
    ALTER TABLE hero_section ADD COLUMN important_notice TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'hero_section' AND column_name = 'important_notice_link') THEN
    ALTER TABLE hero_section ADD COLUMN important_notice_link TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'hero_section' AND column_name = 'show_important_notice') THEN
    ALTER TABLE hero_section ADD COLUMN show_important_notice BOOLEAN DEFAULT false;
  END IF;
END $$;

-- =====================================================
-- 9. WEEKLY SCHEDULE (الجدول الأسبوعي)
-- =====================================================
CREATE TABLE IF NOT EXISTS weekly_schedule (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  day_name TEXT NOT NULL,
  time TEXT NOT NULL,
  title TEXT NOT NULL,
  location TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add missing columns to weekly_schedule
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'weekly_schedule' AND column_name = 'is_active') THEN
    ALTER TABLE weekly_schedule ADD COLUMN is_active BOOLEAN DEFAULT true;
  END IF;
END $$;

-- =====================================================
-- 10. EVENTS (الأحداث/المواعيد)
-- =====================================================
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT DEFAULT 'general',
  event_date DATE,
  event_time TIME,
  day_of_week TEXT,
  location TEXT,
  is_recurring BOOLEAN DEFAULT false,
  is_live BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add missing columns to events
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'events' AND column_name = 'is_active') THEN
    ALTER TABLE events ADD COLUMN is_active BOOLEAN DEFAULT true;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'events' AND column_name = 'day_of_week') THEN
    ALTER TABLE events ADD COLUMN day_of_week TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'events' AND column_name = 'is_recurring') THEN
    ALTER TABLE events ADD COLUMN is_recurring BOOLEAN DEFAULT false;
  END IF;
END $$;

-- =====================================================
-- 11. SUBSCRIBERS (المشتركين)
-- =====================================================
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT,
  whatsapp TEXT,
  telegram TEXT,
  name TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add missing columns to subscribers
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'subscribers' AND column_name = 'whatsapp') THEN
    ALTER TABLE subscribers ADD COLUMN whatsapp TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'subscribers' AND column_name = 'telegram') THEN
    ALTER TABLE subscribers ADD COLUMN telegram TEXT;
  END IF;
END $$;

-- =====================================================
-- 12. CONTACT MESSAGES (رسائل التواصل)
-- =====================================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 13. CONTACT SETTINGS (إعدادات التواصل)
-- =====================================================
CREATE TABLE IF NOT EXISTS contact_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  notice_text TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  facebook TEXT,
  twitter TEXT,
  youtube TEXT,
  telegram TEXT,
  whatsapp TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 14. ABOUT PAGE (صفحة عن الشيخ)
-- =====================================================
CREATE TABLE IF NOT EXISTS about_page (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT DEFAULT 'عن الشيخ',
  content TEXT,
  image_path TEXT,
  location TEXT,
  positions TEXT,
  education TEXT,
  achievements TEXT,
  quote TEXT,
  quote_author TEXT DEFAULT 'الشيخ السيد مراد',
  birth_date TEXT,
  social_media JSONB DEFAULT '{}'::jsonb,
  stats JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add missing columns to about_page
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'about_page' AND column_name = 'title') THEN
    ALTER TABLE about_page ADD COLUMN title TEXT DEFAULT 'عن الشيخ';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'about_page' AND column_name = 'image_path') THEN
    ALTER TABLE about_page ADD COLUMN image_path TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'about_page' AND column_name = 'location') THEN
    ALTER TABLE about_page ADD COLUMN location TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'about_page' AND column_name = 'positions') THEN
    ALTER TABLE about_page ADD COLUMN positions TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'about_page' AND column_name = 'quote') THEN
    ALTER TABLE about_page ADD COLUMN quote TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'about_page' AND column_name = 'quote_author') THEN
    ALTER TABLE about_page ADD COLUMN quote_author TEXT DEFAULT 'الشيخ السيد مراد';
  END IF;
END $$;

-- =====================================================
-- 15. SOCIAL LINKS (روابط التواصل)
-- =====================================================
CREATE TABLE IF NOT EXISTS social_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add missing columns to social_links
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'social_links' AND column_name = 'is_active') THEN
    ALTER TABLE social_links ADD COLUMN is_active BOOLEAN DEFAULT true;
  END IF;
END $$;

-- =====================================================
-- 16. NAVBAR ITEMS (عناصر القائمة)
-- =====================================================
CREATE TABLE IF NOT EXISTS navbar_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  icon TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add missing columns to navbar_items
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'navbar_items' AND column_name = 'is_active') THEN
    ALTER TABLE navbar_items ADD COLUMN is_active BOOLEAN DEFAULT true;
  END IF;
END $$;

-- =====================================================
-- 17. APPEARANCE SETTINGS (إعدادات المظهر)
-- =====================================================
CREATE TABLE IF NOT EXISTS appearance_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_logo_light TEXT,
  site_logo_dark TEXT,
  primary_color TEXT DEFAULT '#1e4338',
  secondary_color TEXT DEFAULT '#d4af37',
  font_family TEXT DEFAULT 'Cairo',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 18. SITE SETTINGS (إعدادات الموقع)
-- =====================================================
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  type TEXT DEFAULT 'text',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 19. NOTIFICATIONS (الإشعارات)
-- =====================================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  message TEXT,
  type TEXT DEFAULT 'info',
  source_type TEXT,
  source_id UUID,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 20. SITE ANALYTICS (إحصائيات الموقع)
-- =====================================================
CREATE TABLE IF NOT EXISTS site_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  page_views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add unique constraint on date
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'site_analytics_date_unique') THEN
    ALTER TABLE site_analytics ADD CONSTRAINT site_analytics_date_unique UNIQUE (date);
  END IF;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- =====================================================
-- 21. COMMUNITY POSTS (منشورات المجتمع)
-- =====================================================
CREATE TABLE IF NOT EXISTS community_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_name TEXT NOT NULL,
  author_email TEXT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_path TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 22. TAGS (الوسوم)
-- =====================================================
CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ENABLE ROW LEVEL SECURITY ON ALL TABLES
-- =====================================================
DO $$
DECLARE
  t TEXT;
BEGIN
  FOR t IN 
    SELECT tablename FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename IN (
      'categories', 'sermons', 'lessons', 'articles', 'books', 
      'videos', 'media', 'hero_section', 'weekly_schedule', 'events',
      'subscribers', 'contact_messages', 'contact_settings', 'about_page',
      'social_links', 'navbar_items', 'appearance_settings', 'site_settings',
      'notifications', 'site_analytics', 'community_posts', 'tags'
    )
  LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
  END LOOP;
END $$;

-- =====================================================
-- CREATE RLS POLICIES (Allow all for simplicity)
-- =====================================================
DO $$
DECLARE
  t TEXT;
BEGIN
  FOR t IN 
    SELECT tablename FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename IN (
      'categories', 'sermons', 'lessons', 'articles', 'books', 
      'videos', 'media', 'hero_section', 'weekly_schedule', 'events',
      'subscribers', 'contact_messages', 'contact_settings', 'about_page',
      'social_links', 'navbar_items', 'appearance_settings', 'site_settings',
      'notifications', 'site_analytics', 'community_posts', 'tags'
    )
  LOOP
    -- Drop existing policy if exists
    EXECUTE format('DROP POLICY IF EXISTS "Allow all on %I" ON %I', t, t);
    -- Create new policy
    EXECUTE format('CREATE POLICY "Allow all on %I" ON %I FOR ALL USING (true) WITH CHECK (true)', t, t);
  END LOOP;
END $$;

-- =====================================================
-- CREATE INDEXES FOR PERFORMANCE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_sermons_publish_status ON sermons(publish_status);
CREATE INDEX IF NOT EXISTS idx_sermons_category ON sermons(category_id);
CREATE INDEX IF NOT EXISTS idx_sermons_created_at ON sermons(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_lessons_publish_status ON lessons(publish_status);
CREATE INDEX IF NOT EXISTS idx_lessons_category ON lessons(category_id);
CREATE INDEX IF NOT EXISTS idx_lessons_created_at ON lessons(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_articles_publish_status ON articles(publish_status);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_books_publish_status ON books(publish_status);
CREATE INDEX IF NOT EXISTS idx_books_category ON books(category_id);

CREATE INDEX IF NOT EXISTS idx_videos_publish_status ON videos(publish_status);
CREATE INDEX IF NOT EXISTS idx_videos_category ON videos(category_id);

CREATE INDEX IF NOT EXISTS idx_categories_type ON categories(type);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_active ON events(is_active);

CREATE INDEX IF NOT EXISTS idx_site_analytics_date ON site_analytics(date);

CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created ON notifications(created_at DESC);

-- =====================================================
-- UPDATE EXISTING NULL is_active VALUES TO TRUE
-- =====================================================
UPDATE sermons SET is_active = true WHERE is_active IS NULL;
UPDATE lessons SET is_active = true WHERE is_active IS NULL;
UPDATE articles SET is_active = true WHERE is_active IS NULL;
UPDATE books SET is_active = true WHERE is_active IS NULL;
UPDATE videos SET is_active = true WHERE is_active IS NULL;
UPDATE media SET is_active = true WHERE is_active IS NULL;

DO $$ BEGIN UPDATE weekly_schedule SET is_active = true WHERE is_active IS NULL; EXCEPTION WHEN OTHERS THEN NULL; END $$;
DO $$ BEGIN UPDATE events SET is_active = true WHERE is_active IS NULL; EXCEPTION WHEN OTHERS THEN NULL; END $$;
DO $$ BEGIN UPDATE social_links SET is_active = true WHERE is_active IS NULL; EXCEPTION WHEN OTHERS THEN NULL; END $$;
DO $$ BEGIN UPDATE navbar_items SET is_active = true WHERE is_active IS NULL; EXCEPTION WHEN OTHERS THEN NULL; END $$;

-- =====================================================
-- DONE!
-- =====================================================
SELECT 'FINAL COMPLETE SCHEMA - Successfully executed!' as message;
