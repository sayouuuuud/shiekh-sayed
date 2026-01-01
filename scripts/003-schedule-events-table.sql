-- Create schedule_events table for calendar-based events
CREATE TABLE IF NOT EXISTS schedule_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL CHECK (event_type IN ('fiqh', 'seerah', 'friday', 'aqeedah', 'general')),
  event_date DATE NOT NULL,
  event_time TIME,
  location TEXT,
  is_live BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add lesson_type to lessons table if not exists
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS lesson_type TEXT CHECK (lesson_type IN ('fiqh', 'seerah', 'general'));
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS is_archived BOOLEAN DEFAULT false;
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_schedule_events_date ON schedule_events(event_date);
CREATE INDEX IF NOT EXISTS idx_schedule_events_type ON schedule_events(event_type);
CREATE INDEX IF NOT EXISTS idx_lessons_type ON lessons(lesson_type, publish_status, is_active);
