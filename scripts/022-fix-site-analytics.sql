-- Drop existing table and recreate with proper constraints
DROP TABLE IF EXISTS site_analytics CASCADE;

-- Create site_analytics table with unique constraint on date
CREATE TABLE site_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  views_count INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT site_analytics_date_unique UNIQUE (date)
);

-- Enable RLS
ALTER TABLE site_analytics ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access to site_analytics"
  ON site_analytics FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert/update
CREATE POLICY "Allow authenticated insert to site_analytics"
  ON site_analytics FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update to site_analytics"
  ON site_analytics FOR UPDATE
  TO authenticated
  USING (true);

-- Insert sample data for the last 30 days
INSERT INTO site_analytics (date, views_count, unique_visitors)
SELECT 
  (CURRENT_DATE - (n || ' days')::INTERVAL)::DATE,
  FLOOR(RANDOM() * 500 + 100)::INTEGER,
  FLOOR(RANDOM() * 200 + 50)::INTEGER
FROM generate_series(0, 29) AS n;
