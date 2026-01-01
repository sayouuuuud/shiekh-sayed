-- Create hero_section table if not exists
CREATE TABLE IF NOT EXISTS hero_section (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hadith_arabic TEXT,
  hadith_translation TEXT,
  hadith_explanation TEXT,
  hadith_button_text TEXT DEFAULT 'اقرأ المزيد',
  hadith_button_link TEXT DEFAULT '/articles',
  book_custom_text TEXT DEFAULT 'أحدث إصدارات الشيخ',
  book_button_text TEXT DEFAULT 'تصفح الكتب',
  book_button_link TEXT DEFAULT '/books',
  featured_book_id UUID REFERENCES books(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create weekly_schedule table for home page display
CREATE TABLE IF NOT EXISTS weekly_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day_name TEXT NOT NULL,
  time_text TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default hero data if empty
INSERT INTO hero_section (
  hadith_arabic,
  hadith_translation,
  hadith_explanation,
  hadith_button_text,
  hadith_button_link
) SELECT 
  'من سلك طريقاً يلتمس فيه علماً سهل الله له به طريقاً إلى الجنة',
  'رواه مسلم',
  'حديث عظيم يبين فضل طلب العلم والسعي في تحصيله، وأن الله يسهل لطالب العلم طريقه إلى الجنة',
  'اقرأ المزيد',
  '/articles'
WHERE NOT EXISTS (SELECT 1 FROM hero_section);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_weekly_schedule_active ON weekly_schedule(is_active, sort_order);
