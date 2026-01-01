-- ==============================================================
-- سكريبت إصلاح شامل لجميع المشاكل
-- ==============================================================

-- 1. جدول إعدادات المظهر
DROP TABLE IF EXISTS appearance_settings CASCADE;
CREATE TABLE appearance_settings (
  id UUID PRIMARY KEY DEFAULT 'a0000000-0000-0000-0000-000000000001'::uuid,
  primary_color VARCHAR(20) DEFAULT '#1e4338',
  secondary_color VARCHAR(20) DEFAULT '#d4af37',
  dark_mode_enabled BOOLEAN DEFAULT true,
  show_hijri_date BOOLEAN DEFAULT true,
  site_logo_path TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO appearance_settings (id, primary_color, secondary_color, dark_mode_enabled, show_hijri_date)
VALUES ('a0000000-0000-0000-0000-000000000001'::uuid, '#1e4338', '#d4af37', true, true)
ON CONFLICT (id) DO NOTHING;

-- 2. جدول Hero Section
DROP TABLE IF EXISTS hero_section CASCADE;
CREATE TABLE hero_section (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hadith_arabic TEXT DEFAULT 'إنما الأعمال بالنيات',
  hadith_translation TEXT DEFAULT 'رواه البخاري ومسلم',
  hadith_explanation TEXT DEFAULT '',
  hadith_button_text VARCHAR(100) DEFAULT 'اقرأ المزيد',
  hadith_button_link VARCHAR(255) DEFAULT '/articles',
  book_custom_text VARCHAR(255) DEFAULT 'أحدث إصدارات الشيخ',
  book_button_text VARCHAR(100) DEFAULT 'تصفح الكتب',
  book_button_link VARCHAR(255) DEFAULT '/books',
  featured_book_id UUID,
  important_notice TEXT DEFAULT '',
  important_notice_link VARCHAR(255) DEFAULT '',
  show_important_notice BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO hero_section (hadith_arabic, hadith_translation, show_important_notice)
VALUES ('إنما الأعمال بالنيات وإنما لكل امرئ ما نوى', 'رواه البخاري ومسلم', false);

-- 3. جدول الملف الشخصي للشيخ
DROP TABLE IF EXISTS sheikh_profile CASCADE;
CREATE TABLE sheikh_profile (
  id UUID PRIMARY KEY DEFAULT 'b0000000-0000-0000-0000-000000000001'::uuid,
  name VARCHAR(255) DEFAULT 'الشيخ السيد مراد',
  title VARCHAR(255) DEFAULT 'عالم أزهري ومفكر تربوي',
  bio TEXT DEFAULT '',
  photo_path TEXT DEFAULT '',
  education TEXT DEFAULT '',
  achievements TEXT DEFAULT '',
  current_positions TEXT DEFAULT '',
  tags JSONB DEFAULT '[]',
  social_media JSONB DEFAULT '{}',
  stats JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO sheikh_profile (id, name, title)
VALUES ('b0000000-0000-0000-0000-000000000001'::uuid, 'الشيخ السيد مراد', 'عالم أزهري ومفكر تربوي')
ON CONFLICT (id) DO NOTHING;

-- 4. جدول عناصر القائمة العلوية
DROP TABLE IF EXISTS navbar_items CASCADE;
CREATE TABLE navbar_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label VARCHAR(100) NOT NULL,
  href VARCHAR(255) NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO navbar_items (label, href, order_index, is_active) VALUES
('الرئيسية', '/', 0, true),
('الجدول', '/schedule', 1, true),
('خطب', '/khutba', 2, true),
('دروس', '/dars', 3, true),
('مقالات', '/articles', 4, true),
('كتب', '/books', 5, true),
('مرئيات', '/videos', 6, true);

-- 5. جدول الجدول الأسبوعي للصفحة الرئيسية
DROP TABLE IF EXISTS weekly_schedule CASCADE;
CREATE TABLE weekly_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day_name VARCHAR(50) NOT NULL,
  time_text VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO weekly_schedule (day_name, time_text, title, description, sort_order, is_active) VALUES
('الإثنين', '7:30 م', 'شرح منهاج الطالبين', 'درس الفقه الشافعي الأسبوعي', 0, true),
('الأربعاء', '8:00 م', 'دروس السيرة النبوية', 'وقفات تربوية مع سيرة الحبيب', 1, true),
('الجمعة', '12:00 م', 'خطبة الجمعة', 'مسجد الرحمن - مدينة نصر', 2, true);

-- 6. جدول أحداث الجدول الزمني
DROP TABLE IF EXISTS schedule_events CASCADE;
CREATE TABLE schedule_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_type VARCHAR(50) DEFAULT 'general',
  event_date DATE NOT NULL,
  event_time TIME,
  location VARCHAR(255),
  is_live BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. جدول التحليلات
DROP TABLE IF EXISTS site_analytics CASCADE;
CREATE TABLE site_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path VARCHAR(255) NOT NULL,
  views_count INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. جدول الوسوم
DROP TABLE IF EXISTS tags CASCADE;
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  color VARCHAR(20) DEFAULT '#1e4338',
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO tags (name, slug, color) VALUES
('فقه', 'fiqh', '#3b82f6'),
('سيرة', 'seerah', '#f59e0b'),
('عقيدة', 'aqeedah', '#8b5cf6'),
('تزكية', 'tazkiyah', '#10b981'),
('تفسير', 'tafseer', '#ec4899');

-- 9. تحديث جدول الدروس لإضافة الأعمدة المفقودة
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS thumbnail_path TEXT;
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS duration VARCHAR(20);
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS views_count INTEGER DEFAULT 0;
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS is_archived BOOLEAN DEFAULT false;
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS type VARCHAR(20) DEFAULT 'audio';

-- 10. تحديث جدول المقالات
ALTER TABLE articles ADD COLUMN IF NOT EXISTS featured_image TEXT;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS views_count INTEGER DEFAULT 0;

-- 11. تحديث جدول الكتب
ALTER TABLE books ADD COLUMN IF NOT EXISTS author VARCHAR(255);
ALTER TABLE books ADD COLUMN IF NOT EXISTS pdf_path TEXT;

-- 12. تعطيل RLS ومنح الصلاحيات
ALTER TABLE appearance_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE hero_section DISABLE ROW LEVEL SECURITY;
ALTER TABLE sheikh_profile DISABLE ROW LEVEL SECURITY;
ALTER TABLE navbar_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_schedule DISABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_events DISABLE ROW LEVEL SECURITY;
ALTER TABLE site_analytics DISABLE ROW LEVEL SECURITY;
ALTER TABLE tags DISABLE ROW LEVEL SECURITY;

-- منح الصلاحيات
GRANT ALL ON appearance_settings TO anon, authenticated;
GRANT ALL ON hero_section TO anon, authenticated;
GRANT ALL ON sheikh_profile TO anon, authenticated;
GRANT ALL ON navbar_items TO anon, authenticated;
GRANT ALL ON weekly_schedule TO anon, authenticated;
GRANT ALL ON schedule_events TO anon, authenticated;
GRANT ALL ON site_analytics TO anon, authenticated;
GRANT ALL ON tags TO anon, authenticated;

-- سياسات للجداول
DO $$
BEGIN
  -- appearance_settings
  DROP POLICY IF EXISTS "Allow all appearance_settings" ON appearance_settings;
  CREATE POLICY "Allow all appearance_settings" ON appearance_settings FOR ALL USING (true) WITH CHECK (true);
  
  -- hero_section
  DROP POLICY IF EXISTS "Allow all hero_section" ON hero_section;
  CREATE POLICY "Allow all hero_section" ON hero_section FOR ALL USING (true) WITH CHECK (true);
  
  -- sheikh_profile
  DROP POLICY IF EXISTS "Allow all sheikh_profile" ON sheikh_profile;
  CREATE POLICY "Allow all sheikh_profile" ON sheikh_profile FOR ALL USING (true) WITH CHECK (true);
  
  -- navbar_items
  DROP POLICY IF EXISTS "Allow all navbar_items" ON navbar_items;
  CREATE POLICY "Allow all navbar_items" ON navbar_items FOR ALL USING (true) WITH CHECK (true);
  
  -- weekly_schedule
  DROP POLICY IF EXISTS "Allow all weekly_schedule" ON weekly_schedule;
  CREATE POLICY "Allow all weekly_schedule" ON weekly_schedule FOR ALL USING (true) WITH CHECK (true);
  
  -- schedule_events
  DROP POLICY IF EXISTS "Allow all schedule_events" ON schedule_events;
  CREATE POLICY "Allow all schedule_events" ON schedule_events FOR ALL USING (true) WITH CHECK (true);
  
  -- tags
  DROP POLICY IF EXISTS "Allow all tags" ON tags;
  CREATE POLICY "Allow all tags" ON tags FOR ALL USING (true) WITH CHECK (true);
END $$;
