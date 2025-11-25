"use client"

import { useEffect, useState, useRef, memo, useCallback, useLayoutEffect } from "react"
import { Icon } from "@iconify/react"
import Image from "next/image"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"

const SkeletonLoader = memo(({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse ${className}`}>
    <div className="h-full w-full bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-800/50 rounded-2xl relative overflow-hidden">
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  </div>
))
SkeletonLoader.displayName = "SkeletonLoader"

/* Inline luxury versions of Gallery, Reviews, Recommended Safaris */

type ThemeMode = "light" | "dark"

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

interface InlineGalleryImage {
  id: string
  imageUrl: string
  description: string
  alt: string
  timestamp: Date
  featured?: boolean
}

const GALLERY_INITIAL_COUNT = 6

const GallerySection = memo(({ theme }: { theme: ThemeMode }) => {
  const isDark = theme === 'dark'
  const [allImages, setAllImages] = useState<InlineGalleryImage[]>([])
  const [showAllModal, setShowAllModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null)
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({})
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true)
        const q = query(collection(db, "gallery"), orderBy("timestamp", "desc"))
        const snapshot = await getDocs(q)
        const galleryImages: InlineGalleryImage[] = snapshot.docs.map((doc) => {
          const data = doc.data() as any
          return {
            id: doc.id,
            imageUrl: data.imageUrl,
            description: data.description,
            alt: data.alt || `Udawalawe safari - ${data.description || 'Wildlife moment'}`,
            timestamp: data.timestamp?.seconds ? new Date(data.timestamp.seconds * 1000) : new Date(),
            featured: data.featured || false,
          }
        })
        setAllImages(galleryImages)
      } catch (e) {
        console.error(e)
        setError("Failed to load gallery")
      } finally {
        setLoading(false)
      }
    }
    loadImages()
  }, [])

  const displayedImages = allImages.slice(0, GALLERY_INITIAL_COUNT)

  const openZoom = (index: number) => {
    setZoomedIndex(index)
    document.body.style.overflow = 'hidden'
  }

  const closeZoom = () => {
    setZoomedIndex(null)
    document.body.style.overflow = 'auto'
  }

  const navigateZoom = (direction: 'prev' | 'next') => {
    if (zoomedIndex === null || allImages.length === 0) return
    if (direction === 'prev') {
      setZoomedIndex((zoomedIndex - 1 + allImages.length) % allImages.length)
    } else {
      setZoomedIndex((zoomedIndex + 1) % allImages.length)
    }
  }

  useEffect(() => {
    if (zoomedIndex === null) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeZoom()
      else if (e.key === 'ArrowLeft') navigateZoom('prev')
      else if (e.key === 'ArrowRight') navigateZoom('next')
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [zoomedIndex, allImages.length])

  if (error) {
    return (
      <section id="gallery" className="py-20 text-center">
        <Icon icon="mdi:alert-circle" className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <p className="text-red-400 mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="px-6 py-3 bg-green-600 text-white rounded-full">
          Retry
        </button>
      </section>
    )
  }

  return (
    <>
      <section ref={sectionRef} id="gallery" className="py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ backgroundColor: isDark ? '#08110d' : '#f0f9f4' }}>
          <div className="absolute inset-0" style={{
            background: isDark
              ? 'radial-gradient(900px 600px at 30% 40%, rgba(63,140,93,0.15), transparent)'
              : 'radial-gradient(900px 600px at 30% 40%, rgba(111,196,144,0.2), transparent)'
          }} />
        </div>

        <div className="max-w-[2000px] mx-auto px-3 xs:px-4 sm:px-6 md:px-8">
          {/* Clean Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-1 h-1 rounded-full bg-green-500" />
              <span className="text-xs uppercase tracking-widest font-medium" style={{ color: isDark ? '#6fcf97' : '#2e6a46' }}>
                Wildlife Gallery
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3" style={{ color: isDark ? '#ffffff' : '#0f2419' }}>
              CAPTURED MOMENTS
            </h2>
            <p className="text-base max-w-2xl" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(16,35,26,0.6)' }}>
              Every safari tells a unique story
            </p>
          </div>

          {/* Unique 6-Image Grid Layout */}
          <div className="grid grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] md:auto-rows-[260px] gap-3 sm:gap-4 md:gap-5 max-w-5xl mx-auto">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-xl overflow-hidden animate-pulse ${
                    i === 0 ? 'col-span-4 sm:col-span-2 row-span-2' : 
                    i === 1 ? 'col-span-4 sm:col-span-2 row-span-1' : 
                    i === 2 ? 'col-span-4 sm:col-span-2 row-span-1' : 
                    'col-span-2 sm:col-span-1 row-span-1'
                  }`}
                  style={{ 
                    background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
                  }}
                />
              ))
            ) : (
              allImages.slice(0, 6).map((img, index) => (
                <div
                  key={img.id}
                  className={`cursor-pointer group relative rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
                    index === 0 ? 'col-span-4 sm:col-span-2 row-span-2' : 
                    index === 1 ? 'col-span-4 sm:col-span-2 row-span-1' : 
                    index === 2 ? 'col-span-4 sm:col-span-2 row-span-1' : 
                    'col-span-2 sm:col-span-1 row-span-1'
                  }`}
                  onClick={() => openZoom(index)}
                  style={{
                    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`
                  }}
                >
                  {/* Skeleton Loader */}
                  {!imageLoaded[img.id] && (
                    <div className="absolute inset-0 animate-pulse z-10" style={{
                      background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
                    }}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon icon="mdi:image" className="w-12 h-12 opacity-20" style={{ color: isDark ? '#fff' : '#000' }} />
                      </div>
                    </div>
                  )}
                  <Image
                    src={img.imageUrl}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className={`object-cover transition-all duration-500 group-hover:scale-110 ${
                      imageLoaded[img.id] ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ filter: isDark ? 'brightness(0.9)' : 'brightness(1)' }}
                    loading="lazy"
                    onLoad={() => setImageLoaded(prev => ({ ...prev, [img.id]: true }))}
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center backdrop-blur-sm" style={{ background: 'rgba(63,140,93,0.9)' }}>
                      <Icon icon="mdi:magnify-plus" className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                  </div>
                  {img.description && (
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black via-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-xs sm:text-sm font-medium line-clamp-2">{img.description}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* View All Button - Only if more than 6 images */}
          {!loading && allImages.length > 6 && (
            <div className="text-center mt-8 sm:mt-10">
              <button
                onClick={() => setShowAllModal(true)}
                className="group px-8 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base transition-all hover:scale-105"
                style={{
                  background: isDark ? 'linear-gradient(135deg, #3f8c5d, #2e6a46)' : 'linear-gradient(135deg, #4fae6e, #3a8853)',
                  color: '#ffffff',
                  boxShadow: '0 8px 24px rgba(63, 140, 93, 0.3)'
                }}
              >
                <span className="flex items-center gap-2">
                  <Icon icon="mdi:grid" className="w-5 h-5" />
                  View All {allImages.length} Photos
                </span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* View All Modal - Grid View */}
      {showAllModal && (
        <div
          className="fixed inset-0 bg-black/95 z-[9999] overflow-y-auto"
          onClick={() => setShowAllModal(false)}
        >
          <div className="min-h-screen py-8 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-8 sticky top-0 bg-black/90 backdrop-blur-sm py-4 z-10">
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  All Photos ({allImages.length})
                </h3>
                <button
                  onClick={() => setShowAllModal(false)}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Close"
                >
                  <Icon icon="mdi:close" className="w-7 h-7 text-white" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5" onClick={(e) => e.stopPropagation()}>
                {allImages.map((img, index) => (
                  <div
                    key={img.id}
                    className="cursor-pointer group relative rounded-xl overflow-hidden aspect-square transition-all duration-300 hover:scale-[1.02]"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowAllModal(false)
                      openZoom(index)
                    }}
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    <Image
                      src={img.imageUrl}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-all duration-500 group-hover:scale-110"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm" style={{ background: 'rgba(63,140,93,0.9)' }}>
                        <Icon icon="mdi:magnify-plus" className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    {img.description && (
                      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-gradient-to-t from-black via-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white text-xs font-medium line-clamp-2">{img.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Zoom Modal */}
      {zoomedIndex !== null && allImages[zoomedIndex] && (
        <div
          className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 pt-24"
          onClick={closeZoom}
        >
          <button
            onClick={closeZoom}
            className="absolute top-24 right-4 sm:right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            aria-label="Close"
          >
            <Icon icon="mdi:close" className="w-7 h-7 text-white" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); navigateZoom('prev') }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Previous"
          >
            <Icon icon="mdi:chevron-left" className="w-7 h-7 text-white" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); navigateZoom('next') }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Next"
          >
            <Icon icon="mdi:chevron-right" className="w-7 h-7 text-white" />
          </button>

          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full aspect-[4/3] max-h-[85vh]">
              <Image
                src={allImages[zoomedIndex].imageUrl}
                alt={allImages[zoomedIndex].alt}
                fill
                className="object-contain"
                quality={90}
                priority
                unoptimized
              />
            </div>
            {allImages[zoomedIndex].description && (
              <div className="mt-4 text-center">
                <p className="text-white text-sm sm:text-base bg-black/50 inline-block px-6 py-3 rounded-full">
                  {allImages[zoomedIndex].description}
                </p>
              </div>
            )}
            <div className="absolute top-2 left-2 bg-black/70 px-4 py-2 rounded-full text-white text-sm">
              {zoomedIndex + 1} / {allImages.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
})
GallerySection.displayName = 'GallerySection'

interface InlineReview { id: string; author: string; rating: number; date: string; text: string }
const ReviewsSection = memo(({ theme }: { theme: ThemeMode }) => {
  const isDark = theme === 'dark'
  const [reviews, setReviews] = useState<InlineReview[]>([])
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchStart = useRef<number | null>(null)
  const touchEnd = useRef<number | null>(null)

  useEffect(() => { fetchReviews() }, [])
  const fetchReviews = async () => {
    try {
      setLoading(true)
      const res = await fetch('/reviews.json')
      if (!res.ok) throw new Error('Failed to load reviews')
      const data: InlineReview[] = await res.json()
      setReviews(data)
      setIndex(0)
    } catch (e) {
      console.error(e); setError('Failed to load reviews')
    } finally { setLoading(false) }
  }
  const stop = () => { if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null } }
  const start = () => { stop(); if (reviews.length > 1) intervalRef.current = setInterval(() => next(), 6000) }
  useEffect(() => { start(); return () => stop() }, [reviews])
  const next = () => { if (!reviews.length) return; setIndex(p => (p + 1) % reviews.length) }
  const prev = () => { if (!reviews.length) return; setIndex(p => (p - 1 + reviews.length) % reviews.length) }
  const onTouchStart = (e: React.TouchEvent) => { stop(); touchStart.current = e.changedTouches[0].screenX }
  const onTouchEnd = (e: React.TouchEvent) => { touchEnd.current = e.changedTouches[0].screenX; if (touchStart.current !== null && touchEnd.current !== null) { const diff = touchStart.current - touchEnd.current; if (diff > 50) next(); if (diff < -50) prev() } touchStart.current = null; touchEnd.current = null; start() }
  const Stars = ({ rating }: { rating: number }) => (
    <div className="flex">{Array.from({ length:5 }).map((_,i)=>(<Icon key={i} icon={i < rating ? 'mdi:star' : 'mdi:star-outline'} className={`w-4 h-4 ${(i<rating)?'text-yellow-400':'text-neutral-600'}`} />))}</div>
  )
  if (error) return <section id="reviews" className="py-20 text-center"><p className="text-red-400">{error}</p></section>
  return (
    <section id="reviews" className="py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onMouseEnter={stop} onMouseLeave={start}>
      <div className="absolute inset-0" style={{
        background: isDark
          ? 'radial-gradient(1000px 600px at 50% 30%, rgba(63,140,93,0.1), transparent)'
          : 'radial-gradient(1000px 600px at 50% 30%, rgba(111,196,144,0.15), transparent)'
      }} />
      
      <div className="max-w-[2000px] mx-auto px-3 xs:px-4 sm:px-6 md:px-8 relative z-10">
        {/* Clean Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-1 h-1 rounded-full bg-yellow-400" />
            <span className="text-xs uppercase tracking-widest font-medium" style={{ color: isDark ? '#fcd34d' : '#f59e0b' }}>
              Testimonials
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3" style={{ color: isDark ? '#ffffff' : '#0f2419' }}>
            GUEST STORIES
          </h2>
          <p className="text-base max-w-2xl" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(16,35,26,0.6)' }}>
            Real experiences from our safari adventures
          </p>
        </div>

        {loading ? (
          <div className="max-w-2xl mx-auto p-8 rounded-2xl animate-pulse" style={{ background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} />
        ) : (
          <div className="overflow-hidden relative">
            <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${index * 100}%)` }}>
              {reviews.map(r => (
                <div key={r.id} className="flex-shrink-0 w-full px-2 sm:px-4">
                  <article className="max-w-2xl mx-auto p-4 sm:p-5 md:p-6 rounded-xl backdrop-blur-sm" style={{
                    background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`
                  }}>
                    <div className="flex items-center gap-2 mb-3">
                      <Stars rating={r.rating} />
                    </div>
                    <p className="text-sm sm:text-base md:text-lg font-light leading-relaxed mb-4" style={{ color: isDark ? '#ffffff' : '#0f2419' }}>
                      "{r.text}"
                    </p>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-base sm:text-lg" style={{
                        background: 'linear-gradient(135deg, #3f8c5d, #6fcf97)',
                        color: '#ffffff'
                      }}>
                        {r.author.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-black text-sm sm:text-base" style={{ color: isDark ? '#ffffff' : '#0f2419' }}>{r.author}</h3>
                        <p className="text-xs sm:text-sm" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>{r.date}</p>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
            
            {reviews.length > 1 && (
              <div className="flex justify-center items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
                <button
                  onClick={prev}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}
                >
                  <Icon icon="mdi:chevron-left" className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: isDark ? '#ffffff' : '#0f2419' }} />
                </button>
                
                <div className="flex gap-2">
                  {reviews.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      className={`h-1 rounded-full transition-all ${i === index ? 'w-8' : 'w-1'}`}
                      style={{ background: i === index ? '#3f8c5d' : isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }}
                    />
                  ))}
                </div>
                
                <button
                  onClick={next}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}
                >
                  <Icon icon="mdi:chevron-right" className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: isDark ? '#ffffff' : '#0f2419' }} />
                </button>
              </div>
            )}
          </div>
        )}

        <div className="text-center mt-8 sm:mt-10">
          <a
            href="https://share.google/LNUBk4T2iiD6jU0ly"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold text-sm sm:text-base transition-all hover:scale-105"
            style={
              {
                background: isDark ? 'linear-gradient(135deg, #3f8c5d, #2e6a46)' : 'linear-gradient(135deg, #4fae6e, #3a8853)',
                color: '#ffffff',
                boxShadow: '0 10px 30px rgba(63, 140, 93, 0.25)'
              }
            }
          >
            <Icon icon="mdi:google" className="w-5 h-5" />
            See More Reviews
          </a>
        </div>
      </div>
    </section>
  )
})
ReviewsSection.displayName = 'ReviewsSection'

const RecommendedSafariSection = memo(({ theme }: { theme: ThemeMode }) => {
  const isDark = theme === 'dark'
  return (
    <section id="recommended-safari" className="py-12 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'radial-gradient(800px 500px at 10% 30%, rgba(63,140,93,0.12), transparent 70%)'
            : 'radial-gradient(800px 500px at 10% 30%, rgba(141,216,135,0.25), transparent 70%)'
        }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 text-center">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: isDark ? '#ffffff' : '#0f2419' }}>Our Safari Recommendation</h2>
          <div className="w-20 h-1 mx-auto mb-3 rounded-full" style={{ backgroundImage: 'linear-gradient(90deg,var(--lux-gold),#e3d7b0)' }} />
          <p className="text-sm sm:text-base max-w-xl mx-auto" style={{ color: isDark ? 'rgba(245,247,244,0.7)' : 'rgba(16,35,26,0.72)' }}>
            If you’re visiting Udawalawe, we also recommend this trusted safari service partner.
          </p>
        </div>
        <article
          className="max-w-xl mx-auto p-6 rounded-2xl backdrop-blur-xl border lux-border shadow-xl transition hover:scale-[1.01]"
          style={{ backgroundColor: isDark ? 'rgba(12,26,19,0.6)' : 'rgba(255,255,255,0.9)', boxShadow: isDark ? '0 18px 35px rgba(0,0,0,0.3)' : '0 18px 35px rgba(63,140,93,0.16)' }}
        >
          <h3 className="text-lg sm:text-xl font-black mb-2" style={{ color: isDark ? '#ffffff' : '#0f2419' }}>Udawalawe Chaam Safari and Tours</h3>
          <p className="text-sm sm:text-base mb-4 font-light" style={{ color: isDark ? 'rgba(245,247,244,0.72)' : 'rgba(16,35,26,0.7)' }}>
            A recommended safari experience for exploring Udawalawe National Park. Known for excellent guiding, comfort, and amazing elephant sightings.
          </p>
          <a
            href="https://g.co/kgs/7EjQmM7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-medium transition lux-border"
            style={{
              color: theme === 'dark' ? 'var(--lux-gold)' : 'var(--lux-gold-600)',
              backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(79,174,110,0.14)'
            }}
          >
            <Icon icon="mdi:google" className="w-5 h-5" />View on Google
          </a>
        </article>
      </div>
    </section>
  )
})
RecommendedSafariSection.displayName = 'RecommendedSafariSection'

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentHero, setCurrentHero] = useState(0)
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [scrollY, setScrollY] = useState(0)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  
  const aboutRef = useRef<HTMLElement>(null)
  const packagesRef = useRef<HTMLElement>(null)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" })
      setMenuOpen(false)
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % 4)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px 0px -50px 0px" }
    )

    const sections = [aboutRef.current, packagesRef.current, footerRef.current]
    sections.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const heroImages = [
    { src: "/assets/hero1.webp", priority: true },
    { src: "/assets/hero2.webp", priority: false },
    { src: "/assets/hero3.webp", priority: false },
    { src: "/assets/hero4.webp", priority: false }
  ]

  const packages = [
    {
      title: "3-Hour Safari",
      description: "Quick but immersive experience into the Udawalawe wilderness.",
      duration: "3 hours",
      icon: "mdi:clock-fast",
      highlights: ["Morning/Evening slots", "Essential wildlife zones", "Perfect for tight schedules"]
    },
    {
      title: "4-Hour Safari",
      description: "Extended wildlife spotting with peaceful terrain navigation.",
      duration: "4 hours",
      icon: "mdi:binoculars",
      highlights: ["Extended viewing time", "Multiple habitats", "Photography focused"]
    },
    {
      title: "Half-Day Safari",
      description: "Ideal balance of wildlife viewing and scenic breaks.",
      duration: "Around 6 hours",
      icon: "mdi:weather-sunset",
      highlights: ["Comprehensive coverage", "Refreshment breaks", "Best value option"]
    },
    {
      title: "Full-Day Safari",
      description: "Complete experience with lunch stop and full coverage.",
      duration: "Around 10 hours",
      icon: "mdi:compass",
      highlights: ["All park zones", "Lunch included", "Maximum wildlife sightings"]
    },
    {
      title: "Custom Safari",
      description: "Tailored route and timing based on your preferences.",
      duration: "Flexible",
      icon: "mdi:map-marker-path",
      highlights: ["Your schedule", "Personalized route", "Special requests welcome"]
    },
  ]

  const isAboutVisible = visibleSections.has("about")
  const isPackagesVisible = visibleSections.has("packages")
  const isFooterVisible = visibleSections.has("contact")

  // Theme handling
  const [theme, setTheme] = useState<ThemeMode>('dark')
  const [isThemeReady, setIsThemeReady] = useState(false)

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return
    const saved = window.localStorage.getItem('theme') as ThemeMode | null
    const nextTheme = saved === 'light' || saved === 'dark'
      ? saved
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

    document.documentElement.setAttribute('data-theme', nextTheme)
    document.documentElement.classList.toggle('dark', nextTheme === 'dark')
    setTheme(nextTheme)
    setIsThemeReady(true)
  }, [])

  useEffect(() => {
    if (!isThemeReady || typeof window === 'undefined') return
    window.localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme, isThemeReady])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const updateFromSystem = (event: MediaQueryListEvent) => {
      const stored = window.localStorage.getItem('theme') as ThemeMode | null
      if (stored === 'light' || stored === 'dark') return
      setTheme(event.matches ? 'dark' : 'light')
    }
    mediaQuery.addEventListener('change', updateFromSystem)
    return () => mediaQuery.removeEventListener('change', updateFromSystem)
  }, [])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  const isDark = theme === 'dark'
  const headerBackgroundClass = scrollY > 50
    ? (isDark ? 'backdrop-blur-xl bg-black/45 shadow-lg' : 'backdrop-blur-xl bg-white/80 shadow-lg')
    : (isDark ? 'bg-transparent' : 'backdrop-blur-xl bg-white/60 shadow-sm')

  const getAnimationStyle = useCallback((visible: boolean, delay = 0) => {
    if (prefersReducedMotion) return {}
    return {
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(40px)',
      transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
    }
  }, [prefersReducedMotion])

  return (
    <div
      className="min-h-screen text-white font-sans antialiased relative"
      style={{ opacity: isThemeReady ? 1 : 0, transition: 'opacity 0.2s ease', pointerEvents: isThemeReady ? 'auto' : 'none' }}
    >
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div
          className="absolute top-[5%] left-[3%] w-24 h-24 sm:w-32 sm:h-32 rounded-full blur-3xl"
          style={{ backgroundColor: isDark ? 'color-mix(in oklab, var(--lux-gold) 18%, transparent)' : 'color-mix(in oklab, var(--lux-gold) 32%, rgba(255,255,255,0.9))' }}
        />
        <div
          className="absolute bottom-[15%] right-[5%] w-28 h-28 sm:w-40 sm:h-40 rounded-full blur-3xl"
          style={{ backgroundColor: isDark ? 'color-mix(in oklab, var(--lux-gold) 12%, transparent)' : 'color-mix(in oklab, var(--lux-gold) 24%, rgba(255,255,255,0.92))' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: isDark ? 'radial-gradient(1200px 700px at 80% -10%, rgba(63,140,93,0.16), transparent 60%)' : 'radial-gradient(1200px 700px at 80% -10%, rgba(141,216,135,0.25), transparent 60%)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? 'linear-gradient(180deg, rgba(12,13,14,0.95), rgba(15,26,20,0.92) 35%, rgba(12,13,14,0.98))'
              : 'linear-gradient(180deg, rgba(231,245,236,0.88), rgba(239,248,242,0.72) 35%, rgba(231,245,236,0.9))'
          }}
        />
      </div>

      {/* Clean Professional Navigation */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${headerBackgroundClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <button onClick={() => scrollTo('hero')} className="flex items-center gap-2 sm:gap-3 group" aria-label="Home">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                <Image src="/logo.webp" alt="Udawalawe Safari" fill sizes="48px" className="object-contain" />
              </div>
              <span className="font-black text-lg sm:text-xl" style={{ color: isDark ? '#ffffff' : '#0f2419' }}>Udawalawe Safari</span>
            </button>

            <div className="flex items-center gap-2">
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-8">
                {["About", "Packages", "Gallery", "Reviews", "Contact"].map(item => (
                  <button
                    key={item}
                    onClick={() => scrollTo(item.toLowerCase())}
                    className="text-sm font-medium transition-colors duration-200 hover:text-[var(--lux-gold-400)]" 
                    style={{ color: 'var(--lux-ivory)' }}
                  >
                    {item}
                  </button>
                ))}
                <button
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-emerald-100/60'}`}
                  style={{
                    color: 'var(--lux-ivory)',
                    backgroundColor: isDark ? 'transparent' : 'rgba(79,174,110,0.16)'
                  }}
                >
                  <Icon icon={theme === 'dark' ? 'mdi:white-balance-sunny' : 'mdi:moon-waxing-crescent'} className="w-5 h-5" />
                </button>
                <a
                  href="https://wa.me/94776103421?text=Hello%20I%20want%20to%20book%20a%20safari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all active:scale-95"
                  style={{ backgroundImage: 'linear-gradient(90deg, var(--lux-gold-400), var(--lux-gold-600))', color: isDark ? '#08110d' : '#0f2419', boxShadow: isDark ? '0 12px 25px rgba(63,140,93,0.25)' : '0 12px 25px rgba(63,140,93,0.18)' }}
                >
                  <Icon icon="mdi:whatsapp" className="w-4 h-4" />
                  Book Safari
                </a>
              </nav>

              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className={`lg:hidden p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-emerald-100/70'}`}
                style={{
                  color: 'var(--lux-ivory)',
                  backgroundColor: isDark ? 'transparent' : 'rgba(79,174,110,0.18)'
                }}
              >
                <Icon icon={theme === 'dark' ? 'mdi:white-balance-sunny' : 'mdi:moon-waxing-crescent'} className="w-5 h-5" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-emerald-100/70'}`}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                style={{ color: 'var(--lux-ivory)' }}
              >
                <Icon icon={menuOpen ? 'mdi:close' : 'mdi:menu'} className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="lg:hidden backdrop-blur-xl border-t"
            style={{
              backgroundColor: isDark ? 'rgba(0,0,0,0.9)' : 'rgba(248,252,249,0.92)',
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(63,140,93,0.2)'
            }}
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
              {["About", "Packages", "Gallery", "Reviews", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => { scrollTo(item.toLowerCase()); setMenuOpen(false); }}
                  className={`text-left py-3 px-4 rounded-lg transition-colors text-sm font-medium ${isDark ? 'hover:bg-white/10' : 'hover:bg-emerald-100/70'}`}
                  style={{ color: isDark ? 'var(--lux-ivory)' : '#0f2419' }}
                >
                  {item}
                </button>
              ))}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={toggleTheme}
                  className={`flex-1 py-3 px-4 rounded-lg transition-colors text-sm font-medium ${isDark ? 'hover:bg-white/10' : 'hover:bg-emerald-100/70'}`}
                  style={{
                    color: 'var(--lux-ivory)',
                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(79,174,110,0.16)'
                  }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Icon icon={theme === 'dark' ? 'mdi:white-balance-sunny' : 'mdi:moon-waxing-crescent'} className="w-5 h-5" />
                    <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                  </span>
                </button>
                <a
                  href="https://wa.me/94776103421?text=Hello%20I%20want%20to%20book%20a%20safari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold"
                  style={{ backgroundImage: 'linear-gradient(90deg, var(--lux-gold-400), var(--lux-gold-600))', color: isDark ? '#08110d' : '#0f2419' }}
                  onClick={() => setMenuOpen(false)}
                >
                  <Icon icon="mdi:whatsapp" className="w-4 h-4" />
                  Book Safari
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      <section
        id="hero"
        className="relative flex items-center overflow-hidden pt-20 sm:pt-24 md:pt-28 pb-14 sm:pb-16 lg:pb-20"
        style={{ minHeight: '100svh' }}
      >
        {/* Full Screen Background */}
        <div className="absolute inset-0">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentHero ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={img.src}
                alt={`Safari Wildlife ${index + 1}`}
                fill
                sizes="100vw"
                className="object-cover"
                style={{ 
                  filter: isDark ? "brightness(0.35) contrast(1.1)" : "brightness(0.65) contrast(1.05)",
                  transform: index === currentHero ? 'scale(1)' : 'scale(1.1)',
                  transition: 'transform 20s ease-out'
                }}
                priority={img.priority}
                quality={90}
                unoptimized
              />
            </div>
          ))}
          
          {/* Minimal Gradient Overlay */}
          <div 
            className="absolute inset-0" 
            style={{
              background: isDark 
                ? 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.6) 100%)'
                : 'linear-gradient(to bottom, rgba(16,35,26,0.4) 0%, rgba(16,35,26,0.2) 50%, rgba(16,35,26,0.7) 100%)'
            }}
          />
        </div>

        {/* Clean Content */}
        <div className="relative z-10 w-full max-w-[2000px] mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="max-w-5xl">
            {/* Minimalist Badge */}
            <div className="mb-4 sm:mb-6 md:mb-8 inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full backdrop-blur-md" 
              style={{
                background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.25)',
                border: isDark ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.4)'
              }}
            >
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] xs:text-xs sm:text-sm font-medium tracking-wider sm:tracking-widest uppercase" style={{ color: isDark ? 'rgba(255,255,255,0.9)' : '#ffffff' }}>Udawalawe Safari Service by Nuwan</span>
            </div>

            {/* Bold, Clean Typography */}
            <h1 className="mb-5 sm:mb-7">
              <span
                className="block font-light uppercase tracking-wide"
                style={{
                  color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.95)',
                  fontSize: 'clamp(0.85rem, 2.6vw, 1.75rem)',
                  letterSpacing: '0.18em',
                  marginBottom: 'clamp(0.4rem, 1.5vw, 1rem)'
                }}
              >
                Experience
              </span>
              <span
                className="block font-black"
                style={{
                  color: '#ffffff',
                  fontSize: 'clamp(3rem, 10vw, 11rem)',
                  lineHeight: 0.92,
                  marginBottom: 'clamp(0.6rem, 1.8vw, 1.4rem)',
                  textShadow: isDark ? '0 4px 20px rgba(0,0,0,0.5)' : '0 4px 20px rgba(0,0,0,0.3)'
                }}
              >
                WILD
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #6fcf97 0%, #3f8c5d 50%, #90ee90 100%)',
                    WebkitTextStroke: isDark ? '2px rgba(255,255,255,0.1)' : '2px rgba(255,255,255,0.15)'
                  }}
                >
                  SAFARI
                </span>
              </span>
              <span
                className="block font-light tracking-wide"
                style={{
                  color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.95)',
                  fontSize: 'clamp(0.95rem, 2.5vw, 1.9rem)'
                }}
              >
                Udawalawe National Park, Sri Lanka
              </span>
            </h1>

            {/* Clean Description */}
            <p
              className="font-light max-w-2xl leading-relaxed mb-6 sm:mb-8 md:mb-10"
              style={{
                color: isDark ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.95)',
                fontSize: 'clamp(0.95rem, 2.7vw, 1.5rem)'
              }}
            >
              Experience raw nature with majestic elephants, exotic birds, and untamed wilderness.
            </p>

            {/* Modern CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 md:mb-16">
              <a
                href="https://wa.me/94776103421?text=I'm%20interested%20in%20booking%20a%20safari"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-full font-bold overflow-hidden transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #3f8c5d, #2e6a46)',
                  boxShadow: '0 10px 40px rgba(63,140,93,0.4)',
                  fontSize: 'clamp(0.95rem, 2.4vw, 1.25rem)',
                  paddingInline: 'clamp(1.5rem, 4vw, 2.5rem)',
                  paddingBlock: 'clamp(0.75rem, 2.6vw, 1.2rem)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/30 to-green-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative flex items-center justify-center gap-2 sm:gap-3 text-white">
                  <Icon icon="mdi:whatsapp" className="w-5 h-5 sm:w-6 sm:h-6" />
                  Book Now
                </span>
              </a>
              
              <button
                onClick={() => scrollTo("packages")}
                className="group rounded-full font-semibold backdrop-blur-md border-2 transition-all duration-300 hover:scale-105"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.25)',
                  borderColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.5)',
                  color: '#ffffff',
                  fontSize: 'clamp(0.9rem, 2.3vw, 1.2rem)',
                  paddingInline: 'clamp(1.4rem, 3.8vw, 2.4rem)',
                  paddingBlock: 'clamp(0.7rem, 2.4vw, 1.1rem)'
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  View Packages
                  <Icon icon="mdi:arrow-right" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>

            {/* Minimal Stats */}
            <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8">
              {[
                { value: '500+', label: 'Wild Elephants' },
                { value: '500+', label: 'Happy Travelers' },
                { value: '6+', label: 'Years Experience' }
              ].map((stat, i) => (
                <div key={i} className="relative">
                  <div className="text-2xl xs:text-3xl sm:text-4xl font-black mb-1" style={{ color: '#ffffff', textShadow: isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.3)' }}>{stat.value}</div>
                  <div className="text-xs sm:text-sm uppercase tracking-wider font-medium" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.9)' }}>{stat.label}</div>
                  {i < 2 && <div className="hidden sm:block absolute right-[-0.75rem] md:right-[-1rem] top-1/2 -translate-y-1/2 w-px h-8 sm:h-10 md:h-12" style={{ background: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.4)' }} />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sleek Navigation Dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHero(index)}
              className="group relative"
              aria-label={`View image ${index + 1}`}
            >
              <div 
                className={`transition-all duration-300 ${
                  index === currentHero 
                    ? 'w-12 h-1.5 bg-white rounded-full' 
                    : 'w-1.5 h-1.5 bg-white/40 rounded-full hover:bg-white/60'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 animate-bounce hidden md:flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <Icon icon="mdi:chevron-down" className="w-6 h-6" />
        </div>
      </section>

      {/* Signature Experience */}
      <section className="w-full py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28 relative">
        <div
          className="absolute inset-0"
          style={{ background: isDark ? 'linear-gradient(90deg, rgba(63,140,93,0.14), rgba(8,17,13,0))' : 'linear-gradient(90deg, rgba(141,216,135,0.22), rgba(255,255,255,0))' }}
        />
        <div className="max-w-[2000px] mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 relative z-10 grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
          <div>
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border lux-border shadow-2xl">
              <Image
                src="/assets/hero2.webp"
                alt="Luxury safari jeep in golden light"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4"
              style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(79,174,110,0.16)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.18)' : 'rgba(79,174,110,0.35)' }`
              }}
            >
              <Icon icon="mdi:crown" className="w-5 h-5" style={{ color: 'var(--lux-gold)' }} />
              <span className="text-xs uppercase tracking-wider" style={{ color: isDark ? 'rgba(245,247,244,0.7)' : 'rgba(16,35,26,0.7)' }}>Signature Experience</span>
            </div>
            <h3 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4" style={{ color: isDark ? '#ffffff' : '#0f2419' }}>
              Private, Comfortable, and Expertly Guided
            </h3>
            <p className="text-sm xs:text-base sm:text-lg font-light leading-relaxed mb-4 sm:mb-5 md:mb-6" style={{ color: isDark ? 'rgba(245,247,244,0.7)' : 'rgba(16,35,26,0.72)' }}>
              Travel in comfort with a dedicated 4x4, curated routes, and a seasoned local guide. Every moment is crafted for remarkable sightings and exquisite serenity.
            </p>
            <ul className="space-y-3">
              {[
                'Tailored routes based on seasonal wildlife patterns',
                'Photographer-friendly positioning and pacing',
                'Refreshments and thoughtful breaks included',
                'Focus on safety, comfort, and respect for nature',
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Icon icon="mdi:check-circle" className="mt-0.5 w-5 h-5" style={{ color: 'var(--lux-gold)' }} />
                  <span className="font-light" style={{ color: isDark ? 'rgba(245,247,244,0.82)' : '#103423' }}>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Trust bar removed per redesign request */}

      <section
        ref={aboutRef}
        id="about"
        className="w-full max-w-[2000px] mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28"
        style={getAnimationStyle(isAboutVisible)}
      >
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3 mb-3 sm:mb-4 md:mb-5 lg:mb-6 bg-white/5 border border-white/10 rounded-full px-3 xs:px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 lg:py-3">
            <Icon icon="mdi:tree" className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" style={{ color: 'var(--lux-gold)' }} />
            <span className="font-semibold tracking-widest uppercase text-[10px] xs:text-xs sm:text-sm whitespace-nowrap" style={{ color: isDark ? '#6fcf97' : '#2e6a46' }}>
              Into the Wild
            </span>
            <Icon icon="mdi:elephant" className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" style={{ color: 'var(--lux-gold)' }} />
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 tracking-tight leading-tight px-2" style={{ color: isDark ? '#ffffff' : '#0f2419' }}>
            WILD SAFARI EXPERIENCE
          </h2>
          <div className="w-16 sm:w-20 md:w-24 lg:w-28 h-1 mx-auto rounded-full" style={{ backgroundImage: 'linear-gradient(90deg, var(--lux-gold), #e3d7b0)' }} />
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center">
          <div className="space-y-4 sm:space-y-5 md:space-y-6 text-justify">
            <p className="text-sm xs:text-base sm:text-lg font-light leading-relaxed" style={{ color: isDark ? 'rgba(245,247,244,0.78)' : 'rgba(16,35,26,0.8)' }}>
              Join an unforgettable safari experience in Udawalawe with Nuwan, a knowledgeable and friendly local guide
              who has been exploring the park for years. Nuwan offers half-day and full-day safaris that are perfectly
              timed to catch the best animal sightings, all while ensuring your comfort and safety.
            </p>
            <p className="text-base sm:text-lg font-light leading-relaxed" style={{ color: isDark ? 'rgba(245,247,244,0.78)' : 'rgba(16,35,26,0.8)' }}>
              Whether it's your first safari or one of many, Nuwan's deep understanding of the area and its wildlife
              will make your journey both exciting and educational. Travel in a well-maintained, comfortable 4x4 jeep
              with plenty of space for photography and viewing.
            </p>
            <p className="text-base sm:text-lg font-light leading-relaxed" style={{ color: isDark ? 'rgba(245,247,244,0.78)' : 'rgba(16,35,26,0.8)' }}>
              With Nuwan's sharp eye and experience, you're likely to spot a wide range of wildlife—from herds of
              elephants and water buffalo to crocodiles, deer, and many bird species. His local insights add great value
              to the tour, helping you understand animal behaviors, park history, and the delicate balance of
              Udawalawe's ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            {[
              {
                icon: "mdi:elephant",
                title: "Wildlife Expertise",
                desc: "Expert knowledge of local wildlife behavior and habitats",
              },
              {
                icon: "mdi:jeepney",
                title: "Comfortable Vehicles",
                desc: "Well-maintained 4x4 jeeps with optimal viewing angles",
              },
              {
                icon: "mdi:camera",
                title: "Photography Focus",
                desc: "Perfect positioning for wildlife photography opportunities",
              },
              {
                icon: "mdi:shield-check",
                title: "Safety First",
                desc: "Prioritizing your safety while maximizing adventure",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-7 shadow-xl hover:shadow-2xl transition-all duration-500 group"
                style={{
                  ...getAnimationStyle(isAboutVisible, i * 120),
                  backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.88)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(63,140,93,0.18)' }`
                }}
              >
                <Icon icon={item.icon} className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110" style={{ color: 'var(--lux-gold)' }} />
                <h3 className="font-black text-sm sm:text-base md:text-lg mb-1.5 sm:mb-2" style={{ color: isDark ? '#ffffff' : '#0f2419' }}>{item.title}</h3>
                <p className="text-xs sm:text-sm md:text-base font-light leading-relaxed" style={{ color: isDark ? 'rgba(245,247,244,0.68)' : 'rgba(16,35,26,0.72)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={packagesRef}
        id="packages"
        className="py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 relative"
        style={getAnimationStyle(isPackagesVisible)}
      >
        <div className="absolute inset-0" style={{
          background: isDark
            ? 'radial-gradient(1000px 600px at 50% 30%, rgba(63,140,93,0.1), transparent)'
            : 'radial-gradient(1000px 600px at 50% 30%, rgba(111,196,144,0.15), transparent)'
        }} />

        <div className="max-w-[2000px] mx-auto px-3 xs:px-4 sm:px-6 md:px-8 relative z-10">
          {/* Clean Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-1 h-1 rounded-full bg-green-500" />
              <span className="text-xs uppercase tracking-widest font-medium" style={{ color: isDark ? '#6fcf97' : '#2e6a46' }}>
                Safari Packages
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3" style={{ color: isDark ? '#ffffff' : '#0f2419' }}>
              CHOOSE YOUR ADVENTURE
            </h2>
            <p className="text-base max-w-2xl" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(16,35,26,0.6)' }}>
              Tailored safari experiences for every explorer
            </p>
          </div>

          {/* Modern Package Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {packages.map((pkg, i) => (
              <div
                key={pkg.title}
                onClick={() => setSelectedPackage(pkg.title)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedPackage(pkg.title) } }}
                className="group cursor-pointer rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
                style={{
                  ...getAnimationStyle(isPackagesVisible, i * 100),
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{
                  background: 'linear-gradient(135deg, #3f8c5d, #6fcf97)'
                }}>
                  <Icon icon={pkg.icon} className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-black mb-2" style={{ color: isDark ? '#ffffff' : '#0f2419' }}>
                  {pkg.title}
                </h3>
                
                <div className="flex items-center gap-2 mb-3 text-sm font-medium" style={{ color: isDark ? '#6fcf97' : '#2e6a46' }}>
                  <Icon icon="mdi:clock-outline" className="w-4 h-4" />
                  {pkg.duration}
                </div>
                
                <p className="text-sm leading-relaxed mb-4" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(16,35,26,0.7)' }}>
                  {pkg.description}
                </p>
                
                <button
                  className="w-full py-3 px-5 rounded-full font-bold text-sm transition-all group-hover:shadow-lg"
                  style={{ backgroundImage: 'linear-gradient(90deg, var(--lux-gold-400), var(--lux-gold-600))', color: '#08110d' }}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedPackage && (
        <div
          className="fixed inset-0 backdrop-blur-md z-[999] flex justify-center items-center p-4 sm:p-6 md:p-8 lg:p-10 animate-modal-fade-in"
          style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.9)' : 'rgba(16,35,26,0.85)' }}
          onClick={() => setSelectedPackage(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="package-title"
        >
          <div
            className="border rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12 w-full max-w-[calc(100%-2rem)] sm:max-w-md md:max-w-lg lg:max-w-2xl text-center relative shadow-2xl animate-modal-scale-in max-h-[90vh] overflow-y-auto"
            style={{
              backgroundColor: isDark ? 'rgba(12,26,19,0.75)' : 'rgba(255,255,255,0.95)',
              borderColor: isDark ? 'rgba(63,140,93,0.35)' : 'rgba(63,140,93,0.22)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPackage(null)}
              className="absolute top-4 sm:top-5 right-4 sm:right-5 transition-all duration-300 p-2 rounded-full hover:rotate-90 focus:outline-none z-10"
              style={{ color: theme === 'dark' ? 'var(--lux-gold)' : 'var(--lux-gold-600)' }}
              aria-label="Close modal"
            >
              <Icon icon="mdi:close" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            </button>

            {(() => {
              const pkg = packages.find((p) => p.title === selectedPackage)
              if (!pkg) return null
              return (
                <>
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6 md:mb-8 shadow-lg"
                    style={{ backgroundImage: 'linear-gradient(135deg, var(--lux-gold), var(--lux-gold-600))', boxShadow: isDark ? '0 15px 35px rgba(0,0,0,0.35)' : '0 15px 35px rgba(63,140,93,0.24)' }}
                  >
                    <Icon icon={pkg.icon} className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" style={{ color: '#0c0d0e' }} />
                  </div>

                  <h3
                    id="package-title"
                    className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-5 md:mb-6 font-black"
                    style={{ color: isDark ? '#ffffff' : '#0f2419' }}
                  >
                    {pkg.title}
                  </h3>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-7 md:mb-8 leading-relaxed font-light" style={{ color: isDark ? 'rgba(245,247,244,0.78)' : 'rgba(16,35,26,0.78)' }}>
                    {pkg.description}
                  </p>

                  <div
                    className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-7 md:mb-8 font-semibold text-sm sm:text-base md:text-lg"
                    style={{ color: isDark ? '#8fd887' : '#2e6a46' }}
                  >
                    <Icon icon="mdi:clock-outline" className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 flex-shrink-0" />
                    <span>Duration: {pkg.duration}</span>
                  </div>

                  <div
                    className="rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 mb-6 sm:mb-7 md:mb-8"
                    style={{
                      backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(79,174,110,0.12)',
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(63,140,93,0.25)' }`
                    }}
                  >
                    <h4 className="font-black text-sm sm:text-base md:text-lg mb-3 sm:mb-4" style={{ color: isDark ? '#ffffff' : '#0f2419' }}>Package Highlights</h4>
                    <ul className="space-y-2 text-left">
                      {pkg.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 sm:gap-2.5 md:gap-3 text-xs sm:text-sm md:text-base font-light"
                          style={{ color: isDark ? 'rgba(245,247,244,0.78)' : 'rgba(16,35,26,0.78)' }}
                        >
                          <Icon icon="mdi:check-circle" className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--lux-gold)' }} />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={`https://wa.me/94776103421?text=${encodeURIComponent(
                      `Hello, I am interested in the ${pkg.title} package. Could you please provide more information, including pricing and availability?`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 sm:gap-2.5 md:gap-3 active:scale-98 px-5 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-4 rounded-full font-semibold text-xs sm:text-sm md:text-base lg:text-lg transition-all duration-300"
                    style={{
                      backgroundImage: 'linear-gradient(90deg, var(--lux-gold), var(--lux-gold-600))',
                      color: isDark ? '#0c0d0e' : '#0f2419',
                      boxShadow: isDark ? '0 12px 32px rgba(63,140,93,0.25)' : '0 12px 28px rgba(63,140,93,0.2)'
                    }}
                    aria-label={`Contact us about ${pkg.title} via WhatsApp`}
                  >
                    <Icon icon="mdi:whatsapp" className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 flex-shrink-0" />
                    <span className="whitespace-nowrap">Contact Us for Details</span>
                  </a>
                </>
              )
            })()}
          </div>
        </div>
      )}

      <a
        href="https://wa.me/94776103421?text=Hello%2C%20I%20would%20like%20to%20chat%20about%20Wild%20Safari%20Adventures%20by%20Nuwan."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 sm:bottom-6 md:bottom-7 lg:bottom-8 right-5 sm:right-6 md:right-7 lg:right-8 active:scale-95 text-white p-3.5 sm:p-4 md:p-4.5 lg:p-5 rounded-full z-50 transition-all duration-300 group"
        style={{
          backgroundImage: 'linear-gradient(135deg, var(--lux-gold), var(--lux-gold-600))',
          boxShadow: isDark ? '0 18px 35px rgba(0,0,0,0.35)' : '0 18px 35px rgba(63,140,93,0.24)'
        }}
        aria-label="Chat with us on WhatsApp"
      >
        <Icon icon="mdi:whatsapp" className="w-6 h-6 sm:w-6.5 sm:h-6.5 md:w-7 md:h-7 lg:w-8 lg:h-8 transition-transform duration-300 group-hover:scale-110" />
      </a>

      <div className="space-y-0 relative z-10">
        <GallerySection theme={theme} />
        <ReviewsSection theme={theme} />
        <RecommendedSafariSection theme={theme} />
      </div>

      <section id="contact" ref={footerRef}>
        <footer 
          className="relative pb-0"
          style={getAnimationStyle(isFooterVisible)}
        >
          <div
            className="absolute inset-0"
            style={{ background: isDark ? 'linear-gradient(180deg, rgba(0,0,0,0.7), rgba(12,13,14,0.95))' : 'linear-gradient(180deg, rgba(231,245,236,0.92), rgba(247,252,247,0.98))' }}
          />
          <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundImage: 'linear-gradient(90deg, var(--lux-gold), #e3d7b0, var(--lux-gold))' }} />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-14 md:py-16 lg:py-20">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-7 sm:gap-8 md:gap-9 lg:gap-10 mb-10 sm:mb-12">
              <div 
                className="lg:col-span-2"
                style={getAnimationStyle(isFooterVisible, 100)}
              >
                <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 mb-5 sm:mb-6">
                  <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0">
                    <Image
                      src="/favicon.ico"
                      alt="Udawalawe Safari by Nuwan"
                      width={44}
                      height={44}
                      className="object-contain"
                      loading="lazy"
                    />
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black" style={{ color: isDark ? '#ffffff' : '#0f2419' }}>
                    Udawalawe Safari
                  </h2>
                </div>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-5 sm:mb-6 max-w-md font-light" style={{ color: isDark ? 'rgba(245,247,244,0.7)' : 'rgba(16,35,26,0.72)' }}>
                  Experience the untamed beauty of Udawalawe National Park with expert guide Nuwan. Every safari is a
                  journey into Sri Lanka's most spectacular wilderness.
                </p>

                <div className="flex gap-3 sm:gap-4">
                  {[
                    { icon: "mdi:google", href: "https://g.co/kgs/sPzai3", label: "Google Reviews" },
                    {
                      icon: "simple-icons:tripadvisor",
                      href: "https://www.tripadvisor.com/Attraction_Review-g3577009-d27673880",
                      label: "TripAdvisor Reviews",
                    },
                    {
                      icon: "mdi:facebook",
                      href: "https://www.facebook.com/profile.php?id=100081508587185",
                      label: "Facebook Page",
                    },
                    {
                      icon: "mdi:instagram",
                      href: "https://www.instagram.com/udawalawe_jeep_safari_service",
                      label: "Instagram Profile",
                    },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center active:scale-95 transition-all duration-300 focus:outline-none flex-shrink-0"
                      style={{
                        backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(79,174,110,0.16)',
                        border: `1px solid ${isDark ? 'rgba(63,140,93,0.3)' : 'rgba(79,174,110,0.35)' }`,
                        color: theme === 'dark' ? 'var(--lux-gold)' : 'var(--lux-gold-600)'
                      }}
                    >
                      <Icon icon={social.icon} className="w-5 h-5 sm:w-6 sm:h-6" />
                    </a>
                  ))}
                </div>
              </div>

              <div style={getAnimationStyle(isFooterVisible, 200)}>
                <h3 className="text-base sm:text-lg md:text-xl font-black mb-5 sm:mb-6 flex items-center gap-2" style={{ color: isDark ? '#ffffff' : '#0f2419' }}>
                  <Icon icon="mdi:compass" className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 flex-shrink-0" style={{ color: 'var(--lux-gold)' }} />
                  Quick Links
                </h3>
                <div className="space-y-1.5 sm:space-y-2">
                  {["About", "Packages", "Gallery", "Reviews", "Contact"].map((section) => (
                    <button
                      key={section}
                      onClick={() => scrollTo(section.toLowerCase())}
                      className="block w-full text-left transition-all duration-300 py-2 hover:translate-x-2 transform text-xs sm:text-sm md:text-base focus:outline-none font-light"
                      style={{ color: isDark ? 'rgba(245,247,244,0.85)' : 'rgba(16,35,26,0.85)' }}
                    >
                      <Icon icon="mdi:chevron-right" className="w-4 h-4 inline mr-2" />
                      {section}
                    </button>
                  ))}
                </div>
              </div>

              <div style={getAnimationStyle(isFooterVisible, 300)}>
                <h3 className="text-base sm:text-lg md:text-xl font-black mb-5 sm:mb-6 flex items-center gap-2" style={{ color: isDark ? '#ffffff' : '#0f2419' }}>
                  <Icon icon="mdi:phone" className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 flex-shrink-0" style={{ color: 'var(--lux-gold)' }} />
                  Get In Touch
                </h3>
                <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-sm md:text-base">
                  <div className="flex items-start gap-2.5 sm:gap-3 group font-light" style={{ color: isDark ? 'rgba(245,247,244,0.85)' : 'rgba(16,35,26,0.85)' }}>
                    <Icon
                      icon="mdi:map-marker"
                      className="w-5 h-5 mt-0.5 transition-transform duration-300 group-hover:scale-110 flex-shrink-0"
                      style={{ color: 'var(--lux-gold)' }}
                    />
                    <span>
                      No. 45, RET Junction
                      <br />
                      Udawalawe, Sri Lanka
                    </span>
                  </div>
                  <a
                    href="tel:+94776103421"
                    className="flex items-center gap-2.5 sm:gap-3 transition-colors duration-300 group focus:outline-none font-light"
                    style={{ color: isDark ? 'rgba(245,247,244,0.85)' : 'rgba(16,35,26,0.85)' }}
                  >
                    <Icon
                      icon="mdi:phone"
                      className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 flex-shrink-0"
                      style={{ color: 'var(--lux-gold)' }}
                    />
                    +94 77 610 3421
                  </a>
                  <a
                    href="mailto:nuwan@udawalawasafari.lk"
                    className="flex items-center gap-2.5 sm:gap-3 transition-colors duration-300 group focus:outline-none break-all font-light"
                    style={{ color: isDark ? 'rgba(245,247,244,0.85)' : 'rgba(16,35,26,0.85)' }}
                  >
                    <Icon
                      icon="mdi:email"
                      className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 flex-shrink-0"
                      style={{ color: 'var(--lux-gold)' }}
                    />
                    nuwan@udawalawasafari.lk
                  </a>
                </div>
              </div>
            </div>

            <div 
              className="pt-6"
              style={{
                ...getAnimationStyle(isFooterVisible, 400),
                borderTop: `1px solid ${isDark ? 'rgba(63,140,93,0.25)' : 'rgba(79,174,110,0.25)' }`
              }}
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left text-xs sm:text-sm md:text-base">
                  <p className="font-black" style={{ color: isDark ? '#ffffff' : '#0f2419' }}>
                    © {new Date().getFullYear()} Udawalawe Safari Service by Nuwan
                  </p>
                  <p className="mt-1 font-light" style={{ color: isDark ? 'rgba(245,247,244,0.65)' : 'rgba(16,35,26,0.65)' }}>Crafting unforgettable wildlife experiences since 2020</p>
                </div>
                <div className="text-center md:text-right text-xs sm:text-sm md:text-base">
                  <p className="font-light" style={{ color: isDark ? 'rgba(245,247,244,0.65)' : 'rgba(16,35,26,0.65)' }}>Designed & developed by</p>
                  <a
                    href="https://nexcy.lk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-black transition-colors duration-300 focus:outline-none"
                    style={{ color: isDark ? '#ffffff' : '#0f2419' }}
                  >
                    NexCy Technologies
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>

      <style jsx global>{`
        @keyframes hero-fade-in {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes modal-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modal-scale-in {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }

        .animate-hero-fade-in {
          animation: none;
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .animate-modal-fade-in {
          animation: modal-fade-in 0.25s ease-out;
        }

        .animate-modal-scale-in {
          animation: modal-scale-in 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .active\:scale-98:active {
          transform: scale(0.98);
        }

        .active\:scale-95:active {
          transform: scale(0.95);
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        html {
          scroll-behavior: smooth;
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
        }

        body {
          overflow-x: hidden;
          overflow-y: auto;
        }

        #hero {
          scroll-snap-align: start;
        }

        img {
          content-visibility: auto;
        }

        *:focus {
          outline: none;
        }

        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }

        @media (max-width: 320px) {
          * {
            min-width: 0;
          }
        }

        @media (min-width: 2560px) {
          html {
            font-size: 18px;
          }
        }

        @media (min-width: 3840px) {
          html {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  )
}