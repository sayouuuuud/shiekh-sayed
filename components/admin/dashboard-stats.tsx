const stats = [
  {
    label: "إجمالي الدروس",
    value: "1,245",
    change: "+12 هذا الشهر",
    changeType: "positive",
    icon: "mic",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    label: "الكتب المنشورة",
    value: "84",
    change: "مكتبة شاملة",
    changeType: "neutral",
    icon: "menu_book",
    iconBg: "bg-secondary/10",
    iconColor: "text-yellow-600",
  },
  {
    label: "المقالات",
    value: "320",
    change: "+5 هذا الأسبوع",
    changeType: "positive",
    icon: "article",
    iconBg: "bg-blue-50 dark:bg-blue-900/20",
    iconColor: "text-blue-600",
  },
  {
    label: "الزوار اليوم",
    value: "4.2k",
    change: "+18% زيادة",
    changeType: "positive",
    icon: "visibility",
    iconBg: "bg-purple-50 dark:bg-purple-900/20",
    iconColor: "text-purple-600",
  },
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-surface dark:bg-card p-6 rounded-2xl shadow-sm border border-border dark:border-border flex items-start justify-between"
        >
          <div>
            <p className="text-text-muted dark:text-text-subtext text-sm font-medium mb-2">{stat.label}</p>
            <h3 className="text-3xl font-bold text-foreground dark:text-white">{stat.value}</h3>
            <p
              className={`text-xs mt-2 flex items-center gap-1 ${
                stat.changeType === "positive" ? "text-green-600" : "text-text-muted"
              }`}
            >
              {stat.changeType === "positive" && <span className="material-icons-outlined text-sm">trending_up</span>}
              {stat.change}
            </p>
          </div>
          <div className={`w-12 h-12 rounded-xl ${stat.iconBg} flex items-center justify-center ${stat.iconColor}`}>
            <span className="material-icons-outlined">{stat.icon}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
