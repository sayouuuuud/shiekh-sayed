-- =====================================================
-- ENABLE RLS AND CREATE POLICIES
-- =====================================================

-- Enable RLS on all new tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE appearance_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_page ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (allow all operations for public access)
DROP POLICY IF EXISTS "Allow all on categories" ON categories;
CREATE POLICY "Allow all on categories" ON categories FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all on notifications" ON notifications;
CREATE POLICY "Allow all on notifications" ON notifications FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all on appearance_settings" ON appearance_settings;
CREATE POLICY "Allow all on appearance_settings" ON appearance_settings FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all on subscribers" ON subscribers;
CREATE POLICY "Allow all on subscribers" ON subscribers FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all on contact_submissions" ON contact_submissions;
CREATE POLICY "Allow all on contact_submissions" ON contact_submissions FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all on analytics" ON analytics;
CREATE POLICY "Allow all on analytics" ON analytics FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all on about_page" ON about_page;
CREATE POLICY "Allow all on about_page" ON about_page FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all on site_settings" ON site_settings;
CREATE POLICY "Allow all on site_settings" ON site_settings FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all on contact_fields" ON contact_fields;
CREATE POLICY "Allow all on contact_fields" ON contact_fields FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all on seo_settings" ON seo_settings;
CREATE POLICY "Allow all on seo_settings" ON seo_settings FOR ALL USING (true) WITH CHECK (true);

SELECT 'Master Schema Fix Part 5 - RLS Enabled!' as message;
