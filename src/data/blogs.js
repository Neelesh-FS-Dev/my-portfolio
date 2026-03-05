// ═══════════════════════════════════════════════════════════════
//  blogs.js  ← EDIT THIS FILE to add / update blog posts
//
//  Each post has:
//    - metadata (id, title, excerpt, date, tags, color, domain)
//    - content[] array of blocks:
//        { type: "intro"|"heading"|"text"|"code"|"callout", text, label? }
// ═══════════════════════════════════════════════════════════════

const blogs = [
  // ── MOBILE ──────────────────────────────────────────────────
  {
    id: 1,
    slug: "rn-new-architecture",
    title: "Boosting React Native Performance: New Architecture Deep Dive",
    excerpt:
      "How enabling the New React Native Architecture improved Soul33's runtime performance by 40%. A deep look into Fabric, JSI, and TurboModules.",
    date: "Feb 2024",
    readTime: "8 min read",
    tags: ["React Native", "Performance", "Architecture"],
    color: "#00e5ff",
    icon: "⚡",
    domain: "mobile",
    content: [
      {
        type: "intro",
        text: "When I took over the Soul33 wellness app, the codebase was sitting on React Native 0.71 with the old bridge architecture. Users were reporting sluggish animations, jank during audio playback, and inconsistent frame rates on lower-end Android devices. After profiling, the culprit was clear — the old asynchronous bridge was the bottleneck.",
      },
      { type: "heading", text: "What is the New Architecture?" },
      {
        type: "text",
        text: "React Native's New Architecture is a complete rewrite of how JavaScript communicates with native code. The three pillars are JSI (JavaScript Interface), Fabric (the new renderer), and TurboModules (lazy-loaded native modules). Together they eliminate the serialisation overhead of the old bridge by allowing JS to hold direct references to native objects.",
      },
      { type: "heading", text: "Enabling it in an existing app" },
      {
        type: "text",
        text: "The migration wasn't a flip-of-a-switch. I audited every third-party library for New Architecture compatibility, tracked 40+ dependencies in a compatibility matrix, and upgraded react-native-track-player before writing a single line of migration code.",
      },
      {
        type: "code",
        label: "android/gradle.properties",
        text: "newArchEnabled=true\nhermesEnabled=true",
      },
      { type: "heading", text: "The Results" },
      {
        type: "text",
        text: "JS thread frame drops went from ~18% to under 3% during audio playback. Cold start improved by 900ms on mid-range Android. The meditation timer animations went from 45fps to a consistent 60fps. Overall: 40% runtime performance improvement.",
      },
      {
        type: "callout",
        text: "Key takeaway: Don't enable New Architecture before auditing all your native dependencies. Plan for 2–3 weeks of library compatibility work on a mature codebase.",
      },
    ],
  },

  {
    id: 2,
    slug: "websocket-chat-rn",
    title: "Building Real-Time Chat with WebSocket in React Native",
    excerpt:
      "Lessons learned building a WebSocket-based group chat supporting 200+ concurrent sessions — from connection management to offline handling.",
    date: "Jan 2024",
    readTime: "6 min read",
    tags: ["WebSocket", "Real-time", "React Native"],
    color: "#7c4dff",
    icon: "🔌",
    domain: "mobile",
    content: [
      {
        type: "intro",
        text: "Soul33 needed a real-time group chat and voicemail system to support wellness communities. After evaluating Firebase Realtime Database, Supabase Realtime, and raw WebSocket, we went with a custom WebSocket server — giving us the lowest latency and full control over message schemas.",
      },
      { type: "heading", text: "Connection Management" },
      {
        type: "text",
        text: "The trickiest part is handling the connection lifecycle across app state changes. On iOS, the socket gets killed after ~30 seconds in the background. We solved this with a reconnection manager that stores the last sequence number and replays missed messages on reconnect.",
      },
      {
        type: "code",
        label: "reconnection strategy",
        text: "const reconnect = async () => {\n  await delay(backoff);\n  socket = new WebSocket(WS_URL);\n  socket.onopen = () => syncFromSeq(lastSeq);\n  backoff = Math.min(backoff * 2, 30000);\n};",
      },
      { type: "heading", text: "Offline Message Queue" },
      {
        type: "text",
        text: "We built a local queue using MMKV — messages are written to the queue first, then drained to the socket when connection is confirmed. This made delivery feel reliable even on 2G connections.",
      },
      {
        type: "callout",
        text: "At peak load, the system handled 200+ concurrent sessions with under 50ms message latency. The key was combining optimistic UI updates with server-side sequence reconciliation.",
      },
    ],
  },

  {
    id: 3,
    slug: "ar-tryon-threejs-mediapipe",
    title: "AR Try-On: Three.js + MediaPipe in React Native",
    excerpt:
      "How I implemented a real-time AR lipstick try-on feature using Three.js and MediaPipe Face Landmarker inside a React Native WebView.",
    date: "Dec 2023",
    readTime: "10 min read",
    tags: ["AR", "Three.js", "MediaPipe"],
    color: "#ff6b35",
    icon: "🎭",
    domain: "mobile",
    content: [
      {
        type: "intro",
        text: "Barva Skin Therapie needed an AR lipstick try-on so customers could see shades on their face before buying. Native AR frameworks felt heavyweight. The solution: a WebView-based approach using Three.js and Google's MediaPipe Face Landmarker — cross-platform with a single implementation.",
      },
      { type: "heading", text: "Why WebView?" },
      {
        type: "text",
        text: "MediaPipe's Face Landmarker runs excellently in the browser via WASM. By embedding a Three.js scene in a React Native WebView and communicating via postMessage, we got a cross-platform AR experience. The WebView runs the 468-point face mesh at 30fps on modern devices.",
      },
      { type: "heading", text: "Mapping lip landmarks to geometry" },
      {
        type: "text",
        text: "I mapped specific MediaPipe landmark indices to a Three.js ShapeGeometry following the lip contour in 3D space, then applied a semi-transparent MeshBasicMaterial with the selected lipstick colour.",
      },
      {
        type: "code",
        label: "lip geometry update",
        text: "const lipPoints = LIP_INDICES.map(i =>\n  new THREE.Vector3(\n    landmarks[i].x * W,\n    -landmarks[i].y * H,\n    landmarks[i].z * DEPTH\n  )\n);\nlipMesh.geometry.setFromPoints(lipPoints);",
      },
      {
        type: "callout",
        text: "The result: real-time AR try-on on both iOS and Android with no native AR SDK. Cold start under 1.2 seconds including WASM initialisation.",
      },
    ],
  },

  {
    id: 4,
    slug: "flatlist-optimization",
    title: "Optimizing FlatList: Reducing Re-renders by 40%",
    excerpt:
      "A practical guide to memoisation, getItemLayout, and windowing techniques that eliminated 40% of unnecessary re-renders in the Yoke app.",
    date: "Nov 2023",
    readTime: "5 min read",
    tags: ["Performance", "React Native", "FlatList"],
    color: "#00ff88",
    icon: "🔄",
    domain: "mobile",
    content: [
      {
        type: "intro",
        text: "The Yoke app has an Instagram-like feed with video reels and complex lists across 100+ screens. Profiling revealed FlatList components were re-rendering 2–3× more than necessary, causing dropped frames and sluggish scroll.",
      },
      { type: "heading", text: "The Three Culprits" },
      {
        type: "text",
        text: "Flipper's React DevTools revealed three sources: inline arrow functions in renderItem, objects created inline in FlatList props, and parent state changes propagating to unchanged list items.",
      },
      { type: "heading", text: "Fix 1: Memoize renderItem" },
      {
        type: "code",
        label: "before vs after",
        text: "// Before — new function every render\n<FlatList renderItem={({ item }) => <Card item={item} />} />\n\n// After — stable reference\nconst renderItem = useCallback(\n  ({ item }) => <Card item={item} />, []\n);\n<FlatList renderItem={renderItem} />",
      },
      { type: "heading", text: "Fix 2: getItemLayout for fixed-height items" },
      {
        type: "text",
        text: "For feeds with known item heights, getItemLayout eliminates measurement overhead. This cut scroll-to-index time by 60% and removed the blank-cell flash on fast scroll.",
      },
      {
        type: "callout",
        text: "After all three fixes — memoised renderItem, getItemLayout, and React.memo on card components — Flipper showed a 40% reduction in re-renders and fps went from 45 to consistent 59–60.",
      },
    ],
  },

  // ── WEB ─────────────────────────────────────────────────────
  {
    id: 5,
    slug: "nextjs-vs-vite",
    title: "Next.js vs Vite + React: When to Choose What",
    excerpt:
      "A practical comparison of Next.js and Vite for React web apps — SSR, SSG, bundle size, and DX based on real project experience.",
    date: "Oct 2023",
    readTime: "7 min read",
    tags: ["Next.js", "Vite", "React", "Web"],
    color: "#7c4dff",
    icon: "🌐",
    domain: "web",
    content: [
      {
        type: "intro",
        text: "After building production apps with both Next.js and Vite + React, I get this question constantly: which one should I use? The answer depends heavily on what you're building.",
      },
      { type: "heading", text: "What Vite excels at" },
      {
        type: "text",
        text: "Vite is a build tool — not a framework. Paired with React it gives blazing-fast HMR, a lean output, and zero opinions about routing or data fetching. For SPAs, dashboards, and admin panels where SEO doesn't matter, Vite wins every time. Our internal dashboard at EC Info loads in under 1 second thanks to Vite's tree-shaking and chunk splitting.",
      },
      { type: "heading", text: "What Next.js excels at" },
      {
        type: "text",
        text: "Next.js shines for SSR/SSG, SEO, file-based routing, and built-in API routes. The digital card platform I built at The Special Character hit 95+ PageSpeed scores because Next.js SSG pre-rendered every card as static HTML — zero JS hydration cost on initial paint.",
      },
      {
        type: "code",
        label: "Vite config — manual chunks",
        text: "export default defineConfig({\n  plugins: [react()],\n  build: {\n    rollupOptions: {\n      output: {\n        manualChunks: {\n          vendor: ['react', 'react-dom'],\n          router: ['react-router-dom'],\n        },\n      },\n    },\n  },\n});",
      },
      { type: "heading", text: "Decision matrix" },
      {
        type: "text",
        text: "Use Next.js when: you need SEO, public-facing content, or e-commerce. Use Vite + React when: you're building a SPA, dashboard, or internal tool behind a login where SEO is irrelevant.",
      },
      {
        type: "callout",
        text: "Bottom line: Next.js for public content that needs to be indexed; Vite + React for everything behind a login. Choose based on your SEO requirements, not hype.",
      },
    ],
  },

  {
    id: 6,
    slug: "tailwind-at-scale",
    title: "Tailwind CSS at Scale: Component Patterns That Work",
    excerpt:
      "How I structure Tailwind CSS in large React projects — from component variants to design tokens — without the codebase becoming a mess.",
    date: "Sep 2023",
    readTime: "6 min read",
    tags: ["Tailwind CSS", "React", "CSS Architecture"],
    color: "#00ff88",
    icon: "🎨",
    domain: "web",
    content: [
      {
        type: "intro",
        text: "Tailwind CSS gets criticism for creating unmaintainable utility soup in large codebases. After using it across multiple React and Next.js projects — including the digital card platform serving 10K+ users — I've landed on patterns that keep Tailwind clean at scale.",
      },
      { type: "heading", text: "The core problem" },
      {
        type: "text",
        text: "The issue isn't Tailwind — it's treating every element as a one-off. Writing className strings directly in every component leads to duplication everywhere. The fix: treat Tailwind as a design token system, not just CSS shorthand.",
      },
      { type: "heading", text: "Pattern 1: Variant maps with cva" },
      {
        type: "text",
        text: "class-variance-authority (cva) is the cleanest way to manage component variants. Define a variant map once, call it with props — no ternary className chains. This is how shadcn/ui works under the hood.",
      },
      {
        type: "code",
        label: "Button with cva",
        text: "const button = cva(\n  'inline-flex items-center rounded-full font-semibold transition',\n  {\n    variants: {\n      variant: {\n        primary: 'bg-cyan-400 text-gray-900 hover:bg-white',\n        outline: 'border border-white/20 text-white hover:border-cyan-400',\n      },\n      size: {\n        sm: 'px-4 py-2 text-sm',\n        md: 'px-6 py-3 text-base',\n      },\n    },\n  }\n);",
      },
      { type: "heading", text: "Pattern 2: Design tokens in tailwind.config" },
      {
        type: "text",
        text: "Never hardcode colours in components. Extend Tailwind config with your design tokens — brand colours, spacing scales, font sizes — and reference them by name. When the brand colour changes, you update one file.",
      },
      {
        type: "callout",
        text: "Key insight: Tailwind at scale is about abstraction boundaries. Build primitive components (Button, Card, Badge) that hide the utility strings, then compose them everywhere. Page-level code should rarely touch Tailwind classes directly.",
      },
    ],
  },
];

export default blogs;
