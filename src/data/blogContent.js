export const blogDetails = [
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
        text: "React Native's New Architecture is a complete rewrite of how JavaScript communicates with native code. The three pillars are JSI (JavaScript Interface), Fabric (the new renderer), and TurboModules (lazy-loaded native modules). Together they eliminate the serialization overhead of the old bridge by allowing JS to hold direct references to native objects.",
      },
      { type: "heading", text: "Enabling it in an existing app" },
      {
        type: "text",
        text: "The migration wasn't a flip-of-a-switch. First I had to audit every third-party library for New Architecture compatibility. Several packages needed upgrading. I created a compatibility matrix spreadsheet tracking 40+ dependencies before writing a single line of migration code.",
      },
      {
        type: "code",
        label: "android/gradle.properties",
        text: "newArchEnabled=true\nhermesEnabled=true",
      },
      { type: "heading", text: "The Results" },
      {
        type: "text",
        text: "After enabling New Architecture and resolving all compatibility issues, the results were significant. JS thread frame drops dropped from ~18% to under 3% during audio playback. Cold start time improved by 900ms on mid-range Android devices. The meditation timer animations went from 45fps to a consistent 60fps. Overall we measured a 40% improvement in runtime performance.",
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
        text: "The trickiest part of WebSocket in React Native is handling the connection lifecycle across app state changes. When the app goes to the background on iOS, the socket gets killed after roughly 30 seconds. We solved this with a reconnection manager that stores the last sequence number and replays missed messages on reconnect.",
      },
      {
        type: "code",
        label: "reconnection strategy",
        text: "const reconnect = async () => {\n  await delay(backoff);\n  socket = new WebSocket(WS_URL);\n  socket.onopen = () => syncFromSeq(lastSeq);\n  backoff = Math.min(backoff * 2, 30000);\n};",
      },
      { type: "heading", text: "Offline Message Queue" },
      {
        type: "text",
        text: "Users on poor connections needed to send messages that would queue and retry. We built a local queue using MMKV storage — messages are written to the queue first, then drained to the socket when connection is confirmed. This made delivery feel reliable even on 2G connections.",
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
        text: "Co-stack Barva needed an AR lipstick try-on so customers could see shades on their face before buying. Native AR frameworks felt heavyweight. The solution was a WebView-based approach using Three.js and Google's MediaPipe Face Landmarker — cross-platform with a single implementation.",
      },
      { type: "heading", text: "Why WebView?" },
      {
        type: "text",
        text: "MediaPipe's Face Landmarker runs excellently in the browser via WASM. By embedding a Three.js scene in a React Native WebView and communicating via postMessage, we got a cross-platform AR experience. The WebView has access to the camera and runs the 468-point face mesh at 30fps on modern devices.",
      },
      { type: "heading", text: "Mapping lip landmarks to geometry" },
      {
        type: "text",
        text: "MediaPipe provides 468 facial landmarks. The upper and lower lip boundaries use specific landmark indices. I mapped these to a Three.js ShapeGeometry that follows the lip contour in 3D space, then applied a semi-transparent MeshBasicMaterial with the selected lipstick color.",
      },
      {
        type: "code",
        label: "lip geometry update",
        text: "const lipPoints = LIP_INDICES.map(i =>\n  new THREE.Vector3(\n    landmarks[i].x * W,\n    -landmarks[i].y * H,\n    landmarks[i].z * DEPTH\n  )\n);\nlipMesh.geometry.setFromPoints(lipPoints);",
      },
      {
        type: "callout",
        text: "The result: a real-time AR try-on that works on both iOS and Android with no native AR SDK required. Cold start under 1.2 seconds including WASM initialization.",
      },
    ],
  },
  {
    id: 4,
    slug: "flatlist-optimization",
    title: "Optimizing FlatList: Reducing Re-renders by 40%",
    excerpt:
      "A practical guide to memoization, getItemLayout, and windowing techniques that eliminated 40% of unnecessary re-renders in a 100+ screen app.",
    date: "Nov 2023",
    readTime: "5 min read",
    tags: ["Performance", "React Native", "FlatList"],
    color: "#00ff88",
    icon: "🔄",
    domain: "mobile",
    content: [
      {
        type: "intro",
        text: "The Yoke app has an Instagram-like feed with video reels, creator profiles, and complex list views across 100+ screens. Early profiling revealed FlatList components were re-rendering 2–3x more than necessary, causing dropped frames and sluggish scroll performance.",
      },
      { type: "heading", text: "The Three Culprits" },
      {
        type: "text",
        text: "After profiling with Flipper's React DevTools, I identified three main sources: inline arrow functions in renderItem, objects created inline in FlatList props, and parent component state changes propagating down to list items that hadn't changed.",
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
        text: "For feeds where item height is known, getItemLayout eliminates the need for React Native to measure every item. This cut scroll-to-index time by 60% and removed the blank cells flash on fast scroll.",
      },
      {
        type: "callout",
        text: "After applying all fixes — memoized renderItem, getItemLayout, and React.memo on card components — Flipper showed a 40% reduction in re-renders and scroll fps went from 45 to a consistent 59-60fps.",
      },
    ],
  },
  {
    id: 5,
    slug: "nextjs-vs-vite",
    title: "Next.js vs Vite + React: When to Choose What",
    excerpt:
      "A practical comparison of Next.js and Vite for React web apps — SSR, SSG, bundle size, and DX. When each shines based on real project experience.",
    date: "Oct 2023",
    readTime: "7 min read",
    tags: ["Next.js", "Vite", "React", "Web"],
    color: "#7c4dff",
    icon: "🌐",
    domain: "web",
    content: [
      {
        type: "intro",
        text: "After building production apps with both Next.js and Vite + React, I get this question constantly: which one should I use? The answer depends heavily on what you're building. Here's the breakdown based on real projects.",
      },
      { type: "heading", text: "What Vite excels at" },
      {
        type: "text",
        text: "Vite is a build tool — not a framework. Paired with React, it gives you blazing-fast HMR, an incredibly lean output, and zero opinions about routing or data fetching. For SPAs, dashboards, admin panels, and tools where SEO doesn't matter and you want full control over your architecture, Vite wins every time. Our internal React dashboard at EC Info loads in under 1 second in production thanks to Vite's tree-shaking and chunk splitting.",
      },
      { type: "heading", text: "What Next.js excels at" },
      {
        type: "text",
        text: "Next.js shines when you need SSR or SSG for SEO, file-based routing for rapid development, and built-in API routes. The digital card platform I built at The Special Character hit 95+ PageSpeed scores largely because Next.js SSG pre-rendered every card page as static HTML. Zero JavaScript hydration cost on the initial paint.",
      },
      {
        type: "code",
        label: "Vite config for production",
        text: "export default defineConfig({\n  plugins: [react()],\n  build: {\n    rollupOptions: {\n      output: {\n        manualChunks: {\n          vendor: ['react', 'react-dom'],\n          router: ['react-router-dom'],\n        },\n      },\n    },\n  },\n});",
      },
      { type: "heading", text: "The decision matrix" },
      {
        type: "text",
        text: "Use Next.js when: you need SEO, public-facing content, marketing pages, or e-commerce. Use Vite + React when: you're building a SPA, dashboard, internal tool, or anything behind a login wall where SEO is irrelevant. The performance difference for authenticated apps is negligible, but Vite's DX and bundle size advantages are real.",
      },
      {
        type: "callout",
        text: "Bottom line: Next.js for public content that needs to be indexed; Vite + React for everything behind a login. Both are excellent — choose based on your SEO requirements, not hype.",
      },
    ],
  },
  {
    id: 6,
    slug: "tailwind-at-scale",
    title: "Tailwind CSS at Scale: Component Patterns That Work",
    excerpt:
      "How I structure Tailwind CSS in large React projects — from component variants to design tokens — without the codebase turning into a mess.",
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
        text: "The issue isn't Tailwind itself — it's treating every element as a one-off. When you write className strings directly in every component without abstraction, you get duplication everywhere. The fix is treating Tailwind like what it is: a design token system, not just a shorthand CSS library.",
      },
      { type: "heading", text: "Pattern 1: Variant maps with cva" },
      {
        type: "text",
        text: "The class-variance-authority (cva) library is the cleanest way to manage component variants. Instead of ternary-chaining className strings, you define a variant map once and call it with props. This is how shadcn/ui works under the hood, and it's the pattern I use for all reusable components.",
      },
      {
        type: "code",
        label: "Button component with cva",
        text: "const button = cva(\n  'inline-flex items-center rounded-full font-semibold transition',\n  {\n    variants: {\n      variant: {\n        primary: 'bg-cyan-400 text-gray-900 hover:bg-white',\n        outline: 'border border-white/20 text-white hover:border-cyan-400',\n      },\n      size: {\n        sm: 'px-4 py-2 text-sm',\n        md: 'px-6 py-3 text-base',\n      },\n    },\n  }\n);",
      },
      { type: "heading", text: "Pattern 2: Design tokens in tailwind.config" },
      {
        type: "text",
        text: "Never hardcode colors in your components. Extend the Tailwind config with your design tokens — brand colors, spacing scales, font sizes — and reference them by name. When the brand color changes from cyan-400 to sky-400, you update one file.",
      },
      {
        type: "callout",
        text: "Key insight: Tailwind at scale is about abstraction boundaries, not fewer utilities. Build primitive components (Button, Card, Badge) that hide the utility strings, then compose them everywhere. Your page-level code should rarely touch Tailwind classes directly.",
      },
    ],
  },
];
