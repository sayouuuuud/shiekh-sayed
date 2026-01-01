-- ============================================
-- تحديث مخطط قاعدة البيانات ليتوافق مع صفحات الإدارة
-- ============================================

-- إسقاط الجداول القديمة وإعادة إنشائها بالهيكل الصحيح
-- تحذير: سيؤدي هذا إلى حذف جميع البيانات الموجودة

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. Drop existing tables if they exist
-- ============================================
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS site_analytics CASCADE;
DROP TABLE IF EXISTS about_page CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS subscribers CASCADE;
DROP TABLE IF EXISTS schedule_events CASCADE;
DROP TABLE IF EXISTS media CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS lessons CASCADE;
DROP TABLE IF EXISTS sermons CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS navbar_items CASCADE;
DROP TABLE IF EXISTS community_posts CASCADE;
DROP TABLE IF EXISTS community_comments CASCADE;

-- ============================================
-- 2. Categories Table (التصنيفات)
-- ============================================
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('sermon', 'article', 'book', 'lesson', 'media')),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. Sermons Table (الخطب) - متوافق مع admin/khutba
-- ============================================
CREATE TABLE sermons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT,
    introduction TEXT,
    main_topic TEXT,
    conclusion TEXT,
    audio_file_path TEXT,
    youtube_url TEXT,
    media_source TEXT DEFAULT 'local' CHECK (media_source IN ('youtube', 'local')),
    thumbnail_path TEXT,
    publish_status TEXT DEFAULT 'draft' CHECK (publish_status IN ('draft', 'published', 'archived')),
    is_active BOOLEAN DEFAULT true,
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. Lessons Table (الدروس) - متوافق مع admin/dars
-- ============================================
CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    type TEXT DEFAULT 'audio' CHECK (type IN ('audio', 'video')),
    lesson_type TEXT DEFAULT 'general' CHECK (lesson_type IN ('fiqh', 'seerah', 'aqeedah', 'general')),
    media_source TEXT DEFAULT 'youtube' CHECK (media_source IN ('youtube', 'local')),
    media_path_or_url TEXT,
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
-- 5. Articles Table (المقالات) - متوافق مع admin/articles
-- ============================================
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT,
    author TEXT DEFAULT 'الشيخ السيد مراد',
    featured_image TEXT,
    publish_status TEXT DEFAULT 'draft' CHECK (publish_status IN ('draft', 'published', 'archived')),
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 6. Books Table (الكتب) - متوافق مع admin/books
-- ============================================
CREATE TABLE books (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    author TEXT DEFAULT 'الشيخ السيد مراد',
    description TEXT,
    cover_image_path TEXT,
    pdf_file_path TEXT,
    publish_status TEXT DEFAULT 'draft' CHECK (publish_status IN ('draft', 'published', 'archived')),
    download_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 7. Media Table (المرئيات)
-- ============================================
CREATE TABLE media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    url TEXT,
    thumbnail TEXT,
    category TEXT,
    duration TEXT,
    publish_status TEXT DEFAULT 'draft' CHECK (publish_status IN ('draft', 'published', 'archived')),
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 8. Schedule Events Table (جدول المواعيد)
-- ============================================
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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 9. Subscribers Table (المشتركين)
-- ============================================
CREATE TABLE subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    is_active BOOLEAN DEFAULT true,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- ============================================
-- 10. Contact Messages Table (رسائل التواصل)
-- ============================================
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 11. Site Settings Table (إعدادات الموقع)
-- ============================================
CREATE TABLE site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 12. About Page Table (صفحة من نحن)
-- ============================================
CREATE TABLE about_page (
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
-- 13. Site Analytics Table (تحليلات الموقع)
-- ============================================
CREATE TABLE site_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL UNIQUE,
    page_views INTEGER DEFAULT 0,
    unique_visitors INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 14. Comments Table (التعليقات)
-- ============================================
CREATE TABLE comments (
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
-- 15. Navbar Items Table (عناصر التنقل)
-- ============================================
CREATE TABLE navbar_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    label TEXT NOT NULL,
    href TEXT NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    parent_id UUID REFERENCES navbar_items(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 16. Community Posts Table (منشورات المجتمع)
-- ============================================
CREATE TABLE community_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author_name TEXT NOT NULL,
    author_email TEXT,
    category TEXT DEFAULT 'general',
    is_approved BOOLEAN DEFAULT false,
    is_pinned BOOLEAN DEFAULT false,
    likes_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 17. Community Comments Table (تعليقات المجتمع)
-- ============================================
CREATE TABLE community_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE,
    author_name TEXT NOT NULL,
    author_email TEXT,
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Create Indexes for Performance
-- ============================================
CREATE INDEX idx_sermons_status ON sermons(publish_status);
CREATE INDEX idx_sermons_created ON sermons(created_at DESC);
CREATE INDEX idx_lessons_type ON lessons(lesson_type);
CREATE INDEX idx_lessons_status ON lessons(publish_status);
CREATE INDEX idx_articles_status ON articles(publish_status);
CREATE INDEX idx_books_status ON books(publish_status);
CREATE INDEX idx_media_status ON media(publish_status);
CREATE INDEX idx_schedule_date ON schedule_events(event_date);
CREATE INDEX idx_categories_type ON categories(type);
CREATE INDEX idx_subscribers_email ON subscribers(email);
CREATE INDEX idx_comments_content ON comments(content_type, content_id);
CREATE INDEX idx_navbar_order ON navbar_items(order_index);
CREATE INDEX idx_community_posts_approved ON community_posts(is_approved);

-- ============================================
-- Insert Default Navbar Items
-- ============================================
INSERT INTO navbar_items (label, href, order_index, is_active) VALUES
('الرئيسية', '/', 0, true),
('الخطب', '/khutba', 1, true),
('الدروس', '/dars', 2, true),
('المقالات', '/articles', 3, true),
('الكتب', '/books', 4, true),
('المرئيات', '/videos', 5, true),
('الجدول', '/schedule', 6, true),
('المجتمع', '/community', 7, true),
('من نحن', '/about', 8, true),
('تواصل معنا', '/contact', 9, true);

-- ============================================
-- Insert Default About Page
-- ============================================
INSERT INTO about_page (sheikh_name, biography, achievements, education, current_positions, stats) VALUES
(
    'الشيخ السيد مراد',
    'فضيلة الشيخ السيد مراد من كبار علماء الأزهر الشريف، حاصل على العالمية من كلية أصول الدين. قضى أكثر من 25 عاماً في خدمة العلم الشرعي والدعوة إلى الله.',
    '- حفظ القرآن الكريم في سن مبكرة
- التدريس في الأزهر الشريف
- إلقاء المئات من الخطب والدروس
- تأليف العديد من الكتب في العلوم الشرعية',
    '- الإجازة العالية من كلية أصول الدين - جامعة الأزهر
- دراسات متقدمة في الفقه المقارن
- إجازات متعددة في القراءات القرآنية',
    '- خطيب مسجد
- مدرس بالأزهر الشريف
- عضو لجنة الفتوى',
    '{"students": "5000+", "books": "20+", "lectures": "1000+", "years": "25+"}'
);

-- ============================================
-- Insert Default Site Settings
-- ============================================
INSERT INTO site_settings (key, value) VALUES
('site_name', 'موقع الشيخ السيد مراد'),
('site_description', 'الموقع الرسمي لفضيلة الشيخ السيد مراد - علم وإيمان'),
('contact_email', 'info@sheikh-mourad.com'),
('facebook_url', 'https://facebook.com/'),
('youtube_url', 'https://youtube.com/'),
('twitter_url', 'https://twitter.com/');

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
ALTER TABLE navbar_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_comments ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS Policies - Allow all operations for now (development)
-- ============================================

-- Sermons
CREATE POLICY "Allow all on sermons" ON sermons FOR ALL USING (true) WITH CHECK (true);

-- Lessons
CREATE POLICY "Allow all on lessons" ON lessons FOR ALL USING (true) WITH CHECK (true);

-- Articles
CREATE POLICY "Allow all on articles" ON articles FOR ALL USING (true) WITH CHECK (true);

-- Books
CREATE POLICY "Allow all on books" ON books FOR ALL USING (true) WITH CHECK (true);

-- Media
CREATE POLICY "Allow all on media" ON media FOR ALL USING (true) WITH CHECK (true);

-- Schedule Events
CREATE POLICY "Allow all on schedule_events" ON schedule_events FOR ALL USING (true) WITH CHECK (true);

-- Subscribers
CREATE POLICY "Allow all on subscribers" ON subscribers FOR ALL USING (true) WITH CHECK (true);

-- Contact Messages
CREATE POLICY "Allow all on contact_messages" ON contact_messages FOR ALL USING (true) WITH CHECK (true);

-- Site Settings
CREATE POLICY "Allow all on site_settings" ON site_settings FOR ALL USING (true) WITH CHECK (true);

-- About Page
CREATE POLICY "Allow all on about_page" ON about_page FOR ALL USING (true) WITH CHECK (true);

-- Categories
CREATE POLICY "Allow all on categories" ON categories FOR ALL USING (true) WITH CHECK (true);

-- Site Analytics
CREATE POLICY "Allow all on site_analytics" ON site_analytics FOR ALL USING (true) WITH CHECK (true);

-- Comments
CREATE POLICY "Allow all on comments" ON comments FOR ALL USING (true) WITH CHECK (true);

-- Navbar Items
CREATE POLICY "Allow all on navbar_items" ON navbar_items FOR ALL USING (true) WITH CHECK (true);

-- Community Posts
CREATE POLICY "Allow all on community_posts" ON community_posts FOR ALL USING (true) WITH CHECK (true);

-- Community Comments
CREATE POLICY "Allow all on community_comments" ON community_comments FOR ALL USING (true) WITH CHECK (true);
