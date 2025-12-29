-- =====================================================
-- COMPLETE DATABASE SETUP FOR SHEIKH SAYED MURAD WEBSITE
-- =====================================================
-- Run this script in Supabase SQL Editor to set up the entire database
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
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE sermons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published sermons" ON sermons FOR SELECT USING (publish_status = 'published');
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
  publish_status TEXT DEFAULT 'draft' CHECK (publish_status IN ('draft', 'published')),
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published lessons" ON lessons FOR SELECT USING (publish_status = 'published');
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
  publish_status TEXT DEFAULT 'draft' CHECK (publish_status IN ('draft', 'published')),
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published articles" ON articles FOR SELECT USING (publish_status = 'published');
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
  publish_status TEXT DEFAULT 'draft' CHECK (publish_status IN ('draft', 'published')),
  downloads INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE books ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published books" ON books FOR SELECT USING (publish_status = 'published');
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
-- 7. HERO SECTION TABLE
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
-- 8. WEEKLY SCHEDULE TABLE
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
-- 9. LESSON SCHEDULE TABLE
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

-- =====================================================
-- 10. SUBSCRIBERS TABLE (NEWSLETTER)
-- =====================================================
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

-- =====================================================
-- 11. SITE SETTINGS TABLE
-- =====================================================
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

-- =====================================================
-- 12. ABOUT PAGE TABLE
-- =====================================================
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

