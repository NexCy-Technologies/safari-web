import type React from "react"
import Head from "next/head"

interface SeoProps {
  title?: string
  description?: string
  url?: string
  image?: string
  twitterHandle?: string
}

const Seo: React.FC<SeoProps> = ({
  title = "Udawalawe Safari by Nuwan | Best Wildlife Jeep Tours Sri Lanka 2025",
  description = "🐘 #1 Rated Udawalawe Safari - Expert wildlife tours in Sri Lanka. See 100+ wild elephants, leopards, sloth bears & 400+ bird species. Certified local guide, 5-star reviews, affordable packages. Book your Udawalawe National Park safari adventure with WhatsApp today!",
  url = "https://udawalawasafari.lk",
  image = "/udawalawe-safari-social-preview.png",
  twitterHandle = "@UdawalaweSafari",
}) => {
  return (
    <Head>
      {/* Enhanced Basic Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="Udawalawe Safari, Udawalawe National Park, Sri Lanka Safari, Jeep Safari Sri Lanka, Udawalawe Elephant Safari, Safari by Nuwan, Wildlife Safari Sri Lanka, Udawalawe Safari Booking, Best Safari Sri Lanka, Safari Tours Udawalawe, Elephant Watching Sri Lanka, Sri Lanka Wildlife Tours, Udawalawe Jeep Safari Price, Safari Packages Sri Lanka, Private Safari Udawalawe, Morning Safari Tour, Half Day Safari, Full Day Safari Package, Safari Guide Udawalawe, Licensed Safari Operator, Safari from Colombo, Safari from Ella, Safari from Galle, Safari from Mirissa, Bird Watching Udawalawe, Leopard Spotting Sri Lanka, Wildlife Photography Safari, Family Safari Sri Lanka, Budget Safari Tours, Affordable Safari Packages, Safari WhatsApp Booking, Udawalawe Safari Contact, Safari Reviews Sri Lanka, 5 Star Safari, Certified Wildlife Guide, Local Safari Expert, Udawalawe vs Yala Safari, Best Time Visit Udawalawe, What Animals Udawalawe, Udawalawe Safari Tickets, National Park Safari Sri Lanka, Ceylon Safari Tours, Asia Wildlife Safari, South Asia Safari, Sri Lanka Tourism Safari, Visit Sri Lanka Wildlife, Things to Do Udawalawe, Udawalawe Attractions, Honeymoon Safari Package, Photography Safari, Adventure Safari Tours, Nature Safari Sri Lanka, Jungle Safari Experience, Safari Day Trip, Weekend Safari Package, Udawalawe Safari Service, Safari Jeep Hire Udawalawe, Professional Safari Guide, Trusted Safari Operator, Safari Itinerary Sri Lanka, Safari Travel Guide, How to Book Safari Udawalawe, Safari Booking Online, Instant Safari Confirmation, Safari with Local Guide"
      />
      <meta name="author" content="Nuwan - Udawalawe Safari Expert Guide" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="3 days" />
      <meta name="rating" content="General" />
      <meta name="distribution" content="Global" />
      <link rel="canonical" href={url} />
      <link rel="icon" href="/favicon.ico" />

      {/* Enhanced Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Udawalawe Safari by Nuwan - Premier Wildlife Tours Sri Lanka" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Udawalawe Safari - Wild Elephants & Wildlife in Sri Lanka" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="en_GB" />
      <meta property="og:locale:alternate" content="si_LK" />

      {/* Enhanced Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="Udawalawe Wildlife Safari Experience - Sri Lanka" />
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
      {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />}

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#3f8c5d" />
      <meta name="msapplication-TileColor" content="#3f8c5d" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="mobile-web-app-capable" content="yes" />

      {/* Geo Tags - Sri Lanka Specific */}
      <meta name="geo.region" content="LK-2" />
      <meta name="geo.placename" content="Udawalawe, Sabaragamuwa Province, Sri Lanka" />
      <meta name="geo.position" content="6.4833;80.8833" />
      <meta name="ICBM" content="6.4833, 80.8833" />
      
      {/* Schema.org JSON-LD for Local Business */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristAttraction",
            name: "Udawalawe Safari by Nuwan",
            description: "Expert wildlife safari tours in Udawalawe National Park, Sri Lanka",
            url: "https://udawalawasafari.lk",
            telephone: "+94776103421",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Udawalawe",
              addressRegion: "Sabaragamuwa Province",
              addressCountry: "LK"
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 6.4833,
              longitude: 80.8833
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5.0",
              reviewCount: "500"
            },
            priceRange: "$$",
            openingHours: "Mo-Su 05:00-18:00",
            sameAs: [
              "https://wa.me/94776103421"
            ]
          })
        }}
      />
    </Head>
  )
}

export default Seo
