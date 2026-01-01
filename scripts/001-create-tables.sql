-- ============================================
-- موقع الشيخ السيد مراد - إنشاء جداول قاعدة البيانات
-- Sheikh El-Sayed Mourad Website - Database Schema
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. Categories Table (التصنيفات)
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('sermon', 'article', 'book', 'lesson', 'media')),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. Sermons Table (الخطب)
-- ============================================
CREATE TABLE IF NOT EXISTS sermons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT,
    category TEXT,
    thumbnail_path TEXT,
    audio_file_path TEXT,
    video_url TEXT,
    publish_status TEXT DEFAULT 'draft' CHECK (publish_status IN ('draft', 'published', 'archived')),
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. Lessons Table (الدروس)
-- ============================================
CREATE TABLE IF NOT EXISTS lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    lesson_type TEXT NOT NULL CHECK (lesson_type IN ('fiqh', 'seerah', 'aqeedah', 'general')),
    type TEXT DEFAULT 'audio' CHECK (type IN ('audio', 'video')),
    audio_file_path TEXT,
    video_url TEXT,
    thumbnail_path TEXT,
    duration TEXT,
    publish_status TEXT DEFAULT 'draft' CHECK (publish_status IN ('draft', 'published', 'archived')),
    is_active BOOLEAN DEFAULT true,
    is_archived BOOLEAN DEFAULT false,
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. Articles Table (المقالات)
-- ============================================
CREATE TABLE IF NOT EXISTS articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT,
    category TEXT,
    thumbnail TEXT,
    publish_status TEXT DEFAULT 'draft' CHECK (publish_status IN ('draft', 'published', 'archived')),
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 5. Books Table (الكتب)
-- ============================================
CREATE TABLE IF NOT EXISTS books (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    author TEXT DEFAULT 'الشيخ السيد مراد',
    description TEXT,
    category TEXT,
    cover_image_path TEXT,
    pdf_file_path TEXT,
    publish_status TEXT DEFAULT 'draft' CHECK (publish_status IN ('draft', 'published', 'archived')),
    download_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 6. Media Table (المرئيات)
-- ============================================
CREATE TABLE IF NOT EXISTS media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    url TEXT,
    thumbnail TEXT,
    category TEXT,
    duration TEXT,
    publish_status TEXT DEFAULT 'draft' CHECK (publish_status IN ('draft', 'published', 'archived')),
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 7. Schedule Events Table (جدول المواعيد)
-- ============================================
CREATE TABLE IF NOT EXISTS schedule_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    event_type TEXT NOT NULL CHECK (event_type IN ('fiqh', 'seerah', 'friday', 'aqeedah', 'general')),
    event_date DATE NOT NULL,
    event_time TIME,
    location TEXT,
    is_live BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 8. Subscribers Table (المشتركين)
-- ============================================
CREATE TABLE IF NOT EXISTS subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- ============================================
-- 9. Contact Messages Table (رسائل التواصل)
-- ============================================
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 10. Site Settings Table (إعدادات الموقع)
-- ============================================
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 11. About Page Table (صفحة من نحن)
-- ============================================
CREATE TABLE IF NOT EXISTS about_page (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sheikh_name TEXT DEFAULT 'الشيخ السيد مراد',
    sheikh_photo TEXT,
    biography TEXT,
    achievements TEXT,
    education TEXT,
    current_positions TEXT,
    social_media JSONB DEFAULT '{}',
    stats JSONB DEFAULT '{"students": "5000+", "books": "20+", "lectures": "1000+", "years": "25+"}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 12. Site Analytics Table (تحليلات الموقع)
-- ============================================
CREATE TABLE IF NOT EXISTS site_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL UNIQUE,
    page_views INTEGER DEFAULT 0,
    unique_visitors INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 13. Comments Table (التعليقات)
-- ============================================
CREATE TABLE IF NOT EXISTS comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_type TEXT NOT NULL CHECK (content_type IN ('sermon', 'lesson', 'article', 'book', 'media')),
    content_id UUID NOT NULL,
    author_name TEXT NOT NULL,
    author_email TEXT,
    comment_text TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Create Indexes for Performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_sermons_status ON sermons(publish_status);
CREATE INDEX IF NOT EXISTS idx_sermons_created ON sermons(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lessons_type ON lessons(lesson_type);
CREATE INDEX IF NOT EXISTS idx_lessons_status ON lessons(publish_status);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(publish_status);
CREATE INDEX IF NOT EXISTS idx_books_status ON books(publish_status);
CREATE INDEX IF NOT EXISTS idx_media_status ON media(publish_status);
CREATE INDEX IF NOT EXISTS idx_schedule_date ON schedule_events(event_date);
CREATE INDEX IF NOT EXISTS idx_categories_type ON categories(type);
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_comments_content ON comments(content_type, content_id);

-- ============================================
-- Enable Row Level Security
-- ============================================
ALTER TABLE sermons ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_page ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS Policies - Public Read Access
-- ============================================

-- Sermons: Public can read published
CREATE POLICY "Public can read published sermons" ON sermons
    FOR SELECT USING (publish_status = 'published');

-- Lessons: Public can read published and active
CREATE POLICY "Public can read published lessons" ON lessons
    FOR SELECT USING (publish_status = 'published' AND is_active = true);

-- Articles: Public can read published
CREATE POLICY "Public can read published articles" ON articles
    FOR SELECT USING (publish_status = 'published');

-- Books: Public can read published
CREATE POLICY "Public can read published books" ON books
    FOR SELECT USING (publish_status = 'published');

-- Media: Public can read published
CREATE POLICY "Public can read published media" ON media
    FOR SELECT USING (publish_status = 'published');

-- Schedule: Public can read active events
CREATE POLICY "Public can read active events" ON schedule_events
    FOR SELECT USING (is_active = true);

-- Categories: Public can read all
CREATE POLICY "Public can read categories" ON categories
    FOR SELECT USING (true);

-- About Page: Public can read
CREATE POLICY "Public can read about page" ON about_page
    FOR SELECT USING (true);

-- Site Settings: Public can read
CREATE POLICY "Public can read site settings" ON site_settings
    FOR SELECT USING (true);

-- Comments: Public can read approved
CREATE POLICY "Public can read approved comments" ON comments
    FOR SELECT USING (is_approved = true);

-- Subscribers: Public can insert
CREATE POLICY "Public can subscribe" ON subscribers
    FOR INSERT WITH CHECK (true);

-- Contact Messages: Public can insert
CREATE POLICY "Public can send messages" ON contact_messages
    FOR INSERT WITH CHECK (true);

-- ============================================
-- RLS Policies - Authenticated Full Access
-- ============================================

-- Authenticated users (admins) have full access
CREATE POLICY "Admins have full access to sermons" ON sermons
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to lessons" ON lessons
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to articles" ON articles
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to books" ON books
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to media" ON media
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to schedule" ON schedule_events
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to subscribers" ON subscribers
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to messages" ON contact_messages
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to settings" ON site_settings
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to about" ON about_page
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to categories" ON categories
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to analytics" ON site_analytics
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to comments" ON comments
    FOR ALL USING (auth.role() = 'authenticated');
