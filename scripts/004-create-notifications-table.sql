-- Create notifications table if not exists
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error', 'contact', 'subscriber')),
  is_read BOOLEAN DEFAULT false,
  source_id UUID,
  source_type VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_source ON notifications(source_id, source_type);

-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Allow authenticated read notifications" ON notifications;
CREATE POLICY "Allow authenticated read notifications" ON notifications FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated insert notifications" ON notifications;
CREATE POLICY "Allow authenticated insert notifications" ON notifications FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated update notifications" ON notifications;
CREATE POLICY "Allow authenticated update notifications" ON notifications FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow authenticated delete notifications" ON notifications;
CREATE POLICY "Allow authenticated delete notifications" ON notifications FOR DELETE USING (true);
