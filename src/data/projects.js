// ═══════════════════════════════════════════════════════════════
//  projects.js  ← EDIT THIS FILE to add / update projects
//
//  type:         "mobile" | "web"
//  appStoreUrl:  Apple App Store link  (leave "" if not available)
//  playStoreUrl: Google Play Store link (leave "" if not available)
//  liveUrl:      Website / live URL
//  videoUrl:     YouTube or Loom URL for demo video ("" = no video)
//  screenshots:  Array of { url: 'https://...', label: 'Screen name' }
// ═══════════════════════════════════════════════════════════════

const projects = [
  // ── MOBILE APPS ──────────────────────────────────────────────
  {
    id: "soul33",
    type: "mobile",
    title: "Soul33 – The Beacon",
    subtitle: "Spiritual Wellness & Meditation App",
    description:
      "A spiritual guidance app serving 15,000+ users with guided meditations, mood tracking, real-time group chat, digital guidance cards, and multilingual support (English, Spanish, Mandarin).",
    longDescription:
      "Soul33 – The Beacon is a full-featured spiritual wellness platform built for 15,000+ active users. Created by Gaia to combat her extensive waitlist, the app provides immediate 24/7 spiritual support — including guided meditations added each week, teachings to awaken intuition, digital guidance cards, remote healing sessions, voicemail features, and mood tracking.\n\nI led end-to-end development including a real-time group chat & voicemail system using WebSocket (200+ concurrent sessions, message replies, read receipts, file sharing), and a centralised audio playback engine with react-native-track-player (offline progress tracking, background downloads).\n\nEnabled the New React Native Architecture improving runtime performance by 40%. Migrated state persistence from MMKV to AsyncStorage for Redux, refactored the downloads manager and navigation stacks, and delivered a responsive tablet UI across 50+ screens.",
    stack: [
      "React Native",
      "Redux",
      "WebSocket",
      "AWS S3",
      "Firebase",
      "react-native-track-player",
    ],
    highlights: [
      "15,000+ active users with 4.7 ⭐ App Store rating",
      "Multilingual: English, Spanish & Mandarin meditations",
      "Real-time group chat supporting 200+ concurrent sessions with replies & read receipts",
      "40% runtime performance boost via New React Native Architecture",
      "Offline progress tracking & background audio downloads",
      "Advanced user analytics for audio engagement & feature performance",
    ],
    color: "#00e5ff",
    accent: "cyan",
    category: "Wellness",
    screens: 50,
    users: "15K+",
    rating: "4.7",
    // ↓ UPDATE THESE — paste the actual store links here
    appStoreUrl: "https://apps.apple.com/us/app/soul33/id1496751333",
    playStoreUrl: "", // add Play Store URL if available
    liveUrl: "https://www.soul33.com/the-app",
    videoUrl: "", // paste YouTube/Loom URL when ready
    screenshots: [
      {
        url: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/9d/b9/a9/9db9a928-a5fe-7099-ffb8-9cea5180c7b6/Frame_11.jpg/400x800bb.png",
        label: "Home Screen",
      },
      {
        url: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/06/0f/4b/060f4b57-4de4-f95e-44f2-548543abae5f/Frame_12.jpg/400x800bb.png",
        label: "Meditation Player",
      },
      {
        url: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/dc/0d/c6/dc0dc6cc-cf30-52f4-0d10-a906092e0636/Frame_13.jpg/400x800bb.png",
        label: "Group Chat",
      },
      {
        url: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/6b/e2/28/6be2280b-b9c1-22cd-0f61-5a65eec0f253/Frame_14.jpg/400x800bb.png",
        label: "Digital Guidance Cards",
      },
      {
        url: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/90/98/1d/90981dc0-1f3c-9c50-a3bb-06bb7914d48d/Frame_16.jpg/400x800bb.png",
        label: "Podcast & Teachings",
      },
      {
        url: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/6e/c2/47/6ec247ff-127e-1e5b-3e0d-c8d3a60c0967/Frame_19.jpg/400x800bb.png",
        label: "Videos & Remote Healing",
      },
      {
        url: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/02/6d/cd/026dcde5-d951-e97c-10df-deda8f4b7bb2/Frame_20.jpg/400x800bb.png",
        label: "Soul journal & Mood Tracking",
      },
    ],
  },

  {
    id: "yoke",
    type: "mobile",
    title: "Yoke Yoga",
    subtitle: "Social Wellness & Yoga Platform",
    description:
      "Social wellness platform with short-form yoga Reels, live streaming via ZegoCloud, subscription plans, offline playback, and smooth 60fps performance across 100+ screens.",
    longDescription:
      "Yoke App is a social wellness platform with an Instagram-inspired Reels experience for short-form yoga practices, subscriptions, and offline playback.\n\nI developed advanced video optimisation including preloading, caching, and seamless playback using react-native-video-cache. The live streaming feature via ZegoCloud SDK enables real-time audience interaction and recording.\n\nBuilt a responsive UI with dynamic tab bars, nested stacks, and memoised rendering across 100+ screens — reducing re-renders by 40%. Creator profile screens with optimised tabs (Posts, Tagged, Collaborations) and gallery components support smooth media browsing.",
    stack: [
      "React Native",
      "Redux",
      "ZegoCloud",
      "Video Streaming",
      "Firebase",
    ],
    highlights: [
      "Instagram-like Reels with video preloading & caching",
      "Live streaming with real-time audience interaction via ZegoCloud",
      "40% reduction in re-renders via component memoisation",
      "100+ screens with smooth nested navigation",
      "Subscriptions & offline playback support",
      "Creator profiles with optimised media galleries",
    ],
    color: "#7c4dff",
    accent: "purple",
    category: "Social",
    screens: 100,
    users: "10K+",
    rating: "4.5",
    appStoreUrl: "", // add App Store URL
    playStoreUrl: "", // add Play Store URL
    liveUrl: "",
    videoUrl: "",
    screenshots: [
      { url: "", label: "Reels Feed" },
      { url: "", label: "Live Stream" },
      { url: "", label: "Creator Profile" },
      { url: "", label: "Explore" },
    ],
  },

  {
    id: "costack-barva",
    type: "mobile",
    title: "Barva Skin Therapie",
    subtitle: "Ayurveda E-commerce & AR Beauty App",
    description:
      "Ayurveda-based beauty e-commerce app with Shopify API, 100+ products, personalised recommendations, secure checkout, loyalty rewards, and an AR lipstick try-on powered by Three.js & MediaPipe.",
    longDescription:
      "Barva Skin Therapie is an Ayurveda-based beauty and skincare brand selling Ghee Skincare, Ghee Makeup, and natural beauty products. The mobile app integrates with Shopify API supporting 100+ products with full cart, authentication, and order management.\n\nThe standout feature is an AR lipstick try-on built with Three.js and MediaPipe Face Landmarker, enabling real-time virtual makeup experiences across iOS and Android with no native AR SDK.\n\nAlso built a Firebase Cloud Messaging notification system for 5K+ users, custom navigation with dynamic theming, react-native-fast-image for optimised image handling, and scalable Redux + AsyncStorage state management.",
    stack: [
      "React Native",
      "Redux",
      "Shopify API",
      "Firebase",
      "Three.js",
      "MediaPipe",
    ],
    highlights: [
      "AR lipstick try-on with Three.js & MediaPipe Face Landmarker",
      "Full Shopify e-commerce — products, cart, auth & order management",
      "Firebase push notifications for 5,000+ users",
      "100+ Ayurveda beauty & skincare products",
      "Personalised recommendations, loyalty rewards & order tracking",
      "react-native-fast-image for optimised image handling",
    ],
    color: "#ff6b35",
    accent: "orange",
    category: "E-commerce / AR",
    screens: 40,
    users: "5K+",
    rating: "4.6",
    appStoreUrl: "", // add App Store URL
    playStoreUrl: "", // add Play Store URL
    liveUrl: "https://barvaskintherapie.com/",
    videoUrl: "",
    screenshots: [
      { url: "", label: "Product Listing" },
      { url: "", label: "AR Try-On" },
      { url: "", label: "Cart" },
      { url: "", label: "Order Detail" },
    ],
  },

  {
    id: "netras",
    type: "mobile",
    title: "Netra's Organic",
    subtitle: "Instant Indian Cuisine E-commerce App",
    description:
      "E-commerce mobile app for Netra's Instant Indian Cuisine — featuring breakfast, meals, curries & sweets with Buy 4 Get 2 Free bundles, catering orders, and a seamless Shopify-powered checkout.",
    longDescription:
      "Netra's Instant Indian Cuisine is a food e-commerce brand offering authentic instant Indian dishes — Pulao, Rice Upma, Prasad Sheera, Dal Fry, Red Curry, and more. The mobile app connects to their Shopify store bringing the full product catalogue, bundle deals, and catering services to mobile.\n\nKey features include a bundle configurator (Buy 4 Get 2 Free), recipe blog integration, home catering & B2B catering enquiry flows, and real-time order tracking. The UI uses react-native-fast-image for product images and a smooth carousel for featured offers.",
    stack: [
      "React Native",
      "Redux",
      "Shopify API",
      "Firebase",
      "react-native-fast-image",
    ],
    highlights: [
      "Full Shopify product catalogue with bundle deal configurator",
      "Buy 4 Get 2 Free bundle selector with dynamic pricing",
      "Home catering & B2B catering enquiry flows",
      "Recipe blog integration inside the app",
      "Real-time order tracking & push notifications",
      "Smooth product carousel with react-native-fast-image",
    ],
    color: "#ff6b35",
    accent: "orange",
    category: "Food / E-commerce",
    screens: 25,
    users: "2K+",
    rating: "4.5",
    appStoreUrl: "", // add App Store URL
    playStoreUrl: "", // add Play Store URL
    liveUrl: "https://netras.in/",
    videoUrl: "",
    screenshots: [
      { url: "", label: "Home / Offers" },
      { url: "", label: "Product Listing" },
      { url: "", label: "Bundle Builder" },
      { url: "", label: "Cart & Checkout" },
    ],
  },

  {
    id: "culture-max",
    type: "mobile",
    title: "Culture Max",
    subtitle: "Marathi Language Card Game Platform",
    description:
      "Educational card game blending Marathi language & culture with puzzles, daily challenges, and leaderboards. Upgraded RN 0.72→0.81, migrated to Kotlin & Swift, with a monetisation system boosting engagement 35%.",
    longDescription:
      "Culture Max is an interactive educational card game platform blending Marathi language & culture with puzzles, daily challenges, and leaderboards for 1,000+ daily active users.\n\nRequired a major React Native upgrade from 0.72.4 to 0.81.1, migrating the Android codebase from Java to Kotlin and the iOS AppDelegate to Swift.\n\nImplemented a full monetisation system (sponsor cards, banner ads, reward vouchers) increasing engagement by 35%. Built advanced card caching for gender, script, and mélange cards, integrated real-time analytics for sponsor clicks and view counts, and enhanced UX with animated transitions and optimised reward flows.",
    stack: ["React Native", "Redux", "Firebase", "Kotlin", "Swift"],
    highlights: [
      "Marathi language & culture learning via card games & daily challenges",
      "RN upgraded from 0.72.4 → 0.81.1",
      "Android Java → Kotlin & iOS AppDelegate → Swift migration",
      "35% engagement increase via monetisation system",
      "1,000+ daily active users with real-time leaderboards",
      "Advanced card caching & real-time analytics",
    ],
    color: "#00ff88",
    accent: "green",
    category: "Entertainment",
    screens: 30,
    users: "1K+ DAU",
    rating: "4.4",
    appStoreUrl: "", // add App Store URL
    playStoreUrl: "", // add Play Store URL
    liveUrl: "",
    videoUrl: "",
    screenshots: [
      { url: "", label: "Card Game" },
      { url: "", label: "Daily Challenge" },
      { url: "", label: "Leaderboard" },
      { url: "", label: "Rewards" },
    ],
  },

  // ── WEB PROJECTS ─────────────────────────────────────────────
  {
    id: "digital-card-platform",
    type: "web",
    title: "Digital Card Platform",
    subtitle: "Business Card Web App",
    description:
      "Digital business card platform built with Next.js & Tailwind CSS — 95+ Google PageSpeed score, 30% CSS bundle reduction, JWT auth for 5,000+ daily sessions, and ₹1,00,000+ monthly transactions.",
    longDescription:
      "Built during my tenure at The Special Character Pvt. Ltd., this digital card platform enables businesses to create, share, and manage digital business cards.\n\nBuilt with Next.js for SSR/SSG and Tailwind CSS for a minimal bundle — achieving 95+ Google PageSpeed scores and supporting 10,000+ concurrent users. JWT authentication handles 5,000+ daily sessions with 99.9% security compliance. Payment gateway integration processes ₹1,00,000+ monthly at 99.7% success rate. API response time reduced from 800ms to 400ms.",
    stack: [
      "Next.js",
      "React.js",
      "Tailwind CSS",
      "JWT",
      "Node.js",
      "PostgreSQL",
    ],
    highlights: [
      "95+ Google PageSpeed score on all pages",
      "30% CSS bundle reduction with Tailwind CSS",
      "10,000+ concurrent users supported",
      "JWT auth handling 5,000+ daily sessions",
      "₹1,00,000+ monthly transactions at 99.7% success rate",
      "API response time reduced from 800ms → 400ms",
    ],
    color: "#7c4dff",
    accent: "purple",
    category: "Web App",
    screens: 15,
    users: "10K+",
    rating: "4.8",
    appStoreUrl: "",
    playStoreUrl: "",
    liveUrl: "",
    videoUrl: "",
    screenshots: [],
  },

  {
    id: "web-dashboard",
    type: "web",
    title: "React Admin Dashboard",
    subtitle: "Analytics & Management UI",
    description:
      "Responsive React + Vite admin dashboard with real-time analytics, data visualisation, role-based access control, and a custom Tailwind CSS component library.",
    longDescription:
      "A full-featured admin dashboard built with React and Vite. Includes real-time analytics charts, sortable/filterable data tables, and role-based access control (RBAC).\n\nUI built with a custom Tailwind CSS component library ensuring visual consistency. Dark/light mode, mobile-responsive layouts, keyboard accessibility, and WCAG compliance built from scratch.",
    stack: [
      "React.js",
      "Vite",
      "Tailwind CSS",
      "TypeScript",
      "Recharts",
      "REST APIs",
    ],
    highlights: [
      "Sub-second load time with Vite + code splitting",
      "Real-time data visualisation with Recharts",
      "Role-based access control (RBAC)",
      "Custom Tailwind component library",
      "Full keyboard accessibility & WCAG compliance",
      "Dark / light mode with system preference detection",
    ],
    color: "#00e5ff",
    accent: "cyan",
    category: "Web App",
    screens: 20,
    users: "Internal",
    rating: "4.7",
    appStoreUrl: "",
    playStoreUrl: "",
    liveUrl: "",
    videoUrl: "",
    screenshots: [],
  },
];

export default projects;
