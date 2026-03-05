export const personalInfo = {
  name: "Neelesh Yadav",
  title: "React Native & React Developer",
  subtitle: "Mobile & Web Application Developer",
  email: "neeleshy263@gmail.com",
  phone: "+91 91661 17663",
  github: "https://github.com/Neelesh-FS-Dev",
  portfolio: "https://neeleshyadav.vercel.app/",
  location: "Pune, Maharashtra",
  experience: "2.5+",
  apps: "10+",
  users: "20K+",
  rating: "4.5+",
  webProjects: "5+",
  summary:
    "React Native & React Developer with 2.5+ years building high-performance mobile and web applications. Skilled in crafting pixel-perfect UIs, real-time systems, and scalable architectures — from App Store & Play Store mobile apps to fast, SEO-optimized web platforms.",
};

// ─── SKILL CATEGORIES ──────────────────────────────────────────
export const skills = [
  {
    domain: "mobile",
    category: "Mobile (React Native)",
    icon: "📱",
    items: [
      "React Native",
      "JavaScript ES6+",
      "TypeScript",
      "iOS (Xcode)",
      "Android Studio",
      "Expo",
    ],
  },
  {
    domain: "web",
    category: "Web (React)",
    icon: "🌐",
    items: ["React.js", "Next.js", "Vite", "Tailwind CSS", "HTML5", "CSS3"],
  },
  {
    domain: "mobile",
    category: "State Management",
    icon: "🗃️",
    items: ["Redux Toolkit", "Context API", "Zustand", "MMKV", "AsyncStorage"],
  },
  {
    domain: "web",
    category: "Web Styling & UI",
    icon: "🎨",
    items: [
      "Tailwind CSS",
      "Styled Components",
      "Framer Motion",
      "Radix UI",
      "Shadcn/UI",
    ],
  },
  {
    domain: "both",
    category: "Backend & APIs",
    icon: "⚡",
    items: [
      "RESTful APIs",
      "WebSocket",
      "Firebase",
      "GraphQL",
      "Node.js",
      "Express.js",
    ],
  },
  {
    domain: "both",
    category: "DevOps & Tools",
    icon: "🛠️",
    items: [
      "GitHub Actions",
      "CI/CD",
      "AWS",
      "Vercel",
      "App Store",
      "Play Store",
    ],
  },
];

// ─── TECH STACK PROFICIENCY ────────────────────────────────────
export const techStack = [
  // Mobile
  { name: "React Native", level: 98, color: "#00e5ff", domain: "mobile" },
  { name: "TypeScript", level: 85, color: "#7c4dff", domain: "both" },
  { name: "Redux Toolkit", level: 92, color: "#7c4dff", domain: "both" },
  { name: "Firebase", level: 88, color: "#ff6b35", domain: "both" },
  // Web
  { name: "React.js", level: 82, color: "#00e5ff", domain: "web" },
  { name: "Next.js", level: 78, color: "#00ff88", domain: "web" },
  { name: "Tailwind CSS", level: 88, color: "#00ff88", domain: "web" },
  { name: "JavaScript ES6+", level: 95, color: "#00e5ff", domain: "both" },
];

