"use client";

import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  profileImage?: string;
}

interface ReviewsProps {
  className?: string;
}

const Reviews: React.FC<ReviewsProps> = ({ className = "" }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length > 1) {
      intervalRef.current = setInterval(() => nextSlide(), 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [reviews]);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/reviews.json");
      if (!res.ok) throw new Error("Failed to load reviews");
      const data: Review[] = await res.json();
      setReviews(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load reviews");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenGoogleReviews = () => {
    window.open(
      "https://search.google.com/local/reviews?placeid=YOUR_PLACE_ID",
      "_blank"
    );
  };

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        icon={i < rating ? "mdi:star" : "mdi:star-outline"}
        className={`w-5 h-5 ${i < rating ? "text-yellow-400" : "text-gray-500"}`}
      />
    ));

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % reviews.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (diff > 50) nextSlide();
      if (diff < -50) prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const ReviewSkeleton = () => (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gray-900/60 backdrop-blur-xl border border-green-900/40 rounded-2xl animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-700 rounded w-32 mb-2"></div>
          <div className="h-3 bg-gray-700 rounded w-24"></div>
        </div>
      </div>
      <div className="h-24 bg-gray-700 rounded"></div>
    </div>
  );

  if (error) {
    return (
      <section className={`py-20 bg-gradient-to-br from-gray-900/50 to-black/80 ${className}`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Icon icon="mdi:alert-circle" className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-red-400 text-lg mb-4">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`py-20 bg-gradient-to-br from-gray-900/50 to-black/80 relative overflow-hidden ${className}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        <h3 className="text-4xl md:text-5xl text-green-200 mb-4 font-bold">Guest Reviews</h3>
        <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-400 mx-auto rounded-full mb-12"></div>

        {isLoading ? (
          <ReviewSkeleton />
        ) : (
          <div className="overflow-hidden relative">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="flex-shrink-0 w-full px-4">
                  <div className="w-full p-6 rounded-2xl border border-green-900/40 bg-gray-900/60 backdrop-blur-xl shadow-2xl">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
                        {review.profileImage ? (
                          <img
                            src={review.profileImage}
                            alt={review.author}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <Icon icon="mdi:account" className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="font-serif font-semibold text-green-200 text-lg">{review.author}</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex">{renderStars(review.rating)}</div>
                          <span className="text-green-300 text-xs">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-green-100 text-sm leading-relaxed font-sans">{review.text}</p>
                    <button
                      onClick={handleOpenGoogleReviews}
                      className="mt-4 text-green-400 hover:text-green-300 font-medium underline"
                    >
                      See More on Google
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;