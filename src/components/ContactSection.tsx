"use client"

import { Icon } from "@iconify/react"

interface ContactSectionProps {
  theme: "light" | "dark"
}

export default function ContactSection({ theme }: ContactSectionProps) {
  const isDark = theme === "dark"

  return (
    <section id="contact" className={`py-16 sm:py-24 relative ${isDark ? "bg-[#0b1712]" : "bg-white"}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Contact Details */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <Icon icon="mdi:phone-in-talk" className="w-4 h-4 text-emerald-500" />
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-500">
                Instant Safari Booking
              </span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-black font-playfair mb-4 ${isDark ? "text-white" : "text-emerald-950"}`}>
              Connect Directly with Nuwan
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed mb-8 ${isDark ? "text-gray-300" : "text-emerald-900/80"}`}>
              Have questions about park opening hours, ticket prices, or custom itineraries? Send a message on WhatsApp for instant confirmation.
            </p>

            <div className="space-y-4 mb-8">
              <a
                href="https://wa.me/94776103421?text=Hi%20Nuwan,%20I'd%20like%20to%20book%20a%20safari!"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-between transition-all duration-300 shadow-lg hover:shadow-emerald-600/30 hover:-translate-y-0.5 group"
              >
                <div className="flex items-center gap-3">
                  <Icon icon="mdi:whatsapp" className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="text-sm font-bold">Chat on WhatsApp</h4>
                    <span className="text-xs text-emerald-100">+94 77 610 3421 (Instant Reply)</span>
                  </div>
                </div>
                <Icon icon="mdi:arrow-right" className="w-5 h-5" />
              </a>

              <a
                href="tel:+94776103421"
                className={`p-4 rounded-2xl border flex items-center justify-between transition-all duration-300 ${
                  isDark ? "bg-white/5 border-white/10 hover:bg-white/10 text-white" : "bg-emerald-50/50 border-emerald-950/10 text-emerald-950"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon icon="mdi:phone" className="w-6 h-6 text-emerald-500" />
                  <div>
                    <h4 className="text-sm font-bold">Direct Phone Call</h4>
                    <span className={`text-xs ${isDark ? "text-gray-400" : "text-emerald-900/70"}`}>+94 77 610 3421</span>
                  </div>
                </div>
                <Icon icon="mdi:arrow-right" className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Map Preview Card */}
          <div className={`p-6 rounded-3xl border shadow-xl ${isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-emerald-950/10"}`}>
            <h3 className="text-xl font-bold font-playfair mb-2">Location & Meeting Point</h3>
            <p className={`text-xs mb-4 ${isDark ? "text-gray-300" : "text-emerald-900/80"}`}>
              Udawalawe National Park Entrance Gate • Pickup provided from all local hotels & guesthouses.
            </p>
            <div className="w-full h-64 rounded-2xl overflow-hidden relative border border-emerald-500/20">
              <iframe
                title="Udawalawe Safari Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15858.972304899532!2d80.8753!3d6.4833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae40987da7eefbe%3A0x88c4edff321ee7bf!2sUdawalawe%20National%20Park!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