// ─── PROJECTS ──────────────────────────────────────────────────
export const projects = [
  // ── MOBILE PROJECTS ──
  {
    id: "soul33",
    type: "mobile",
    title: "Soul33",
    subtitle: "Wellness & Meditation App",
    description:
      "A comprehensive wellness application serving 15,000+ users with dynamic content delivery and a 4.7 star rating. Built real-time group chat, voicemail, and a centralized audio playback system.",
    longDescription: `Soul33 is a full-featured wellness and meditation platform built from the ground up for 15,000+ active users. The app features dynamic content delivery, a real-time group chat and voicemail system, and a powerful centralized audio playback engine built with react-native-track-player.

The project involved enabling the New React Native Architecture, which improved build stability and runtime performance by 40%. I also refactored core features including the downloads manager and navigation stacks, and delivered a responsive tablet UI across 50+ screens.`,
    stack: ["React Native", "Redux", "WebSocket", "AWS S3", "Firebase"],
    highlights: [
      "15,000+ active users with 4.7 ⭐ rating",
      "Real-time group chat supporting 200+ concurrent sessions",
      "40% runtime performance improvement via New Architecture",
      "Offline progress tracking & background downloads",
      "Advanced audio playback with react-native-track-player",
    ],
    color: "#00e5ff",
    accent: "cyan",
    category: "Wellness",
    screens: 50,
    users: "15K+",
    rating: "4.7",
    videoUrl: "",
    screenshots: [
      { id: "soul33-1", label: "Home Screen" },
      { id: "soul33-2", label: "Meditation Player" },
      { id: "soul33-3", label: "Group Chat" },
      { id: "soul33-4", label: "Downloads" },
    ],
  },
  {
    id: "yoke",
    type: "mobile",
    title: "Yoke App",
    subtitle: "Social Wellness Platform",
    description:
      "Instagram-like Reels feature with advanced video optimization, live streaming via ZegoCloud SDK, and smooth performance across 100+ screens using memoized rendering.",
    longDescription: `Yoke App is a social wellness platform with an Instagram-inspired Reels experience. I developed advanced video optimization including preloading, caching, and seamless playback using react-native-video-cache.

The app features live streaming with the ZegoCloud SDK, enabling real-time audience interaction and recording. I designed a responsive UI with dynamic tab bars, nested stacks, and memoized rendering to ensure smooth performance across 100+ screens, reducing re-renders by 40%.`,
    stack: [
      "React Native",
      "Redux",
      "ZegoCloud",
      "Video Streaming",
      "Firebase",
    ],
    highlights: [
      "Instagram-like Reels with video preloading & caching",
      "Live streaming with ZegoCloud SDK",
      "40% reduction in re-renders via memoization",
      "100+ screens with smooth nested navigation",
      "Creator profiles with optimized media galleries",
    ],
    color: "#7c4dff",
    accent: "purple",
    category: "Social",
    screens: 100,
    users: "10K+",
    rating: "4.5",
    videoUrl: "",
    screenshots: [
      { id: "yoke-1", label: "Reels Feed" },
      { id: "yoke-2", label: "Live Stream" },
      { id: "yoke-3", label: "Creator Profile" },
      { id: "yoke-4", label: "Explore" },
    ],
  },
  {
    id: "costack-barva",
    type: "mobile",
    title: "Co-stack Barva",
    subtitle: "E-commerce & AR Beauty Platform",
    description:
      "Full-scale e-commerce platform with Shopify API integration and an AR-powered lipstick try-on feature using Three.js and MediaPipe Face Landmarker for real-time virtual makeup.",
    longDescription: `Co-stack Barva is a cutting-edge AR beauty e-commerce platform built with Shopify API integration. It supports 100+ beauty products with full cart, authentication, and order management.

The standout feature is an AR-powered lipstick try-on built with Three.js and MediaPipe Face Landmarker, enabling real-time virtual makeup experiences. I also built a notification system with Firebase Cloud Messaging reaching 5K+ users, and implemented scalable state management with Redux and AsyncStorage persistence.`,
    stack: [
      "React Native",
      "Redux",
      "Shopify",
      "Firebase",
      "Three.js",
      "MediaPipe",
    ],
    highlights: [
      "AR lipstick try-on with Three.js & MediaPipe",
      "Full Shopify e-commerce integration",
      "Firebase push notifications for 5K+ users",
      "100+ beauty products with cart & orders",
      "Real-time virtual makeup experience",
    ],
    color: "#ff6b35",
    accent: "orange",
    category: "E-commerce / AR",
    screens: 40,
    users: "5K+",
    rating: "4.6",
    videoUrl: "",
    screenshots: [
      { id: "barva-1", label: "Product Listing" },
      { id: "barva-2", label: "AR Try-On" },
      { id: "barva-3", label: "Cart" },
      { id: "barva-4", label: "Order Detail" },
    ],
  },
  {
    id: "culture-max",
    type: "mobile",
    title: "Culture Max",
    subtitle: "Interactive Card Game Platform",
    description:
      "Upgraded RN from 0.72 to 0.81, migrated Android to Kotlin and iOS to Swift, with a monetization system of sponsor cards, banner ads, and reward vouchers boosting engagement by 35%.",
    longDescription: `Culture Max is an interactive card game platform that required a major React Native upgrade from 0.72.4 to 0.81.1. This involved migrating the entire Android codebase from Java to Kotlin and the iOS AppDelegate to Swift.

I implemented a complete monetization system with sponsor cards, banner ads, and reward vouchers, increasing user engagement by 35%. The platform supports 1,000+ daily active users with advanced card caching, dynamic content delivery, and real-time analytics for sponsor clicks and view counts.`,
    stack: ["React Native", "Redux", "Firebase", "Kotlin", "Swift"],
    highlights: [
      "RN upgraded from 0.72.4 → 0.81.1",
      "Android Java → Kotlin migration",
      "iOS AppDelegate → Swift migration",
      "35% engagement increase via monetization",
      "1,000+ daily active users",
    ],
    color: "#00ff88",
    accent: "green",
    category: "Entertainment",
    screens: 30,
    users: "1K+ DAU",
    rating: "4.4",
    videoUrl: "",
    screenshots: [
      { id: "culture-1", label: "Card Game" },
      { id: "culture-2", label: "Rewards" },
      { id: "culture-3", label: "Leaderboard" },
      { id: "culture-4", label: "Sponsor Cards" },
    ],
  },

  // ── WEB PROJECTS ──
  {
    id: "digital-card-platform",
    type: "web",
    title: "Digital Card Platform",
    subtitle: "Business Card Web App",
    description:
      "A digital business card platform built with Next.js and Tailwind CSS. Achieved 95+ Google PageSpeed score, reduced CSS bundle by 500KB, and supports 10,000+ concurrent users.",
    longDescription: `Built during my tenure at The Special Character Pvt. Ltd., this digital card platform enables businesses to create, share, and manage digital business cards.

The platform was built with Next.js for SSR/SSG, Tailwind CSS for a minimal bundle, and a JWT authentication system handling thousands of daily sessions. Payment gateway integration processes $10K+ in monthly transactions with a 99.7% success rate.`,
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
      "500KB CSS bundle reduction with Tailwind",
      "10,000+ concurrent users supported",
      "JWT auth with thousands of daily sessions",
      "$10K+ monthly transactions at 99.7% success rate",
      "API response time reduced from 800ms → 400ms",
    ],
    color: "#7c4dff",
    accent: "purple",
    category: "Web App",
    screens: 15,
    users: "10K+",
    rating: "4.8",
    videoUrl: "",
    screenshots: [],
  },
  {
    id: "web-dashboard",
    type: "web",
    title: "React Dashboard",
    subtitle: "Analytics & Management UI",
    description:
      "Responsive React + Vite admin dashboard with real-time analytics, data visualization, role-based access control, and a component library built on Tailwind CSS.",
    longDescription: `A full-featured admin dashboard built with React and Vite for maximum performance. The dashboard includes real-time analytics charts, data tables with sorting and filtering, and a role-based permission system.

The UI is built with a custom Tailwind CSS component library ensuring visual consistency. Dark/light mode support, mobile-responsive layouts, and keyboard-accessible components were built from the ground up.`,
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
      "Real-time data visualization with Recharts",
      "Role-based access control (RBAC)",
      "Custom Tailwind component library",
      "Full keyboard accessibility & WCAG compliance",
      "Dark/light mode with system preference detection",
    ],
    color: "#00e5ff",
    accent: "cyan",
    category: "Web App",
    screens: 20,
    users: "Internal",
    rating: "4.7",
    videoUrl: "",
    screenshots: [],
  },
];

