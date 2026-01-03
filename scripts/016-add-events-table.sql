-- Create unified events table with type column for weekly/one_time
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL DEFAULT 'general',
  type TEXT NOT NULL DEFAULT 'weekly' CHECK (type IN ('weekly', 'one_time')),
  day_of_week TEXT,
  event_date DATE,
  event_time TIME,
  location TEXT,
  is_live BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create notifications table for real notification system
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  message TEXT,
  type TEXT NOT NULL DEFAULT 'info',
  source TEXT,
  source_id UUID,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create community_posts table for community page submissions
CREATE TABLE IF NOT EXISTS community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_path TEXT,
  publish_status TEXT DEFAULT 'pending',
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Add WhatsApp/Telegram columns to subscribers if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'subscribers' AND column_name = 'whatsapp_number') THEN
    ALTER TABLE subscribers ADD COLUMN whatsapp_number TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'subscribers' AND column_name = 'telegram_username') THEN
    ALTER TABLE subscribers ADD COLUMN telegram_username TEXT;
  END IF;
END $$;

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;

-- Public read access for active events
CREATE POLICY "Public can read active events" ON events FOR SELECT USING (is_active = true);

-- Admin full access
CREATE POLICY "Admin full access to events" ON events FOR ALL USING (true);
CREATE POLICY "Admin full access to notifications" ON notifications FOR ALL USING (true);
CREATE POLICY "Admin full access to community_posts" ON community_posts FOR ALL USING (true);

-- Public can insert community posts
CREATE POLICY "Public can insert community posts" ON community_posts FOR INSERT WITH CHECK (true);
