-- Create contact_fields table for customizable form fields
CREATE TABLE IF NOT EXISTS contact_fields (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  label TEXT NOT NULL,
  is_required BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Insert default fields
INSERT INTO contact_fields (id, name, label, is_required, is_active) VALUES
  ('1', 'name', 'الاسم', true, true),
  ('2', 'email', 'البريد الإلكتروني', true, true),
  ('3', 'phone', 'رقم الهاتف', false, true),
  ('4', 'subject', 'الموضوع', false, false),
  ('5', 'message', 'الرسالة', true, true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE contact_fields ENABLE ROW LEVEL SECURITY;

-- Admin full access
CREATE POLICY "Admin full access to contact_fields" ON contact_fields FOR ALL USING (true);
