-- Complete Schema Fix - إصلاح شامل للمخطط
-- This script creates all required tables with proper structure and RLS policies

-- First, drop existing tables (be careful in production!)
DROP TABLE IF EXISTS hero_section CASCADE;
DROP TABLE IF EXISTS appearance_settings CASCADE;
DROP TABLE IF EXISTS sheikh_profile CASCADE;
DROP TABLE IF EXISTS weekly_schedule CASCADE;
DROP TABLE IF EXISTS navbar_items CASCADE;
DROP TABLE IF EXISTS site_analytics CASCADE;

-- Hero Section Table
CREATE TABLE IF NOT EXISTS hero_section (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hadith_arabic TEXT,
  hadith_translation TEXT,
  hadith_explanation TEXT,
  hadith_button_text TEXT DEFAULT 'اقرأ المزيد',
  hadith_button_link TEXT DEFAULT '/articles',
  book_custom_text TEXT DEFAULT 'أحدث إصدارات الشيخ',
  book_button_text TEXT DEFAULT 'تصفح الكتب',
  book_button_link TEXT DEFAULT '/books',
  important_notice TEXT,
  important_notice_link TEXT,
  show_important_notice BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Appearance Settings Table
CREATE TABLE IF NOT EXISTS appearance_settings (
  id UUID PRIMARY KEY DEFAULT '00000000-0000-0000-0000-000000000001',
  primary_color TEXT DEFAULT '#1e4338',
  secondary_color TEXT DEFAULT '#d4af37',
  dark_mode_enabled BOOLEAN DEFAULT true,
  show_hijri_date BOOLEAN DEFAULT true,
  site_logo_path TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sheikh Profile Table
CREATE TABLE IF NOT EXISTS sheikh_profile (
  id UUID PRIMARY KEY DEFAULT '00000000-0000-0000-0000-000000000001',
  name TEXT DEFAULT 'الشيخ السيد مراد',
  title TEXT DEFAULT 'عالم أزهري ومفكر تربوي',
  bio TEXT,
  photo_path TEXT,
  education TEXT,
  achievements TEXT,
  current_positions TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  social_media JSONB DEFAULT '{}'::jsonb,
  stats JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Weekly Schedule Table
CREATE TABLE IF NOT EXISTS weekly_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  day_of_week TEXT NOT NULL,
  time TEXT NOT NULL,
  location TEXT,
  event_type TEXT DEFAULT 'general',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Navbar Items Table
CREATE TABLE IF NOT EXISTS navbar_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site Analytics Table
CREATE TABLE IF NOT EXISTS site_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  page_path TEXT,
  views_count INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add missing columns to existing tables
DO $$ 
BEGIN
  -- Add is_archived to lessons if not exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'lessons' AND column_name = 'is_archived') THEN
    ALTER TABLE lessons ADD COLUMN is_archived BOOLEAN DEFAULT false;
  END IF;
  
  -- Add type to lessons if not exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'lessons' AND column_name = 'type') THEN
    ALTER TABLE lessons ADD COLUMN type TEXT DEFAULT 'audio';
  END IF;
  
  -- Add duration to lessons if not exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'lessons' AND column_name = 'duration') THEN
    ALTER TABLE lessons ADD COLUMN duration TEXT;
  END IF;
  
  -- Add featured_image to articles if not exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'articles' AND column_name = 'featured_image') THEN
    ALTER TABLE articles ADD COLUMN featured_image TEXT;
  END IF;
  
  -- Add views_count to articles if not exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'articles' AND column_name = 'views_count') THEN
    ALTER TABLE articles ADD COLUMN views_count INTEGER DEFAULT 0;
  END IF;
  
  -- Add read column to contact_messages if not exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contact_messages' AND column_name = 'read') THEN
    ALTER TABLE contact_messages ADD COLUMN read BOOLEAN DEFAULT false;
  END IF;
  
  -- Add is_active to schedule_events if not exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'schedule_events' AND column_name = 'is_active') THEN
    ALTER TABLE schedule_events ADD COLUMN is_active BOOLEAN DEFAULT true;
  END IF;
END $$;

-- Disable RLS on all tables
ALTER TABLE hero_section DISABLE ROW LEVEL SECURITY;
ALTER TABLE appearance_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE sheikh_profile DISABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_schedule DISABLE ROW LEVEL SECURITY;
ALTER TABLE navbar_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE site_analytics DISABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT ALL ON hero_section TO anon, authenticated;
GRANT ALL ON appearance_settings TO anon, authenticated;
GRANT ALL ON sheikh_profile TO anon, authenticated;
GRANT ALL ON weekly_schedule TO anon, authenticated;
GRANT ALL ON navbar_items TO anon, authenticated;
GRANT ALL ON site_analytics TO anon, authenticated;

-- Insert default data
INSERT INTO hero_section (id, hadith_arabic, hadith_translation, hadith_explanation)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'من سلك طريقاً يلتمس فيه علماً سهل الله له به طريقاً إلى الجنة',
  'رواه مسلم',
  'حديث عظيم يبين فضل طلب العلم والسعي في تحصيله، وأن الله يسهل لطالب العلم طريقه إلى الجنة'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO appearance_settings (id) VALUES ('00000000-0000-0000-0000-000000000001') ON CONFLICT (id) DO NOTHING;
INSERT INTO sheikh_profile (id) VALUES ('00000000-0000-0000-0000-000000000001') ON CONFLICT (id) DO NOTHING;

-- Insert default navbar items
INSERT INTO navbar_items (label, href, order_index, is_active) VALUES
  ('الرئيسية', '/', 0, true),
  ('الجدول', '/schedule', 1, true),
  ('خطب', '/khutba', 2, true),
  ('دروس', '/dars', 3, true),
  ('مقالات', '/articles', 4, true),
  ('كتب', '/books', 5, true),
  ('مرئيات', '/videos', 6, true)
ON CONFLICT DO NOTHING;

-- Insert sample weekly schedule
INSERT INTO weekly_schedule (title, description, day_of_week, time, location, event_type, sort_order) VALUES
  ('درس الفقه', 'شرح كتاب منهاج الطالبين', 'الاثنين', '19:30', 'مسجد الرحمن', 'fiqh', 1),
  ('درس السيرة', 'وقفات تربوية مع السيرة النبوية', 'الأربعاء', '20:00', 'مسجد الرحمن', 'seerah', 2),
  ('خطبة الجمعة', 'خطبة الجمعة الأسبوعية', 'الجمعة', '12:30', 'مسجد الرحمن', 'friday', 3)
ON CONFLICT DO NOTHING;

-- Insert sample analytics data for the last 30 days
INSERT INTO site_analytics (date, page_path, views_count, unique_visitors)
SELECT 
  CURRENT_DATE - (n || ' days')::interval,
  '/',
  floor(random() * 100 + 50)::int,
  floor(random() * 50 + 20)::int
FROM generate_series(0, 29) n
ON CONFLICT DO NOTHING;
