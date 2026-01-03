-- Create appearance_settings table if not exists
CREATE TABLE IF NOT EXISTS appearance_settings (
  id UUID DEFAULT '00000000-0000-0000-0000-000000000001' PRIMARY KEY,
  primary_color VARCHAR(20) DEFAULT '#1e4338',
  secondary_color VARCHAR(20) DEFAULT '#d4af37',
  dark_mode_enabled BOOLEAN DEFAULT true,
  show_hijri_date BOOLEAN DEFAULT true,
  site_logo_path TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings if not exists
INSERT INTO appearance_settings (id, primary_color, secondary_color, dark_mode_enabled, show_hijri_date)
VALUES ('00000000-0000-0000-0000-000000000001', '#1e4338', '#d4af37', true, true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE appearance_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Allow public read appearance_settings" ON appearance_settings;
CREATE POLICY "Allow public read appearance_settings" ON appearance_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated update appearance_settings" ON appearance_settings;
CREATE POLICY "Allow authenticated update appearance_settings" ON appearance_settings FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow authenticated insert appearance_settings" ON appearance_settings;
CREATE POLICY "Allow authenticated insert appearance_settings" ON appearance_settings FOR INSERT WITH CHECK (true);
