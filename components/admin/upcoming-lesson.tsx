export function UpcomingLesson() {
  return (
    <div className="bg-surface dark:bg-card rounded-2xl shadow-sm border border-border dark:border-border p-6">
      <h3 className="font-bold text-lg mb-4">الدرس القادم</h3>

      <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 rounded-xl p-4 mb-4">
        <div className="flex justify-between items-start mb-2">
          <span className="bg-surface dark:bg-card text-orange-600 dark:text-orange-400 text-xs font-bold px-2 py-1 rounded shadow-sm">
            مباشر
          </span>
          <span className="text-xs text-text-muted">اليوم، 7:30 م</span>
        </div>
        <h4 className="font-bold text-lg text-foreground dark:text-white mb-1">مجلس الفقه</h4>
        <p className="text-sm text-text-muted dark:text-text-subtext">
          شرح كتاب &quot;منهاج الطالبين&quot; للإمام النووي
        </p>
      </div>

      <button className="w-full bg-transparent border border-border dark:border-border hover:border-primary hover:text-primary dark:hover:text-white text-text-muted dark:text-text-subtext font-medium py-2 rounded-lg transition-colors text-sm">
        إدارة الجدول
      </button>
    </div>
  )
}
