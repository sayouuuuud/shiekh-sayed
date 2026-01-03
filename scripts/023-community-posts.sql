-- Create community_posts table for community page
CREATE TABLE IF NOT EXISTS community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;

-- Allow public read for approved posts
CREATE POLICY "Allow public read approved posts" ON community_posts
  FOR SELECT USING (is_approved = true);

-- Allow public insert for submissions
CREATE POLICY "Allow public insert" ON community_posts
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to manage all posts
CREATE POLICY "Allow authenticated users full access" ON community_posts
  FOR ALL USING (auth.role() = 'authenticated');
