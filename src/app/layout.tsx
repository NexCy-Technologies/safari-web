import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"
import Script from "next/script"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.udawalawasafari.lk"),
  title: "Udawalawe Safari by Nuwan | Best Jeep Tours & Wildlife Safari Sri Lanka 2026",
  description:
    "#1 Rated Udawalawe Safari Service by Nuwan - Expert wildlife jeep tours in Sri Lanka. See 100+ wild elephants, leopards, sloth bears & 400+ bird species. Affordable packages, 5-star reviews, WhatsApp booking. Visit Udawalawe National Park with certified local guide.",
  keywords: [
    // Primary Keywords - Sri Lanka Focus
    "Udawalawe Safari",
    "Udawalawe National Park Safari",
    "Sri Lanka Safari Tours",
    "Sri Lanka Wildlife Safari",
    "Udawalawe Jeep Safari",
    "Safari Sri Lanka",
    "Udawalawe Elephant Safari",
    "Best Safari in Sri Lanka",
    
    // Location-Based Keywords
    "Udawalawe Safari by Nuwan",
    "Safari Udawalawe National Park",
    "Udawalawe Safari Service",
    "Safari Tours Udawalawe",
    "Udawalawe Wildlife Tours",
    "Embilipitiya Safari",
    "Southern Province Safari Sri Lanka",
    "Sabaragamuwa Safari",
    
    // Activity Keywords
    "Elephant Watching Sri Lanka",
    "Wild Elephant Safari",
    "Leopard Spotting Sri Lanka",
    "Bird Watching Udawalawe",
    "Wildlife Photography Safari",
    "Nature Safari Sri Lanka",
    "Jungle Safari Tours",
    
    // Service Keywords
    "Private Jeep Safari Udawalawe",
    "Udawalawe Safari Jeep Hire",
    "Safari Guide Udawalawe",
    "Professional Safari Service",
    "Licensed Safari Operator",
    "Certified Wildlife Guide",
    "Local Safari Expert",
    
    // Booking & Pricing Keywords
    "Udawalawe Safari Booking",
    "Safari Packages Sri Lanka",
    "Affordable Safari Tours",
    "Budget Safari Udawalawe",
    "Safari Ticket Price",
    "Half Day Safari Udawalawe",
    "Full Day Safari Package",
    "Morning Safari Tour",
    "Evening Safari Udawalawe",
    
    // Contact & Reviews
    "Udawalawe Safari Contact Number",
    "Safari WhatsApp Booking",
    "5 Star Safari Reviews",
    "Best Rated Safari Sri Lanka",
    "Trusted Safari Operator",
    "Safari Reviews Udawalawe",
    
    // International Keywords
    "Sri Lanka Safari from Colombo",
    "Safari Day Trip from Galle",
    "Safari Tour from Ella",
    "Safari from Mirissa",
    "Safari from Yala",
    "Sri Lanka Wildlife Holiday",
    "Asia Safari Tours",
    "South Asia Wildlife Safari",
    
    // Long-tail Keywords
    "How to Book Udawalawe Safari",
    "What Animals in Udawalawe",
    "Best Time Safari Udawalawe",
    "Udawalawe vs Yala Safari",
    "Family Safari Sri Lanka",
    "Honeymoon Safari Package",
    "Photography Safari Udawalawe",
    
    // Tourism Keywords
    "Sri Lanka Tourism Safari",
    "Visit Sri Lanka Wildlife",
    "Things to Do Udawalawe",
    "Udawalawe Attractions",
    "Sri Lanka National Parks",
    "Ceylon Safari Experience",
  ],
  applicationName: "Udawalawe Safari by Nuwan",
  category: "Travel",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  authors: [{ name: "Nuwan - Udawalawe Safari Expert", url: "https://www.udawalawasafari.lk" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    title: "Udawalawe Safari by Nuwan | #1 Wildlife Jeep Tours Sri Lanka",
    description:
      "🐘 See 100+ wild elephants in natural habitat! Expert-guided jeep safaris in Udawalawe National Park. Leopards, sloth bears, 400+ birds. 5⭐ rated, affordable packages, instant WhatsApp booking. Best wildlife experience in Sri Lanka.",
    url: "https://www.udawalawasafari.lk",
    siteName: "Udawalawe Safari by Nuwan - Sri Lanka's Premier Wildlife Tours",
    images: [
      {
        url: "https://www.udawalawasafari.lk/udawalawe-safari-social-preview.png",
        width: 1200,
        height: 630,
        alt: "Udawalawe Safari - Wild Elephants & Wildlife Tours in Sri Lanka",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Udawalawe Safari by Nuwan | Best Wildlife Jeep Tours Sri Lanka",
    description:
      "🐘 Expert-guided wildlife safaris in Udawalawe National Park. See 100+ elephants, leopards, sloth bears. 5-star reviews, affordable packages. Book your Sri Lanka safari adventure now!",
    images: ["https://www.udawalawasafari.lk/udawalawe-safari-social-preview.png"],
    creator: "@NuwanSafari",
    site: "@NuwanSafari",
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual GSC code
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.udawalawasafari.lk",
  },
  other: {
    "geo.region": "LK-2",
    "geo.placename": "Udawalawe, Sabaragamuwa Province, Sri Lanka",
    "geo.position": "6.4833;80.8833",
    "ICBM": "6.4833, 80.8833",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f2419" },
    { media: "(prefers-color-scheme: light)", color: "#c8a96b" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <head>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "LocalBusiness",
                  "@id": "https://www.udawalawasafari.lk/#business",
                  name: "Udawalawe Safari",
                  alternateName: "Udawalawe Safari Service by Nuwan",
                  description:
                    "Professional jeep safari tours in Udawalawe National Park, Sri Lanka. Expert wildlife guide Nuwan offers unforgettable safari experiences with elephants, leopards, and exotic birds.",
                  url: "https://www.udawalawasafari.lk",
                  telephone: "+94776103421",
                  email: "contact@udawalawasafari.lk",
                  logo: "https://www.udawalawasafari.lk/logo.png",
                  image: "https://www.udawalawasafari.lk/udawalawe-safari-social-preview.png",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "No. 45, RET Junction",
                    addressLocality: "Udawalawe",
                    addressRegion: "Ratnapura District",
                    addressCountry: "LK",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: "6.4833",
                    longitude: "80.8833",
                  },
                  openingHours: "Mo-Su 05:00-18:00",
                  priceRange: "$$",
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "5.0",
                    reviewCount: "50",
                    bestRating: "5",
                    worstRating: "1",
                  },
                  sameAs: [
                    "https://www.facebook.com/profile.php?id=100081508587185",
                    "https://www.instagram.com/udawalawe_jeep_safari_service",
                    "https://g.co/kgs/sPzai3",
                    "https://www.tripadvisor.com/Attraction_Review-g3577009-d27673880",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.udawalawasafari.lk/#website",
                  name: "Udawalawe Safari by Nuwan",
                  url: "https://www.udawalawasafari.lk/",
                  description:
                    "Official website for Udawalawe Safari by Nuwan. Book wildlife jeep tours and explore Udawalawe National Park, Sri Lanka.",
                  publisher: {
                    "@id": "https://www.udawalawasafari.lk/#business",
                  },
                },
                {
                  "@type": "WebPage",
                  "@id": "https://www.udawalawasafari.lk/#webpage",
                  url: "https://www.udawalawasafari.lk/",
                  name: "Udawalawe Safari by Nuwan | Best Jeep Tours & Wildlife Safari Sri Lanka",
                  isPartOf: {
                    "@id": "https://www.udawalawasafari.lk/#website",
                  },
                  about: {
                    "@id": "https://www.udawalawasafari.lk/#business",
                  },
                  inLanguage: "en",
                },
                {
                  "@type": "TouristTrip",
                  "@id": "https://www.udawalawasafari.lk/#safari-trip",
                  name: "Udawalawe Safari",
                  description:
                    "Expertly guided jeep safari tours through Udawalawe National Park, offering close encounters with elephants, leopards, water buffalo, crocodiles, and over 200 bird species in their natural habitat.",
                  provider: {
                    "@id": "https://www.udawalawasafari.lk/#business",
                  },
                  touristType: "Wildlife Enthusiast",
                  itinerary: {
                    "@type": "ItemList",
                    itemListElement: [
                      {
                        "@type": "ListItem",
                        position: 1,
                        item: {
                          "@type": "TouristDestination",
                          name: "Udawalawe National Park",
                          description: "Sri Lanka's premier wildlife destination known for large elephant herds",
                        },
                      },
                    ],
                  },
                },
                {
                  "@type": "FAQPage",
                  "@id": "https://www.udawalawasafari.lk/#faq",
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: "What animals can I see on an Udawalawe safari?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Udawalawe National Park is famous for its large elephant herds. You can also spot leopards, water buffalo, crocodiles, deer, wild boar, and over 200 bird species including peacocks, eagles, and kingfishers.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "How long do safari tours last?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "We offer flexible safari durations: 3-hour quick tours, 4-hour extended tours, 6-hour half-day safaris, and 10-hour full-day experiences. Custom timing is also available based on your preferences.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "What is the best time for a safari?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Early morning (6:00-9:00 AM) and late afternoon (3:00-6:00 PM) are ideal for wildlife viewing when animals are most active. The dry season (May to September) offers the best visibility.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Is the safari suitable for children?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes, our safaris are family-friendly and suitable for children of all ages. We provide comfortable, safe 4x4 vehicles with excellent viewing opportunities for the whole family.",
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />

        <meta name="theme-color" content="#c8a96b" />
        <meta name="msapplication-TileColor" content="#c8a96b" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=yes" />

        {/* Geo Tags */}
        <meta name="geo.region" content="LK" />
        <meta name="geo.placename" content="Udawalawe, Sri Lanka" />
        <meta name="geo.position" content="6.4833;80.8833" />
        <meta name="ICBM" content="6.4833, 80.8833" />
      </head>
      <body className={`font-sans ${inter.variable} ${playfair.variable}`}>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXX"}`}
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXX"}', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `,
          }}
        />

        {process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID && (
          <>
            <Script
              id="fb-pixel"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
                  fbq('track', 'PageView');
                `,
              }}
            />
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
