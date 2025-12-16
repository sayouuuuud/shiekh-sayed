"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useStore } from "@/lib/store-context"

export function GallerySlider() {
  const { galleryImages } = useStore()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [visibleItems, setVisibleItems] = useState(4)

  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1) // Mobile: 1 image
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2) // Tablet: 2 images
      } else {
        setVisibleItems(4) // Desktop: 4 images
      }
    }

    updateVisibleItems()
    window.addEventListener("resize", updateVisibleItems)
    return () => window.removeEventListener("resize", updateVisibleItems)
  }, [])

  useEffect(() => {
    if (isHovered || galleryImages.length <= visibleItems) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.max(1, galleryImages.length - visibleItems + 1))
    }, 3000)

    return () => clearInterval(timer)
  }, [isHovered, galleryImages.length, visibleItems])

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(Math.max(0, galleryImages.length - visibleItems), prev + 1))
  }

  if (galleryImages.length === 0) {
    return <div className="text-center py-12 text-rose-500">No gallery images available</div>
  }

  const transformPercentage = currentIndex * (100 / visibleItems)

  return (
    <div className="relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {/* Slider Container */}
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex gap-3 md:gap-4 transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${transformPercentage}%)` }}
        >
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="relative aspect-[4/3] rounded-xl overflow-hidden flex-shrink-0
                w-full sm:w-[calc(50%-6px)] lg:w-[calc(25%-12px)]"
            >
              <Image
                src={image.src || "/placeholder.svg?height=300&width=400&query=flower arrangement"}
                alt={image.alt || `Gallery image ${index + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {galleryImages.length > visibleItems && (
        <>
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-card disabled:opacity-50 disabled:cursor-not-allowed shadow-lg border border-transparent"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-rose-700" />
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex >= galleryImages.length - visibleItems}
            className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-card disabled:opacity-50 disabled:cursor-not-allowed shadow-lg border border-transparent"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-rose-700" />
          </button>
        </>
      )}

      {/* Pagination Dots */}
      {galleryImages.length > visibleItems && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: Math.max(1, galleryImages.length - visibleItems + 1) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-rose-500 w-6" : "bg-rose-200 w-2 hover:bg-rose-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
