"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { Save, Search, Globe, ImageIcon, RefreshCw, Plus, Pencil, Trash2, X, FileText } from "lucide-react"

interface SEOSettings {
  meta_title: string
  meta_description: string
  meta_keywords: string
  og_title: string
  og_description: string
  og_image: string
  twitter_title: string
  twitter_description: string
  twitter_image: string
  robots_txt: string
  google_verification: string
  bing_verification: string
}

interface PageSEO {
  id: string
  page_path: string
  page_title: string
  meta_description: string
  meta_keywords: string
  og_title: string
  og_description: string
  og_image: string
  robots: string
}

export default function SEOManagementPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [activeTab, setActiveTab] = useState<"general" | "social" | "verification" | "pages">("general")

  // Page-specific SEO
  const [pageSEOList, setPageSEOList] = useState<PageSEO[]>([])
  const [editingPageId, setEditingPageId] = useState<string | null>(null)
  const [isAddingPage, setIsAddingPage] = useState(false)
  const [pageFormData, setPageFormData] = useState({
    page_path: "",
    page_title: "",
    meta_description: "",
    meta_keywords: "",
    og_title: "",
    og_description: "",
    og_image: "",
    robots: "index, follow",
  })

  const [settings, setSettings] = useState<SEOSettings>({
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    og_title: "",
    og_description: "",
    og_image: "",
    twitter_title: "",
    twitter_description: "",
    twitter_image: "",
    robots_txt: "",
    google_verification: "",
    bing_verification: "",
  })

  const supabase = createClient()

  useEffect(() => {
    loadSettings()
    loadPageSEO()
  }, [])

  async function loadSettings() {
    setLoading(true)
    const { data } = await supabase.from("site_settings").select("key, value").in("key", Object.keys(settings))

    if (data) {
      const settingsObj: Record<string, string> = {}
      data.forEach((item) => {
        settingsObj[item.key] = item.value || ""
      })
      setSettings((prev) => ({ ...prev, ...settingsObj }))
    }
    setLoading(false)
  }

  async function loadPageSEO() {
    const { data } = await supabase.from("seo_settings").select("*").order("page_path", { ascending: true })

    if (data) setPageSEOList(data)
  }

  async function saveSettings() {
    setSaving(true)
    setMessage("")

    try {
      for (const [key, value] of Object.entries(settings)) {
        await supabase.from("site_settings").upsert(
          {
            key: key,
            value: value,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "key" },
        )
      }
      setMessage("تم حفظ إعدادات SEO بنجاح")
    } catch (error) {
      setMessage("حدث خطأ أثناء حفظ الإعدادات")
    }
    setSaving(false)
  }

  async function savePageSEO() {
    if (!pageFormData.page_path || !pageFormData.page_title) {
      setMessage("يرجى ملء مسار الصفحة والعنوان")
      return
    }

    try {
      if (editingPageId) {
        await supabase
          .from("seo_settings")
          .update({ ...pageFormData, updated_at: new Date().toISOString() })
          .eq("id", editingPageId)
        setMessage("تم تحديث إعدادات SEO للصفحة بنجاح")
      } else {
        await supabase.from("seo_settings").insert(pageFormData)
        setMessage("تم إضافة إعدادات SEO للصفحة بنجاح")
      }
      resetPageForm()
      loadPageSEO()
    } catch (error) {
      setMessage("حدث خطأ أثناء الحفظ")
    }
  }

  async function deletePageSEO(id: string) {
    if (!confirm("هل أنت متأكد من حذف إعدادات SEO لهذه الصفحة؟")) return

    await supabase.from("seo_settings").delete().eq("id", id)
    setMessage("تم حذف إعدادات SEO بنجاح")
    loadPageSEO()
  }

  function startEditPage(page: PageSEO) {
    setPageFormData({
      page_path: page.page_path,
      page_title: page.page_title,
      meta_description: page.meta_description || "",
      meta_keywords: page.meta_keywords || "",
      og_title: page.og_title || "",
      og_description: page.og_description || "",
      og_image: page.og_image || "",
      robots: page.robots || "index, follow",
    })
    setEditingPageId(page.id)
    setIsAddingPage(true)
  }

  function resetPageForm() {
    setPageFormData({
      page_path: "",
      page_title: "",
      meta_description: "",
      meta_keywords: "",
      og_title: "",
      og_description: "",
      og_image: "",
      robots: "index, follow",
    })
    setEditingPageId(null)
    setIsAddingPage(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري تحميل الإعدادات...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mb-3">
          تحسين محركات البحث
        </span>
        <h1 className="text-4xl font-bold mb-4">
          إعدادات <span className="text-primary">SEO</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          تحسين ظهور موقعك في محركات البحث وشبكات التواصل الاجتماعي
        </p>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`p-4 rounded-xl text-center ${message.includes("خطأ") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
        >
          {message}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 justify-center flex-wrap">
        <Button
          variant={activeTab === "general" ? "default" : "outline"}
          onClick={() => setActiveTab("general")}
          className="gap-2"
        >
          <Search className="h-4 w-4" />
          البيانات الوصفية
        </Button>
        <Button
          variant={activeTab === "social" ? "default" : "outline"}
          onClick={() => setActiveTab("social")}
          className="gap-2"
        >
          <Globe className="h-4 w-4" />
          الشبكات الاجتماعية
        </Button>
        <Button
          variant={activeTab === "verification" ? "default" : "outline"}
          onClick={() => setActiveTab("verification")}
          className="gap-2"
        >
          <ImageIcon className="h-4 w-4" />
          التحقق من الملكية
        </Button>
        <Button
          variant={activeTab === "pages" ? "default" : "outline"}
          onClick={() => setActiveTab("pages")}
          className="gap-2"
        >
          <FileText className="h-4 w-4" />
          SEO الصفحات
        </Button>
      </div>

      {/* Content */}
      <div className="bg-card rounded-2xl p-8 shadow-sm border">
        {activeTab === "general" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              البيانات الوصفية الأساسية
            </h2>

            <div className="space-y-2">
              <Label>عنوان الموقع (Meta Title)</Label>
              <Input
                value={settings.meta_title}
                onChange={(e) => setSettings({ ...settings, meta_title: e.target.value })}
                placeholder="الشيخ السيد مراد - العلم الشرعي"
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">يظهر في نتائج البحث - يفضل 50-60 حرفاً</p>
            </div>

            <div className="space-y-2">
              <Label>وصف الموقع (Meta Description)</Label>
              <Textarea
                value={settings.meta_description}
                onChange={(e) => setSettings({ ...settings, meta_description: e.target.value })}
                placeholder="الموقع الرسمي للشيخ السيد مراد - دروس وخطب ومقالات في العلوم الشرعية"
                rows={3}
                className="bg-muted resize-none"
              />
              <p className="text-xs text-muted-foreground">يظهر في نتائج البحث - يفضل 150-160 حرفاً</p>
            </div>

            <div className="space-y-2">
              <Label>الكلمات المفتاحية (Meta Keywords)</Label>
              <Input
                value={settings.meta_keywords}
                onChange={(e) => setSettings({ ...settings, meta_keywords: e.target.value })}
                placeholder="إسلام، فقه، عقيدة، خطب، دروس، الشيخ السيد مراد"
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">افصل بين الكلمات بفواصل</p>
            </div>
          </div>
        )}

        {activeTab === "social" && (
          <div className="space-y-8">
            {/* Open Graph */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" />
                Open Graph (Facebook, WhatsApp)
              </h2>

              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label>عنوان OG</Label>
                  <Input
                    value={settings.og_title}
                    onChange={(e) => setSettings({ ...settings, og_title: e.target.value })}
                    placeholder="اتركه فارغاً لاستخدام عنوان الصفحة"
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label>وصف OG</Label>
                  <Textarea
                    value={settings.og_description}
                    onChange={(e) => setSettings({ ...settings, og_description: e.target.value })}
                    rows={2}
                    className="bg-muted resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label>رابط صورة OG</Label>
                  <Input
                    value={settings.og_image}
                    onChange={(e) => setSettings({ ...settings, og_image: e.target.value })}
                    placeholder="https://example.com/og-image.jpg"
                    dir="ltr"
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">الأبعاد المثالية: 1200x630 بكسل</p>
                </div>
              </div>
            </div>

            {/* Twitter */}
            <div className="space-y-6 pt-6 border-t">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Globe className="h-5 w-5 text-sky-500" />
                Twitter Cards
              </h2>

              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label>عنوان Twitter</Label>
                  <Input
                    value={settings.twitter_title}
                    onChange={(e) => setSettings({ ...settings, twitter_title: e.target.value })}
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label>وصف Twitter</Label>
                  <Textarea
                    value={settings.twitter_description}
                    onChange={(e) => setSettings({ ...settings, twitter_description: e.target.value })}
                    rows={2}
                    className="bg-muted resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label>رابط صورة Twitter</Label>
                  <Input
                    value={settings.twitter_image}
                    onChange={(e) => setSettings({ ...settings, twitter_image: e.target.value })}
                    dir="ltr"
                    className="bg-muted"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "verification" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-primary" />
              التحقق من ملكية الموقع
            </h2>

            <div className="space-y-2">
              <Label>Google Search Console</Label>
              <Input
                value={settings.google_verification}
                onChange={(e) => setSettings({ ...settings, google_verification: e.target.value })}
                placeholder="رمز التحقق من Google"
                dir="ltr"
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label>Bing Webmaster</Label>
              <Input
                value={settings.bing_verification}
                onChange={(e) => setSettings({ ...settings, bing_verification: e.target.value })}
                placeholder="رمز التحقق من Bing"
                dir="ltr"
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label>Robots.txt (إضافات مخصصة)</Label>
              <Textarea
                value={settings.robots_txt}
                onChange={(e) => setSettings({ ...settings, robots_txt: e.target.value })}
                rows={5}
                dir="ltr"
                className="bg-muted font-mono text-sm resize-none"
                placeholder="User-agent: *&#10;Allow: /"
              />
            </div>
          </div>
        )}

        {activeTab === "pages" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                إعدادات SEO لكل صفحة
              </h2>
              <Button onClick={() => setIsAddingPage(true)} disabled={isAddingPage}>
                <Plus className="h-4 w-4 ml-2" />
                إضافة صفحة
              </Button>
            </div>

            {/* Add/Edit Page SEO Form */}
            {isAddingPage && (
              <div className="bg-muted/50 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">{editingPageId ? "تعديل SEO الصفحة" : "إضافة SEO لصفحة جديدة"}</h3>
                  <Button variant="ghost" size="icon" onClick={resetPageForm}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>مسار الصفحة *</Label>
                    <Input
                      value={pageFormData.page_path}
                      onChange={(e) => setPageFormData({ ...pageFormData, page_path: e.target.value })}
                      placeholder="/khutba"
                      dir="ltr"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>عنوان الصفحة *</Label>
                    <Input
                      value={pageFormData.page_title}
                      onChange={(e) => setPageFormData({ ...pageFormData, page_title: e.target.value })}
                      placeholder="الخطب - الشيخ السيد مراد"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>الوصف</Label>
                    <Textarea
                      value={pageFormData.meta_description}
                      onChange={(e) => setPageFormData({ ...pageFormData, meta_description: e.target.value })}
                      rows={2}
                      className="bg-background resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>الكلمات المفتاحية</Label>
                    <Input
                      value={pageFormData.meta_keywords}
                      onChange={(e) => setPageFormData({ ...pageFormData, meta_keywords: e.target.value })}
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Robots</Label>
                    <Input
                      value={pageFormData.robots}
                      onChange={(e) => setPageFormData({ ...pageFormData, robots: e.target.value })}
                      placeholder="index, follow"
                      dir="ltr"
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={resetPageForm}>
                    إلغاء
                  </Button>
                  <Button onClick={savePageSEO}>
                    <Save className="h-4 w-4 ml-2" />
                    {editingPageId ? "تحديث" : "إضافة"}
                  </Button>
                </div>
              </div>
            )}

            {/* Pages List */}
            <div className="space-y-3">
              {pageSEOList.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">لا توجد إعدادات SEO مخصصة للصفحات</div>
              ) : (
                pageSEOList.map((page) => (
                  <div key={page.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded" dir="ltr">
                          {page.page_path}
                        </code>
                      </div>
                      <h4 className="font-medium mt-1 truncate">{page.page_title}</h4>
                      {page.meta_description && (
                        <p className="text-sm text-muted-foreground truncate">{page.meta_description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => startEditPage(page)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deletePageSEO(page.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Actions - only show for non-pages tabs */}
      {activeTab !== "pages" && (
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={loadSettings}>
            <RefreshCw className="h-4 w-4 ml-2" />
            إعادة تحميل
          </Button>
          <Button onClick={saveSettings} disabled={saving}>
            {saving ? (
              <>
                <RefreshCw className="h-4 w-4 ml-2 animate-spin" />
                جاري الحفظ...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 ml-2" />
                حفظ الإعدادات
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
