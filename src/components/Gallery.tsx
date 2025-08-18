"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";

interface GalleryImage {
  id: string;
  imageUrl: string;
  description: string;
  alt: string;
  timestamp: Date;
  featured?: boolean;
}

interface GalleryProps {
  className?: string;
}

const Gallery: React.FC<GalleryProps> = ({ className = "" }) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [displayedImages, setDisplayedImages] = useState<GalleryImage[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [zoomedImage, setZoomedImage] = useState<GalleryImage | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const q = query(collection(db, "gallery"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const galleryImages: GalleryImage[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        imageUrl: doc.data().imageUrl,
        description: doc.data().description,
        alt: doc.data().alt,
        timestamp: doc.data().timestamp?.toDate() || new Date(),
        featured: doc.data().featured || false,
      }));

      setImages(galleryImages);
      setDisplayedImages(galleryImages.slice(0, 7));
    } catch (err) {
      console.error("Error loading gallery:", err);
      setError("Failed to load gallery images");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSeeMore = () => {
    setIsExpanded(true);
    setDisplayedImages(images);
  };

  const handleImageClick = (image: GalleryImage) => {
    setZoomedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeZoom = () => {
    setZoomedImage(null);
    document.body.style.overflow = "auto";
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (!zoomedImage) return;
    const currentIndex = images.findIndex((img) => img.id === zoomedImage.id);
    const newIndex =
      direction === "prev"
        ? currentIndex > 0
          ? currentIndex - 1
          : images.length - 1
        : currentIndex < images.length - 1
        ? currentIndex + 1
        : 0;
    setZoomedImage(images[newIndex]);
  };

  const ImageSkeleton = () => (
    <div className="bg-gray-800/50 rounded-2xl animate-pulse border border-green-900/30">
      <div className="w-full aspect-[4/3] bg-gray-700/50 rounded-2xl"></div>
    </div>
  );

  const ImageCard: React.FC<{ image: GalleryImage }> = ({ image }) => (
    <div
      className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 border border-green-900/30 hover:border-green-700/50"
      onClick={() => handleImageClick(image)}
      style={{ aspectRatio: "4/3" }}
    >
      <img
        src={image.imageUrl}
        alt={image.alt}
        loading="lazy"
        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <Icon icon="mdi:magnify-plus" className="w-8 h-8 text-green-400" />
      </div>
    </div>
  );

  const SeeMoreCard = () => (
    <div
      className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 border border-green-900/30 hover:border-green-700/50 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center"
      onClick={handleSeeMore}
      style={{ aspectRatio: "4/3" }}
    >
      <div className="text-center p-6">
        <Icon
          icon="mdi:camera-plus"
          className="w-12 h-12 text-green-400 mb-4 mx-auto group-hover:scale-110 transition-transform duration-300"
        />
        <h4
          className="text-green-200 font-semibold text-lg mb-2"
          style={{ fontFamily: "Merriweather, serif" }}
        >
          See More
        </h4>
        <p className="text-green-300 text-sm mb-2">
          {images.length - 7} more photos
        </p>
        <div className="text-green-400 text-xs font-medium">udawalawasafari.lk</div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-transparent to-green-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );

  if (error) {
    return (
      <section className={`max-w-7xl mx-auto px-6 py-20 ${className}`}>
        <div className="text-center py-12">
          <Icon
            icon="mdi:alert-circle"
            className="w-16 h-16 text-red-400 mx-auto mb-4"
          />
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <button
            onClick={loadImages}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300"
          >
            <Icon icon="mdi:refresh" className="w-5 h-5 inline mr-2" />
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className={`max-w-7xl mx-auto px-6 py-20 ${className}`}>
        <div className="text-center mb-16">
          <h3
            style={{ fontFamily: "Merriweather, serif" }}
            className="text-4xl md:text-5xl text-green-200 mb-4 font-bold"
          >
            Safari Gallery
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-400 mx-auto rounded-full"></div>
          <p className="text-green-100 text-lg mt-6 max-w-2xl mx-auto">
            Discover the incredible wildlife and breathtaking moments captured
            during our safari adventures
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }, (_, index) => (
                <ImageSkeleton key={`skeleton-${index}`} />
              ))
            : (
              <>
                {displayedImages.map((image) => (
                  <ImageCard key={image.id} image={image} />
                ))}
                {!isExpanded && images.length > 7 && <SeeMoreCard />}
              </>
            )}
        </div>

        {isExpanded && !isLoading && (
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 bg-green-900/30 backdrop-blur-sm border border-green-700/50 rounded-full px-6 py-3 text-green-200">
              <Icon icon="mdi:check-circle" className="w-5 h-5 text-green-400" />
              <span>Showing all {images.length} images</span>
            </div>
          </div>
        )}
      </section>

      {/* Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-6"
          onClick={closeZoom}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={closeZoom}
              className="absolute top-4 right-4 z-10 text-green-300 hover:text-green-400 transition-colors duration-300 p-2 rounded-full bg-black/50 backdrop-blur-sm"
            >
              <Icon icon="mdi:close" className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("prev");
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-green-300 hover:text-green-400 transition-colors duration-300 p-2 rounded-full bg-black/50 backdrop-blur-sm"
            >
              <Icon icon="mdi:chevron-left" className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("next");
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-green-300 hover:text-green-400 transition-colors duration-300 p-2 rounded-full bg-black/50 backdrop-blur-sm"
            >
              <Icon icon="mdi:chevron-right" className="w-8 h-8" />
            </button>

            <img
              src={zoomedImage.imageUrl}
              alt={zoomedImage.alt}
              className="rounded-2xl shadow-2xl max-h-[80vh] w-auto object-contain mx-auto border border-green-900/30"
            />
            <div className="mt-6 text-green-100 text-center bg-black/80 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg max-w-2xl mx-auto border border-green-900/30">
              <p className="text-lg leading-relaxed">{zoomedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;