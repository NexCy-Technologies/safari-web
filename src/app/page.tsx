"use client"

import Head from "next/head"
import { useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import GalleryAndReviews from "../components/GalleryAndReviews"
import Seo from "@/components/Seo"

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentHero, setCurrentHero] = useState(0)
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [scrollY, setScrollY] = useState(0)

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % 4)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const heroImages = ["/assets/hero1.jpeg", "/assets/hero2.jpeg", "/assets/hero3.jpeg", "/assets/hero4.jpeg"]

  const packages = [
    {
      title: "3-Hour Safari",
      description: "Quick but immersive experience into the Udawalawa wilderness.",
      duration: "3 hours",
      icon: "mdi:clock-fast",
    },
    {
      title: "4-Hour Safari",
      description: "Extended wildlife spotting with peaceful terrain navigation.",
      duration: "4 hours",
      icon: "mdi:binoculars",
    },
    {
      title: "Half-Day Safari",
      description: "Ideal balance of wildlife viewing and scenic breaks.",
      duration: "Around 6 hours",
      icon: "mdi:weather-sunset",
    },
    {
      title: "Full-Day Safari",
      description: "Complete experience with lunch stop and full coverage.",
      duration: "Around 10 hours",
      icon: "mdi:compass",
    },
    {
      title: "Custom Safari",
      description: "Tailored route and timing based on your preferences.",
      duration: "Flexible",
      icon: "mdi:map-marker-path",
    },
  ]

  return (
    <>
      <Seo
        title="Udawalawa Jeep Safari Service by Nuwan | Best Wildlife Tours Sri Lanka"
        description="Experience expertly guided wildlife safaris with Nuwan in Udawalawa National Park. See elephants, leopards, and exotic birds. Professional jeep safari tours with local expertise and 5-star reviews. Book your Sri Lanka safari adventure today."
        url="https://udawalawasafari.lk"
        image="/udawalawa-safari-social-media-preview.png"
      />

      <Head>
        <title>Udawalawa Safari by Nuwan | Premium Wildlife Tours</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TouristAttraction",
              name: "Udawalawa Jeep Safari Service by Nuwan",
              description: "Professional wildlife safari tours in Udawalawa National Park, Sri Lanka",
              url: "https://udawalawasafari.lk",
              telephone: "+94776103421",
              address: {
                "@type": "PostalAddress",
                streetAddress: "No. 45, RET Junction",
                addressLocality: "Udawalawa",
                addressCountry: "LK",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "6.4833",
                longitude: "80.8833",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5",
                reviewCount: "50",
              },
            }),
          }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black text-white overflow-x-hidden font-sans">
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-green-600/15 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-16 w-24 h-24 bg-emerald-500/15 rounded-full blur-2xl"></div>
          <div className="absolute bottom-32 left-20 w-28 h-28 bg-green-500/15 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-8 w-20 h-20 bg-emerald-400/15 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-lime-500/10 rounded-full blur-2xl"></div>
          <div className="absolute top-1/3 left-1/4 w-12 h-12 bg-green-400/10 rounded-full blur-xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-transparent to-emerald-900/15" />
        </div>

        {/* Navbar */}
        <header
          className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
            scrollY > 50 ? "backdrop-blur-2xl bg-black/30 shadow-2xl border-b border-green-500/30" : "bg-transparent"
          }`}
        >
          <div className="max-w-[90rem] mx-auto px-3 sm:px-4 md:px-6 lg:px-10 xl:px-12 2xl:px-16 py-2 sm:py-3 flex justify-between items-center">
            {/* Logo */}
            <div
              onClick={() => scrollTo("hero")}
              className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none group"
            >
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11">
                <img
                  src="/logo.png"
                  alt="Udawalawa Safari By Nuwan Logo"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-green-400/20 rounded-full blur-md group-hover:bg-green-300/30 transition-all duration-300"></div>
              </div>
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-[1.65rem] 2xl:text-[1.8rem] tracking-wide text-green-100 hover:text-green-300 transition-all duration-300 transform hover:scale-105 font-bold font-serif">
                Udawalawa Safari
              </h1>
            </div>

            {/* Hamburger / Nav */}
            <div className="relative">
              {/* Hamburger for mobile only */}
              <button
                className="p-2 rounded-lg hover:bg-green-900/30 transition-all duration-300 flex items-center justify-center focus:outline-none lg:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <Icon
                  icon={menuOpen ? "mdi:close" : "mdi:menu"}
                  className="text-green-300 w-6 h-6 transition-transform duration-300"
                />
              </button>

              {/* Dropdown for mobile */}
              <nav
                className={`absolute top-full right-0 mt-2 bg-black/70 backdrop-blur-2xl border border-green-500/30 rounded-2xl flex flex-col space-y-1 py-6 px-6 uppercase tracking-wider font-semibold text-green-100 shadow-2xl min-w-[200px] transition-all duration-300 lg:hidden ${
                  menuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                {["About", "Packages", "Gallery", "Reviews", "Contact"].map((section, index) => (
                  <button
                    key={section}
                    onClick={() => scrollTo(section.toLowerCase())}
                    className="py-3 px-4 rounded-xl hover:text-green-300 hover:bg-green-900/20 transition-all duration-300 transform hover:scale-105"
                    style={{ transitionDelay: `${index * 0.05}s` }}
                  >
                    {section}
                  </button>
                ))}
              </nav>

              {/* Horizontal menu for tablets/desktops */}
              <nav className="hidden lg:flex gap-5 xl:gap-7 2xl:gap-8 uppercase tracking-wide font-medium text-green-100">
                {["About", "Packages", "Gallery", "Reviews", "Contact"].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollTo(section.toLowerCase())}
                    className="px-2 py-2 hover:text-green-300 transition-all duration-300 hover:scale-105"
                  >
                    {section}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section
          id="hero"
          className="relative min-h-screen flex justify-center items-center text-center px-3 sm:px-4 lg:px-6 overflow-hidden"
        >
          {/* Background Images */}
          <div className="absolute inset-0 w-full h-full">
            {heroImages.map((src, index) => (
              <div
                key={index}
                className={`absolute inset-0 w-full h-full transition-all duration-1000 ${
                  index === currentHero ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0"
                }`}
              >
                <img
                  src={src || "/placeholder.svg"}
                  alt={`Safari Hero ${index}`}
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.6) contrast(1.1) saturate(1.2)" }}
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/50 z-10" />
            <div className="absolute inset-0 backdrop-blur-[0.5px] bg-gradient-to-br from-green-900/15 via-transparent to-emerald-900/20 z-10" />
          </div>

          {/* Content */}
          <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-2 sm:px-4 max-w-5xl mx-auto">
            <div className="backdrop-blur-[2px] bg-black/20 border border-green-500/30 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 lg:p-12 shadow-2xl w-full">
              {/* Title */}
              <h2
                className="font-serif font-bold tracking-tight drop-shadow-2xl text-white mb-4 sm:mb-6 animate-fadeInUp leading-tight"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 4.5rem)", // scales from 28px → 72px
                }}
              >
                <span className="block">Experience the</span>
                <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-lime-300 bg-clip-text text-transparent animate-gradient">
                  Wild Safari
                </span>
                <span className="block text-green-100 mt-2">of Udawalawa</span>
              </h2>

              {/* Subtitle */}
              <p
                className="text-green-100 mb-6 sm:mb-8 leading-relaxed drop-shadow-lg animate-fadeInUp delay-300 mx-auto"
                style={{
                  fontSize: "clamp(0.9rem, 1.6vw, 1.25rem)", // scales 14px → 20px
                  maxWidth: "60ch", // keeps lines readable
                }}
              >
                Embark on an unforgettable journey through Sri Lanka's untamed wilderness with expert guide Nuwan—where
                every moment brings you closer to nature's most magnificent creatures.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fadeInUp delay-500 justify-center">
                <a
                  href="https://wa.me/94776103421?text=I'm%20interested%20in%20your%20wild%20safari%20tours.%20Can%20you%20tell%20me%20more%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-semibold px-5 sm:px-7 md:px-8 py-3 sm:py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-green-500/20 text-sm sm:text-base md:text-lg border border-green-400/20 backdrop-blur-sm"
                >
                  <Icon icon="mdi:jeepney" className="w-5 h-5 sm:w-6 sm:h-6" />
                  Book Wild Safari
                </a>
                <button
                  onClick={() => scrollTo("packages")}
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-5 sm:px-7 md:px-8 py-3 sm:py-4 rounded-full border-2 border-green-400/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105 text-sm sm:text-base md:text-lg"
                >
                  <Icon icon="mdi:binoculars" className="w-5 h-5 sm:w-6 sm:h-6" />
                  Explore Packages
                </button>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="absolute bottom-5 sm:bottom-7 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentHero(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentHero
                    ? "bg-green-400 scale-125 shadow-lg shadow-green-400/50"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 md:py-20 lg:py-28 xl:py-32 mt-12 sm:mt-16 md:mt-20 animate-fadeInUp"
        >
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-3 mb-6 backdrop-blur-2xl bg-white/5 border border-white/10 rounded-full px-4 sm:px-6 py-2 sm:py-3">
              <Icon icon="mdi:tree" className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 animate-pulse" />
              <span className="text-green-300 font-medium tracking-wider uppercase text-xs sm:text-sm">
                Into the Wild
              </span>
              <Icon icon="mdi:elephant" className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 animate-pulse delay-200" />
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-green-100 mb-4 font-bold font-serif">
              Wild Safari Experience
            </h3>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Text Section */}
            <div className="space-y-6 text-justify">
              <p className="text-green-100 text-base sm:text-lg lg:text-xl leading-relaxed">
                Join an unforgettable safari experience in Udawalawe with Nuwan, a knowledgeable and friendly local
                guide who has been exploring the park for years. Nuwan offers half-day and full-day safaris that are
                perfectly timed to catch the best animal sightings, all while ensuring your comfort and safety.
              </p>
              <p className="text-green-100 text-base sm:text-lg lg:text-xl leading-relaxed">
                Whether it's your first safari or one of many, Nuwan's deep understanding of the area and its wildlife
                will make your journey both exciting and educational. Travel in a well-maintained, comfortable 4x4 jeep
                with plenty of space for photography and viewing.
              </p>
              <p className="text-green-100 text-base sm:text-lg lg:text-xl leading-relaxed">
                With Nuwan's sharp eye and experience, you're likely to spot a wide range of wildlife—from herds of
                elephants and water buffalo to crocodiles, deer, and many bird species. His local insights add great
                value to the tour, helping you understand animal behaviors, park history, and the delicate balance of
                Udawalawe's ecosystem.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
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
                  className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 hover:scale-105 hover:border-emerald-400/30"
                >
                  <Icon
                    icon={item.icon}
                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-green-400 mb-3 sm:mb-4"
                  />
                  <h4 className="font-semibold text-emerald-200 text-sm sm:text-base lg:text-lg mb-1">{item.title}</h4>
                  <p className="text-emerald-300 text-xs sm:text-sm lg:text-base">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section
          id="packages"
          className="w-full py-12 sm:py-16 md:py-20 lg:py-28 mt-12 sm:mt-16 md:mt-20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 via-transparent to-teal-900/15"></div>

          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="text-center mb-12 sm:mb-16">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-green-100 mb-4 font-bold font-serif">
                Safari Packages
              </h3>
              <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-400 mx-auto rounded-full"></div>
              <p className="text-green-100 text-sm sm:text-base md:text-lg lg:text-xl mt-4 sm:mt-6 max-w-2xl mx-auto leading-relaxed">
                Choose from our carefully crafted safari experiences, each designed to showcase the best of Udawalawa's
                wildlife
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
              {packages.map((pkg, i) => (
                <div
                  key={i}
                  className="group backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 cursor-pointer hover:scale-105 hover:border-emerald-400/30 relative overflow-hidden"
                  onClick={() => setSelectedPackage(pkg.title)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-transparent to-teal-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10 text-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-emerald-600 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-emerald-500/30">
                      <Icon icon={pkg.icon} className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-emerald-200 font-bold mb-3 sm:mb-4 md:mb-4 group-hover:text-emerald-100 transition-colors duration-300 font-serif">
                      {pkg.title}
                    </h4>
                    <p className="text-emerald-100 text-sm sm:text-base md:text-lg lg:text-lg mb-4 sm:mb-6 leading-relaxed">
                      {pkg.description}
                    </p>
                    <div className="flex items-center justify-center gap-1 sm:gap-2 text-emerald-300 font-semibold mb-4 sm:mb-6">
                      <Icon icon="mdi:clock-outline" className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-sm md:text-base">{pkg.duration}</span>
                    </div>

                    <button className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-emerald-500/30 border border-emerald-400/20 text-sm sm:text-base md:text-lg">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Package Modal */}
        {selectedPackage && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[999] flex justify-center items-center p-4 sm:p-6 md:p-8 lg:p-12">
            <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 w-full max-w-sm sm:max-w-md md:max-w-lg text-center relative shadow-2xl animate-fadeInUp">
              {/* Close Button */}
              <button
                onClick={() => setSelectedPackage(null)}
                className="absolute top-3 sm:top-4 md:top-5 right-3 sm:right-4 md:right-5 text-emerald-400 hover:text-emerald-300 transition-colors duration-300 p-2 rounded-full hover:bg-emerald-900/30"
                aria-label="Close"
              >
                <Icon icon="mdi:close" className="w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7" />
              </button>

              {/* Package Details */}
              {(() => {
                const pkg = packages.find((p) => p.title === selectedPackage)
                if (!pkg) return null
                return (
                  <>
                    <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-emerald-600 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 md:mb-8 shadow-lg shadow-emerald-500/30">
                      <Icon icon={pkg.icon} className="w-5 sm:w-8 md:w-10 h-5 sm:h-8 md:h-10 text-white" />
                    </div>

                    <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-emerald-200 mb-3 sm:mb-4 md:mb-6 font-bold font-serif">
                      {pkg.title}
                    </h4>

                    <p className="text-green-100 text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 md:mb-8 leading-relaxed">
                      {pkg.description}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8 text-emerald-300 font-semibold text-sm sm:text-base md:text-lg">
                      <Icon icon="mdi:clock-outline" className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6" />
                      <span>Duration: {pkg.duration}</span>
                    </div>

                    <a
                      href={`https://wa.me/94776103421?text=${encodeURIComponent(
                        `Hello, I am interested in the ${pkg.title} package. Could you please provide more information, including pricing and availability?`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-emerald-500/30 border border-emerald-400/20"
                    >
                      <Icon icon="mdi:whatsapp" className="w-4 sm:w-6 md:w-6 h-4 sm:h-6 md:h-6" />
                      Contact Us for Details
                    </a>
                  </>
                )
              })()}
            </div>
          </div>
        )}

        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/94776103421?text=Hello%2C%20I%20would%20like%20to%20chat%20about%20Wild%20Safari%20Adventures%20by%20Nuwan."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 backdrop-blur-2xl bg-green-600/80 hover:bg-green-700/80 text-white p-3 sm:p-4 md:p-4 rounded-full shadow-2xl shadow-green-500/30 z-50 transition-all duration-300 hover:scale-110 animate-bounce border border-green-400/30"
          aria-label="WhatsApp Chat"
        >
          <Icon icon="mdi:whatsapp" className="w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7" />
        </a>

        <div id="gallery">
          <GalleryAndReviews />
        </div>

        <section id="contact">
          <footer className="relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-green-900/20 to-black/80"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-emerald-400 to-green-500"></div>
            <div className="absolute top-10 left-5 sm:left-10 w-16 h-16 sm:w-20 sm:h-20 bg-green-500/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 right-5 sm:right-10 w-20 h-20 sm:w-24 sm:h-24 bg-emerald-400/10 rounded-full blur-2xl"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24">
              <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
                {/* Logo & About */}
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                      <img
                        src="/favicon.ico"
                        alt="Udawalawa Safari Favicon"
                        className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                      />
                      <div className="absolute inset-0 bg-green-400/20 rounded-full blur-lg"></div>
                    </div>
                    <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-200 font-serif">
                      Udawalawa Safari
                    </h4>
                  </div>
                  <p className="text-green-100 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 max-w-md">
                    Experience the untamed beauty of Udawalawa National Park with expert guide Nuwan. Every safari is a
                    journey into Sri Lanka's most spectacular wilderness.
                  </p>

                  {/* Social Links */}
                  <div className="flex gap-2 sm:gap-4">
                    {[
                      { icon: "mdi:google", href: "https://g.co/kgs/sPzai3", label: "Google" },
                      {
                        icon: "simple-icons:tripadvisor",
                        href: "https://www.tripadvisor.com/Attraction_Review-g3577009-d27673880",
                        label: "TripAdvisor",
                      },
                      {
                        icon: "mdi:facebook",
                        href: "https://www.facebook.com/profile.php?id=100081508587185",
                        label: "Facebook",
                      },
                      {
                        icon: "mdi:instagram",
                        href: "https://www.instagram.com/udawalawe_jeep_safari_service",
                        label: "Instagram",
                      },
                    ].map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full backdrop-blur-sm bg-green-600/20 border border-green-400/30 flex items-center justify-center text-green-300 hover:text-green-200 hover:bg-green-600/30 hover:border-green-400/50 transition-all duration-300 hover:scale-110"
                      >
                        <Icon icon={social.icon} className="w-4 sm:w-6 h-4 sm:h-6" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-green-200 font-serif flex items-center gap-1 sm:gap-2">
                    <Icon icon="mdi:compass" className="w-4 sm:w-5 h-4 sm:h-5 text-green-400" />
                    Quick Links
                  </h4>
                  <div className="space-y-1 sm:space-y-2">
                    {["About", "Packages", "Gallery", "Reviews", "Contact"].map((section) => (
                      <button
                        key={section}
                        onClick={() => scrollTo(section.toLowerCase())}
                        className="block w-full text-left hover:text-green-400 transition-colors duration-300 py-1 sm:py-2 text-green-100 hover:translate-x-1 sm:hover:translate-x-2 transform transition-transform text-sm sm:text-base"
                      >
                        <Icon icon="mdi:chevron-right" className="w-3 sm:w-4 h-3 sm:h-4 inline mr-1 sm:mr-2" />
                        {section}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div>
                  <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-green-200 font-serif flex items-center gap-1 sm:gap-2">
                    <Icon icon="mdi:phone" className="w-4 sm:w-5 h-4 sm:h-5 text-green-400" />
                    Get In Touch
                  </h4>
                  <div className="space-y-2 sm:space-y-4 text-sm sm:text-base">
                    <div className="flex items-start gap-2 sm:gap-3 text-green-100 group">
                      <Icon
                        icon="mdi:map-marker"
                        className="text-green-400 w-4 sm:w-5 h-4 sm:h-5 mt-0.5 sm:mt-1 group-hover:scale-110 transition-transform"
                      />
                      <span>
                        No. 45, RET Junction
                        <br />
                        Udawalawa, Sri Lanka
                      </span>
                    </div>
                    <a
                      href="tel:+94776103421"
                      className="flex items-center gap-2 sm:gap-3 hover:text-green-400 transition-colors duration-300 group"
                    >
                      <Icon
                        icon="mdi:phone"
                        className="text-green-400 w-4 sm:w-5 h-4 sm:h-5 group-hover:scale-110 transition-transform"
                      />
                      +94 77 610 3421
                    </a>
                    <a
                      href="mailto:contact@udawalawasafari.lk"
                      className="flex items-center gap-2 sm:gap-3 hover:text-green-400 transition-colors duration-300 group"
                    >
                      <Icon
                        icon="mdi:email"
                        className="text-green-400 w-4 sm:w-5 h-4 sm:h-5 group-hover:scale-110 transition-transform"
                      />
                      nuwan@udawalawasafari.lk
                    </a>
                  </div>
                </div>
              </div>

              {/* Footer Bottom */}
              <div className="border-t border-green-500/30 pt-6 sm:pt-8 md:pt-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-2 sm:gap-4">
                  <div className="text-center md:text-left text-sm sm:text-base md:text-lg">
                    <p className="text-green-200 font-medium">
                      © {new Date().getFullYear()} Udawalawa Safari Service by Nuwan
                    </p>
                    <p className="text-green-300 mt-1">Crafting unforgettable wildlife experiences since 2020</p>
                  </div>
                  <div className="text-center md:text-right text-sm sm:text-base md:text-lg">
                    <p className="text-green-300">Designed & developed by</p>
                    <a
                      href="https://nexcy.lk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-200 font-semibold hover:text-green-400 transition-colors duration-300"
                    >
                      NexCy Technologies
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </section>
      </div>
    </>
  )
}
