-- Section 9: Sheikh Profile Table
CREATE TABLE IF NOT EXISTS sheikh_profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- Section 12: Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT CHECK (type IN ('info', 'success', 'warning', 'error')) DEFAULT 'info',
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Section 17: Appearance Settings Table
CREATE TABLE IF NOT EXISTS appearance_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  primary_color TEXT DEFAULT '#1c5b45',
  secondary_color TEXT DEFAULT '#d4a04c',
  show_hijri_date BOOLEAN DEFAULT true,
  site_logo_path TEXT DEFAULT '/images/logos/logo.png',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Section 18: Site Analytics Table
CREATE TABLE IF NOT EXISTS site_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL UNIQUE,
  views_count INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Section 13: Add parent_category_id to categories
ALTER TABLE categories ADD COLUMN IF NOT EXISTS parent_category_id UUID REFERENCES categories(id);
ALTER TABLE categories ADD COLUMN IF NOT EXISTS description TEXT;

-- Section 14: Add is_active to all content tables
ALTER TABLE sermons ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE books ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Section 11: Add media_source to sermons and lessons
ALTER TABLE sermons ADD COLUMN IF NOT EXISTS media_source TEXT CHECK (media_source IN ('youtube', 'local')) DEFAULT 'local';
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS media_source TEXT CHECK (media_source IN ('youtube', 'local')) DEFAULT 'local';

-- Section 15: Contact Form Settings
CREATE TABLE IF NOT EXISTS contact_form_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  form_data JSONB NOT NULL,
  is_read BOOLEAN DEFAULT false,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default appearance settings
INSERT INTO appearance_settings (id, primary_color, secondary_color, show_hijri_date, site_logo_path)
VALUES ('00000000-0000-0000-0000-000000000001', '#1c5b45', '#d4a04c', true, '/images/logos/logo.png')
ON CONFLICT (id) DO NOTHING;

-- Insert default sheikh profile
INSERT INTO sheikh_profile (id, name, title, bio)
VALUES ('00000000-0000-0000-0000-000000000001', 'الشيخ السيد مراد', 'عالم أزهري ومفكر تربوي', 'عالم أزهري ومفكر تربوي، كرس حياته لخدمة العلم والدعوة. يتميز بأسلوبه الهادئ والرزين في طرح القضايا المعاصرة.')
ON CONFLICT (id) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_sermons_published ON sermons(publish_status, is_active);
CREATE INDEX IF NOT EXISTS idx_lessons_type ON lessons(lesson_type, publish_status);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(publish_status, is_active);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(is_read, created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_date ON site_analytics(date);
