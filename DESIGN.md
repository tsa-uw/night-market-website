# UW Night Market — Design Reference

## Vibe & Aesthetic

Night market at dusk. Warm lantern glow against a deep indigo sky. The palette
is dark and immersive with pops of blossom-pink and lantern-gold — think paper
lanterns, festival lights, and cherry blossoms at night. Every section should
feel like you're stepping deeper into the event grounds.

---

## Color Palette

All tokens are defined in `src/index.css` under `@theme`.

### Night (backgrounds & surfaces)
| Token          | Hex       | Usage                                      |
|----------------|-----------|--------------------------------------------|
| `night-900`    | `#060910` | Page background, deepest layer             |
| `night-800`    | `#0e1424` | Card backgrounds, elevated surfaces        |
| `night-700`    | `#19233a` | Borders, dividers                          |
| `night-600`    | `#29344f` | Subtle borders, hover states               |
| `night-500`    | `#3f4f73` | Muted UI elements                          |

### Blossom (accent — pink/rose)
| Token            | Hex       | Usage                                        |
|------------------|-----------|----------------------------------------------|
| `blossom-400`    | `#f45c8d` | Primary accent, timeline nodes, glows        |
| `blossom-300`    | `#ff89ad` | Hover/active states, lighter glows           |
| `blossom-200`    | `#ffb8cc` | Soft accents, subtle tints                   |

### Lantern (accent — warm gold/amber)
| Token            | Hex       | Usage                                        |
|------------------|-----------|----------------------------------------------|
| `lantern-100`    | `#fff5db` | Primary text on dark backgrounds             |
| `lantern-200`    | `#ffe6ab` | Secondary text, time stamps on hover         |
| `lantern-300`    | `#ffd06a` | Active/highlighted text, small icons         |
| `lantern-400`    | `#fbb848` | Buttons, badges, warm highlights             |
| `lantern-500`    | `#e4961d` | Deeper gold, borders on lantern elements     |

### Other
| Token          | Hex       | Usage                        |
|----------------|-----------|------------------------------|
| `warm-white`   | `#f6efdf` | Default body text            |
| `gold`         | `#c68a46` | Decorative gold accents      |

---

## Typography

| Role          | Font                            | Where set                         |
|---------------|---------------------------------|------------------------------------|
| Display       | **TenPounds** (custom OTF)      | `style={{ fontFamily: '"TenPounds", "Georgia", serif' }}` inline — all section titles, hero H1 |
| Fallback      | Georgia, serif                  | `--font-display` in `@theme`       |
| Body          | Inter, system-ui, sans-serif    | `--font-body`, default everywhere  |

**TenPounds** is a custom font loaded in `src/index.css` via `@font-face`. Always
apply it via inline `style` prop — Tailwind's `font-display` utility maps to
Georgia, not TenPounds. `Section.tsx` already does this on its `<h2>`.

### Type Scale Patterns
- Hero H1: `text-6xl` → `md:text-8xl`, TenPounds
- Section titles (generic via Section.tsx): `text-3xl` → `md:text-4xl`, TenPounds
- Custom section titles (Schedule, etc.): `text-5xl` → `md:text-6xl`, TenPounds
- Headliner name: `text-3xl` → `md:text-4xl`, TenPounds
- Card headings: `text-xl font-semibold text-lantern-100` (no TenPounds)
- Body / descriptions: `text-base` or `text-sm text-warm-white/75`, Inter
- Badges / labels: `text-xs`, `tracking-[0.2em]–[0.25em]`, `uppercase`
- Time stamps (idle): `text-sm tabular-nums text-lantern-300/65`
- Time stamps (active/hover): `text-lantern-200`

---

## Surface & Glass Patterns

### Standard section card
```
bg-night-800/50 border border-night-600/50 rounded-xl backdrop-blur-sm
transition-all duration-300
hover: border-blossom-400/35 bg-night-700/55 shadow-[0_0_32px_rgba(244,92,141,0.13)]
```

