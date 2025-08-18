import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) {
      return res.status(500).json({ error: "Missing Google Places API key or Place ID" });
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Google API error: ${response.statusText}`);
    }

    const data = await response.json();
    const reviews = data.result?.reviews || [];

    // Normalize to match your Review type
    const formattedReviews = reviews.map((r: any, idx: number) => ({
      id: idx.toString(),
      author: r.author_name,
      rating: r.rating,
      text: r.text,
      date: r.relative_time_description,
      verified: true, // Google reviews are already verified
      profileImage: r.profile_photo_url || null,
    }));

    res.status(200).json(formattedReviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
}