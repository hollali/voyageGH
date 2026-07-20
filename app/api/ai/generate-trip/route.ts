import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getGeminiApiKey } from "~/lib/env";
import { createTrip } from "~/lib/actions";
import { checkRateLimit, getRateLimitHeaders } from "~/lib/rate-limit";

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rateKey = `ai-trip:${userId}`;
  const rateLimit = checkRateLimit(rateKey, 5, 60000);
  const headers = getRateLimitHeaders(rateKey, 5);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: `Rate limit exceeded. Try again in ${rateLimit.retryAfter}s` },
      { status: 429, headers }
    );
  }

  try {
    const body = await request.json();
    const { country, travelStyle, interest, budget, duration, groupType } = body;

    if (!travelStyle || !interest || !budget || !duration || !groupType) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const region = country || "Ghana";

    const prompt = `You are a Ghana travel expert. Generate a ${duration}-day travel itinerary for ${region}, Ghana.
    Budget: '${budget}'
    Interests: '${interest}'
    TravelStyle: '${travelStyle}'
    GroupType: '${groupType}'

    Use real Ghanaian destinations, attractions, restaurants, hotels, and cultural experiences. Include specific place names like:
    - Accra: Jamestown Lighthouse, Osu Oxford Street, Makola Market, Kwame Nkrumah Memorial, W.E.B. Du Bois Centre, Labadi Beach, Independence Square
    - Cape Coast: Cape Coast Castle, Elmina Castle, Kakum Canopy Walkway, Busua Beach
    - Kumasi: Manhyia Palace, Kejetia Market, Bonwire Kente Village, Ntonso Adinkra Village
    - Volta: Wli Waterfalls, Lake Bosomtwe, Keta Lagoon, Tafi Atome Monkey Sanctuary
    - Northern: Mole National Park, Larabanga Mosque
    - Eastern: Aburi Botanical Gardens, Akosombo Dam

    All prices must be in Ghana Cedis (GH₵).
    Ghana has two main seasons: dry season (November-March) and rainy season (April-October). The harmattan dry wind blows from December to February.

    Return the itinerary in a clean, non-markdown JSON format with this structure:
    {
    "name": "A descriptive title for the Ghana trip",
    "description": "A brief description of the trip and its highlights not exceeding 100 words",
    "estimatedPrice": "Estimated price in GH₵, e.g.GH₵ 3,500",
    "duration": ${duration},
    "budget": "${budget}",
    "travelStyle": "${travelStyle}",
    "country": "${region}",
    "interests": "${interest}",
    "groupType": "${groupType}",
    "bestTimeToVisit": [
      "Dry season (November to March): Warm and dry, ideal for outdoor activities",
      "Harmattan (December to February): Cool mornings, great for northern Ghana",
      "Rainy season (April to July): Lush green landscapes, fewer tourists",
      "Minor rains (September to October): Warm, good for coastal visits"
    ],
    "weatherInfo": [
      "Dry season: 24°C - 32°C (75°F - 90°F), low humidity",
      "Harmattan: 18°C - 28°C (64°F - 82°F), cool mornings",
      "Rainy season: 22°C - 30°C (72°F - 86°F), afternoon showers",
      "Coastal areas: Slightly cooler due to sea breeze"
    ],
    "location": {
      "city": "primary city or region name",
      "coordinates": [latitude, longitude in Ghana],
      "openStreetMap": "link to open street map of the location"
    },
    "itinerary": [
    {
      "day": 1,
      "location": "City/Region Name",
      "activities": [
        {"time": "Morning", "description": "Specific activity with real Ghanaian location name"},
        {"time": "Afternoon", "description": "Specific activity with real Ghanaian location name"},
        {"time": "Evening", "description": "Specific activity with real Ghanaian restaurant or venue"}
      ]
    }
    ]
    }`;

    const apiKey = getGeminiApiKey();
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

    const tripData = JSON.parse(jsonMatch[0]);

    const ghanaImages = [
      "/assets/images/ghana/accra-city.jpg",
      "/assets/images/ghana/cape-coast-castle.jpg",
      "/assets/images/ghana/kumasi.jpg",
      "/assets/images/ghana/volta-region.jpg",
      "/assets/images/ghana/kakum-canopy.jpg",
      "/assets/images/ghana/mole-national-park.jpg",
      "/assets/images/ghana/bonwire-kente.jpg",
      "/assets/images/ghana/jamestown-lighthouse.jpg",
    ];
    const randomImages = ghanaImages.sort(() => Math.random() - 0.5).slice(0, 3);

    const savedTrip = await createTrip({
      name: tripData.name,
      description: tripData.description,
      estimatedPrice: tripData.estimatedPrice,
      duration: tripData.duration,
      budget: tripData.budget,
      travelStyle: tripData.travelStyle,
      interests: tripData.interests,
      groupType: tripData.groupType,
      country: tripData.country,
      imageUrls: randomImages,
      itinerary: tripData.itinerary,
      bestTimeToVisit: tripData.bestTimeToVisit,
      weatherInfo: tripData.weatherInfo,
      location: tripData.location,
    });

    return NextResponse.json(savedTrip);
  } catch (error) {
    console.error("AI trip generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate trip" },
      { status: 500 }
    );
  }
}
