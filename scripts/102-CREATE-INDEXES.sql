-- =====================================================
-- CREATE INDEXES FOR BETTER PERFORMANCE
-- =====================================================

-- Categories indexes
CREATE INDEX IF NOT EXISTS idx_categories_type ON categories(type);

-- Notifications indexes
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);

-- Analytics indexes
CREATE INDEX IF NOT EXISTS idx_analytics_date ON analytics(date);
CREATE INDEX IF NOT EXISTS idx_analytics_content ON analytics(content_type, content_id);

-- Subscribers indexes
CREATE INDEX IF NOT EXISTS idx_subscribers_active ON subscribers(is_active);

SELECT 'Master Schema Fix Part 3 - Indexes Created!' as message;
