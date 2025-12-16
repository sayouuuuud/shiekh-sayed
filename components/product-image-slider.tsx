"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProductImageSliderProps {
  images: string[]
  productName: string
}

export function ProductImageSlider({ images, productName }: ProductImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative max-w-lg mx-auto">
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-white shadow-sm">
        <Image
          src={images[currentIndex] || "/placeholder.svg?height=500&width=400&query=flower bouquet"}
          alt={`${productName} - Image ${currentIndex + 1}`}
          fill
          className="object-cover"
          priority
        />
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 text-rose-700" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 text-rose-700" />
          </button>
        </>
      )}

      <div className="flex gap-3 mt-4 justify-center">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`relative w-20 h-20 rounded-xl overflow-hidden transition-all ${
              index === currentIndex ? "ring-2 ring-rose-400 ring-offset-2" : "opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={image || "/placeholder.svg?height=80&width=80&query=flower"}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
