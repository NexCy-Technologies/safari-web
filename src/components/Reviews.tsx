"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Icon } from "@iconify/react"

export interface Review {
  id: string
  author: string
  rating: number
  date: string
  text: string
}

interface ReviewsProps {
  className?: string
}

const Reviews: React.FC<ReviewsProps> = ({ className = "" }) => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Use ReturnType<typeof setInterval> to avoid Node/DOM typing issues
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  useEffect(() => {
    fetchReviews()
  }, [])

  // Start/stop autoplay helpers — prevents hover jitter/flicker while interacting
  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const startAutoPlay = () => {
    stopAutoPlay()
    if (reviews.length > 1) {
      intervalRef.current = setInterval(() => nextSlide(), 5000)
    }
  }

  useEffect(() => {
    startAutoPlay()
    return () => stopAutoPlay()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviews])

  const fetchReviews = async () => {
    try {
      setIsLoading(true)
      const res = await fetch("/reviews.json")
      if (!res.ok) throw new Error("Failed to load reviews")
      const data: Review[] = await res.json()
      setReviews(data)
      setCurrentIndex(0)
    } catch (err) {
      console.error(err)
      setError("Failed to load reviews")
    } finally {
      setIsLoading(false)
    }
  }

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        icon={i < rating ? "mdi:star" : "mdi:star-outline"}
        className={`w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 ${i < rating ? "text-yellow-400" : "text-gray-500"}`}
      />
    ))

  const nextSlide = () => {
    if (!reviews.length) return
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }
  const prevSlide = () => {
    if (!reviews.length) return
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    stopAutoPlay()
    touchStartX.current = e.changedTouches[0].screenX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current
      if (diff > 50) nextSlide()
      if (diff < -50) prevSlide()
    }
    touchStartX.current = null
    touchEndX.current = null
    startAutoPlay()
  }

  const ReviewSkeleton = () => (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl animate-pulse shadow-2xl">
      <div className="h-20 sm:h-24 bg-green-400/20 rounded"></div>
    </div>
  )

  if (error) {
    return (
      <section className={`py-16 sm:py-20 md:py-24 relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/15 via-transparent to-emerald-900/20"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center relative z-10">
          <Icon icon="mdi:alert-circle" className="w-12 sm:w-16 h-12 sm:h-16 text-red-400 mx-auto mb-4" />
          <p className="text-red-400 text-base sm:text-lg md:text-xl mb-4">{error}</p>
        </div>
      </section>
    )
  }

  return (
    <section
      id="reviews"
      className={`py-16 sm:py-20 md:py-24 relative overflow-hidden ${className}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/15 via-transparent to-emerald-900/20"></div>

      {/* Decorative circles */}
      <div className="pointer-events-none absolute top-16 left-5 sm:left-10 w-24 h-24 sm:w-32 sm:h-32 bg-green-500/10 rounded-full blur-3xl"></div>
      <div className="pointer-events-none absolute bottom-16 right-5 sm:right-10 w-32 h-32 sm:w-40 sm:h-40 bg-emerald-400/10 rounded-full blur-3xl"></div>
      <div className="pointer-events-none absolute top-1/2 left-1/4 w-16 h-16 sm:w-20 sm:h-20 bg-lime-500/8 rounded-full blur-2xl"></div>
      <div className="pointer-events-none absolute bottom-1/3 right-1/3 w-12 h-12 sm:w-16 sm:h-16 bg-green-400/8 rounded-full blur-xl"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 text-center">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-3xl sm:text-4xl md:text-5xl text-green-100 mb-2 sm:mb-4 font-bold font-serif">
            Adventure Stories
          </h3>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-400 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-green-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Hear from fellow adventurers about their incredible wild safari experiences in Udawalawa
          </p>
        </div>

        {isLoading ? (
          <ReviewSkeleton />
        ) : (
          <div className="overflow-hidden relative">
            {/* Track */}
            <div
              className="flex transition-transform duration-700 ease-in-out will-change-transform transform-gpu"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              aria-live="polite"
            >
              {reviews.map((review) => (
                <div key={review.id} className="flex-shrink-0 w-full px-2 sm:px-4">
                  {/* Card */}
                  <article
                    className="
                      w-full p-6 sm:p-8 rounded-3xl
                      backdrop-blur-2xl bg-white/5 border border-white/10
                      shadow-2xl transition-all duration-300 ease-out
                      md:hover:translate-y-1 md:hover:scale-[1.01] lg:hover:scale-[1.02]
                      hover:shadow-green-500/20 hover:border-green-400/30
                      focus-within:ring-2 focus-within:ring-emerald-400/40
                      origin-center transform-gpu will-change-transform
                      relative overflow-visible
                      motion-reduce:transition-none
                    "
                  >
                    <header className="mb-4 sm:mb-6">
                      <h4 className="font-serif font-bold text-green-100 text-base sm:text-lg md:text-xl">
                        {review.author}
                      </h4>
                      <div className="mt-2 flex items-center gap-2 sm:gap-3 justify-center md:justify-start">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="text-green-300 text-xs sm:text-sm font-medium">{review.date}</span>
                      </div>
                    </header>

                    <div className="relative">
                      <Icon
                        icon="mdi:format-quote-open"
                        className="pointer-events-none absolute -top-2 -left-2 w-6 sm:w-8 h-6 sm:h-8 text-green-400/30"
                      />
                      <p className="text-green-100 text-sm sm:text-base md:text-lg leading-relaxed font-sans pl-4 sm:pl-6 pr-4 sm:pr-6 relative z-10">
                        {review.text}
                      </p>
                      <Icon
                        icon="mdi:format-quote-close"
                        className="pointer-events-none absolute -bottom-2 -right-2 w-6 sm:w-8 h-6 sm:h-8 text-green-400/30"
                      />
                    </div>
                  </article>
                </div>
              ))}
            </div>

            {/* Navigation */}
            {reviews.length > 1 && (
              <div className="flex justify-center items-center gap-4 mt-4 sm:mt-6">
                <button
                  onClick={prevSlide}
                  className="flex items-center justify-center w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 rounded-full backdrop-blur-2xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-green-400/50 transition-transform duration-300 hover:scale-110 text-green-300 hover:text-green-200"
                  aria-label="Previous review"
                >
                  <Icon icon="mdi:chevron-left" className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6" />
                </button>

                <div className="flex gap-1 sm:gap-2 mb-2 sm:mb-0">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      aria-label={`Go to review ${index + 1}`}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? "bg-green-400 scale-125 shadow-lg shadow-green-400/50"
                          : "bg-white/30 hover:bg-white/50"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="flex items-center justify-center w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 rounded-full backdrop-blur-2xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-green-400/50 transition-transform duration-300 hover:scale-110 text-green-300 hover:text-green-200"
                  aria-label="Next review"
                >
                  <Icon icon="mdi:chevron-right" className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6" />
                </button>
              </div>
            )}

            {/* See More Button at the bottom */}
            <div className="text-center mt-8">
              <button
                onClick={() => window.open("https://g.co/kgs/sPzai3", "_blank")}
                className="inline-flex items-center gap-2 backdrop-blur-sm bg-green-600/20 hover:bg-green-600/30 border border-green-400/30 hover:border-green-400/50 text-green-300 hover:text-green-200 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                <Icon icon="mdi:google" className="w-4 sm:w-5 h-4 sm:h-5" />
                See More Safari Reviews
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Reviews