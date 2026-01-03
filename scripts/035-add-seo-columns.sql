-- Add new SEO columns to seo_settings table
ALTER TABLE seo_settings
ADD COLUMN IF NOT EXISTS canonical_url TEXT,
ADD COLUMN IF NOT EXISTS priority DECIMAL(2,1) DEFAULT 0.5;

-- Add new settings to site_settings
INSERT INTO site_settings (key, value, updated_at)
VALUES 
  ('google_analytics_id', '', NOW()),
  ('facebook_pixel_id', '', NOW()),
  ('twitter_handle', '', NOW()),
  ('canonical_url', '', NOW()),
  ('structured_data', '', NOW()),
  ('sitemap_enabled', 'true', NOW()),
  ('auto_generate_meta', 'true', NOW())
ON CONFLICT (key) DO NOTHING;
