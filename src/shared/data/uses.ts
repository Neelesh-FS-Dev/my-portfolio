import {
  FiCode,
  FiTerminal,
  FiSmartphone,
  FiMonitor,
  FiPenTool,
  FiCloud,
  FiPackage,
  FiGitBranch,
} from "react-icons/fi";
import type { IconType } from "react-icons";

export interface UsesItem {
  name: string;
  note: string;
  url?: string;
}

export interface UsesSection {
  id: string;
  title: string;
  icon: IconType;
  items: UsesItem[];
}

const uses: UsesSection[] = [
  {
    id: "editor",
    title: "Editor & Dev Loop",
    icon: FiCode,
    items: [
      {
        name: "VS Code",
        note: "Daily driver. Prettier on save, ESLint flat config, GitLens, Error Lens, Pretty TypeScript Errors.",
        url: "https://code.visualstudio.com/",
      },
      {
        name: "Xcode",
        note: "iOS builds, simulator, profiling with Instruments (Time Profiler, Allocations).",
      },
      {
        name: "Android Studio",
        note: "Logcat, layout inspector, native module debugging when JSI gets ugly.",
      },
      {
        name: "Theme",
        note: "Custom dark + JetBrains Mono. High-contrast palette, no italics in code.",
      },
    ],
  },
  {
    id: "languages",
    title: "Languages & Frameworks",
    icon: FiPackage,
    items: [
      {
        name: "TypeScript",
        note: "Strict mode, no implicit any. Discriminated unions over enums.",
        url: "https://www.typescriptlang.org/",
      },
      {
        name: "React + React Native",
        note: "Functional components only. Hooks, suspense, lazy routes. React Native New Architecture (JSI + Fabric).",
      },
      {
        name: "Redux Toolkit + RTK Query",
        note: "Default state layer for app-scale code. Local state stays local.",
      },
      {
        name: "Vite",
        note: "Build tool for this site and most personal web work. Fast HMR, opinionated defaults.",
      },
    ],
  },
  {
    id: "mobile",
    title: "Mobile Stack",
    icon: FiSmartphone,
    items: [
      {
        name: "React Native Reanimated 3",
        note: "Worklets on the UI thread for gesture-driven animation.",
      },
      {
        name: "React Navigation",
        note: "Native-stack on iOS for the swipe-back gesture. Bottom-tabs with custom shared-element transitions.",
      },
      {
        name: "MMKV",
        note: "Synchronous, mmap'd storage. Replaces AsyncStorage in every project I start now.",
      },
      {
        name: "Fastlane + EAS",
        note: "Codesigning, beta lanes, App Store + Play Store automation.",
      },
    ],
  },
  {
    id: "web",
    title: "Web & UI",
    icon: FiMonitor,
    items: [
      {
        name: "Framer Motion",
        note: "Page transitions, scroll-linked motion, layout animations. AnimatePresence for route exits.",
      },
      {
        name: "Lenis",
        note: "Smooth scroll on this site. Wraps the entire app via SmoothScroll provider.",
      },
      {
        name: "GSAP + Three.js",
        note: "Reach for these when motion needs to leave React's render budget — hero shaders, scroll-driven 3D.",
      },
      {
        name: "Tailwind / CSS variables",
        note: "Token-driven CSS variables on this site. Tailwind for client work where speed matters.",
      },
    ],
  },
  {
    id: "design",
    title: "Design & Motion",
    icon: FiPenTool,
    items: [
      {
        name: "Figma",
        note: "Design hand-off, component variants, auto-layout. Inspect mode for spec extraction.",
      },
      {
        name: "Rive",
        note: "Vector animation when Lottie isn't expressive enough. State machines for interactive UI motion.",
      },
      {
        name: "Lottie",
        note: "Loading states, micro-interactions. Bodymovin exports from After Effects.",
      },
    ],
  },
  {
    id: "infra",
    title: "Infra & Tooling",
    icon: FiCloud,
    items: [
      {
        name: "Vercel",
        note: "Hosting for this site and most web projects. Preview deploys per PR.",
      },
      {
        name: "Firebase",
        note: "Auth, FCM, Crashlytics, Remote Config. Pragmatic default for mobile back-of-the-envelope work.",
      },
      {
        name: "Sentry",
        note: "Errors + release tracking on production apps. Sourcemaps uploaded from CI.",
      },
      {
        name: "GitHub Actions",
        note: "CI for lint, typecheck, build verification. Fastlane lanes triggered on tag push.",
      },
    ],
  },
  {
    id: "cli",
    title: "Terminal & CLI",
    icon: FiTerminal,
    items: [
      {
        name: "Warp",
        note: "Block-based terminal. AI completions when grep gets recursive.",
        url: "https://www.warp.dev/",
      },
      {
        name: "zsh + oh-my-zsh",
        note: "Agnoster theme, fzf, z for directory jump.",
      },
      {
        name: "gh CLI",
        note: "PRs, issues, releases without leaving the terminal.",
      },
      {
        name: "ripgrep / fd",
        note: "Replace grep and find. Faster, sane defaults.",
      },
    ],
  },
  {
    id: "git",
    title: "Git & Collaboration",
    icon: FiGitBranch,
    items: [
      {
        name: "Conventional commits",
        note: "feat / fix / chore / docs prefixes. Reads cleanly in changelogs.",
      },
      {
        name: "Linear branch names",
        note: "Squash-merge to main, rebase locally. No long-running feature branches.",
      },
      {
        name: "Claude Code",
        note: "Pair-programming for refactors, planning, and reviews on this very repo.",
      },
    ],
  },
];

export default uses;
