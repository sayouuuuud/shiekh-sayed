-- ============================================
-- Fix missing tables and columns
-- ============================================

-- 1. Add is_active column to media if missing
ALTER TABLE media ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- 2. Add slug and content_type to categories if missing
ALTER TABLE categories ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS content_type TEXT;

-- 3. Create community_posts table
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

-- Public can insert
CREATE POLICY "Public can submit community posts" ON community_posts
    FOR INSERT WITH CHECK (true);

-- Public can read approved posts
CREATE POLICY "Public can read approved community posts" ON community_posts
    FOR SELECT USING (is_approved = true);

-- Admins have full access
CREATE POLICY "Admins have full access to community posts" ON community_posts
    FOR ALL USING (auth.role() = 'authenticated');

-- 4. Create social_links table
CREATE TABLE IF NOT EXISTS social_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    platform TEXT NOT NULL,
    url TEXT NOT NULL,
    icon TEXT,
    is_active BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read social links" ON social_links
    FOR SELECT USING (true);

CREATE POLICY "Admins have full access to social links" ON social_links
    FOR ALL USING (auth.role() = 'authenticated');

-- 5. Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    message TEXT,
    type TEXT DEFAULT 'info',
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read notifications" ON notifications
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to notifications" ON notifications
    FOR ALL USING (auth.role() = 'authenticated');

-- 6. Update subscribers table for WhatsApp/Telegram
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS telegram TEXT;
ALTER TABLE subscribers ALTER COLUMN email DROP NOT NULL;

-- 7. Add quote field to about_page
ALTER TABLE about_page ADD COLUMN IF NOT EXISTS quote TEXT;
ALTER TABLE about_page ADD COLUMN IF NOT EXISTS quote_author TEXT DEFAULT 'من أقوال الشيخ';

-- 8. Create contact_fields table for customizable contact form
CREATE TABLE IF NOT EXISTS contact_fields (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    field_name TEXT NOT NULL,
    field_label TEXT NOT NULL,
    field_type TEXT DEFAULT 'text',
    is_required BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE contact_fields ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read contact fields" ON contact_fields
    FOR SELECT USING (is_active = true);

CREATE POLICY "Admins have full access to contact fields" ON contact_fields
    FOR ALL USING (auth.role() = 'authenticated');
