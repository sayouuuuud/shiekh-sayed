-- Add source tracking columns to notifications table for contact messages and subscribers
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS source_id UUID;
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS source_type TEXT;

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_notifications_source ON notifications(source_type, source_id);

-- Update notification type to support new types
-- The type column already exists, we just need to ensure it accepts our new values
-- No schema change needed as it's a text field
