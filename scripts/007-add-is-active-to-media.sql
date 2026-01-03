-- Add is_active column to media table if not exists
ALTER TABLE media ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Update existing rows to have is_active = true
UPDATE media SET is_active = true WHERE is_active IS NULL;
