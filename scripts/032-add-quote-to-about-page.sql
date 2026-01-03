-- Add quote fields to about_page table
ALTER TABLE about_page ADD COLUMN IF NOT EXISTS quote_text TEXT;
ALTER TABLE about_page ADD COLUMN IF NOT EXISTS quote_author TEXT DEFAULT '- من أقوال الشيخ';
