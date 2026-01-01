# دليل إعداد المسؤول - Admin Setup Guide

## المشكلة - The Problem

عندما تضغط على زر "إضافة" في لوحة التحكم، تظهر صفحة خطأ لأنك لست مسجل الدخول.

When you click the "Add" button in the admin panel, you see an error page because you're not logged in.

---

## الحل - The Solution

### الخطوة 1: إنشاء حساب المسؤول الأول
### Step 1: Create Your First Admin Account

يجب عليك إنشاء حساب مسؤول في Supabase أولاً:

You need to create an admin account in Supabase first:

1. **افتح Supabase Dashboard** - Open your Supabase Dashboard
   - اذهب إلى: https://supabase.com/dashboard
   - Go to: https://supabase.com/dashboard

2. **اذهب إلى Authentication** - Go to Authentication
   - اضغط على "Authentication" من القائمة الجانبية
   - Click "Authentication" from the sidebar

3. **أضف مستخدم جديد** - Add New User
   - اضغط على "Add User" > "Create new user"
   - Click "Add User" > "Create new user"
   
4. **أدخل البيانات** - Enter Details:
   \`\`\`
   Email: admin@example.com
   Password: (اختر كلمة مرور قوية - choose a strong password)
   \`\`\`
   
5. **تأكيد البريد الإلكتروني** - Confirm Email:
   - تأكد من تفعيل "Auto Confirm User" 
   - Make sure "Auto Confirm User" is checked

---

### الخطوة 2: تسجيل الدخول
### Step 2: Log In

1. **اذهب إلى صفحة تسجيل الدخول**
   Go to the login page:
   \`\`\`
   /login
   \`\`\`

2. **أدخل بيانات الدخول**
   Enter your credentials:
   - البريد الإلكتروني: admin@example.com
   - Email: admin@example.com
   - كلمة المرور: (التي أنشأتها في Supabase)
   - Password: (the one you created in Supabase)

3. **اضغط "تسجيل الدخول"**
   Click "تسجيل الدخول" (Login)

---

### الخطوة 3: استخدام لوحة التحكم
### Step 3: Use the Admin Panel

الآن يمكنك:
- إضافة خطب جديدة
- إضافة دروس
- إضافة مقالات
- إدارة جميع المحتوى

Now you can:
- Add new sermons
- Add lessons  
- Add articles
- Manage all content

---

## ملاحظة مهمة - Important Note

**لن تعمل لوحة التحكم بدون تسجيل الدخول!**

**The admin panel will NOT work without logging in!**

يجب عليك:
1. إنشاء حساب في Supabase
2. تسجيل الدخول عبر `/login`
3. ثم يمكنك إضافة المحتوى

You must:
1. Create an account in Supabase
2. Log in via `/login`
3. Then you can add content

---

## طريقة سريعة - Quick Method

إذا كنت تريد إنشاء المستخدم باستخدام SQL مباشرة:

If you want to create the user using SQL directly:

1. افتح **SQL Editor** في Supabase Dashboard
2. نفذ هذا الأمر (استبدل البريد الإلكتروني وكلمة المرور):

\`\`\`sql
-- Create admin user
-- Replace 'your-email@example.com' and 'your-secure-password'
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@example.com', -- غير هذا البريد
  crypt('YourSecurePassword123!', gen_salt('bf')), -- غير كلمة المرور
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);
\`\`\`

**ملحوظة:** استبدل `admin@example.com` و `YourSecurePassword123!` ببياناتك الخاصة.

**Note:** Replace `admin@example.com` and `YourSecurePassword123!` with your own credentials.

---

## استكشاف الأخطاء - Troubleshooting

### إذا ظهرت رسالة "Auth session missing!"

هذا يعني أنك لست مسجل الدخول. اذهب إلى `/login`.

This means you're not logged in. Go to `/login`.

### إذا لم يعمل تسجيل الدخول

تأكد من:
1. البريد الإلكتروني صحيح
2. كلمة المرور صحيحة  
3. المستخدم مفعل في Supabase (Email Confirmed)

Make sure:
1. Email is correct
2. Password is correct
3. User is confirmed in Supabase (Email Confirmed)

---

## الدعم - Support

إذا واجهت أي مشاكل، تحقق من:
- Supabase Dashboard > Authentication > Users
- Console logs في متصفحك (F12)

If you face any issues, check:
- Supabase Dashboard > Authentication > Users  
- Console logs in your browser (F12)