-- =====================================================
-- 13. PRIVACY POLICY TABLE
-- =====================================================
DROP TABLE IF EXISTS privacy_policy CASCADE;
CREATE TABLE privacy_policy (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE privacy_policy ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view privacy_policy" ON privacy_policy FOR SELECT USING (true);
CREATE POLICY "Auth can manage privacy_policy" ON privacy_policy FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- 14. TERMS AND CONDITIONS TABLE
-- =====================================================
DROP TABLE IF EXISTS terms_conditions CASCADE;
CREATE TABLE terms_conditions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE terms_conditions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view terms_conditions" ON terms_conditions FOR SELECT USING (true);
CREATE POLICY "Auth can manage terms_conditions" ON terms_conditions FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- 15. CONTACT MESSAGES TABLE
-- =====================================================
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

-- =====================================================
-- 16. COMMUNITY PAGES TABLE
-- =====================================================
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

-- =====================================================
-- 17. DAWAH PROJECTS TABLE
-- =====================================================
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

-- =====================================================
-- 18. SEO SETTINGS TABLE
-- =====================================================
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

-- =====================================================
-- 19. COMMENTS TABLE (OPTIONAL)
-- =====================================================
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
-- SEED DATA
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

-- Sermons
INSERT INTO sermons (title, description, content, audio_url, duration, category_id, publish_status, views) VALUES
('خطبة عن التقوى', 'خطبة جمعة عن أهمية التقوى في حياة المسلم', 'الحمد لله رب العالمين، والصلاة والسلام على أشرف الأنبياء والمرسلين...

التقوى هي وصية الله للأولين والآخرين، قال تعالى: "ولقد وصينا الذين أوتوا الكتاب من قبلكم وإياكم أن اتقوا الله"...', '/audio/taqwa.mp3', '25:30', (SELECT id FROM categories WHERE slug = 'friday-sermons'), 'published', 150),
('خطبة عن بر الوالدين', 'خطبة جمعة عن فضل بر الوالدين', 'الحمد لله الذي جعل بر الوالدين من أعظم القربات...

بر الوالدين من أجل الأعمال وأحبها إلى الله تعالى، وقد قرنه الله بعبادته في كتابه الكريم...', '/audio/parents.mp3', '22:15', (SELECT id FROM categories WHERE slug = 'friday-sermons'), 'published', 200),
('خطبة عن الصبر', 'خطبة جمعة عن الصبر وفضله', 'الحمد لله رب العالمين، الذي وعد الصابرين أجرهم بغير حساب...

الصبر نصف الإيمان، وهو من أعظم العبادات التي يتقرب بها العبد إلى ربه...', '/audio/sabr.mp3', '28:00', (SELECT id FROM categories WHERE slug = 'friday-sermons'), 'published', 180);

-- Lessons
INSERT INTO lessons (title, description, content, audio_url, duration, category_id, series, episode_number, publish_status, views) VALUES
('شرح كتاب الطهارة - الدرس الأول', 'شرح أحكام الطهارة من كتاب بلوغ المرام', 'بسم الله الرحمن الرحيم، نبدأ اليوم بشرح كتاب الطهارة...

الطهارة شرط لصحة الصلاة، وهي على نوعين: طهارة حدث وطهارة خبث...', '/audio/tahara-1.mp3', '45:00', (SELECT id FROM categories WHERE slug = 'fiqh'), 'شرح بلوغ المرام', 1, 'published', 320),
('شرح كتاب الطهارة - الدرس الثاني', 'تتمة شرح أحكام الطهارة', 'نستكمل اليوم ما بدأناه في الدرس السابق من أحكام الطهارة...', '/audio/tahara-2.mp3', '42:00', (SELECT id FROM categories WHERE slug = 'fiqh'), 'شرح بلوغ المرام', 2, 'published', 280),
('السيرة النبوية - المولد والنشأة', 'دراسة سيرة النبي صلى الله عليه وسلم', 'نبدأ اليوم رحلتنا مع سيرة خير البشر محمد صلى الله عليه وسلم...

ولد النبي صلى الله عليه وسلم في عام الفيل، في شهر ربيع الأول...', '/audio/seerah-1.mp3', '50:00', (SELECT id FROM categories WHERE slug = 'seerah'), 'السيرة النبوية', 1, 'published', 450),
('تفسير سورة الفاتحة', 'شرح وتفسير سورة الفاتحة', 'سورة الفاتحة هي أم الكتاب وأعظم سورة في القرآن الكريم...', '/audio/fatiha.mp3', '55:00', (SELECT id FROM categories WHERE slug = 'tafseer'), 'تفسير جزء عم', 1, 'published', 520);

-- Articles
INSERT INTO articles (title, slug, excerpt, content, category_id, read_time, publish_status, views) VALUES
('أحكام الصيام في رمضان', 'fasting-rules-ramadan', 'مقال شامل عن أحكام الصيام في شهر رمضان المبارك', 'الحمد لله رب العالمين، والصلاة والسلام على أشرف الأنبياء والمرسلين...

الصيام ركن من أركان الإسلام الخمسة، فرضه الله تعالى على المسلمين في السنة الثانية من الهجرة...

## شروط وجوب الصيام
1. الإسلام
2. البلوغ
3. العقل
4. القدرة على الصيام

## أركان الصيام
1. النية
2. الإمساك عن المفطرات من طلوع الفجر إلى غروب الشمس...', (SELECT id FROM categories WHERE slug = 'fiqh-articles'), 8, 'published', 350),
('فضل قراءة القرآن', 'virtues-reading-quran', 'مقال عن فضائل تلاوة القرآن الكريم وثوابها', 'القرآن الكريم كلام الله المنزل على نبيه محمد صلى الله عليه وسلم...

قال النبي صلى الله عليه وسلم: "اقرأوا القرآن فإنه يأتي يوم القيامة شفيعاً لأصحابه"...

## فضائل تلاوة القرآن
- الحسنة بعشر أمثالها
- الرفعة في الدنيا والآخرة
- الشفاعة يوم القيامة...', (SELECT id FROM categories WHERE slug = 'aqeedah-articles'), 6, 'published', 420),
('آداب المسجد', 'mosque-etiquette', 'مقال عن آداب دخول المسجد والصلاة فيه', 'المساجد بيوت الله في الأرض، وهي أحب البقاع إلى الله تعالى...

## آداب الذهاب إلى المسجد
1. التطيب والتزين
2. المشي بسكينة ووقار
3. الدعاء عند دخول المسجد...', (SELECT id FROM categories WHERE slug = 'fiqh-articles'), 5, 'published', 280);

-- Books
INSERT INTO books (title, description, cover_image, file_url, file_size, pages, category_id, publish_year, publish_status, downloads, views) VALUES
('فقه العبادات الميسر', 'كتاب شامل في فقه العبادات بأسلوب ميسر', '/placeholder.svg?height=400&width=300', '/files/fiqh-ibadat.pdf', '5.2 MB', 320, (SELECT id FROM categories WHERE slug = 'fiqh-books'), '2023', 'published', 150, 450),
('شرح أصول الإيمان', 'شرح مبسط لأصول الإيمان الستة', '/placeholder.svg?height=400&width=300', '/files/usul-iman.pdf', '3.8 MB', 180, (SELECT id FROM categories WHERE slug = 'aqeedah-books'), '2022', 'published', 200, 380),
('الأذكار اليومية', 'جمع للأذكار النبوية اليومية مع شرحها', '/placeholder.svg?height=400&width=300', '/files/adhkar.pdf', '2.1 MB', 120, (SELECT id FROM categories WHERE slug = 'fiqh-books'), '2024', 'published', 350, 520);

-- Media (Videos)
INSERT INTO media (title, description, type, url, thumbnail, duration, category_id, publish_status, views) VALUES
('محاضرة عن الإخلاص', 'محاضرة مرئية عن أهمية الإخلاص في العبادة', 'video', 'https://www.youtube.com/watch?v=example1', '/placeholder.svg?height=200&width=350', '1:15:00', (SELECT id FROM categories WHERE slug = 'lectures'), 'published', 850),
('تلاوة سورة الملك', 'تلاوة خاشعة لسورة الملك', 'audio', '/audio/surah-mulk.mp3', '/placeholder.svg?height=200&width=350', '8:30', (SELECT id FROM categories WHERE slug = 'recitations'), 'published', 620);

-- Hero Section
INSERT INTO hero_section (hadith_text, hadith_source, button_text, button_link, is_active) VALUES
('طلب العلم فريضة على كل مسلم', 'رواه ابن ماجه', 'تصفح الدروس', '/dars', true);

-- Weekly Schedule
INSERT INTO weekly_schedule (day_name, time, title, location, description, is_active, sort_order) VALUES
('السبت', 'بعد صلاة المغرب', 'شرح كتاب الطهارة', 'مسجد الرحمن', 'شرح أحكام الطهارة من كتاب بلوغ المرام', true, 1),
('الأحد', 'بعد صلاة العشاء', 'السيرة النبوية', 'مسجد الرحمن', 'دراسة السيرة النبوية الشريفة', true, 2),
('الثلاثاء', 'بعد صلاة الفجر', 'شرح كتاب التوحيد', 'مسجد الرحمن', 'شرح كتاب التوحيد للشيخ محمد بن عبدالوهاب', true, 3),
('الأربعاء', 'بعد صلاة المغرب', 'تفسير جزء عم', 'مسجد الرحمن', 'تفسير سور جزء عم', true, 4),
('الجمعة', 'بعد صلاة الجمعة', 'درس عام', 'مسجد الرحمن', 'درس عام في مختلف العلوم الشرعية', true, 5);

-- Lesson Schedule
INSERT INTO lesson_schedule (category, title, time, location, description, enabled) VALUES
('فقه', 'شرح كتاب الطهارة', 'السبت - بعد صلاة المغرب', 'مسجد الرحمن', 'شرح أحكام الطهارة من كتاب بلوغ المرام', true),
('سيرة', 'السيرة النبوية', 'الأحد - بعد صلاة العشاء', 'مسجد الرحمن', 'دراسة السيرة النبوية الشريفة', true),
('عقيدة', 'شرح كتاب التوحيد', 'الثلاثاء - بعد صلاة الفجر', 'مسجد الرحمن', 'شرح كتاب التوحيد للشيخ محمد بن عبدالوهاب', true),
('تفسير', 'تفسير جزء عم', 'الأربعاء - بعد صلاة المغرب', 'مسجد الرحمن', 'تفسير سور جزء عم', true);

-- Site Settings
INSERT INTO site_settings (key, value, type) VALUES
('site_name', 'الشيخ السيد مراد', 'text'),
('site_description', 'الموقع الرسمي للشيخ السيد مراد - خطب ودروس ومقالات وكتب إسلامية', 'text'),
('contact_email', 'contact@sheikhsayedmurad.com', 'text'),
('contact_phone', '+20123456789', 'text'),
('youtube_url', 'https://youtube.com/@sheikhsayedmurad', 'text'),
('telegram_url', 'https://t.me/sheikhsayedmurad', 'text'),
('facebook_url', 'https://facebook.com/sheikhsayedmurad', 'text'),
('twitter_url', 'https://twitter.com/sheikhsayedmurad', 'text'),
('whatsapp_url', 'https://wa.me/20123456789', 'text'),
('logo_url', '/logo.png', 'text');

-- About Page
INSERT INTO about_page (sheikh_name, sheikh_photo, biography, achievements, education, current_positions, contact_info, social_media, stats, tags) VALUES
('الشيخ السيد مراد', '/placeholder.svg?height=400&width=400', 
'الشيخ السيد مراد من علماء الأزهر الشريف، حاصل على درجة الدكتوراه في الفقه الإسلامي. له العديد من المؤلفات والدروس العلمية في مختلف العلوم الشرعية. يسعى من خلال هذا الموقع إلى نشر العلم الشرعي الصحيح وتيسيره للناس.

بدأ مسيرته العلمية في سن مبكرة حيث حفظ القرآن الكريم وهو في العاشرة من عمره، ثم التحق بالأزهر الشريف ليتدرج في مراحل التعليم حتى حصل على أعلى الدرجات العلمية.',
'- حاصل على جائزة الدولة التقديرية في العلوم الإسلامية
- ألّف أكثر من 20 كتاباً في الفقه والعقيدة
- أشرف على العديد من رسائل الماجستير والدكتوراه
- شارك في العديد من المؤتمرات الدولية',
'- دكتوراه في الفقه الإسلامي - جامعة الأزهر
- ماجستير في الشريعة الإسلامية - جامعة الأزهر
- ليسانس كلية الشريعة والقانون - جامعة الأزهر
- إجازة في القرآن الكريم بالقراءات العشر',
'- أستاذ الفقه المقارن بكلية الشريعة
- خطيب مسجد الرحمن
- عضو لجنة الفتوى بالأزهر الشريف
- مستشار شرعي لعدة مؤسسات إسلامية',
'{"email": "contact@sheikhsayedmurad.com", "phone": "+20123456789", "address": "القاهرة، مصر"}',
'{"youtube": "https://youtube.com/@sheikhsayedmurad", "telegram": "https://t.me/sheikhsayedmurad", "facebook": "https://facebook.com/sheikhsayedmurad", "twitter": "https://twitter.com/sheikhsayedmurad"}',
'{"students": "5000+", "books": "20+", "lectures": "1000+", "years": "25+"}',
ARRAY['فقه', 'عقيدة', 'تفسير', 'حديث', 'أصول الفقه']);

-- Privacy Policy
INSERT INTO privacy_policy (content) VALUES
('# سياسة الخصوصية

نحن في موقع الشيخ السيد مراد نحترم خصوصيتكم ونلتزم بحماية بياناتكم الشخصية.

## جمع البيانات
نقوم بجمع البيانات التالية:
- البريد الإلكتروني عند الاشتراك في النشرة البريدية
- معلومات التواصل عند إرسال رسالة
- بيانات التصفح لتحسين تجربة المستخدم

## استخدام البيانات
نستخدم بياناتكم فقط للأغراض التالية:
- إرسال التحديثات والمحتوى الجديد
- الرد على استفساراتكم
- تحسين خدماتنا

## حماية البيانات
نلتزم بحماية بياناتكم وعدم مشاركتها مع أي طرف ثالث.

## حقوقكم
لديكم الحق في:
- طلب الوصول إلى بياناتكم
- طلب تصحيح بياناتكم
- طلب حذف بياناتكم

آخر تحديث: ديسمبر 2024');

-- Terms and Conditions
INSERT INTO terms_conditions (content) VALUES
('# شروط الاستخدام

باستخدامك لهذا الموقع فإنك توافق على الشروط التالية:

## المحتوى
- جميع المحتويات محمية بحقوق الطبع والنشر
- يُسمح بمشاركة المحتوى مع ذكر المصدر
- لا يُسمح باستخدام المحتوى لأغراض تجارية دون إذن مسبق

## الاستخدام المقبول
- استخدام الموقع للأغراض الشخصية والتعليمية
- عدم نشر محتوى مسيء أو مخالف للشريعة
- احترام حقوق الملكية الفكرية

## التعليقات
- يجب أن تكون التعليقات محترمة وبناءة
- نحتفظ بحق حذف التعليقات غير اللائقة
- المستخدم مسؤول عن محتوى تعليقاته

## إخلاء المسؤولية
المحتوى المقدم هو للأغراض التعليمية والتوعوية، وننصح بالرجوع إلى أهل العلم في المسائل الخاصة.

آخر تحديث: ديسمبر 2024');

-- Community Pages
INSERT INTO community_pages (title, content, publish_status) VALUES
('نشاطات المجتمع', 'صفحة تعرض نشاطات المجتمع والفعاليات الدينية والاجتماعية التي يشارك فيها الشيخ.

## الفعاليات القادمة
- ملتقى العلم الشرعي السنوي
- دورة تحفيظ القرآن الكريم
- محاضرات رمضان

## النشاطات الدورية
- حلقات تحفيظ القرآن
- دروس أسبوعية في المسجد
- استشارات شرعية', 'published');

-- Dawah Projects
INSERT INTO dawah_projects (title, description, publish_status) VALUES
('مشروع تحفيظ القرآن', 'مشروع لتحفيظ القرآن الكريم للأطفال والشباب في المسجد. يهدف المشروع إلى تخريج حفاظ متقنين للقرآن الكريم مع فهم معانيه وتطبيق أحكامه.', 'published'),
('مشروع إفطار صائم', 'مشروع سنوي لإفطار الصائمين في شهر رمضان المبارك. نقدم وجبات إفطار يومية للمحتاجين والمسافرين.', 'published'),
('مشروع كفالة طالب علم', 'مشروع لدعم طلاب العلم الشرعي ومساعدتهم على إكمال دراستهم. يشمل الدعم المادي والتعليمي.', 'published');

-- SEO Settings
INSERT INTO seo_settings (page_path, page_title, meta_description, meta_keywords, og_title, og_description) VALUES
('/', 'الشيخ السيد مراد - الموقع الرسمي', 'الموقع الرسمي للشيخ السيد مراد - خطب ودروس ومقالات وكتب إسلامية', 'شيخ, إسلام, خطب, دروس, مقالات, كتب, فقه, عقيدة', 'الشيخ السيد مراد - الموقع الرسمي', 'الموقع الرسمي للشيخ السيد مراد'),
('/khutba', 'الخطب - الشيخ السيد مراد', 'استمع إلى خطب الجمعة للشيخ السيد مراد', 'خطب, جمعة, إسلام, شيخ', 'الخطب - الشيخ السيد مراد', 'استمع إلى خطب الجمعة'),
('/dars', 'الدروس العلمية - الشيخ السيد مراد', 'دروس علمية في الفقه والعقيدة والتفسير', 'دروس, فقه, عقيدة, تفسير, علم شرعي', 'الدروس العلمية', 'دروس علمية متنوعة'),
('/articles', 'المقالات - الشيخ السيد مراد', 'مقالات إسلامية متنوعة للشيخ السيد مراد', 'مقالات, إسلام, فكر إسلامي', 'المقالات', 'مقالات إسلامية متنوعة'),
('/books', 'الكتب والمؤلفات - الشيخ السيد مراد', 'تحميل كتب ومؤلفات الشيخ السيد مراد', 'كتب, مؤلفات, تحميل, PDF', 'الكتب والمؤلفات', 'كتب ومؤلفات الشيخ'),
('/videos', 'الفيديوهات - الشيخ السيد مراد', 'مشاهدة فيديوهات ومحاضرات الشيخ السيد مراد', 'فيديو, محاضرات, يوتيوب', 'الفيديوهات', 'فيديوهات ومحاضرات'),
('/about', 'نبذة عن الشيخ - الشيخ السيد مراد', 'تعرف على السيرة الذاتية للشيخ السيد مراد', 'سيرة ذاتية, نبذة, شيخ', 'نبذة عن الشيخ', 'السيرة الذاتية للشيخ'),
('/contact', 'تواصل معنا - الشيخ السيد مراد', 'تواصل مع الشيخ السيد مراد', 'تواصل, اتصال, رسالة', 'تواصل معنا', 'تواصل معنا'),
('/schedule', 'جدول الدروس - الشيخ السيد مراد', 'جدول الدروس الأسبوعية للشيخ السيد مراد', 'جدول, دروس, مواعيد', 'جدول الدروس', 'مواعيد الدروس الأسبوعية'),
('/privacy', 'سياسة الخصوصية - الشيخ السيد مراد', 'سياسة الخصوصية لموقع الشيخ السيد مراد', 'خصوصية, بيانات', 'سياسة الخصوصية', 'سياسة الخصوصية'),
('/terms', 'شروط الاستخدام - الشيخ السيد مراد', 'شروط استخدام موقع الشيخ السيد مراد', 'شروط, استخدام', 'شروط الاستخدام', 'شروط الاستخدام');

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================
SELECT 'Database setup complete! All tables created and seeded successfully.' as status;
