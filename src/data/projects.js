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
      "Soul33 – The Beacon is a full-featured spiritual wellness platform built for 15,000+ active users across April 2025 – January 2026. The app provides 24/7 spiritual support — guided meditations, oracle card readings, group chat, audio streaming, personalized user journeys, and subscription-based content access.\n\nI led end-to-end development covering a complete Redux store architecture (auth, downloads, media, profile, misc slices), multi-stack navigation (Bottom Tab, Drawer, feature-specific stacks), and a real-time WebSocket group chat with swipe-to-reply, typing indicators, read receipts, and audio messages.\n\nThe audio engine (react-native-track-player) supports background playback, mini-player overlay, offline progress sync via AsyncStorage, download queue management, and S3 audio upload with waveform visualisation.\n\nEnabled the New React Native Architecture improving runtime performance by 40%. Delivered tablet-responsive UI across 50+ screens with skeleton loaders, animated card carousels, and Yup form validation.",
    stack: [
      "React Native",
      "TypeScript",
      "Redux Toolkit",
      "WebSocket",
      "AWS S3",
      "Firebase",
      "react-native-track-player",
      "Crashlytics",
    ],
    highlights: [
      "15,000+ active users with 4.7 ⭐ App Store rating",
      "Multilingual: English, Spanish & Mandarin meditations",
      "Real-time group chat — swipe-to-reply, typing indicators, audio messages, read receipts",
      "40% runtime performance boost via New React Native Architecture",
      "Background audio with offline progress sync, download queue & S3 voice upload",
      "Soul Oracle tarot with 3D card-flip animations, Soul Journal, Meditation Calendar with moon phases",
      "Firebase Crashlytics, FCM push notifications & analytics tracking",
      "TypeScript throughout — scalable, type-safe codebase",
    ],
    // Feature breakdown for project detail page
    features: [
      {
        icon: "🏗️",
        title: "Architecture & State",
        items: [
          "Scalable Redux store with 6 slices: auth, downloads, media, profile, updates, misc",
          "Multi-stack navigation: Bottom Tab, Drawer, Auth Stack, and 5 feature-specific stacks",
          "TypeScript throughout for type safety and maintainability",
          "Custom HTTP client (axios) with token refresh interceptors",
        ],
      },
      {
        icon: "🎵",
        title: "Audio Engine",
        items: [
          "react-native-track-player with background playback service & remote event handling",
          "Mini-player overlay showing current track across all screens",
          "Offline progress sync via AsyncStorage — restores on reconnect",
          "Download queue with per-user categorisation, progress tracking & status banner",
          "Voice recording with S3 upload, progress indicator & audio waveform visualisation",
        ],
      },
      {
        icon: "💬",
        title: "Real-Time Group Chat",
        items: [
          "WebSocket provider with auto-reconnection, retry limits & heartbeat monitoring",
          "Swipe-to-reply with animations, reply previews & jump-to-message navigation",
          "Text and audio message types with date-grouped SectionList rendering",
          "Typing indicators, read receipts, message deduplication & offline sync",
          "Superuser moderation: delete messages, user search with Redux state",
        ],
      },
      {
        icon: "✨",
        title: "Feature Modules",
        items: [
          "Soul Oracle: 3D tarot card-flip animations, progression & mini readings",
          "Soul Journal: mood-filtered entries, date picker, custom SVG icons",
          "Meditation Calendar: moon phase integration & special date insights",
          "Wallpaper downloads with storage permissions & gallery save",
          "Weekly Homework with audio playback, pagination & dynamic images",
        ],
      },
      {
        icon: "⚡",
        title: "Performance & Polish",
        items: [
          "FlatList optimisation: useCallback, useMemo, pagination, infinite scroll",
          "Animated card carousel on Home with pull-to-refresh & stats modal",
          "Skeleton loaders, empty states & responsive tablet layouts",
          "Firebase Crashlytics, FCM push notifications & App Tracking Transparency",
          "Production console suppression via Babel & environment-based API switching",
        ],
      },
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
      "Full-featured Ayurveda beauty e-commerce app with Shopify API, AR lipstick try-on via VisionCamera, blog & video content, real-time FCM notifications, and complete cart + order management.",
    longDescription:
      "Barva Skin Therapie is an Ayurveda-based beauty brand app built over April–November 2025 using React Native 0.81.1 + TypeScript. The app combines a complete Shopify-powered storefront with rich brand content — blog articles, video tutorials, and a social feed — creating an immersive brand experience.\n\nThe e-commerce layer covers full Shopify API integration: paginated product & collection fetching, variant selection with image filtering, inventory/sold-out tracking, cart (create/add/update/remove/checkout), order history, and customer auth. Product descriptions and blog articles render custom HTML with iframe video support.\n\nThe AR Try-On feature uses VisionCamera for real-time lipstick trials. FCM handles push notifications with deep linking, badge tracking via Redux, swipe-to-delete, and foreground handling via Notifee. Network resilience is managed with @react-native-community/netinfo providing offline fallback UI and retry logic.\n\nPerformance: react-native-fast-image caching, FlatList optimisation, React.memo/useMemo/useCallback memoisation, debounced search, native-driver animations, and skeleton loaders throughout.",
    stack: [
      "React Native",
      "TypeScript",
      "Redux Toolkit",
      "Shopify API",
      "Firebase",
      "VisionCamera",
      "React Native Video",
      "Notifee",
    ],
    highlights: [
      "Full Shopify storefront — products, variants, collections, cart & order management",
      "AR lipstick try-on with VisionCamera — real-time virtual makeup",
      "Blog & video content with custom HTML renderers for iframes, images & links",
      "FCM push notifications with deep linking, badge system & Notifee foreground handling",
      "Offline resilience via netinfo — fallback UI & automatic retry on reconnect",
      "Sold-out detection, variant image filtering & YouTube video on product detail",
      "Firebase Crashlytics, UTM tracking & multi-environment API switching",
      "Responsive UI — phones & tablets with light/dark/colorful theme variants",
    ],
    features: [
      {
        icon: "🛒",
        title: "Shopify E-commerce",
        items: [
          "Paginated product & collection fetching with inventory/sold-out tracking",
          "Variant selection with image filtering — price & image update on variant change",
          "Cart: create, add, update quantity, remove items & generate checkout URL",
          "Customer auth: signup, login, profile fetch/update & order history",
          "Custom HTML renderers for product descriptions and blog articles with iframe support",
        ],
      },
      {
        icon: "🎨",
        title: "AR & Media",
        items: [
          "VisionCamera-powered AR lipstick try-on with real-time camera feed",
          "Custom video player (react-native-video-controls) with Buy Now integration",
          "Image carousel with zoom on product detail, variant-specific image groups",
          "YouTube video integration within product detail screen",
          "react-native-fast-image for efficient caching across all image surfaces",
        ],
      },
      {
        icon: "🔔",
        title: "Notifications",
        items: [
          "Firebase Cloud Messaging for both iOS & Android with token management",
          "Deep linking: navigate to specific content from background/quit state taps",
          "Notification screen: filter by type, mark read/unread, swipe-to-delete, pagination",
          "Notifee for foreground notification presentation with custom UI",
          "Redux badge tracking with real-time header badge updates",
        ],
      },
      {
        icon: "🏗️",
        title: "Architecture & State",
        items: [
          "Redux store: auth, posts, cart, profile, misc & notification slices",
          "Multi-stack navigation: Auth Stack, Main Tab Navigator, feature stacks & modals",
          "Centralized theme system with light/dark/colorful variants, responsive scaling",
          "Multi-environment API host switching (dev/production)",
          "TypeScript throughout with strict type definitions across all modules",
        ],
      },
      {
        icon: "⚡",
        title: "Performance & Resilience",
        items: [
          "React.memo, useMemo & useCallback to eliminate unnecessary re-renders",
          "FlatList with window sizing, key extraction & infinite scroll pagination",
          "Debounced product search with real-time filtering & loading indicators",
          "netinfo connectivity monitoring — offline fallback UI & retry mechanisms",
          "Native-driver animations, skeleton loaders & optimistic UI updates for likes",
        ],
      },
    ],
    color: "#ff6b35",
    accent: "orange",
    category: "E-commerce / AR",
    screens: 40,
    users: "5K+",
    rating: "4.6",
    appStoreUrl: "",
    playStoreUrl: "",
    liveUrl: "https://barvaskintherapie.com/",
    videoUrl: "",
    screenshots: [
      {
        url: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/fb/26/0b/fb260bd2-b526-b7f8-cfcf-aa97c792a6e3/Page_44.jpg/400x800bb.png",
        label: "Product Listing",
      },
      {
        url: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/ec/d7/ff/ecd7ff7b-19a2-0526-53da-4e32495bd126/Page_47.jpg/400x800bb.png",
        label: "AR Try-On",
      },
      {
        url: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/8e/42/f6/8e42f642-e21b-fa3b-8a9b-319815ab561a/Page_48.jpg/400x800bb.png",
        label: "Cart",
      },
      {
        url: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/ee/c4/20/eec420d0-e5fa-9af1-088a-fe1dd0dd41dc/Page_46.jpg/400x800bb.png",
        label: "Order Detail",
      },
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