### Lantern-tinted card (vendors, raffle)
```
bg-night-800/50 border border-lantern-400/30 rounded-xl backdrop-blur-sm
transition-all duration-300
hover: border-lantern-400/50 shadow-[0_0_32px_rgba(251,184,72,0.1)]
```

### Headliner / featured card
```
bg-night-800/60 border border-lantern-300/20 rounded-2xl backdrop-blur-sm
transition-all duration-500
hover: border-lantern-300/40 shadow-[0_0_40px_rgba(255,208,106,0.1)]
inner glow: bg-linear-to-br from-lantern-400/5 via-transparent to-transparent
shimmer: diagonal shine sweep via animate-shimmer-sweep on group-hover
```

### Badge / pill
```
rounded-full border border-lantern-100/30 bg-night-900/40 px-4 py-1
text-xs font-semibold tracking-[0.25em] text-lantern-100/85 uppercase backdrop-blur-md
```

### Active tab button
```
bg-blossom-400 text-night-900 shadow-[0_0_16px_rgba(244,92,141,0.35)]
```
Note: use `text-night-900` not `text-white` — pure white is a hard don't.

### Inactive tab button
```
border border-night-600/50 text-warm-white/75
hover: border-blossom-400/40 text-warm-white
```

### Section background (used inside Section.tsx and custom sections)
```
bg-linear-to-b from-night-900/70 via-night-900/95 to-night-800/95
+ ambient orb top-left:  bg-blossom-400/8–10  blur-3xl  h-96 w-96
+ ambient orb bot-right: bg-lantern-400/10    blur-3xl  h-80 w-80
```

---

## Glow & Shadow Patterns

| Element                    | Shadow / glow value                                              |
|----------------------------|------------------------------------------------------------------|
| Blossom node (idle)        | `bg-blossom-400` (full opacity) + `shadow-[0_0_8px_rgba(244,92,141,0.7)]`  |
| Blossom node (hover)       | `bg-blossom-300` + `shadow-[0_0_0_2px_rgba(244,92,141,0.35),0_0_16px_rgba(244,92,141,1)]` |
| Gold orb (idle)            | `shadow-[0_0_14px_rgba(255,208,106,0.7)]`                        |
| Headliner card hover       | `shadow-[0_0_40px_rgba(255,208,106,0.1)]`                        |
| Sponsor card hover         | `shadow-[0_0_24px_rgba(251,184,72,0.1)]`                         |
| Hero H1 text               | `drop-shadow-[0_8px_30px_rgba(0,0,0,0.55)]`                      |
| Section H2 text            | `drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)]`                      |

The hover node shadow uses a two-value composite: a tight ring (`0 0 0 2px`) plus
an outer bloom (`0 0 16px`). Always prefer this over a single-value glow for nodes.

Timeline line: `w-0.5` (2px), full-opacity `from-blossom-400` at top. A 1px semi-transparent line is nearly invisible — use at least 2px.

Timeline scan beam: `w-1.5 h-14`, `radial-gradient` with full-opacity pink core fading to transparent, `blur(2px)`. No white hot-core — too intense against the dark background.

---

## Animations

All keyframes live in `src/index.css`. Tokens are in `@theme`.

| Name                  | Token / usage                              | Description                            |
|-----------------------|--------------------------------------------|----------------------------------------|
| `hero-darken`         | `animate-hero-darken`                      | Background overlay fades in on load    |
| `hero-fade-in`        | `animate-hero-fade-in`                     | Hero content slides up + fades in      |
| `hero-fade-in-late`   | `animate-hero-fade-in-late`                | Scroll indicator (delayed)             |
| `float-particle`      | inline style, duration varies per particle | Particles drift bottom → top (Schedule)|
| `timeline-scan`       | inline style, `5s ease-in-out 2s infinite` | Glow orb travels down timeline line    |
| `node-pulse-gold`     | `animate-node-pulse-gold`                  | Gold orb breathes on headliner card    |
| `shimmer-sweep`       | `animate-shimmer-sweep`                    | Diagonal shine sweeps across on hover  |

