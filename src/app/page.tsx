"use client"

import { useEffect, useState, useRef, memo, useCallback } from "react"
import { Icon } from "@iconify/react"
import Image from "next/image"
import dynamic from "next/dynamic"

const SkeletonLoader = memo(({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse ${className}`}>
    <div className="h-full w-full bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-800/50 rounded-2xl relative overflow-hidden">
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  </div>
))
SkeletonLoader.displayName = "SkeletonLoader"

const RecommendedSafaris = dynamic(() => import("@/components/RecommendedSafaris"), {
  loading: () => <SkeletonLoader className="h-64 mx-4 sm:mx-6 md:mx-8" />,
  ssr: false,
})
const Reviews = dynamic(() => import("@/components/Reviews"), {
  loading: () => <SkeletonLoader className="h-96 mx-4 sm:mx-6 md:mx-8" />,
  ssr: false,
})
const Gallery = dynamic(() => import("@/components/Gallery"), {
  loading: () => <SkeletonLoader className="h-96 mx-4 sm:mx-6 md:mx-8" />,
  ssr: false,
})

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentHero, setCurrentHero] = useState(0)
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [scrollY, setScrollY] = useState(0)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  
  const aboutRef = useRef<HTMLElement>(null)
  const packagesRef = useRef<HTMLElement>(null)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" })
      setMenuOpen(false)
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % 4)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px 0px -50px 0px" }
    )

    const sections = [aboutRef.current, packagesRef.current, footerRef.current]
    sections.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const heroImages = [
    { src: "/assets/hero1.webp", priority: true },
    { src: "/assets/hero2.webp", priority: false },
    { src: "/assets/hero3.webp", priority: false },
    { src: "/assets/hero4.webp", priority: false }
  ]

  const packages = [
    {
      title: "3-Hour Safari",
      description: "Quick but immersive experience into the Udawalawe wilderness.",
      duration: "3 hours",
      icon: "mdi:clock-fast",
      highlights: ["Morning/Evening slots", "Essential wildlife zones", "Perfect for tight schedules"]
    },
    {
      title: "4-Hour Safari",
      description: "Extended wildlife spotting with peaceful terrain navigation.",
      duration: "4 hours",
      icon: "mdi:binoculars",
      highlights: ["Extended viewing time", "Multiple habitats", "Photography focused"]
    },
    {
      title: "Half-Day Safari",
      description: "Ideal balance of wildlife viewing and scenic breaks.",
      duration: "Around 6 hours",
      icon: "mdi:weather-sunset",
      highlights: ["Comprehensive coverage", "Refreshment breaks", "Best value option"]
    },
    {
      title: "Full-Day Safari",
      description: "Complete experience with lunch stop and full coverage.",
      duration: "Around 10 hours",
      icon: "mdi:compass",
      highlights: ["All park zones", "Lunch included", "Maximum wildlife sightings"]
    },
    {
      title: "Custom Safari",
      description: "Tailored route and timing based on your preferences.",
      duration: "Flexible",
      icon: "mdi:map-marker-path",
      highlights: ["Your schedule", "Personalized route", "Special requests welcome"]
    },
  ]

  const isAboutVisible = visibleSections.has("about")
  const isPackagesVisible = visibleSections.has("packages")
  const isFooterVisible = visibleSections.has("contact")

  const getAnimationStyle = useCallback((visible: boolean, delay = 0) => {
    if (prefersReducedMotion) return {}
    return {
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(40px)',
      transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
    }
  }, [prefersReducedMotion])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black text-white font-sans antialiased">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[5%] left-[3%] w-24 h-24 sm:w-32 sm:h-32 bg-green-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-[15%] right-[5%] w-28 h-28 sm:w-40 sm:h-40 bg-emerald-500/8 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/3 via-transparent to-emerald-900/5" />
      </div>

      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrollY > 50 ? "backdrop-blur-xl bg-black/60 shadow-2xl border-b border-green-500/20" : "bg-transparent"
        }`}
      >
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-3 sm:py-3.5 md:py-4 flex justify-between items-center">
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2 sm:gap-2.5 md:gap-3 cursor-pointer select-none group"
            aria-label="Go to homepage"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 flex-shrink-0">
              <Image
                src="/logo.webp"
                alt="Udawalawe Safari by Nuwan"
                fill
                sizes="(max-width: 640px) 40px, 48px"
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                priority
                quality={90}
              />
            </div>
            <div className="text-[clamp(0.875rem,3vw,1.75rem)] tracking-tight text-green-50 group-hover:text-green-200 transition-colors duration-300 font-bold font-serif leading-tight">
              Udawalawe Safari
            </div>
          </button>

          <div className="relative">
            <button
              className="p-2 sm:p-2.5 md:p-3 rounded-xl hover:bg-green-900/20 active:scale-95 transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-green-400/50 lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <Icon
                icon={menuOpen ? "mdi:close" : "mdi:menu"}
                className="text-green-300 w-6 h-6 transition-transform duration-300"
              />
            </button>

            <nav
              className={`absolute top-full right-0 mt-3 bg-black/90 backdrop-blur-xl border border-green-500/30 rounded-2xl flex flex-col space-y-0.5 py-5 sm:py-6 px-5 sm:px-6 uppercase tracking-wider font-semibold text-green-100 shadow-2xl min-w-[200px] sm:min-w-[220px] transition-all duration-300 lg:hidden ${
                menuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
              }`}
              aria-hidden={!menuOpen}
            >
              {["About", "Packages", "Gallery", "Reviews", "Contact"].map((section, index) => (
                <button
                  key={section}
                  onClick={() => scrollTo(section.toLowerCase())}
                  className="py-2.5 sm:py-3 px-3.5 sm:px-4 rounded-xl hover:text-green-300 hover:bg-green-900/20 active:scale-98 transition-all duration-200 text-left text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-400/50"
                  style={{ transitionDelay: menuOpen ? `${index * 40}ms` : '0ms' }}
                >
                  {section}
                </button>
              ))}
            </nav>

            <nav className="hidden lg:flex gap-4 xl:gap-6 2xl:gap-7 uppercase tracking-wide font-semibold text-green-100 text-xs xl:text-sm 2xl:text-base">
              {["About", "Packages", "Gallery", "Reviews", "Contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollTo(section.toLowerCase())}
                  className="px-2 py-1.5 hover:text-green-300 transition-colors duration-300 relative group focus:outline-none focus:text-green-300"
                >
                  {section}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <section
        id="hero"
        className="relative h-[100vh] flex justify-center items-center touch-auto"
        style={{ minHeight: '100vh', maxHeight: '100vh' }}
      >
        {/* Background Image Layer */}
        <div className="absolute inset-0 w-full h-full bg-black pointer-events-none">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 pointer-events-none ${
                index === currentHero ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={img.src}
                alt={`Udawalawe Safari Wildlife ${index + 1}`}
                fill
                sizes="100vw"
                className="object-cover"
                style={{ 
                  filter: "brightness(0.5) contrast(1.15) saturate(1.15)",
                  objectPosition: "center"
                }}
                priority={img.priority}
                quality={75}
                loading={img.priority ? "eager" : "lazy"}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzFhMWExYSIvPjwvc3ZnPg=="
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-10 pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 w-full flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8 lg:px-12 py-20 sm:py-24 md:py-28 pointer-events-auto">
          <div className="max-w-5xl w-full">
            <h1 className="font-serif font-bold tracking-tight text-white mb-4 sm:mb-5 md:mb-6 leading-[1.1]">
              <span className="block text-[clamp(1.25rem,4vw,2rem)] sm:text-[clamp(1.5rem,4vw,2.25rem)] md:text-[clamp(1.75rem,3.5vw,2.5rem)] lg:text-[clamp(2rem,3vw,2.75rem)] mb-2 drop-shadow-lg">
                Experience the
              </span>
              <span className="block text-[clamp(2rem,8vw,5rem)] sm:text-[clamp(2.5rem,8vw,5.5rem)] md:text-[clamp(3rem,7vw,6rem)] lg:text-[clamp(3.5rem,6vw,7rem)] bg-gradient-to-r from-green-400 via-emerald-300 to-lime-300 bg-clip-text text-transparent font-extrabold mb-2">
                Wild Safari
              </span>
              <span className="block text-[clamp(1.25rem,4vw,2rem)] sm:text-[clamp(1.5rem,4vw,2.25rem)] md:text-[clamp(1.75rem,3.5vw,2.5rem)] lg:text-[clamp(2rem,3vw,2.75rem)] text-green-50 drop-shadow-lg">
                of Udawalawe
              </span>
            </h1>

            <p className="text-green-50 text-[clamp(0.875rem,2vw,1.125rem)] sm:text-[clamp(1rem,2vw,1.25rem)] leading-relaxed drop-shadow-lg mx-auto max-w-3xl mb-6 sm:mb-8 px-2">
              Embark on an unforgettable journey through Sri Lanka's untamed wilderness with expert guide Nuwan—where
              every moment brings you closer to nature's most magnificent creatures.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-xl mx-auto px-2">
              <a
                href="https://wa.me/94776103421?text=I'm%20interested%20in%20your%20wild%20safari%20tours.%20Can%20you%20tell%20me%20more%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-2.5 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 active:scale-98 text-white font-semibold px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 rounded-full shadow-2xl shadow-green-500/20 transition-all duration-300 text-[clamp(0.875rem,2vw,1rem)] sm:text-[clamp(0.938rem,2vw,1.125rem)] border border-green-400/30 focus:outline-none focus:ring-2 focus:ring-green-400/50"
                aria-label="Book a wild safari tour via WhatsApp"
              >
                <Icon icon="mdi:jeepney" className="w-5 h-5 sm:w-5.5 sm:h-5.5 flex-shrink-0" />
                <span>Book Wild Safari</span>
              </a>
              <button
                onClick={() => scrollTo("packages")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-2.5 bg-white/10 hover:bg-white/20 active:scale-98 text-white font-semibold px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 rounded-full border-2 border-green-400/40 hover:border-green-400/60 transition-all duration-300 text-[clamp(0.875rem,2vw,1rem)] sm:text-[clamp(0.938rem,2vw,1.125rem)] focus:outline-none focus:ring-2 focus:ring-green-400/50"
                aria-label="Explore safari packages"
              >
                <Icon icon="mdi:binoculars" className="w-5 h-5 sm:w-5.5 sm:h-5.5 flex-shrink-0" />
                <span>Explore Packages</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dots Navigation - Fixed size for touch targets */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 sm:gap-4 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHero(index)}
              aria-label={`View hero image ${index + 1}`}
              className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400/50 ${
                index === currentHero
                  ? "bg-green-400/20"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              <span className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentHero
                  ? "bg-green-400 scale-125 shadow-lg shadow-green-400/50"
                  : "bg-white/50"
              }`} />
            </button>
          ))}
        </div>
      </section>

      <section
        ref={aboutRef}
        id="about"
        className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-32"
        style={getAnimationStyle(isAboutVisible)}
      >
        <div className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 sm:gap-2.5 md:gap-3 mb-5 sm:mb-6 bg-white/5 border border-white/10 rounded-full px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3">
            <Icon icon="mdi:tree" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-400 flex-shrink-0" />
            <span className="text-green-300 font-semibold tracking-widest uppercase text-xs sm:text-sm whitespace-nowrap">
              Into the Wild
            </span>
            <Icon icon="mdi:elephant" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-400 flex-shrink-0" />
          </div>
          <h2 className="text-[clamp(1.5rem,5vw,4rem)] text-green-50 mb-4 sm:mb-5 font-bold font-serif tracking-tight leading-tight px-2">
            Wild Safari Experience
          </h2>
          <div className="w-20 sm:w-24 lg:w-28 h-1 bg-gradient-to-r from-green-500 to-emerald-400 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-14 xl:gap-16 items-center">
          <div className="space-y-5 sm:space-y-6 text-justify">
            <p className="text-green-50 text-[clamp(0.875rem,2vw,1.25rem)] leading-relaxed">
              Join an unforgettable safari experience in Udawalawe with Nuwan, a knowledgeable and friendly local guide
              who has been exploring the park for years. Nuwan offers half-day and full-day safaris that are perfectly
              timed to catch the best animal sightings, all while ensuring your comfort and safety.
            </p>
            <p className="text-green-50 text-[clamp(0.875rem,2vw,1.25rem)] leading-relaxed">
              Whether it's your first safari or one of many, Nuwan's deep understanding of the area and its wildlife
              will make your journey both exciting and educational. Travel in a well-maintained, comfortable 4x4 jeep
              with plenty of space for photography and viewing.
            </p>
            <p className="text-green-50 text-[clamp(0.875rem,2vw,1.25rem)] leading-relaxed">
              With Nuwan's sharp eye and experience, you're likely to spot a wide range of wildlife—from herds of
              elephants and water buffalo to crocodiles, deer, and many bird species. His local insights add great value
              to the tour, helping you understand animal behaviors, park history, and the delicate balance of
              Udawalawe's ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            {[
              {
                icon: "mdi:elephant",
                title: "Wildlife Expertise",
                desc: "Expert knowledge of local wildlife behavior and habitats",
              },
              {
                icon: "mdi:jeepney",
                title: "Comfortable Vehicles",
                desc: "Well-maintained 4x4 jeeps with optimal viewing angles",
              },
              {
                icon: "mdi:camera",
                title: "Photography Focus",
                desc: "Perfect positioning for wildlife photography opportunities",
              },
              {
                icon: "mdi:shield-check",
                title: "Safety First",
                desc: "Prioritizing your safety while maximizing adventure",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-7 shadow-xl hover:shadow-2xl hover:bg-white/8 transition-all duration-500 hover:border-emerald-400/40 group"
                style={getAnimationStyle(isAboutVisible, i * 120)}
              >
                <Icon
                  icon={item.icon}
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 text-green-400 mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110"
                />
                <h3 className="font-bold text-emerald-100 text-[clamp(0.75rem,2vw,1.125rem)] mb-1.5 sm:mb-2">{item.title}</h3>
                <p className="text-emerald-200 text-[clamp(0.688rem,1.5vw,1rem)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={packagesRef}
        id="packages"
        className="w-full py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-32 relative"
        style={getAnimationStyle(isPackagesVisible)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/8 via-transparent to-teal-900/10" />

        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 relative z-10">
          <div className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16">
            <h2 className="text-[clamp(1.5rem,5vw,4rem)] text-green-50 mb-4 sm:mb-5 font-bold font-serif tracking-tight leading-tight px-2">
              Safari Packages
            </h2>
            <div className="w-20 sm:w-24 lg:w-28 h-1 bg-gradient-to-r from-green-500 to-emerald-400 mx-auto rounded-full" />
            <p className="text-green-50 text-[clamp(0.875rem,2vw,1.25rem)] mt-5 sm:mt-6 md:mt-7 max-w-3xl mx-auto leading-relaxed px-2">
              Choose from our carefully crafted safari experiences, each designed to showcase the best of Udawalawe's
              wildlife
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className="group bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-7 xl:p-9 shadow-2xl transition-all duration-500 cursor-pointer hover:border-emerald-400/40 hover:bg-white/8 relative active:scale-98"
                onClick={() => setSelectedPackage(pkg.title)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    setSelectedPackage(pkg.title)
                  }
                }}
                aria-label={`Learn more about ${pkg.title}`}
                style={getAnimationStyle(isPackagesVisible, i * 90)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/15 via-transparent to-teal-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl sm:rounded-2xl lg:rounded-3xl" />

                <div className="relative z-10 text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-emerald-600 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-5 lg:mb-6 transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-emerald-500/30">
                    <Icon icon={pkg.icon} className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-emerald-100 font-bold mb-2 sm:mb-2.5 md:mb-3 lg:mb-4 group-hover:text-emerald-50 transition-colors duration-300 font-serif leading-tight">
                    {pkg.title}
                  </h3>
                  <p className="text-emerald-50 text-[0.688rem] sm:text-xs md:text-sm lg:text-base leading-relaxed mb-3 sm:mb-3.5 md:mb-4 lg:mb-5 min-h-[2.5rem] sm:min-h-[3rem] md:min-h-0">
                    {pkg.description}
                  </p>
                  <div className="flex items-center justify-center gap-1 sm:gap-1.5 text-emerald-300 font-semibold mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                    <Icon icon="mdi:clock-outline" className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5 flex-shrink-0" />
                    <span className="text-[0.688rem] sm:text-xs md:text-sm lg:text-base">{pkg.duration}</span>
                  </div>

                  <span className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white px-3 sm:px-4 md:px-5 lg:px-7 py-2 sm:py-2.5 md:py-3 lg:py-3.5 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/30 border border-emerald-400/20 text-[0.688rem] sm:text-xs md:text-sm lg:text-base inline-block group-hover:scale-105">
                    Learn More
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedPackage && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-[999] flex justify-center items-center p-4 sm:p-6 md:p-8 lg:p-10 animate-modal-fade-in"
          onClick={() => setSelectedPackage(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="package-title"
        >
          <div
            className="bg-white/10 border border-white/20 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12 w-full max-w-[calc(100%-2rem)] sm:max-w-md md:max-w-lg lg:max-w-2xl text-center relative shadow-2xl animate-modal-scale-in max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPackage(null)}
              className="absolute top-4 sm:top-5 right-4 sm:right-5 text-emerald-400 hover:text-emerald-300 transition-all duration-300 p-2 rounded-full hover:bg-emerald-900/30 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 z-10"
              aria-label="Close modal"
            >
              <Icon icon="mdi:close" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            </button>

            {(() => {
              const pkg = packages.find((p) => p.title === selectedPackage)
              if (!pkg) return null
              return (
                <>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-emerald-600 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6 md:mb-8 shadow-lg shadow-emerald-500/30">
                    <Icon icon={pkg.icon} className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                  </div>

                  <h3
                    id="package-title"
                    className="text-2xl sm:text-3xl md:text-4xl text-emerald-100 mb-4 sm:mb-5 md:mb-6 font-bold font-serif"
                  >
                    {pkg.title}
                  </h3>

                  <p className="text-green-50 text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-7 md:mb-8 leading-relaxed">
                    {pkg.description}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-7 md:mb-8 text-emerald-300 font-semibold text-sm sm:text-base md:text-lg">
                    <Icon icon="mdi:clock-outline" className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 flex-shrink-0" />
                    <span>Duration: {pkg.duration}</span>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 mb-6 sm:mb-7 md:mb-8">
                    <h4 className="text-emerald-200 font-semibold text-sm sm:text-base md:text-lg mb-3 sm:mb-4">Package Highlights</h4>
                    <ul className="space-y-2 text-left">
                      {pkg.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 sm:gap-2.5 md:gap-3 text-green-100 text-xs sm:text-sm md:text-base">
                          <Icon icon="mdi:check-circle" className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={`https://wa.me/94776103421?text=${encodeURIComponent(
                      `Hello, I am interested in the ${pkg.title} package. Could you please provide more information, including pricing and availability?`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 sm:gap-2.5 md:gap-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 active:scale-98 text-white px-5 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-4 rounded-full font-semibold text-xs sm:text-sm md:text-base lg:text-lg transition-all duration-300 shadow-lg shadow-emerald-500/30 border border-emerald-400/20 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                    aria-label={`Contact us about ${pkg.title} via WhatsApp`}
                  >
                    <Icon icon="mdi:whatsapp" className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 flex-shrink-0" />
                    <span className="whitespace-nowrap">Contact Us for Details</span>
                  </a>
                </>
              )
            })()}
          </div>
        </div>
      )}

      <a
        href="https://wa.me/94776103421?text=Hello%2C%20I%20would%20like%20to%20chat%20about%20Wild%20Safari%20Adventures%20by%20Nuwan."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 sm:bottom-6 md:bottom-7 lg:bottom-8 right-5 sm:right-6 md:right-7 lg:right-8 bg-green-600/95 hover:bg-green-700/95 active:scale-95 text-white p-3.5 sm:p-4 md:p-4.5 lg:p-5 rounded-full shadow-2xl shadow-green-500/40 z-50 transition-all duration-300 border border-green-400/40 focus:outline-none focus:ring-2 focus:ring-green-400/50 group"
        aria-label="Chat with us on WhatsApp"
      >
        <Icon icon="mdi:whatsapp" className="w-6 h-6 sm:w-6.5 sm:h-6.5 md:w-7 md:h-7 lg:w-8 lg:h-8 transition-transform duration-300 group-hover:scale-110" />
      </a>

      <div className="space-y-0">
        <Gallery className="relative z-10" />
        <Reviews className="relative z-10" />
        <RecommendedSafaris className="relative z-10" />
      </div>

      <section id="contact" ref={footerRef}>
        <footer 
          className="relative pb-0"
          style={getAnimationStyle(isFooterVisible)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-green-900/20 to-black/90" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-emerald-400 to-green-500" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-14 md:py-16 lg:py-20">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-7 sm:gap-8 md:gap-9 lg:gap-10 mb-10 sm:mb-12">
              <div 
                className="lg:col-span-2"
                style={getAnimationStyle(isFooterVisible, 100)}
              >
                <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 mb-5 sm:mb-6">
                  <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0">
                    <Image
                      src="/favicon.ico"
                      alt="Udawalawe Safari by Nuwan"
                      width={44}
                      height={44}
                      className="object-contain"
                      loading="lazy"
                    />
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-100 font-serif">
                    Udawalawe Safari
                  </h2>
                </div>
                <p className="text-green-50 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-5 sm:mb-6 max-w-md">
                  Experience the untamed beauty of Udawalawe National Park with expert guide Nuwan. Every safari is a
                  journey into Sri Lanka's most spectacular wilderness.
                </p>

                <div className="flex gap-3 sm:gap-4">
                  {[
                    { icon: "mdi:google", href: "https://g.co/kgs/sPzai3", label: "Google Reviews" },
                    {
                      icon: "simple-icons:tripadvisor",
                      href: "https://www.tripadvisor.com/Attraction_Review-g3577009-d27673880",
                      label: "TripAdvisor Reviews",
                    },
                    {
                      icon: "mdi:facebook",
                      href: "https://www.facebook.com/profile.php?id=100081508587185",
                      label: "Facebook Page",
                    },
                    {
                      icon: "mdi:instagram",
                      href: "https://www.instagram.com/udawalawe_jeep_safari_service",
                      label: "Instagram Profile",
                    },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-green-600/20 border border-green-400/30 flex items-center justify-center text-green-300 hover:text-green-200 hover:bg-green-600/30 hover:border-green-400/50 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400/50 flex-shrink-0"
                    >
                      <Icon icon={social.icon} className="w-5 h-5 sm:w-6 sm:h-6" />
                    </a>
                  ))}
                </div>
              </div>

              <div style={getAnimationStyle(isFooterVisible, 200)}>
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-5 sm:mb-6 text-green-100 font-serif flex items-center gap-2">
                  <Icon icon="mdi:compass" className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-green-400 flex-shrink-0" />
                  Quick Links
                </h3>
                <div className="space-y-1.5 sm:space-y-2">
                  {["About", "Packages", "Gallery", "Reviews", "Contact"].map((section) => (
                    <button
                      key={section}
                      onClick={() => scrollTo(section.toLowerCase())}
                      className="block w-full text-left hover:text-green-400 transition-all duration-300 py-2 text-green-50 hover:translate-x-2 transform text-xs sm:text-sm md:text-base focus:outline-none focus:text-green-400"
                    >
                      <Icon icon="mdi:chevron-right" className="w-4 h-4 inline mr-2" />
                      {section}
                    </button>
                  ))}
                </div>
              </div>

              <div style={getAnimationStyle(isFooterVisible, 300)}>
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-5 sm:mb-6 text-green-100 font-serif flex items-center gap-2">
                  <Icon icon="mdi:phone" className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-green-400 flex-shrink-0" />
                  Get In Touch
                </h3>
                <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-sm md:text-base">
                  <div className="flex items-start gap-2.5 sm:gap-3 text-green-50 group">
                    <Icon
                      icon="mdi:map-marker"
                      className="text-green-400 w-5 h-5 mt-0.5 transition-transform duration-300 group-hover:scale-110 flex-shrink-0"
                    />
                    <span>
                      No. 45, RET Junction
                      <br />
                      Udawalawe, Sri Lanka
                    </span>
                  </div>
                  <a
                    href="tel:+94776103421"
                    className="flex items-center gap-2.5 sm:gap-3 hover:text-green-400 transition-colors duration-300 group focus:outline-none focus:text-green-400"
                  >
                    <Icon
                      icon="mdi:phone"
                      className="text-green-400 w-5 h-5 transition-transform duration-300 group-hover:scale-110 flex-shrink-0"
                    />
                    +94 77 610 3421
                  </a>
                  <a
                    href="mailto:nuwan@udawalawasafari.lk"
                    className="flex items-center gap-2.5 sm:gap-3 hover:text-green-400 transition-colors duration-300 group focus:outline-none focus:text-green-400 break-all"
                  >
                    <Icon
                      icon="mdi:email"
                      className="text-green-400 w-5 h-5 transition-transform duration-300 group-hover:scale-110 flex-shrink-0"
                    />
                    nuwan@udawalawasafari.lk
                  </a>
                </div>
              </div>
            </div>

            <div 
              className="border-t border-green-500/30 pt-6"
              style={getAnimationStyle(isFooterVisible, 400)}
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left text-xs sm:text-sm md:text-base">
                  <p className="text-green-100 font-semibold">
                    © {new Date().getFullYear()} Udawalawe Safari Service by Nuwan
                  </p>
                  <p className="text-green-200 mt-1">Crafting unforgettable wildlife experiences since 2020</p>
                </div>
                <div className="text-center md:text-right text-xs sm:text-sm md:text-base">
                  <p className="text-green-200">Designed & developed by</p>
                  <a
                    href="https://nexcy.lk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-100 font-semibold hover:text-green-400 transition-colors duration-300 focus:outline-none focus:text-green-400"
                  >
                    NexCy Technologies
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>

      <style jsx global>{`
        @keyframes hero-fade-in {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes modal-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modal-scale-in {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }

        .animate-hero-fade-in {
          animation: none;
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .animate-modal-fade-in {
          animation: modal-fade-in 0.25s ease-out;
        }

        .animate-modal-scale-in {
          animation: modal-scale-in 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .active\:scale-98:active {
          transform: scale(0.98);
        }

        .active\:scale-95:active {
          transform: scale(0.95);
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        html {
          scroll-behavior: smooth;
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
        }

        body {
          overflow-x: hidden;
          overflow-y: auto;
        }

        #hero {
          scroll-snap-align: start;
        }

        img {
          content-visibility: auto;
        }

        *:focus {
          outline: none;
        }

        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }

        @media (max-width: 320px) {
          * {
            min-width: 0;
          }
        }

        @media (min-width: 2560px) {
          html {
            font-size: 18px;
          }
        }

        @media (min-width: 3840px) {
          html {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  )
}