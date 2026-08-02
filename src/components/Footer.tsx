"use client"

import Image from "next/image"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"

interface FooterProps {
  theme: "light" | "dark"
}

export default function Footer({ theme }: FooterProps) {
  const isDark = theme === "dark"

  const containerVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5
      }
    }
  }

  const itemVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <footer className={`py-12 border-t overflow-hidden ${isDark ? "bg-[#050b08] border-white/10 text-gray-400" : "bg-emerald-950 border-emerald-900 text-emerald-200"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12"
        >
          {/* Brand Info */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-emerald-500/40">
                <Image src="/logo.webp" alt="Udawalawe Safari Logo" fill className="object-cover" />
              </div>
              <span className="font-black text-xl text-white font-playfair tracking-wider">
                Udawalawe Safari <br/><span className="text-emerald-500 text-sm">by Nuwan</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-md opacity-80 mb-6">
              Premier #1 rated wildlife jeep safari service in Udawalawe National Park, Sri Lanka. Offering guaranteed elephant sightings, certified local guide Nuwan (operating since 2020), and custom 4x4 open-top jeeps.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: "mdi:facebook", link: "https://www.facebook.com/profile.php?id=100081508587185", label: "Facebook" },
                { icon: "mdi:instagram", link: "https://www.instagram.com/udawalawe_jeep_safari_service", label: "Instagram" },
                { icon: "mdi:whatsapp", link: "https://wa.me/94776103421", label: "WhatsApp" }
              ].map((social, idx) => (
                <motion.a
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-3 rounded-full bg-white/10 hover:bg-emerald-600 text-white transition-colors"
                >
                  <Icon icon={social.icon} className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {["safaris", "gallery", "reviews", "contact"].map((link) => (
                <li key={link}>
                  <a href={`#${link}`} className="hover:text-emerald-400 transition-colors capitalize">
                    {link === "safaris" ? "Safari Packages" : link === "gallery" ? "Wildlife Gallery" : link === "reviews" ? "Guest Reviews" : "Contact & Location"}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Location */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-6">Park Location</h4>
            <p className="text-sm leading-relaxed opacity-80 mb-4">
              Udawalawe National Park Entrance Gate,<br />
              Sabaragamuwa Province, Sri Lanka.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
              <Icon icon="mdi:clock-outline" className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold text-amber-500">Hours: 5:00 AM – 6:30 PM Daily</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs opacity-75 gap-4"
        >
          <span>&copy; {new Date().getFullYear()} Udawalawe Safari by Nuwan. All rights reserved.</span>
          <span className="flex items-center gap-1.5 text-emerald-400/80">
            <Icon icon="mdi:lightning-bolt" className="w-4 h-4" />
            Fast Static & Edge Performance
          </span>
        </motion.div>
      </div>
    </footer>
  )
}
