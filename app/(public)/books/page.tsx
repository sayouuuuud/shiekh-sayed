import type { Metadata } from "next"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { BookOpen, Search, ChevronRight, ChevronLeft, FileText, Eye } from "lucide-react"

export const metadata: Metadata = {
  title: "الكتب والمؤلفات",
  description: "مجموعة مختارة من مؤلفات الشيخ السيد مراد في الفقه والعقيدة والسيرة النبوية متاحة للقراءة والتحميل",
  keywords: ["كتب إسلامية", "مؤلفات", "فقه", "عقيدة", "تحميل كتب"],
  openGraph: {
    title: "الكتب والمؤلفات",
    description: "مؤلفات الشيخ السيد مراد المتخصصة في العلوم الشرعية",
    type: "website",
  },
}

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string; search?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()
  const currentPage = Number(params.page) || 1
  const itemsPerPage = 12
  const offset = (currentPage - 1) * itemsPerPage

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .eq("type", "book")
    .order("name", { ascending: true })

  let query = supabase
    .from("books")
    .select("*", { count: "exact" })
    .eq("publish_status", "published")
    .order("created_at", { ascending: false })
    .range(offset, offset + itemsPerPage - 1)

  if (params.search) {
    query = query.or(`title.ilike.%${params.search}%,author.ilike.%${params.search}%`)
  }

  if (params.category && params.category !== "الكل") {
    query = query.eq("category", params.category)
  }

  const { data: books, count } = await query
  const totalPages = Math.ceil((count || 0) / itemsPerPage)

  return (
    <>
      {/* Hero Section */}
      <section className="bg-accent-light dark:bg-card py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-surface dark:bg-card text-secondary px-3 py-1 rounded-full text-sm mb-4 border border-secondary/20 shadow-sm">
            المكتبة العلمية
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-white mb-4 font-serif">
            الكتب والمؤلفات
          </h1>
          <p className="text-text-muted dark:text-text-subtext max-w-2xl mx-auto text-lg leading-relaxed">
            مجموعة مختارة من المؤلفات في الفقه والعقيدة والسيرة النبوية، متاحة للقراءة والتحميل مجاناً.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-surface dark:bg-card p-4 rounded-xl shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4 border border-border dark:border-border">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <BookOpen className="h-5 w-5 text-primary dark:text-secondary" />
            <span className="font-bold text-foreground dark:text-foreground">تصفية الكتب:</span>
          </div>
          <form className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative">
              <input
                type="search"
                name="search"
                defaultValue={params.search}
                placeholder="ابحث عن كتاب..."
                className="appearance-none bg-background dark:bg-background-alt border border-border dark:border-border text-foreground dark:text-foreground py-2 pr-10 pl-4 rounded-lg focus:outline-none focus:border-primary w-full md:w-64"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-text-muted pointer-events-none" />
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              بحث
            </button>
          </form>
        </div>

        {/* Category Pills */}
        {categories && categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <Link
              href="/books"
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                !params.category || params.category === "الكل"
                  ? "bg-secondary text-white"
                  : "bg-secondary/10 text-secondary hover:bg-secondary/20"
              }`}
            >
              جميع الكتب
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/books?category=${encodeURIComponent(cat.name)}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  params.category === cat.name
                    ? "bg-secondary text-white"
                    : "bg-secondary/10 text-secondary hover:bg-secondary/20"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        {/* Books Grid - Removed download count from cards */}
        {!books || books.length === 0 ? (
          <div className="text-center py-16 text-text-muted dark:text-text-subtext">
            <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">لا توجد كتب منشورة حالياً</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {books.map((book) => (
              <article
                key={book.id}
                className="bg-surface dark:bg-card rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-border dark:border-border flex flex-col h-full group"
              >
                <div className="relative aspect-[3/4] rounded-t-xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                  {book.cover_image_path ? (
                    <img
                      src={book.cover_image_path || "/placeholder.svg"}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-primary/30 dark:text-primary/50" />
                    </div>
                  )}
                  {book.pdf_file_path && (
                    <div className="absolute top-2 right-2">
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        PDF
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-sm font-bold text-primary dark:text-white mb-1 line-clamp-2 hover:text-secondary transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-xs text-text-muted dark:text-text-subtext mb-3">{book.author}</p>
                  <div className="mt-auto flex items-center gap-2">
                    <Link
                      href={`/books/${book.id}`}
                      className="flex-1 text-center bg-primary hover:bg-primary-hover text-white py-1.5 px-2 rounded-lg text-xs font-medium transition flex items-center justify-center gap-1"
                    >
                      <Eye className="h-3 w-3" />
                      التفاصيل
                    </Link>
                    {book.pdf_file_path && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-8 h-8 p-0 flex items-center justify-center bg-transparent"
                            title="قراءة"
                          >
                            <BookOpen className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl h-[80vh]">
                          <DialogHeader>
                            <DialogTitle>{book.title}</DialogTitle>
                          </DialogHeader>
                          <iframe src={book.pdf_file_path} className="w-full h-full rounded-lg" title={book.title} />
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <nav className="flex items-center gap-2">
              {currentPage > 1 && (
                <Link
                  href={`/books?page=${currentPage - 1}${params.category ? `&category=${params.category}` : ""}${params.search ? `&search=${params.search}` : ""}`}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-border dark:border-border text-text-muted dark:text-text-subtext hover:bg-background dark:hover:bg-background-alt"
                >
                  <ChevronRight className="h-5 w-5" />
                </Link>
              )}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }
                return (
                  <Link
                    key={pageNum}
                    href={`/books?page=${pageNum}${params.category ? `&category=${params.category}` : ""}${params.search ? `&search=${params.search}` : ""}`}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium ${
                      currentPage === pageNum
                        ? "bg-primary text-white"
                        : "border border-border dark:border-border text-text-muted dark:text-text-subtext hover:bg-background dark:hover:bg-background-alt"
                    }`}
                  >
                    {pageNum}
                  </Link>
                )
              })}
              {currentPage < totalPages && (
                <Link
                  href={`/books?page=${currentPage + 1}${params.category ? `&category=${params.category}` : ""}${params.search ? `&search=${params.search}` : ""}`}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-border dark:border-border text-text-muted dark:text-text-subtext hover:bg-background dark:hover:bg-background-alt"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Link>
              )}
            </nav>
          </div>
        )}
      </main>
    </>
  )
}
