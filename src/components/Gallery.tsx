"use client"

import type React from "react"
import { useState, useEffect, memo } from "react"
import { Icon } from "@iconify/react"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "../lib/firebase"
import Image from "next/image"

interface GalleryImage {
  id: string
  imageUrl: string
  description: string
  alt: string
  timestamp: Date
  featured?: boolean
}

interface GalleryProps {
  className?: string
}

const Gallery: React.FC<GalleryProps> = ({ className = "" }) => {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [displayedImages, setDisplayedImages] = useState<GalleryImage[]>([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const q = query(collection(db, "gallery"), orderBy("timestamp", "desc"))
      const snapshot = await getDocs(q)

      const galleryImages: GalleryImage[] = snapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          id: doc.id,
          imageUrl: data.imageUrl,
          description: data.description,
          alt:
            data.alt ||
            `Udawalawe Safari wildlife photo - ${data.description || "Safari adventure with elephants and nature"}`,
          timestamp: data.timestamp?.seconds ? new Date(data.timestamp.seconds * 1000) : new Date(),
          featured: data.featured || false,
        }
      })

      setImages(galleryImages)
      setDisplayedImages(galleryImages.slice(0, 8))
    } catch (err) {
      console.error(err)
      setError("Failed to load gallery images")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSeeMore = () => {
    setIsExpanded(true)
    setDisplayedImages(images)
  }

  const openZoom = (index: number) => {
    setZoomedIndex(index)
    document.body.style.overflow = "hidden"
  }

  const closeZoom = () => {
    setZoomedIndex(null)
    document.body.style.overflow = "auto"
  }

  const navigateImage = (direction: "prev" | "next") => {
    if (zoomedIndex === null) return
    const newIndex =
      direction === "prev" ? (zoomedIndex - 1 + images.length) % images.length : (zoomedIndex + 1) % images.length
    setZoomedIndex(newIndex)
  }

  const ImageSkeleton = () => (
    <div className="bg-gray-800/50 rounded-2xl animate-pulse border border-green-900/30">
      <div className="w-full aspect-[4/3] bg-gray-700/50 rounded-2xl"></div>
    </div>
  )

  const ImageCard = memo<{ image: GalleryImage; index: number }>(({ image, index }) => (
    <div
      className="relative overflow-hidden rounded-2xl shadow-xl cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-green-900/30"
      onClick={() => openZoom(index)}
    >
      <div className="relative w-full aspect-[4/3]">
        <Image
          src={image.imageUrl || "/placeholder.svg"}
          alt={image.alt}
          fill
          className="object-cover rounded-2xl"
          quality={70}
          priority={index < 8} // only first 8 priority
          loading={index < 8 ? "eager" : "lazy"}
          unoptimized
        />
      </div>
    </div>
  ))

  if (error) {
    return (
      <section className={`max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20 ${className}`}>
        <div className="text-center py-12">
          <Icon icon="mdi:alert-circle" className="w-12 sm:w-16 h-12 sm:h-16 text-red-400 mx-auto mb-4" />
          <p className="text-red-400 text-base sm:text-lg md:text-xl mb-4">{error}</p>
          <button
            onClick={loadImages}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300"
          >
            <Icon icon="mdi:refresh" className="w-4 sm:w-5 h-4 sm:h-5 inline mr-2" />
            Try Again
          </button>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* ✅ Added id="gallery" */}
      <section id="gallery" className={`max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20 ${className}`}>
        <div className="text-center mb-12 sm:mb-16">
          <h2
            style={{ fontFamily: "Merriweather, serif" }}
            className="text-3xl sm:text-4xl md:text-5xl text-green-200 mb-2 sm:mb-4 font-bold"
          >
            Safari Gallery
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-green-500 to-green-400 mx-auto rounded-full"></div>
          <p className="text-green-100 text-sm sm:text-base md:text-lg mt-4 sm:mt-6 max-w-2xl mx-auto">
            Discover the incredible wildlife and breathtaking moments captured during our safari adventures
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {isLoading
            ? Array.from({ length: 8 }, (_, idx) => <ImageSkeleton key={idx} />)
            : displayedImages.map((img, idx) => <ImageCard key={img.id} image={img} index={idx} />)}
        </div>

        {!isExpanded && images.length > 8 && (
          <div className="text-center mt-6 sm:mt-8">
            <button
              onClick={handleSeeMore}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition-colors duration-300"
            >
              See More ({images.length - 8} more)
            </button>
          </div>
        )}
      </section>

      {/* Zoom Modal */}
      {zoomedIndex !== null && images[zoomedIndex] && (
        <div
          className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 sm:p-6"
          onClick={closeZoom}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={closeZoom}
              className="absolute top-4 right-4 z-10 text-green-300 hover:text-green-400 transition-colors duration-300 p-2 rounded-full bg-black/50 backdrop-blur-sm"
            >
              <Icon icon="mdi:close" className="w-6 sm:w-8 h-6 sm:h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateImage("prev")
              }}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-10 text-green-300 hover:text-green-400 transition-colors duration-300 p-2 rounded-full bg-black/50 backdrop-blur-sm"
            >
              <Icon icon="mdi:chevron-left" className="w-6 sm:w-8 h-6 sm:h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateImage("next")
              }}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-10 text-green-300 hover:text-green-400 transition-colors duration-300 p-2 rounded-full bg-black/50 backdrop-blur-sm"
            >
              <Icon icon="mdi:chevron-right" className="w-6 sm:w-8 h-6 sm:h-8" />
            </button>

            <div className="relative w-full aspect-[4/3] max-h-[80vh]">
              <Image
                src={images[zoomedIndex].imageUrl || "/placeholder.svg"}
                alt={images[zoomedIndex].alt}
                fill
                className="rounded-2xl shadow-2xl object-contain mx-auto border border-green-900/30"
                quality={90}
                priority
                unoptimized
              />
            </div>

            <div className="mt-4 sm:mt-6 text-green-100 text-center bg-black/80 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-4 rounded-2xl shadow-lg max-w-2xl mx-auto border border-green-900/30">
              <p className="text-sm sm:text-base md:text-lg leading-relaxed">{images[zoomedIndex].description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Gallery