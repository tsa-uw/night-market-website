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
| `lantern-200`    | `#ffe6ab` | Secondary text, time stamps                  |
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
| Display       | **TenPounds** (custom OTF)      | `style={{ fontFamily: '"TenPounds", "Georgia", serif' }}` inline — section titles, hero H1 |
| Fallback      | Georgia, serif                  | `--font-display` in `@theme`       |
| Body          | Inter, system-ui, sans-serif    | `--font-body`, default everywhere  |

**TenPounds** is a custom font loaded in `src/index.css` via `@font-face`. Always
apply it via inline `style` prop because Tailwind's `font-display` utility maps
to Georgia, not TenPounds.

### Type Scale Patterns
- Hero H1: `text-6xl` → `md:text-8xl`, TenPounds
- Section titles: `text-5xl` → `md:text-6xl`, TenPounds
- Headliner name: `text-3xl` → `md:text-4xl`, TenPounds
- Body / descriptions: `text-base` or `text-sm`, Inter
- Badges / labels: `text-xs`, `tracking-[0.2em]–[0.25em]`, `uppercase`

---

## Surface & Glass Patterns

### Standard section card
```
bg-night-800/50 border border-night-600/50 rounded-xl backdrop-blur-sm
hover: border-blossom-400/35 bg-night-700/55 shadow-[0_0_32px_rgba(244,92,141,0.13)]
```

### Headliner / featured card
```
bg-night-800/60 border border-lantern-300/20 rounded-2xl backdrop-blur-sm
hover: border-lantern-300/40 shadow-[0_0_40px_rgba(255,208,106,0.1)]
inner glow: bg-linear-to-br from-lantern-400/5 via-transparent to-transparent
```

### Badge / pill
```
rounded-full border border-lantern-100/30 bg-night-900/40 px-4 py-1
text-xs font-semibold tracking-[0.25em] text-lantern-100/85 uppercase backdrop-blur-md
```

### Section background (used inside Section.tsx and custom sections)
```
bg-linear-to-b from-night-900/70 via-night-900/95 to-night-800/95
+ ambient orb top-left:  bg-blossom-400/8–10  blur-3xl  h-96 w-96
+ ambient orb bot-right: bg-lantern-400/10    blur-3xl  h-80 w-80
```

---

## Glow & Shadow Patterns

| Element              | Shadow / glow value                                      |
|----------------------|----------------------------------------------------------|
| Blossom node (idle)  | `shadow-[0_0_6px_rgba(244,92,141,0.4)]`                  |
| Blossom node (hover) | `shadow-[0_0_10px_rgba(244,92,141,0.75)]`                |
| Gold orb (idle)      | `shadow-[0_0_14px_rgba(255,208,106,0.7)]`                |
| Headliner card hover | `shadow-[0_0_40px_rgba(255,208,106,0.1)]`                |
| Hero H1 text         | `drop-shadow-[0_8px_30px_rgba(0,0,0,0.55)]`              |
| Section H2 text      | `drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)]`              |

Always prefer `box-shadow` / `drop-shadow` for glow rather than outlines.

---

## Animations

All keyframes live in `src/index.css`. Tokens are in `@theme`.

| Name                  | Token / usage                                    | Description                            |
|-----------------------|--------------------------------------------------|----------------------------------------|
| `hero-darken`         | `animate-hero-darken`                            | Background overlay fades in on load    |
| `hero-fade-in`        | `animate-hero-fade-in`                           | Hero content slides up + fades in      |
| `hero-fade-in-late`   | `animate-hero-fade-in-late`                      | Scroll indicator (delayed)             |
| `float-particle`      | inline `animation` style (duration varies)       | Particles drift bottom → top           |
| `timeline-scan`       | inline `animation` style, 5 s loop              | Glow orb travels down timeline line    |
| `node-pulse-gold`     | `animate-node-pulse-gold`                        | Gold orb breathes on headliner card    |
| `shimmer-sweep`       | `animate-shimmer-sweep`                          | Diagonal shine sweeps on hover         |

**Scroll-reveal pattern** (used on timeline, cards, etc.):
Use `IntersectionObserver` with `threshold: 0.15`, then toggle opacity 0→1 and
`translateX/Y` via inline `style` with a CSS `transition`. Stagger siblings with
`delay: i * 0.04s`.

---

## Component Layout Conventions

### Section wrapper (generic)
`Section.tsx` — use for most sections. Provides `border-t`, `py-16 md:py-24`,
inner max-width `max-w-6xl`, and the standard ambient orbs.

### Hero
Full-height (`min-h-screen`), uses raw `<section>` (bypasses Section.tsx),
`overflow-hidden`, `isolate`. Background image with two overlay divs for the
gradient darken.

### Schedule / narrow-content sections
Use raw `<section>` for full background control. Content capped at `max-w-xl`
centered inside `max-w-5xl`.

### Timeline layout trick
```
<div class="relative ml-28">        ← 7 rem left margin = time-column space
  <div class="absolute -left-px…"/> ← the vertical line at x=0
  <li class="relative pl-8">        ← content starts 2 rem right of line
    <time class="absolute right-full mr-4 w-24"/> ← floats left into the 7 rem
    <node class="absolute left-0 -translate-x-1/2"/> ← centered on the line
  </li>
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

**Don't:**
- Use pure white (`#fff`) — always reach for `lantern-100` or `warm-white`
- Use hard drop shadows (black box-shadows) — use colored glow shadows instead
- Use `bg-gradient-to-*` — in Tailwind v4 the canonical form is `bg-linear-to-*`
- Use `flex-shrink-0` — in Tailwind v4 use `shrink-0`
