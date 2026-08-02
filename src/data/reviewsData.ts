export interface Review {
  id: string
  name: string
  location: string
  date: string
  rating: number
  avatarUrl?: string
  reviewText: string
  tripType: string
  source: 'Google' | 'TripAdvisor'
}

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Sarah & David Jenkins',
    location: 'United Kingdom',
    date: 'January 2026',
    rating: 5,
    tripType: 'Couples Morning Safari',
    source: 'Google',
    reviewText: 'Nuwan is an incredible guide! We saw over 40 wild elephants including babies, peacocks, eagles, and crocodiles. His jeep is comfortable, high off the ground, and he respects wildlife distance.',
  },
  {
    id: 'rev-2',
    name: 'Marco Rossi',
    location: 'Italy',
    date: 'December 2025',
    rating: 5,
    tripType: 'Full Day Safari',
    source: 'TripAdvisor',
    reviewText: 'Hands down the best safari operator in Udawalawe. Nuwan knew exactly where the animals would be without rushing. The breakfast by the reservoir was unforgettable.',
  },
  {
    id: 'rev-3',
    name: 'Elena Rostova',
    location: 'Germany',
    date: 'February 2026',
    rating: 5,
    tripType: 'Sunset Safari & Clay House Stay',
    source: 'Google',
    reviewText: 'Smooth booking over WhatsApp, super friendly service. Nuwan spotted animals way before any other jeep drivers. Highly recommend booking directly with him!',
  },
]
