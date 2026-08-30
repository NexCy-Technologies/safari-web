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
  reviewUrl: string
}

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Emily R.',
    location: 'Australia',
    date: 'February 2024',
    rating: 5,
    tripType: 'Morning Safari',
    source: 'Google',
    reviewText: 'We had an amazing time with Nuwan! He was very knowledgeable and respectful of the animals. We saw so many elephants, crocodiles, and beautiful birds. Highly recommend his services if you visit Udawalawe!',
    reviewUrl: 'https://share.google/ZWz22GUBHRrtKVAJV',
  },
  {
    id: 'rev-2',
    name: 'Markus T.',
    location: 'Germany',
    date: 'January 2024',
    rating: 5,
    tripType: 'Full Day Safari',
    source: 'TripAdvisor',
    reviewText: 'Nuwan is the best guide in Udawalawe. He has an eagle eye for spotting wildlife that other jeeps completely missed. The jeep was very comfortable and the lunch he provided was delicious.',
    reviewUrl: 'https://www.tripadvisor.com/Attraction_Review-g3577009-d27673880-Reviews-Udawalawe_Jeep_Safari_Services-Udawalawa_Sabaragamuwa_Province.html',
  },
  {
    id: 'rev-3',
    name: 'Sophie & James',
    location: 'UK',
    date: 'March 2024',
    rating: 5,
    tripType: 'Evening Safari',
    source: 'Google',
    reviewText: 'Fantastic experience from start to finish. Booking over WhatsApp was incredibly easy. Nuwan made sure we were in the perfect spot to watch the elephants at sunset. Truly unforgettable!',
    reviewUrl: 'https://share.google/ZWz22GUBHRrtKVAJV',
  },
  {
    id: 'rev-4',
    name: 'Carlos M.',
    location: 'Spain',
    date: 'December 2023',
    rating: 5,
    tripType: 'Morning Safari',
    source: 'TripAdvisor',
    reviewText: 'A brilliant half-day tour. Nuwan arrived at our hotel exactly on time. He knew the park inside out and avoided the crowded spots. We saw a leopard in the distance and countless elephants.',
    reviewUrl: 'https://www.tripadvisor.com/Attraction_Review-g3577009-d27673880-Reviews-Udawalawe_Jeep_Safari_Services-Udawalawa_Sabaragamuwa_Province.html',
  },
  {
    id: 'rev-5',
    name: 'The Patel Family',
    location: 'India',
    date: 'April 2024',
    rating: 5,
    tripType: 'Private Family Safari',
    source: 'Google',
    reviewText: 'Nuwan was so patient with our young children and made the safari educational and fun. The jeep is raised so even the kids had perfect views. Best part of our Sri Lanka trip.',
    reviewUrl: 'https://share.google/ZWz22GUBHRrtKVAJV',
  },
  {
    id: 'rev-6',
    name: 'Laura V.',
    location: 'Netherlands',
    date: 'February 2024',
    rating: 5,
    tripType: 'Evening Safari',
    source: 'TripAdvisor',
    reviewText: 'Do not hesitate to book with Nuwan! His English is excellent and his passion for conservation is obvious. He never crowded the elephants and always kept a safe, respectful distance.',
    reviewUrl: 'https://www.tripadvisor.com/Attraction_Review-g3577009-d27673880-Reviews-Udawalawe_Jeep_Safari_Services-Udawalawa_Sabaragamuwa_Province.html',
  },
  {
    id: 'rev-7',
    name: 'Antoine & Marie',
    location: 'France',
    date: 'November 2023',
    rating: 5,
    tripType: 'Full Day Safari',
    source: 'Google',
    reviewText: 'An exceptional day in the national park. The breakfast by the river was magical. Nuwan spotted birds hidden in trees we would have never seen. 5 stars all the way!',
    reviewUrl: 'https://share.google/ZWz22GUBHRrtKVAJV',
  },
  {
    id: 'rev-8',
    name: 'Chloe W.',
    location: 'Canada',
    date: 'May 2024',
    rating: 5,
    tripType: 'Morning Safari',
    source: 'TripAdvisor',
    reviewText: 'Very well organized and fairly priced. Nuwan is a professional who knows exactly how to read the animals. We had a large male elephant walk right across our path. Incredible.',
    reviewUrl: 'https://www.tripadvisor.com/Attraction_Review-g3577009-d27673880-Reviews-Udawalawe_Jeep_Safari_Services-Udawalawa_Sabaragamuwa_Province.html',
  },
  {
    id: 'rev-9',
    name: 'David K.',
    location: 'USA',
    date: 'January 2024',
    rating: 5,
    tripType: 'Photography Safari',
    source: 'Google',
    reviewText: 'As a wildlife photographer, I needed a guide who understands lighting and positioning. Nuwan was absolutely perfect. He positioned the jeep flawlessly for the best shots every time.',
    reviewUrl: 'https://share.google/ZWz22GUBHRrtKVAJV',
  },
  {
    id: 'rev-10',
    name: 'Jasmine L.',
    location: 'Singapore',
    date: 'March 2024',
    rating: 5,
    tripType: 'Evening Safari',
    source: 'TripAdvisor',
    reviewText: 'Nuwan went above and beyond. We were picked up right from our guesthouse. The jeep was spotless and comfortable. We saw a huge herd of elephants bathing. Truly a dream come true.',
    reviewUrl: 'https://www.tripadvisor.com/Attraction_Review-g3577009-d27673880-Reviews-Udawalawe_Jeep_Safari_Services-Udawalawa_Sabaragamuwa_Province.html',
  }
]
