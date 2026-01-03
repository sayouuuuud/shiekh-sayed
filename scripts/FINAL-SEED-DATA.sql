-- =====================================================
-- موقع الشيخ السيد مراد - البيانات الأولية
-- FINAL SEED DATA
-- =====================================================
-- هذا الملف يحتوي على البيانات التجريبية للموقع
-- يمكن تشغيله بعد تشغيل FINAL-COMPLETE-SCHEMA.sql
-- =====================================================

-- =====================================================
-- 1. CATEGORIES (التصنيفات)
-- =====================================================
INSERT INTO categories (name, slug, type, description) VALUES
-- Sermon Categories
('خطب الجمعة', 'friday-sermons', 'sermon', 'خطب يوم الجمعة المباركة'),
('خطب المناسبات', 'occasion-sermons', 'sermon', 'خطب الأعياد والمناسبات الإسلامية'),
('العقيدة والإيمان', 'aqeedah-sermons', 'sermon', 'خطب في العقيدة والتوحيد'),
('الأخلاق والآداب', 'akhlaq-sermons', 'sermon', 'خطب في الأخلاق الإسلامية'),

-- Lesson Categories  
('شرح الفقه', 'fiqh-lessons', 'lesson', 'دروس في الفقه الإسلامي'),
('السيرة النبوية', 'seerah-lessons', 'lesson', 'دروس في السيرة النبوية'),
('التفسير', 'tafsir-lessons', 'lesson', 'دروس في تفسير القرآن الكريم'),
('العقيدة', 'aqeedah-lessons', 'lesson', 'دروس في العقيدة الإسلامية'),

-- Article Categories
('فقه وفتاوى', 'fiqh-articles', 'article', 'مقالات في الفقه والفتاوى'),
('تربية وتزكية', 'tarbiyah-articles', 'article', 'مقالات في التربية والتزكية'),
('دراسات قرآنية', 'quran-studies', 'article', 'مقالات في الدراسات القرآنية'),
('فكر إسلامي', 'islamic-thought', 'article', 'مقالات في الفكر الإسلامي'),

-- Book Categories
('فقه وأصوله', 'fiqh-books', 'book', 'كتب في الفقه وأصوله'),
('عقيدة', 'aqeedah-books', 'book', 'كتب في العقيدة'),
('سيرة وتاريخ', 'seerah-books', 'book', 'كتب في السيرة والتاريخ'),
('تفسير', 'tafsir-books', 'book', 'كتب في التفسير')
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- 2. HERO SECTION (قسم البطل الرئيسي)
-- =====================================================
INSERT INTO hero_section (
  id,
  hadith_arabic,
  hadith_translation,
  hadith_explanation,
  hadith_source,
  hadith_button_text,
  hadith_button_link,
  book_custom_text,
  book_button_text,
  book_button_link,
  show_important_notice,
  important_notice,
  is_active
) VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ',
  'Whoever takes a path upon which to obtain knowledge, Allah makes the path to Paradise easy for him.',
  'هذا الحديث الشريف يبين فضل طلب العلم وأنه من أعظم الطرق الموصلة إلى الجنة',
  'رواه مسلم',
  'اقرأ المزيد',
  '/articles',
  'أحدث إصدارات الشيخ',
  'تصفح الكتب',
  '/books',
  false,
  'تابعونا على قناة اليوتيوب للدروس المباشرة',
  true
) ON CONFLICT (id) DO UPDATE SET
  hadith_arabic = EXCLUDED.hadith_arabic,
  hadith_translation = EXCLUDED.hadith_translation,
  hadith_explanation = EXCLUDED.hadith_explanation,
  hadith_source = EXCLUDED.hadith_source;

