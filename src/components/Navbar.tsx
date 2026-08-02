"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Icon } from "@iconify/react"
import { motion, AnimatePresence } from "framer-motion"

interface NavbarProps {
  theme: "light" | "dark"
  toggleTheme: () => void
  onOpenBooking: () => void
}

export default function Navbar({ theme, toggleTheme, onOpenBooking }: NavbarProps) {
  const isDark = theme === "dark"
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Safari Packages", href: "#safaris" },
    { name: "Wildlife Gallery", href: "#gallery" },
    { name: "Guest Reviews", href: "#reviews" },
    { name: "Contact Nuwan", href: "#contact" },
  ]

  const getNavTextColor = () => {
    if (!scrolled) return isDark ? "text-white" : "text-emerald-950"
    return isDark ? "text-gray-100" : "text-emerald-950"
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? isDark
            ? "bg-[#0b1712]/90 backdrop-blur-md border-b border-white/10 shadow-xl py-2.5 sm:py-3"
            : "bg-white/95 backdrop-blur-md border-b border-emerald-900/10 shadow-md py-2.5 sm:py-3 text-emerald-950"
          : isDark
          ? "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-3 sm:py-5"
          : "bg-gradient-to-b from-white/90 via-white/50 to-transparent py-3 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-emerald-500/40 shadow-lg group-hover:scale-105 transition-transform duration-300">
            <Image
              src="/logo.webp"
              alt="Udawalawe Safari by Nuwan"
              fill
              className="object-cover"
              sizes="44px"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className={`font-black tracking-wider text-sm sm:text-base leading-tight uppercase font-playfair ${getNavTextColor()}`}>
              Udawalawe <span className="text-emerald-500">Safari</span>
            </span>
            <span className={`hidden xs:inline-block text-[9px] sm:text-[10px] tracking-widest uppercase font-semibold ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>
              By Nuwan • Certified Guide
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={link.name}
              href={link.href}
              className={`text-xs uppercase font-bold tracking-wider transition-colors duration-200 hover:text-emerald-500 relative py-1 ${getNavTextColor()}`}
            >
              {link.name}
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className={`p-2 rounded-full transition-colors duration-300 ${
              isDark
                ? "bg-white/15 text-amber-400 hover:bg-white/25"
                : "bg-emerald-900/10 text-emerald-800 hover:bg-emerald-900/20"
            }`}
          >
            <Icon icon={isDark ? "mdi:white-balance-sunny" : "mdi:moon-waning-crescent"} className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://wa.me/94776103421?text=Hi%20Nuwan,%20I'd%20like%20to%20inquire%20about%20a%20Safari!"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-emerald-600/30"
          >
            <Icon icon="mdi:whatsapp" className="w-4 h-4" />
            <span>WhatsApp</span>
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenBooking}
            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-black text-[10px] sm:text-xs uppercase tracking-wider shadow-md transition-all duration-300"
          >
            Book Jeep
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className={`md:hidden p-2 rounded-lg ${getNavTextColor()}`}
          >
            <Icon icon={mobileMenuOpen ? "mdi:close" : "mdi:menu"} className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden border-b overflow-hidden ${
              isDark ? "bg-[#0b1712] border-white/10 text-white" : "bg-white border-emerald-900/10 text-emerald-950"
            }`}
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <motion.a
                  whileTap={{ scale: 0.98 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-bold uppercase tracking-wider py-3 border-b border-white/5 flex items-center justify-between hover:text-emerald-500 transition-colors"
                >
                  <span>{link.name}</span>
                  <Icon icon="mdi:chevron-right" className="w-5 h-5 text-emerald-500" />
                </motion.a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <motion.a
                  whileTap={{ scale: 0.98 }}
                  href="https://wa.me/94776103421"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-xl bg-emerald-600 text-white font-bold text-center flex items-center justify-center gap-2 text-sm uppercase tracking-wider shadow-lg shadow-emerald-600/30"
                >
                  <Icon icon="mdi:whatsapp" className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
