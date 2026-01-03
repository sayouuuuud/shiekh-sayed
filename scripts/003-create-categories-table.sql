-- Create categories table if not exists
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('sermon', 'lesson', 'article', 'book', 'media')),
  description TEXT,
  parent_category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_categories_type ON categories(type);
CREATE INDEX IF NOT EXISTS idx_categories_parent ON categories(parent_category_id);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Allow public read categories" ON categories;
CREATE POLICY "Allow public read categories" ON categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated insert categories" ON categories;
CREATE POLICY "Allow authenticated insert categories" ON categories FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated update categories" ON categories;
CREATE POLICY "Allow authenticated update categories" ON categories FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow authenticated delete categories" ON categories;
CREATE POLICY "Allow authenticated delete categories" ON categories FOR DELETE USING (true);
