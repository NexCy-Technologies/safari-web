import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"

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
  title: "Udawalawe Safari Jeep Tours | Expert Wildlife Guide in Sri Lanka",
  description:
    "Experience expertly guided wildlife safaris with Nuwan in Udawalawe National Park. See elephants, leopards, and exotic birds. Book your Sri Lanka safari adventure today.",
  keywords: [
    "Udawalawe Safari",
    "Nuwan Safari",
    "Sri Lanka Wildlife",
    "Jeep Safari",
    "Safari Tours",
    "Elephant Safari",
    "Leopard Spotting",
    "Wildlife Photography",
    "National Park Tours",
    "Safari Guide",
    "Udawalawe National Park",
    "Sri Lanka Tourism",
    "Wildlife Adventure",
    "Safari Experience",
    "Nature Tours",
    "Wild Safari Udawalawe",
    "Udawalawe Safari Contact Number",
    "Safari Booking Udawalawe",
    "Best Safari Sri Lanka",
    "Safari Packages Udawalawe",
    "Udawalawe Jeep Hire",
    "Safari Operator Udawalawe",
    "Safari Prices Udawalawe",
    "Safari Reviews Udawalawe",
    "Safari Sri Lanka Contact",
    "Safari Udawalawe Telephone",
    "Udawalawe Safari Tours",
    "Udawalawe Safari Jeep",
    "Udawalawe Safari Jeep Service",
    "Udawalawe National Park Jeep Safari Price",
    "Udawalawe Jeep Safari",
    "Udawalawe Safari Jeep Price for Locals",
    "Udawalawe National Park Safari Jeep",
    "Udawalawe Safari Jeep Contact Number",
  ],
  authors: [{ name: "Nuwan Safari", url: "https://www.udawalawasafari.lk" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    title: "Udawalawe Safari Jeep Tours | Expert Wildlife Guide in Sri Lanka",
    description:
      "Experience expertly guided wildlife safaris with Nuwan in Udawalawe National Park. See elephants, leopards, and exotic birds. Professional jeep safari tours with local expertise and 5-star reviews.",
    url: "https://www.udawalawasafari.lk",
    siteName: "Udawalawe Safari by Nuwan",
    images: [
      {
        url: "https://www.udawalawasafari.lk/udawalawe-safari-social-preview.png",
        width: 1200,
        height: 630,
        alt: "Udawalawe Safari Wildlife Adventure with Expert Guide Nuwan",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Udawalawe Safari Jeep Tours | Expert Wildlife Guide in Sri Lanka",
    description:
      "Experience expertly guided wildlife safaris with Nuwan in Udawalawe National Park. See elephants, leopards, and exotic birds. Book your Sri Lanka safari adventure today.",
    images: ["https://www.udawalawasafari.lk/udawalawe-safari-social-preview.png"],
    creator: "@NuwanSafari",
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
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXX"}`}
        />
        <script
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
            <script
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

        <link rel="canonical" href="https://www.udawalawasafari.lk" />
        <meta name="theme-color" content="#10b981" />
        <meta name="msapplication-TileColor" content="#10b981" />
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
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
