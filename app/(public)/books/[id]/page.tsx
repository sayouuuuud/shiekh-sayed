import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ShareButtons } from "@/components/share-buttons"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function BookDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch book details
  const { data: book, error } = await supabase
    .from("books")
    .select("*")
    .eq("id", id)
    .eq("publish_status", "published")
    .single()

  if (error || !book) {
    notFound()
  }

  // Fetch related books (same category or by same author)
  const { data: relatedBooks } = await supabase
    .from("books")
    .select("id, title, author, cover_image_path, description")
    .eq("publish_status", "published")
    .neq("id", id)
    .limit(4)

  const bookColors = [
    { bg: "bg-primary", border: "border-l-primary-hover" },
    { bg: "bg-[#5d4037]", border: "border-l-[#4a3e28]" },
    { bg: "bg-[#004d40]", border: "border-l-[#003d32]" },
    { bg: "bg-[#1a237e]", border: "border-l-[#0d1642]" },
  ]
  const colors = bookColors[0]

  const handleDownload = async () => {
    await supabase
      .from("books")
      .update({ download_count: (book.download_count || 0) + 1 })
      .eq("id", id)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-text-muted dark:text-text-subtext mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-primary">
            الرئيسية
          </Link>
          <span className="material-icons-outlined text-xs mx-2">chevron_left</span>
          <Link href="/books" className="hover:text-primary">
            الكتب
          </Link>
          <span className="material-icons-outlined text-xs mx-2">chevron_left</span>
          <span className="text-primary font-medium">{book.title}</span>
        </nav>

        {/* Book Details */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Book Cover */}
          <div className="md:col-span-1">
            <div className={`w-full aspect-[3/4] ${colors.bg} rounded-lg shadow-2xl overflow-hidden`}>
              {book.cover_image_path ? (
                <img
                  src={book.cover_image_path || "/placeholder.svg"}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col justify-center items-center p-8 border-2 border-secondary/30 m-4 rounded-sm">
                  <span className="text-secondary text-sm mb-3">كتاب</span>
                  <h3 className="text-white text-2xl font-bold leading-tight mb-4 font-serif text-center">
                    {book.title}
                  </h3>
                  <p className="text-white/70 text-sm">{book.author}</p>
                </div>
              )}
            </div>

            {/* Download Stats */}
            <div className="mt-6 bg-card rounded-xl p-4 border border-border text-center">
              <p className="text-sm text-text-muted mb-1">تم التحميل</p>
              <p className="text-3xl font-bold text-primary">{book.download_count || 0}</p>
              <p className="text-xs text-text-muted">مرة</p>
            </div>
          </div>

          {/* Book Info */}
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold text-foreground mb-4 font-serif">{book.title}</h1>
            <p className="text-xl text-text-muted mb-6">بقلم: {book.author}</p>

            <div className="prose prose-lg max-w-none mb-8">
              <h3 className="text-xl font-bold text-foreground mb-3">نبذة عن الكتاب</h3>
              <p className="text-text-muted leading-relaxed whitespace-pre-line">{book.description}</p>
            </div>

            {/* Download Button */}
            {book.pdf_file_path ? (
              <a
                href={book.pdf_file_path}
                download
                className="inline-flex items-center gap-3 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors"
              >
                <span className="material-icons-outlined">download</span>
                تحميل الكتاب (PDF)
              </a>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-800">
                <p className="font-medium">الكتاب غير متوفر للتحميل حالياً</p>
                <p className="text-sm mt-1">يرجى التواصل معنا للحصول على نسخة من الكتاب</p>
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-border">
              <h4 className="font-bold text-foreground mb-3">مشاركة الكتاب</h4>
              <ShareButtons title={`${book.title} - ${book.author}`} />
            </div>
          </div>
        </div>

        {/* Related Books */}
        {relatedBooks && relatedBooks.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">كتب ذات صلة</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedBooks.map((relatedBook, index) => {
                const colors = bookColors[index % bookColors.length]
                return (
                  <Link key={relatedBook.id} href={`/books/${relatedBook.id}`} className="group">
                    <div
                      className={`w-full aspect-[3/4] ${colors.bg} rounded-lg shadow-lg overflow-hidden mb-3 group-hover:-translate-y-2 transition-transform`}
                    >
                      {relatedBook.cover_image_path ? (
                        <img
                          src={relatedBook.cover_image_path || "/placeholder.svg"}
                          alt={relatedBook.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col justify-center items-center p-4 border-2 border-secondary/30 m-2 rounded-sm">
                          <span className="text-secondary text-xs mb-2">كتاب</span>
                          <h3 className="text-white text-sm font-bold leading-tight mb-2 font-serif text-center line-clamp-3">
                            {relatedBook.title}
                          </h3>
                          <p className="text-white/60 text-[10px]">{relatedBook.author}</p>
                        </div>
                      )}
                    </div>
                    <h4 className="font-bold text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      {relatedBook.title}
                    </h4>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
