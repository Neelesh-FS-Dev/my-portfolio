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
      "How enabling the New React Native Architecture improved Soul33's runtime performance by 40% — a real migration story covering JSI, Fabric, TurboModules, and the 40+ library audit I did before touching a single line.",
    date: "Feb 2024",
    readTime: "8 min read",
    tags: ["React Native", "Performance", "Architecture", "TypeScript"],
    color: "#00e5ff",
    icon: "⚡",
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
    color: "#7c4dff",
    icon: "🔌",
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
    color: "#ff6b35",
    icon: "🎭",
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
    color: "#00ff88",
    icon: "🔄",
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

  // ── WEB ─────────────────────────────────────────────────────
  {
    id: 5,
    slug: "nextjs-vs-vite",
    title: "Next.js vs Vite + React: When to Choose What",
    excerpt:
      "A practical, opinionated comparison of Next.js and Vite + React based on shipping both in production — covering SSR, SSG, bundle size, DX, and the exact decision matrix I now use on every project.",
    date: "Oct 2023",
    readTime: "7 min read",
    tags: ["Next.js", "Vite", "React", "Web Performance"],
    color: "#7c4dff",
    icon: "🌐",
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
    color: "#00ff88",
    icon: "🎨",
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
        text: "export default {\n  content: ['./src/**/*.{ts,tsx}'],\n  theme: {\n    extend: {\n      colors: {\n        brand: {\n          primary:   '#00e5ff',\n          secondary: '#7c4dff',\n          accent:    '#00ff88',\n        },\n        surface: {\n          DEFAULT: 'rgba(255,255,255,0.04)',\n          hover:   'rgba(255,255,255,0.08)',\n        },\n      },\n      fontFamily: {\n        display: ['Plus Jakarta Sans', 'sans-serif'],\n        mono:    ['JetBrains Mono', 'monospace'],\n      },\n      boxShadow: {\n        glow:     '0 0 24px rgba(0,229,255,0.2)',\n        'glow-lg': '0 0 48px rgba(0,229,255,0.15)',\n      },\n    },\n  },\n} satisfies Config;",
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
];

export default blogs;
