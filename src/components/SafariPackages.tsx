"use client"

import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { SAFARI_PACKAGES } from "@/data/safariPackagesData"

interface SafariPackagesProps {
  theme: "light" | "dark"
  onSelectPackage: (packageTitle: string) => void
}

export default function SafariPackages({ theme, onSelectPackage }: SafariPackagesProps) {
  const isDark = theme === "dark"

  const containerVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  }

  const cardVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
  }

  return (
    <section id="safaris" className={`py-16 sm:py-24 relative overflow-hidden ${isDark ? "bg-[#0b1712]" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
            <Icon icon="mdi:compass-rose" className="w-4 h-4 md:w-5 md:h-5 text-amber-500" />
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-amber-500">
              Safari Tour Experiences
            </span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-black font-playfair mb-4 ${isDark ? "text-white" : "text-emerald-950"}`}>
            Choose Your Wildlife Adventure
          </h2>
          <p className={`text-sm md:text-base leading-relaxed max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-emerald-900/70"}`}>
            All tours include a private open-top 4x4 safari jeep, certified wildlife driver Nuwan, binoculars, and park refreshments. Let's make your Sri Lankan wildlife dream a reality.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch"
        >
          {SAFARI_PACKAGES.map((pkg) => (
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -10 }}
              key={pkg.id}
              className={`relative rounded-[2rem] p-6 md:p-8 flex flex-col justify-between transition-shadow duration-300 ${
                pkg.popular
                  ? isDark
                    ? "bg-gradient-to-b from-emerald-900/50 via-[#0e221b] to-[#08110d] border-2 border-emerald-500/80 shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]"
                    : "bg-gradient-to-b from-emerald-50 via-white to-emerald-50/30 border-2 border-emerald-500 shadow-2xl shadow-emerald-900/10"
                  : isDark
                  ? "bg-white/5 border border-white/10 hover:border-white/20 hover:shadow-xl hover:shadow-emerald-900/20"
                  : "bg-white border border-emerald-950/10 shadow-sm hover:shadow-xl"
              }`}
            >
              {/* Badge */}
              {pkg.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-emerald-950 text-[10px] md:text-xs font-black uppercase tracking-wider shadow-lg whitespace-nowrap z-10">
                  {pkg.badge}
                </div>
              )}

              <div>
                {/* Title & Subtitle */}
                <div className="mb-6 pt-2">
                  <h3 className={`text-xl md:text-2xl font-bold font-playfair mb-2 ${isDark ? "text-white" : "text-emerald-950"}`}>
                    {pkg.title}
                  </h3>
                  <p className={`text-xs md:text-sm font-medium ${isDark ? "text-emerald-400" : "text-emerald-700"}`}>
                    {pkg.subtitle}
                  </p>
                </div>

                {/* Timing info */}
                <div className={`p-4 rounded-2xl mb-6 flex flex-col gap-2 text-xs md:text-sm font-semibold ${
                  isDark ? "bg-black/20 text-gray-300" : "bg-emerald-50/80 text-emerald-900"
                }`}>
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:clock-outline" className="w-5 h-5 text-emerald-500" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:weather-sunny" className="w-5 h-5 text-amber-500" />
                    <span className="opacity-90">{pkg.timing}</span>
                  </div>
                </div>

                {/* Description */}
                <p className={`text-sm leading-relaxed mb-6 ${isDark ? "text-gray-300" : "text-emerald-900/80"}`}>
                  {pkg.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Icon icon="mdi:check-circle" className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span className={isDark ? "text-gray-300" : "text-emerald-900/90"}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button - No Prices! */}
              <div className="pt-6 border-t border-emerald-500/20">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelectPackage(pkg.title)}
                  className={`w-full py-4 rounded-full font-bold text-xs md:text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 group ${
                    pkg.popular
                      ? "bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-600/30 hover:shadow-emerald-500/40"
                      : isDark
                      ? "bg-white/10 hover:bg-white/20 text-white"
                      : "bg-emerald-900 hover:bg-emerald-800 text-white"
                  }`}
                >
                  <Icon icon="mdi:calendar-multiselect" className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>Inquire & Reserve</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
