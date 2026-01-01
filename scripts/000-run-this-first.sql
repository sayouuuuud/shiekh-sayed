-- =====================================================
-- CONSOLIDATED DATABASE MIGRATION SCRIPT
-- =====================================================
-- This script adds all missing columns and tables required
-- by the application. Run this in your Supabase SQL Editor.
-- =====================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- SECTION 1: Add missing columns to lessons table
-- =====================================================

-- Add is_active column
ALTER TABLE lessons 
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Add lesson_type column
ALTER TABLE lessons 
ADD COLUMN IF NOT EXISTS lesson_type TEXT 
CHECK (lesson_type IN ('fiqh', 'seerah', 'general'));

-- Add is_archived column
ALTER TABLE lessons 
ADD COLUMN IF NOT EXISTS is_archived BOOLEAN DEFAULT false;

-- =====================================================
-- SECTION 2: Add missing columns to sermons table
-- =====================================================

ALTER TABLE sermons 
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

ALTER TABLE sermons 
ADD COLUMN IF NOT EXISTS media_source TEXT 
CHECK (media_source IN ('youtube', 'local')) 
DEFAULT 'local';

-- =====================================================
-- SECTION 3: Add missing columns to articles and books
-- =====================================================

ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

ALTER TABLE books 
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- =====================================================
-- SECTION 4: Add parent_category_id to categories
-- =====================================================

ALTER TABLE categories 
ADD COLUMN IF NOT EXISTS parent_category_id UUID 
REFERENCES categories(id);

ALTER TABLE categories 
ADD COLUMN IF NOT EXISTS description TEXT;

-- =====================================================
-- SECTION 5: Create schedule_events table
-- =====================================================

CREATE TABLE IF NOT EXISTS schedule_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL CHECK (event_type IN ('fiqh', 'seerah', 'friday', 'aqeedah', 'general')),
  event_date DATE NOT NULL,
  event_time TIME,
  location TEXT,
  is_live BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE schedule_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active schedule_events" 
  ON schedule_events FOR SELECT 
  USING (is_active = true);
CREATE POLICY "Auth can manage schedule_events" 
  ON schedule_events FOR ALL 
  USING (auth.role() = 'authenticated');

-- =====================================================
-- SECTION 6: Create hero_section table
-- =====================================================

CREATE TABLE IF NOT EXISTS hero_section (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hadith_text TEXT NOT NULL,
  hadith_source TEXT NOT NULL,
  button_text TEXT,
  button_link TEXT,
  featured_book_id UUID REFERENCES books(id),
  background_image TEXT,
  is_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE hero_section ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view hero_section" 
  ON hero_section FOR SELECT 
  USING (true);
CREATE POLICY "Auth can manage hero_section" 
  ON hero_section FOR ALL 
  USING (auth.role() = 'authenticated');

-- =====================================================
-- SECTION 7: Create weekly_schedule table
-- =====================================================

CREATE TABLE IF NOT EXISTS weekly_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day_name TEXT NOT NULL,
  time TEXT NOT NULL,
  title TEXT NOT NULL,
  location TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE weekly_schedule ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active weekly_schedule" 
  ON weekly_schedule FOR SELECT 
  USING (is_active = true);
CREATE POLICY "Auth can manage weekly_schedule" 
  ON weekly_schedule FOR ALL 
  USING (auth.role() = 'authenticated');

-- =====================================================
-- SECTION 8: Create sheikh_profile table
-- =====================================================

CREATE TABLE IF NOT EXISTS sheikh_profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT 'الشيخ السيد مراد',
  title TEXT NOT NULL DEFAULT 'عالم أزهري ومفكر تربوي',
  bio TEXT NOT NULL DEFAULT 'عالم أزهري ومفكر تربوي، كرس حياته لخدمة العلم والدعوة.',
  photo_path TEXT DEFAULT '/images/sheikh/default.jpg',
  tags JSONB DEFAULT '[
    {"icon": "school", "text": "دكتوراه في الفقه المقارن"},
    {"icon": "location_on", "text": "القاهرة، مصر"},
    {"icon": "mic", "text": "خطيب وإمام"}
  ]'::jsonb,
  social_media JSONB DEFAULT '{}'::jsonb,
  stats JSONB DEFAULT '{"students": "5000+", "books": "20+", "lectures": "1000+", "years": "25+"}'::jsonb,
  education TEXT,
  achievements TEXT,
  current_positions TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE sheikh_profile ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view sheikh_profile" 
  ON sheikh_profile FOR SELECT 
  USING (true);
CREATE POLICY "Auth can manage sheikh_profile" 
  ON sheikh_profile FOR ALL 
  USING (auth.role() = 'authenticated');

-- =====================================================
-- SECTION 9: Create notifications table
-- =====================================================

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT CHECK (type IN ('info', 'success', 'warning', 'error')) DEFAULT 'info',
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Auth can manage notifications" 
  ON notifications FOR ALL 
  USING (auth.role() = 'authenticated');

