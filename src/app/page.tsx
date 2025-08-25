"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import GalleryAndReviews from '../components/GalleryAndReviews';
import Seo from "@/components/Seo";


export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentHero, setCurrentHero] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const heroImages = [
    "/assets/hero1.jpeg",
    "/assets/hero2.jpeg",
    "/assets/hero3.jpeg",
    "/assets/hero4.jpeg",
  ];

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
  ];

  return (
    <>
      <Seo
        title="Udawalawa Jeep Safari Service by Nuwan"
        description="Experience expertly guided wildlife safaris with Nuwan—delivering exceptional service, in-depth local knowledge, and lasting memories in Sri Lanka's premier wildlife destination. Safari in Udawalawa, safari Sri Lanka, Nuwan Safari, jeep safari, wildlife tour."
        url="https://udawalawasafari.lk"
        image="/favicon.ico"
      />

      <Head>
        <title>Udawalawa Safari by Nuwan</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather:wght@700&family=Roboto:wght@400;500&family=Open+Sans:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      {loading ? (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-[9999] bg-gradient-to-br from-gray-900 via-black to-gray-800">
          {/* Animated Safari Elements */}
          <div className="relative mb-8">
            <div className="w-24 h-24 relative">
              {/* Safari Jeep Animation */}
              <div className="absolute inset-0 animate-bounce">
                <Icon icon="mdi:jeepney" className="w-24 h-24 text-green-400" />
              </div>
              {/* Dust Trail Effect */}
              <div className="absolute -right-2 top-6 animate-pulse">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                  <div className="w-1 h-1 bg-green-300 rounded-full animate-ping delay-100"></div>
                  <div className="w-1 h-1 bg-green-200 rounded-full animate-ping delay-200"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Loading Text */}
          <div className="text-center mb-8">
            <h1 
              className="text-4xl md:text-6xl font-bold text-green-200 mb-4 animate-pulse"
              style={{ fontFamily: "Merriweather, serif" }}
            >
              Udawalawa Safari
            </h1>
            <p className="text-xl text-green-300 animate-pulse delay-300">
              by Nuwan
            </p>
          </div>

          {/* Safari Animals Animation */}
          <div className="flex space-x-6 mb-8">
            <Icon icon="mdi:elephant" className="w-8 h-8 text-green-400 animate-bounce delay-100" />
            <Icon icon="material-symbols:cruelty-free" className="w-8 h-8 text-green-400 animate-bounce delay-200" />
            <Icon icon="mdi:bird" className="w-8 h-8 text-green-400 animate-bounce delay-300" />
            <Icon icon="game-icons:crocodile" className="w-8 h-8 text-green-400 animate-bounce delay-400" />
          </div>

          {/* Loading Progress */}
          <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full animate-pulse loading-bar"></div>
          </div>
          
          <p className="mt-4 text-green-300 animate-pulse">
            Preparing your safari adventure...
          </p>

          <style jsx>{`
            .loading-bar {
              width: 100%;
              animation: loading 2s ease-in-out;
            }
            @keyframes loading {
              0% { width: 0%; }
              100% { width: 100%; }
            }
          `}</style>
        </div>
      ) : (
        <div className="min-h-screen bg-black text-white overflow-x-hidden" style={{ fontFamily: "Roboto, Open Sans, sans-serif" }}>
          
          {/* Decorative Background Elements */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-20 left-10 w-32 h-32 opacity-5">
              <Icon icon="mdi:tree-outline" className="w-full h-full text-green-500" />
            </div>
            <div className="absolute top-40 right-16 w-24 h-24 opacity-5">
              <Icon icon="mdi:leaf" className="w-full h-full text-green-400" />
            </div>
            <div className="absolute bottom-32 left-20 w-28 h-28 opacity-5">
              <Icon icon="mdi:flower-outline" className="w-full h-full text-green-300" />
            </div>
            <div className="absolute top-1/2 right-8 w-20 h-20 opacity-5">
              <Icon icon="mdi:bird" className="w-full h-full text-green-400" />
            </div>
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/5 via-transparent to-gray-900/10" />
          </div>

          {/* Header */}
          <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
            scrollY > 50 
              ? 'backdrop-blur-2xl bg-black/90 shadow-2xl border-b border-green-900/50' 
              : 'bg-transparent'
          }`}>
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex justify-between items-center">
                {/* Logo */}
                <h1
                  onClick={() => scrollTo("hero")}
                  style={{ fontFamily: "Merriweather, serif" }}
                  className="text-2xl lg:text-3xl tracking-wider text-green-200 cursor-pointer select-none font-bold hover:text-green-300 transition-all duration-300 transform hover:scale-105"
                >
                  Udawalawa Safari
                </h1>

                {/* Responsive Navigation */}
                <nav className="hidden md:flex flex-1 justify-end items-center">
                  <div className="flex gap-8 text-green-200 font-medium">
                    {["about", "packages", "gallery", "contact"].map((section, index) => (
                      <button
                        key={section}
                        onClick={() => scrollTo(section)}
                        className="relative group py-2 px-4 hover:text-green-400 transition-all duration-500 uppercase tracking-wider text-sm font-semibold"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {section}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-green-300 transition-all duration-500 group-hover:w-full"></span>
                        <span className="absolute inset-0 rounded-lg bg-green-400/10 scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
                      </button>
                    ))}
                  </div>
                </nav>

                {/* Mobile Menu Button */}
                <button
                  className="md:hidden p-2 rounded-lg hover:bg-green-900/30 transition-all duration-300 relative group"
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Toggle menu"
                >
                  <Icon icon={menuOpen ? "mdi:close" : "mdi:menu"} className="text-green-300 w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                </button>
              </div>

              {/* Mobile Menu */}
              {menuOpen && (
                <nav className="md:hidden mt-4 bg-black/95 backdrop-blur-xl border border-green-900/30 rounded-2xl flex flex-col space-y-1 py-6 px-6 uppercase tracking-wider text-center font-semibold text-green-200 shadow-2xl animate-slideDown">
                  {["About", "Packages", "Gallery", "Contact"].map((section, index) => (
                    <button
                      key={section}
                      onClick={() => scrollTo(section.toLowerCase())}
                      className="py-3 px-4 rounded-xl hover:text-green-400 hover:bg-green-900/20 transition-all duration-300 transform hover:scale-105"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {section}
                    </button>
                  ))}
                </nav>
              )}
            </div>
          </header>

          {/* Hero Section */}
          <section
            id="hero"
            className="relative min-h-screen flex justify-center items-center text-center px-[clamp(1rem,3vw,2rem)] overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 w-full h-full">
              {heroImages.map((src, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 w-full h-full transition-all duration-1000 ${
                    index === currentHero ? "opacity-90 scale-100 z-10" : "opacity-0 scale-105 z-0"
                  }`}
                >
                  <img
                    src={src}
                    alt={`Safari Hero ${index}`}
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.6)" }}
                  />
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/60 z-15" />
            </div>

            {/* Hero Content */}
            <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-[clamp(0.5rem,2vw,1.5rem)] max-w-[95vw] md:max-w-6xl mx-auto">
              {/* Tagline */}
              <div className="mb-[clamp(1rem,2vw,2rem)] animate-fadeInUp">
                <div className="flex items-center justify-center gap-[clamp(0.5rem,1vw,1rem)] mb-[clamp(0.75rem,1.5vw,1.5rem)] text-[clamp(0.7rem,1.2vw,1rem)]">
                  <Icon icon="mdi:paw" className="w-[clamp(1rem,1.5vw,1.5rem)] h-[clamp(1rem,1.5vw,1.5rem)] text-green-400 animate-bounce" />
                  <span className="text-green-300 font-medium tracking-wider uppercase">
                    Wildlife Adventure Awaits
                  </span>
                  <Icon icon="mdi:paw" className="w-[clamp(1rem,1.5vw,1.5rem)] h-[clamp(1rem,1.5vw,1.5rem)] text-green-400 animate-bounce delay-200" />
                </div>
              </div>

              {/* Title */}
              <h2
                style={{ fontFamily: "Merriweather, serif" }}
                className="text-[clamp(2rem,5vw,4.5rem)] leading-[clamp(2.5rem,6vw,5rem)] text-white mb-[clamp(1rem,2vw,1.5rem)] drop-shadow-2xl animate-fadeInUp font-bold tracking-tight"
              >
                <span className="block">Discover the</span>
                <span className="bg-gradient-to-r from-green-400 via-green-300 to-green-200 bg-clip-text text-transparent animate-gradient">
                  Untamed Beauty
                </span>
                <span className="block text-green-100 mt-[clamp(0.5rem,1vw,1rem)]">of Udawalawa</span>
              </h2>

              {/* Subtitle */}
              <p className="text-[clamp(0.9rem,1.5vw,1.25rem)] text-green-100 mb-[clamp(1rem,3vw,2.5rem)] leading-relaxed drop-shadow-lg max-w-[85ch] animate-fadeInUp delay-300 px-[clamp(0.5rem,2vw,1rem)]">
                Experience expertly guided wildlife safaris with Nuwan—delivering exceptional service,
                in-depth local knowledge, and lasting memories in Sri Lanka's premier wildlife destination.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-[clamp(0.5rem,1vw,1rem)] animate-fadeInUp delay-500 w-full sm:w-auto px-[clamp(0.5rem,2vw,1rem)]">
                <a
                  href="https://wa.me/94776103421?text=I'm%20interested%20in%20your%20safari%20tours.%20Can%20you%20tell%20me%20more%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-[clamp(0.5rem,1vw,1rem)] bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold px-[clamp(1.5rem,3vw,2rem)] py-[clamp(0.75rem,1.5vw,1rem)] rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-green-500/20 text-[clamp(0.9rem,1.2vw,1.1rem)] border border-green-400/20"
                >
                  <Icon icon="mdi:jeepney" className="w-[clamp(1.2rem,1.8vw,1.5rem)] h-[clamp(1.2rem,1.8vw,1.5rem)]" />
                  Reserve Safari
                </a>
                <button
                  onClick={() => scrollTo("packages")}
                  className="inline-flex items-center justify-center gap-[clamp(0.5rem,1vw,1rem)] bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-[clamp(1.5rem,3vw,2rem)] py-[clamp(0.75rem,1.5vw,1rem)] rounded-full border-2 border-green-400/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105 text-[clamp(0.9rem,1.2vw,1.1rem)]"
                >
                  <Icon icon="mdi:compass" className="w-[clamp(1.2rem,1.8vw,1.5rem)] h-[clamp(1.2rem,1.8vw,1.5rem)]" />
                  View Packages
                </button>
              </div>
            </div>

            {/* Hero Navigation Dots */}
            <div className="absolute bottom-[clamp(1rem,2vw,2rem)] left-1/2 transform -translate-x-1/2 flex gap-[clamp(0.4rem,0.8vw,0.75rem)] z-20">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentHero(index)}
                  className={`w-[clamp(0.5rem,0.8vw,0.75rem)] h-[clamp(0.5rem,0.8vw,0.75rem)] rounded-full transition-all duration-300 ${
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
            className="max-w-6xl mx-auto px-6 py-20 mt-20 animate-fadeInUp"
          >
            <div className="text-center mb-16">
              <h3
                style={{ fontFamily: "Merriweather, serif" }}
                className="text-4xl md:text-5xl text-green-200 mb-4 font-bold"
              >
                About Our Safari Experience
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-400 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-green-100 text-lg leading-relaxed text-justify">
                  Join an unforgettable safari experience in Udawalawe with Nuwan, a knowledgeable and friendly local guide who has been exploring 
                  the park for years. Nuwan offers half-day and full-day safaris that are perfectly timed to catch the best animal sightings, all 
                  while ensuring your comfort and safety.
                </p>
                <p className="text-green-100 text-lg leading-relaxed text-justify">
                  Whether it's your first safari or one of many, Nuwan's deep understanding of the area and 
                  its wildlife will make your journey both exciting and educational. Travel in a well-maintained, comfortable 4x4 jeep with plenty of space for photography and viewing.
                </p>
                <p className="text-green-100 text-lg leading-relaxed text-justify">
                  With Nuwan's sharp eye and experience, you're likely to spot a wide range of wildlife—from herds of elephants and water buffalo to crocodiles, deer, and many bird species. His local insights add great value to the tour, helping you understand animal behaviors, park history, and the delicate balance of Udawalawe's ecosystem.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/80 backdrop-blur-sm border border-green-900/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300 hover:scale-105 hover:border-green-700/50">
                  <Icon icon="mdi:elephant" className="w-12 h-12 text-green-400 mb-4" />
                  <h4 className="font-semibold text-green-200 mb-2">Wildlife Expertise</h4>
                  <p className="text-green-300 text-sm">Expert knowledge of local wildlife behavior and habitats</p>
                </div>
                <div className="bg-gray-900/80 backdrop-blur-sm border border-green-900/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300 hover:scale-105 hover:border-green-700/50">
                  <Icon icon="mdi:jeepney" className="w-12 h-12 text-green-400 mb-4" />
                  <h4 className="font-semibold text-green-200 mb-2">Comfortable Vehicles</h4>
                  <p className="text-green-300 text-sm">Well-maintained 4x4 jeeps with optimal viewing angles</p>
                </div>
                <div className="bg-gray-900/80 backdrop-blur-sm border border-green-900/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300 hover:scale-105 hover:border-green-700/50">
                  <Icon icon="mdi:camera" className="w-12 h-12 text-green-400 mb-4" />
                  <h4 className="font-semibold text-green-200 mb-2">Photography Focus</h4>
                  <p className="text-green-300 text-sm">Perfect positioning for wildlife photography opportunities</p>
                </div>
                <div className="bg-gray-900/80 backdrop-blur-sm border border-green-900/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300 hover:scale-105 hover:border-green-700/50">
                  <Icon icon="mdi:shield-check" className="w-12 h-12 text-green-400 mb-4" />
                  <h4 className="font-semibold text-green-200 mb-2">Safety First</h4>
                  <p className="text-green-300 text-sm">Prioritizing your safety while maximizing adventure</p>
                </div>
              </div>
            </div>
          </section>

          {/* Packages Section */}
          <section
            id="packages"
            className="py-20 mt-20 bg-gradient-to-br from-gray-900/50 to-black/80 relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-20 left-20 w-40 h-40">
                <Icon icon="mdi:compass" className="w-full h-full text-green-500" />
              </div>
              <div className="absolute bottom-20 right-20 w-32 h-32">
                <Icon icon="mdi:binoculars" className="w-full h-full text-green-400" />
              </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
              <div className="text-center mb-16">
                <h3
                  style={{ fontFamily: "Merriweather, serif" }}
                  className="text-4xl md:text-5xl text-green-200 mb-4 font-bold"
                >
                  Safari Packages
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-400 mx-auto rounded-full"></div>
                <p className="text-green-100 text-lg mt-6 max-w-2xl mx-auto">
                  Choose from our carefully crafted safari experiences, each designed to showcase the best of Udawalawa's wildlife
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages.map((pkg, i) => (
                  <div
                    key={i}
                    className="group bg-gray-900/60 backdrop-blur-xl border border-green-900/40 rounded-3xl p-8 shadow-2xl hover:shadow-green-500/20 transition-all duration-500 cursor-pointer hover:scale-105 hover:border-green-700/60 relative overflow-hidden"
                    onClick={() => setSelectedPackage(pkg.title)}
                  >
                    {/* Background Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-transparent to-green-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-500/30">
                        <Icon icon={pkg.icon} className="w-8 h-8 text-white" />
                      </div>
                      <h4
                        className="text-2xl text-green-200 font-bold mb-4 group-hover:text-green-100 transition-colors duration-300"
                        style={{ fontFamily: "Merriweather, serif" }}
                      >
                        {pkg.title}
                      </h4>
                      <p className="text-green-100 mb-6 leading-relaxed">{pkg.description}</p>
                      <div className="flex items-center justify-center gap-2 text-green-300 font-semibold mb-6">
                        <Icon icon="mdi:clock-outline" className="w-5 h-5" />
                        <span>{pkg.duration}</span>
                      </div>
                      
                      <button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/30 border border-green-400/20">
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
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[999] flex justify-center items-center p-6">
              <div className="bg-gray-900 border border-green-900/50 rounded-3xl p-8 w-full max-w-md text-center relative shadow-2xl animate-fadeInUp">
                <button
                  onClick={() => setSelectedPackage(null)}
                  className="absolute top-4 right-4 text-green-400 hover:text-green-300 transition-colors duration-300 p-2 rounded-full hover:bg-green-900/30"
                  aria-label="Close"
                >
                  <Icon icon="mdi:close" className="w-6 h-6" />
                </button>
                
                {(() => {
                  const pkg = packages.find(p => p.title === selectedPackage);
                  if (!pkg) return null;
                  return (
                    <>
                      <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
                        <Icon icon={pkg.icon} className="w-8 h-8 text-white" />
                      </div>
                      <h4 
                        className="text-3xl text-green-200 mb-4 font-bold" 
                        style={{ fontFamily: "Merriweather, serif" }}
                      >
                        {pkg.title}
                      </h4>
                      <p className="text-green-100 mb-6 text-lg leading-relaxed">{pkg.description}</p>
                      <div className="flex items-center justify-center gap-2 mb-8 text-green-300 font-semibold text-lg">
                        <Icon icon="mdi:clock-outline" className="w-6 h-6" />
                        <span>Duration: {pkg.duration}</span>
                      </div>
                      <a
                        href={`https://wa.me/94776103421?text=${encodeURIComponent(
                          `Hello, I am interested in the ${pkg.title} safari package. Could you please provide more information, including pricing and availability?`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-8 py-4 rounded-full shadow-lg shadow-green-500/30 font-semibold text-lg transition-all duration-300 hover:scale-105 border border-green-400/20"
                      >
                        <Icon icon="mdi:whatsapp" className="w-6 h-6" />
                        Contact Us for Details
                      </a>
                    </>
                  );
                })()}
              </div>
            </div>
          )}

          {/* Gallery Section */}
          <div id="gallery">
            <GalleryAndReviews />
          </div>

          {/* WhatsApp Chat Button */}
          <a
            href="https://wa.me/94776103421?text=Hello%2C%20I%20would%20like%20to%20chat%20about%20Udawalawa%20Safari%20by%20Nuwan."
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white p-4 rounded-full shadow-2xl shadow-green-500/30 z-50 transition-all duration-300 hover:scale-110 animate-bounce border border-green-400/30"
            aria-label="WhatsApp Chat"
          >
            <Icon icon="mdi:whatsapp" className="w-7 h-7" />
          </a>

          {/* Contact & Footer */}
          <section id="contact">
            <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-800 border-t border-green-900/30">
              <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-3 gap-12 mb-12">
                  {/* Contact Info */}
                  <div className="text-center md:text-left">
                    <h4 
                      className="text-2xl font-bold mb-6 text-green-200"
                      style={{ fontFamily: "Merriweather, serif" }}
                    >
                      Contact Information
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-center md:justify-start gap-3 text-green-100">
                        <Icon icon="mdi:map-marker" className="text-green-400 w-5 h-5" />
                        <span>No. 45, RET Junction, Udawalawa</span>
                      </div>
                      <a 
                        href="tel:+94776103421" 
                        className="flex items-center justify-center md:justify-start gap-3 hover:text-green-400 transition-colors duration-300 text-green-100"
                      >
                        <Icon icon="mdi:phone" className="text-green-400 w-5 h-5" />
                        +94 77 610 3421
                      </a>
                      <a 
                        href="mailto:contact@udawalawasafari.lk" 
                        className="flex items-center justify-center md:justify-start gap-3 hover:text-green-400 transition-colors duration-300 text-green-100"
                      >
                        <Icon icon="mdi:email" className="text-green-400 w-5 h-5" />
                        contact@udawalawasafari.lk
                      </a>
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="text-center">
                    <h4 
                      className="text-2xl font-bold mb-6 text-green-200"
                      style={{ fontFamily: "Merriweather, serif" }}
                    >
                      Quick Links
                    </h4>
                    <div className="space-y-3">
                      {["About", "Packages", "Gallery", "Contact"].map((section) => (
                        <button
                          key={section}
                          onClick={() => scrollTo(section.toLowerCase())}
                          className="block w-full hover:text-green-400 transition-colors duration-300 py-1 text-green-100"
                        >
                          {section}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="text-center md:text-right">
                    <h4 
                      className="text-2xl font-bold mb-6 text-green-200"
                      style={{ fontFamily: "Merriweather, serif" }}
                    >
                      Follow Us
                    </h4>
                    <div className="flex justify-center md:justify-end gap-6">
                      <a 
                        href="https://g.co/kgs/sPzai3" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="Google" 
                        className="text-2xl hover:text-green-400 transition-all duration-300 hover:scale-110 transform text-green-300"
                      >
                        <Icon icon="mdi:google" />
                      </a>
                      <a 
                        href="https://www.tripadvisor.com/Attraction_Review-g3577009-d27673880" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="TripAdvisor" 
                        className="text-2xl hover:text-green-400 transition-all duration-300 hover:scale-110 transform text-green-300"
                      >
                        <Icon icon="simple-icons:tripadvisor" />
                      </a>
                      <a 
                        href="https://www.facebook.com/profile.php?id=100081508587185" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="Facebook" 
                        className="text-2xl hover:text-green-400 transition-all duration-300 hover:scale-110 transform text-green-300"
                      >
                        <Icon icon="mdi:facebook" />
                      </a>
                      <a 
                        href="https://www.instagram.com/udawalawe_jeep_safari_service" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="Instagram" 
                        className="text-2xl hover:text-green-400 transition-all duration-300 hover:scale-110 transform text-green-300"
                      >
                        <Icon icon="mdi:instagram" />
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-green-900/30 pt-8 text-center">
                  <p className="text-green-200 text-lg">
                    © {new Date().getFullYear()} Udawalawa Jeep Safari by Nuwan
                  </p>
                  <p className="text-green-300 text-sm mt-2">
                    Designed & Developed by NexCy Technologies
                  </p>
                </div>
              </div>
            </footer>
          </section>

          {/* Custom Styles */}
          <style jsx>{`
            .animate-fadeInUp {
              animation: fadeInUp 1s ease-out;
            }
            
            .animate-zoomIn {
              animation: zoomIn 0.5s ease-out;
            }
            
            .animate-slideDown {
              animation: slideDown 0.3s ease-out;
            }
            
            .animate-gradient {
              background: linear-gradient(270deg, #22c55e, #16a34a, #15803d, #22c55e);
              background-size: 400% 400%;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              animation: gradient 3s ease infinite;
            }
            
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            @keyframes zoomIn {
              from {
                opacity: 0;
                transform: scale(0.8);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
            
            @keyframes slideDown {
              from {
                opacity: 0;
                transform: translateY(-20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            @keyframes gradient {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }
            
            .delay-100 { animation-delay: 0.1s; }
            .delay-200 { animation-delay: 0.2s; }
            .delay-300 { animation-delay: 0.3s; }
            .delay-400 { animation-delay: 0.4s; }
            .delay-500 { animation-delay: 0.5s; }
          `}</style>
        </div>
      )}
    </>
  );
}