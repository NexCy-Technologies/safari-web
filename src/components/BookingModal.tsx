"use client"

import { useState } from "react"
import { Icon } from "@iconify/react"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  initialPackage?: string
}

export default function BookingModal({ isOpen, onClose, initialPackage = "Morning Wildlife Safari" }: BookingModalProps) {
  const [name, setName] = useState("")
  const [date, setDate] = useState("")
  const [guests, setGuests] = useState("2")
  const [selectedTour, setSelectedTour] = useState(initialPackage)
  const [notes, setNotes] = useState("")

  if (!isOpen) return null

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault()
    const message = `*Udawalawe Safari Inquiry*%0A%0A*Name:* ${encodeURIComponent(name || "Guest")}%0A*Tour Option:* ${encodeURIComponent(selectedTour)}%0A*Preferred Date:* ${encodeURIComponent(date || "Flexible")}%0A*Passengers:* ${encodeURIComponent(guests)}%0A*Notes/Pickup:* ${encodeURIComponent(notes || "None")}`
    window.open(`https://wa.me/94776103421?text=${message}`, "_blank")
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#0e221b] border border-emerald-500/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-white shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Close booking modal"
        >
          <Icon icon="mdi:close" className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-2">
            <Icon icon="mdi:calendar-edit" className="w-4 h-4 text-amber-400" />
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
              Direct Safari Inquiry
            </span>
          </div>
          <h3 className="text-2xl font-bold font-playfair">Reserve Your Jeep Safari</h3>
          <p className="text-xs text-gray-300">
            Instant booking confirmation directly with senior guide Nuwan over WhatsApp.
          </p>
        </div>

        <form onSubmit={handleWhatsAppBooking} className="space-y-4">
          <div>
            <label className="block text-xs uppercase font-bold text-gray-300 mb-1">Your Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sarah Jenkins"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-bold text-gray-300 mb-1">Safari Tour</label>
              <select
                value={selectedTour}
                onChange={(e) => setSelectedTour(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#142e24] border border-white/15 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
              >
                <option value="Morning Wildlife Safari">Morning Safari (3.5h)</option>
                <option value="Evening Sunset Safari">Evening Safari (3.5h)</option>
                <option value="Ultimate Full-Day Explorer">Full Day Tour (10h)</option>
                <option value="Custom Tailored Safari">Custom Tailored Safari</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-gray-300 mb-1">Preferred Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#142e24] border border-white/15 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-gray-300 mb-1">Number of Passengers</label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#142e24] border border-white/15 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
            >
              <option value="1">1 Person</option>
              <option value="2">2 Persons</option>
              <option value="3-4">3 - 4 Persons</option>
              <option value="5-6">5 - 6 Persons (Private Jeep)</option>
              <option value="7+">Group Tour (7+ Persons)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-gray-300 mb-1">Special Notes / Hotel Pickup</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Mention your hotel name or special requests..."
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:whatsapp" className="w-5 h-5" />
            <span>Send Safari Inquiry on WhatsApp</span>
          </button>
        </form>
      </div>
    </div>
  )
}
