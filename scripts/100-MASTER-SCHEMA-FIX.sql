-- =====================================================
-- MASTER SCHEMA FIX - Run this to fix all database issues
-- =====================================================

-- 1. Create categories table (without self-reference first)
-- Removed parent_category_id to avoid circular reference during creation
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('sermon', 'lesson', 'article', 'book', 'media')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) NOT NULL DEFAULT 'info',
  is_read BOOLEAN DEFAULT false,
  source_id UUID,
  source_type VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create appearance_settings table
CREATE TABLE IF NOT EXISTS appearance_settings (
  id UUID DEFAULT '00000000-0000-0000-0000-000000000001' PRIMARY KEY,
  primary_color VARCHAR(20) DEFAULT '#1e4338',
  secondary_color VARCHAR(20) DEFAULT '#d4af37',
  dark_mode_enabled BOOLEAN DEFAULT true,
  show_hijri_date BOOLEAN DEFAULT true,
  site_logo_path TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create subscribers table (for WhatsApp/Telegram)
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  whatsapp VARCHAR(20),
  telegram VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  form_data JSONB NOT NULL,
  is_read BOOLEAN DEFAULT false,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Create analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path VARCHAR(255),
  content_type VARCHAR(50),
  content_id UUID,
  visitor_id VARCHAR(255),
  views_count INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  date DATE DEFAULT CURRENT_DATE
);

-- 7. Create about_page table for Sheikh profile
CREATE TABLE IF NOT EXISTS about_page (
  id UUID DEFAULT '00000000-0000-0000-0000-000000000001' PRIMARY KEY,
  title VARCHAR(255) DEFAULT 'عن الشيخ',
  content TEXT,
  quote TEXT,
  quote_author VARCHAR(255) DEFAULT 'الشيخ السيد مراد',
  image_path TEXT,
  birth_date VARCHAR(100),
  education TEXT,
  positions TEXT,
  achievements TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Create contact_fields table
CREATE TABLE IF NOT EXISTS contact_fields (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  field_name VARCHAR(100) NOT NULL,
  field_type VARCHAR(50) DEFAULT 'text',
  field_label VARCHAR(255) NOT NULL,
  placeholder TEXT,
  is_required BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Create seo_settings table
CREATE TABLE IF NOT EXISTS seo_settings (
  id UUID DEFAULT '00000000-0000-0000-0000-000000000001' PRIMARY KEY,
  site_title VARCHAR(255),
  site_description TEXT,
  site_keywords TEXT,
  og_image TEXT,
  twitter_handle VARCHAR(100),
  google_analytics_id VARCHAR(100),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Done with table creation!
SELECT 'Master Schema Fix Part 1 - Tables Created!' as message;

-- =====================================================
-- Additional fixes and updates
-- =====================================================

-- 11. Add parent_category_id to categories table after creation
ALTER TABLE categories ADD COLUMN IF NOT EXISTS parent_category_id UUID REFERENCES categories(id) ON DELETE SET NULL;

-- 12. Add missing columns to sermons
ALTER TABLE sermons ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id) ON DELETE SET NULL;
ALTER TABLE sermons ADD COLUMN IF NOT EXISTS media_source VARCHAR(20) DEFAULT 'local';
ALTER TABLE sermons ADD COLUMN IF NOT EXISTS thumbnail_path TEXT;
ALTER TABLE sermons ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- 13. Add missing columns to lessons
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id) ON DELETE SET NULL;
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS lesson_type VARCHAR(50) DEFAULT 'general';
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS thumbnail_path TEXT;
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS is_archived BOOLEAN DEFAULT false;

-- 14. Add missing columns to articles
ALTER TABLE articles ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id) ON DELETE SET NULL;

-- 15. Add missing columns to books
ALTER TABLE books ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id) ON DELETE SET NULL;

-- 16. Add missing columns to media
ALTER TABLE media ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id) ON DELETE SET NULL;
ALTER TABLE media ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- 17. Add missing columns to hero_settings
ALTER TABLE hero_settings ADD COLUMN IF NOT EXISTS underline_text VARCHAR(255);
ALTER TABLE hero_settings ADD COLUMN IF NOT EXISTS featured_book_id UUID;

