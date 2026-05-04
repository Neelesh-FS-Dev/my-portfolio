export interface CaseStudy {
  projectId: string;
  title: string;
  tagline: string;
  problem: string;
  built: string;
  hardParts: string[];
  result: string;
  metrics: { value: string; label: string }[];
  accent: string;
}

const caseStudies: CaseStudy[] = [
  {
    projectId: "soul33",
    title: "Soul33 — The Beacon",
    tagline: "Spirituality, meditation & a private real-time community",
    problem:
      "An iOS + Android subscription app on RN 0.71 with audio jank, fragile WebSocket chat, and a fragmented multi-stack navigation that slowed feature work and made upgrades risky.",
    built:
      "Re-architected the boot pipeline to lazy-instantiate every drawer stack, hoisted a single shared MeditationPlayer modal so all sub-stacks navigate to one player, and consolidated the WebSocket into one provider with heartbeat + exponential backoff. Built the audio engine on react-native-track-player with background playback, offline downloads, and listen-time analytics flushed across cold starts.",
    hardParts: [
      "Three React Native upgrades shipped to live subscribers — 0.71 → 0.81.4 → 0.82.1 with the New Architecture",
      "Firebase namespaced → modular SDK migration without breaking analytics or messaging",
      "Memory-bounded chat over @shopify/flash-list with 500-message cap, swipe-to-reply gestures, and S3 presigned audio uploads",
    ],
    result:
      "Live on App Store + Google Play across Free, Seeker, and Mastery tiers — stable WebSocket, smooth 60fps audio playback, and a production-grade upgrade path for future RN releases.",
    metrics: [
      { value: "3", label: "RN Upgrades Shipped" },
      { value: "60fps", label: "Audio Mini-Player" },
      { value: "11", label: "Feature Pillars Owned" },
    ],
    accent: "#3b82f6",
  },
  {
    projectId: "yoke",
    title: "Yoke Yoga",
    tagline: "Social wellness, live yoga & a learning platform",
    problem:
      "A wellness social platform on RN 0.72 with a TikTok-style Reels feed dropping frames, generic Zego Cloud integration, and over-broad redux-persist hydration causing slow cold starts and stale lists in memory.",
    built:
      "Migrated to RN 0.79 + React 19 with new-architecture readiness, integrated the full ZEGOCLOUD trifecta (Live UIKit + ZIM chat + Express Engine for low-latency A/V), tuned the redux-persist whitelist to only durable state, and rebuilt the Reels player with Reanimated v4 worklets, FastImage priority caching, and lifecycle-aware playback.",
    hardParts: [
      "60fps Reels on low-end Android — animations on the UI thread, FastImage caching, deferred non-critical work via InteractionManager",
      "12+ Redux Toolkit slices reorganised with a curated persist whitelist + versioned migrations",
      "Force-update / soft-update modal driven by Firebase Remote Config without halting the feed UX",
    ],
    result:
      "Live on App Store + Play Store with 10K+ users, ZEGOCLOUD-powered live yoga sessions, in-app purchases for memberships, and a Reels feed that holds frame on devices that previously stuttered.",
    metrics: [
      { value: "10K+", label: "Users" },
      { value: "0.72→0.79", label: "RN Migration" },
      { value: "12+", label: "Redux Slices" },
    ],
    accent: "#a855f7",
  },
];

export default caseStudies;
