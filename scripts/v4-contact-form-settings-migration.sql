-- Migration v4: Contact Form Settings Table
-- Run this script to add the contact_form_settings table

-- Create contact_form_settings table
CREATE TABLE IF NOT EXISTS contact_form_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fields JSONB NOT NULL DEFAULT '[
    {"id": "1", "name": "name", "label": "الاسم الكامل", "type": "text", "required": true},
    {"id": "2", "name": "email", "label": "البريد الإلكتروني", "type": "email", "required": true},
    {"id": "3", "name": "subject", "label": "الموضوع", "type": "select", "required": true},
    {"id": "4", "name": "message", "label": "الرسالة", "type": "textarea", "required": true}
  ]'::jsonb,
  subject_options JSONB NOT NULL DEFAULT '["استفسار عام", "طلب فتوى", "اقتراح", "شكوى", "أخرى"]'::jsonb,
  important_notice TEXT DEFAULT '',
  email_notifications BOOLEAN DEFAULT true,
  notification_email TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE contact_form_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for the contact form to read settings)
CREATE POLICY "Allow public read" ON contact_form_settings
  FOR SELECT USING (true);

-- Insert default settings if table is empty
INSERT INTO contact_form_settings (fields, subject_options, important_notice)
SELECT 
  '[{"id": "1", "name": "name", "label": "الاسم الكامل", "type": "text", "required": true}, {"id": "2", "name": "email", "label": "البريد الإلكتروني", "type": "email", "required": true}, {"id": "3", "name": "subject", "label": "الموضوع", "type": "select", "required": true}, {"id": "4", "name": "message", "label": "الرسالة", "type": "textarea", "required": true}]'::jsonb,
  '["استفسار عام", "طلب فتوى", "اقتراح", "شكوى", "أخرى"]'::jsonb,
  ''
WHERE NOT EXISTS (SELECT 1 FROM contact_form_settings);
