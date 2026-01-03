-- Add is_active column to media table if it doesn't exist
ALTER TABLE media ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Update existing records to have is_active = true
UPDATE media SET is_active = true WHERE is_active IS NULL;
