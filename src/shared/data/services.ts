export interface Service {
  icon: string;
  title: string;
  description: string;
  outcomes: string[];
}

const services: Service[] = [
  {
    icon: "mobile",
    title: "React Native App Development",
    description:
      "End-to-end mobile builds — architecture, screens, state, native integrations, and store releases on iOS + Android.",
    outcomes: [
      "Cross-platform feature parity",
      "Typed Redux Toolkit + persistence",
      "App Store + Play Store submissions",
    ],
  },
  {
    icon: "migration",
    title: "RN Upgrades & Architecture Cleanup",
    description:
      "Major-version React Native upgrades (0.71 → 0.82+), New Architecture migrations, and legacy codebase modernisation without halting feature work.",
    outcomes: [
      "Zero-regression upgrades",
      "JS → TypeScript with strict mode",
      "Java → Kotlin / Obj-C → Swift native modernisation",
    ],
  },
  {
    icon: "chat",
    title: "Realtime, Push & Firebase",
    description:
      "WebSocket chat with reconnection, FCM + Notifee push, Crashlytics, Remote Config force/soft updates, and Analytics funnels.",
    outcomes: [
      "Reliable WebSocket lifecycle",
      "Foreground + background push handling",
      "Force-update / soft-update modals",
    ],
  },
  {
    icon: "performance",
    title: "Performance Debugging",
    description:
      "Profile-driven fixes for jank, slow FlatLists, memory leaks, and re-render storms — Reanimated worklets, memoization, FastImage, and selector tuning.",
    outcomes: [
      "Consistent 60fps interactions",
      "40% fewer re-renders on hot paths",
      "Faster cold start + warm boot",
    ],
  },
  {
    icon: "build",
    title: "App Store / Play Store Release Support",
    description:
      "Reproducible Gradle + CocoaPods build scripts, signing, ATT, PrivacyInfo, ProGuard, GitHub Actions CI/CD, and beta/production env switching.",
    outcomes: [
      "One-command release & bundle scripts",
      "Compliant store submissions",
      "Beta + production parity",
    ],
  },
  {
    icon: "instructor",
    title: "Team Mentorship & Code Review",
    description:
      "Pair on Redux patterns, TypeScript, performance, and review culture — trained 100+ developers and sped up sprint delivery on the teams I led.",
    outcomes: [
      "Faster code-review turnaround",
      "Stronger TypeScript discipline",
      "Junior → mid-level skill jump",
    ],
  },
];

export default services;
