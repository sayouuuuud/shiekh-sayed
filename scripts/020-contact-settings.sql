-- Create contact_settings table for editable contact page content
CREATE TABLE IF NOT EXISTS contact_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  important_notice TEXT DEFAULT 'هذا النموذج مخصص للتواصل العام والاقتراحات التقنية. لا يقدم الموقع فتاوى شرعية ولا يتم الرد على الأسئلة الفقهية عبر هذا النموذج.',
  email VARCHAR(255) DEFAULT 'contact@alsayedmourad.com',
  facebook_url VARCHAR(255) DEFAULT '#',
  youtube_url VARCHAR(255) DEFAULT '#',
  telegram_url VARCHAR(255) DEFAULT '#',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default row if table is empty
INSERT INTO contact_settings (important_notice, email)
SELECT 
  'هذا النموذج مخصص للتواصل العام والاقتراحات التقنية. لا يقدم الموقع فتاوى شرعية ولا يتم الرد على الأسئلة الفقهية عبر هذا النموذج.',
  'contact@alsayedmourad.com'
WHERE NOT EXISTS (SELECT 1 FROM contact_settings);

-- Enable RLS
ALTER TABLE contact_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on contact_settings" ON contact_settings
  FOR SELECT USING (true);

-- Allow authenticated users to update
CREATE POLICY "Allow authenticated update on contact_settings" ON contact_settings
  FOR UPDATE USING (true);

-- Allow authenticated users to insert
CREATE POLICY "Allow authenticated insert on contact_settings" ON contact_settings
  FOR INSERT WITH CHECK (true);
