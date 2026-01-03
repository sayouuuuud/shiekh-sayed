-- Add WhatsApp and Telegram columns to subscribers table if they don't exist
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS whatsapp_number TEXT;
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS telegram_username TEXT;
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Make email optional (can be null)
ALTER TABLE subscribers ALTER COLUMN email DROP NOT NULL;
