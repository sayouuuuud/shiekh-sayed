-- Create site_analytics table if not exists
CREATE TABLE IF NOT EXISTS site_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL UNIQUE,
  views_count integer DEFAULT 0,
  unique_visitors integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Add index for date queries
CREATE INDEX IF NOT EXISTS idx_site_analytics_date ON site_analytics(date);
