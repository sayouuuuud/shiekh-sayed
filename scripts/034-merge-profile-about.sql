-- Add social_links column to about_page table
ALTER TABLE about_page ADD COLUMN IF NOT EXISTS social_links JSONB DEFAULT '[]'::jsonb;

-- Update existing data to have empty array if null
UPDATE about_page SET social_links = '[]'::jsonb WHERE social_links IS NULL;
