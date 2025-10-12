"use client"
import type React from "react"
import { useState, useEffect, memo, useRef, useCallback } from "react"
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
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [sectionVisible, setSectionVisible] = useState(false)

  useEffect(() => {
    loadImages()
  }, [])

  // Intersection Observer for section fade-in
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionVisible(true)
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    )

    sectionObserver.observe(section)
    return () => sectionObserver.disconnect()
  }, [])

  // Intersection Observer for individual images
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            setVisibleImages((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" }
    )

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
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

  const handleSeeMore = useCallback(() => {
    setIsExpanded(true)
    setDisplayedImages(images)
  }, [images])

  const openZoom = useCallback((index: number) => {
    setZoomedIndex(index)
    if (typeof document !== 'undefined') {
      document.body.style.overflow = "hidden"
    }
  }, [])

  const closeZoom = useCallback(() => {
    setZoomedIndex(null)
    if (typeof document !== 'undefined') {
      document.body.style.overflow = "auto"
    }
  }, [])

  const navigateImage = useCallback(
    (direction: "prev" | "next") => {
      if (zoomedIndex === null) return
      const newIndex =
        direction === "prev" ? (zoomedIndex - 1 + images.length) % images.length : (zoomedIndex + 1) % images.length
      setZoomedIndex(newIndex)
    },
    [zoomedIndex, images.length]
  )

  // Keyboard navigation
  useEffect(() => {
    if (zoomedIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeZoom()
      else if (e.key === "ArrowLeft") navigateImage("prev")
      else if (e.key === "ArrowRight") navigateImage("next")
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [zoomedIndex, closeZoom, navigateImage])

  const ImageSkeleton = memo(() => (
    <div className="bg-gray-800/50 rounded-2xl animate-pulse border border-green-900/30 overflow-hidden">
      <div className="w-full aspect-[4/3] bg-gradient-to-br from-gray-700/50 via-gray-600/50 to-gray-700/50"></div>
    </div>
  ))
  ImageSkeleton.displayName = "ImageSkeleton"

  const ImageCard = memo<{ image: GalleryImage; index: number }>(({ image, index }) => {
    const cardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const card = cardRef.current
      if (card && observerRef.current) {
        observerRef.current.observe(card)
      }
      return () => {
        if (card && observerRef.current) {
          observerRef.current.unobserve(card)
        }
      }
    }, [])

    const isVisible = visibleImages.has(index)

    return (
      <div
        ref={cardRef}
        data-index={index}
        className={`relative overflow-hidden rounded-2xl shadow-xl cursor-pointer transform will-change-transform transition-all duration-700 ease-out border border-green-900/30 group ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95"
        }`}
        style={{ transitionDelay: `${(index % 4) * 100}ms` }}
        onClick={() => openZoom(index)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            openZoom(index)
          }
        }}
        aria-label={`View ${image.alt} in fullscreen`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-2xl pointer-events-none"></div>
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <div className="bg-green-600/90 rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Icon icon="mdi:magnify-plus" className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="relative w-full aspect-[4/3]">
          <Image
            src={image.imageUrl || "/placeholder.svg"}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 25vw, 25vw"
            className="object-cover rounded-2xl transform group-hover:scale-110 transition-transform duration-500"
            quality={75}
            priority={index < 4}
            loading={index < 4 ? "eager" : "lazy"}
            unoptimized
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/placeholder.svg"
            }}
          />
        </div>

        {image.description && (
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20 rounded-b-2xl">
            <p className="text-white text-xs sm:text-sm line-clamp-2">{image.description}</p>
          </div>
        )}
      </div>
    )
  })
  ImageCard.displayName = "ImageCard"

  if (error) {
    return (
      <section className={`max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20 ${className}`}>
        <div className="text-center py-12 transform transition-all duration-500 hover:scale-105">
          <Icon icon="mdi:alert-circle" className="w-12 sm:w-16 h-12 sm:h-16 text-red-400 mx-auto mb-4 animate-pulse" />
          <p className="text-red-400 text-base sm:text-lg md:text-xl mb-4">{error}</p>
          <button
            onClick={loadImages}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/50"
            aria-label="Retry loading gallery images"
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
      <section
        ref={sectionRef}
        id="gallery"
        className={`max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20 transition-all duration-1000 ${className}`}
        style={{
          opacity: sectionVisible ? 1 : 0,
          transform: sectionVisible ? 'translateY(0)' : 'translateY(3rem)'
        }}
      >
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 mb-6 bg-white/5 border border-white/10 rounded-full px-4 sm:px-6 py-2 sm:py-3 transform transition-all duration-500 hover:scale-105 hover:bg-white/10">
            <Icon icon="mdi:camera" className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
            <span className="text-green-300 font-medium tracking-wider uppercase text-xs sm:text-sm">
              Wildlife Moments
            </span>
            <Icon icon="mdi:image-multiple" className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-green-100 mb-4 font-bold font-serif">
            Safari Gallery
          </h2>
          <div className="w-20 sm:w-24 lg:w-28 h-1 bg-gradient-to-r from-green-500 via-emerald-400 to-green-500 mx-auto rounded-full"></div>
          <p className="text-green-100 text-sm sm:text-base md:text-lg lg:text-xl mt-4 sm:mt-6 max-w-2xl mx-auto leading-relaxed">
            Discover the incredible wildlife and breathtaking moments captured during our safari adventures
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {isLoading
            ? Array.from({ length: 8 }, (_, idx) => <ImageSkeleton key={idx} />)
            : displayedImages.map((img, idx) => <ImageCard key={img.id} image={img} index={idx} />)}
        </div>

        {!isExpanded && images.length > 8 && (
          <div className="text-center mt-8 sm:mt-12">
            <button
              onClick={handleSeeMore}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-green-500/50 border border-green-400/20"
              aria-label={`Show ${images.length - 8} more gallery images`}
            >
              <Icon icon="mdi:image-plus" className="w-5 h-5" />
              See More ({images.length - 8} more)
            </button>
          </div>
        )}
      </section>

      {zoomedIndex !== null && images[zoomedIndex] && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 sm:p-6"
          style={{
            animation: 'galleryFadeIn 0.3s ease-out'
          }}
          onClick={closeZoom}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <div 
            className="relative max-w-5xl w-full"
            style={{
              animation: 'galleryScaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <button
              onClick={closeZoom}
              className="absolute -top-12 sm:-top-14 right-0 z-10 text-green-300 hover:text-green-400 transition-all duration-300 p-3 rounded-full bg-black/50 hover:bg-black/70 transform hover:scale-110 hover:rotate-90 border border-green-500/30"
              aria-label="Close image viewer"
            >
              <Icon icon="mdi:close" className="w-6 sm:w-8 h-6 sm:h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateImage("prev")
              }}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-10 text-green-300 hover:text-green-400 transition-all duration-300 p-3 rounded-full bg-black/50 hover:bg-black/70 hover:scale-110 border border-green-500/30"
              aria-label="Previous image"
            >
              <Icon icon="mdi:chevron-left" className="w-6 sm:w-8 h-6 sm:h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateImage("next")
              }}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-10 text-green-300 hover:text-green-400 transition-all duration-300 p-3 rounded-full bg-black/50 hover:bg-black/70 hover:scale-110 border border-green-500/30"
              aria-label="Next image"
            >
              <Icon icon="mdi:chevron-right" className="w-6 sm:w-8 h-6 sm:h-8" />
            </button>

            <div className="relative w-full aspect-[4/3] max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl border border-green-500/30">
              <Image
                src={images[zoomedIndex].imageUrl || "/placeholder.svg"}
                alt={images[zoomedIndex].alt}
                fill
                sizes="100vw"
                className="object-contain"
                quality={90}
                priority
                unoptimized
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg"
                }}
              />
            </div>

            <div className="absolute top-4 left-4 bg-black/70 px-4 py-2 rounded-full text-green-300 text-sm font-medium border border-green-500/30">
              {zoomedIndex + 1} / {images.length}
            </div>

            {images[zoomedIndex].description && (
              <div 
                className="mt-4 sm:mt-6 text-green-100 text-center bg-black/80 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-lg max-w-2xl mx-auto border border-green-900/30"
                style={{
                  animation: 'gallerySlideUp 0.5s ease-out 0.2s backwards'
                }}
              >
                <p className="text-sm sm:text-base md:text-lg leading-relaxed">{images[zoomedIndex].description}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes galleryFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes galleryScaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes gallerySlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}

export default Gallery