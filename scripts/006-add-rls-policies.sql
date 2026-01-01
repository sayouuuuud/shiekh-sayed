-- سكريبت إضافة سياسات Row Level Security للسماح بالوصول للجداول
-- Script to add RLS policies for all tables

-- =============================================
-- تعطيل RLS مؤقتاً للجداول (للسماح بالوصول العام)
-- أو إضافة سياسات تسمح بجميع العمليات
-- =============================================

-- جدول الكتب (books)
ALTER TABLE IF EXISTS books DISABLE ROW LEVEL SECURITY;
-- أو إذا أردت إبقاء RLS مع سياسات:
DROP POLICY IF EXISTS "Allow all operations on books" ON books;
CREATE POLICY "Allow all operations on books" ON books FOR ALL USING (true) WITH CHECK (true);

-- جدول المقالات (articles)
ALTER TABLE IF EXISTS articles DISABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations on articles" ON articles;
CREATE POLICY "Allow all operations on articles" ON articles FOR ALL USING (true) WITH CHECK (true);

-- جدول الخطب (sermons)
ALTER TABLE IF EXISTS sermons DISABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations on sermons" ON sermons;
CREATE POLICY "Allow all operations on sermons" ON sermons FOR ALL USING (true) WITH CHECK (true);

-- جدول الدروس (lessons)
ALTER TABLE IF EXISTS lessons DISABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations on lessons" ON lessons;
CREATE POLICY "Allow all operations on lessons" ON lessons FOR ALL USING (true) WITH CHECK (true);

-- جدول الوسائط (media)
ALTER TABLE IF EXISTS media DISABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations on media" ON media;
CREATE POLICY "Allow all operations on media" ON media FOR ALL USING (true) WITH CHECK (true);

-- جدول التصنيفات (categories)
ALTER TABLE IF EXISTS categories DISABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations on categories" ON categories;
CREATE POLICY "Allow all operations on categories" ON categories FOR ALL USING (true) WITH CHECK (true);

-- جدول المشتركين (subscribers)
ALTER TABLE IF EXISTS subscribers DISABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations on subscribers" ON subscribers;
CREATE POLICY "Allow all operations on subscribers" ON subscribers FOR ALL USING (true) WITH CHECK (true);

-- جدول رسائل التواصل (contact_messages)
ALTER TABLE IF EXISTS contact_messages DISABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations on contact_messages" ON contact_messages;
CREATE POLICY "Allow all operations on contact_messages" ON contact_messages FOR ALL USING (true) WITH CHECK (true);

-- جدول الإعدادات (site_settings)
ALTER TABLE IF EXISTS site_settings DISABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations on site_settings" ON site_settings;
CREATE POLICY "Allow all operations on site_settings" ON site_settings FOR ALL USING (true) WITH CHECK (true);

-- جدول صفحة من نحن (about_page)
ALTER TABLE IF EXISTS about_page DISABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations on about_page" ON about_page;
CREATE POLICY "Allow all operations on about_page" ON about_page FOR ALL USING (true) WITH CHECK (true);

-- جدول الأحداث (schedule_events)
ALTER TABLE IF EXISTS schedule_events DISABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations on schedule_events" ON schedule_events;
CREATE POLICY "Allow all operations on schedule_events" ON schedule_events FOR ALL USING (true) WITH CHECK (true);

-- جدول التحليلات (site_analytics)
ALTER TABLE IF EXISTS site_analytics DISABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations on site_analytics" ON site_analytics;
CREATE POLICY "Allow all operations on site_analytics" ON site_analytics FOR ALL USING (true) WITH CHECK (true);

-- جدول التعليقات (comments)
ALTER TABLE IF EXISTS comments DISABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations on comments" ON comments;
CREATE POLICY "Allow all operations on comments" ON comments FOR ALL USING (true) WITH CHECK (true);

-- جدول عناصر التنقل (navbar_items)
ALTER TABLE IF EXISTS navbar_items DISABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations on navbar_items" ON navbar_items;
CREATE POLICY "Allow all operations on navbar_items" ON navbar_items FOR ALL USING (true) WITH CHECK (true);

-- جدول منشورات المجتمع (community_posts)
ALTER TABLE IF EXISTS community_posts DISABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations on community_posts" ON community_posts;
CREATE POLICY "Allow all operations on community_posts" ON community_posts FOR ALL USING (true) WITH CHECK (true);

-- جدول تعليقات المجتمع (community_comments)
ALTER TABLE IF EXISTS community_comments DISABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations on community_comments" ON community_comments;
CREATE POLICY "Allow all operations on community_comments" ON community_comments FOR ALL USING (true) WITH CHECK (true);

-- =============================================
-- منح صلاحيات للمستخدم المجهول (anon) والمصادق (authenticated)
-- =============================================

GRANT ALL ON books TO anon, authenticated;
GRANT ALL ON articles TO anon, authenticated;
GRANT ALL ON sermons TO anon, authenticated;
GRANT ALL ON lessons TO anon, authenticated;
GRANT ALL ON media TO anon, authenticated;
GRANT ALL ON categories TO anon, authenticated;
GRANT ALL ON subscribers TO anon, authenticated;
GRANT ALL ON contact_messages TO anon, authenticated;
GRANT ALL ON site_settings TO anon, authenticated;
GRANT ALL ON about_page TO anon, authenticated;
GRANT ALL ON schedule_events TO anon, authenticated;
GRANT ALL ON site_analytics TO anon, authenticated;
GRANT ALL ON comments TO anon, authenticated;
GRANT ALL ON navbar_items TO anon, authenticated;
GRANT ALL ON community_posts TO anon, authenticated;
GRANT ALL ON community_comments TO anon, authenticated;

-- منح صلاحيات على التسلسلات (sequences) للـ auto-increment
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
