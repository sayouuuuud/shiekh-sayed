-- Add category_id column to sermons table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'sermons' AND column_name = 'category_id'
  ) THEN
    ALTER TABLE sermons ADD COLUMN category_id UUID REFERENCES categories(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Add category_id column to lessons table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'lessons' AND column_name = 'category_id'
  ) THEN
    ALTER TABLE lessons ADD COLUMN category_id UUID REFERENCES categories(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Added slug column to all INSERT statements to satisfy NOT NULL constraint
-- Insert default categories for sermons if none exist
INSERT INTO categories (name, slug, type, description)
SELECT 'خطب الجمعة', 'friday-sermons', 'sermon', 'خطب يوم الجمعة الأسبوعية'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE type = 'sermon');

INSERT INTO categories (name, slug, type, description)
SELECT 'خطب المناسبات', 'occasion-sermons', 'sermon', 'خطب الأعياد والمناسبات الدينية'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE type = 'sermon' AND name = 'خطب المناسبات');

-- Insert default categories for lessons if none exist
INSERT INTO categories (name, slug, type, description)
SELECT 'دروس الفقه', 'fiqh-lessons', 'lesson', 'دروس في الفقه الإسلامي'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE type = 'lesson');

INSERT INTO categories (name, slug, type, description)
SELECT 'دروس السيرة', 'seerah-lessons', 'lesson', 'دروس في السيرة النبوية'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE type = 'lesson' AND name = 'دروس السيرة');

INSERT INTO categories (name, slug, type, description)
SELECT 'دروس العقيدة', 'aqeedah-lessons', 'lesson', 'دروس في العقيدة الإسلامية'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE type = 'lesson' AND name = 'دروس العقيدة');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_sermons_category_id ON sermons(category_id);
CREATE INDEX IF NOT EXISTS idx_lessons_category_id ON lessons(category_id);
