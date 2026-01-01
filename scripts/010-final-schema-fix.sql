-- Final comprehensive schema fix
-- This script ensures all tables exist with correct columns

-- Drop and recreate site_settings with all required columns
DROP TABLE IF EXISTS site_settings CASCADE;

CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name TEXT DEFAULT 'موقع الشيخ السيد مراد',
  site_description TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  address TEXT,
  social_facebook TEXT,
  social_twitter TEXT,
  social_youtube TEXT,
  social_telegram TEXT,
  social_instagram TEXT,
  maintenance_mode BOOLEAN DEFAULT false,
  allow_comments BOOLEAN DEFAULT true,
  allow_subscriptions BOOLEAN DEFAULT true,
  meta_keywords TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Drop and recreate hero_settings
DROP TABLE IF EXISTS hero_settings CASCADE;

CREATE TABLE hero_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT DEFAULT 'الشيخ السيد مراد',
  subtitle TEXT DEFAULT 'داعية إسلامي وعالم شرعي',
  description TEXT,
  background_image TEXT,
  show_subscribe_button BOOLEAN DEFAULT true,
  show_schedule_button BOOLEAN DEFAULT true,
  subscribe_button_text TEXT DEFAULT 'اشترك الآن',
  schedule_button_text TEXT DEFAULT 'جدول الدروس',
  notice_text TEXT,
  notice_active BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Drop and recreate about_page
DROP TABLE IF EXISTS about_page CASCADE;

CREATE TABLE about_page (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT DEFAULT 'من نحن',
  content TEXT,
  sheikh_name TEXT DEFAULT 'الشيخ السيد مراد',
  sheikh_title TEXT DEFAULT 'داعية إسلامي',
  sheikh_bio TEXT,
  sheikh_image TEXT,
  achievements TEXT,
  vision TEXT,
  mission TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Drop and recreate admin_profile
DROP TABLE IF EXISTS admin_profile CASCADE;

CREATE TABLE admin_profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT DEFAULT 'المدير',
  email TEXT,
  phone TEXT,
  bio TEXT,
  avatar TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Drop and recreate appearance_settings
DROP TABLE IF EXISTS appearance_settings CASCADE;

CREATE TABLE appearance_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  primary_color TEXT DEFAULT '#047857',
  secondary_color TEXT DEFAULT '#d4af37',
  font_family TEXT DEFAULT 'Cairo',
  dark_mode_enabled BOOLEAN DEFAULT true,
  rtl_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Drop and recreate site_analytics
DROP TABLE IF EXISTS site_analytics CASCADE;

CREATE TABLE site_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT NOT NULL,
  page_title TEXT,
  views_count INTEGER DEFAULT 1,
  unique_visitors INTEGER DEFAULT 1,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for analytics queries
CREATE INDEX IF NOT EXISTS idx_analytics_date ON site_analytics(date);
CREATE INDEX IF NOT EXISTS idx_analytics_path ON site_analytics(page_path);

-- Drop and recreate tags table
DROP TABLE IF EXISTS tags CASCADE;

CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT DEFAULT '#047857',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure navbar_items has correct structure
DROP TABLE IF EXISTS navbar_items CASCADE;

CREATE TABLE navbar_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure community tables exist
DROP TABLE IF EXISTS community_comments CASCADE;
DROP TABLE IF EXISTS community_posts CASCADE;

CREATE TABLE community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name TEXT NOT NULL,
  author_email TEXT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  post_type TEXT DEFAULT 'question',
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE community_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_email TEXT,
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  is_sheikh_reply BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings
INSERT INTO site_settings (site_name, site_description) 
VALUES ('موقع الشيخ السيد مراد', 'الموقع الرسمي لفضيلة الشيخ السيد مراد')
ON CONFLICT DO NOTHING;

INSERT INTO hero_settings (title, subtitle) 
VALUES ('الشيخ السيد مراد', 'داعية إسلامي وعالم شرعي')
ON CONFLICT DO NOTHING;

INSERT INTO about_page (title, sheikh_name) 
VALUES ('من نحن', 'الشيخ السيد مراد')
ON CONFLICT DO NOTHING;

INSERT INTO admin_profile (name, email) 
VALUES ('المدير', 'admin@example.com')
ON CONFLICT DO NOTHING;

INSERT INTO appearance_settings (primary_color, secondary_color) 
VALUES ('#047857', '#d4af37')
ON CONFLICT DO NOTHING;

-- Insert default navbar items
INSERT INTO navbar_items (label, href, order_index, is_active) VALUES
('الرئيسية', '/', 0, true),
('الخطب', '/khutba', 1, true),
('الدروس', '/dars', 2, true),
('المقالات', '/articles', 3, true),
('الكتب', '/books', 4, true),
('المرئيات', '/videos', 5, true),
('الجدول', '/schedule', 6, true),
('تواصل معنا', '/contact', 7, true)
ON CONFLICT DO NOTHING;

-- Disable RLS on all new tables
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE hero_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE about_page DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profile DISABLE ROW LEVEL SECURITY;
ALTER TABLE appearance_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE site_analytics DISABLE ROW LEVEL SECURITY;
ALTER TABLE tags DISABLE ROW LEVEL SECURITY;
ALTER TABLE navbar_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE community_comments DISABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT ALL ON site_settings TO anon, authenticated;
GRANT ALL ON hero_settings TO anon, authenticated;
GRANT ALL ON about_page TO anon, authenticated;
GRANT ALL ON admin_profile TO anon, authenticated;
GRANT ALL ON appearance_settings TO anon, authenticated;
GRANT ALL ON site_analytics TO anon, authenticated;
GRANT ALL ON tags TO anon, authenticated;
GRANT ALL ON navbar_items TO anon, authenticated;
GRANT ALL ON community_posts TO anon, authenticated;
GRANT ALL ON community_comments TO anon, authenticated;
