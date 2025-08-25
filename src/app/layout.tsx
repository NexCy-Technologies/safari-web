import type React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Udawalawa Jeep Safari Service by Nuwan",
  description:
    "Experience expertly guided wildlife safaris with Nuwan—delivering exceptional service, in-depth local knowledge, and lasting memories in Sri Lanka's premier wildlife destination.",
  keywords: [
    "Udawalawa",
    "Jeep Safari",
    "Wildlife Safari Sri Lanka",
    "Hotels Udawalawa",
    "Safari Tours",
    "Luxury Safari",
  ],
  authors: [{ name: "NexCy Technologies", url: "https://nexcy.lk" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    title: "Udawalawa Jeep Safari Service by Nuwan",
    description:
      "Experience expertly guided wildlife safaris with Nuwan in Udawalawa, Sri Lanka. Comfortable, safe, and memorable adventures.",
    url: "https://www.udawalawasafari.lk/",
    siteName: "Udawalawa Jeep Safari",
    images: [
      {
        url: "https://www.udawalawasafari.lk//og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Udawalawa Jeep Safari",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Udawalawa Jeep Safari Service by Nuwan",
    description:
      "Expertly guided wildlife safaris in Udawalawa, Sri Lanka with Nuwan. Book your adventure today!",
    images: ["https://www.udawalawasafari.lk//og-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code", // Replace with your GSC code
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <head>
        <link rel="canonical" href="https://www.udawalawasafari.lk/" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta
          name="googlebot"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}