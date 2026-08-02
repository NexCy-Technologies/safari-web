import type { StaticImageData } from "next/image"

import img1 from "@/assets/Gallery1.jpg"
import img2 from "@/assets/Gallery2.jpg"
import img3 from "@/assets/Gallery3.jpg"
import img4 from "@/assets/Gallery4.jpg"
import img5 from "@/assets/Gallery5.jpg"
import img6 from "@/assets/Gallery6.jpg"
import img7 from "@/assets/Gallery7.jpg"
import img8 from "@/assets/Gallery8.jpg"
import img9 from "@/assets/Gallery9.jpg"
import img10 from "@/assets/Gallery10.jpg"
import img11 from "@/assets/Gallery11.jpg"
import img12 from "@/assets/Gallery12.jpg"
import img13 from "@/assets/Gallery13.jpg"
import img14 from "@/assets/Gallery14.jpg"
import img15 from "@/assets/Gallery15.jpg"
import img16 from "@/assets/Gallery16.jpg"

export interface GalleryItem {
  id: string
  title: string
  description: string
  image: StaticImageData
  alt: string
  className?: string
}

// BENTO GRID SIZING:
// We use md:col-span-2 for wide, md:row-span-2 for tall, and md:col-span-2 md:row-span-2 for large focus images.
export const galleryData: GalleryItem[] = [
  {
    id: "1",
    title: "Majestic Elephant",
    description: "Close encounter with a beautiful wild elephant in Udawalawe.",
    image: img1,
    alt: "Wild Elephant",
    className: "md:col-span-2 md:row-span-2", 
  },
  {
    id: "2",
    title: "Safari Trails",
    description: "Following the natural paths through the dense jungle.",
    image: img2,
    alt: "Safari Trails",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: "3",
    title: "Wildlife Spotting",
    description: "Observing nature at its finest during golden hour.",
    image: img3,
    alt: "Wildlife Spotting",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    id: "4",
    title: "Udawalawe Wonders",
    description: "Incredible moments captured on our custom 4x4 jeeps.",
    image: img4,
    alt: "Udawalawe Wonders",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    id: "5",
    title: "Nature's Details",
    description: "Vibrant flora and fauna of the national park.",
    image: img5,
    alt: "Nature Details",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: "6",
    title: "Hidden Beauties",
    description: "Rare sightings deep in the Udawalawe wilderness.",
    image: img6,
    alt: "Hidden Beauties",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: "7",
    title: "Elephant Herd",
    description: "A peaceful herd of elephants roaming the grasslands.",
    image: img7,
    alt: "Elephant Herd",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: "8",
    title: "Jungle Safari",
    description: "A thrilling ride through the rough terrain.",
    image: img8,
    alt: "Jungle Safari",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: "9",
    title: "Dusk Safari",
    description: "The park comes alive as the sun begins to set.",
    image: img9,
    alt: "Dusk Safari",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    id: "10",
    title: "Watering Hole",
    description: "Animals gathering at the Udawalawe reservoir.",
    image: img10,
    alt: "Watering Hole",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    id: "11",
    title: "Jeep Adventure",
    description: "Unobstructed views from our customized open-top jeeps.",
    image: img11,
    alt: "Jeep Adventure",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: "12",
    title: "Lush Greenery",
    description: "The rich, diverse vegetation of Sri Lanka's finest park.",
    image: img12,
    alt: "Lush Greenery",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: "13",
    title: "Bird Watching",
    description: "Spotting exotic bird species perched high in the canopy.",
    image: img13,
    alt: "Bird Watching",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: "14",
    title: "Safari Expert",
    description: "Guided by certified local experts who know every trail.",
    image: img14,
    alt: "Safari Expert",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    id: "15",
    title: "Golden Hour",
    description: "The perfect lighting for wildlife photography.",
    image: img15,
    alt: "Golden Hour",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: "16",
    title: "Into the Wild",
    description: "Unforgettable memories made in the heart of Udawalawe.",
    image: img16,
    alt: "Into the Wild",
    className: "md:col-span-1 md:row-span-1",
  }
]
