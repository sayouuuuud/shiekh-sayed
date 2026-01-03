-- =====================================================
-- INSERT DEFAULT DATA
-- =====================================================

-- Insert default appearance settings
INSERT INTO appearance_settings (id, primary_color, secondary_color, dark_mode_enabled, show_hijri_date)
VALUES ('00000000-0000-0000-0000-000000000001', '#1e4338', '#d4af37', true, true)
ON CONFLICT (id) DO NOTHING;

-- Insert default about page
INSERT INTO about_page (id, title, content, quote)
VALUES ('00000000-0000-0000-0000-000000000001', 'عن الشيخ', 'نبذة عن الشيخ السيد مراد', 'العلم نور')
ON CONFLICT (id) DO NOTHING;

-- Insert default SEO settings
INSERT INTO seo_settings (id, site_title, site_description)
VALUES ('00000000-0000-0000-0000-000000000001', 'موقع الشيخ السيد مراد', 'الموقع الرسمي للشيخ السيد مراد - دروس وخطب ومقالات')
ON CONFLICT (id) DO NOTHING;

SELECT 'Master Schema Fix Part 4 - Default Data Inserted!' as message;
