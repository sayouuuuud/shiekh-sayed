import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ShareButtons } from "@/components/share-buttons"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Download, BookOpen } from "lucide-react"

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

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <nav className="flex items-center text-sm text-text-muted dark:text-text-subtext mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-primary dark:hover:text-secondary">
            الرئيسية
          </Link>
          <ChevronLeft className="h-4 w-4 mx-2" />
          <Link href="/books" className="hover:text-primary dark:hover:text-secondary">
            الكتب
          </Link>
          <ChevronLeft className="h-4 w-4 mx-2" />
          <span className="text-primary dark:text-secondary font-medium">{book.title}</span>
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
          </div>

          {/* Book Info */}
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold text-foreground dark:text-white mb-4 font-serif">{book.title}</h1>
            <p className="text-xl text-text-muted dark:text-text-subtext mb-6">بقلم: {book.author}</p>

            <div className="prose prose-lg max-w-none mb-8">
              <h3 className="text-xl font-bold text-foreground dark:text-white mb-3">نبذة عن الكتاب</h3>
              {book.description && (
                <div
                  className="text-text-muted dark:text-text-subtext leading-relaxed prose-headings:text-foreground dark:prose-headings:text-white"
                  dangerouslySetInnerHTML={{ __html: book.description }}
                />
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              {book.pdf_file_path ? (
                <>
                  <a
                    href={book.pdf_file_path}
                    download
                    className="inline-flex items-center gap-3 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors"
                  >
                    <Download className="h-6 w-6" />
                    تحميل الكتاب (PDF)
                  </a>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="lg"
                        variant="outline"
                        className="inline-flex items-center gap-3 px-8 py-4 text-lg font-bold bg-transparent"
                      >
                        <BookOpen className="h-6 w-6" />
                        قراءة الكتاب
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      className="max-w-5xl w-[90vw] h-[90vh] p-0 flex flex-col"
                      onOpenAutoFocus={(e) => e.preventDefault()}
                    >
                      <DialogHeader className="p-4 pb-2 flex-shrink-0">
                        <DialogTitle>{book.title}</DialogTitle>
                      </DialogHeader>
                      <div className="flex-1 px-4 pb-4 min-h-0">
                        <iframe
                          src={`${book.pdf_file_path}#toolbar=1&navpanes=1&scrollbar=1`}
                          className="w-full h-full rounded-lg border border-border"
                          title={book.title}
                          style={{ minHeight: "500px" }}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </>
              ) : (
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-4 text-amber-800 dark:text-amber-300">
                  <p className="font-medium">الكتاب غير متوفر للتحميل حالياً</p>
                  <p className="text-sm mt-1">يرجى التواصل معنا للحصول على نسخة من الكتاب</p>
                </div>
              )}
            </div>

            <div className="pt-8 border-t border-border dark:border-border">
              <h4 className="font-bold text-foreground dark:text-white mb-3">مشاركة الكتاب</h4>
              <ShareButtons title={`${book.title} - ${book.author}`} />
            </div>
          </div>
        </div>

        {/* Related Books */}
        {relatedBooks && relatedBooks.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">كتب ذات صلة</h2>
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
                    <h4 className="font-bold text-foreground dark:text-white text-sm line-clamp-2 group-hover:text-primary dark:group-hover:text-secondary transition-colors">
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
