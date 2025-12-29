import { LoginForm } from "@/components/auth/login-form"

export default async function AdminLoginPage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 dark:from-primary/10 dark:via-background-alt dark:to-secondary/10 flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
            <span className="material-icons-outlined text-4xl">mosque</span>
          </div>
          <h1 className="text-2xl font-bold text-primary dark:text-white font-serif">الشيخ السيد مراد</h1>
          <p className="text-text-muted dark:text-gray-400 mt-1">لوحة التحكم الإدارية</p>
        </div>

        {/* Login Card */}
        <div className="bg-card dark:bg-card rounded-2xl shadow-xl border border-border p-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-foreground dark:text-white">تسجيل الدخول</h2>
            <p className="text-sm text-text-muted dark:text-gray-400 mt-1">أدخل بياناتك للوصول إلى لوحة التحكم</p>
          </div>

          <LoginForm />
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-text-muted dark:text-gray-400 mt-6">
          © {new Date().getFullYear()} الشيخ السيد مراد. جميع الحقوق محفوظة.
        </p>
      </div>
    </div>
  )
}
