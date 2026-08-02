"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import SafariPackages from "@/components/SafariPackages"
import GallerySection from "@/components/GallerySection"
import ReviewsSection from "@/components/ReviewsSection"
import ContactSection from "@/components/ContactSection"
import BookingModal from "@/components/BookingModal"
import Footer from "@/components/Footer"

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [bookingOpen, setBookingOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState("Morning Wildlife Safari")

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  const handleOpenBookingWithPackage = (pkgTitle?: string) => {
    if (pkgTitle) setSelectedPackage(pkgTitle)
    setBookingOpen(true)
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${theme === "dark" ? "bg-[#08110d] text-white" : "bg-white text-emerald-950"}`}>
      {/* Navigation Header */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenBooking={() => handleOpenBookingWithPackage()}
      />

      {/* Main Page Sections */}
      <main>
        <Hero
          theme={theme}
          onOpenBooking={() => handleOpenBookingWithPackage()}
        />

        <SafariPackages
          theme={theme}
          onSelectPackage={(title) => handleOpenBookingWithPackage(title)}
        />

        <GallerySection
          theme={theme}
        />

        <ReviewsSection
          theme={theme}
        />

        <ContactSection
          theme={theme}
        />
      </main>

      {/* Footer */}
      <Footer theme={theme} />

      {/* Direct Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialPackage={selectedPackage}
      />
    </div>
  )
}