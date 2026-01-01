-- =====================================================
-- FINAL COMPLETE DATABASE SETUP
-- =====================================================
-- This is the ONLY script you need to run
-- It creates all tables with ALL required columns
-- Run this in Supabase SQL Editor
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. CATEGORIES TABLE
-- =====================================================
DROP TABLE IF EXISTS categories CASCADE;
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('sermon', 'lesson', 'article', 'book', 'media')),
  parent_category_id UUID REFERENCES categories(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Auth can manage categories" ON categories FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- 2. SERMONS TABLE (KHUTBA)
-- =====================================================
DROP TABLE IF EXISTS sermons CASCADE;
CREATE TABLE sermons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  audio_url TEXT,
  video_url TEXT,
  thumbnail TEXT,
  duration TEXT,
  category_id UUID REFERENCES categories(id),
  publish_status TEXT DEFAULT 'draft' CHECK (publish_status IN ('draft', 'published')),
  is_active BOOLEAN DEFAULT true,
  media_source TEXT CHECK (media_source IN ('youtube', 'local')) DEFAULT 'local',
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE sermons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published sermons" ON sermons FOR SELECT USING (publish_status = 'published' AND is_active = true);
CREATE POLICY "Auth can manage sermons" ON sermons FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- 3. LESSONS TABLE (DARS)
-- =====================================================
DROP TABLE IF EXISTS lessons CASCADE;
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  audio_url TEXT,
  video_url TEXT,
  thumbnail TEXT,
  duration TEXT,
  category_id UUID REFERENCES categories(id),
  series TEXT,
  episode_number INTEGER,
  lesson_type TEXT CHECK (lesson_type IN ('fiqh', 'seerah', 'general')),
  is_archived BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  publish_status TEXT DEFAULT 'draft' CHECK (publish_status IN ('draft', 'published')),
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published lessons" ON lessons FOR SELECT USING (publish_status = 'published' AND is_active = true);
CREATE POLICY "Auth can manage lessons" ON lessons FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- 4. ARTICLES TABLE
-- =====================================================
DROP TABLE IF EXISTS articles CASCADE;
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  thumbnail TEXT,
  category_id UUID REFERENCES categories(id),
  author TEXT DEFAULT 'الشيخ السيد مراد',
  read_time INTEGER DEFAULT 5,
  is_active BOOLEAN DEFAULT true,
  publish_status TEXT DEFAULT 'draft' CHECK (publish_status IN ('draft', 'published')),
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published articles" ON articles FOR SELECT USING (publish_status = 'published' AND is_active = true);
CREATE POLICY "Auth can manage articles" ON articles FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- 5. BOOKS TABLE
-- =====================================================
DROP TABLE IF EXISTS books CASCADE;
CREATE TABLE books (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  cover_image TEXT,
  file_url TEXT,
  file_size TEXT,
  pages INTEGER,
  category_id UUID REFERENCES categories(id),
  publish_year TEXT,
  isbn TEXT,
  is_active BOOLEAN DEFAULT true,
  publish_status TEXT DEFAULT 'draft' CHECK (publish_status IN ('draft', 'published')),
  downloads INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE books ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published books" ON books FOR SELECT USING (publish_status = 'published' AND is_active = true);
CREATE POLICY "Auth can manage books" ON books FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- 6. MEDIA TABLE (VIDEOS/AUDIO)
-- =====================================================
DROP TABLE IF EXISTS media CASCADE;
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('video', 'audio')),
  url TEXT NOT NULL,
  thumbnail TEXT,
  duration TEXT,
  category_id UUID REFERENCES categories(id),
  publish_status TEXT DEFAULT 'draft' CHECK (publish_status IN ('draft', 'published')),
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published media" ON media FOR SELECT USING (publish_status = 'published');
CREATE POLICY "Auth can manage media" ON media FOR ALL USING (auth.role() = 'authenticated');


-- =====================================================
-- 8. HERO SECTION TABLE
-- =====================================================
DROP TABLE IF EXISTS hero_section CASCADE;
CREATE TABLE hero_section (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
CREATE POLICY "Public can view hero_section" ON hero_section FOR SELECT USING (true);
CREATE POLICY "Auth can manage hero_section" ON hero_section FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- 9. WEEKLY SCHEDULE TABLE
-- =====================================================
DROP TABLE IF EXISTS weekly_schedule CASCADE;
CREATE TABLE weekly_schedule (
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

ALTER TABLE weekly_schedule ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view weekly_schedule" ON weekly_schedule FOR SELECT USING (is_active = true);
CREATE POLICY "Auth can manage weekly_schedule" ON weekly_schedule FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- 10. SCHEDULE EVENTS TABLE
-- =====================================================
DROP TABLE IF EXISTS schedule_events CASCADE;
CREATE TABLE schedule_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
CREATE POLICY "Public can view active schedule_events" ON schedule_events FOR SELECT USING (is_active = true);
CREATE POLICY "Auth can manage schedule_events" ON schedule_events FOR ALL USING (auth.role() = 'authenticated');


-- =====================================================
-- 13. SHEIKH PROFILE TABLE
-- =====================================================
DROP TABLE IF EXISTS sheikh_profile CASCADE;
CREATE TABLE sheikh_profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL DEFAULT 'الشيخ السيد مراد',
  title TEXT NOT NULL DEFAULT 'عالم أزهري ومفكر تربوي',
  bio TEXT NOT NULL DEFAULT 'عالم أزهري ومفكر تربوي، كرس حياته لخدمة العلم والدعوة.',
  photo_path TEXT DEFAULT '/images/sheikh/default.jpg',
  tags JSONB DEFAULT '[{"icon": "school", "text": "دكتوراه في الفقه المقارن"}, {"icon": "location_on", "text": "القاهرة، مصر"}, {"icon": "mic", "text": "خطيب وإمام"}]'::jsonb,
  social_media JSONB DEFAULT '{}'::jsonb,
  stats JSONB DEFAULT '{"students": "5000+", "books": "20+", "lectures": "1000+", "years": "25+"}'::jsonb,
  education TEXT,
  achievements TEXT,
  current_positions TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE sheikh_profile ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view sheikh_profile" ON sheikh_profile FOR SELECT USING (true);
CREATE POLICY "Auth can manage sheikh_profile" ON sheikh_profile FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- 14. NOTIFICATIONS TABLE
-- =====================================================
DROP TABLE IF EXISTS notifications CASCADE;
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT CHECK (type IN ('info', 'success', 'warning', 'error')) DEFAULT 'info',
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Auth can manage notifications" ON notifications FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- 15. APPEARANCE SETTINGS TABLE
-- =====================================================
DROP TABLE IF EXISTS appearance_settings CASCADE;
CREATE TABLE appearance_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  primary_color TEXT DEFAULT '#1c5b45',
  secondary_color TEXT DEFAULT '#d4a04c',
  show_hijri_date BOOLEAN DEFAULT true,
  site_logo_path TEXT DEFAULT '/images/logos/logo.png',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE appearance_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view appearance_settings" ON appearance_settings FOR SELECT USING (true);
CREATE POLICY "Auth can manage appearance_settings" ON appearance_settings FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- 16. SITE ANALYTICS TABLE
-- =====================================================
DROP TABLE IF EXISTS site_analytics CASCADE;
CREATE TABLE site_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL UNIQUE,
  views_count INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE site_analytics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Auth can manage site_analytics" ON site_analytics FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- 17. CONTACT FORM TABLES
-- =====================================================
DROP TABLE IF EXISTS contact_form_settings CASCADE;
CREATE TABLE contact_form_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fields JSONB DEFAULT '[{"name": "name", "label": "الاسم", "type": "text", "required": true}, {"name": "email", "label": "البريد الإلكتروني", "type": "email", "required": true}, {"name": "subject", "label": "الموضوع", "type": "select", "required": true}, {"name": "message", "label": "الرسالة", "type": "textarea", "required": true}]'::jsonb,
  subject_options JSONB DEFAULT '["استفسار عام", "طلب فتوى", "اقتراح", "شكوى", "أخرى"]'::jsonb,
  important_notice TEXT DEFAULT 'يرجى التأكد من صحة البيانات قبل الإرسال',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

DROP TABLE IF EXISTS contact_submissions CASCADE;
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  form_data JSONB NOT NULL,
  is_read BOOLEAN DEFAULT false,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contact_form_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view contact_form_settings" ON contact_form_settings FOR SELECT USING (true);
CREATE POLICY "Auth can manage contact_form_settings" ON contact_form_settings FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can insert contact_submissions" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth can manage contact_submissions" ON contact_submissions FOR ALL USING (auth.role() = 'authenticated');


-- =====================================================
-- OTHER EXISTING TABLES (lesson_schedule, subscribers, site_settings, etc.)
-- =====================================================
DROP TABLE IF EXISTS lesson_schedule CASCADE;
CREATE TABLE lesson_schedule (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE lesson_schedule ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view enabled lesson_schedule" ON lesson_schedule FOR SELECT USING (enabled = true);
CREATE POLICY "Auth can manage lesson_schedule" ON lesson_schedule FOR ALL USING (auth.role() = 'authenticated');

DROP TABLE IF EXISTS subscribers CASCADE;
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  is_active BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Auth can manage subscribers" ON subscribers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Public can subscribe" ON subscribers FOR INSERT WITH CHECK (true);

DROP TABLE IF EXISTS site_settings CASCADE;
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  type TEXT DEFAULT 'text',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Auth can manage site_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

DROP TABLE IF EXISTS about_page CASCADE;
CREATE TABLE about_page (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sheikh_name TEXT NOT NULL,
  sheikh_photo TEXT,
  biography TEXT NOT NULL,
  achievements TEXT,
  education TEXT,
  current_positions TEXT,
  contact_info JSONB DEFAULT '{}'::jsonb,
  social_media JSONB DEFAULT '{}'::jsonb,
  stats JSONB DEFAULT '{}'::jsonb,
  tags TEXT[],
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE about_page ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view about_page" ON about_page FOR SELECT USING (true);
CREATE POLICY "Auth can manage about_page" ON about_page FOR ALL USING (auth.role() = 'authenticated');

DROP TABLE IF EXISTS privacy_policy CASCADE;
CREATE TABLE privacy_policy (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE privacy_policy ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view privacy_policy" ON privacy_policy FOR SELECT USING (true);
CREATE POLICY "Auth can manage privacy_policy" ON privacy_policy FOR ALL USING (auth.role() = 'authenticated');

DROP TABLE IF EXISTS terms_conditions CASCADE;
CREATE TABLE terms_conditions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE terms_conditions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view terms_conditions" ON terms_conditions FOR SELECT USING (true);
CREATE POLICY "Auth can manage terms_conditions" ON terms_conditions FOR ALL USING (auth.role() = 'authenticated');

DROP TABLE IF EXISTS contact_messages CASCADE;
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can insert contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth can manage contact_messages" ON contact_messages FOR ALL USING (auth.role() = 'authenticated');

DROP TABLE IF EXISTS community_pages CASCADE;
CREATE TABLE community_pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  images JSONB DEFAULT '[]'::jsonb,
  publish_status TEXT DEFAULT 'draft' CHECK (publish_status IN ('draft', 'published')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE community_pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published community_pages" ON community_pages FOR SELECT USING (publish_status = 'published');
CREATE POLICY "Auth can manage community_pages" ON community_pages FOR ALL USING (auth.role() = 'authenticated');

DROP TABLE IF EXISTS dawah_projects CASCADE;
CREATE TABLE dawah_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  images JSONB DEFAULT '[]'::jsonb,
  publish_status TEXT DEFAULT 'draft' CHECK (publish_status IN ('draft', 'published')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE dawah_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published dawah_projects" ON dawah_projects FOR SELECT USING (publish_status = 'published');
CREATE POLICY "Auth can manage dawah_projects" ON dawah_projects FOR ALL USING (auth.role() = 'authenticated');

DROP TABLE IF EXISTS seo_settings CASCADE;
CREATE TABLE seo_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_path TEXT UNIQUE NOT NULL,
  page_title TEXT NOT NULL,
  meta_description TEXT,
  meta_keywords TEXT,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  twitter_title TEXT,
  twitter_description TEXT,
  twitter_image TEXT,
  canonical_url TEXT,
  robots TEXT DEFAULT 'index, follow',
  structured_data JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view seo_settings" ON seo_settings FOR SELECT USING (true);
CREATE POLICY "Auth can manage seo_settings" ON seo_settings FOR ALL USING (auth.role() = 'authenticated');

DROP TABLE IF EXISTS comments CASCADE;
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_type TEXT NOT NULL CHECK (content_type IN ('sermon', 'lesson', 'article', 'book', 'media')),
  content_id UUID NOT NULL,
  author_name TEXT NOT NULL,
  author_email TEXT,
  comment_text TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view approved comments" ON comments FOR SELECT USING (is_approved = true);
CREATE POLICY "Public can insert comments" ON comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth can manage comments" ON comments FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- CREATE INDEXES FOR PERFORMANCE
-- =====================================================
CREATE INDEX idx_sermons_published ON sermons(publish_status, is_active);
CREATE INDEX idx_sermons_media_source ON sermons(media_source);
CREATE INDEX idx_lessons_type ON lessons(lesson_type, publish_status, is_active);
CREATE INDEX idx_lessons_archived ON lessons(is_archived, is_active);
CREATE INDEX idx_articles_published ON articles(publish_status, is_active);
CREATE INDEX idx_books_published ON books(publish_status, is_active);
CREATE INDEX idx_schedule_events_date ON schedule_events(event_date);
CREATE INDEX idx_schedule_events_type ON schedule_events(event_type);
CREATE INDEX idx_notifications_unread ON notifications(is_read, created_at);
CREATE INDEX idx_analytics_date ON site_analytics(date);
CREATE INDEX idx_categories_parent ON categories(parent_category_id);

-- =====================================================
-- INSERT SEED DATA
-- =====================================================

-- Categories
INSERT INTO categories (name, slug, description, type) VALUES
('خطب الجمعة', 'friday-sermons', 'خطب يوم الجمعة المباركة', 'sermon'),
('خطب المناسبات', 'occasion-sermons', 'خطب المناسبات الدينية', 'sermon'),
('فقه', 'fiqh', 'دروس الفقه الإسلامي', 'lesson'),
('عقيدة', 'aqeedah', 'دروس العقيدة الإسلامية', 'lesson'),
('تفسير', 'tafseer', 'دروس تفسير القرآن الكريم', 'lesson'),
('سيرة', 'seerah', 'دروس السيرة النبوية', 'lesson'),
('حديث', 'hadith', 'دروس الحديث الشريف', 'lesson'),
('مقالات فقهية', 'fiqh-articles', 'مقالات في الفقه الإسلامي', 'article'),
('مقالات عقدية', 'aqeedah-articles', 'مقالات في العقيدة', 'article'),
('كتب فقه', 'fiqh-books', 'كتب في الفقه الإسلامي', 'book'),
('كتب عقيدة', 'aqeedah-books', 'كتب في العقيدة', 'book'),
('محاضرات', 'lectures', 'محاضرات مرئية', 'media'),
('تلاوات', 'recitations', 'تلاوات قرآنية', 'media');

-- Insert default data
INSERT INTO appearance_settings DEFAULT VALUES;
INSERT INTO sheikh_profile DEFAULT VALUES;
INSERT INTO hero_section (hadith_text, hadith_source, button_text, button_link) 
VALUES ('خيركم من تعلم القرآن وعلمه', 'صحيح البخاري', 'تصفح المحتوى', '/sermons');

-- =====================================================
-- COMPLETE!
-- =====================================================
SELECT '✅ Database setup complete! All tables created successfully.' as status;
