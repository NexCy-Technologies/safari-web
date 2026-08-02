import hero1 from "@/assets/hero1.webp"
import hero2 from "@/assets/hero2.webp"
import hero3 from "@/assets/hero3.webp"
import hero4 from "@/assets/hero4.webp"
import type { StaticImageData } from "next/image"

export interface GalleryItem {
  id: string
  title: string
  description: string
  image: StaticImageData
  alt: string
  className?: string
}

export const galleryData: GalleryItem[] = [
  {
    id: "1",
    title: "Wild Elephant Encounter",
    description: "A majestic wild elephant spotted close to the jeep trails.",
    image: hero1,
    alt: "Wild Elephant in Udawalawe",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: "2",
    title: "Safari Jeep Tour",
    description: "Our 4x4 safaris offer the best viewing experience.",
    image: hero2,
    alt: "Safari Jeep Tour",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: "3",
    title: "Peacock Display",
    description: "Vibrant wildlife colors in the national park.",
    image: hero3,
    alt: "Peacock Displaying Feathers",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    id: "4",
    title: "Water Buffalo Herd",
    description: "Water buffaloes cooling off in the afternoon heat.",
    image: hero4,
    alt: "Water Buffalo Herd",
    className: "md:col-span-2 md:row-span-1",
  }
]