-- 18. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_categories_type ON categories(type);
CREATE INDEX IF NOT EXISTS idx_categories_parent ON categories(parent_category_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
CREATE INDEX IF NOT EXISTS idx_analytics_date ON analytics(date);
CREATE INDEX IF NOT EXISTS idx_analytics_content ON analytics(content_type, content_id);
CREATE INDEX IF NOT EXISTS idx_sermons_category ON sermons(category_id);
CREATE INDEX IF NOT EXISTS idx_lessons_category ON lessons(category_id);
CREATE INDEX IF NOT EXISTS idx_lessons_type ON lessons(lesson_type);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_books_category ON books(category_id);
CREATE INDEX IF NOT EXISTS idx_media_category ON media(category_id);
CREATE INDEX IF NOT EXISTS idx_subscribers_active ON subscribers(is_active);

-- 19. Insert default appearance settings
INSERT INTO appearance_settings (id, primary_color, secondary_color, dark_mode_enabled, show_hijri_date)
VALUES ('00000000-0000-0000-0000-000000000001', '#1e4338', '#d4af37', true, true)
ON CONFLICT (id) DO NOTHING;

-- 20. Insert default about page
INSERT INTO about_page (id, title, content, quote)
VALUES ('00000000-0000-0000-0000-000000000001', 'عن الشيخ', 'نبذة عن الشيخ السيد مراد', 'العلم نور')
ON CONFLICT (id) DO NOTHING;

-- 21. Insert default SEO settings
INSERT INTO seo_settings (id, site_title, site_description)
VALUES ('00000000-0000-0000-0000-000000000001', 'موقع الشيخ السيد مراد', 'الموقع الرسمي للشيخ السيد مراد - دروس وخطب ومقالات')
ON CONFLICT (id) DO NOTHING;

-- 22. Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE appearance_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_page ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;

-- 23. Create RLS policies (allow all operations for now - can be restricted later)
-- Categories
DROP POLICY IF EXISTS "Allow all on categories" ON categories;
CREATE POLICY "Allow all on categories" ON categories FOR ALL USING (true) WITH CHECK (true);

-- Notifications
DROP POLICY IF EXISTS "Allow all on notifications" ON notifications;
CREATE POLICY "Allow all on notifications" ON notifications FOR ALL USING (true) WITH CHECK (true);

-- Appearance Settings
DROP POLICY IF EXISTS "Allow all on appearance_settings" ON appearance_settings;
CREATE POLICY "Allow all on appearance_settings" ON appearance_settings FOR ALL USING (true) WITH CHECK (true);

-- Subscribers
DROP POLICY IF EXISTS "Allow all on subscribers" ON subscribers;
CREATE POLICY "Allow all on subscribers" ON subscribers FOR ALL USING (true) WITH CHECK (true);

-- Contact Submissions
DROP POLICY IF EXISTS "Allow all on contact_submissions" ON contact_submissions;
CREATE POLICY "Allow all on contact_submissions" ON contact_submissions FOR ALL USING (true) WITH CHECK (true);

-- Analytics
DROP POLICY IF EXISTS "Allow all on analytics" ON analytics;
CREATE POLICY "Allow all on analytics" ON analytics FOR ALL USING (true) WITH CHECK (true);

-- About Page
DROP POLICY IF EXISTS "Allow all on about_page" ON about_page;
CREATE POLICY "Allow all on about_page" ON about_page FOR ALL USING (true) WITH CHECK (true);

-- Site Settings
DROP POLICY IF EXISTS "Allow all on site_settings" ON site_settings;
CREATE POLICY "Allow all on site_settings" ON site_settings FOR ALL USING (true) WITH CHECK (true);

-- Contact Fields
DROP POLICY IF EXISTS "Allow all on contact_fields" ON contact_fields;
CREATE POLICY "Allow all on contact_fields" ON contact_fields FOR ALL USING (true) WITH CHECK (true);

-- SEO Settings
DROP POLICY IF EXISTS "Allow all on seo_settings" ON seo_settings;
CREATE POLICY "Allow all on seo_settings" ON seo_settings FOR ALL USING (true) WITH CHECK (true);

-- Done!
SELECT 'Master Schema Fix completed successfully!' as message;
