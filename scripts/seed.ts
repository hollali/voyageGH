import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(import.meta.dirname, "../.env.local") });
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { trips } from "../lib/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const SAMPLE_TRIPS = [
  {
    name: "Accra City Explorer",
    description: "Experience the vibrant capital of Ghana — from Jamestown's historic lighthouse to Osu's buzzing nightlife, W.E.B. Du Bois Centre, and the colourful Makola Market. Dive into Ghanaian street food, explore Independence Square, and relax at Labadi Beach.",
    estimatedPrice: "GH₵ 2,500",
    duration: 4,
    budget: "Mid-range",
    travelStyle: "City Exploration",
    interests: "Food & Local Cuisine, Music & Nightlife, Markets & Shopping",
    groupType: "Solo",
    country: "Greater Accra",
    imageUrls: ["/assets/images/ghana/accra-city.jpg", "/assets/images/ghana/jamestown-lighthouse.jpg", "/assets/images/ghana/makola-market.jpg", "/assets/images/ghana/labadi-beach.jpg"],
    itinerary: [
      {
        day: 1,
        location: "Greater Accra",
        activities: [
          { time: "Morning", description: "Arrive in Accra and check into hotel in Osu. Walk along Oxford Street for local vibes." },
          { time: "Afternoon", description: "Explore Makola Market — the beating heart of Accra's commerce." },
          { time: "Evening", description: "Dine at a local chop bar and try jollof rice and kelewele." },
        ],
      },
      {
        day: 2,
        location: "Greater Accra",
        activities: [
          { time: "Morning", description: "Visit the Kwame Nkrumah Memorial Park and Museum." },
          { time: "Afternoon", description: "Explore Jamestown and climb the lighthouse for panoramic views." },
          { time: "Evening", description: "Relax at Labadi Beach with live highlife music." },
        ],
      },
      {
        day: 3,
        location: "Greater Accra",
        activities: [
          { time: "Morning", description: "Visit W.E.B. Du Bois Centre for African American heritage." },
          { time: "Afternoon", description: "Shop at the Arts Centre for authentic Ghanaian crafts." },
          { time: "Evening", description: "Experience Osu nightlife —酒吧 and live music venues." },
        ],
      },
      {
        day: 4,
        location: "Greater Accra",
        activities: [
          { time: "Morning", description: "Visit Independence Square and the Black Star Gate." },
          { time: "Afternoon", description: "Last-minute shopping at Accra Mall or Osu." },
          { time: "Evening", description: "Farewell dinner with traditional Ghanaian cuisine." },
        ],
      },
    ],
    bestTimeToVisit: [
      "Dry season (November to March): Warm and dry, ideal for outdoor activities",
      "Harmattan (December to February): Cool mornings, great for sightseeing",
    ],
    weatherInfo: [
      "Year-round: 24°C - 32°C (75°F - 90°F)",
      "Rainy seasons: April-June, September-November",
    ],
    location: {
      city: "Accra",
      coordinates: [5.6037, -0.1870] as [number, number],
      openStreetMap: "https://www.openstreetmap.org/#map=12/5.6037/-0.1870",
    },
    paymentLink: null,
  },
  {
    name: "Cape Coast Heritage Trail",
    description: "Walk through history at Cape Coast Castle and Elmina Castle — UNESCO World Heritage Sites. Trek through the lush Kakum National Park canopy walkway and learn about the transatlantic slave trade.",
    estimatedPrice: "GH₵ 3,800",
    duration: 5,
    budget: "Mid-range",
    travelStyle: "Heritage & History",
    interests: "Historical Sites & Castles, Nature & Wildlife, Hiking & Waterfalls",
    groupType: "Family",
    country: "Central",
    imageUrls: ["/assets/images/ghana/cape-coast-castle.jpg", "/assets/images/ghana/elmina-castle.jpg", "/assets/images/ghana/kakum-canopy.jpg"],
    itinerary: [
      {
        day: 1,
        location: "Central Region",
        activities: [
          { time: "Morning", description: "Drive from Accra to Cape Coast (2.5 hours). Check into hotel." },
          { time: "Afternoon", description: "Explore Cape Coast town and the colourful fishing harbour." },
          { time: "Evening", description: "Sunset walk along Cape Coast Beach." },
        ],
      },
      {
        day: 2,
        location: "Central Region",
        activities: [
          { time: "Morning", description: "Guided tour of Cape Coast Castle — Door of No Return." },
          { time: "Afternoon", description: "Visit the Cape Coast Museum of History and Culture." },
          { time: "Evening", description: "Dinner at a local restaurant with fante banku and tilapia." },
        ],
      },
      {
        day: 3,
        location: "Central Region",
        activities: [
          { time: "Morning", description: "Kakum Canopy Walkway — 350m long, 40m above the forest floor." },
          { time: "Afternoon", description: "Nature walk through Kakum National Park with a guide." },
          { time: "Evening", description: "Campfire and storytelling at the lodge." },
        ],
      },
      {
        day: 4,
        location: "Central Region",
        activities: [
          { time: "Morning", description: "Visit Elmina Castle — the oldest European building in sub-Saharan Africa." },
          { time: "Afternoon", description: "Explore Elmina fishing harbour and local markets." },
          { time: "Evening", description: "Seafood dinner at a beachfront restaurant." },
        ],
      },
      {
        day: 5,
        location: "Central Region",
        activities: [
          { time: "Morning", description: "Visit the Asafo Shrines and traditional Fante villages." },
          { time: "Afternoon", description: "Drive back to Accra with stops at Saltpond." },
          { time: "Evening", description: "Arrive in Accra." },
        ],
      },
    ],
    bestTimeToVisit: [
      "Dry season (November to March): Best for outdoor tours",
      "Minor rains (September to October): Lush green, fewer tourists",
    ],
    weatherInfo: [
      "Coastal: 23°C - 30°C (73°F - 86°F), sea breeze",
      "Rainy season: Frequent afternoon showers",
    ],
    location: {
      city: "Cape Coast",
      coordinates: [5.1054, -1.2466] as [number, number],
      openStreetMap: "https://www.openstreetmap.org/#map=13/5.1054/-1.2466",
    },
    paymentLink: null,
  },
  {
    name: "Kumasi & Ashanti Culture",
    description: "Dive into the heart of the Ashanti kingdom — visit Manhyia Palace, explore the massive Kejetia Market, and watch master weavers create kente cloth in Bonwire Village.",
    estimatedPrice: "GH₵ 5,200",
    duration: 6,
    budget: "Luxury",
    travelStyle: "Cultural",
    interests: "Kente & Craft Villages, Markets & Shopping, Festivals & Cultural Events",
    groupType: "Couple",
    country: "Ashanti",
    imageUrls: ["/assets/images/ghana/kumasi.jpg", "/assets/images/ghana/kejetia-market.jpg", "/assets/images/ghana/bonwire-kente.jpg", "/assets/images/ghana/kente-cloth.jpg"],
    itinerary: [
      {
        day: 1,
        location: "Ashanti Region",
        activities: [
          { time: "Morning", description: "Fly or drive to Kumasi. Check into a luxury hotel." },
          { time: "Afternoon", description: "Visit the Manhyia Palace Museum — seat of the Ashanti king." },
          { time: "Evening", description: "Traditional Ashanti dinner with fufu and light soup." },
        ],
      },
      {
        day: 2,
        location: "Ashanti Region",
        activities: [
          { time: "Morning", description: "Explore Kejetia Market — West Africa's largest open-air market." },
          { time: "Afternoon", description: "Visit the Prempeh II Jubilee Museum." },
          { time: "Evening", description: "Enjoy live highlife music at a Kumasi lounge." },
        ],
      },
      {
        day: 3,
        location: "Ashanti Region",
        activities: [
          { time: "Morning", description: "Drive to Bonwire Kente Village — watch master weavers at work." },
          { time: "Afternoon", description: "Hands-on kente weaving experience and shopping." },
          { time: "Evening", description: "Return to Kumasi for dinner." },
        ],
      },
      {
        day: 4,
        location: "Ashanti Region",
        activities: [
          { time: "Morning", description: "Visit Ntonso Adinkra Village — learn Adinkra symbol stamping." },
          { time: "Afternoon", description: "Explore the Kumasi Fort and Military Museum." },
          { time: "Evening", description: "Sunset drinks at a rooftop bar." },
        ],
      },
      {
        day: 5,
        location: "Ashanti Region",
        activities: [
          { time: "Morning", description: "Day trip to Lake Bosomtwe — Ghana's only natural lake." },
          { time: "Afternoon", description: "Swimming, paddle boating, or nature walk around the crater lake." },
          { time: "Evening", description: "Lakeside dinner with fresh tilapia." },
        ],
      },
      {
        day: 6,
        location: "Ashanti Region",
        activities: [
          { time: "Morning", description: "Last shopping at Kumasi Cultural Centre." },
          { time: "Afternoon", description: "Depart Kumasi." },
          { time: "Evening", description: "Arrive at destination." },
        ],
      },
    ],
    bestTimeToVisit: [
      "Dry season (November to March): Best for cultural tours",
      "Akwasidae Festival: Every 6 weeks at Manhyia Palace — a must-see",
    ],
    weatherInfo: [
      "Inland: 24°C - 34°C (75°F - 93°F), hotter than coast",
      "Dry season: Very warm days, cool evenings",
    ],
    location: {
      city: "Kumasi",
      coordinates: [6.6885, -1.6244] as [number, number],
      openStreetMap: "https://www.openstreetmap.org/#map=12/6.6885/-1.6244",
    },
    paymentLink: null,
  },
  {
    name: "Volta Region Adventure",
    description: "Hike to Wli Waterfalls — the tallest in West Africa. Visit the sacred monkey sanctuary at Tafi Atome, explore the Keta Lagoon, and soak in the serenity of Lake Bosomtwe.",
    estimatedPrice: "GH₵ 1,800",
    duration: 7,
    budget: "Budget",
    travelStyle: "Adventure",
    interests: "Hiking & Waterfalls, Nature & Wildlife, Photography Spots",
    groupType: "Friends",
    country: "Volta",
    imageUrls: ["/assets/images/ghana/volta-region.jpg", "/assets/images/ghana/wli-waterfalls.jpg", "/assets/images/ghana/lake-bosomtwe.jpg"],
    itinerary: [
      {
        day: 1,
        location: "Volta Region",
        activities: [
          { time: "Morning", description: "Drive from Accra to Hohoe (4 hours). Check into guesthouse." },
          { time: "Afternoon", description: "Rest and explore Hohoe town." },
          { time: "Evening", description: "Local dinner with akple and fetish soup." },
        ],
      },
      {
        day: 2,
        location: "Volta Region",
        activities: [
          { time: "Morning", description: "Hike to Wli Waterfall — 1.5km trail through tropical forest." },
          { time: "Afternoon", description: "Swim in the natural pool at the base of the falls." },
          { time: "Evening", description: "Campfire at the Wli guesthouse." },
        ],
      },
      {
        day: 3,
        location: "Volta Region",
        activities: [
          { time: "Morning", description: "Visit Tafi Atome Monkey Sanctuary — sacred Mona monkeys." },
          { time: "Afternoon", description: "Learn about the shrine and feed the monkeys." },
          { time: "Evening", description: "Village homestay experience." },
        ],
      },
      {
        day: 4,
        location: "Volta Region",
        activities: [
          { time: "Morning", description: "Drive to Keta — explore the Keta Lagoon and Auntie's Lagoon." },
          { time: "Afternoon", description: "Visit the Keta Sea Defense Project and cocoa villages." },
          { time: "Evening", description: "Beach dinner at Keta." },
        ],
      },
      {
        day: 5,
        location: "Volta Region",
        activities: [
          { time: "Morning", description: "Boat ride on the Keta Lagoon." },
          { time: "Afternoon", description: "Visit Agbozume Kente Market." },
          { time: "Evening", description: "Sunset at Keta beach." },
        ],
      },
      {
        day: 6,
        location: "Volta Region",
        activities: [
          { time: "Morning", description: "Drive to Lake Bosomtwe — the sacred Ashanti crater lake." },
          { time: "Afternoon", description: "Swimming and nature trails around the lake." },
          { time: "Evening", description: "Lakeside sunset and fresh tilapia dinner." },
        ],
      },
      {
        day: 7,
        location: "Volta Region",
        activities: [
          { time: "Morning", description: "Morning canoe ride on Lake Bosomtwe." },
          { time: "Afternoon", description: "Drive back to Accra." },
          { time: "Evening", description: "Arrive in Accra." },
        ],
      },
    ],
    bestTimeToVisit: [
      "Dry season (November to March): Best for hiking and waterfalls",
      "Minor rains (September October): Green landscapes, fewer crowds",
    ],
    weatherInfo: [
      "Volta: 22°C - 32°C (72°F - 90°F)",
      "Hilly areas: Cooler mornings, warm afternoons",
    ],
    location: {
      city: "Hohoe",
      coordinates: [6.5486, 0.4713] as [number, number],
      openStreetMap: "https://www.openstreetmap.org/#map=12/6.5486/0.4713",
    },
    paymentLink: null,
  },
  {
    name: "Northern Ghana Safari",
    description: "Experience the wild side of Ghana at Mole National Park — spot elephants, baboons, and antelopes on foot. Visit the ancient Larabanga Mosque and the Mystic Stone.",
    estimatedPrice: "GH₵ 4,200",
    duration: 5,
    budget: "Mid-range",
    travelStyle: "Nature & Outdoors",
    interests: "Nature & Wildlife, Photography Spots, Hiking & Waterfalls",
    groupType: "Couple",
    country: "Northern",
    imageUrls: ["/assets/images/ghana/mole-national-park.jpg", "/assets/images/ghana/ghana-adventure.jpg", "/assets/images/ghana/cocoa-farm.jpg"],
    itinerary: [
      {
        day: 1,
        location: "Northern Region",
        activities: [
          { time: "Morning", description: "Fly from Accra to Tamale (1 hour). Drive to Mole National Park." },
          { time: "Afternoon", description: "Check into Mole Motel overlooking the elephant watering hole." },
          { time: "Evening", description: "Watch elephants come to drink at sunset." },
        ],
      },
      {
        day: 2,
        location: "Northern Region",
        activities: [
          { time: "Morning", description: "Guided walking safari — spot elephants, baboons, kob antelopes." },
          { time: "Afternoon", description: "Second safari drive to different zones of the park." },
          { time: "Evening", description: "Dinner at the motel with savannah views." },
        ],
      },
      {
        day: 3,
        location: "Northern Region",
        activities: [
          { time: "Morning", description: "Visit Larabanga Mosque — one of the oldest mosques in West Africa." },
          { time: "Afternoon", description: "See the Mystic Stone and learn the legend." },
          { time: "Evening", description: "Cultural evening with the local community." },
        ],
      },
      {
        day: 4,
        location: "Northern Region",
        activities: [
          { time: "Morning", description: "Drive to Tamale. Explore Tamale's vibrant markets." },
          { time: "Afternoon", description: "Visit the Tamale Central Mosque and cultural centre." },
          { time: "Evening", description: "Traditional northern Ghanaian dinner — tuo zaafi and ayoyo soup." },
        ],
      },
      {
        day: 5,
        location: "Northern Region",
        activities: [
          { time: "Morning", description: "Visit a traditional Dagomba chief's palace." },
          { time: "Afternoon", description: "Fly back to Accra." },
          { time: "Evening", description: "Arrive in Accra." },
        ],
      },
    ],
    bestTimeToVisit: [
      "Dry season (November to March): Animals gather at waterholes, easy to spot",
      "Harmattan (December to February): Cool mornings, great for walking safaris",
    ],
    weatherInfo: [
      "Northern Ghana: 22°C - 38°C (72°F - 100°F), very hot",
      "Dry season: Dusty harmattan winds from December",
    ],
    location: {
      city: "Mole National Park",
      coordinates: [9.2167, -1.8500] as [number, number],
      openStreetMap: "https://www.openstreetmap.org/#map=12/9.2167/-1.8500",
    },
    paymentLink: null,
  },
  {
    name: "Diaspora Heritage Journey",
    description: "A meaningful journey for the African diaspora — walk through the Door of No Return at Cape Coast Castle, connect with the Year of Return movement, and experience the warmth of Ghanaian culture.",
    estimatedPrice: "GH₵ 6,800",
    duration: 10,
    budget: "Premium",
    travelStyle: "Heritage & History",
    interests: "Historical Sites & Castles, Festivals & Cultural Events, Food & Local Cuisine",
    groupType: "Diaspora Visit",
    country: "Ghana",
    imageUrls: ["/assets/images/ghana/accra-skyline.jpg", "/assets/images/ghana/kwame-nkrumah-memorial.jpg", "/assets/images/ghana/ghana-flag.jpg", "/assets/images/ghana/african-art.jpg"],
    itinerary: [
      {
        day: 1,
        location: "Greater Accra",
        activities: [
          { time: "Morning", description: "Arrive at Kotoka International Airport. VIP welcome and transfer." },
          { time: "Afternoon", description: "Check into luxury hotel in Accra. Welcome reception." },
          { time: "Evening", description: "Welcome dinner with Ghanaian cuisine and live music." },
        ],
      },
      {
        day: 2,
        location: "Greater Accra",
        activities: [
          { time: "Morning", description: "Visit the W.E.B. Du Bois Centre — the final home of the pan-Africanist." },
          { time: "Afternoon", description: "Explore Jamestown and the Ghanaian roots experience." },
          { time: "Evening", description: "Osu nightlife and cultural immersion." },
        ],
      },
      {
        day: 3,
        location: "Greater Accra",
        activities: [
          { time: "Morning", description: "Visit the Independence Square and the Black Star Gate." },
          { time: "Afternoon", description: "Shopping at the Arts Centre for authentic Ghanaian crafts." },
          { time: "Evening", description: "Traditional naming ceremony experience." },
        ],
      },
      {
        day: 4,
        location: "Central Region",
        activities: [
          { time: "Morning", description: "Drive to Cape Coast. Visit Cape Coast Castle." },
          { time: "Afternoon", description: "Walk through the Door of No Return — emotional heritage moment." },
          { time: "Evening", description: "Reflection dinner at a heritage lodge." },
        ],
      },
      {
        day: 5,
        location: "Central Region",
        activities: [
          { time: "Morning", description: "Visit Elmina Castle and the fishing harbour." },
          { time: "Afternoon", description: "Kakum Canopy Walkway — walk above the rainforest." },
          { time: "Evening", description: "Beach bonfire and storytelling." },
        ],
      },
      {
        day: 6,
        location: "Ashanti Region",
        activities: [
          { time: "Morning", description: "Drive to Kumasi. Visit Manhyia Palace." },
          { time: "Afternoon", description: "Kejetia Market exploration." },
          { time: "Evening", description: "Traditional Ashanti dinner." },
        ],
      },
      {
        day: 7,
        location: "Ashanti Region",
        activities: [
          { time: "Morning", description: "Bonwire Kente Village — kente weaving experience." },
          { time: "Afternoon", description: "Ntonso Adinkra Village — create your own Adinkra stamp." },
          { time: "Evening", description: "Cultural performance in Kumasi." },
        ],
      },
      {
        day: 8,
        location: "Volta Region",
        activities: [
          { time: "Morning", description: "Drive to Volta Region. Wli Waterfalls hike." },
          { time: "Afternoon", description: "Swim in the natural pool." },
          { time: "Evening", description: "Lakeside dinner at Lake Bosomtwe." },
        ],
      },
      {
        day: 9,
        location: "Greater Accra",
        activities: [
          { time: "Morning", description: "Return to Accra. Beach morning at Labadi." },
          { time: "Afternoon", description: "Last-minute shopping and souvenirs." },
          { time: "Evening", description: "Farewell gala dinner with traditional dancing." },
        ],
      },
      {
        day: 10,
        location: "Greater Accra",
        activities: [
          { time: "Morning", description: "Departure from Kotoka International Airport." },
          { time: "Afternoon", description: "Until we meet again, Ghana!" },
          { time: "Evening", description: "" },
        ],
      },
    ],
    bestTimeToVisit: [
      "Year of Return (December): Special events and homecoming celebrations",
      "Dry season (November to March): Best weather for touring",
    ],
    weatherInfo: [
      "Varies by region: 24°C - 34°C (75°F - 93°F)",
      "Coastal areas slightly cooler due to sea breeze",
    ],
    location: {
      city: "Accra",
      coordinates: [5.6037, -0.1870] as [number, number],
      openStreetMap: "https://www.openstreetmap.org/#map=12/5.6037/-0.1870",
    },
    paymentLink: null,
  },
];

async function seed() {
  const dryRun = process.argv.includes("--dry-run");
  console.log(dryRun ? "[DRY RUN] Would seed database with sample Ghana trips..." : "Seeding database with sample Ghana trips...");

  try {
    if (!dryRun) {
      // Clear existing trips
      await db.delete(trips);
      console.log("Cleared existing trips.");

      // Insert sample trips
      const result = await db.insert(trips).values(SAMPLE_TRIPS).returning();
      console.log(`Inserted ${result.length} trips successfully.`);

      // Log the IDs
      result.forEach((trip) => {
        console.log(`  - [${trip.id}] ${trip.name}`);
      });
    } else {
      console.log(`Would insert ${SAMPLE_TRIPS.length} trips:`);
      SAMPLE_TRIPS.forEach((trip) => {
        console.log(`  - ${trip.name} (${trip.duration} days, ${trip.estimatedPrice})`);
      });
    }

    console.log("Seeding complete!");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
