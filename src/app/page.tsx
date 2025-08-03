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

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
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
    },
    {
      title: "4-Hour Safari",
      description: "Extended wildlife spotting with peaceful terrain navigation.",
      duration: "4 hours",
    },
    {
      title: "Half-Day Safari",
      description: "Ideal balance of wildlife viewing and scenic breaks.",
      duration: "Around 6 hours",
    },
    {
      title: "Full-Day Safari",
      description: "Complete experience with lunch stop and full coverage.",
      duration: "Around 10 hours",
    },
    {
      title: "Custom Safari",
      description: "Tailored route and timing based on your preferences.",
      duration: "Flexible",
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
        <div className="fixed inset-0 flex items-center justify-center bg-black z-[9999] text-green-200 text-3xl md:text-5xl animate-pulse font-semibold tracking-wider">
          Udawalawa Safari by Nuwan
        </div>
      ) : (
        <div className="bg-black text-white min-h-screen" style={{ fontFamily: "Roboto, Open Sans, sans-serif" }}>
          {/* Header */}
          <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/30 border-b border-green-900/40 shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              <h1
                onClick={() => scrollTo("hero")}
                style={{ fontFamily: "Merriweather, serif" }}
                className="text-2xl tracking-wider text-green-200 cursor-pointer select-none"
              >
                Udawalawa Safari
              </h1>
              <nav className="hidden md:flex gap-10 text-green-200 font-medium">
                {["about", "packages", "gallery", "contact"].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollTo(section)}
                    className="hover:text-green-400 transition-all duration-300 uppercase tracking-wide"
                  >
                    {section}
                  </button>
                ))}
              </nav>
              <button
                className="md:hidden p-2 rounded-md hover:bg-green-700/30 transition"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <Icon icon={menuOpen ? "mdi:close" : "mdi:menu"} className="text-green-300 w-7 h-7" />
              </button>
            </div>
            {menuOpen && (
              <nav className="md:hidden bg-black/70 backdrop-blur-md border-t border-green-900/50 flex flex-col space-y-4 py-6 px-8 uppercase tracking-wider text-center font-semibold text-green-300">
                {["About", "Packages", "Gallery", "Contact"].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollTo(section.toLowerCase())}
                    className="hover:text-green-400 transition"
                  >
                    {section}
                  </button>
                ))}
              </nav>
            )}
          </header>

          {/* Hero Section */}
          <section id="hero" className="relative h-screen flex justify-center items-center text-center px-6 transition duration-1000 ease-in-out">
            <div className="absolute inset-0 w-full h-full">
              {heroImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Safari Hero ${index}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-900 ${
                index === currentHero ? "opacity-60 z-10" : "opacity-0 z-0"
                }`}
                style={{ filter: "brightness(0.7)" }}
              />
              ))}
            </div>
            <div className="absolute inset-0 bg-black/55 z-0" />
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
              <h2
                style={{ fontFamily: "Merriweather, serif" }}
                className="text-5xl md:text-6xl text-green-200 mb-6 drop-shadow-lg animate-fadeInUp font-bold tracking-tight"
              >
                <span className="bg-gradient-to-r from-green-400 via-yellow-200 to-white bg-clip-text text-transparent animate-gradient-x">
                  Discover the Untamed
                </span>
                <br />
                <span className="text-green-100 animate-gradient-x">
                  Natural Beauty of <span className="text-yellow-200 animate-gradient-x">Udawalawa</span>.
                </span>
                <style jsx>{`
                  @keyframes gradient-x {
                    0% {
                      background-position: 0% 50%;
                    }
                    100% {
                      background-position: 100% 50%;
                    }
                  }
                  .animate-gradient-x {
                    background: linear-gradient(270deg, #22c55e, #fde68a, #ffffff, #22c55e);
                    background-size: 600% 600%;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: gradient-x 12s linear infinite;
                  }
                `}</style>
              </h2>
                <p className="text-lg md:text-xl text-green-100 mb-10 leading-relaxed drop-shadow-md">
                Experience expertly guided wildlife safaris with Nuwan—delivering exceptional service, in-depth local knowledge, and lasting memories.
                </p>
                <a
                  href="https://wa.me/94776103421?text=I'm%20interested%20in%20your%20safari%20tours.%20Can%20you%20tell%20me%20more%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-700 hover:bg-green-800 text-white font-medium px-7 py-3 rounded-xl shadow transition hover:scale-105 text-lg"
                >
                  Reserve Safari
                </a>
            </div>
          </section>

          {/* About */}
            <section
              id="about"
              className="max-w-5xl mx-auto px-6 py-20 mt-20 opacity-0 translate-y-10 transition-all duration-1000 animate-fadeInUp"
              style={{ transition: "opacity 1s, transform 1s" }}
              ref={el => {
              if (!el) return;
              const onScroll = () => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight - 100) {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
                }
              };
              window.addEventListener("scroll", onScroll);
              // Initial check in case already in view
              onScroll();
              return () => window.removeEventListener("scroll", onScroll);
              }}
            >
              <h3
              style={{ fontFamily: "Merriweather, serif" }}
              className="text-4xl text-green-200 mb-8 text-center animate-fadeInUp"
              >
              About the Service
              </h3>
              <p className="text-green-100 text-lg leading-relaxed text-justify animate-fadeIn">
      Join an unforgettable safari experience in Udawalawe with Nuwan, a knowledgeable and friendly local guide who has been exploring the park for years. Nuwan offers half-day and full-day safaris that are perfectly timed to catch the best animal sightings, all while ensuring your comfort and safety. Whether it’s your first safari or one of many, Nuwan’s deep understanding of the area and its wildlife will make your journey both exciting and educational.
              <br /><br />
      Travel in a well-maintained, comfortable 4x4 jeep with plenty of space for photography and viewing. With Nuwan’s sharp eye and experience, you’re likely to spot a wide range of wildlife—from herds of elephants and water buffalo to crocodiles, deer, and many bird species. His local insights add great value to the tour, helping you understand animal behaviors, park history, and the delicate balance of Udawalawe’s ecosystem.
              <br /><br />
              </p>
            </section>

          {/* Packages */}
          <section
            id="packages"
            className="relative max-w-5xl mx-auto px-6 py-20 mt-20 animate-fadeInUp"
            style={{ overflow: "hidden" }}
          >
            {/* Subtle Background */}
            <div className="absolute inset-0 pointer-events-none z-0">
              {/* Soft dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-black/30 to-green-800/20 opacity-70" />
              {/* Decorative pattern */}
              <svg
                className="absolute right-0 bottom-0 w-40 h-40 opacity-20"
                viewBox="0 0 100 100"
                fill="none"
              >
                <circle cx="50" cy="50" r="40" stroke="#22c55e" strokeWidth="2" strokeDasharray="6 6" />
              </svg>
            </div>
            <h3
              style={{ fontFamily: "Merriweather, serif" }}
              className="relative z-10 text-4xl text-green-200 mb-12 text-center drop-shadow-lg"
            >
              Safari Packages
            </h3>
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10">
              {packages.map((pkg, i) => (
                <div
                  key={i}
                  className="group bg-black/60 backdrop-blur-md border border-green-700/40 rounded-xl p-6 shadow-xl hover:scale-105 transition-transform duration-500 cursor-pointer
                    hover:border-green-400/80 hover:shadow-2xl
                    opacity-0 translate-y-10"
                  style={{ transition: "opacity 0.8s, transform 0.8s" }}
                  onClick={() => setSelectedPackage(pkg.title)}
                  ref={el => {
                    if (!el) return;
                    const onScroll = () => {
                      const rect = el.getBoundingClientRect();
                      if (rect.top < window.innerHeight - 80) {
                        el.style.opacity = "1";
                        el.style.transform = "translateY(0)";
                      }
                    };
                    window.addEventListener("scroll", onScroll);
                    onScroll();
                    return () => window.removeEventListener("scroll", onScroll);
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-block w-2 h-8 bg-gradient-to-b from-green-400 via-green-700 to-green-200 rounded-full" />
                    <h4
                      className="text-2xl text-green-200 font-bold tracking-wide drop-shadow"
                      style={{ fontFamily: "Merriweather, serif" }}
                    >
                      {pkg.title}
                    </h4>
                  </div>
                  <p className="text-green-100 mb-2">{pkg.description}</p>
                  <div className="text-green-300 font-semibold mt-2">
                    <Icon icon="mdi:clock-outline" className="inline mr-1" />
                    {pkg.duration}
                  </div>
                  {/* Subtle shimmer effect on hover */}
                  <div className="absolute inset-0 pointer-events-none rounded-xl group-hover:bg-gradient-to-r group-hover:from-green-400/10 group-hover:to-green-700/10 transition duration-500" />
                </div>
              ))}
            </div>
          </section>

            {/* Modal */}
            {selectedPackage && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex justify-center items-center p-6">
              <div className="bg-neutral-900 border border-green-900 rounded-lg p-7 w-full max-w-md text-center relative animate-fadeInUp shadow-2xl">
                {(() => {
                const pkg = packages.find(p => p.title === selectedPackage);
                if (!pkg) return null;
                return (
                  <>
                  <h4 className="text-2xl text-green-200 mb-4" style={{ fontFamily: "Merriweather, serif" }}>
                    {pkg.title}
                  </h4>
                  <p className="text-green-100 mb-4 text-base">{pkg.description}</p>
                  <div className="flex items-center justify-center gap-2 mb-4 text-green-300 font-semibold">
                    <Icon icon="mdi:clock-outline" className="inline w-5 h-5" />
                    <span>Duration: {pkg.duration}</span>
                  </div>
                  <a
                    href="https://wa.me/94776103421?text=I'm%20interested%20in%20your%20safari%20tours.%20Can%20you%20tell%20me%20more%3F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 mt-4 bg-green-700 hover:bg-green-800 text-white px-7 py-3 rounded-xl shadow font-semibold text-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    <Icon icon="mdi:calendar-check" className="w-6 h-6" />
                    Book Now
                  </a>
                  </>
                );
                })()}
                <button
                onClick={() => setSelectedPackage(null)}
                className="absolute top-3 right-3 text-green-400 hover:text-green-200"
                aria-label="Close"
                >
                <Icon icon="mdi:close" className="w-6 h-6" />
                </button>
              </div>
              </div>
            )}


            <section
              id="gallery"
              className="max-w-6xl mx-auto px-6 py-20 mt-20 animate-fadeInUp"
              style={{ transition: "opacity 1s, transform 1s", opacity: 0, transform: "translateY(30px)" }}
              ref={el => {
              if (!el) return;
              const onScroll = () => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight - 100) {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
                }
              };
              window.addEventListener("scroll", onScroll);
              onScroll();
              return () => window.removeEventListener("scroll", onScroll);
              }}
            >
              <h3
              style={{ fontFamily: "Merriweather, serif" }}
              className="text-4xl text-green-200 mb-10 text-center animate-fadeInUp"
              >
              Gallery
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((img, idx) => (
                <div
                key={img}
                className="relative overflow-hidden rounded-xl shadow-lg group opacity-0 scale-95 cursor-pointer"
                style={{
                  transition: "opacity 0.8s cubic-bezier(.4,0,.2,1), transform 0.8s cubic-bezier(.4,0,.2,1)",
                  transitionDelay: `${idx * 120}ms`
                }}
                ref={el => {
                  if (!el) return;
                  const onScroll = () => {
                  const rect = el.getBoundingClientRect();
                  if (rect.top < window.innerHeight - 80) {
                    el.style.opacity = "1";
                    el.style.transform = "scale(1)";
                  }
                  };
                  window.addEventListener("scroll", onScroll);
                  onScroll();
                  return () => window.removeEventListener("scroll", onScroll);
                }}
                onClick={() => setZoomedImage(`/assets/gallery/${img}.jpeg`)}
                >
                <img
                  src={`/assets/gallery/${img}.jpeg`}
                  alt={`Gallery ${img}`}
                  className="object-cover w-full h-44 md:h-56 transform group-hover:scale-110 transition duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
                  <Icon icon="mdi:magnify" className="text-white w-6 h-6 animate-fadeInScale" />
                </div>
                <style jsx>{`
                  .animate-fadeInScale {
                  animation: fadeInScale 0.5s cubic-bezier(.4,0,.2,1);
                  }
                  @keyframes fadeInScale {
                  from {
                    opacity: 0;
                    transform: scale(0.8);
                  }
                  to {
                    opacity: 1;
                    transform: scale(1);
                  }
                  }
                `}</style>
                </div>
              ))}
              </div>
            </section>

            {/* Gallery Zoom Modal */}
            {typeof window !== "undefined" && zoomedImage && (
              <>
                <div
                  className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center animate-fadeInUp"
                  onClick={() => setZoomedImage(null)}
                  onTouchStart={e => {
                    const touchStartX = e.touches[0].clientX;
                    const touchStartY = e.touches[0].clientY;
                    const handleTouchEnd = (ev: TouchEvent) => {
                      const touchEndX = ev.changedTouches[0].clientX;
                      const touchEndY = ev.changedTouches[0].clientY;
                      if (
                        Math.abs(touchEndX - touchStartX) > 50 ||
                        Math.abs(touchEndY - touchStartY) > 50
                      ) {
                        setZoomedImage(null);
                      }
                      window.removeEventListener("touchend", handleTouchEnd);
                    };
                    window.addEventListener("touchend", handleTouchEnd);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <div className="relative max-w-3xl w-full flex flex-col items-center"></div>
                  <img
                    src={zoomedImage}
                    alt="Zoomed Gallery"
                    className="rounded-xl shadow-2xl max-h-[80vh] w-auto object-contain animate-zoomIn"
                    onClick={e => {
                      e.stopPropagation();
                      setZoomedImage(null);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <style jsx>{`
                  .animate-fadeInUp {
                    animation: fadeInUp 0.5s cubic-bezier(.4,0,.2,1);
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
                  .animate-zoomIn {
                    animation: zoomIn 0.5s cubic-bezier(.4,0,.2,1);
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
                `}</style>
              </>
            )}
          <a
            href="https://wa.me/94776103421?text=I'm%20interested%20in%20your%20safari%20tours.%20Can%20you%20tell%20me%20more%3F"
            target="_blank"
            className="fixed bottom-8 right-8 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg z-50"
            aria-label="WhatsApp Chat"
          >
            <Icon icon="mdi:whatsapp" className="w-6 h-6" />
          </a>

            {/* Contact & Footer */}
            <section
              id="contact"
            >
            <footer className="bg-black border-t border-green-900/30">
              <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-0 animate-fadeInUp">
                {/* Contact Info */}
                <div className="flex flex-col items-center md:items-start text-green-100 text-base gap-2">
                  <span className="flex items-center gap-2 font-semibold">
                    <Icon icon="mdi:map-marker" className="text-green-500" />
                    <span className="tracking-wide">No. 45, RET Junction, Udawalawa</span>
                  </span>
                  <a href="tel:+94776103421" className="flex items-center gap-2 hover:text-green-500 transition font-medium">
                    <Icon icon="mdi:phone" className="text-green-500" />
                    +94 77 610 3421
                  </a>
                  <a href="mailto:contact@udawalawasafari.lk" className="flex items-center gap-2 hover:text-green-500 transition font-medium">
                    <Icon icon="mdi:email" className="text-green-500" />
                    contact@udawalawasafari.lk
                  </a>
                </div>

                {/* Social Links */}
                <div className="flex justify-center md:justify-end gap-6 text-green-400 text-xl">
                  <a href="https://g.co/kgs/sPzai3" target="_blank" rel="noopener noreferrer" aria-label="Google" className="hover:text-green-600 transition">
                    <Icon icon="mdi:google" />
                  </a>
                  <a href="https://www.tripadvisor.com/Attraction_Review-g3577009-d27673880" target="_blank" rel="noopener noreferrer" aria-label="TripAdvisor" className="hover:text-green-600 transition">
                    <Icon icon="simple-icons:tripadvisor" className="w-5 h-5" />
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=100081508587185" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-green-600 transition">
                    <Icon icon="mdi:facebook" />
                  </a>
                  <a href="https://www.instagram.com/udawalawe_jeep_safari_service" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-green-600 transition">
                    <Icon icon="mdi:instagram" />
                  </a>
                </div>
              </div>
                <div className="text-center py-4 text-green-300 text-sm select-none border-t border-green-900/20 font-light tracking-wide">
                  © {new Date().getFullYear()} Udawalawa Jeep Safari by Nuwan &mdash; Designed & Developed by NexCy Technologies
                </div>
            </footer>
            </section>

        </div>
      )}
    </>
  );
}