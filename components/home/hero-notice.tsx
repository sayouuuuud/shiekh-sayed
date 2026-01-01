import Link from "next/link"

interface HeroNoticeProps {
  text: string
  link?: string | null
}

export function HeroNotice({ text, link }: HeroNoticeProps) {
  const content = (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200 px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-center">
      <span className="material-icons-outlined text-yellow-600 dark:text-yellow-400">campaign</span>
      <span className="font-medium">{text}</span>
      {link && (
        <span className="material-icons-outlined text-sm text-yellow-600 dark:text-yellow-400 rtl-flip">
          arrow_back
        </span>
      )}
    </div>
  )

  if (link) {
    return (
      <Link href={link} className="block hover:opacity-90 transition-opacity mb-6">
        {content}
      </Link>
    )
  }

  return <div className="mb-6">{content}</div>
}
