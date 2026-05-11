import {
  FiZap,
  FiMessageSquare,
  FiEye,
  FiRefreshCw,
  FiLayers,
  FiPenTool,
  FiLock,
  FiKey,
  FiUploadCloud,
  FiPlay,
  FiCode,
  FiServer,
  FiBox,
  FiCpu,
  FiShield,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import type { Blog, BlogBase } from "../types";

const BLOG_PALETTE: string[] = [
  "#3b82f6",
  "#3b82f6",
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
  "#ec4899",
  "#3b82f6",
  "#14b8a6",
  "#e11d48",
  "#a855f7",
  "#ef4444",
  "#06b6d4",
  "#84cc16",
  "#f97316",
  "#8b5cf6",
  "#d946ef",
  "#0ea5e9",
  "#facc15",
  "#fb923c",
  "#2dd4bf",
  "#dc2626",
  "#16a34a",
  "#2563eb",
  "#c026d3",
  "#ea580c",
  "#0891b2",
  "#4f46e5",
  "#db2777",
  "#65a30d",
  "#9333ea",
  "#0d9488",
  "#b91c1c",
  "#7e22ce",
  "#c2410c",
  "#0369a1",
  "#15803d",
  "#be185d",
  "#a16207",
  "#4338ca",
  "#059669",
  "#e04040",
  "#7c3aed",
  "#d97706",
  "#0284c7",
  "#b45309",
  "#6d28d9",
  "#047857",
  "#9d174d",
  "#1d4ed8",
  "#ca8a04",
];

const BLOG_ICONS: IconType[] = [
  FiZap,
  FiMessageSquare,
  FiEye,
  FiRefreshCw,
  FiLayers,
  FiPenTool,
  FiLock,
  FiKey,
  FiUploadCloud,
  FiPlay,
  FiCode,
  FiServer,
  FiBox,
  FiCpu,
  FiShield,
];

const blogs: BlogBase[] = [
  {
    id: 1,
    slug: "rn-new-architecture",
    title: "Boosting React Native Performance: New Architecture Deep Dive",
    excerpt:
      "How enabling the New React Native Architecture improved Soul33's runtime performance by 40% — a real migration story covering JSI, Fabric, TurboModules, and the 40+ library audit I did before touching a single line.",
    date: "Feb 2024",
    readTime: "8 min read",
    tags: ["React Native", "Performance", "Architecture", "TypeScript"],
    domain: "mobile",
    content: [
      {
        type: "intro",
        text: "When I took over the Soul33 wellness app, the codebase was sitting on React Native 0.71 with the old bridge architecture. Users were reporting sluggish animations, jank during audio playback, and inconsistent frame rates on lower-end Android devices. After profiling with Flipper's React DevTools and the Android GPU Profiler, the culprit was clear — the old asynchronous bridge was serialising every JS↔Native call as a JSON string, adding 8–12ms of overhead per interaction.",
      },
      { type: "heading", text: "What is the New Architecture?" },
      {
        type: "text",
        text: "React Native's New Architecture is a complete rewrite of how JavaScript communicates with native code. It has three pillars: JSI (JavaScript Interface) replaces the bridge with a C++ layer allowing JS to hold direct references to native objects — no serialisation. Fabric is the new renderer that computes layout on a background thread using Yoga, then commits to the UI thread synchronously. TurboModules lazy-load native modules on demand instead of eagerly loading everything at startup, cutting cold-start time significantly.",
      },
      {
        type: "heading",
        text: "The dependency audit — the part nobody talks about",
      },
      {
        type: "text",
        text: "Before writing a single migration line, I spent a full week auditing every third-party library. I tracked 40+ dependencies in a compatibility matrix — library name, version, New Architecture support status, and a fallback plan for each. The blockers were react-native-track-player (needed upgrading), some camera libraries, and three internal native modules I had to rewrite as TurboModules. Libraries that haven't migrated will crash silently in bridgeless mode, so skipping this step is not an option.",
      },
      {
        type: "code",
        label: "android/gradle.properties",
        text: "# Enable New Architecture\nnewArchEnabled=true\nhermesEnabled=true\n\n# Hermes bytecode — faster startup\nandroid.enableHermesBytecodeCompression=true",
      },
      {
        type: "code",
        label: "ios/Podfile — New Arch flag",
        text: "# In Podfile, before `use_react_native!`\nENV['RCT_NEW_ARCH_ENABLED'] = '1'\n\nuse_react_native!(\n  :path => config[:reactNativePath],\n  :hermes_enabled => true,\n  :fabric_enabled => flipper_config.fabric_enabled?\n)",
      },
      { type: "heading", text: "Migrating Redux with the new renderer" },
      {
        type: "text",
        text: "One unexpected issue: our state persistence layer was using MMKV with a custom Redux middleware that called native storage synchronously. Under JSI this worked fine, but Fabric's concurrent rendering exposed a race condition during hydration. The fix was migrating persistence to AsyncStorage with proper Redux Persist configuration and rewriting the hydration flow to await the rehydrate action before rendering the navigator.",
      },
      { type: "heading", text: "The Results" },
      {
        type: "text",
        text: "JS thread frame drops went from ~18% to under 3% during audio playback. Cold start improved by 900ms on mid-range Android (Snapdragon 665). Meditation timer animations went from an average 45fps to a consistent 60fps. The downloads screen — which previously janked on scroll due to heavy AsyncStorage reads on the main thread — now renders at full speed using TurboModules' background thread access. Overall: 40% runtime performance improvement across the app.",
      },
      {
        type: "callout",
        text: "Key takeaway: Don't enable New Architecture before auditing all your native dependencies. Build a compatibility matrix. Plan for 2–3 weeks of library migration work on a mature codebase. The performance gains are absolutely worth it — but the dependency work comes first.",
      },
    ],
  },

  {
    id: 2,
    slug: "websocket-chat-rn",
    title: "Building Real-Time Chat with WebSocket in React Native",
    excerpt:
      "Lessons from building a production WebSocket group chat supporting 200+ concurrent sessions — covering connection lifecycle, offline queuing, message deduplication, swipe-to-reply, and audio messages.",
    date: "Jan 2024",
    readTime: "6 min read",
    tags: ["WebSocket", "Real-time", "React Native", "Redux"],
    domain: "mobile",
    content: [
      {
        type: "intro",
        text: "Soul33 needed a real-time group chat and voicemail system to support wellness communities of 200+ concurrent users. After evaluating Firebase Realtime Database, Supabase Realtime, and raw WebSocket, we chose a custom WebSocket server — lowest latency, full control over message schemas, and no vendor lock-in on message pricing at scale.",
      },
      { type: "heading", text: "Connection lifecycle — the hard part" },
      {
        type: "text",
        text: "The trickiest part is managing the connection across app state changes. On iOS, the OS kills the socket after ~30 seconds in the background. On Android, aggressive battery optimisation on OEM ROMs (Xiaomi, Samsung) terminates connections even sooner. Our WebSocket context provider listens to AppState changes and implements exponential backoff reconnection with a maximum 30-second ceiling.",
      },
      {
        type: "code",
        label: "WebSocket reconnection with backoff",
        text: "let backoff = 1000;\nconst MAX_BACKOFF = 30000;\n\nconst reconnect = async () => {\n  await delay(backoff);\n  socket = new WebSocket(WS_URL);\n  socket.onopen = () => {\n    backoff = 1000; // reset on success\n    syncFromSeq(lastSeq); // replay missed messages\n  };\n  socket.onerror = () => {\n    backoff = Math.min(backoff * 2, MAX_BACKOFF);\n    reconnect();\n  };\n};",
      },
      { type: "heading", text: "Message deduplication" },
      {
        type: "text",
        text: "Because we replay messages from the last known sequence number on reconnect, the client may receive duplicates. We maintain a Set of processed message IDs in Redux state, checking each incoming message before dispatching to the store. IDs are stored in a sliding window of the last 500 messages to avoid unbounded memory growth.",
      },
      {
        type: "code",
        label: "deduplication in Redux reducer",
        text: "// In chatSlice reducer\nconst processedIds = new Set(state.processedIds);\n\nif (processedIds.has(message.id)) return; // duplicate\n\nprocessedIds.add(message.id);\n// Sliding window — keep last 500 only\nif (processedIds.size > 500) {\n  const oldest = [...processedIds][0];\n  processedIds.delete(oldest);\n}\n\nstate.messages.push(message);\nstate.processedIds = [...processedIds];",
      },
      { type: "heading", text: "Swipe-to-reply with Reanimated" },
      {
        type: "text",
        text: "Each message row is wrapped in a PanGestureHandler. A horizontal swipe beyond a 60dp threshold reveals a reply icon and stores the target message in local state as replyTarget. The reply preview bar appears above the text input. On send, the message payload includes a replyTo field with the original message ID and a 60-character preview snippet. Tapping a quoted reply scrolls the FlatList to that message using scrollToIndex and flashes a highlight animation.",
      },
      { type: "heading", text: "Audio messages via S3" },
      {
        type: "text",
        text: "Voice messages record via react-native-audio-recorder-player, show a real-time waveform via react-native-audio-waveform, and upload to S3 with progress tracking. The S3 pre-signed URL is fetched from our backend first, then the file is PUT directly to S3 from the device — keeping our server out of the binary transfer path. The message is sent to the chat only after the S3 upload completes, including the audio duration for the playback UI.",
      },
      {
        type: "callout",
        text: "At peak load, the system handled 200+ concurrent sessions with under 50ms average message latency measured from send to receipt. The key was optimistic UI updates — messages appear immediately client-side and are confirmed or rolled back based on the server ACK.",
      },
    ],
  },

  {
    id: 3,
    slug: "ar-tryon-threejs-mediapipe",
    title: "AR Try-On: Three.js + MediaPipe in React Native",
    excerpt:
      "How I shipped a real-time AR lipstick try-on for Barva Skin Therapie using Three.js and MediaPipe Face Landmarker inside a React Native WebView — no native AR SDK needed.",
    date: "Dec 2023",
    readTime: "10 min read",
    tags: ["AR", "Three.js", "MediaPipe", "React Native"],
    domain: "mobile",
    content: [
      {
        type: "intro",
        text: "Barva Skin Therapie needed an AR lipstick try-on so customers could see shades on their face before buying. ARKit and ARCore felt heavyweight — separate native modules, ~25MB each, platform-specific code to maintain. The solution: a WebView-based approach using Three.js and Google's MediaPipe Face Landmarker running in WASM. One implementation, both platforms, ~3MB payload.",
      },
      { type: "heading", text: "Architecture overview" },
      {
        type: "text",
        text: "The React Native layer uses VisionCamera to stream frames at 30fps. Each frame is converted to a base64 JPEG and sent to the WebView via postMessage. Inside the WebView, MediaPipe's Face Landmarker processes the frame and returns 468 3D landmark coordinates. Three.js maps specific lip landmark indices to a ShapeGeometry and renders a semi-transparent MeshBasicMaterial in the selected lipstick colour. The composited canvas is drawn back over the camera feed.",
      },
      { type: "heading", text: "Setting up MediaPipe in WASM" },
      {
        type: "text",
        text: "MediaPipe's FaceLandmarker runs in a Web Worker so it doesn't block the render thread. Initialisation loads the face_landmarker.task model (~6MB) from a CDN. The first inference call has ~400ms overhead for WASM JIT compilation; subsequent calls run at 25–30fps on a mid-range device.",
      },
      {
        type: "code",
        label: "MediaPipe initialisation in WebView",
        text: "const { FaceLandmarker, FilesetResolver } = await import(\n  'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision'\n);\n\nconst filesetResolver = await FilesetResolver.forVisionTasks(\n  'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm'\n);\n\nfaceLandmarker = await FaceLandmarker.createFromOptions(\n  filesetResolver,\n  {\n    baseOptions: { modelAssetPath: FACE_LANDMARKER_URL },\n    runningMode: 'IMAGE',\n    numFaces: 1,\n  }\n);",
      },
      { type: "heading", text: "Mapping lip landmarks to Three.js geometry" },
      {
        type: "text",
        text: "The MediaPipe face mesh has 468 landmarks. I extracted the 40 indices that trace the outer and inner lip contours and mapped them to Three.js Vector3 coordinates, scaling by canvas width and height. The z-depth is multiplied by a constant to give the lip geometry a slight 3D curvature that follows the face.",
      },
      {
        type: "code",
        label: "Lip mesh update loop",
        text: "const LIP_OUTER = [61,185,40,39,37,0,267,269,270,409,291,375,321,405,314,17,84,181,91,146];\nconst LIP_INNER = [78,191,80,81,82,13,312,311,310,415,308,324,318,402,317,14,87,178,88,95];\n\nfunction updateLipMesh(landmarks, W, H) {\n  const points = [...LIP_OUTER, ...LIP_INNER].map(i =>\n    new THREE.Vector3(\n      landmarks[i].x * W - W / 2,\n      -(landmarks[i].y * H - H / 2),\n      landmarks[i].z * 200\n    )\n  );\n  lipMesh.geometry.setFromPoints(points);\n  lipMesh.geometry.computeBoundingSphere();\n}",
      },
      { type: "heading", text: "Colour switching and opacity" },
      {
        type: "text",
        text: "Each lipstick SKU has a hex colour stored in Shopify metafields. When a user taps a colour swatch, React Native sends a postMessage with the hex value to the WebView, which updates the MeshBasicMaterial colour and opacity (0.55 for a natural finish, 0.75 for bold shades). The switch is instant — no re-render, just a material property update.",
      },
      {
        type: "callout",
        text: "The result: real-time AR try-on on both iOS and Android with no native AR SDK. Cold start under 1.2 seconds including WASM initialisation. MediaPipe inference at 25–30fps on a Snapdragon 720G. The WebView approach saved an estimated 3 weeks of native development and produced a single unified codebase.",
      },
    ],
  },

  {
    id: 4,
    slug: "flatlist-optimization",
    title: "Optimizing FlatList: Reducing Re-renders by 40%",
    excerpt:
      "A practical guide to memoisation, getItemLayout, windowSize, and keyExtractor techniques that eliminated 40% of unnecessary re-renders in a 100-screen React Native app.",
    date: "Nov 2023",
    readTime: "5 min read",
    tags: ["Performance", "React Native", "FlatList", "Memoisation"],
    domain: "mobile",
    content: [
      {
        type: "intro",
        text: "The Yoke app has an Instagram-like feed with video Reels and complex list-heavy screens across 100+ pages. Profiling with Flipper's React DevTools revealed FlatList components re-rendering 2–3× more than necessary, causing dropped frames, sluggish scroll, and a noticeable stutter when swiping between Reels. Here's the systematic fix.",
      },
      { type: "heading", text: "Step 1: Identify re-render sources" },
      {
        type: "text",
        text: "Flipper's React DevTools highlighted three sources in order of severity: inline arrow functions in renderItem (creates a new function reference every render), plain object props like contentContainerStyle written inline (new object reference each render), and parent state changes — like a typing indicator — propagating down to unchanged list items.",
      },
      { type: "heading", text: "Fix 1: Memoize renderItem and keyExtractor" },
      {
        type: "code",
        label: "Before vs After",
        text: "// ❌ Before — new function reference every render\n<FlatList\n  renderItem={({ item }) => <ReelCard item={item} onLike={handleLike} />}\n  keyExtractor={(item) => item.id.toString()}\n/>\n\n// ✅ After — stable references via useCallback\nconst renderItem = useCallback(\n  ({ item }) => <ReelCard item={item} onLike={handleLike} />,\n  [handleLike] // handleLike also wrapped in useCallback\n);\nconst keyExtractor = useCallback(\n  (item) => item.id.toString(), []\n);\n\n<FlatList renderItem={renderItem} keyExtractor={keyExtractor} />",
      },
      { type: "heading", text: "Fix 2: React.memo on list item components" },
      {
        type: "text",
        text: "Even with a stable renderItem, child components re-render if they don't implement shouldComponentUpdate or React.memo. Wrapping ReelCard in React.memo with a custom comparator that only checks id and likeCount (not the full item object) cut render count by half on its own.",
      },
      {
        type: "code",
        label: "React.memo with custom comparator",
        text: "const ReelCard = React.memo(\n  ({ item, onLike }) => {\n    // component implementation\n  },\n  (prev, next) =>\n    prev.item.id === next.item.id &&\n    prev.item.likeCount === next.item.likeCount\n);",
      },
      { type: "heading", text: "Fix 3: getItemLayout for fixed-height rows" },
      {
        type: "text",
        text: "For list screens with uniform item heights (notification list, followers list), getItemLayout tells FlatList the exact height without measuring. This eliminates the layout calculation pass and makes scrollToIndex instant. For Reels where each card is full screen height, this is trivial — CARD_HEIGHT = Dimensions.get('window').height.",
      },
      {
        type: "code",
        label: "getItemLayout — full-screen reels",
        text: "const CARD_HEIGHT = Dimensions.get('window').height;\n\n<FlatList\n  getItemLayout={(_, index) => ({\n    length: CARD_HEIGHT,\n    offset: CARD_HEIGHT * index,\n    index,\n  })}\n  windowSize={3}        // render 1 above + 1 below viewport\n  maxToRenderPerBatch={2}\n  initialNumToRender={1}\n/>",
      },
      {
        type: "heading",
        text: "Fix 4: Separate state that changes frequently",
      },
      {
        type: "text",
        text: "The typing indicator and unread badge count were stored in the same Redux slice as the message list. Any badge update triggered the entire ChatList to re-render. Moving ephemeral UI state (typing, badge) into a separate lightweight slice — and connecting only the header component to it — isolated re-renders to just the header.",
      },
      {
        type: "callout",
        text: "After all fixes — memoised renderItem, React.memo with custom comparator, getItemLayout, windowSize tuning, and state isolation — Flipper showed a 40% reduction in re-renders. Average frame rate went from 45fps to a consistent 59–60fps on a mid-range Android test device.",
      },
    ],
  },

  {
    id: 5,
    slug: "nextjs-vs-vite",
    title: "Next.js vs Vite + React: When to Choose What",
    excerpt:
      "A practical, opinionated comparison of Next.js and Vite + React based on shipping both in production — covering SSR, SSG, bundle size, DX, and the exact decision matrix I now use on every project.",
    date: "Oct 2023",
    readTime: "7 min read",
    tags: ["Next.js", "Vite", "React", "Web Performance"],
    domain: "web",
    content: [
      {
        type: "intro",
        text: "After building the digital card SaaS platform at The Special Character with Next.js and the admin dashboard at EC Info Solutions with Vite + React, I get this question constantly: which one should I use? Both are excellent choices — the answer depends entirely on what you're building and who visits it.",
      },
      { type: "heading", text: "What Vite is (and isn't)" },
      {
        type: "text",
        text: "Vite is a build tool, not a framework. Paired with React it gives you blazing-fast HMR (sub-50ms module replacement vs Webpack's 2–8 seconds), a lean output with excellent tree-shaking, and zero opinions about routing, data fetching, or deployment. For SPAs, dashboards, and admin panels where SEO doesn't matter, Vite wins every time. Our internal EC Info dashboard loads under 1 second — 47kb gzipped JS after manual chunk splitting.",
      },
      { type: "heading", text: "What Next.js is (and the cost)" },
      {
        type: "text",
        text: "Next.js is a full React framework with file-based routing, SSR, SSG, ISR, middleware, and built-in API routes. It's opinionated by design. The App Router (Next 13+) introduces server components, which dramatically reduce client-side JS — but also add mental overhead around the server/client boundary. The digital card platform I built hit 95+ PageSpeed scores because Next.js SSG pre-rendered every card as static HTML — zero JS hydration cost on first paint.",
      },
      {
        type: "code",
        label: "Vite manual chunks — splitting vendor bundles",
        text: "// vite.config.ts\nexport default defineConfig({\n  plugins: [react()],\n  build: {\n    rollupOptions: {\n      output: {\n        manualChunks: {\n          vendor:  ['react', 'react-dom'],\n          router:  ['react-router-dom'],\n          charts:  ['recharts'],\n          ui:      ['lucide-react'],\n        },\n      },\n    },\n  },\n});",
      },
      {
        type: "code",
        label: "Next.js SSG with ISR — card platform pattern",
        text: "// pages/card/[slug].tsx\nexport async function getStaticProps({ params }) {\n  const card = await fetchCard(params.slug);\n  return {\n    props: { card },\n    revalidate: 3600, // ISR — revalidate every hour\n  };\n}\n\nexport async function getStaticPaths() {\n  const slugs = await fetchAllCardSlugs();\n  return {\n    paths: slugs.map(slug => ({ params: { slug } })),\n    fallback: 'blocking', // generate new cards on demand\n  };\n}",
      },
      { type: "heading", text: "DX comparison" },
      {
        type: "text",
        text: "Vite's DX is unmatched for iteration speed — instant HMR, simple config, and no framework abstractions to fight. Next.js adds complexity: you need to understand when code runs on server vs client, how caching works in the App Router, and when to use server components vs client components. For a team already familiar with Next.js this is fine; for a solo developer building a dashboard it's unnecessary overhead.",
      },
      { type: "heading", text: "Decision matrix" },
      {
        type: "text",
        text: "Use Next.js when: the app has public-facing pages that need SEO, you need SSR for personalised content, or you want co-located API routes. Use Vite + React when: the entire app is behind a login (SEO irrelevant), you need maximum iteration speed, or you're building internal tooling. The mistake I see most often is reaching for Next.js by default when a Vite SPA would ship 2× faster and perform identically for the use case.",
      },
      {
        type: "callout",
        text: "Rule of thumb: if a Googlebot or social media crawler needs to render your page, use Next.js. If not, use Vite. Don't let framework hype drive architecture decisions — let your SEO requirements drive them.",
      },
    ],
  },

  {
    id: 6,
    slug: "tailwind-at-scale",
    title: "Tailwind CSS at Scale: Component Patterns That Work",
    excerpt:
      "How I structure Tailwind CSS in large React projects without creating utility soup — covering cva for variants, design tokens in config, and the abstraction boundary rule that keeps codebases clean.",
    date: "Sep 2023",
    readTime: "6 min read",
    tags: ["Tailwind CSS", "React", "CSS Architecture", "DX"],
    domain: "web",
    content: [
      {
        type: "intro",
        text: "Tailwind CSS gets a lot of criticism for producing unmaintainable utility soup in large codebases. After using it across multiple React and Next.js projects — including a digital card SaaS platform serving 10,000+ users with 50+ card templates — I've landed on patterns that keep Tailwind clean, consistent, and refactorable at scale.",
      },
      { type: "heading", text: "The actual problem with Tailwind at scale" },
      {
        type: "text",
        text: "The problem isn't Tailwind — it's treating every element as a one-off. Writing className strings directly into every JSX element means the same button appears in 40 files with slightly different class combinations. When the design system changes, you're doing a grep-and-fix across the entire codebase. The fix: treat Tailwind as a design token system, not just CSS shorthand, and enforce abstraction boundaries.",
      },
      { type: "heading", text: "Pattern 1: Component variants with cva" },
      {
        type: "text",
        text: "class-variance-authority (cva) is the cleanest solution for managing component variants. Define a variant map once per component, compose with cx() for conditional classes, and call it with props. No ternary className chains, no string interpolation. This is exactly how shadcn/ui works under the hood — it's the community-accepted standard.",
      },
      {
        type: "code",
        label: "Button.tsx with cva variants",
        text: "import { cva, type VariantProps } from 'class-variance-authority';\n\nconst button = cva(\n  // base classes always applied\n  'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 focus:outline-none focus:ring-2',\n  {\n    variants: {\n      variant: {\n        primary: 'bg-cyan-400 text-gray-900 hover:bg-white shadow-lg shadow-cyan-400/20',\n        outline: 'border border-white/20 text-white hover:border-cyan-400 hover:text-cyan-400',\n        ghost:   'text-gray-400 hover:text-white hover:bg-white/5',\n      },\n      size: {\n        sm: 'px-4 py-2 text-sm gap-1.5',\n        md: 'px-6 py-3 text-base gap-2',\n        lg: 'px-8 py-4 text-lg gap-2.5',\n      },\n    },\n    defaultVariants: {\n      variant: 'primary',\n      size: 'md',\n    },\n  }\n);\n\ntype ButtonProps = VariantProps<typeof button> & React.ButtonHTMLAttributes<HTMLButtonElement>;\n\nexport function Button({ variant, size, className, ...props }: ButtonProps) {\n  return <button className={button({ variant, size, className })} {...props} />;\n}",
      },
      { type: "heading", text: "Pattern 2: Design tokens in tailwind.config" },
      {
        type: "text",
        text: "Never hardcode brand colours, font sizes, or spacing values directly in components — always extend tailwind.config.ts. When the brand's primary colour changes, you update one line. When the design team introduces a new spacing scale, it flows through automatically. For the card platform, I extended config with 12 brand colours, 3 font families, and a custom shadow scale that matched the Figma design system exactly.",
      },
      {
        type: "code",
        label: "tailwind.config.ts — design tokens",
        text: "export default {\n  content: ['./src/**/*.{ts,tsx}'],\n  theme: {\n    extend: {\n      colors: {\n        brand: {\n          primary:   '#3b82f6',\n          secondary: '#3b82f6',\n          accent:    '#3b82f6',\n        },\n        surface: {\n          DEFAULT: 'rgba(255,255,255,0.04)',\n          hover:   'rgba(255,255,255,0.08)',\n        },\n      },\n      fontFamily: {\n        display: ['Plus Jakarta Sans', 'sans-serif'],\n        mono:    ['JetBrains Mono', 'monospace'],\n      },\n      boxShadow: {\n        glow:     '0 0 24px rgba(59,130,246,0.2)',\n        'glow-lg': '0 0 48px rgba(59,130,246,0.15)',\n      },\n    },\n  },\n} satisfies Config;",
      },
      { type: "heading", text: "Pattern 3: The abstraction boundary rule" },
      {
        type: "text",
        text: "The rule that keeps large Tailwind codebases maintainable: page-level code should rarely touch Tailwind utility classes directly. Pages compose primitive components (Button, Card, Badge, Input, Avatar). Primitive components own their Tailwind strings. Layout components (Section, Container, Grid) own their spacing and responsive classes. This means when a design change comes in, you update one component file — not 30 pages.",
      },
      {
        type: "callout",
        text: "Key insight: Tailwind at scale is an architecture problem, not a CSS problem. Build a component library of ~15–20 primitives that encapsulate all the Tailwind strings. Compose them everywhere. Your page-level JSX should read like a design document — component names, not utility strings.",
      },
    ],
  },

  {
    id: 7,
    slug: "sign-in-with-apple-react-native",
    title: "Implementing Sign In with Apple in React Native (iOS + Android)",
    excerpt:
      "A complete walkthrough of integrating Sign In with Apple using @invertase/react-native-apple-authentication — covering Xcode capability setup, Android workaround via JWT, private email relay, credential state handling, and App Store compliance gotchas.",
    date: "Mar 2025",
    readTime: "7 min read",
    tags: ["React Native", "Authentication", "iOS", "Apple", "Security"],
    domain: "mobile",
    content: [
      {
        type: "intro",
        text: "Apple Sign In is not optional — if your app offers any third-party login (Google, Facebook, etc.), Apple mandates you also offer Sign In with Apple or it gets rejected from the App Store. I learned this the hard way during a review cycle on a client project. This post documents every step from Xcode capability setup to credential state monitoring, plus the often-ignored Android fallback that most guides skip entirely.",
      },
      {
        type: "heading",
        text: "Why Sign In with Apple is different",
      },
      {
        type: "text",
        text: "Unlike Google or Facebook OAuth, Apple Sign In has a few unique behaviours you must design around: Apple only sends the user's name and email on the very first login. If the user revokes and re-authorises, you get the user ID but not the name/email again — ever. You must persist name and email immediately on first sign-in, not on a subsequent profile fetch. Apple also offers a private email relay (e.g. abc123@privaterelay.appleid.com) that forwards to the user's real inbox. Your backend must be whitelisted to send to these relay addresses via Apple's developer portal.",
      },
      {
        type: "heading",
        text: "Step 1 — Xcode capability and Apple Developer setup",
      },
      {
        type: "text",
        text: "In Xcode, open your project → select the target → go to Signing & Capabilities → click the + button → add Sign In with Apple. This creates an entitlement file automatically. In the Apple Developer portal, go to Identifiers → select your App ID → enable Sign In with Apple → configure the primary App ID if you're using an extension. For backend token validation, create a Services ID (used as the client_id for web flows) and generate a Key (.p8 file) under Keys — this is your client secret material for the REST API.",
      },
      {
        type: "heading",
        text: "Step 2 — Install the library",
      },
      {
        type: "code",
        label: "terminal",
        text: "npm install @invertase/react-native-apple-authentication\n# iOS\ncd ios && pod install\n# No additional linking needed for RN 0.63+",
      },
      {
        type: "heading",
        text: "Step 3 — Trigger the Sign In flow",
      },
      {
        type: "code",
        label: "AppleSignInButton.jsx",
        text: "import appleAuth, {\n  AppleButton,\n  AppleAuthRequestOperation,\n  AppleAuthRequestScope,\n  AppleAuthCredentialState,\n} from '@invertase/react-native-apple-authentication';\nimport { Alert } from 'react-native';\n\nexport default function AppleSignInButton() {\n  async function handleAppleSignIn() {\n    try {\n      const appleAuthRequestResponse = await appleAuth.performRequest({\n        requestedOperation: AppleAuthRequestOperation.LOGIN,\n        requestedScopes: [\n          AppleAuthRequestScope.EMAIL,\n          AppleAuthRequestScope.FULL_NAME,\n        ],\n      });\n\n      const { user, email, fullName, identityToken, nonce } =\n        appleAuthRequestResponse;\n\n      // CRITICAL: persist name/email immediately — Apple won't send again\n      const displayName =\n        fullName?.givenName && fullName?.familyName\n          ? `${fullName.givenName} ${fullName.familyName}`\n          : 'Apple User';\n\n      // Send identityToken + nonce to your backend for JWT verification\n      await sendToBackend({ identityToken, nonce, user, email, displayName });\n\n    } catch (error) {\n      if (error.code === '1001') return; // user cancelled — not an error\n      Alert.alert('Sign In Failed', error.message);\n    }\n  }\n\n  if (!appleAuth.isSupported) return null;\n\n  return (\n    <AppleButton\n      buttonStyle={AppleButton.Style.WHITE}\n      buttonType={AppleButton.Type.SIGN_IN}\n      style={{ width: 200, height: 44 }}\n      onPress={handleAppleSignIn}\n    />\n  );\n}",
      },
      {
        type: "heading",
        text: "Step 4 — Backend JWT verification",
      },
      {
        type: "text",
        text: "Never trust the identityToken on the client side alone. Send the identityToken and nonce to your server. On the backend, fetch Apple's public keys from https://appleid.apple.com/auth/keys, verify the JWT signature using the matching key, check the nonce matches, confirm the iss is https://appleid.apple.com, and confirm the aud matches your Bundle ID. Libraries like apple-signin-auth (Node.js) or python-jose handle this cleanly. Only after verification create or update the user record.",
      },
      {
        type: "heading",
        text: "Step 5 — Monitor credential state changes",
      },
      {
        type: "code",
        label: "useAppleCredentialListener.js",
        text: "import { useEffect } from 'react';\nimport appleAuth, {\n  AppleAuthCredentialState,\n} from '@invertase/react-native-apple-authentication';\nimport { useDispatch } from 'react-redux';\nimport { signOut } from '../store/authSlice';\n\nexport function useAppleCredentialListener(userId) {\n  const dispatch = useDispatch();\n\n  useEffect(() => {\n    if (!userId || !appleAuth.isSupported) return;\n\n    // Fires when user revokes Apple Sign In from iOS Settings\n    const unsubscribe = appleAuth.onCredentialRevoked(async () => {\n      const state = await appleAuth.getCredentialStateForUser(userId);\n      if (state === AppleAuthCredentialState.REVOKED) {\n        dispatch(signOut());\n      }\n    });\n\n    return () => unsubscribe();\n  }, [userId]);\n}",
      },
      {
        type: "heading",
        text: "Android — the forgotten step",
      },
      {
        type: "text",
        text: "Apple Sign In on Android requires a web-based OAuth flow through a Services ID (not the App ID). You redirect the user to Apple's auth URL in a WebView or browser, receive a code + id_token via your redirect URI (must be HTTPS), and exchange it on your backend. The @invertase library supports this via appleAuthAndroid module. Key difference: you must generate and verify a nonce client-side as a SHA256 hash, pass it raw to Apple, and verify the hashed version in the JWT. Skipping the nonce check is a security hole.",
      },
      {
        type: "code",
        label: "appleAuthAndroid setup",
        text: "import { appleAuthAndroid } from '@invertase/react-native-apple-authentication';\nimport 'react-native-get-random-values';\nimport { v4 as uuid } from 'uuid';\nimport SHA256 from 'crypto-js/sha256';\n\nasync function handleAndroidAppleSignIn() {\n  const rawNonce = uuid();\n  const state = uuid();\n\n  appleAuthAndroid.configure({\n    clientId: 'com.yourcompany.yourapp.service', // Services ID\n    redirectUri: 'https://yourapp.com/auth/apple/callback',\n    responseType: appleAuthAndroid.ResponseType.ALL,\n    responseMode: appleAuthAndroid.ResponseMode.QUERY,\n    scope: appleAuthAndroid.Scope.ALL,\n    nonce: rawNonce,\n    state,\n  });\n\n  const response = await appleAuthAndroid.signIn();\n  // Send response.id_token + rawNonce to backend for verification\n}",
      },
      {
        type: "callout",
        text: "Three things that will get your app rejected: not offering Apple Sign In when you offer other social logins, not handling the credential revocation listener, and sending marketing emails to Apple's private relay without whitelisting your domain in the Apple Developer portal. Check all three before submitting.",
      },
    ],
  },
  {
    id: 8,
    slug: "google-sign-in-react-native",
    title: "Google Sign In with React Native — The Complete Guide",
    excerpt:
      "Everything you need to implement Google Sign In using @react-native-google-signin/google-signin — from SHA-1 fingerprint setup and OAuth client IDs, to silent sign-in, token refresh, Play Integrity, and the iOS URL scheme trap that breaks half of all setups.",
    date: "Mar 2025",
    readTime: "8 min read",
    tags: ["React Native", "Authentication", "Google", "OAuth", "Android"],
    domain: "mobile",
    content: [
      {
        type: "intro",
        text: "Google Sign In looks straightforward until it isn't. The library installs fine, the button renders, then you hit a cryptic DEVELOPER_ERROR on Android or a silent failure on iOS with no stack trace. I've set this up across a dozen React Native projects and the bugs are almost always the same three things: wrong SHA-1 fingerprint in Firebase, missing URL scheme in Info.plist, or a mismatched OAuth client ID. This guide eliminates all of them.",
      },
      {
        type: "heading",
        text: "Step 1 — Firebase project and OAuth client setup",
      },
      {
        type: "text",
        text: "Go to the Firebase console → create or open your project → add an Android app with your exact package name → download google-services.json and place it at android/app/google-services.json. For iOS, add an iOS app with your bundle ID → download GoogleService-Info.plist → drag it into Xcode under the project root (not a subfolder). The OAuth client IDs are embedded in these files — do not hardcode them manually. For Android, you must register both your debug and release SHA-1 fingerprints or sign-in will silently fail in release builds.",
      },
      {
        type: "code",
        label: "Get SHA-1 fingerprint",
        text: "# Debug keystore (for development)\nkeytool -list -v \\\n  -keystore ~/.android/debug.keystore \\\n  -alias androiddebugkey \\\n  -storepass android \\\n  -keypass android\n\n# Release keystore (for production — use your actual keystore path)\nkeytool -list -v \\\n  -keystore ./android/app/release.keystore \\\n  -alias your-key-alias",
      },
      {
        type: "heading",
        text: "Step 2 — Install and link",
      },
      {
        type: "code",
        label: "terminal",
        text: "npm install @react-native-google-signin/google-signin\n\n# android/build.gradle — add inside dependencies\nclasspath 'com.google.gms:google-services:4.4.1'\n\n# android/app/build.gradle — add at bottom\napply plugin: 'com.google.gms.google-services'\n\n# iOS\ncd ios && pod install",
      },
      {
        type: "heading",
        text: "Step 3 — iOS URL scheme (the trap everyone falls into)",
      },
      {
        type: "text",
        text: "Open GoogleService-Info.plist and find the REVERSED_CLIENT_ID value — it looks like com.googleusercontent.apps.xxxxxxxxxx-xxxx. Now open Xcode → your target → Info tab → URL Types → add a new entry → set the URL Scheme to that exact reversed client ID value. Without this, Google's auth callback cannot return to your app on iOS and sign-in will hang indefinitely or silently fail. This is the single most common iOS setup mistake.",
      },
      {
        type: "heading",
        text: "Step 4 — Configure and implement sign in",
      },
      {
        type: "code",
        label: "GoogleAuth.js",
        text: "import {\n  GoogleSignin,\n  GoogleSigninButton,\n  statusCodes,\n} from '@react-native-google-signin/google-signin';\nimport { useEffect } from 'react';\n\n// Call once at app startup (e.g. in App.jsx)\nGoogleSignin.configure({\n  // Found in GoogleService-Info.plist as CLIENT_ID\n  iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',\n  // Scopes beyond profile + email\n  scopes: ['profile', 'email'],\n  // Required if you need offline access / refresh tokens on backend\n  offlineAccess: true,\n});\n\nexport async function signInWithGoogle() {\n  try {\n    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });\n\n    const userInfo = await GoogleSignin.signIn();\n    const { idToken } = await GoogleSignin.getTokens();\n\n    // Send idToken to your backend for verification\n    // Never use the userInfo directly to create sessions\n    return { userInfo, idToken };\n\n  } catch (error) {\n    if (error.code === statusCodes.SIGN_IN_CANCELLED) {\n      return null; // user backed out — not an error\n    } else if (error.code === statusCodes.IN_PROGRESS) {\n      return null; // already signing in\n    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {\n      throw new Error('Google Play Services not available');\n    }\n    throw error;\n  }\n}",
      },
      {
        type: "heading",
        text: "Step 5 — Silent sign-in for returning users",
      },
      {
        type: "text",
        text: "Don't make returning users tap the button every time. On app start, call GoogleSignin.signInSilently() — it restores the previous session using a cached refresh token without any UI. If it throws a statusCodes.SIGN_IN_REQUIRED error, show the sign-in button. This is also where you refresh the idToken, since Google's idTokens expire after 1 hour. Always call getTokens() after signInSilently() to get a fresh idToken before hitting your backend.",
      },
      {
        type: "code",
        label: "useSilentSignIn.js",
        text: "import { useEffect } from 'react';\nimport { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';\nimport { useDispatch } from 'react-redux';\nimport { setUser, clearUser } from '../store/authSlice';\n\nexport function useSilentSignIn() {\n  const dispatch = useDispatch();\n\n  useEffect(() => {\n    async function trySilentSignIn() {\n      try {\n        const userInfo = await GoogleSignin.signInSilently();\n        const { idToken } = await GoogleSignin.getTokens(); // fresh token\n        dispatch(setUser({ userInfo, idToken }));\n      } catch (error) {\n        if (error.code === statusCodes.SIGN_IN_REQUIRED) {\n          dispatch(clearUser()); // expected — show login screen\n        }\n      }\n    }\n\n    trySilentSignIn();\n  }, []);\n}",
      },
      {
        type: "heading",
        text: "Backend token verification",
      },
      {
        type: "text",
        text: "On your server, verify the idToken using Google's tokeninfo endpoint or the google-auth-library. Never create a user session based on the client-side userInfo object alone — it can be spoofed. Verify the aud field matches your client ID and the email_verified field is true. If you passed offlineAccess: true during configure, the sign-in response also includes a serverAuthCode — exchange this on your backend for a refresh token, which lets your server call Google APIs on the user's behalf even when the app is closed.",
      },
      {
        type: "code",
        label: "Backend verification (Node.js)",
        text: "import { OAuth2Client } from 'google-auth-library';\n\nconst client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);\n\nexport async function verifyGoogleToken(idToken) {\n  const ticket = await client.verifyIdToken({\n    idToken,\n    audience: process.env.GOOGLE_CLIENT_ID,\n  });\n\n  const payload = ticket.getPayload();\n\n  if (!payload.email_verified) {\n    throw new Error('Email not verified by Google');\n  }\n\n  return {\n    googleId: payload.sub,\n    email: payload.email,\n    name: payload.name,\n    avatar: payload.picture,\n  };\n}",
      },
      {
        type: "heading",
        text: "Common DEVELOPER_ERROR causes",
      },
      {
        type: "text",
        text: "DEVELOPER_ERROR on Android almost always means one of three things: the SHA-1 fingerprint registered in Firebase doesn't match the keystore you're building with (debug vs release), the package name in Firebase doesn't exactly match applicationId in build.gradle, or the google-services.json file is outdated and doesn't reflect recent Firebase console changes. Download a fresh copy of google-services.json after any Firebase console change — it's cached locally and won't auto-update.",
      },
      {
        type: "callout",
        text: "Checklist before going to production: register both debug AND release SHA-1 fingerprints in Firebase, add the REVERSED_CLIENT_ID URL scheme in Xcode, verify idTokens on the server — never on the client, handle token expiry with signInSilently + getTokens() on app resume, and test sign-out + sign-in again to confirm the flow works after credential revocation.",
      },
    ],
  },
  {
    id: 9,
    slug: "deploy-react-native-app-store",
    title:
      "Deploying a React Native App to the App Store — Full Xcode Walkthrough",
    excerpt:
      "A step-by-step production deployment guide for iOS — covering Apple Developer account setup, certificates, provisioning profiles, Xcode archive, TestFlight distribution, App Store Connect metadata, and the review gotchas that cause most first-time rejections.",
    date: "Mar 2025",
    readTime: "9 min read",
    tags: ["React Native", "iOS", "App Store", "Xcode", "Deployment"],
    domain: "mobile",
    content: [
      {
        type: "intro",
        text: "Deploying to the App Store for the first time feels like navigating a bureaucracy with no map. Certificates expire silently, provisioning profiles mismatch at archive time, and App Store Connect throws validation errors that point nowhere useful. I've shipped over a dozen React Native apps to production on iOS and the process is always the same set of traps. This guide walks through every step — from a fresh Apple Developer account to your app going live — with the exact sequence that avoids those traps.",
      },
      {
        type: "heading",
        text: "Step 1 — Apple Developer Program enrollment",
      },
      {
        type: "text",
        text: "Go to developer.apple.com and enrol in the Apple Developer Program ($99/year). Individual accounts are tied to your personal Apple ID — use a dedicated Apple ID for company projects, not your personal one. Organisation accounts require a D-U-N-S number (free, takes 1–5 business days to process via Dun & Bradstreet). Once enrolled, allow 24–48 hours for full activation before certificates become available. Everything else in this guide depends on an active membership.",
      },
      {
        type: "heading",
        text: "Step 2 — Create an App ID",
      },
      {
        type: "text",
        text: "In the Apple Developer portal, go to Identifiers → App IDs → register a new App ID. Choose Explicit (not wildcard) and set the Bundle ID to match exactly what you have in Xcode — com.yourcompany.yourapp. Enable the capabilities your app uses: Push Notifications, Sign In with Apple, Associated Domains, etc. You cannot add certain capabilities later without regenerating your provisioning profile, so check this list thoroughly before continuing.",
      },
      {
        type: "heading",
        text: "Step 3 — Distribution certificate",
      },
      {
        type: "text",
        text: "Go to Certificates → create a new Apple Distribution certificate. You will need to generate a Certificate Signing Request (CSR) from Keychain Access on your Mac: open Keychain Access → Certificate Assistant → Request a Certificate from a Certificate Authority → save to disk. Upload that CSR to the developer portal, download the resulting .cer file, and double-click it to install into your Mac's keychain. This certificate proves you are an authorised Apple developer. Keep the private key backed up — if you lose it, you must revoke and recreate.",
      },
      {
        type: "heading",
        text: "Step 4 — Provisioning profile",
      },
      {
        type: "text",
        text: "Go to Profiles → create a new App Store Distribution profile. Select the App ID you created, select your Distribution certificate, name it clearly (e.g. YourApp AppStore Distribution), and download it. Double-click the .mobileprovision file to install it. In Xcode, go to your target → Signing & Capabilities → uncheck Automatically manage signing → under Release, manually select this provisioning profile and the Distribution certificate. Mismatches between the certificate in the profile and the one installed in your keychain are the most common archive failure.",
      },
      {
        type: "heading",
        text: "Step 5 — Xcode build settings before archiving",
      },
      {
        type: "code",
        label: "ios/Podfile — ensure release config",
        text: "# Make sure your Podfile targets release optimisations\npost_install do |installer|\n  installer.pods_project.targets.each do |target|\n    target.build_configurations.each do |config|\n      if config.name == 'Release'\n        config.build_settings['SWIFT_OPTIMIZATION_LEVEL'] = '-Owholemodule'\n        config.build_settings['ENABLE_BITCODE'] = 'NO' # Bitcode deprecated in Xcode 14+\n      end\n    end\n  end\nend",
      },
      {
        type: "text",
        text: "In Xcode, set the active scheme to your app target (not a test target) and the destination to Any iOS Device (arm64) — not a simulator. Open Product → Scheme → Edit Scheme → confirm the Run configuration is set to Release, not Debug. React Native's release build minifies JS and removes the Metro bundler dependency — never ship a Debug build to the App Store. Also bump your CFBundleShortVersionString (marketing version, e.g. 1.0.1) and CFBundleVersion (build number, must increment for every TestFlight or App Store upload) in Info.plist.",
      },
      {
        type: "heading",
        text: "Step 6 — Archive and upload via Xcode Organizer",
      },
      {
        type: "code",
        label: "Build release JS bundle first",
        text: "# From project root — generates the release bundle before archiving\nnpx react-native bundle \\\n  --platform ios \\\n  --dev false \\\n  --entry-file index.js \\\n  --bundle-output ios/main.jsbundle \\\n  --assets-dest ios\n\n# Then in Xcode: Product → Archive",
      },
      {
        type: "text",
        text: "After archiving, the Xcode Organizer opens automatically. Select your archive → Distribute App → App Store Connect → Upload. Xcode will validate the binary, check entitlements, and upload it to App Store Connect. This process takes 3–10 minutes depending on bundle size. If validation fails with a missing entitlement error, it means a capability is enabled in your code but not in your provisioning profile — go back to the developer portal, enable it on the App ID, and regenerate the profile.",
      },
      {
        type: "heading",
        text: "Step 7 — TestFlight distribution",
      },
      {
        type: "text",
        text: "After upload, the build appears in App Store Connect → TestFlight within 5–15 minutes (sometimes longer on first upload). Internal testers (up to 100, no review required) can install immediately. External TestFlight groups require a Beta App Review — usually 1–2 days. Add testers by email or create a public link. TestFlight builds expire after 90 days, so keep pushing builds for longer beta periods. Always test the TestFlight build on a real device before submitting to App Store review — it uses the release bundle, not Metro, and catches issues that never appear in development.",
      },
      {
        type: "heading",
        text: "Step 8 — App Store Connect metadata",
      },
      {
        type: "text",
        text: "In App Store Connect, create a new app version. You need: app name (30 chars max), subtitle (30 chars), description (4000 chars), keywords (100 chars total, comma-separated — these drive search ranking), support URL, marketing URL (optional), and privacy policy URL (mandatory for all apps since 2020). Screenshots are required for 6.7-inch iPhone (iPhone 15 Pro Max size), 12.9-inch iPad if you support iPad. Use Xcode Simulator to capture at the right dimensions. App Preview videos (30 seconds max) significantly improve conversion rates.",
      },
      {
        type: "heading",
        text: "Step 9 — Submit for review",
      },
      {
        type: "text",
        text: "Select the build from TestFlight, fill in the export compliance (does your app use encryption beyond HTTPS? usually No for most apps), content rights declarations, and advertising identifier (IDFA) usage. Set the release type — automatic after approval, or manual (you release it yourself after approval). Average review time is 24–48 hours for a new app, 12–24 hours for updates. You can check App Review status on the App Store Connect app on iPhone for real-time notifications.",
      },
      {
        type: "heading",
        text: "Common rejection reasons and fixes",
      },
      {
        type: "text",
        text: "Guideline 2.1 (App Completeness) — reviewers test on a real device and tap everything. Broken states, placeholder text, or non-functional buttons cause immediate rejection. Guideline 4.0 (Design) — your app must provide genuine value beyond a web view wrapper. Guideline 5.1.1 (Privacy) — every permission you request (camera, location, contacts) must be justified in the NSUsageDescription and actually used visibly. Requesting permissions not used in your app is an automatic rejection. Guideline 3.1.1 (Payments) — any digital goods or subscriptions must use Apple's In-App Purchase, not Stripe or PayPal directly.",
      },
      {
        type: "callout",
        text: "Before every App Store submission: increment the build number (even for same-version re-submissions), test the exact TestFlight build on a physical device, verify all NSUsageDescription strings are present in Info.plist, confirm your privacy policy URL is live and accessible, and make sure the app works without an account login if reviewers cannot create one (provide demo credentials in the review notes).",
      },
    ],
  },
  {
    id: 10,
    slug: "deploy-react-native-google-play",
    title:
      "Deploying a React Native App to Google Play — Android Studio & Play Console Guide",
    excerpt:
      "The complete production deployment guide for Android — covering keystore generation, Gradle signing config, AAB builds in Android Studio, Play Console setup, internal/closed/open tracks, Play App Signing, and avoiding the policy violations that get new apps suspended.",
    date: "Mar 2025",
    readTime: "9 min read",
    tags: [
      "React Native",
      "Android",
      "Google Play",
      "Android Studio",
      "Deployment",
    ],
    domain: "mobile",
    content: [
      {
        type: "intro",
        text: "Android deployment has its own class of surprises — keystore files that get lost and brick your app's update capability, AAB vs APK confusion, Play App Signing opt-in that cannot be undone, and policy violations that trigger account suspensions with little explanation. After shipping numerous React Native apps through Play Console, I've documented the exact steps and failure modes so you don't repeat them.",
      },
      {
        type: "heading",
        text: "Step 1 — Create a Google Play Developer account",
      },
      {
        type: "text",
        text: "Go to play.google.com/console and pay the one-time $25 registration fee using a Google account. Use a dedicated Google account for company apps — not your personal Gmail. If registering as an organisation, you will need to verify your developer identity with a government-issued ID or business documents (introduced in 2023 as part of Google's developer verification program). This verification can take 2–7 business days. Your Play Console account is permanent — do not delete it as it cannot be transferred to another Google account.",
      },
      {
        type: "heading",
        text: "Step 2 — Generate a release keystore",
      },
      {
        type: "text",
        text: "Your release keystore is the cryptographic identity of your app. Google uses it to verify that updates come from the same developer as the original release. If you lose this file and its password, you can never push updates to that app listing — you would have to publish an entirely new app with a new package name and lose all reviews, ratings, and install history. Back this file up in multiple secure locations immediately after creating it.",
      },
      {
        type: "code",
        label: "Generate release keystore",
        text: "# Run from your project root — replace ALL placeholder values\nkeytool -genkeypair -v \\\n  -storetype PKCS12 \\\n  -keystore android/app/release.keystore \\\n  -alias your-key-alias \\\n  -keyalg RSA \\\n  -keysize 2048 \\\n  -validity 10000\n\n# You will be prompted for:\n# - Keystore password (store this securely)\n# - Key password (can be same as keystore password)\n# - Your name, organisation, city, state, country code\n\n# IMMEDIATELY back up release.keystore to a password manager or secure cloud storage\n# Add to .gitignore — never commit your keystore to version control",
      },
      {
        type: "heading",
        text: "Step 3 — Configure Gradle signing",
      },
      {
        type: "code",
        label: "android/gradle.properties — store credentials",
        text: "# Add to gradle.properties (this file is in .gitignore by default)\nMYAPP_UPLOAD_STORE_FILE=release.keystore\nMYAPP_UPLOAD_KEY_ALIAS=your-key-alias\nMYAPP_UPLOAD_STORE_PASSWORD=your-keystore-password\nMYAPP_UPLOAD_KEY_PASSWORD=your-key-password",
      },
      {
        type: "code",
        label: "android/app/build.gradle — signing config",
        text: "android {\n  ...\n  signingConfigs {\n    debug {\n      storeFile file('debug.keystore')\n      storePassword 'android'\n      keyAlias 'androiddebugkey'\n      keyPassword 'android'\n    }\n    release {\n      if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {\n        storeFile file(MYAPP_UPLOAD_STORE_FILE)\n        storePassword MYAPP_UPLOAD_STORE_PASSWORD\n        keyAlias MYAPP_UPLOAD_KEY_ALIAS\n        keyPassword MYAPP_UPLOAD_KEY_PASSWORD\n      }\n    }\n  }\n  buildTypes {\n    release {\n      signingConfig signingConfigs.release\n      minifyEnabled true  // enables ProGuard/R8\n      shrinkResources true\n      proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'\n    }\n  }\n}",
      },
      {
        type: "heading",
        text: "Step 4 — Build the release AAB in Android Studio",
      },
      {
        type: "text",
        text: "Google Play requires Android App Bundle (AAB) format since August 2021 — APKs are no longer accepted for new apps. AAB lets Play generate optimised APKs per device configuration (screen density, CPU architecture), reducing install size by 15–40% compared to a universal APK. In Android Studio: Build → Generate Signed Bundle / APK → Android App Bundle → select your keystore and fill in the credentials → choose release build variant → Finish. The output .aab file will be in android/app/release/.",
      },
      {
        type: "code",
        label: "Or build from terminal",
        text: "# From project root — build release AAB without opening Android Studio\ncd android && ./gradlew bundleRelease\n\n# Output: android/app/build/outputs/bundle/release/app-release.aab\n\n# Verify the bundle with bundletool (optional but recommended)\njava -jar bundletool.jar build-apks \\\n  --bundle=app-release.aab \\\n  --output=app.apks \\\n  --ks=app/release.keystore \\\n  --ks-key-alias=your-key-alias \\\n  --ks-pass=pass:your-keystore-password",
      },
      {
        type: "heading",
        text: "Step 5 — Play Console app setup",
      },
      {
        type: "text",
        text: "In Play Console, click Create app — choose app or game, free or paid, and confirm policy declarations. Fill in the store listing: title (30 chars), short description (80 chars), full description (4000 chars), and upload graphics. Required assets: feature graphic (1024×500px), at least 2 screenshots per form factor you support (phone mandatory, tablet if applicable), and a high-res icon (512×512px PNG). The feature graphic appears as a banner when your app is featured — make it visually compelling even if you never get featured.",
      },
      {
        type: "heading",
        text: "Step 6 — Play App Signing (mandatory for AAB)",
      },
      {
        type: "text",
        text: "When uploading your first AAB, Play Console will prompt you to opt into Play App Signing. This is now mandatory for all new apps. Google stores and manages the final signing key used to sign APKs delivered to users. You upload with your upload key (the keystore you generated), Google re-signs with their app signing key before delivery. The critical implication: your upload keystore password is now only needed for uploads — if you lose it, Google can reset your upload key via identity verification. Register your upload key's SHA-1 and SHA-256 in Firebase to keep Google Sign In working.",
      },
      {
        type: "heading",
        text: "Step 7 — Release tracks",
      },
      {
        type: "text",
        text: "Play Console has four release tracks: Internal Testing (up to 100 testers, instant publish, no review, use this for daily builds), Closed Testing / Alpha (specific tester groups, no review, takes ~hours), Open Testing / Beta (public opt-in, no review, good for stress testing), and Production (full rollout or staged, requires Google review for new apps — typically 1–3 days). Always start with Internal Testing to verify the AAB installs correctly on real devices before pushing to Production. Use staged rollout (start at 10–20%) for production releases to catch crashes before they hit all users.",
      },
      {
        type: "code",
        label: "Staged rollout via Gradle Play Publisher (optional automation)",
        text: "# build.gradle — automate deployments with gradle-play-publisher\nplugins {\n  id 'com.github.triplet.play' version '3.8.4'\n}\n\nplay {\n  serviceAccountCredentials.set(file('play-service-account.json'))\n  track.set('internal')          // or 'alpha', 'beta', 'production'\n  userFraction.set(0.1)          // 10% staged rollout\n  updatePriority.set(2)          // 0-5, used by Play Core for in-app updates\n  defaultToAppBundles.set(true)\n}\n\n// Then run: ./gradlew publishReleaseBundle",
      },
      {
        type: "heading",
        text: "Step 8 — Content rating, target audience, and data safety",
      },
      {
        type: "text",
        text: "Play Console requires three declarations before you can publish: Content Rating (complete the IARC questionnaire — takes 5 minutes, assigns age ratings for all regions automatically), Target Audience and Content (specify minimum age, whether the app targets children — if yes, additional COPPA compliance requirements apply), and Data Safety section (mandatory since 2022 — declare every data type your app collects, whether it's shared with third parties, and whether users can request deletion). The data safety form must match your privacy policy. Inconsistencies between the two are a policy violation and can cause suspension.",
      },
      {
        type: "heading",
        text: "ProGuard and common release build crashes",
      },
      {
        type: "text",
        text: "minifyEnabled true turns on R8 code shrinking which renames classes — this breaks reflection-based libraries and causes crashes in release that never appear in debug. Add keep rules to proguard-rules.pro for any library that uses reflection: Gson models, Retrofit interfaces, React Native native modules. If you get a ClassNotFoundException in release, the class was shrunk away. Check the R8 mapping file at android/app/build/outputs/mapping/release/mapping.txt to trace obfuscated stack traces back to readable class names — upload this file to Play Console's Android Vitals for automatic deobfuscation in crash reports.",
      },
      {
        type: "code",
        label: "proguard-rules.pro — common React Native rules",
        text: "# Keep React Native\n-keep class com.facebook.react.** { *; }\n-keep class com.facebook.hermes.** { *; }\n-keep class com.facebook.jni.** { *; }\n\n# Keep your app's native modules\n-keep class com.yourcompany.yourapp.** { *; }\n\n# Keep Gson models (if using Gson)\n-keepattributes Signature\n-keepattributes *Annotation*\n-dontwarn sun.misc.**\n-keep class com.google.gson.** { *; }\n\n# Keep OkHttp (used by many RN libraries)\n-dontwarn okhttp3.**\n-dontwarn okio.**",
      },
      {
        type: "callout",
        text: "Critical checklist before first Play Store submission: back up your release keystore in at least 2 separate secure locations, opt into Play App Signing and save your upload key certificate, complete the Data Safety form honestly (mismatches with your privacy policy cause suspensions), test the exact release AAB via Internal Testing on 2–3 physical devices before promoting to Production, and upload your ProGuard mapping.txt to Android Vitals so crash reports are readable.",
      },
    ],
  },
  {
    id: 11,
    slug: "push-notifications-react-native-fcm-apns",
    title:
      "Push Notifications in React Native — FCM + APNs Done Right",
    excerpt:
      "End-to-end push notification setup for React Native using Firebase Cloud Messaging on Android and APNs via FCM on iOS — covering token rotation, background handlers, deep links, notification channels, and the silent failures nobody documents.",
    date: "Apr 2026",
    readTime: "8 min read",
    tags: ["React Native", "Push Notifications", "Firebase", "FCM", "APNs"],
    domain: "mobile",
    content: [
      {
        type: "intro",
        text: "Push is one of those features that looks simple in the demo and brutal in production. On Soul33 — a community-driven wellness app — push was load-bearing: sponsor messages, group chat replies, meditation reminders, and re-engagement. We shipped it via Firebase Cloud Messaging on both platforms, but every \"happy path\" tutorial skipped the parts that broke: token rotation after reinstall, iOS not registering APNs at all in TestFlight builds, and notifications swallowed silently by Doze mode on Android. This post is the version I wish I had.",
      },
      {
        type: "heading",
        text: "Architecture — FCM for both platforms",
      },
      {
        type: "text",
        text: "Don't talk to APNs directly from your backend. Use Firebase as the single delivery surface — FCM forwards to APNs on iOS and delivers directly on Android. Your backend stores one device token per user per device, talks to one API, and a single sender key handles both platforms. The cost: you accept a few hundred milliseconds of FCM-side latency on iOS for the simplicity. For 99% of apps that's the right trade.",
      },
      {
        type: "heading",
        text: "Step 1 — Native setup the tutorials skip",
      },
      {
        type: "text",
        text: "On iOS, enable Push Notifications and Background Modes → Remote notifications in Xcode capabilities. Then the part that bites: APNs auth keys (.p8) not certificates. Generate a single .p8 in the Apple Developer portal under Keys, upload it to Firebase Cloud Messaging → Apple app config with your Team ID and Key ID. Certificates expire yearly and break push in production overnight; .p8 keys don't. On Android, drop google-services.json under android/app/ and ensure your applicationId in build.gradle matches the Firebase Android app's package name exactly — a mismatch results in tokens that look valid but never receive messages.",
      },
      {
        type: "code",
        label: "iOS — AppDelegate.mm registration",
        text: "#import <Firebase.h>\n#import <UserNotifications/UserNotifications.h>\n\n- (BOOL)application:(UIApplication *)application\n didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {\n  [FIRApp configure];\n\n  // Register for remote notifications — this is what triggers APNs token generation\n  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];\n  center.delegate = self;\n  UNAuthorizationOptions options = UNAuthorizationOptionAlert\n                                   | UNAuthorizationOptionSound\n                                   | UNAuthorizationOptionBadge;\n  [center requestAuthorizationWithOptions:options\n    completionHandler:^(BOOL granted, NSError * _Nullable error) {\n      if (granted) {\n        dispatch_async(dispatch_get_main_queue(), ^{\n          [application registerForRemoteNotifications];\n        });\n      }\n    }];\n\n  return [super application:application didFinishLaunchingWithOptions:launchOptions];\n}",
      },
      {
        type: "heading",
        text: "Step 2 — Token retrieval and rotation",
      },
      {
        type: "text",
        text: "FCM tokens are not static. They rotate when the user reinstalls the app, clears app data, restores from a backup on a new device, or — on iOS — when the user toggles notifications off and back on. Your backend must accept a token-update endpoint and the client must call it every time getToken() returns a value different from what's stored locally. Skipping this is why \"my old phone still gets pushes after I reinstall on a new one\" — both devices think they own the same user, only one is current.",
      },
      {
        type: "code",
        label: "Token bootstrap + rotation listener",
        text: "import messaging from '@react-native-firebase/messaging';\nimport AsyncStorage from '@react-native-async-storage/async-storage';\nimport { api } from '../api/client';\n\nexport async function bootstrapPush(userId: string) {\n  const authStatus = await messaging().requestPermission();\n  const enabled =\n    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||\n    authStatus === messaging.AuthorizationStatus.PROVISIONAL;\n  if (!enabled) return;\n\n  const token = await messaging().getToken();\n  const cached = await AsyncStorage.getItem('fcm_token');\n  if (token !== cached) {\n    await api.post('/devices/register', { token, userId, platform: Platform.OS });\n    await AsyncStorage.setItem('fcm_token', token);\n  }\n\n  // Listen for FCM-initiated rotations (rare but real)\n  messaging().onTokenRefresh(async (newToken) => {\n    await api.post('/devices/register', { token: newToken, userId, platform: Platform.OS });\n    await AsyncStorage.setItem('fcm_token', newToken);\n  });\n}",
      },
      {
        type: "heading",
        text: "Step 3 — Foreground vs background vs quit-state handling",
      },
      {
        type: "text",
        text: "RN Firebase fans out incoming messages across three states: foreground (onMessage — you must display the notification yourself, FCM won't), background (setBackgroundMessageHandler in index.js — runs in a headless task), and quit-state cold launch (getInitialNotification — returns the notification that woke the app). All three need to handle the same deep-link payload consistently. We solved this on Soul33 with a single navigation function that all three handlers call once the navigation ref is ready.",
      },
      {
        type: "code",
        label: "index.js — register the background handler",
        text: "import messaging from '@react-native-firebase/messaging';\n\n// MUST be outside any component, BEFORE AppRegistry.registerComponent\nmessaging().setBackgroundMessageHandler(async (remoteMessage) => {\n  // Persist to AsyncStorage; the app will pick it up on next launch\n  await AsyncStorage.setItem(\n    'pending_deep_link',\n    JSON.stringify(remoteMessage.data ?? {}),\n  );\n});",
      },
      {
        type: "heading",
        text: "Step 4 — Android channels, iOS categories, deep links",
      },
      {
        type: "text",
        text: "On Android 8+, every notification must belong to a channel — register channels with distinct sound/vibration settings on first launch via notifee or @notifee/react-native. On iOS, register notification categories with actions (Reply, Mark as Read) the same way. Deep links live in remoteMessage.data — a flat object of string-only values. Never rely on FCM's notification.title/body for routing; those are display-only. Always include screen and entityId fields in data and route from there.",
      },
      {
        type: "heading",
        text: "Why your test pushes never arrive",
      },
      {
        type: "text",
        text: "Top three silent failures we've debugged: (1) TestFlight builds need a Production APNs auth key — sandbox keys only work in development builds, so a fresh TestFlight install will register but never receive. (2) Android OEMs (Xiaomi, Oppo, Vivo) aggressively kill background processes — users must whitelist the app in battery settings or the FCM service is terminated. (3) priority: 'normal' messages get batched by FCM and may arrive minutes later — use priority: 'high' for chat and time-sensitive content, but reserve normal for marketing pings so you don't burn your sender reputation.",
      },
      {
        type: "callout",
        text: "Production checklist: APNs .p8 key uploaded to Firebase (not a cert), token rotation endpoint deployed, all three handlers (foreground/background/quit) call the same deep-link router, Android notification channels registered before sending, priority set per message type, and a fallback for users who haven't granted permission (in-app inbox so they don't miss critical messages).",
      },
    ],
  },
  {
    id: 12,
    slug: "reanimated-v4-60fps-reels",
    title:
      "60fps Reels on Low-End Android with Reanimated v4 Worklets",
    excerpt:
      "How we rebuilt the Yoke Reels feed to hold 60fps on a Snapdragon 665 — covering Reanimated v4 worklets, useAnimatedScrollHandler, runOnJS bridging, and the lifecycle-aware playback trick that cut RAM by ~30%.",
    date: "Apr 2026",
    readTime: "7 min read",
    tags: ["React Native", "Reanimated", "Animation", "Performance"],
    domain: "mobile",
    content: [
      {
        type: "intro",
        text: "The Yoke Reels feed was the canary for performance on the whole app. TikTok-style vertical paging, video playback, double-tap-to-like with a heart burst — on a flagship iPhone it ran flawlessly. On a 2-year-old Android with a Snapdragon 665, scrolling stuttered, the heart animation skipped frames, and battery temp climbed within 10 minutes of use. The fix wasn't more native code — it was moving every animation off the JS thread using Reanimated v4 worklets.",
      },
      {
        type: "heading",
        text: "Why JS-thread animation breaks on low-end devices",
      },
      {
        type: "text",
        text: "By default, an Animated.Value or setState-driven transform runs on the JS thread, then crosses the bridge to the UI thread every frame. If JS is busy doing anything else (a Redux dispatch, a network response, image decoding), frames are dropped. On a Snapdragon 665 the JS thread is already saturated by the React reconciler. Worklets bypass this entirely by compiling animation logic to run on the UI thread directly — no bridge crossing per frame, no JS dependence.",
      },
      {
        type: "heading",
        text: "Rebuilding the scroll-driven crossfade as a worklet",
      },
      {
        type: "text",
        text: "The original feed used Animated.event with useNativeDriver: true for the scroll position, but the crossfade between adjacent reels (opacity ramp at the edges) was computed in React on the JS thread. Replacing it with useAnimatedScrollHandler + useAnimatedStyle moved the entire computation to the UI thread. We saw a measurable 12–15ms reduction in scroll-event handling on the JS thread on the Snapdragon device.",
      },
      {
        type: "code",
        label: "ReelsFeed — worklet-driven crossfade",
        text: "import Animated, {\n  useAnimatedScrollHandler,\n  useAnimatedStyle,\n  useSharedValue,\n  interpolate,\n  Extrapolation,\n} from 'react-native-reanimated';\n\nconst { height: H } = Dimensions.get('window');\n\nfunction ReelsFeed({ reels }) {\n  const scrollY = useSharedValue(0);\n\n  const onScroll = useAnimatedScrollHandler((e) => {\n    'worklet';\n    scrollY.value = e.contentOffset.y;\n  });\n\n  return (\n    <Animated.FlatList\n      data={reels}\n      onScroll={onScroll}\n      scrollEventThrottle={16}\n      pagingEnabled\n      renderItem={({ item, index }) => (\n        <ReelCard reel={item} index={index} scrollY={scrollY} />\n      )}\n    />\n  );\n}\n\nfunction ReelCard({ reel, index, scrollY }) {\n  const animatedStyle = useAnimatedStyle(() => {\n    'worklet';\n    const start = index * H;\n    const opacity = interpolate(\n      scrollY.value,\n      [start - H * 0.6, start, start + H * 0.6],\n      [0, 1, 0],\n      Extrapolation.CLAMP,\n    );\n    return { opacity };\n  });\n\n  return (\n    <Animated.View style={[styles.card, animatedStyle]}>\n      {/* ... */}\n    </Animated.View>\n  );\n}",
      },
      {
        type: "heading",
        text: "Double-tap-to-like — gesture-driven worklets",
      },
      {
        type: "text",
        text: "The heart burst animation used to fire from a Redux dispatch via componentDidUpdate. Result: a 60–100ms delay between tap and visual on the slow device. We moved the entire double-tap detection and burst into a Gesture.Tap().numberOfTaps(2) handler with the animation in a worklet — the spring fires instantly, and the Redux dispatch happens via runOnJS afterward. The user sees instant feedback; the server-side mutation runs in the background.",
      },
      {
        type: "code",
        label: "Heart-burst gesture with runOnJS",
        text: "import { Gesture, GestureDetector } from 'react-native-gesture-handler';\nimport Animated, {\n  useSharedValue,\n  useAnimatedStyle,\n  withSpring,\n  withTiming,\n  runOnJS,\n} from 'react-native-reanimated';\n\nfunction HeartBurst({ reelId, onLike }) {\n  const scale = useSharedValue(0);\n  const opacity = useSharedValue(0);\n\n  const doubleTap = Gesture.Tap()\n    .numberOfTaps(2)\n    .onEnd(() => {\n      'worklet';\n      scale.value = withSpring(1, { damping: 9, stiffness: 220 });\n      opacity.value = withTiming(1, { duration: 120 }, () => {\n        opacity.value = withTiming(0, { duration: 280 });\n        scale.value = withTiming(0, { duration: 280 });\n      });\n      runOnJS(onLike)(reelId);   // network call off the UI thread\n    });\n\n  const heartStyle = useAnimatedStyle(() => ({\n    transform: [{ scale: scale.value }],\n    opacity: opacity.value,\n  }));\n\n  return (\n    <GestureDetector gesture={doubleTap}>\n      <Animated.View style={styles.hitbox}>\n        <Animated.View style={[styles.heart, heartStyle]} />\n        {/* video / content underneath */}\n      </Animated.View>\n    </GestureDetector>\n  );\n}",
      },
      {
        type: "heading",
        text: "Lifecycle-aware playback — the memory win",
      },
      {
        type: "text",
        text: "Each reel mounts a react-native-video instance. With windowSize: 5 on the FlatList, that's up to 5 video players in memory at any time — most of them out of view but still allocated. On low-end Android this peaked our RAM at 450MB and triggered OOM on Android 8 devices. The fix: use useIsFocused logic on each card and a custom isActiveIndex prop. Only the focused card holds the player; adjacent cards render a static thumbnail. Memory dropped ~30%, scroll became measurably smoother because GC pressure fell off.",
      },
      {
        type: "heading",
        text: "The Reanimated v4 New Architecture caveat",
      },
      {
        type: "text",
        text: "Reanimated v4 requires the New Architecture (Fabric + JSI). Some older libraries with class component patterns or imperative refs won't work cleanly with worklets. We had to drop two libraries and reimplement them: a custom carousel that used findNodeHandle (incompatible with Fabric) and a parallax library that mutated refs from outside Animated. If you're on RN < 0.74, evaluate Reanimated v3 first — v4's wins aren't worth a forced architecture migration if you're not already planning one.",
      },
      {
        type: "callout",
        text: "Rule of thumb on RN animation: if the animation depends on user input (scroll, gesture, drag), it should be a worklet. If it's a fire-and-forget transition (modal open, route change), Animated with useNativeDriver: true is enough. The cost of authoring worklets is real — strict syntax, harder debugging, runOnJS for any JS-side effect — but on low-end Android it's the only path to consistent 60fps.",
      },
    ],
  },
  {
    id: 13,
    slug: "mmkv-vs-asyncstorage-react-native",
    title:
      "MMKV vs AsyncStorage in React Native — Picking the Right Persistence Layer",
    excerpt:
      "When to use MMKV, when to stick with AsyncStorage, and how to migrate without losing user data. A practical comparison from running both in production on Soul33, plus the secure-storage gotcha you don't want to learn at submission time.",
    date: "Mar 2026",
    readTime: "6 min read",
    tags: ["React Native", "MMKV", "AsyncStorage", "Persistence"],
    domain: "mobile",
    content: [
      {
        type: "intro",
        text: "Persistence is one of those decisions you make at the start of a project and rarely revisit — which is exactly why it's worth getting right. AsyncStorage is the default, MMKV is the modern alternative, and SecureStore / Keychain is what you actually need for tokens. On Soul33 we used all three for different data, and I've seen enough mistakes to write this down.",
      },
      {
        type: "heading",
        text: "The numbers",
      },
      {
        type: "text",
        text: "AsyncStorage is asynchronous, JSON-only, and crosses the bridge for every read and write. On Android it's backed by SQLite; on iOS, by a serialized dictionary file. MMKV is synchronous, supports primitives + Buffers natively, and uses memory-mapped IO — meaning reads return at C++ speed without parsing JSON. In our benchmarks reading 1000 small keys: AsyncStorage ~310ms, MMKV ~6ms. For a single get, the difference is invisible; for a redux-persist rehydration on app cold start, it's the difference between a flash of empty UI and instant content.",
      },
      {
        type: "heading",
        text: "When AsyncStorage is the right call",
      },
      {
        type: "text",
        text: "When you only read state at boot (a couple of dispatches in your redux-persist hydration), AsyncStorage is fine. It's already in 90% of RN apps, its API is well known, and it ships with most templates. If you're building a small app or an MVP, the migration cost to MMKV isn't worth the perf you'll never measure. Default to AsyncStorage; reach for MMKV when there's a real reason.",
      },
      {
        type: "heading",
        text: "When MMKV pays off",
      },
      {
        type: "text",
        text: "Three signals push you to MMKV. First: many small reads on a hot path — feature flags read inside renderItem, A/B test buckets checked per screen, draft-state autosaves while typing. Second: large persisted state — Redux Persist payloads over ~500KB take AsyncStorage hundreds of milliseconds to rehydrate, with a visible loading flash on cold start. Third: structured data with shape that doesn't fit JSON neatly — counters, sets, binary blobs.",
      },
      {
        type: "code",
        label: "MMKV — typed wrapper for safer access",
        text: "import { MMKV } from 'react-native-mmkv';\n\nexport const storage = new MMKV({\n  id: 'soul33-default',\n  // Optional encryption — see security note below\n});\n\nexport const kv = {\n  getString:  (k: string)            => storage.getString(k) ?? null,\n  setString:  (k: string, v: string) => storage.set(k, v),\n  getBool:    (k: string)            => storage.getBoolean(k) ?? false,\n  setBool:    (k: string, v: boolean)=> storage.set(k, v),\n  getJSON:    <T>(k: string): T | null => {\n    const raw = storage.getString(k);\n    if (!raw) return null;\n    try { return JSON.parse(raw) as T; } catch { return null; }\n  },\n  setJSON:    (k: string, v: unknown)=> storage.set(k, JSON.stringify(v)),\n  remove:     (k: string)            => storage.delete(k),\n  clear:      ()                     => storage.clearAll(),\n};",
      },
      {
        type: "heading",
        text: "Migrating an existing app without losing data",
      },
      {
        type: "text",
        text: "Don't do a hard cutover. Migrate on demand: on app start, for each MMKV key the app needs, check MMKV first; if absent, read from AsyncStorage, write to MMKV, then return the value. After a few weeks you can ship a cleanup that wipes the legacy keys. This pattern survived a real user base on Soul33 with zero reports of lost preferences during the swap.",
      },
      {
        type: "code",
        label: "Lazy migration helper",
        text: "import AsyncStorage from '@react-native-async-storage/async-storage';\nimport { storage } from './mmkv';\n\nexport async function readWithMigration(key: string): Promise<string | null> {\n  const mmkvVal = storage.getString(key);\n  if (mmkvVal !== undefined) return mmkvVal;\n\n  const legacy = await AsyncStorage.getItem(key);\n  if (legacy !== null) {\n    storage.set(key, legacy);\n    return legacy;\n  }\n  return null;\n}",
      },
      {
        type: "heading",
        text: "What MMKV is not — secure storage",
      },
      {
        type: "text",
        text: "Neither MMKV nor AsyncStorage are secure. On a rooted/jailbroken device, both are trivially readable. Auth tokens, refresh tokens, biometric secrets, and anything regulated belongs in Keychain (iOS) / Keystore (Android) — accessible via react-native-keychain or expo-secure-store. MMKV supports symmetric encryption with a passed key, which is better than plaintext but still requires the key to live somewhere — typically Keychain. Use that combination only when you need encrypted bulk data; for individual secrets, Keychain alone is fine.",
      },
      {
        type: "heading",
        text: "Redux Persist + MMKV — the real win",
      },
      {
        type: "text",
        text: "redux-persist defaults to AsyncStorage. Swapping the storage adapter to MMKV via redux-persist-mmkv-storage cut Soul33's hydration time from ~280ms to under 20ms on cold start — the difference between a perceptible flash of empty home screen and the app simply being ready. If you only do one MMKV migration, do this one.",
      },
      {
        type: "callout",
        text: "Quick decision tree: tokens / passwords / biometrics → Keychain. Large persisted Redux state, hot-path reads, draft autosaves → MMKV. Small preferences, settings flags, last-route — either works, default to whatever the rest of the app uses. Don't introduce a third persistence layer unless there's a real reason.",
      },
    ],
  },
  {
    id: 14,
    slug: "fastlane-ci-cd-react-native",
    title:
      "CI/CD for React Native with Fastlane — From Commit to TestFlight & Play",
    excerpt:
      "How to wire Fastlane + GitHub Actions so every merge to main builds, signs, and ships a release candidate to TestFlight Internal and Play Internal Testing. Includes match for cert sync, the credentials JSON Play wants, and the cache that cuts build time by ~40%.",
    date: "Mar 2026",
    readTime: "8 min read",
    tags: ["React Native", "CI/CD", "Fastlane", "GitHub Actions", "Deployment"],
    domain: "mobile",
    content: [
      {
        type: "intro",
        text: "Manually archiving in Xcode and uploading AABs through Play Console gets old by the third release. On the EC Infosolutions React Native team we automated the entire iOS + Android release pipeline so a tagged commit ships a release candidate to TestFlight Internal and Play Internal Testing within ~18 minutes — and the on-call engineer's only job is approving the production promotion. Here's the exact setup.",
      },
      {
        type: "heading",
        text: "The shape of the pipeline",
      },
      {
        type: "text",
        text: "GitHub Actions on push of a v* tag → spin up macOS + Ubuntu runners → each runs Fastlane → iOS lane archives, signs, uploads to TestFlight; Android lane bundles, signs, uploads to Play Internal Testing. Build numbers auto-increment via the latest_testflight_build_number / google_play_track_version_codes APIs so engineers never edit Info.plist or build.gradle for releases. Slack notifies #releases on success or failure.",
      },
      {
        type: "heading",
        text: "Step 1 — Fastlane setup",
      },
      {
        type: "code",
        label: "Install + init",
        text: "# Run from project root\nbundle init\necho \"gem 'fastlane'\" >> Gemfile\nbundle install\n\n# Init Fastlane for iOS and Android\ncd ios && bundle exec fastlane init && cd ..\ncd android && bundle exec fastlane init && cd ..\n\n# This creates ios/fastlane/Fastfile, android/fastlane/Fastfile, and Appfile\n# Commit Fastfile + Appfile; .gitignore the auth artifacts they suggest",
      },
      {
        type: "heading",
        text: "Step 2 — Signing without losing your mind: match for iOS",
      },
      {
        type: "text",
        text: "fastlane match stores your iOS certificates and provisioning profiles in a private Git repo, encrypted with a passphrase. Every CI runner — and every team member's laptop — runs match development / match appstore once and gets the same certs. No more emailing .p12 files or hoping someone remembers the keychain password.",
      },
      {
        type: "code",
        label: "ios/fastlane/Matchfile + lane",
        text: "# ios/fastlane/Matchfile\ngit_url(\"git@github.com:your-org/ios-certificates-private.git\")\nstorage_mode(\"git\")\ntype(\"appstore\")\napp_identifier([\"com.yourcompany.yourapp\"])\nusername(\"ci@yourcompany.com\")\n\n# ios/fastlane/Fastfile\nplatform :ios do\n  lane :beta do\n    setup_ci if ENV['CI']                # creates a temp keychain on CI\n    match(type: 'appstore', readonly: true)\n    increment_build_number(\n      build_number: latest_testflight_build_number(\n        app_identifier: 'com.yourcompany.yourapp'\n      ) + 1,\n      xcodeproj: 'YourApp.xcodeproj'\n    )\n    build_app(\n      workspace: 'YourApp.xcworkspace',\n      scheme: 'YourApp',\n      export_method: 'app-store',\n      include_bitcode: false,\n    )\n    upload_to_testflight(\n      skip_waiting_for_build_processing: true,\n      changelog: ENV['CHANGELOG'] || 'CI release'\n    )\n  end\nend",
      },
      {
        type: "heading",
        text: "Step 3 — Android signing + Play Console API access",
      },
      {
        type: "text",
        text: "Android signing on CI needs your upload keystore + passwords loaded from secrets. For Play Console uploads, create a Service Account in Google Cloud → grant it Release Manager access in Play Console → download the JSON credentials file. Fastlane uses this to authenticate; without it you'd be uploading AABs manually forever.",
      },
      {
        type: "code",
        label: "android/fastlane/Fastfile",
        text: "platform :android do\n  lane :internal do\n    gradle(\n      task: 'bundle',\n      build_type: 'Release',\n      project_dir: '.',\n      properties: {\n        'android.injected.signing.store.file' => ENV['KEYSTORE_PATH'],\n        'android.injected.signing.store.password' => ENV['KEYSTORE_PASSWORD'],\n        'android.injected.signing.key.alias' => ENV['KEY_ALIAS'],\n        'android.injected.signing.key.password' => ENV['KEY_PASSWORD'],\n      }\n    )\n    upload_to_play_store(\n      track: 'internal',\n      aab: 'app/build/outputs/bundle/release/app-release.aab',\n      json_key_data: ENV['PLAY_SERVICE_ACCOUNT_JSON'],\n      release_status: 'completed',\n      skip_upload_metadata: true,\n      skip_upload_changelogs: true,\n      skip_upload_images: true,\n      skip_upload_screenshots: true,\n    )\n  end\nend",
      },
      {
        type: "heading",
        text: "Step 4 — GitHub Actions workflow",
      },
      {
        type: "code",
        label: ".github/workflows/release.yml (abridged)",
        text: "name: Release\n\non:\n  push:\n    tags: ['v*']\n\njobs:\n  ios:\n    runs-on: macos-14\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: 20, cache: 'yarn' }\n      - uses: ruby/setup-ruby@v1\n        with: { ruby-version: 3.2, bundler-cache: true }\n      - run: yarn install --frozen-lockfile\n      - run: cd ios && pod install\n      - name: Fastlane beta\n        env:\n          MATCH_PASSWORD: ${{ secrets.MATCH_PASSWORD }}\n          MATCH_GIT_BASIC_AUTHORIZATION: ${{ secrets.MATCH_GIT_AUTH }}\n          APP_STORE_CONNECT_API_KEY_KEY_ID: ${{ secrets.ASC_KEY_ID }}\n          APP_STORE_CONNECT_API_KEY_ISSUER_ID: ${{ secrets.ASC_ISSUER_ID }}\n          APP_STORE_CONNECT_API_KEY_KEY: ${{ secrets.ASC_KEY_P8 }}\n        run: cd ios && bundle exec fastlane beta\n\n  android:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: 20, cache: 'yarn' }\n      - uses: actions/setup-java@v4\n        with: { distribution: 'temurin', java-version: 17 }\n      - uses: ruby/setup-ruby@v1\n        with: { ruby-version: 3.2, bundler-cache: true }\n      - run: yarn install --frozen-lockfile\n      - name: Restore keystore\n        run: echo \"${{ secrets.KEYSTORE_BASE64 }}\" | base64 -d > android/app/release.keystore\n      - name: Fastlane internal\n        env:\n          KEYSTORE_PATH: ${{ github.workspace }}/android/app/release.keystore\n          KEYSTORE_PASSWORD: ${{ secrets.KEYSTORE_PASSWORD }}\n          KEY_ALIAS: ${{ secrets.KEY_ALIAS }}\n          KEY_PASSWORD: ${{ secrets.KEY_PASSWORD }}\n          PLAY_SERVICE_ACCOUNT_JSON: ${{ secrets.PLAY_SERVICE_ACCOUNT_JSON }}\n        run: cd android && bundle exec fastlane internal",
      },
      {
        type: "heading",
        text: "Step 5 — Cache aggressively or watch your bills",
      },
      {
        type: "text",
        text: "macOS minutes on GitHub Actions are 10× the price of Linux. Three caches cut our iOS build from 22 minutes to about 13: yarn cache (handled by setup-node), CocoaPods cache (cache ios/Pods + Podfile.lock), and DerivedData (cache ~/Library/Developer/Xcode/DerivedData keyed by the iOS project hash). On Android the Gradle cache + node_modules cache are the equivalent wins. Don't cache the .xcarchive — it's specific to each build and caching invalid archives is worse than re-building.",
      },
      {
        type: "heading",
        text: "App Store Connect API keys, not passwords",
      },
      {
        type: "text",
        text: "Stop using Apple ID + password (or app-specific passwords) in CI — they break with 2FA and are deprecated for upload. Generate an App Store Connect API key (Users and Access → Integrations → App Store Connect API), grant it Admin or App Manager access, download the .p8 file, and pass APP_STORE_CONNECT_API_KEY_KEY_ID, _ISSUER_ID, and _KEY contents as env vars. Fastlane picks them up automatically.",
      },
      {
        type: "callout",
        text: "Wins from automation, in order: humans never touch a keystore again (lower loss risk), build numbers can't drift (no more \"forgot to bump CFBundleVersion\" rejections), TestFlight gets a build per PR if you want it, and rollbacks are a re-tag away. Start with TestFlight Internal + Play Internal Testing only — promotion to Production is the one place humans still belong.",
      },
    ],
  },
  {
    id: 15,
    slug: "in-app-purchases-react-native",
    title:
      "In-App Purchases in React Native — Subscriptions on iOS + Android",
    excerpt:
      "Wiring App Store and Play Billing into a React Native app with react-native-iap or RevenueCat — covering product setup, server-side receipt validation, restore purchases, the introductory-offer trap on iOS, and why client-side entitlement is always a lie.",
    date: "May 2026",
    readTime: "9 min read",
    tags: ["React Native", "IAP", "Subscriptions", "Monetization"],
    domain: "mobile",
    content: [
      {
        type: "intro",
        text: "Soul33's tiered subscription — Free, Seeker, Mastery — was the revenue engine of the app. Built it twice: once with react-native-iap raw, once with RevenueCat after the second App Store rejection over receipt-validation behaviour. Both work. This post is the version of \"how IAP actually fits together\" I wish someone had handed me on day one.",
      },
      {
        type: "heading",
        text: "Why client-side entitlement is always wrong",
      },
      {
        type: "text",
        text: "Every IAP library will give you a quick path to \"the user has purchased X\" right in the app. Do not trust it. Jailbroken iOS devices return forged receipts. Android devices can be patched to return fake purchase tokens. Both platforms' SDKs hand you transaction data you must verify server-side against Apple's verifyReceipt endpoint or Google's purchases.subscriptions.get API. If your backend grants entitlement based on a client-side claim, you'll discover a healthy free-rider community within weeks of going live.",
      },
      {
        type: "heading",
        text: "Architecture: client buys, server entitles",
      },
      {
        type: "text",
        text: "The flow that survives audits and abuse: client initiates purchase → store returns a receipt / purchaseToken → client posts that to your backend → backend calls Apple/Google verification API → backend records the subscription state in your DB → backend returns the user's entitlement → client unlocks features based on the SERVER response, not the SDK. Receipt validation is also where you record auto-renewal status, grace periods, and billing retry windows.",
      },
      {
        type: "heading",
        text: "Product setup the dashboards make easy to mess up",
      },
      {
        type: "text",
        text: "On App Store Connect, every subscription belongs to a Subscription Group — you can only own ONE subscription per group at a time. Most apps want a single group containing all tiers (Free isn't a product; the others are). If you put each tier in its own group, users can subscribe to two tiers simultaneously and Apple will let them. On Google Play Console, subscriptions live under Monetize → Subscriptions, with each tier having a base plan and offers. The product IDs you pick are immutable — pick clear ones (seeker_monthly, seeker_yearly), never reuse them across environments.",
      },
      {
        type: "heading",
        text: "react-native-iap — the raw path",
      },
      {
        type: "code",
        label: "Subscribe flow with react-native-iap",
        text: "import {\n  initConnection,\n  endConnection,\n  getSubscriptions,\n  requestSubscription,\n  purchaseUpdatedListener,\n  finishTransaction,\n  type Subscription,\n  type SubscriptionPurchase,\n} from 'react-native-iap';\n\nconst SKUS = Platform.select({\n  ios: ['seeker_monthly', 'mastery_monthly'],\n  android: ['seeker_monthly', 'mastery_monthly'],\n}) ?? [];\n\nexport async function startBilling() {\n  await initConnection();\n  const subs: Subscription[] = await getSubscriptions({ skus: SKUS });\n\n  const sub = purchaseUpdatedListener(async (purchase: SubscriptionPurchase) => {\n    const receipt = purchase.transactionReceipt;\n    // Send receipt + productId to backend; await entitlement decision\n    const { entitled } = await api.post('/iap/validate', {\n      platform: Platform.OS,\n      productId: purchase.productId,\n      receipt,\n      purchaseToken: purchase.purchaseToken, // Android only\n    });\n\n    if (entitled) {\n      await finishTransaction({ purchase, isConsumable: false });\n    }\n  });\n\n  return () => {\n    sub.remove();\n    endConnection();\n  };\n}",
      },
      {
        type: "heading",
        text: "RevenueCat — the pragmatic path",
      },
      {
        type: "text",
        text: "If your business is selling subscriptions, RevenueCat is worth its 1% take. It handles platform receipt validation, subscription state caching, cross-platform entitlement (a user who buys on iOS keeps their entitlement on Android), introductory offer eligibility, and webhook delivery on renewals/refunds/grace-period entries. We rebuilt Soul33's IAP on RevenueCat in two days and deleted ~600 lines of backend validation code. The trade-off: another vendor in your stack and a recurring cost — but for most teams the time saved pays for itself within the first quarter.",
      },
      {
        type: "code",
        label: "Minimal RevenueCat setup",
        text: "import Purchases, { PurchasesOffering } from 'react-native-purchases';\n\nexport async function configureBilling(userId: string) {\n  Purchases.configure({\n    apiKey: Platform.OS === 'ios'\n      ? 'appl_xxx_revcat_public_key'\n      : 'goog_xxx_revcat_public_key',\n    appUserID: userId,   // your backend's user ID — never the email\n  });\n\n  const offerings = await Purchases.getOfferings();\n  return offerings.current; // contains all available packages\n}\n\nexport async function purchase(pkg: PurchasesOffering['availablePackages'][number]) {\n  const { customerInfo } = await Purchases.purchasePackage(pkg);\n  return customerInfo.entitlements.active['premium'] != null;\n}\n\nexport async function restorePurchases() {\n  const customerInfo = await Purchases.restorePurchases();\n  return customerInfo.entitlements.active;\n}",
      },
      {
        type: "heading",
        text: "Restore Purchases — required by both stores",
      },
      {
        type: "text",
        text: "Apple and Google require a visible Restore Purchases button on any screen where you ask the user to subscribe. App Store reviewers test this — if it's missing or non-functional, your app is rejected within hours. Restore is also how a user moves to a new device while keeping their subscription. With react-native-iap, call getAvailablePurchases() and re-validate each receipt with your backend. With RevenueCat, restorePurchases() handles it.",
      },
      {
        type: "heading",
        text: "Introductory offers — the trap",
      },
      {
        type: "text",
        text: "On iOS, a user is eligible for an introductory offer (free trial, intro pricing) once per Subscription Group. If they already used the trial on Seeker and then upgrade to Mastery in the same group, they get standard pricing, not another trial. Your UI must reflect this — querying is_eligible_for_intro_offer via StoreKit's getIntroductoryOfferEligibility and only showing the trial copy when true. Showing \"Free 7-day trial\" to someone Apple will charge full price is a guaranteed support ticket.",
      },
      {
        type: "heading",
        text: "Sandbox testing — and why it always feels broken",
      },
      {
        type: "text",
        text: "iOS sandbox subscriptions auto-renew aggressively — a monthly subscription renews every 5 minutes, and after 5 renewals it cancels and you start over. Use a Sandbox tester account from App Store Connect, sign out of your real Apple ID in Settings → Media & Purchases. On Android, add license testers in Play Console → License Testing for fake purchases to work in unpublished apps. Sandbox doesn't perfectly mirror production — promotional offers and family sharing behave differently in sandbox. Always do a final test with TestFlight Internal + real card.",
      },
      {
        type: "callout",
        text: "Quick decision: if subscriptions are core to your business and you have <2 senior engineers, use RevenueCat. If you have specific compliance requirements (data residency, custom receipt logic) or you've already invested in receipt-validation infra, use react-native-iap. Either way: server-side entitlement only, visible Restore button, accurate introductory-offer eligibility, and webhook your renewal events into your CRM from day one — retention work without renewal data is guesswork.",
      },
    ],
  },
];

const blogsWithMeta: Blog[] = blogs.map((b, i) => ({
  ...b,
  color: BLOG_PALETTE[i % BLOG_PALETTE.length],
  icon: BLOG_ICONS[i % BLOG_ICONS.length],
}));

export default blogsWithMeta;
