-- Add new columns to hero_section table for important notice feature
ALTER TABLE hero_section ADD COLUMN IF NOT EXISTS important_notice text;
ALTER TABLE hero_section ADD COLUMN IF NOT EXISTS important_notice_link text;
ALTER TABLE hero_section ADD COLUMN IF NOT EXISTS show_important_notice boolean DEFAULT false;