-- =====================================================
-- 3. ABOUT PAGE (صفحة عن الشيخ)
-- =====================================================
INSERT INTO about_page (
  id,
  title,
  content,
  location,
  positions,
  education,
  quote,
  quote_author
) VALUES (
  'b0000000-0000-0000-0000-000000000001',
  'الشيخ السيد مراد',
  'عالم أزهري ومفكر إسلامي، تخرج من جامعة الأزهر الشريف وتفرغ لتعليم العلوم الشرعية ونشر الوسطية الإسلامية. يتميز بأسلوبه الهادئ والرزين في طرح القضايا المعاصرة من منظور إسلامي وسطي مستنير.',
  'القاهرة، مصر',
  'إمام وخطيب مسجد الرحمن بمدينة نصر، أستاذ الفقه المقارن',
  'الدكتوراه في الفقه المقارن من جامعة الأزهر، الماجستير في الفقه الإسلامي',
  'العلم نور يهدي إلى الحق، والعمل به سبيل النجاة',
  'الشيخ السيد مراد'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content;

-- =====================================================
-- 4. CONTACT SETTINGS (إعدادات التواصل)
-- =====================================================
INSERT INTO contact_settings (
  id,
  notice_text,
  email,
  youtube,
  telegram
) VALUES (
  'c0000000-0000-0000-0000-000000000001',
  'نسعد بتواصلكم معنا ونحرص على الرد على استفساراتكم في أقرب وقت',
  'contact@alsayedmourad.com',
  'https://youtube.com/@alsayedmourad',
  'https://t.me/alsayedmourad'
) ON CONFLICT (id) DO UPDATE SET
  notice_text = EXCLUDED.notice_text;

-- =====================================================
-- 5. SITE SETTINGS (إعدادات الموقع)
-- =====================================================
INSERT INTO site_settings (key, value) VALUES
('site_name', 'الشيخ السيد مراد'),
('site_description', 'الموقع الرسمي للشيخ السيد مراد - دروس وخطب ومقالات وكتب إسلامية'),
('contact_email', 'contact@alsayedmourad.com'),
('youtube_channel', 'https://youtube.com/@alsayedmourad'),
('telegram_channel', 'https://t.me/alsayedmourad')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- =====================================================
-- 6. WEEKLY SCHEDULE (الجدول الأسبوعي)
-- =====================================================
INSERT INTO weekly_schedule (day_name, time, title, location, description, is_active, sort_order) VALUES
('السبت', '19:30', 'درس الفقه', 'مسجد الرحمن - مدينة نصر', 'شرح كتاب منهاج الطالبين', true, 1),
('الأحد', '20:00', 'درس السيرة', 'مسجد الرحمن - مدينة نصر', 'دروس في السيرة النبوية', true, 2),
('الثلاثاء', '19:00', 'درس التفسير', 'مسجد الرحمن - مدينة نصر', 'تفسير القرآن الكريم', true, 3),
('الجمعة', '12:00', 'خطبة الجمعة', 'مسجد الرحمن - مدينة نصر', 'خطبة وصلاة الجمعة', true, 4)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 7. EVENTS (الأحداث)
-- =====================================================
INSERT INTO events (title, description, event_type, day_of_week, event_time, location, is_recurring, is_active) VALUES
('درس الفقه الأسبوعي', 'شرح كتاب منهاج الطالبين للإمام النووي', 'fiqh', 'السبت', '19:30:00', 'مسجد الرحمن - مدينة نصر', true, true),
('درس السيرة النبوية', 'دروس في سيرة النبي صلى الله عليه وسلم', 'seerah', 'الأحد', '20:00:00', 'مسجد الرحمن - مدينة نصر', true, true),
('درس التفسير', 'تفسير آيات من القرآن الكريم', 'tafsir', 'الثلاثاء', '19:00:00', 'مسجد الرحمن - مدينة نصر', true, true),
('خطبة الجمعة', 'خطبة وصلاة الجمعة', 'friday', 'الجمعة', '12:00:00', 'مسجد الرحمن - مدينة نصر', true, true)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 8. SOCIAL LINKS (روابط التواصل الاجتماعي)
-- =====================================================
INSERT INTO social_links (platform, url, icon, is_active, sort_order) VALUES
('youtube', 'https://youtube.com/@alsayedmourad', 'Youtube', true, 1),
('telegram', 'https://t.me/alsayedmourad', 'Send', true, 2),
('facebook', 'https://facebook.com/alsayedmourad', 'Facebook', true, 3),
('twitter', 'https://twitter.com/alsayedmourad', 'Twitter', true, 4)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 9. NAVBAR ITEMS (عناصر القائمة)
-- =====================================================
INSERT INTO navbar_items (label, href, is_active, sort_order) VALUES
('الرئيسية', '/', true, 1),
('الخطب', '/sermons', true, 2),
('الدروس', '/lessons', true, 3),
('المقالات', '/articles', true, 4),
('الكتب', '/books', true, 5),
('الجدول', '/schedule', true, 6),
('عن الشيخ', '/about', true, 7),
('تواصل معنا', '/contact', true, 8)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 10. APPEARANCE SETTINGS (إعدادات المظهر)
-- =====================================================
INSERT INTO appearance_settings (
  id,
  primary_color,
  secondary_color,
  font_family
) VALUES (
  'd0000000-0000-0000-0000-000000000001',
  '#1e4338',
  '#d4af37',
  'Cairo'
) ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 11. SAMPLE SERMONS (خطب تجريبية)
-- =====================================================
INSERT INTO sermons (title, description, content, publish_status, is_active, views_count, created_at) VALUES
(
  'التوبة والرجوع إلى الله',
  'خطبة عن فضل التوبة وأهمية الرجوع إلى الله تعالى',
  '<p>الحمد لله رب العالمين، والصلاة والسلام على أشرف المرسلين.</p><p>إن باب التوبة مفتوح لا يُغلق حتى تطلع الشمس من مغربها. قال تعالى: ﴿قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ﴾</p>',
  'published', true, 1250, NOW() - INTERVAL '2 days'
),
(
  'فضل صلة الرحم',
  'خطبة عن أهمية صلة الرحم وفضلها في الإسلام',
  '<p>قال رسول الله صلى الله عليه وسلم: "من أحب أن يُبسط له في رزقه، وأن يُنسأ له في أثره، فليصل رحمه".</p><p>صلة الرحم من أعظم أسباب البركة في العمر والرزق.</p>',
  'published', true, 980, NOW() - INTERVAL '9 days'
),
(
  'الثبات على الدين',
  'خطبة عن الثبات على الدين في زمن الفتن',
  '<p>نعيش في زمن كثرت فيه الفتن والشبهات، وأصبح المتمسك بدينه كالقابض على الجمر.</p><p>قال النبي صلى الله عليه وسلم: "يأتي على الناس زمان الصابر فيهم على دينه كالقابض على الجمر".</p>',
  'published', true, 2100, NOW() - INTERVAL '16 days'
)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 12. SAMPLE LESSONS (دروس تجريبية)
-- =====================================================
INSERT INTO lessons (title, description, content, lesson_type, duration, publish_status, is_active, views_count, created_at) VALUES
(
  'مقدمة في علم الفقه',
  'الدرس الأول في شرح أصول الفقه الإسلامي',
  '<p>نبدأ بإذن الله تعالى شرح مقدمة في علم الفقه، وهو من أهم العلوم الشرعية.</p><p>في هذا الدرس نتناول: تعريف الفقه، وأهميته، ومصادره الأساسية.</p>',
  'fiqh', '45 دقيقة', 'published', true, 890, NOW() - INTERVAL '7 days'
),
(
  'السيرة النبوية: المولد والنشأة',
  'الدرس الأول في سلسلة السيرة النبوية',
  '<p>نبدأ رحلتنا مع السيرة النبوية العطرة، من مولده الشريف في عام الفيل إلى بعثته صلى الله عليه وسلم.</p>',
  'seerah', '60 دقيقة', 'published', true, 1200, NOW() - INTERVAL '3 days'
),
(
  'تفسير سورة الفاتحة',
  'شرح وتفسير سورة الفاتحة',
  '<p>سورة الفاتحة هي أم الكتاب وأعظم سورة في القرآن الكريم. نتناول في هذا الدرس تفسيرها وفضائلها.</p>',
  'tafsir', '50 دقيقة', 'published', true, 756, NOW() - INTERVAL '14 days'
)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 13. SAMPLE ARTICLES (مقالات تجريبية)
-- =====================================================
INSERT INTO articles (title, slug, excerpt, content, author, publish_status, is_active, views_count, created_at) VALUES
(
  'الوسطية في فهم الإسلام',
  'wasatiyyah-understanding-islam',
  'الوسطية منهج قرآني أصيل يدعو إلى الاعتدال والتوازن في فهم الدين',
  '<p>الوسطية منهج قرآني أصيل، قال تعالى: ﴿وَكَذَٰلِكَ جَعَلْنَاكُمْ أُمَّةً وَسَطًا﴾.</p><p>وهي تعني الاعتدال والتوازن في فهم الدين وتطبيقه، دون إفراط أو تفريط.</p>',
  'الشيخ السيد مراد', 'published', true, 1560, NOW() - INTERVAL '5 days'
),
(
  'أحكام الصيام: أسئلة شائعة',
  'fasting-common-questions',
  'إجابات عن أكثر الأسئلة شيوعاً حول أحكام الصيام',
  '<p>يكثر السؤال عن بعض أحكام الصيام، ونجيب هنا عن أكثرها شيوعاً.</p><h3>ما حكم من أكل أو شرب ناسياً؟</h3><p>صيامه صحيح ولا قضاء عليه.</p>',
  'الشيخ السيد مراد', 'published', true, 2340, NOW() - INTERVAL '12 days'
),
(
  'تربية الأبناء في ضوء السنة',
  'raising-children-sunnah',
  'منهج النبي صلى الله عليه وسلم في تربية الأبناء',
  '<p>النبي صلى الله عليه وسلم هو المربي الأول والقدوة الحسنة في تربية الأبناء.</p><p>من هديه في ذلك: الرفق واللين، والعدل بين الأولاد.</p>',
  'الشيخ السيد مراد', 'published', true, 1890, NOW() - INTERVAL '19 days'
)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 14. SAMPLE BOOKS (كتب تجريبية)
-- =====================================================
INSERT INTO books (title, author, description, publish_status, is_active, download_count, views_count, created_at) VALUES
(
  'فقه العبادات الميسر',
  'الشيخ السيد مراد',
  'كتاب مبسط في فقه العبادات يشمل أحكام الطهارة والصلاة والصيام والزكاة والحج',
  'published', true, 3450, 5000, NOW() - INTERVAL '60 days'
),
(
  'نور السيرة',
  'الشيخ السيد مراد',
  'رحلة مع السيرة النبوية الشريفة نستخلص منها الدروس والعبر',
  'published', true, 2890, 4200, NOW() - INTERVAL '90 days'
),
(
  'العقيدة الصحيحة',
  'الشيخ السيد مراد',
  'شرح مبسط لأصول العقيدة الإسلامية: الإيمان بالله وملائكته وكتبه ورسله',
  'published', true, 2100, 3500, NOW() - INTERVAL '120 days'
)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 15. SITE ANALYTICS (إحصائيات الموقع - آخر 30 يوم)
-- =====================================================
INSERT INTO site_analytics (date, page_views, unique_visitors) VALUES
(CURRENT_DATE - INTERVAL '29 days', 150, 95),
(CURRENT_DATE - INTERVAL '28 days', 180, 110),
(CURRENT_DATE - INTERVAL '27 days', 165, 100),
(CURRENT_DATE - INTERVAL '26 days', 200, 125),
(CURRENT_DATE - INTERVAL '25 days', 220, 140),
(CURRENT_DATE - INTERVAL '24 days', 190, 115),
(CURRENT_DATE - INTERVAL '23 days', 175, 105),
(CURRENT_DATE - INTERVAL '22 days', 210, 130),
(CURRENT_DATE - INTERVAL '21 days', 245, 155),
(CURRENT_DATE - INTERVAL '20 days', 230, 145),
(CURRENT_DATE - INTERVAL '19 days', 195, 120),
(CURRENT_DATE - INTERVAL '18 days', 185, 110),
(CURRENT_DATE - INTERVAL '17 days', 250, 160),
(CURRENT_DATE - INTERVAL '16 days', 280, 175),
(CURRENT_DATE - INTERVAL '15 days', 265, 165),
(CURRENT_DATE - INTERVAL '14 days', 240, 150),
(CURRENT_DATE - INTERVAL '13 days', 225, 140),
(CURRENT_DATE - INTERVAL '12 days', 290, 180),
(CURRENT_DATE - INTERVAL '11 days', 310, 195),
(CURRENT_DATE - INTERVAL '10 days', 285, 175),
(CURRENT_DATE - INTERVAL '9 days', 260, 160),
(CURRENT_DATE - INTERVAL '8 days', 275, 170),
(CURRENT_DATE - INTERVAL '7 days', 320, 200),
(CURRENT_DATE - INTERVAL '6 days', 350, 220),
(CURRENT_DATE - INTERVAL '5 days', 330, 205),
(CURRENT_DATE - INTERVAL '4 days', 295, 185),
(CURRENT_DATE - INTERVAL '3 days', 280, 175),
(CURRENT_DATE - INTERVAL '2 days', 340, 215),
(CURRENT_DATE - INTERVAL '1 day', 360, 225),
(CURRENT_DATE, 180, 110)
ON CONFLICT (date) DO UPDATE SET 
  page_views = EXCLUDED.page_views,
  unique_visitors = EXCLUDED.unique_visitors;

-- =====================================================
-- DONE!
-- =====================================================
SELECT 'FINAL SEED DATA - Successfully executed!' as message;
