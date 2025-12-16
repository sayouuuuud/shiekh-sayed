"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { useStore } from "@/lib/store-context"
import { MapPin, ExternalLink } from "lucide-react"

export function OurStorySection() {
  const { isRTL } = useLanguage()
  const { contentSettings, storeSettings, sectionNames } = useStore()

  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.123456789!2d${storeSettings.mapLng}!3d${storeSettings.mapLat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDEyJzAwLjQiTiAyOcKwNTUnMDcuMyJF!5e0!3m2!1sen!2seg!4v1702000000000!5m2!1sen!2seg`

  return (
    <section className="py-12 px-4" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Left: Text Content - Removed dark: classes */}
          <div className="bg-card rounded-3xl p-8 md:p-10 shadow-sm flex flex-col justify-center border border-transparent">
            <h2 className={`font-serif text-3xl text-rose-900 mb-4 ${isRTL ? "font-arabic" : ""}`}>
              {isRTL ? sectionNames.ourStory.ar : sectionNames.ourStory.en}
            </h2>
            <p className={`text-rose-700/80 leading-relaxed mb-4 ${isRTL ? "font-arabic" : ""}`}>
              {isRTL ? contentSettings.storyText.ar : contentSettings.storyText.en}
            </p>
            <p className={`text-rose-700/80 leading-relaxed mb-6 ${isRTL ? "font-arabic" : ""}`}>
              {isRTL ? contentSettings.storyText2.ar : contentSettings.storyText2.en}
            </p>
            <Link
              href="/about"
              className={`inline-flex items-center justify-center bg-rose-500 hover:bg-rose-600 text-white font-medium px-8 py-3 rounded-full transition-colors w-fit gap-2 ${isRTL ? "font-arabic" : ""}`}
            >
              {isRTL ? "اقرأ المزيد" : "Read More"}
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          {/* Right: Google Maps Embed */}
          <div className="bg-card rounded-3xl p-4 shadow-sm overflow-hidden border border-transparent">
            <div className="relative h-full min-h-[300px] md:min-h-[400px] rounded-2xl overflow-hidden">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, position: "absolute", inset: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Store Location"
              />
              {/* Location Badge */}
              <div
                className={`absolute bottom-4 ${isRTL ? "right-4" : "left-4"} bg-card px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 border border-transparent`}
              >
                <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <p className="text-rose-900 font-semibold text-sm">{storeSettings.storeName}</p>
                  <p className="text-rose-600/70 text-xs">{storeSettings.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
