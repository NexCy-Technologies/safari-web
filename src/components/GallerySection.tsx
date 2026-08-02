"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Icon } from "@iconify/react"
import { motion, AnimatePresence } from "framer-motion"
import { galleryData } from "@/data/galleryData"

interface GallerySectionProps {
  theme: "light" | "dark"
}

export default function GallerySection({ theme }: GallerySectionProps) {
  const isDark = theme === "dark"
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null)

  const openZoom = (index: number) => {
    setZoomedIndex(index)
    document.body.style.overflow = "hidden"
  }

  const closeZoom = () => {
    setZoomedIndex(null)
    document.body.style.overflow = "auto"
  }

  const navigateZoom = (dir: "prev" | "next") => {
    if (zoomedIndex === null) return
    const total = galleryData.length
    if (dir === "prev") {
      setZoomedIndex((zoomedIndex - 1 + total) % total)
    } else {
      setZoomedIndex((zoomedIndex + 1) % total)
    }
  }

  useEffect(() => {
    if (zoomedIndex === null) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeZoom()
      if (e.key === "ArrowLeft") navigateZoom("prev")
      if (e.key === "ArrowRight") navigateZoom("next")
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [zoomedIndex])

  const currentZoomItem = zoomedIndex !== null ? galleryData[zoomedIndex] : null

  return (
    <section id="gallery" className={`py-16 md:py-24 relative overflow-hidden ${isDark ? "bg-[#08110d]" : "bg-emerald-50/50"}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <Icon icon="mdi:camera" className="w-4 h-4 md:w-5 md:h-5 text-emerald-500" />
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-emerald-500">
              Wildlife Encounters
            </span>
          </div>
          <h2 className={`text-3xl md:text-5xl font-black font-playfair mb-4 md:mb-6 ${isDark ? "text-white" : "text-emerald-950"}`}>
            Captured Safari Moments
          </h2>
          <p className={`text-sm md:text-base leading-relaxed max-w-lg mx-auto ${isDark ? "text-gray-400" : "text-emerald-900/70"}`}>
            Experience the raw beauty of Udawalawe. Browse recent authentic wildlife sightings captured on our guided jeep safaris.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[300px] gap-4 md:gap-6">
          {galleryData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => openZoom(index)}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:z-10 transition-all duration-500 min-h-[250px] md:min-h-0 ${item.className || "col-span-1 row-span-1"}`}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                placeholder="blur"
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-lg md:text-2xl font-bold font-playfair text-white mb-2 transform opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                  {item.description}
                </p>
              </div>

              <div className="absolute top-4 right-4 md:top-6 md:right-6 p-3 rounded-full bg-white/10 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 group-hover:rotate-90 transition-all duration-500">
                <Icon icon="mdi:arrow-top-right" className="w-5 h-5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {currentZoomItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8"
          >
            <button
              onClick={closeZoom}
              className="absolute top-6 right-6 p-3 md:p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 z-50 hover:rotate-90"
            >
              <Icon icon="mdi:close" className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <button
              onClick={() => navigateZoom("prev")}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 z-50 hover:-translate-x-2"
            >
              <Icon icon="mdi:chevron-left" className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <button
              onClick={() => navigateZoom("next")}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 z-50 hover:translate-x-2"
            >
              <Icon icon="mdi:chevron-right" className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <motion.div 
              key={currentZoomItem.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="max-w-5xl w-full flex flex-col items-center"
            >
              <div className="relative w-full h-[50vh] md:h-[75vh] rounded-2xl md:rounded-[2rem] overflow-hidden mb-6 md:mb-8 shadow-2xl">
                <Image
                  src={currentZoomItem.image}
                  alt={currentZoomItem.alt}
                  fill
                  placeholder="blur"
                  className="object-cover md:object-contain"
                  priority
                />
              </div>
              <div className="text-center text-white max-w-2xl px-4">
                <h3 className="text-2xl md:text-4xl font-black font-playfair mb-3 text-emerald-400">
                  {currentZoomItem.title}
                </h3>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  {currentZoomItem.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
