-- Add category_id to sermons if not exists
ALTER TABLE sermons ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id) ON DELETE SET NULL;

-- Add category_id to lessons if not exists  
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id) ON DELETE SET NULL;

-- Add category_id to articles if not exists
ALTER TABLE articles ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id) ON DELETE SET NULL;

-- Add category_id to books if not exists
ALTER TABLE books ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id) ON DELETE SET NULL;

-- Add category_id to media/videos if not exists
ALTER TABLE media ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id) ON DELETE SET NULL;

-- Add lesson_type to lessons if not exists
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS lesson_type VARCHAR(50) DEFAULT 'general';

-- Add is_active to media if not exists
ALTER TABLE media ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_sermons_category ON sermons(category_id);
CREATE INDEX IF NOT EXISTS idx_lessons_category ON lessons(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_books_category ON books(category_id);
CREATE INDEX IF NOT EXISTS idx_media_category ON media(category_id);
CREATE INDEX IF NOT EXISTS idx_lessons_type ON lessons(lesson_type);
