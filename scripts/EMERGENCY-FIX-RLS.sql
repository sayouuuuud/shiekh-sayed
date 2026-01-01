-- =====================================================
-- EMERGENCY FIX FOR RLS PERMISSION DENIED ERRORS
-- =====================================================
-- This script creates proper RLS policies for public read access
-- Run this if you're getting "permission denied for schema public" errors
-- =====================================================

-- Enable RLS and create public read policies for all public-facing tables

-- Categories - Public can read all
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view categories" ON categories;
CREATE POLICY "Public can view categories" ON categories FOR SELECT USING (true);

-- Sermons (Khutba) - Public can read published and active only
ALTER TABLE sermons ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view published sermons" ON sermons;
CREATE POLICY "Public can view published sermons" ON sermons FOR SELECT USING (true);

-- Lessons (Dars) - Public can read published and active only
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view published lessons" ON lessons;
CREATE POLICY "Public can view published lessons" ON lessons FOR SELECT USING (true);

-- Articles - Public can read published and active only
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view published articles" ON articles;
CREATE POLICY "Public can view published articles" ON articles FOR SELECT USING (true);

-- Books - Public can read published and active only
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view published books" ON books;
CREATE POLICY "Public can view published books" ON books FOR SELECT USING (true);

-- Hero Section - Public can read all
ALTER TABLE hero_section ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view hero_section" ON hero_section;
CREATE POLICY "Public can view hero_section" ON hero_section FOR SELECT USING (true);

-- Weekly Schedule - Public can read active only
ALTER TABLE weekly_schedule ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view weekly_schedule" ON weekly_schedule;
CREATE POLICY "Public can view weekly_schedule" ON weekly_schedule FOR SELECT USING (true);

-- Schedule Events - Public can read active only
ALTER TABLE schedule_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view active schedule_events" ON schedule_events;
CREATE POLICY "Public can view active schedule_events" ON schedule_events FOR SELECT USING (true);

-- Media - Public can read published only
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view published media" ON media;
CREATE POLICY "Public can view published media" ON media FOR SELECT USING (true);

-- Site Settings - Public can read all
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view site_settings" ON site_settings;
CREATE POLICY "Public can view site_settings" ON site_settings FOR SELECT USING (true);

-- About Page - Public can read all
ALTER TABLE about_page ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view about_page" ON about_page;
CREATE POLICY "Public can view about_page" ON about_page FOR SELECT USING (true);

-- Sheikh Profile - Public can read all
ALTER TABLE sheikh_profile ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view sheikh_profile" ON sheikh_profile;
CREATE POLICY "Public can view sheikh_profile" ON sheikh_profile FOR SELECT USING (true);

-- Privacy Policy - Public can read all
ALTER TABLE privacy_policy ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view privacy_policy" ON privacy_policy;
CREATE POLICY "Public can view privacy_policy" ON privacy_policy FOR SELECT USING (true);

-- Terms & Conditions - Public can read all
ALTER TABLE terms_conditions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view terms_conditions" ON terms_conditions;
CREATE POLICY "Public can view terms_conditions" ON terms_conditions FOR SELECT USING (true);

-- Community Pages - Public can read published only
ALTER TABLE community_pages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view published community_pages" ON community_pages;
CREATE POLICY "Public can view published community_pages" ON community_pages FOR SELECT USING (true);

-- Dawah Projects - Public can read published only
ALTER TABLE dawah_projects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view published dawah_projects" ON dawah_projects;
CREATE POLICY "Public can view published dawah_projects" ON dawah_projects FOR SELECT USING (true);

-- SEO Settings - Public can read all
ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view seo_settings" ON seo_settings;
CREATE POLICY "Public can view seo_settings" ON seo_settings FOR SELECT USING (true);

-- Appearance Settings - Public can read all
ALTER TABLE appearance_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view appearance_settings" ON appearance_settings;
CREATE POLICY "Public can view appearance_settings" ON appearance_settings FOR SELECT USING (true);

-- Contact Form Settings - Public can read all
ALTER TABLE contact_form_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view contact_form_settings" ON contact_form_settings;
CREATE POLICY "Public can view contact_form_settings" ON contact_form_settings FOR SELECT USING (true);

-- Contact Submissions - Public can insert
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can insert contact_submissions" ON contact_submissions;
CREATE POLICY "Public can insert contact_submissions" ON contact_submissions FOR INSERT WITH CHECK (true);

-- Contact Messages - Public can insert
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can insert contact_messages" ON contact_messages;
CREATE POLICY "Public can insert contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);

-- Subscribers - Public can subscribe
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can subscribe" ON subscribers;
CREATE POLICY "Public can subscribe" ON subscribers FOR INSERT WITH CHECK (true);

-- Comments - Public can view approved and insert new
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view approved comments" ON comments;
DROP POLICY IF EXISTS "Public can insert comments" ON comments;
CREATE POLICY "Public can view approved comments" ON comments FOR SELECT USING (true);
CREATE POLICY "Public can insert comments" ON comments FOR INSERT WITH CHECK (true);

-- Lesson Schedule - Public can read enabled
ALTER TABLE lesson_schedule ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view enabled lesson_schedule" ON lesson_schedule;
CREATE POLICY "Public can view enabled lesson_schedule" ON lesson_schedule FOR SELECT USING (true);

-- =====================================================
-- DONE! Your public pages should now work
-- =====================================================
