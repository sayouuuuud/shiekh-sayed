-- ============================================
-- Comprehensive Fix Migration
-- Fixes all missing tables and columns
-- ============================================

-- ============================================
-- 1. Fix Subscribers Table - Add phone/telegram columns
-- ============================================
DO $$
BEGIN
    -- Add phone column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'subscribers' AND column_name = 'phone') THEN
        ALTER TABLE subscribers ADD COLUMN phone TEXT;
    END IF;
    
    -- Add telegram column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'subscribers' AND column_name = 'telegram') THEN
        ALTER TABLE subscribers ADD COLUMN telegram TEXT;
    END IF;
    
    -- Add name column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'subscribers' AND column_name = 'name') THEN
        ALTER TABLE subscribers ADD COLUMN name TEXT;
    END IF;
    
    -- Make email nullable
    ALTER TABLE subscribers ALTER COLUMN email DROP NOT NULL;
END $$;

-- ============================================
-- 2. Create Community Posts Table
-- ============================================
CREATE TABLE IF NOT EXISTS community_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_name TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;

-- Public can read approved posts
CREATE POLICY "Public can read approved community posts" ON community_posts
    FOR SELECT USING (is_approved = true);

-- Public can insert posts (for submission)
CREATE POLICY "Public can submit community posts" ON community_posts
    FOR INSERT WITH CHECK (true);

-- Admins have full access
CREATE POLICY "Admins have full access to community posts" ON community_posts
    FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- 3. Create Weekly Schedule Table
-- ============================================
CREATE TABLE IF NOT EXISTS weekly_schedule (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    day_name TEXT NOT NULL,
    time_text TEXT,
    time TIME,
    location TEXT,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE weekly_schedule ENABLE ROW LEVEL SECURITY;

-- Public can read active items
CREATE POLICY "Public can read active weekly schedule" ON weekly_schedule
    FOR SELECT USING (is_active = true);

-- Admins have full access
CREATE POLICY "Admins have full access to weekly schedule" ON weekly_schedule
    FOR ALL USING (auth.role() = 'authenticated');

-- Insert some default schedule items
INSERT INTO weekly_schedule (title, day_name, time_text, sort_order) VALUES
    ('درس الفقه', 'السبت', 'بعد صلاة العشاء', 1),
    ('درس السيرة', 'الأربعاء', 'بعد صلاة المغرب', 2),
    ('خطبة الجمعة', 'الجمعة', '12:30 ظهراً', 3)
ON CONFLICT DO NOTHING;

-- ============================================
-- 4. Create Navbar Items Table (if not exists)
-- ============================================
CREATE TABLE IF NOT EXISTS navbar_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    label TEXT NOT NULL,
    href TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE navbar_items ENABLE ROW LEVEL SECURITY;

-- Public can read active items
CREATE POLICY "Public can read active navbar items" ON navbar_items
    FOR SELECT USING (is_active = true);

-- Admins have full access
CREATE POLICY "Admins have full access to navbar items" ON navbar_items
    FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- 5. Create Hero Section Table (if not exists)
-- ============================================
CREATE TABLE IF NOT EXISTS hero_section (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hadith_arabic TEXT,
    hadith_translation TEXT,
    hadith_explanation TEXT,
    hadith_button_text TEXT DEFAULT 'اقرأ المزيد',
    hadith_button_link TEXT DEFAULT '/articles',
    book_custom_text TEXT DEFAULT 'أحدث إصدارات الشيخ',
    book_button_text TEXT DEFAULT 'تصفح الكتب',
    book_button_link TEXT DEFAULT '/books',
    notice_text TEXT,
    notice_link TEXT,
    notice_active BOOLEAN DEFAULT false,
    important_notice TEXT,
    important_notice_link TEXT,
    show_important_notice BOOLEAN DEFAULT false,
    featured_book_id UUID REFERENCES books(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE hero_section ENABLE ROW LEVEL SECURITY;

-- Public can read
CREATE POLICY "Public can read hero section" ON hero_section
    FOR SELECT USING (true);

-- Admins have full access
CREATE POLICY "Admins have full access to hero section" ON hero_section
    FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- 6. Fix Sermons Table - Add is_active column
-- ============================================
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'sermons' AND column_name = 'is_active') THEN
        ALTER TABLE sermons ADD COLUMN is_active BOOLEAN DEFAULT true;
    END IF;
    
    -- Add media_source column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'sermons' AND column_name = 'media_source') THEN
        ALTER TABLE sermons ADD COLUMN media_source TEXT DEFAULT 'local';
    END IF;
    
    -- Add youtube_url column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'sermons' AND column_name = 'youtube_url') THEN
        ALTER TABLE sermons ADD COLUMN youtube_url TEXT;
    END IF;
    
    -- Add tags column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'sermons' AND column_name = 'tags') THEN
        ALTER TABLE sermons ADD COLUMN tags TEXT[];
    END IF;