**Scroll-reveal pattern** (used on timeline rows, cards, etc.):
Use `IntersectionObserver` with `threshold: 0.15`, then toggle `opacity` 0→1 and
`translateX/Y` via inline `style` + CSS `transition`. Stagger siblings with
`delay: i * 0.04s`.

### Hover animation philosophy
**Prefer smooth, physical motion over clicky opacity-only transitions.**

The right layering for a hover interaction:
1. **Background** — slide in with `translateX(-100%) → 0` inside an `overflow-hidden`
   wrapper, `duration-500 ease-out`. Never just fade with opacity.
2. **Structural lines/bars** — `scale-y-0 → scale-y-100` with `origin-center`,
   `duration-300 ease-out`. Grows outward from the middle.
3. **Nodes/dots** — `scale-[1.5]` bloom + two-layer shadow (ring + glow),
   `duration-300 ease-out`.
4. **Text / secondary elements** — small `translate` nudge (0.5–1rem) + color
   change, `duration-200 ease-out`. Fastest so it feels immediately responsive.

Stagger durations by role: **200ms** focal text → **300ms** structural → **500ms**
ambient background. Always `ease-out` on hover-in.

---

## Component Layout Conventions

### Section wrapper (generic)
`Section.tsx` — use for most sections. Provides `border-t border-night-700/75`,
`py-16 md:py-24`, inner max-width `max-w-6xl`, standard ambient orbs, and
TenPounds on the `<h2>` title via inline style.

### Hero
Full-height (`min-h-screen`), raw `<section>` (bypasses Section.tsx),
`overflow-hidden isolate`. Background image + two overlay divs for gradient darken.

### Schedule / narrow-content sections
Raw `<section>` for full background control. Content capped at `max-w-xl`
centered inside `max-w-5xl`.

### Timeline layout trick
```
<div class="relative ml-28">           ← 7 rem left = time-column space
  <div class="absolute -left-px …"/>   ← vertical gradient line at x=0
  <li class="relative pl-8">           ← content starts 2 rem right of line
    <time class="absolute right-full mr-4 w-24"/> ← floats left into the 7 rem
    <node class="absolute left-0 -translate-x-1/2"/> ← centered on the line
  </li>
</div>
```

### FAQ accordion animation
Use the CSS grid-rows trick for smooth height transitions — no JS height
calculation needed:
```tsx
<div className={`grid transition-all duration-300 ease-in-out
  ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
  <div className="overflow-hidden">{content}</div>
</div>
```

---

## Do's and Don'ts

**Do:**
- Layer multiple orbs/blobs at different opacities rather than one strong one
- Use `backdrop-blur-sm` on any card that floats over content
- Always pair a blossom glow with a lantern glow for visual warmth balance
- Use TenPounds only for headings — never for body text or UI labels
- Keep badge text `uppercase` with wide tracking (`tracking-[0.2em]+`)
- Use `ease-out` on hover transitions so they feel responsive, not mechanical
- Use `scale` + `translate` as the primary motion driver for hover interactions
- Use `text-night-900` on filled blossom buttons (never `text-white`)

**Don't:**
- Use pure white (`#fff`) — always reach for `lantern-100` or `warm-white`
- Use hard drop shadows (black box-shadows) — use colored glow shadows instead
- Use `bg-gradient-to-*` — in Tailwind v4 the canonical form is `bg-linear-to-*`
- Use `flex-shrink-0` — in Tailwind v4 use `shrink-0`
- Use `font-bold` with TenPounds — the font has its own visual weight
- Use `blossom-500` for UI accents — it's too dark/saturated; prefer `blossom-400`
- Rely on opacity-only transitions for hover — add translate/scale motion too
