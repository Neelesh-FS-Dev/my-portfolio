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
      "Comprehensive yoga social platform with TikTok-style Reels, Zego Cloud live streaming, gamification, creator verification, real-time chat, and practice insights — migrated from RN 0.72 → 0.79.",
    longDescription:
      "Yoke Yoga is a full-featured wellness social platform built for yoga practitioners over May–December 2025. The app serves as a complete ecosystem for learning, practising, sharing, and connecting with verified yoga instructors.\n\nI led a major React Native migration from 0.72 to 0.79 with full TypeScript coverage, Redux Persist for state persistence, and a multi-stack navigation system (Auth Stack, Main Tab Navigator with Home/Explore/Reels/Live/Profile, drawer & modal stacks).\n\nThe video layer includes a TikTok-style infinite-scroll Reels feed with thumbnail generation via react-native-create-thumbnail, play/pause on focus/blur, buffering states, and FastImage priority loading. Live streaming uses the Zego Cloud SDK with real-time chat, KeepAwake, and stream quality management.\n\nSocial features cover follow/unfollow, comment threading with replies, like system with optimistic updates, one-on-one chat with typing indicators, and deep-link notifications via FCM + Notifee. A gamification system tracks user level progression, energy/battery mechanics, achievement popups, and a visual GamePath. Practice Insights provides data visualisation with date-range filtering.",
    stack: [
      "React Native",
      "TypeScript",
      "Redux Toolkit",
      "Zego Cloud",
      "Firebase",
      "WebSocket",
      "FastImage",
      "React Native Video",
    ],
    highlights: [
      "TikTok-style Reels — infinite scroll, thumbnail generation, network-aware playback",
      "Zego Cloud live streaming with real-time audience chat & viewer management",
      "React Native 0.72 → 0.79 full codebase migration",
      "Gamification: level progression, energy/battery system & achievement popups",
      "Creator ecosystem: verified badges, certificate management & verification flow",
      "Firebase Remote Config for feature flags, update modals & content rules",
      "Practice Insights with data visualisation & custom date-range picker",
      "Full social suite: follow, comments with threading, chat, deep-link notifications",
    ],
    features: [
      {
        icon: "🎬",
        title: "Video & Live Streaming",
        items: [
          "TikTok-style Reels feed with infinite scroll and optimised FlatList virtualisation",
          "Thumbnail generation via react-native-create-thumbnail with buffering indicators",
          "Pause on navigate / resume on return — play state tied to screen focus",
          "Zego Cloud SDK for live streaming: stream create/end, viewer management, real-time chat",
          "KeepAwake during streams, stream quality management & audience interaction metrics",
        ],
      },
      {
        icon: "🏗️",
        title: "Architecture & Migration",
        items: [
          "React Native 0.72 → 0.79 full codebase migration with new architecture support",
          "Redux store: auth, profile, home, misc, updates slices with Redux Persist",
          "Multi-stack navigation: Auth Stack, Tab Navigator, drawer, modal stacks",
          "Custom SafeAreaContainer replacing SafeAreaView for consistent cross-device layout",
          "Global font scaling override on Text & TextInput for design consistency",
        ],
      },
      {
        icon: "🤝",
        title: "Social Features",
        items: [
          "Follow/unfollow with optimistic UI updates and real-time sync",
          "CommentModal with reply threading, user interactions & verified badges",
          "One-on-one chat with typing indicators, read receipts & message history",
          "ChatList with real-time updates via WebSocket connection management",
          "Collaborator blocking, share functionality with deep linking",
        ],
      },
      {
        icon: "🎮",
        title: "Gamification & Insights",
        items: [
          "Level progression system with LevelPopup achievement celebrations",
          "Energy/battery mechanics with BatteryFullModal for level-up rewards",
          "GamePath — visual learning progression journey",
          "Practice Insights: data visualisation, date-range filtering & trend analytics",
          "Creator verification flow with CertificateList management & external link integration",
        ],
      },
      {
        icon: "⚡",
        title: "Performance & Config",
        items: [
          "React.memo, useMemo & useCallback across Reels, replies & list components",
          "FastImage with priority levels for critical content loading",
          "Firebase Remote Config: feature flags, update prompts & content moderation rules",
          "FCM + Notifee: push notifications, badge management & foreground handling",
          "Multi-environment (beta/production) API switching, ProGuard rules & CI/CD via GitHub Actions",
        ],
      },
    ],
    color: "#7c4dff",
    accent: "purple",
    category: "Social",
    screens: 100,
    users: "10K+",
    rating: "4.5",
    appStoreUrl: "",
    playStoreUrl: "",
    liveUrl: "",
    videoUrl: "",
    screenshots: [
      {
        url: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/2b/2b/8d/2b2b8d0d-126d-ad32-3faf-1375aa0adddf/IOS_U20281242__U00d7_2688-9.jpg/157x340bb.webp",
        label: "Onboarding",
      },
      {
        url: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/2a/35/82/2a358278-a69b-104f-dcef-62ad06a5fa33/IOS_U20281242__U00d7_2688-8.jpg/157x340bb.webp",
        label: "Home Feed",
      },
      {
        url: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/a8/8d/51/a88d51e5-1c90-e334-ed3a-fcdadfb47417/IOS_U20281242__U00d7_2688-3.jpg/157x340bb.webp",
        label: "Reels Feed",
      },
      {
        url: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/d4/06/50/d406509e-5490-20bd-b1b3-aabc07bd52b6/IOS_U20281242__U00d7_2688.jpg/157x340bb.webp",
        label: "Live Stream",
      },
      {
        url: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/67/74/6b/67746ba6-e83b-7fff-295d-194c523c36bb/IOS_U20281242__U00d7_2688-1.jpg/157x340bb.webp",
        label: "Creator Profile",
      },
      {
        url: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/80/7d/7e/807d7eb1-4f3f-deea-ffde-751a650ec432/IOS_U20281242__U00d7_2688-4.jpg/157x340bb.webp",
        label: "Explore",
      },
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
      "Shopify-powered mobile app for authentic instant Indian cuisine — featuring 50+ products, Buy 4 Get 2 Free bundle configurator, home & B2B catering flows, and real-time order tracking.",
    longDescription:
      "Netra's Organic is a food e-commerce brand offering authentic instant Indian dishes — Pulao, Rice Upma, Prasad Sheera, Dal Fry, Red Curry, and more. The mobile app connects to their Shopify store bringing the full product catalogue, bundle deals, and catering services to mobile.\n\nI built the complete React Native app with Redux state management, full Shopify Storefront API integration covering product listing, collections, cart operations, and customer authentication. The standout feature is a dynamic bundle configurator implementing the Buy 4 Get 2 Free deal with real-time pricing updates and quantity management.\n\nThe app includes home catering and B2B catering enquiry flows, a recipe blog section pulling from Shopify blogs, and real-time order tracking. UI uses react-native-fast-image for optimised product imagery and a smooth banner carousel for featured offers and seasonal promotions.",
    stack: [
      "React Native",
      "TypeScript",
      "Redux Toolkit",
      "Shopify API",
      "Firebase",
      "react-native-fast-image",
    ],
    highlights: [
      "Full Shopify storefront — products, collections, cart & customer auth",
      "Buy 4 Get 2 Free bundle configurator with dynamic pricing",
      "Home catering & B2B catering enquiry flows",
      "Recipe blog integration pulled from Shopify blogs",
      "Real-time order tracking & order history",
      "FCM push notifications for order updates",
      "react-native-fast-image for optimised product imagery",
      "Banner carousel for featured offers & seasonal promotions",
    ],
    features: [
      {
        icon: "🛒",
        title: "Shopify E-commerce",
        items: [
          "Full Shopify Storefront API — products, collections, variants & inventory tracking",
          "Cart: create, add, update quantity, remove items & generate checkout URL",
          "Customer auth: signup, login, profile management & order history",
          "Sold-out detection with visual indicators across product listing",
          "Custom HTML renderers for product descriptions & blog articles",
        ],
      },
      {
        icon: "🎁",
        title: "Bundle Configurator",
        items: [
          "Buy 4 Get 2 Free dynamic bundle selector with real-time pricing updates",
          "Quantity management with automatic free item calculation",
          "Bundle validation and cart integration with Shopify line items",
          "Visual bundle builder UI with product selection and confirmation",
        ],
      },
      {
        icon: "🍱",
        title: "Catering & Content",
        items: [
          "Home catering enquiry flow with meal selection and scheduling",
          "B2B catering flow for corporate and bulk orders",
          "Recipe blog integration from Shopify blog articles with HTML rendering",
          "Banner carousel for featured products, offers & seasonal promotions",
          "Product categories: breakfast, meals, curries, sweets & more",
        ],
      },
      {
        icon: "🔔",
        title: "Notifications & Tracking",
        items: [
          "FCM push notifications for order confirmations and status updates",
          "Real-time order tracking with status timeline",
          "Order history with individual order detail view",
          "Deep linking from notifications to order detail screen",
        ],
      },
      {
        icon: "⚡",
        title: "Performance & UX",
        items: [
          "react-native-fast-image with caching for all product and banner images",
          "FlatList optimisation with pagination and infinite scroll",
          "Skeleton loaders and empty states across all screens",
          "Debounced product search with real-time filtering",
          "Responsive layout for phones and tablets",
        ],
      },
    ],
    color: "#22c55e",
    accent: "green",
    category: "Food / E-commerce",
    screens: 25,
    users: "2K+",
    rating: "4.5",
    appStoreUrl: "",
    playStoreUrl: "",
    liveUrl: "https://netras.in/",
    videoUrl: "",
    screenshots: [
      {
        url: "https://play-lh.googleusercontent.com/Ef1pLlFJt5IY3IWG-WzWEADwdawiqGgbyTrnWXszzPqC7XuXSs5LXAAdXl1xzX6OYA4=w526-h296-rw",
        label: "Home / Offers",
      },
      {
        url: "https://play-lh.googleusercontent.com/eA2VgTvp3UvUr-e648R9ZDXh-Y-s1XdPj1ohbpIjcJ69l8e5b08T47XRQ8q07sfPWg=w526-h296-rw",
        label: "Product Listing",
      },
      {
        url: "https://play-lh.googleusercontent.com/t2tiTD_PPsA6VjoHmwa_1SGA8nzt8f8kwvmq8ve3iVui52d-R_36zUBRswqq2vZsDQ=w526-h296-rw",
        label: "Cart & Checkout",
      },
    ],
  },

  {
    id: "culture-max",
    type: "mobile",
    title: "Culture Max",
    subtitle: "Marathi Cultural Learning & Rewards App",
    description:
      "Cultural education app with idiom of the day, gamified rewards, sponsor integrations & redeem codes — migrated Android Java → Kotlin, iOS Obj-C → Swift, and enabled RN New Architecture.",
    longDescription:
      "CultureMax is a cultural education and gamification platform built over August 2024–October 2025, delivering daily Marathi idioms, sponsor content, and a redeemable rewards engine.\n\nI led major platform modernisations: Android codebase migrated from Java to Kotlin (MainActivity, MainApplication), iOS from Objective-C to Swift (AppDelegate with Firebase setup), and a React Native upgrade to 0.81.1 with New Architecture enabled. App.js was fully migrated to App.tsx with comprehensive TypeScript coverage.\n\nThe rewards system covers points tracking, a rewards catalogue, redeem code input with validation, and redemption history — all integrated with backend services. Sponsor cards use react-native-fast-image for optimised logo rendering. The PlayScreen dispatches viewedCard Redux actions with conditional font sizing per card type.\n\nBuild system was modernised: Gradle wrapper to 8.14.3, Kotlin plugin, SDK 36, edge-to-edge display, RTL support, iOS deployment target 15.1, Flipper removal, and PrivacyInfo.xcprivacy configuration. Firebase powers analytics, FCM token management, and crash reporting.",
    stack: [
      "React Native",
      "TypeScript",
      "Redux Toolkit",
      "Firebase",
      "FastImage",
      "Kotlin",
      "Swift",
      "React Native Pager View",
    ],
    highlights: [
      "Android Java → Kotlin & iOS Obj-C → Swift full platform migration",
      "React Native 0.72 → 0.81.1 upgrade with New Architecture enabled",
      "Idiom of the day with Fast Image visuals & navigation-optimised flow",
      "Rewards engine: points tracking, catalogue, redeem codes & history",
      "Sponsor card integration with Fast Image logo optimisation",
      "35% engagement boost post-migration and architecture upgrades",
      "Global font scaling control for consistent UI across accessibility settings",
      "Gradle 8.14.3, SDK 36, edge-to-edge & PrivacyInfo.xcprivacy compliance",
    ],
    features: [
      {
        icon: "🔄",
        title: "Platform Migrations",
        items: [
          "Android: MainActivity.java & MainApplication.java → Kotlin with null safety",
          "iOS: AppDelegate Obj-C → Swift with proper Firebase initialisation",
          "React Native 0.72 → 0.81.1 with New Architecture (RCTNewArchEnabled)",
          "App.js → App.tsx — full TypeScript migration with strict type coverage",
          "Removed Flipper, cleaned up legacy iOS files & obsolete Gradle properties",
        ],
      },
      {
        icon: "🎮",
        title: "Rewards & Gamification",
        items: [
          "Redeem code input with validation, success/failure feedback & backend sync",
          "Points tracking, rewards catalogue & full redemption history",
          "Sponsor card system with Fast Image-optimised logos",
          "PlayScreen: viewedCard Redux action dispatch & conditional font sizing per card type",
          "Homepage navigation to Redeem, Rewards & Offer Detail screens",
        ],
      },
      {
        icon: "📚",
        title: "Cultural Content",
        items: [
          "Idiom of the Day with Fast Image visuals & streamlined navigation flow",
          "OfferDetailScreen: offer terms, claim functionality & polished styling",
          "Sponsor integration with third-party reward partnerships",
          "Content categorisation with featured offers and daily idioms on homepage",
        ],
      },
      {
        icon: "🏗️",
        title: "Architecture & State",
        items: [
          "Redux store: auth, content (idioms/offers), rewards/redemption & profile slices",
          "Multi-stack navigation: Auth Stack, Main Tab Navigator, HomeStack & Rewards routes",
          "useMemo & useCallback across PlayScreen and list components",
          "FadeOut reusable animation component replacing inline animations",
          "Firebase token fetch with null-check before dispatch",
        ],
      },
      {
        icon: "⚙️",
        title: "Build & Compliance",
        items: [
          "Gradle wrapper 8.14.3, Kotlin plugin, compile/target SDK 36, edge-to-edge display",
          "RTL support enabled, React root project plugin, NDK modernisation",
          "iOS deployment target 15.1, arm64 architecture, autolinking support",
          "PrivacyInfo.xcprivacy with updated keys/reasons for App Store compliance",
          "Global font scaling disabled across all Text & TextInput for design consistency",
        ],
      },
    ],
    color: "#f59e0b",
    accent: "orange",
    category: "Education / Culture",
    screens: 30,
    users: "1K+",
    rating: "4.4",
    appStoreUrl: "",
    playStoreUrl: "",
    liveUrl: "",
    videoUrl: "",
    screenshots: [
      {
        url: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/94/bc/98/94bc98b5-bdb0-a704-d666-7932239bb1c6/1290__U00d7_2796px.jpg/157x340bb.webp",
        // label: "Card Game",
      },
      {
        url: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/e8/49/d2/e849d2da-e1ca-ec70-1e39-bf0c53bec21a/1290__U00d7_2796px-3.jpg/157x340bb.webp",
        // label: "Daily Challenge",
      },
      {
        url: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/4a/5e/11/4a5e1131-b8b4-0737-8a90-a469f5b8a0f7/1290__U00d7_2796px-4.jpg/157x340bb.webp",
        // `label: "Leaderboard",
      },
      {
        url: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/a3/ac/4c/a3ac4cd5-e78f-7bd0-aa77-a0b6af7d0ce2/1290__U00d7_2796px-1.jpg/157x340bb.webp",
        // label: "Rewards",
      },
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
