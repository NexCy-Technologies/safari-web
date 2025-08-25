"use client"
import type React from "react"
import Gallery from "./Gallery"
import Reviews from "./Reviews"

const GalleryAndReviews: React.FC = () => {
  return (
    <>
      {/* Gallery Section */}
      <Gallery className="mt-20" />
      {/* Reviews Section */}
      <Reviews className="mt-20" />
    </>
  )
}

export default GalleryAndReviews
