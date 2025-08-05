"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentHero, setCurrentHero] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
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
        <div className="fixed inset-0 flex flex-col items-center justify-center z-[9999] bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200">
          {/* Animated Safari Elements */}
          <div className="relative mb-8">
            <div className="w-24 h-24 relative">
              {/* Safari Jeep Animation */}
              <div className="absolute inset-0 animate-bounce">
                <Icon icon="mdi:jeepney" className="w-24 h-24 text-amber-800" />
              </div>
              {/* Dust Trail Effect */}
              <div className="absolute -right-2 top-6 animate-pulse">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-ping"></div>
                  <div className="w-1 h-1 bg-amber-300 rounded-full animate-ping delay-100"></div>
                  <div className="w-1 h-1 bg-amber-200 rounded-full animate-ping delay-200"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Loading Text */}
          <div className="text-center mb-8">
            <h1 
              className="text-4xl md:text-6xl font-bold text-amber-900 mb-4 animate-pulse"
              style={{ fontFamily: "Merriweather, serif" }}
            >
              Udawalawa Safari
            </h1>
            <p className="text-xl text-amber-700 animate-pulse delay-300">
              by Nuwan
            </p>
          </div>

          {/* Safari Animals Animation */}
          <div className="flex space-x-6 mb-8">
            <Icon icon="mdi:elephant" className="w-8 h-8 text-amber-600 animate-bounce delay-100" />
            <Icon icon="material-symbols:cruelty-free" className="w-8 h-8 text-amber-600 animate-bounce delay-200" />
            <Icon icon="mdi:bird" className="w-8 h-8 text-amber-600 animate-bounce delay-300" />
            <Icon icon="game-icons:crocodile" className="w-8 h-8 text-amber-600 animate-bounce delay-400" />
          </div>

          {/* Loading Progress */}
          <div className="w-64 h-2 bg-amber-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse loading-bar"></div>
          </div>
          
          <p className="mt-4 text-amber-700 animate-pulse">
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
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50" style={{ fontFamily: "Roboto, Open Sans, sans-serif" }}>
          
          {/* Decorative Background Elements */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-20 left-10 w-32 h-32 opacity-10">
              <Icon icon="mdi:tree-outline" className="w-full h-full text-green-600" />
            </div>
            <div className="absolute top-40 right-16 w-24 h-24 opacity-10">
              <Icon icon="mdi:leaf" className="w-full h-full text-green-500" />
            </div>
            <div className="absolute bottom-32 left-20 w-28 h-28 opacity-10">
              <Icon icon="mdi:flower-outline" className="w-full h-full text-orange-400" />
            </div>
            <div className="absolute top-1/2 right-8 w-20 h-20 opacity-10">
              <Icon icon="mdi:bird" className="w-full h-full text-blue-400" />
            </div>
          </div>

          {/* Header */}
          <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
            scrollY > 50 
              ? 'backdrop-blur-xl bg-white/80 shadow-lg border-b border-amber-200' 
              : 'bg-transparent'
          }`}>
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              <h1
                onClick={() => scrollTo("hero")}
                style={{ fontFamily: "Merriweather, serif" }}
                className="text-2xl lg:text-3xl tracking-wider text-amber-900 cursor-pointer select-none font-bold hover:text-amber-700 transition-colors duration-300"
              >
                Udawalawa Safari
              </h1>
              <nav className="hidden md:flex gap-8 text-amber-800 font-medium">
                {["about", "packages", "gallery", "contact"].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollTo(section)}
                    className="hover:text-amber-600 transition-all duration-300 uppercase tracking-wide relative group py-2"
                  >
                    {section}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                ))}
              </nav>
              <button
                className="md:hidden p-2 rounded-lg hover:bg-amber-100 transition-colors duration-300"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <Icon icon={menuOpen ? "mdi:close" : "mdi:menu"} className="text-amber-800 w-6 h-6" />
              </button>
            </div>
            {menuOpen && (
              <nav className="md:hidden bg-white/95 backdrop-blur-md border-t border-amber-200 flex flex-col space-y-4 py-6 px-8 uppercase tracking-wider text-center font-semibold text-amber-800 shadow-lg">
                {["About", "Packages", "Gallery", "Contact"].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollTo(section.toLowerCase())}
                    className="hover:text-amber-600 transition-colors duration-300 py-2"
                  >
                    {section}
                  </button>
                ))}
              </nav>
            )}
          </header>

          {/* Hero Section */}
          <section id="hero" className="relative h-screen flex justify-center items-center text-center px-6 overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              {heroImages.map((src, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 w-full h-full transition-all duration-1000 ${
                    index === currentHero ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0"
                  }`}
                >
                  <img
                    src={src}
                    alt={`Safari Hero ${index}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/30" />
                </div>
              ))}
            </div>
            
            {/* Hero Content */}
            <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 max-w-5xl mx-auto">
              <div className="mb-8 animate-fadeInUp">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <Icon icon="mdi:paw" className="w-8 h-8 text-amber-300 animate-bounce" />
                  <span className="text-amber-200 text-lg font-medium tracking-wider uppercase">Wildlife Adventure Awaits</span>
                  <Icon icon="mdi:paw" className="w-8 h-8 text-amber-300 animate-bounce delay-200" />
                </div>
              </div>
              
              <h2
                style={{ fontFamily: "Merriweather, serif" }}
                className="text-5xl md:text-7xl text-white mb-6 drop-shadow-2xl animate-fadeInUp font-bold tracking-tight leading-tight"
              >
                <span className="block mb-2">Discover the</span>
                <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
                  Untamed Beauty
                </span>
                <span className="block mt-2">of Udawalawa</span>
              </h2>
              
              <p className="text-xl md:text-2xl text-amber-100 mb-10 leading-relaxed drop-shadow-lg max-w-3xl animate-fadeInUp delay-300">
                Experience expertly guided wildlife safaris with Nuwan—delivering exceptional service, in-depth local knowledge, and lasting memories in Sri Lanka's premier wildlife destination.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp delay-500">
                <a
                  href="https://wa.me/94776103421?text=I'm%20interested%20in%20your%20safari%20tours.%20Can%20you%20tell%20me%20more%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold px-8 py-4 rounded-full shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl text-lg"
                >
                  <Icon icon="mdi:jeepney" className="w-6 h-6" />
                  Reserve Safari
                </a>
                <button
                  onClick={() => scrollTo("packages")}
                  className="inline-flex items-center justify-center gap-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold px-8 py-4 rounded-full border-2 border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-105 text-lg"
                >
                  <Icon icon="mdi:compass" className="w-6 h-6" />
                  View Packages
                </button>
              </div>
            </div>

            {/* Hero Navigation Dots */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentHero(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentHero 
                      ? 'bg-amber-400 scale-125' 
                      : 'bg-white/50 hover:bg-white/70'
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
                className="text-4xl md:text-5xl text-amber-900 mb-4 font-bold"
              >
                About Our Safari Experience
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-amber-800 text-lg leading-relaxed">
                  Join an unforgettable safari experience in Udawalawe with Nuwan, a knowledgeable and friendly local guide who has been exploring 
                  the park for years. Nuwan offers half-day and full-day safaris that are perfectly timed to catch the best animal sightings, all 
                  while ensuring your comfort and safety.
                </p>
                <p className="text-amber-800 text-lg leading-relaxed">
                  Whether it's your first safari or one of many, Nuwan's deep understanding of the area and 
                  its wildlife will make your journey both exciting and educational. Travel in a well-maintained, comfortable 4x4 jeep with plenty of space for photography and viewing.
                </p>
                <p className="text-amber-800 text-lg leading-relaxed">
                  With Nuwan's sharp eye and experience, you're likely to spot a wide range of wildlife—from herds of elephants and water buffalo to crocodiles, deer, and many bird species. His local insights add great value to the tour, helping you understand animal behaviors, park history, and the delicate balance of Udawalawe's ecosystem.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Icon icon="mdi:elephant" className="w-12 h-12 text-amber-600 mb-4" />
                  <h4 className="font-semibold text-amber-900 mb-2">Wildlife Expertise</h4>
                  <p className="text-amber-700 text-sm">Expert knowledge of local wildlife behavior and habitats</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Icon icon="mdi:jeepney" className="w-12 h-12 text-amber-600 mb-4" />
                  <h4 className="font-semibold text-amber-900 mb-2">Comfortable Vehicles</h4>
                  <p className="text-amber-700 text-sm">Well-maintained 4x4 jeeps with optimal viewing angles</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Icon icon="mdi:camera" className="w-12 h-12 text-amber-600 mb-4" />
                  <h4 className="font-semibold text-amber-900 mb-2">Photography Focus</h4>
                  <p className="text-amber-700 text-sm">Perfect positioning for wildlife photography opportunities</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Icon icon="mdi:shield-check" className="w-12 h-12 text-amber-600 mb-4" />
                  <h4 className="font-semibold text-amber-900 mb-2">Safety First</h4>
                  <p className="text-amber-700 text-sm">Prioritizing your safety while maximizing adventure</p>
                </div>
              </div>
            </div>
          </section>

          {/* Packages Section */}
          <section
            id="packages"
            className="py-20 mt-20 bg-gradient-to-br from-amber-100 to-orange-100"
          >
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-16">
                <h3
                  style={{ fontFamily: "Merriweather, serif" }}
                  className="text-4xl md:text-5xl text-amber-900 mb-4 font-bold"
                >
                  Safari Packages
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
                <p className="text-amber-800 text-lg mt-6 max-w-2xl mx-auto">
                  Choose from our carefully crafted safari experiences, each designed to showcase the best of Udawalawa's wildlife
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages.map((pkg, i) => (
                  <div
                    key={i}
                    className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer hover:scale-105 border border-amber-200/50"
                    onClick={() => setSelectedPackage(pkg.title)}
                  >
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon icon={pkg.icon} className="w-8 h-8 text-white" />
                      </div>
                      <h4
                        className="text-2xl text-amber-900 font-bold mb-3"
                        style={{ fontFamily: "Merriweather, serif" }}
                      >
                        {pkg.title}
                      </h4>
                      <p className="text-amber-700 mb-4 leading-relaxed">{pkg.description}</p>
                      <div className="flex items-center justify-center gap-2 text-amber-600 font-semibold">
                        <Icon icon="mdi:clock-outline" className="w-5 h-5" />
                        <span>{pkg.duration}</span>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
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
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex justify-center items-center p-6">
              <div className="bg-white rounded-3xl p-8 w-full max-w-md text-center relative shadow-2xl animate-fadeInUp">
                <button
                  onClick={() => setSelectedPackage(null)}
                  className="absolute top-4 right-4 text-amber-600 hover:text-amber-800 transition-colors duration-300"
                  aria-label="Close"
                >
                  <Icon icon="mdi:close" className="w-6 h-6" />
                </button>
                
                {(() => {
                  const pkg = packages.find(p => p.title === selectedPackage);
                  if (!pkg) return null;
                  return (
                    <>
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Icon icon={pkg.icon} className="w-8 h-8 text-white" />
                      </div>
                      <h4 
                        className="text-3xl text-amber-900 mb-4 font-bold" 
                        style={{ fontFamily: "Merriweather, serif" }}
                      >
                        {pkg.title}
                      </h4>
                      <p className="text-amber-800 mb-6 text-lg leading-relaxed">{pkg.description}</p>
                      <div className="flex items-center justify-center gap-2 mb-8 text-amber-700 font-semibold text-lg">
                        <Icon icon="mdi:clock-outline" className="w-6 h-6" />
                        <span>Duration: {pkg.duration}</span>
                      </div>
                      <a
                        href={`https://wa.me/94776103421?text=${encodeURIComponent(
                          `Hello, I am interested in the ${pkg.title} safari package. Could you please provide more information, including pricing and availability?`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 rounded-full shadow-lg font-semibold text-lg transition-all duration-300 hover:scale-105"
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
          <section
            id="gallery"
            className="max-w-7xl mx-auto px-6 py-20 mt-20"
          >
            <div className="text-center mb-16">
              <h3
                style={{ fontFamily: "Merriweather, serif" }}
                className="text-4xl md:text-5xl text-amber-900 mb-4 font-bold"
              >
                Safari Gallery
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
              <p className="text-amber-800 text-lg mt-6 max-w-2xl mx-auto">
                Discover the incredible wildlife and breathtaking moments captured during our safari adventures
              </p>
            </div>
            
            {(() => {
              const galleryImages = [
                {
                  src: "/assets/gallery/1.jpeg",
                  alt: "Elephants grazing in Udawalawa",
                  description: "Majestic elephants grazing peacefully in their natural habitat, showcasing the incredible biodiversity of Udawalawa National Park."
                },
                {
                  src: "/assets/gallery/2.jpeg",
                  alt: "Safari jeep crossing a stream",
                  description: "Our comfortable 4x4 safari jeep navigating through the park's diverse terrain during an adventure."
                },
                {
                  src: "/assets/gallery/3.jpeg",
                  alt: "Water buffalo in the wild",
                  description: "Water buffalo cooling off in the wetlands, demonstrating the park's rich ecosystem and water sources."
                },
                {
                  src: "/assets/gallery/4.jpeg",
                  alt: "Crocodile sunbathing",
                  description: "A crocodile basking in the sun on the riverbank, one of the many reptilian residents of the park."
                },
                {
                  src: "/assets/gallery/5.jpeg",
                  alt: "Colorful birds perched",
                  description: "Vibrant tropical birds perched on branches, highlighting the park's incredible avian diversity."
                },
                {
                  src: "/assets/gallery/6.jpeg",
                  alt: "Deer in the grasslands",
                  description: "Graceful deer grazing in the open grasslands, perfectly adapted to the park's savanna environment."
                },
                {
                  src: "/assets/gallery/7.jpeg",
                  alt: "Safari guide Nuwan spotting wildlife",
                  description: "Expert guide Nuwan using professional equipment to spot and identify wildlife for an enhanced safari experience."
                },
                {
                  src: "/assets/gallery/8.jpeg",
                  alt: "Sunset over Udawalawa",
                  description: "A breathtaking sunset painting the sky over Udawalawa's landscape, creating magical golden hour moments."
                }
              ];

              return (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {galleryImages.map((img, idx) => (
                      <div
                        key={img.src}
                        className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                        onClick={() => setZoomedImage(img.src)}
                      >
                        <img
                          src={img.src}
                          alt={img.alt}
                          loading="lazy"
                          className="object-cover w-full h-48 md:h-64 group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <div className="text-white">
                            <Icon icon="mdi:magnify-plus" className="w-8 h-8 mx-auto" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Gallery Zoom Modal */}
                  {zoomedImage && (() => {
                    const img = galleryImages.find(i => i.src === zoomedImage);
                    return (
                      <div
                        className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-6 animate-fadeInUp"
                        onClick={() => setZoomedImage(null)}
                      >
                        <div className="relative max-w-4xl w-full">
                          <button
                            onClick={() => setZoomedImage(null)}
                            className="absolute top-4 right-4 z-10 text-white hover:text-amber-300 transition-colors duration-300"
                          >
                            <Icon icon="mdi:close" className="w-8 h-8" />
                          </button>
                          <img
                            src={img?.src}
                            alt={img?.alt}
                            loading="lazy"
                            className="rounded-2xl shadow-2xl max-h-[80vh] w-auto object-contain mx-auto animate-zoomIn"
                          />
                          {img?.description && (
                            <div className="mt-6 text-white text-center bg-black/60 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg animate-fadeInUp max-w-2xl mx-auto">
                              <p className="text-lg leading-relaxed">{img.description}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </>
              );
            })()}
          </section>

          {/* WhatsApp Chat Button */}
          <a
            href="https://wa.me/94776103421?text=Hello%2C%20I%20would%20like%20to%20chat%20about%20Udawalawa%20Safari%20by%20Nuwan."
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-full shadow-2xl z-50 transition-all duration-300 hover:scale-110 animate-bounce"
            aria-label="WhatsApp Chat"
          >
            <Icon icon="mdi:whatsapp" className="w-7 h-7" />
          </a>

          {/* Contact & Footer */}
          <section id="contact">
            <footer className="bg-gradient-to-br from-amber-900 via-orange-900 to-amber-800 text-white">
              <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-3 gap-12 mb-12">
                  {/* Contact Info */}
                  <div className="text-center md:text-left">
                    <h4 
                      className="text-2xl font-bold mb-6 text-amber-200"
                      style={{ fontFamily: "Merriweather, serif" }}
                    >
                      Contact Information
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-center md:justify-start gap-3">
                        <Icon icon="mdi:map-marker" className="text-amber-300 w-5 h-5" />
                        <span>No. 45, RET Junction, Udawalawa</span>
                      </div>
                      <a 
                        href="tel:+94776103421" 
                        className="flex items-center justify-center md:justify-start gap-3 hover:text-amber-300 transition-colors duration-300"
                      >
                        <Icon icon="mdi:phone" className="text-amber-300 w-5 h-5" />
                        +94 77 610 3421
                      </a>
                      <a 
                        href="mailto:contact@udawalawasafari.lk" 
                        className="flex items-center justify-center md:justify-start gap-3 hover:text-amber-300 transition-colors duration-300"
                      >
                        <Icon icon="mdi:email" className="text-amber-300 w-5 h-5" />
                        contact@udawalawasafari.lk
                      </a>
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="text-center">
                    <h4 
                      className="text-2xl font-bold mb-6 text-amber-200"
                      style={{ fontFamily: "Merriweather, serif" }}
                    >
                      Quick Links
                    </h4>
                    <div className="space-y-3">
                      {["About", "Packages", "Gallery", "Contact"].map((section) => (
                        <button
                          key={section}
                          onClick={() => scrollTo(section.toLowerCase())}
                          className="block w-full hover:text-amber-300 transition-colors duration-300 py-1"
                        >
                          {section}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="text-center md:text-right">
                    <h4 
                      className="text-2xl font-bold mb-6 text-amber-200"
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
                        className="text-2xl hover:text-amber-300 transition-colors duration-300 hover:scale-110 transform"
                      >
                        <Icon icon="mdi:google" />
                      </a>
                      <a 
                        href="https://www.tripadvisor.com/Attraction_Review-g3577009-d27673880" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="TripAdvisor" 
                        className="text-2xl hover:text-amber-300 transition-colors duration-300 hover:scale-110 transform"
                      >
                        <Icon icon="simple-icons:tripadvisor" />
                      </a>
                      <a 
                        href="https://www.facebook.com/profile.php?id=100081508587185" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="Facebook" 
                        className="text-2xl hover:text-amber-300 transition-colors duration-300 hover:scale-110 transform"
                      >
                        <Icon icon="mdi:facebook" />
                      </a>
                      <a 
                        href="https://www.instagram.com/udawalawe_jeep_safari_service" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="Instagram" 
                        className="text-2xl hover:text-amber-300 transition-colors duration-300 hover:scale-110 transform"
                      >
                        <Icon icon="mdi:instagram" />
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-amber-700 pt-8 text-center">
                  <p className="text-amber-200 text-lg">
                    © {new Date().getFullYear()} Udawalawa Jeep Safari by Nuwan
                  </p>
                  <p className="text-amber-300 text-sm mt-2">
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