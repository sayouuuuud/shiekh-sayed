-- =====================================================
-- UPDATE ABOUT PAGE SCHEMA
-- =====================================================

-- Add missing columns to about_page if they don't exist
ALTER TABLE about_page ADD COLUMN IF NOT EXISTS sheikh_name VARCHAR(255) DEFAULT 'الشيخ السيد مراد';
ALTER TABLE about_page ADD COLUMN IF NOT EXISTS sheikh_photo TEXT;
ALTER TABLE about_page ADD COLUMN IF NOT EXISTS biography TEXT;
ALTER TABLE about_page ADD COLUMN IF NOT EXISTS achievements TEXT;
ALTER TABLE about_page ADD COLUMN IF NOT EXISTS education TEXT;
ALTER TABLE about_page ADD COLUMN IF NOT EXISTS current_positions TEXT;
ALTER TABLE about_page ADD COLUMN IF NOT EXISTS quote_text TEXT;
ALTER TABLE about_page ADD COLUMN IF NOT EXISTS quote_author VARCHAR(255) DEFAULT '- من أقوال الشيخ';
ALTER TABLE about_page ADD COLUMN IF NOT EXISTS stats JSONB DEFAULT '{"students": "5000+", "books": "20+", "lectures": "1000+", "years": "25+"}';
ALTER TABLE about_page ADD COLUMN IF NOT EXISTS social_links JSONB DEFAULT '[]';

-- Update default record
UPDATE about_page SET
  sheikh_name = COALESCE(sheikh_name, 'الشيخ السيد مراد'),
  quote_author = COALESCE(quote_author, '- من أقوال الشيخ'),
  stats = COALESCE(stats, '{"students": "5000+", "books": "20+", "lectures": "1000+", "years": "25+"}'),
  social_links = COALESCE(social_links, '[]')
WHERE id = '00000000-0000-0000-0000-000000000001';

SELECT 'About page schema updated!' as message;
