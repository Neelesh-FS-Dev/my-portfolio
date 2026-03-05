// ═══════════════════════════════════════════════════════════════
//  skills.js  ← EDIT THIS FILE to update skills & proficiency
// ═══════════════════════════════════════════════════════════════

// Proficiency bars — level: 0-100 | domain: "mobile"|"web"|"both"
export const techStack = [
  { name: "React Native", level: 98, color: "#00e5ff", domain: "mobile" },
  { name: "JavaScript ES6+", level: 95, color: "#00e5ff", domain: "both" },
  { name: "TypeScript", level: 85, color: "#7c4dff", domain: "both" },
  { name: "Redux Toolkit", level: 92, color: "#7c4dff", domain: "both" },
  { name: "Firebase", level: 88, color: "#ff6b35", domain: "both" },
  { name: "React.js", level: 82, color: "#00e5ff", domain: "web" },
  { name: "Next.js", level: 78, color: "#00ff88", domain: "web" },
  { name: "Tailwind CSS", level: 88, color: "#00ff88", domain: "web" },
];

// Skill category cards — domain: "mobile"|"web"|"both"
export const skillCategories = [
  {
    domain: "mobile",
    category: "Mobile (React Native)",
    icon: "📱",
    items: [
      "React Native",
      "JavaScript ES6+",
      "TypeScript",
      "New Architecture",
      "Native Modules",
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
    domain: "both",
    category: "State Management",
    icon: "🗃️",
    items: ["Redux Toolkit", "Context API", "Zustand", "MMKV", "AsyncStorage"],
  },
  {
    domain: "mobile",
    category: "UI & Animation",
    icon: "✨",
    items: [
      "React Native Reanimated",
      "Lottie",
      "Gesture Handler",
      "Styled Components",
      "Pixel-perfect UI",
    ],
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
      "REST APIs",
      "GraphQL",
      "WebSocket",
      "Firebase Auth",
      "Firestore",
      "Cloud Functions",
      "Node.js",
      "Strapi",
    ],
  },
  {
    domain: "both",
    category: "Cloud & DevOps",
    icon: "☁️",
    items: [
      "AWS S3 & Lambda",
      "GCP",
      "Firebase Suite",
      "GitHub Actions",
      "CI/CD",
      "Vercel",
      "App Store",
      "Play Store",
    ],
  },
  {
    domain: "both",
    category: "Tools & Workflow",
    icon: "🛠️",
    items: [
      "Git",
      "GitHub",
      "Postman",
      "Figma",
      "Flipper",
      "Xcode",
      "Android Studio",
      "Agile / Scrum",
    ],
  },
];
