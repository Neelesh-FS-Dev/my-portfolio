---
name: frontend-design
description: Design system and visual taste for this portfolio — typography, spacing, color, motion, and component patterns. Reference whenever building or editing UI.
---

# Frontend Design — Portfolio

This portfolio uses a **monochromatic dark theme with a single blue accent**. The aesthetic is editorial / FAANG-engineering (Vercel, Linear, Anthropic) — restrained, technical, confident. Avoid the generic AI-template look (gradient slop, rainbow accents, glassmorphism overload, emojis as decoration).

All tokens live in `src/app/index.css` under `:root` — **never hardcode hex values**. Use `var(--token)`.

---

## Color tokens

```
--bg          #000000   page background
--bg2         #0a0a0a   alternating section background
--surface     #0f0f0f   cards, inputs
--surface2    #161616   raised surfaces (mockups)
--border      #1f1f1f   default border
--border-bright #2a2a2a focused/hover border base

--accent      #3b82f6   the only chromatic color in the system
--accent-glow rgba(59,130,246,0.45)
--accent-glow-soft rgba(59,130,246,0.18)

--text   #f5f5f5   primary text
--text2  #a8a8a8   secondary text / body
--text3  #6e6e6e   labels, captions, monospace meta
```

Rules:
- Exactly **one** accent color. `--accent2`, `--accent3`, `--green` are aliases that resolve to `--accent` — do not introduce new chromatic accents.
- Status colors (success / warning / danger) are inline RGBA — `#22c55e` for "Live", `#f59e0b` for "Beta". Use sparingly for status pills only, never for primary UI.
- Glow / shadow tints always use `rgba(59,130,246, ...)`.

## Typography

```
--font-display    Geist               headings, body, UI
--font-body       Geist               (alias of display)
--font-mono       Geist Mono          labels, eyebrows, technical meta, small print
--font-cinematic  Bebas Neue          oversized hero display
--font-syne       Syne Mono           specialty accent (use sparingly)
```

Type scale (responsive `clamp` is preferred for hero/section titles):

| Role | Size | Weight | Family | Spacing |
|---|---|---|---|---|
| Hero display | `clamp(52px, 6.4vw, 92px)` | 400 | cinematic | `0.012em` |
| Section title (`.section-title`) | `clamp(32px, 5.5vw, 64px)` | 600 | display | `-0.035em` |
| H2 (card heading) | 22–28 | 700–800 | display | `-0.02em` |
| H3 / featured card | 18–22 | 700 | display | `-0.01em` |
| Body | 14–15 | 400 | body | normal, line-height 1.7 |
| Small body | 13–14 | 400 | body | normal |
| Section eyebrow (`.section-label`) | 11 | 400 | mono UPPER | `0.3em` |
| Inline meta / badge | 10–11 | 400 | mono | `0.04–0.1em` |

Rules:
- **Display fonts get tight tracking** (`-0.02em` to `-0.035em`).
- **Mono fonts get loose tracking** (`0.04em` to `0.3em`) and are used for eyebrows, badges, code-like labels — never for body copy.
- Line-height for body: 1.6–1.75. For headings: 0.94–1.25 depending on size.
- Numerals in stat blocks: `--font-display`, weight 800, big size, `letter-spacing: -0.02em`.

## Spacing system

8px-rooted, with 2/4/6 micro-tokens for inline gaps. Common values used in the codebase:

```
2  4  6  8  10  12  14  16  18  20  22  24  26  28  32  40  44  52  56  72  120
```

- Card padding: `22 / 26` (compact) → `28 / 32 / 40` (featured).
- Inline gap inside a card: 10–18.
- Grid gap: 14 / 16 / 18 / 24.
- Section vertical padding: handled by `.section` (120 desktop → 56 mobile).
- Container: `.container` = max 1200px, padding 32 → 20 → 16.

Never invent random pixel values. If a value isn't in the scale, snap to the nearest.

## Borders & radius

- Cards: `border-radius: 14` (compact), `16` (standard), `20–22` (featured/large).
- Pills, chips, buttons: `border-radius: 100`.
- Avatars / icon tiles: `10–14`.
- Border default: `1px solid var(--border)`.
- Hover/focus border: `1px solid rgba(59,130,246, 0.25–0.55)`.

## Buttons

Two variants only:

- **`.btn .btn-primary`** — gradient-blue fill, dark text. Lifts and glows on hover.
- **`.btn .btn-outline`** — translucent surface with blue-tinted border. Uses `backdrop-filter: blur(8px)`.

Rules:
- Primary buttons should be the only call-to-action per section (e.g. "Hire Me", "View Projects").
- Always wrap interactive nav/CTA links in a `motion.div` or `motion.a` with `whileHover={hoverLiftTarget}` and `whileTap={tapTarget}` from `shared/components/motion`.
- Padding: `9px 20px` (small), `10px 22px` (default), `14px 28px` (oversized).

## Cards

Standard card recipe:

```tsx
<motion.div
  variants={fadeUp}                        // when inside RevealStagger
  whileHover={{
    y: -6,
    borderColor: "rgba(59,130,246,0.35)",
    boxShadow: "0 18px 44px rgba(0,0,0,0.32), 0 0 24px rgba(59,130,246,0.08)",
  }}
  transition={hoverLift}
  style={{
    padding: 26,
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 14,
    willChange: "transform",
  }}
>
```

- Featured/glass cards use the `.glass .glass-hover` utilities instead of inline styles.
- Cards must have either a hover lift (`-4` to `-6` y) OR a magnetic effect (`useMagnetic`), not both.

## Motion

All scroll-in and hover animations go through **framer-motion**. Use the primitives in `src/shared/components/motion`:

- `<Reveal preset="fadeUp">` — single scroll-triggered fade.
- `<RevealStagger stagger={0.08}>` — orchestrates child variants with stagger.
- Variants: `fadeUp` / `fadeIn` / `scaleIn` / `slideRight` / `slideLeft` / `popIn`.
- Tokens: `hoverLift` (transition), `hoverLiftTarget` (`y: -4`), `hoverGrowTarget` (`scale: 1.04`), `tapTarget` (`scale: 0.97`).

Rules:
- **Easing**: `[0.16, 1, 0.3, 1]` (exported as `easing`). Snap-into-place feel. For pop-ins, use `[0.34, 1.56, 0.64, 1]`.
- **Duration**: 0.4–0.7s for reveals; 0.25–0.35s for hover/tap.
- Hover transitions are spring-based (stiffness 380, damping 26) for snap.
- Ambient continuous animations (particle floats, breathing glow, marquee, pulse, shimmer) stay in CSS `@keyframes` — do not migrate those to framer-motion.
- `MagneticButton` and the cinematic `Cursor` keep using GSAP `quickTo` — do not replace.
- Always gate motion via `useReducedMotion()` (the `Reveal` / `RevealStagger` primitives already handle this).

## Layout patterns

- **Section header**: `.section-label` eyebrow (numbered like `01 /`) → `.section-title` heading → optional CTA on the right (flex justify-between, align-end).
- **Stat block**: 2/4/6-column grid of `(value, label, [sublabel])`. Value uses display weight 800, accent color, tight tracking.
- **Tech pills**: `.tech-pill` — small mono badge in a wrapped flex row, gap 5–8.
- **Hero**: 2-col grid (text + visual) on desktop, stacked on mobile. Hero text is the only place where `--font-cinematic` appears.

## Accessibility & performance

- All interactive elements get a visible focus state (`:focus-visible` with accent outline).
- `aria-label` on icon-only buttons. `aria-live="polite"` on dynamically-updating regions (typewriter, carousel counter).
- Carousels support keyboard arrows + touch swipe.
- Lazy-load anything that pulls in `three` / `@react-three/fiber` (`Phone3D`, particle WebGL canvases). The home page already does this — replicate the pattern for any new heavy visual.
- Images should use `LazyImage` from `shared/components/ui`.
- Honor `prefers-reduced-motion` everywhere.

## Anti-patterns (do not do)

- Don't import a new icon set when `react-icons` already covers it.
- Don't reach for a new font, color, or radius when a token exists.
- Don't add hover handlers that mutate `e.currentTarget.style` directly — use framer-motion `whileHover`.
- Don't use `useReveal` (deleted). Use `<Reveal>` or `<RevealStagger>`.
- Don't ship cards without a hover state on desktop. Static cards read as placeholders.
- Don't use emojis as UI affordances. Iconography only.
- Don't add a CSS framework (Tailwind, etc.). The project uses inline styles + `index.css` utilities deliberately.
