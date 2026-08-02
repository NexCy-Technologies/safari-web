"use client"

import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { REVIEWS } from "@/data/reviewsData"

interface ReviewsSectionProps {
  theme: "light" | "dark"
}

export default function ReviewsSection({ theme }: ReviewsSectionProps) {
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

  const reviewVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  }

  return (
    <section id="reviews" className={`py-16 sm:py-24 relative overflow-hidden ${isDark ? "bg-[#08110d]" : "bg-emerald-50/50"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <Icon icon="mdi:star-circle" className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-emerald-500">
              5-Star Guest Experiences
            </span>
          </div>
          <h2 className={`text-3xl md:text-5xl font-black font-playfair mb-4 ${isDark ? "text-white" : "text-emerald-950"}`}>
            Loved By Travelers Worldwide
          </h2>
          <p className={`text-sm md:text-base leading-relaxed ${isDark ? "text-gray-400" : "text-emerald-900/70"}`}>
            Read verified reviews from guests who experienced the magic of Udawalawe with certified guide Nuwan.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {REVIEWS.map((rev) => (
            <motion.div
              variants={reviewVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              key={rev.id}
              className={`p-6 md:p-8 rounded-[2rem] flex flex-col justify-between transition-shadow duration-300 ${
                isDark
                  ? "bg-white/5 border border-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-emerald-900/20"
                  : "bg-white border border-emerald-950/10 shadow-lg hover:shadow-2xl hover:shadow-emerald-900/10"
              }`}
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1.5 mb-6 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Icon icon="mdi:star" className="w-5 h-5" />
                    </motion.div>
                  ))}
                </div>

                {/* Review Text */}
                <p className={`text-sm leading-relaxed italic mb-8 relative z-10 ${isDark ? "text-gray-300" : "text-emerald-950"}`}>
                  <Icon icon="mdi:format-quote-open" className="absolute -top-4 -left-2 w-8 h-8 opacity-10 text-emerald-500 -z-10" />
                  &quot;{rev.reviewText}&quot;
                </p>
              </div>

              {/* User Info */}
              <div className="pt-5 border-t border-emerald-500/20 flex items-center justify-between">
                <div>
                  <h4 className={`text-base font-bold font-playfair mb-0.5 ${isDark ? "text-white" : "text-emerald-950"}`}>
                    {rev.name}
                  </h4>
                  <span className={`text-[11px] font-medium uppercase tracking-wider ${isDark ? "text-emerald-400" : "text-emerald-700"}`}>
                    {rev.location} • {rev.tripType}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold tracking-wider uppercase">
                  <Icon icon={rev.source === 'Google' ? 'mdi:google' : 'mdi:tripadvisor'} className="w-4 h-4" />
                  <span>{rev.source}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