// ─── EXPERIENCE ────────────────────────────────────────────────
export const experience = [
  {
    role: "React Native & React Developer",
    company: "EC Info Solutions Pvt. Ltd.",
    location: "Pune, Maharashtra",
    period: "Sep 2023 – Present",
    duration: "1.5+ years",
    type: "current",
    highlights: [
      "Developed 10+ cross-platform mobile apps (React Native) serving 20,000+ active users",
      "Built web dashboards and admin panels using React.js, Vite, and Tailwind CSS",
      "Implemented Redux Toolkit reducing re-renders, improving load time by 1.5s",
      "Established CI/CD pipelines cutting manual deployment time by 60%",
      "Mentored 5+ junior developers on React Native & React best practices",
      "Integrated RESTful APIs & WebSocket connections with 99.8% uptime",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "The Special Character Pvt. Ltd.",
    location: "Ahmedabad, Gujarat",
    period: "Jan 2023 – Aug 2023",
    duration: "8 months",
    type: "past",
    highlights: [
      "Built React.js & Next.js web apps achieving 95+ Google PageSpeed scores",
      "Developed digital card business platform with Tailwind CSS — 500KB bundle reduction",
      "Implemented JWT authentication handling thousands of daily user sessions",
      "Integrated payment gateways processing $10K+ monthly at 99.7% success rate",
      "Reduced API response time from 800ms to 400ms via query optimization",
      "Developed automated testing suites significantly reducing production bugs",
    ],
  },
];

// ─── BLOGS (lightweight — full content in blogContent.js) ──────
export const blogs = [
  {
    id: 1,
    title: "Boosting React Native Performance: New Architecture Deep Dive",
    excerpt:
      "How enabling the New React Native Architecture improved Soul33's runtime performance by 40%. A deep look into Fabric, JSI, and TurboModules.",
    date: "Feb 2024",
    readTime: "8 min read",
    tags: ["React Native", "Performance", "Architecture"],
    color: "#00e5ff",
    domain: "mobile",
  },
  {
    id: 2,
    title: "Building Real-Time Chat with WebSocket in React Native",
    excerpt:
      "Lessons learned building a WebSocket-based group chat supporting 200+ concurrent sessions — from connection management to offline handling.",
    date: "Jan 2024",
    readTime: "6 min read",
    tags: ["WebSocket", "Real-time", "React Native"],
    color: "#7c4dff",
    domain: "mobile",
  },
  {
    id: 3,
    title: "AR Try-On: Three.js + MediaPipe in React Native",
    excerpt:
      "How I implemented a real-time AR lipstick try-on feature using Three.js and MediaPipe Face Landmarker inside a React Native WebView.",
    date: "Dec 2023",
    readTime: "10 min read",
    tags: ["AR", "Three.js", "MediaPipe"],
    color: "#ff6b35",
    domain: "mobile",
  },
  {
    id: 4,
    title: "Optimizing FlatList: Reducing Re-renders by 40%",
    excerpt:
      "A practical guide to memoization, getItemLayout, and windowing techniques that eliminated 40% of unnecessary re-renders in a 100+ screen app.",
    date: "Nov 2023",
    readTime: "5 min read",
    tags: ["Performance", "React Native", "FlatList"],
    color: "#00ff88",
    domain: "mobile",
  },
  {
    id: 5,
    title: "Next.js vs Vite + React: When to Choose What",
    excerpt:
      "A practical comparison of Next.js and Vite for React web apps — SSR, SSG, bundle size, and DX. When each shines based on real project experience.",
    date: "Oct 2023",
    readTime: "7 min read",
    tags: ["Next.js", "Vite", "React", "Web"],
    color: "#7c4dff",
    domain: "web",
  },
  {
    id: 6,
    title: "Tailwind CSS at Scale: Component Patterns That Work",
    excerpt:
      "How I structure Tailwind CSS in large React projects — from component variants to design tokens — without the codebase turning into a mess.",
    date: "Sep 2023",
    readTime: "6 min read",
    tags: ["Tailwind CSS", "React", "CSS Architecture"],
    color: "#00ff88",
    domain: "web",
  },
];
