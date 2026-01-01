-- Add navbar_items table for dynamic navigation
CREATE TABLE IF NOT EXISTS navbar_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label VARCHAR(100) NOT NULL,
  href VARCHAR(255) NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add community_pages table for community content
CREATE TABLE IF NOT EXISTS community_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  publish_status VARCHAR(20) DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default navbar items
INSERT INTO navbar_items (label, href, order_index, is_active) VALUES
  ('الرئيسية', '/', 0, true),
  ('الجدول', '/schedule', 1, true),
  ('خطب', '/khutba', 2, true),
  ('دروس', '/dars', 3, true),
  ('مقالات', '/articles', 4, true),
  ('كتب', '/books', 5, true),
  ('مرئيات', '/videos', 6, true)
ON CONFLICT DO NOTHING;

-- Enable RLS
ALTER TABLE navbar_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_pages ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read navbar_items" ON navbar_items
  FOR SELECT USING (true);

CREATE POLICY "Allow public read community_pages" ON community_pages
  FOR SELECT USING (publish_status = 'published');

-- Create policies for authenticated users to manage
CREATE POLICY "Allow authenticated insert navbar_items" ON navbar_items
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update navbar_items" ON navbar_items
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated delete navbar_items" ON navbar_items
  FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert community_pages" ON community_pages
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update community_pages" ON community_pages
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated delete community_pages" ON community_pages
  FOR DELETE TO authenticated USING (true);
