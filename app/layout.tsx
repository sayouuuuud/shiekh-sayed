import type React from "react"
import type { Metadata, Viewport } from "next"
import { Amiri, Cairo } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import "./globals.css"

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
})

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "الشيخ السيد مراد - عالم أزهري",
    template: "%s | الشيخ السيد مراد",
  },
  description:
    "الموقع الرسمي للشيخ السيد مراد - منصة إسلامية شاملة تضم الخطب والدروس العلمية والمقالات والكتب. تعلم العلم الشرعي بفهم وسطي مستنير.",
  keywords: [
    "الشيخ السيد مراد",
    "دروس إسلامية",
    "خطب الجمعة",
    "علم شرعي",
    "فقه إسلامي",
    "سيرة نبوية",
    "مقالات دينية",
    "كتب إسلامية",
  ],
  authors: [{ name: "الشيخ السيد مراد" }],
  creator: "الشيخ السيد مراد",
  openGraph: {
    type: "website",
    locale: "ar_EG",
    siteName: "الشيخ السيد مراد",
    title: "الشيخ السيد مراد - عالم أزهري",
    description: "منصة إسلامية شاملة تضم الخطب والدروس والمقالات والكتب للشيخ السيد مراد",
  },
  twitter: {
    card: "summary_large_image",
    title: "الشيخ السيد مراد - عالم أزهري",
    description: "منصة إسلامية شاملة تضم الخطب والدروس والمقالات والكتب للشيخ السيد مراد",
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1e5631" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning className={`${amiri.variable} ${cairo.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
