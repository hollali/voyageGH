export const sidebarItems = [
  {
    id: 1,
    icon: "home",
    label: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    id: 3,
    icon: "users",
    label: "All Users",
    href: "/admin/users",
  },
  {
    id: 4,
    icon: "itinerary",
    label: "AI Trips",
    href: "/admin/trips",
  },
];

export const ghanaRegions = [
  "Greater Accra",
  "Ashanti",
  "Western",
  "Central",
  "Eastern",
  "Volta",
  "Northern",
  "Upper East",
  "Upper West",
  "Brong-Ahafo",
  "Western North",
  "Ahafo",
  "Bono East",
  "Oti",
  "Savannah",
  "North East",
];

export const ghanaDestinations = [
  "Accra",
  "Kumasi",
  "Cape Coast",
  "Elmina",
  "Lake Bosomtwe",
  "Kakum National Park",
  "Mole National Park",
  "Wli Waterfalls",
  "Ada Foah",
  "Takoradi",
  "Tamale",
  "Busua",
  "Keta",
  "Saltpond",
  "Bolgatanga",
  "Wa",
];

export const travelStyles = [
  "Relaxed",
  "Luxury",
  "Adventure",
  "Cultural",
  "Nature & Outdoors",
  "City Exploration",
  "Beach & Coastal",
  "Heritage & History",
];

export const interests = [
  "Food & Local Cuisine",
  "Historical Sites & Castles",
  "Beaches & Water Activities",
  "Markets & Shopping",
  "Music & Nightlife",
  "Nature & Wildlife",
  "Photography Spots",
  "Kente & Craft Villages",
  "Festivals & Cultural Events",
  "Voluntourism",
  "Coffee & Cocoa Tours",
  "Hiking & Waterfalls",
];

export const budgetOptions = ["Budget", "Mid-range", "Luxury", "Premium"];

export const groupTypes = ["Solo", "Couple", "Family", "Friends", "Business", "Diaspora Visit"];

export const footers = ["Terms & Conditions", "Privacy Policy"];

export const selectItems = ["groupType", "travelStyle", "interest", "budget"];

export const comboBoxItems: Record<string, string[]> = {
  groupType: groupTypes,
  travelStyle: travelStyles,
  interest: interests,
  budget: budgetOptions,
};

export const DUMMY_TRIPS = [
  {
    id: 1,
    name: "Accra City Explorer",
    description: "Experience the vibrant capital of Ghana — from Jamestown's historic lighthouse to Osu's buzzing nightlife, W.E.B. Du Bois Centre, and the colourful Makola Market.",
    imageUrls: ["/assets/images/ghana/accra-city.jpg", "/assets/images/ghana/jamestown-lighthouse.jpg", "/assets/images/ghana/makola-market.jpg"],
    itinerary: [{ location: "Greater Accra" }],
    tags: ["City", "Culture", "Food"],
    travelStyle: "City Exploration",
    budget: "Mid-range",
    interests: "Food & Local Cuisine, Music & Nightlife, Markets & Shopping",
    groupType: "Solo",
    duration: 4,
    estimatedPrice: "GH₵ 2,500",
  },
  {
    id: 2,
    name: "Cape Coast Heritage Trail",
    description: "Walk through history at Cape Coast Castle and Elmina Castle, then trek through the lush Kakum National Park canopy walkway.",
    imageUrls: ["/assets/images/ghana/cape-coast-castle.jpg", "/assets/images/ghana/elmina-castle.jpg", "/assets/images/ghana/kakum-canopy.jpg"],
    itinerary: [{ location: "Central Region" }],
    tags: ["Heritage", "Nature", "History"],
    travelStyle: "Heritage & History",
    budget: "Mid-range",
    interests: "Historical Sites & Castles, Nature & Wildlife, Hiking & Waterfalls",
    groupType: "Family",
    duration: 5,
    estimatedPrice: "GH₵ 3,800",
  },
  {
    id: 3,
    name: "Kumasi & Ashanti Culture",
    description: "Dive into the heart of Ashanti kingdom — visit Manhyia Palace, explore Kejetia Market, and watch master weavers in Bonwire Kente Village.",
    imageUrls: ["/assets/images/ghana/kumasi.jpg", "/assets/images/ghana/kejetia-market.jpg", "/assets/images/ghana/bonwire-kente.jpg"],
    itinerary: [{ location: "Ashanti Region" }],
    tags: ["Culture", "Markets", "Crafts"],
    travelStyle: "Cultural",
    budget: "Luxury",
    interests: "Kente & Craft Villages, Markets & Shopping, Festivals & Cultural Events",
    groupType: "Couple",
    duration: 6,
    estimatedPrice: "GH₵ 5,200",
  },
  {
    id: 4,
    name: "Volta Region Adventure",
    description: "Hike to Wli Waterfalls, visit the Wli Monkey Sanctuary, explore Keta's lagoon, and enjoy the tranquility of Lake Bosomtwe.",
    imageUrls: ["/assets/images/ghana/volta-region.jpg", "/assets/images/ghana/wli-waterfalls.jpg", "/assets/images/ghana/lake-bosomtwe.jpg"],
    itinerary: [{ location: "Volta Region" }],
    tags: ["Adventure", "Nature", "Hiking"],
    travelStyle: "Adventure",
    budget: "Budget",
    interests: "Hiking & Waterfalls, Nature & Wildlife, Photography Spots",
    groupType: "Friends",
    duration: 7,
    estimatedPrice: "GH₵ 1,800",
  },
];

export const DUMMY_USERS = [
  {
    id: "1",
    name: "Kwame Asante",
    email: "kwame@example.com",
    imageUrl: "/assets/images/david.webp",
    dateJoined: "January 15, 2025",
    itineraryCreated: 12,
    status: "user",
  },
  {
    id: "2",
    name: "Ama Mensah",
    email: "ama@example.com",
    imageUrl: "/assets/images/david.webp",
    dateJoined: "February 03, 2025",
    itineraryCreated: 6,
    status: "user",
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@voyagegh.com",
    imageUrl: "/assets/images/david.webp",
    dateJoined: "January 01, 2025",
    itineraryCreated: 24,
    status: "admin",
  },
];
