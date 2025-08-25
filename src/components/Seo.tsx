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
  title = "Udawalawa Jeep Safari Service by Nuwan | Best Wildlife Tours Sri Lanka",
  description = "Experience expertly guided wildlife safaris with Nuwan in Udawalawa National Park. See elephants, leopards, and exotic birds. Professional jeep safari tours with local expertise and 5-star reviews. Book your Sri Lanka safari adventure today.",
  url = "https://udawalawasafari.lk",
  image = "/udawalawa-safari-social-preview.png",
  twitterHandle = "@NuwanSafari",
}) => {
  return (
    <Head>
      {/* Enhanced Basic Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="Udawalawa Safari, Nuwan Safari, Sri Lanka Wildlife, Jeep Safari, Safari Tours, Elephant Safari, Leopard Spotting, Wildlife Photography, National Park Tours, Safari Guide, Udawalawa National Park, Sri Lanka Tourism, Wildlife Adventure, Safari Experience, Nature Tours"
      />
      <meta name="author" content="Nuwan Safari" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <link rel="canonical" href={url} />
      <link rel="icon" href="/favicon.ico" />

      {/* Enhanced Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Udawalawa Safari by Nuwan" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Udawalawa Safari Wildlife Adventure" />
      <meta property="og:locale" content="en_US" />

      {/* Enhanced Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="Udawalawa Safari Wildlife Adventure" />
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
      {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />}

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#10b981" />
      <meta name="msapplication-TileColor" content="#10b981" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="format-detection" content="telephone=yes" />

      {/* Geo Tags */}
      <meta name="geo.region" content="LK" />
      <meta name="geo.placename" content="Udawalawa, Sri Lanka" />
      <meta name="geo.position" content="6.4833;80.8833" />
      <meta name="ICBM" content="6.4833, 80.8833" />
    </Head>
  )
}

export default Seo
