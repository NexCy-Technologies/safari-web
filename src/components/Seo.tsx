// src/components/Seo.tsx
import Head from "next/head";

interface SeoProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  twitterHandle?: string; // optional
}

const Seo: React.FC<SeoProps> = ({
  title = "Udawalawa Jeep Safari Service by Nuwan",
  description = "Join Nuwan Safari for an unforgettable wildlife adventure in Udawalawa, Sri Lanka. Experience guided jeep safaris, see elephants, leopards, birds, and more. Safari in Sri Lanka with Nuwan ensures expert guidance, local knowledge, and memorable wildlife experiences.",
  url = "https://udawalawasafari.lk",
  image = "/favicon.ico", // Preview image or can keep as favicon
  twitterHandle = "@NuwanSafari",
}) => {
  return (
    <Head>
      {/* Basic Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="Nuwan, Nuwan Safari, Udawalawa, Safari, Safari Sri Lanka, Wildlife Safari, Jeep Safari, Sri Lanka Safari, Sri Lanka Wildlife, Udawalawa Safari, Safari Tours, Jungle Safari, Safari Adventure"
      />
      <link rel="icon" href="/favicon.ico" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
    </Head>
  );
};

export default Seo;