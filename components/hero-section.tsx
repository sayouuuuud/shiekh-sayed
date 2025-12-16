"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { useStore } from "@/lib/store-context"

export function HeroSection() {
  const { t, isRTL } = useLanguage()
  const { contentSettings } = useStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const heroImage = mounted
    ? contentSettings.heroImage || "/elegant-pink-roses-bouquet.jpg"
    : "/elegant-pink-roses-bouquet.jpg"

  const heroTitle = mounted
    ? isRTL
      ? contentSettings.heroTitle.ar
      : contentSettings.heroTitle.en
    : isRTL
      ? "همسات بتلات المحبة"
      : "Whispering Petals of Affection"

  const heroSubtitle = mounted
    ? isRTL
      ? contentSettings.heroSubtitle.ar
      : contentSettings.heroSubtitle.en
    : isRTL
      ? "اكتشف مجموعتنا المختارة للحظات الحب والرقي."
      : "Discover our curated collection for moments of love and grace."

  return (
    <section className="relative overflow-hidden mx-4 mt-4 rounded-3xl" dir={isRTL ? "rtl" : "ltr"}>
      <div className="relative h-[480px] md:h-[560px] w-full">
        <Image
          src={heroImage || "/placeholder.svg"}
          alt="Beautiful floral arrangement"
          fill
          className="object-cover"
          priority
        />
        <div
          className={`absolute inset-0 ${
            isRTL
              ? "bg-gradient-to-l from-white/95 via-white/70 to-transparent"
              : "bg-gradient-to-r from-white/95 via-white/70 to-transparent"
          }`}
        />
        <div
          className={`absolute inset-0 flex flex-col justify-center p-8 md:p-16 ${isRTL ? "items-end text-right" : ""}`}
        >
          <span
            className={`text-rose-500 text-sm font-medium tracking-widest uppercase mb-4 ${isRTL ? "font-arabic" : ""}`}
          >
            {isRTL ? "مجموعة حصرية" : "Exclusive Collection"}
          </span>
          <h1
            className={`font-serif text-4xl md:text-5xl lg:text-6xl text-rose-900 leading-tight max-w-lg italic ${isRTL ? "font-aref-ruqaa" : ""}`}
          >
            {heroTitle}
          </h1>
          <p
            className={`mt-6 text-rose-800/80 text-base md:text-lg max-w-md leading-relaxed ${isRTL ? "font-arabic" : ""}`}
          >
            {heroSubtitle}
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex items-center justify-center bg-rose-500 hover:bg-rose-600 text-white font-medium px-8 py-4 rounded-full transition-all duration-300 w-fit text-sm tracking-wide shadow-lg shadow-rose-500/20 hover:shadow-xl hover:-translate-y-0.5"
          >
            {t.exploreCollection}
          </Link>
        </div>
      </div>
    </section>
  )
}