-- =====================================================
-- SECTION 10: Create appearance_settings table
-- =====================================================

CREATE TABLE IF NOT EXISTS appearance_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  primary_color TEXT DEFAULT '#1c5b45',
  secondary_color TEXT DEFAULT '#d4a04c',
  show_hijri_date BOOLEAN DEFAULT true,
  site_logo_path TEXT DEFAULT '/images/logos/logo.png',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE appearance_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view appearance_settings" 
  ON appearance_settings FOR SELECT 
  USING (true);
CREATE POLICY "Auth can manage appearance_settings" 
  ON appearance_settings FOR ALL 
  USING (auth.role() = 'authenticated');

-- =====================================================
-- SECTION 11: Create site_analytics table
-- =====================================================

CREATE TABLE IF NOT EXISTS site_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  views_count INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE site_analytics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Auth can manage site_analytics" 
  ON site_analytics FOR ALL 
  USING (auth.role() = 'authenticated');

-- =====================================================
-- SECTION 12: Create contact_form tables
-- =====================================================

CREATE TABLE IF NOT EXISTS contact_form_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fields JSONB DEFAULT '[
    {"name": "name", "label": "الاسم", "type": "text", "required": true},
    {"name": "email", "label": "البريد الإلكتروني", "type": "email", "required": true},
    {"name": "subject", "label": "الموضوع", "type": "select", "required": true},
    {"name": "message", "label": "الرسالة", "type": "textarea", "required": true}
  ]'::jsonb,
  subject_options JSONB DEFAULT '["استفسار عام", "طلب فتوى", "اقتراح", "شكوى", "أخرى"]'::jsonb,
  important_notice TEXT DEFAULT 'يرجى التأكد من صحة البيانات قبل الإرسال',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_data JSONB NOT NULL,
  is_read BOOLEAN DEFAULT false,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contact_form_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view contact_form_settings" 
  ON contact_form_settings FOR SELECT 
  USING (true);
CREATE POLICY "Auth can manage contact_form_settings" 
  ON contact_form_settings FOR ALL 
  USING (auth.role() = 'authenticated');

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can insert contact_submissions" 
  ON contact_submissions FOR INSERT 
  WITH CHECK (true);
CREATE POLICY "Auth can manage contact_submissions" 
  ON contact_submissions FOR ALL 
  USING (auth.role() = 'authenticated');

-- =====================================================
-- SECTION 13: Create indexes for better performance
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_sermons_published 
  ON sermons(publish_status, is_active);

CREATE INDEX IF NOT EXISTS idx_sermons_media_source 
  ON sermons(media_source);

CREATE INDEX IF NOT EXISTS idx_lessons_type 
  ON lessons(lesson_type, publish_status, is_active);

CREATE INDEX IF NOT EXISTS idx_lessons_archived 
  ON lessons(is_archived, is_active);

CREATE INDEX IF NOT EXISTS idx_articles_published 
  ON articles(publish_status, is_active);

CREATE INDEX IF NOT EXISTS idx_books_published 
  ON books(publish_status, is_active);

CREATE INDEX IF NOT EXISTS idx_schedule_events_date 
  ON schedule_events(event_date);

CREATE INDEX IF NOT EXISTS idx_schedule_events_type 
  ON schedule_events(event_type);

CREATE INDEX IF NOT EXISTS idx_notifications_unread 
  ON notifications(is_read, created_at);

CREATE INDEX IF NOT EXISTS idx_analytics_date 
  ON site_analytics(date);

CREATE INDEX IF NOT EXISTS idx_categories_parent 
  ON categories(parent_category_id);

-- =====================================================
-- SECTION 14: Insert default data
-- =====================================================

-- Insert default appearance settings
INSERT INTO appearance_settings (primary_color, secondary_color, show_hijri_date, site_logo_path)
VALUES ('#1c5b45', '#d4a04c', true, '/images/logos/logo.png')
ON CONFLICT DO NOTHING;

-- Insert default sheikh profile
INSERT INTO sheikh_profile (name, title, bio)
VALUES (
  'الشيخ السيد مراد', 
  'عالم أزهري ومفكر تربوي', 
  'عالم أزهري ومفكر تربوي، كرس حياته لخدمة العلم والدعوة. يتميز بأسلوبه الهادئ والرزين في طرح القضايا المعاصرة.'
)
ON CONFLICT DO NOTHING;

-- Insert sample hero section data
INSERT INTO hero_section (hadith_text, hadith_source, button_text, button_link)
VALUES (
  'خيركم من تعلم القرآن وعلمه',
  'صحيح البخاري',
  'تصفح المحتوى',
  '/sermons'
)
ON CONFLICT DO NOTHING;

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================
-- All tables and columns have been created/updated.
-- You can now use the application without database errors.
-- =====================================================
