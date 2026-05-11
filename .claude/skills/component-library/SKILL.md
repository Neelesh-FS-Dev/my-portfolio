---
name: component-library
description: How to integrate 21st.dev (and similar) component snippets into this portfolio — adapt to design tokens, replace placeholder copy, wire framer-motion entrance animations.
---

# Component Library Integration (21st.dev)

[21st.dev](https://21st.dev) is a registry of production-ready UI components. This skill covers how to drop one in cleanly without polluting the codebase.

## When to use 21st.dev

- New section type the codebase doesn't already have (pricing table, FAQ accordion, marquee logos, bento grid, comparison table).
- You need a polished interaction pattern (command menu, toast stack, animated tabs).
- You want a starting point for layout exploration.

**Do not** reach for 21st.dev when an existing component covers the use case (e.g. another card grid, hero, contact form, blog list — those already exist).

## Workflow

1. **Browse** [21st.dev](https://21st.dev) and copy a component's source.
2. **Drop it** into a new file under the matching feature folder, e.g. `src/features/<feature>/components/<NewComponent>.tsx`.
3. **Tell Claude Code**: paste the snippet and use a prompt like:

   > Integrate this 21st.dev component as `<NewComponent>` under `src/features/<feature>/components/`. Adapt it to our design tokens (`frontend-design` skill), replace placeholder copy with content from `src/shared/data/<source>.ts`, and add framer-motion entrance animations using `<Reveal>` / `<RevealStagger>` from `src/shared/components/motion`.

4. **Review against the design skill** (`.claude/skills/frontend-design/SKILL.md`) — every snippet needs adaptation.

## Adaptation checklist

When porting any third-party snippet:

### 1. Strip the framework dependency
- Most 21st.dev components ship as Tailwind + shadcn. **This project does not use Tailwind.**
- Convert `className="text-sm font-medium text-gray-500"` → inline `style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text3)" }}`.
- If the snippet uses shadcn primitives (`Button`, `Card`, `Dialog`), replace with the project's own button classes (`.btn .btn-primary`) or inline-styled equivalents.

### 2. Map colors to tokens
| Snippet color | This project |
|---|---|
| `bg-white` / `bg-gray-50` | `var(--surface)` |
| `bg-gray-900` / `bg-black` | `var(--bg)` / `var(--bg2)` |
| `text-gray-900` | `var(--text)` |
| `text-gray-600` / `text-gray-500` | `var(--text2)` / `var(--text3)` |
| `border-gray-200` | `var(--border)` |
| Brand accent (blue/violet/etc.) | `var(--accent)` |

Never keep the snippet's original palette. **One accent color, period.**

### 3. Map spacing to the 8px scale
- `p-4` (16px) ✅ keep as `padding: 16`.
- `p-5` (20px) ✅ keep as `padding: 20`.
- `p-7` (28px) → snap to `28`.
- Anything outside our scale (`2  4  6  8  10  12  14  16  18  20  22  24  26  28  32  40  44  52  56  72  120`) → snap to nearest.

### 4. Map typography
- All sans → `var(--font-display)` or `var(--font-body)`.
- Any mono / monospace → `var(--font-mono)`.
- Eyebrows/labels: uppercase, 11px, `letter-spacing: 0.3em`, mono.
- Hero/display headings: `var(--font-cinematic)` only when the section warrants it.

### 5. Replace lorem-ipsum content
Pull real content from `src/shared/data/`:
- `personal.ts` — name, role, contact, stats
- `services.ts` — service offerings
- `caseStudies.ts` — case-study cards
- `proofStats.ts` — numbers
- `testimonials.ts` — quotes
- `resume.ts` — work history
- `projects/data/projects.ts` — project entries
- `blogs/data/blogs.ts` — blog posts

If the new component needs data the codebase doesn't have, add a new file to `src/shared/data/` (typed) — never inline content into the component.

### 6. Wire framer-motion
- Wrap the component's outer container in `<Reveal preset="fadeUp">` or `<RevealStagger stagger={0.08}>`.
- For child items (cards in a grid, rows in a list), give each a `variants={fadeUp}` (or `scaleIn` / `popIn`).
- Add `whileHover` + `whileTap` to interactive children using `hoverLiftTarget` / `tapTarget` from the motion library.
- Strip out any animation library the snippet shipped with (Motion One, GSAP, AOS) — framer-motion only.

### 7. Strip dead code
- Remove unused props, fixture data arrays, demo state, and Storybook decorators that ship with snippets.
- Remove `// TODO`, `// FIXME`, and demo comments — keep the file lean.

### 8. Verify
- Run `yarn build` — must pass without TS errors.
- Open the page in dev (`yarn dev`) and check: hover states feel snappy, scroll-in fires once, mobile layout stacks correctly, no horizontal scroll.

## Example: prompt template

When asking Claude Code to integrate a snippet, use this template:

> Here's a 21st.dev `<ComponentName>` snippet:
> ```tsx
> [paste snippet]
> ```
>
> Integrate it as `src/features/home/components/<ComponentName>.tsx`. Apply the adaptation checklist from `.claude/skills/component-library/SKILL.md`:
> - Convert Tailwind to inline styles + design tokens.
> - Use real content from `src/shared/data/<source>.ts`.
> - Wrap in `<RevealStagger>` with `fadeUp` children.
> - Add `whileHover={{ y: -4 }}` on cards.
> - Mount it in `Home.tsx` between `<Section A>` and `<Section B>`.
>
> Then run `yarn build` to confirm.

## Anti-patterns

- **Don't paste raw Tailwind into a `className`.** It won't style anything (no Tailwind in this project) and it pollutes the file.
- **Don't keep the snippet's color palette.** It will clash with the monochromatic theme.
- **Don't import shadcn/ui or Radix primitives wholesale.** Replicate just what you need with inline styles.
- **Don't ship lorem-ipsum copy.** Replace before merge.
- **Don't skip the framer-motion wiring.** Static drops feel out of place next to the rest of the site.