END $$;

-- ============================================
-- 7. Fix Lessons Table - Add missing columns
-- ============================================
DO $$
BEGIN
    -- Add media_source column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'lessons' AND column_name = 'media_source') THEN
        ALTER TABLE lessons ADD COLUMN media_source TEXT DEFAULT 'local';
    END IF;
    
    -- Add media_path_or_url column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'lessons' AND column_name = 'media_path_or_url') THEN
        ALTER TABLE lessons ADD COLUMN media_path_or_url TEXT;
    END IF;
    
    -- Add transcript column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'lessons' AND column_name = 'transcript') THEN
        ALTER TABLE lessons ADD COLUMN transcript TEXT;
    END IF;
    
    -- Add tags column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'lessons' AND column_name = 'tags') THEN
        ALTER TABLE lessons ADD COLUMN tags TEXT[];
    END IF;
END $$;

-- ============================================
-- 8. Fix Media Table - Add is_active column
-- ============================================
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'media' AND column_name = 'is_active') THEN
        ALTER TABLE media ADD COLUMN is_active BOOLEAN DEFAULT true;
    END IF;
END $$;

-- ============================================
-- 9. Fix Articles Table - Add missing columns
-- ============================================
DO $$
BEGIN
    -- Add author column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'articles' AND column_name = 'author') THEN
        ALTER TABLE articles ADD COLUMN author TEXT DEFAULT 'الشيخ السيد مراد';
    END IF;
    
    -- Add thumbnail_path column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'articles' AND column_name = 'thumbnail_path') THEN
        ALTER TABLE articles ADD COLUMN thumbnail_path TEXT;
    END IF;
    
    -- Add views_count column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'articles' AND column_name = 'views_count') THEN
        ALTER TABLE articles ADD COLUMN views_count INTEGER DEFAULT 0;
    END IF;
END $$;

-- ============================================
-- 10. Create Social Links Table
-- ============================================
CREATE TABLE IF NOT EXISTS social_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    label TEXT NOT NULL,
    url TEXT NOT NULL,
    icon TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

-- Public can read active items
CREATE POLICY "Public can read active social links" ON social_links
    FOR SELECT USING (is_active = true);

-- Admins have full access
CREATE POLICY "Admins have full access to social links" ON social_links
    FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- 11. Create Notifications Table
-- ============================================
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    message TEXT,
    type TEXT DEFAULT 'info',
    is_read BOOLEAN DEFAULT false,
    link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Admins have full access
CREATE POLICY "Admins have full access to notifications" ON notifications
    FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- 12. Create Contact Fields Table
-- ============================================
CREATE TABLE IF NOT EXISTS contact_fields (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    field_name TEXT NOT NULL,
    field_label TEXT NOT NULL,
    field_type TEXT DEFAULT 'text',
    is_required BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE contact_fields ENABLE ROW LEVEL SECURITY;

-- Public can read active items
CREATE POLICY "Public can read active contact fields" ON contact_fields
    FOR SELECT USING (is_active = true);

-- Admins have full access
CREATE POLICY "Admins have full access to contact fields" ON contact_fields
    FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- Done! All tables and columns should now exist
-- ============================================
