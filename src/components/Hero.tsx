"use client"

import Image from "next/image"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import heroBg from "@/assets/Gallery1.jpg"

interface HeroProps {
  theme: "light" | "dark"
  onOpenBooking: () => void
}

export default function Hero({ theme, onOpenBooking }: HeroProps) {
  const isDark = theme === "dark"

  const containerVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  }

  return (
    <section className={`relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden transition-colors duration-500 ${
      isDark ? "bg-[#07140e] text-white" : "bg-emerald-50/80 text-emerald-950"
    }`}>
      {/* Dynamic Background Image & Animated Atmospheric Layers */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={heroBg}
            alt="Udawalawe Wild Elephants & Safari Jeep"
            fill
            priority
            placeholder="blur"
            sizes="100vw"
            className={`object-cover object-center transition-all duration-700 ${
              isDark ? "opacity-45 brightness-[0.55] contrast-125" : "opacity-35 brightness-[0.95] contrast-105"
            }`}
          />
        </motion.div>

        {/* Dynamic Theme Gradient Overlay */}
        <div
          className={`absolute inset-0 transition-colors duration-500 ${
            isDark
              ? "bg-gradient-to-b from-[#0b1712]/90 via-[#07140e]/80 to-[#08110d]"
              : "bg-gradient-to-b from-white/80 via-emerald-50/60 to-emerald-100/70"
          }`}
        />

        {/* Floating Glowing Animated Micro-Blobs */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-1/4 left-10 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl pointer-events-none ${
            isDark ? "bg-emerald-500/20" : "bg-emerald-400/25"
          }`} 
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className={`absolute bottom-10 right-10 w-64 sm:w-80 h-64 sm:h-80 rounded-full blur-3xl pointer-events-none ${
            isDark ? "bg-amber-500/15" : "bg-amber-400/20"
          }`} 
        />
      </div>

      {/* Hero Content Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 flex flex-col items-center"
      >
        {/* Floating Trust Badge */}
        <motion.div variants={itemVariants} className={`inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border backdrop-blur-md mb-6 shadow-lg transition-all duration-300 ${
          isDark
            ? "bg-emerald-950/80 border-emerald-400/40 text-emerald-300"
            : "bg-white/90 border-emerald-600/30 text-emerald-900 shadow-emerald-900/5"
        }`}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Icon icon="mdi:star-four-points" className="w-4 h-4 text-amber-500" />
          </motion.div>
          <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-widest">
            #1 Rated Safari Service by Nuwan • 5.0 ⭐ Reviews
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1 variants={itemVariants} className={`text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black font-playfair tracking-tight leading-[1.1] mb-6 drop-shadow-sm ${
          isDark ? "text-white" : "text-emerald-950"
        }`}>
          Unforgettable{" "}
          <span className={isDark ? "text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-amber-300 to-emerald-400" : "text-emerald-600"}>
            Udawalawe Wildlife
          </span>{" "}
          Safaris
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={itemVariants} className={`text-sm sm:text-base md:text-lg max-w-2xl font-sans mb-8 sm:mb-10 leading-relaxed ${
          isDark ? "text-emerald-100/90" : "text-emerald-900/90 font-medium"
        }`}>
          Witness 100+ wild Asian elephants, leopards & <strong className={isDark ? "text-amber-400 font-bold" : "text-amber-600 font-bold"}>250+ exotic birds</strong> in their natural habitat. Guided by certified local safari expert Nuwan with custom 4x4 open-top jeeps.
        </motion.p>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-5 w-full sm:w-auto mb-12 sm:mb-16">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-emerald-900/30 hover:shadow-emerald-500/40 transition-colors duration-300 flex items-center justify-center gap-3 group"
          >
            <Icon icon="mdi:calendar-check" className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" />
            <span>Book Your Jeep Safari</span>
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://wa.me/94776103421?text=Hi%20Nuwan,%20I'm%20interested%20in%20booking%20a%20Safari!"
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full sm:w-auto px-8 py-4 rounded-full border backdrop-blur-md font-bold text-sm uppercase tracking-wider transition-colors duration-300 flex items-center justify-center gap-3 ${
              isDark
                ? "bg-white/10 hover:bg-white/20 border-white/30 text-white"
                : "bg-white/90 hover:bg-white border-emerald-900/20 text-emerald-950 shadow-sm"
            }`}
          >
            <Icon icon="mdi:whatsapp" className="w-5 h-5 text-emerald-500" />
            <span>WhatsApp Nuwan</span>
          </motion.a>
        </motion.div>

        {/* Key Highlight Metrics Bar */}
        <motion.div variants={itemVariants} className={`grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl pt-8 border-t ${
          isDark ? "border-white/15" : "border-emerald-900/15"
        }`}>
          {[
            { value: "100%", label: "Elephant Sighting" },
            { value: "4x4", label: "Custom Open Jeeps" },
            { value: "Since 2020", label: "Local Safari Guide" },
            { value: "5.0 ★", label: "Top Rated Service" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center"
            >
              <span className="text-2xl sm:text-3xl font-black text-amber-500 mb-1">{stat.value}</span>
              <span className={`text-[10px] sm:text-[11px] uppercase tracking-wider font-bold ${
                isDark ? "text-emerald-200/90" : "text-emerald-900"
              }`}>{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
