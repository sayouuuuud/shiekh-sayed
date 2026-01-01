-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('article', 'sermon', 'lesson', 'book')),
  color text DEFAULT 'blue',
  created_at timestamp with time zone DEFAULT now()
);

-- Add index for type
CREATE INDEX IF NOT EXISTS idx_tags_type ON tags(type);
