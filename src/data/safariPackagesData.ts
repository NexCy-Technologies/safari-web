export interface SafariPackage {
  id: string
  title: string
  subtitle: string
  duration: string
  timing: string
  popular?: boolean
  badge?: string
  description: string
  features: string[]
}

export const SAFARI_PACKAGES: SafariPackage[] = [
  {
    id: 'morning-safari',
    title: 'Morning Wildlife Safari',
    subtitle: 'Best for Active Wildlife Sightings',
    duration: '4 Hours',
    timing: '6:00 AM - 10:00 AM',
    popular: true,
    badge: 'Most Popular',
    description: 'Experience the wilderness coming alive at dawn when animals are most active during cooler morning hours.',
    features: [
      'Private 4x4 Modified Open-Top Jeep',
      'Certified Local Guide Nuwan',
      'Free Binoculars & Park Map',
      'Cold Bottled Water & Refreshments',
      'Hotel Pick-up & Drop-off in Udawalawe Area',
      '100% Guaranteed Elephant Sightings',
    ],
  },
  {
    id: 'evening-safari',
    title: 'Evening Sunset Safari',
    subtitle: 'Golden Hour Photography & Elephant Herds',
    duration: '3.5 Hours',
    timing: '2:30 PM - 6:00 PM',
    popular: false,
    description: 'Spectacular sunset views over the reservoir with massive elephant herds drinking at dusk.',
    features: [
      'Private 4x4 Safari Jeep with Cushion Seats',
      'Experienced Spotter & Professional Driver',
      'Prime Sunset Photography Stops',
      'Chilled Water & Fresh Fruit Refreshments',
      'Free Pickup near Udawalawe Park Gate',
      'Crocodile & Waterfowl Spotting',
    ],
  },
  {
    id: 'full-day-safari',
    title: 'Ultimate Full-Day Explorer',
    subtitle: 'Deep Jungle & Rare Leopard Tracking',
    duration: '10 Hours',
    timing: '5:45 AM - 4:00 PM',
    popular: false,
    badge: 'Deep Wilderness',
    description: 'Venture deep into undisturbed inner sectors of Udawalawe where casual tourists rarely reach.',
    features: [
      'Exclusive Full-Day Jeep Access',
      'Packed Traditional Sri Lankan Safari Lunch',
      'Wildlife Photography Angles & Spotting Tips',
      'Binoculars & High-Power Spotting Scope',
      'Rest Stop at Scenic Riverside',
      'All National Park Ticket Assistance',
    ],
  },
  {
    id: 'custom-safari',
    title: 'Custom Tailored Safari',
    subtitle: 'Flexible Hours, Photography & Bird Watching Focus',
    duration: 'Custom Duration',
    timing: 'Your Preferred Schedule',
    popular: false,
    badge: 'Personalized Tour',
    description: 'Design your own custom itinerary focused specifically on photography, birdwatching, or specific animal sightings.',
    features: [
      'Tailored Departure Times & Flexible Stops',
      'Dedicated Wildlife & Bird Watching Route',
      'Custom Duration (Half Day, Full Day, Multi-Day)',
      'Specialized Tripod & Photography Gear Space',
      'Direct WhatsApp Consultation with Nuwan',
      'Personalized Hotel Pickup & Drop-off',
    ],
  },
]
