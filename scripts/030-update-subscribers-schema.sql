-- Update subscribers table to use WhatsApp and Telegram instead of email
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS whatsapp_number TEXT;
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS telegram_username TEXT;

-- Add underline_text column to hero_section
ALTER TABLE hero_section ADD COLUMN IF NOT EXISTS underline_text TEXT;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_whatsapp ON subscribers(whatsapp_number);
CREATE INDEX IF NOT EXISTS idx_subscribers_telegram ON subscribers(telegram_username);
