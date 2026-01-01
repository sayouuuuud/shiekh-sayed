-- Section 4: Add lesson_type to lessons table
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS lesson_type TEXT CHECK (lesson_type IN ('fiqh', 'seerah', 'general'));
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS is_archived BOOLEAN DEFAULT false;

-- Section 6: Add hadith_styled_words to hero_section
ALTER TABLE hero_section ADD COLUMN IF NOT EXISTS hadith_styled_words JSONB;

-- Section 7: Create navbar_items table
CREATE TABLE IF NOT EXISTS navbar_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  parent_id UUID REFERENCES navbar_items(id) ON DELETE CASCADE,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default navbar items
INSERT INTO navbar_items (label, href, display_order, is_active) VALUES
('الرئيسية', '/', 1, true),
('الخطب', '/khutba', 2, true),
('الدروس', '/dars', 3, true),
('المقالات', '/articles', 4, true),
('الكتب', '/books', 5, true),
('المرئيات', '/videos', 6, true),
('من نحن', '/about', 7, true),
('تواصل معنا', '/contact', 8, true)
ON CONFLICT DO NOTHING;

-- Section 12: Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT CHECK (type IN ('info', 'success', 'warning', 'error')) DEFAULT 'info',
  is_read BOOLEAN DEFAULT false,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Section 13: Add parent_category_id to categories
ALTER TABLE categories ADD COLUMN IF NOT EXISTS parent_category_id UUID REFERENCES categories(id) ON DELETE SET NULL;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS description TEXT;

-- Section 17: Create appearance_settings table
CREATE TABLE IF NOT EXISTS appearance_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  primary_color TEXT DEFAULT '#1c5b45',
  secondary_color TEXT DEFAULT '#d4a04c',
  show_hijri_date BOOLEAN DEFAULT true,
  site_logo_path TEXT DEFAULT '/images/logo.png',
  site_favicon_path TEXT DEFAULT '/images/favicon.ico',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default appearance settings
INSERT INTO appearance_settings (id, primary_color, secondary_color, show_hijri_date)
VALUES ('00000000-0000-0000-0000-000000000001', '#1c5b45', '#d4a04c', true)
ON CONFLICT DO NOTHING;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_navbar_items_parent_id ON navbar_items(parent_id);
CREATE INDEX IF NOT EXISTS idx_navbar_items_display_order ON navbar_items(display_order);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_categories_parent_category_id ON categories(parent_category_id);
CREATE INDEX IF NOT EXISTS idx_lessons_lesson_type ON lessons(lesson_type);
CREATE INDEX IF NOT EXISTS idx_lessons_is_archived ON lessons(is_archived);
