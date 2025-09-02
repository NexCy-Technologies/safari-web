"use client"

import type React from "react"
import { Icon } from "@iconify/react"

interface RecommendedSafariProps {
  className?: string
}

const RecommendedSafari: React.FC<RecommendedSafariProps> = ({ className = "" }) => {
  return (
    <section
      id="recommended-safari"
      className={`py-10 sm:py-12 relative overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-transparent to-emerald-900/15"></div>

      {/* Decorative circles */}
      <div className="pointer-events-none absolute top-12 left-5 sm:left-10 w-20 h-20 bg-green-500/10 rounded-full blur-2xl"></div>
      <div className="pointer-events-none absolute bottom-12 right-5 sm:right-10 w-24 h-24 bg-emerald-400/10 rounded-full blur-2xl"></div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 text-center">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl text-green-100 mb-2 font-bold font-serif">
            Our Safari Recommendation
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-400 mx-auto mb-3"></div>
          <p className="text-green-200 text-sm sm:text-base max-w-xl mx-auto">
            If you’re visiting Udawalawe, we highly recommend this trusted safari service.
          </p>
        </div>

        {/* Recommendation Card */}
        <article
          className="
            max-w-xl mx-auto p-5 sm:p-6 rounded-2xl
            backdrop-blur-xl bg-white/5 border border-white/10
            shadow-xl hover:shadow-green-500/20 hover:border-green-400/30
            transition-all duration-300 hover:scale-[1.01]
          "
        >
          <h3 className="text-green-100 text-lg sm:text-xl font-serif font-bold mb-2">
            Udawalawe Chaam Safari and Tours
          </h3>
          <p className="text-green-200 text-sm sm:text-base mb-4">
            A recommended safari experience for exploring Udawalawe National Park. 
            Known for excellent guiding, comfortable tours and amazing elephant sightings.
          </p>

          <div className="flex justify-center">
            <a
              href="https://g.co/kgs/7EjQmM7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm bg-green-600/20 hover:bg-green-600/30 border border-green-400/30 hover:border-green-400/50 text-green-300 hover:text-green-200 font-medium text-sm transition-all duration-300 hover:scale-105"
            >
              <Icon icon="mdi:google" className="w-5 h-5" />
              View on Google
            </a>
          </div>
        </article>
      </div>
    </section>
  )
}

export default RecommendedSafari