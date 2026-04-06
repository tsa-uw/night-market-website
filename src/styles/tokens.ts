/**
 * Site-wide style tokens.
 * Change colors, typography, or borders here and they update everywhere.
 */

// ── Primitives ────────────────────────────────────────────────────────────────

export const text = {
    subheading: "font-semibold text-black",
    body:       "leading-normal text-[18px] font-[400] tracking-wide text-black/80",
    muted:      "text-black/50",
} as const;

export const border = {
    default: "border border-black",
} as const;

export const layout = {
    pagePadding: "px-4 md:px-6",
} as const;

// ── Section shared ────────────────────────────────────────────────────────────

export const section = {
    title:      "mb-2 text-center font-display text-4xl font-bold tracking-wide text-black md:text-6xl",
    titleWhite: "mb-2 text-center font-display text-4xl font-bold tracking-wide text-white md:text-6xl",
} as const;

// ── Components ────────────────────────────────────────────────────────────────

export const footer = {
    wrapper: `${layout.pagePadding} border-t border-black py-8 text-center text-sm text-black/40`,
} as const;

export const about = {
    wrapper:    "relative flex items-center justify-center overflow-hidden bg-white p-0 text-center",
    bgWrap:     "absolute inset-4 overflow-hidden",
    bg:         "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full object-cover md:h-auto md:w-[200%] md:min-h-[150%]",
    overlay:    "absolute inset-4 bg-black/70",
    content:    "relative z-10 py-[200px] px-8 md:px-76",
    heading:    "font-display text-4xl font-bold leading-[1.2] text-white mb-2 md:text-6xl",
    body:       "leading-normal text-[18px] font-[400] tracking-wide text-white/80",
} as const;

export const hero = {
    section:         `relative flex min-h-screen flex-col overflow-hidden ${layout.pagePadding} pb-12 pt-16`,
    eyebrow:         "mb-3 text-sm font-semibold uppercase tracking-widest text-white/60",
    heading:         "font-display text-6xl font-bold leading-[1.2] text-white md:text-8xl",
    metaRow:         "mt-4 flex items-center justify-between gap-6 text-white",
    metaGroup:       "flex flex-col gap-1 sm:flex-row sm:gap-6",
    metaItem:        "text-base font-medium",
    metaDivider:     "hidden sm:block opacity-40",
    cover:           "absolute inset-0 bg-black transition-opacity duration-1000",
    scrollIndicator: "animate-bounce",
    scrollIcon:      "h-6 w-6 text-white/70",
} as const;

export const details = {
    outerWrapper:   "bg-white",
    wrapper:        "px-4 pb-4",
    grid:           "grid gap-4 md:grid-cols-3",
    card:           "relative overflow-hidden",
    cardBgWrap:     "absolute inset-0 overflow-hidden",
    cardBg:         "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-auto min-h-[150%]",
    cardOverlay:    "absolute inset-0 bg-black/70",
    cardContent:    "relative z-10 py-16 px-8 text-center",
    cardLabel:      "mb-4 text-sm font-semibold uppercase tracking-widest text-white/60",
    cardValue:      "text-base leading-relaxed text-white",
    cardValueMuted: "text-base leading-relaxed text-white/60",
    cardValueGroup: "space-y-2",
} as const;

export const schedule = {
    grid:          "grid border-l border-t border-black sm:grid-cols-2 lg:grid-cols-3",
    card:          "overflow-hidden border-r border-b border-black",
    cardImage:     "relative h-64 w-full overflow-hidden",
    artistLogo:    "absolute bottom-3 left-3 h-12 w-12 rounded-full object-cover shadow-lg",
    cardBody:      "p-6",
    cardHeader:    "flex flex-wrap items-start justify-between gap-2",
    cardTitle:     "text-lg font-semibold text-black",
    badgeGroup:    "flex flex-wrap gap-2",
    badgeTime:     "border border-black px-3 py-1 text-xs font-medium text-black/80",
    badgeDuration: "border border-black px-3 py-1 text-xs font-medium text-black/60",
    cardNote:      "mt-1 text-xs font-medium uppercase tracking-wide text-black/50",
    cardDesc:      "mt-3 text-sm leading-relaxed text-black/70",
} as const;

export const vendors = {
    tabs:             "mb-8 flex justify-center gap-4",
    tabActive:        "rounded-full px-6 py-2 text-sm font-semibold transition-colors bg-pink-400 text-white",
    tabInactive:      "rounded-full px-6 py-2 text-sm font-semibold transition-colors border border-black text-black/90 hover:border-pink-400/40",
    grid:             "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
    card:             "rounded-xl p-6",
    cardImage:        "mb-4 h-32 w-full overflow-hidden rounded-lg",
    cardImg:          "h-full w-full object-cover transition-transform group-hover:scale-105",
    cardImageFallback: "flex h-full items-center justify-center text-sm text-black/60",
    cardName:         "mb-1 font-display text-lg font-semibold text-white",
    cardDesc:         "text-sm text-black/80",
} as const;

export const sponsors = {
    description: "mb-8 text-center text-black/85",
    grid:        "grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-6",
    card:        "flex h-28 items-center justify-center rounded-xl border border-black overflow-hidden",
    logo:        "h-full max-h-20 w-auto object-contain",
    fallback:    "text-sm text-white/75",
} as const;

export const volunteer = {
    wrapper:     "mx-auto max-w-2xl",
    description: `mb-8 text-center leading-relaxed ${text.body}`,
    stepHeading: `mb-4 font-display text-xl ${text.subheading}`,
    stepList:    "space-y-3",
    step:        "flex items-start gap-4",
    stepNum:     `mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center ${border.default} text-xs font-bold ${text.muted}`,
} as const;

export const faq = {
    wrapper:  "mx-auto max-w-2xl",
    item:     "border-b border-black",
    button:   "flex w-full items-center justify-between py-4 text-left",
    question: "pr-4 font-medium text-black/90",
    icon:     "h-5 w-5 shrink-0 text-black/50 transition-transform",
    answer:   "pb-4 text-sm leading-relaxed text-black/80",
} as const;

export const eventTrailer = {
    frame:           "aspect-video w-full overflow-hidden rounded-xl border border-black",
    placeholder:     "flex h-full items-center justify-center text-black/50",
    placeholderText: "text-lg",
} as const;

export const raffle = {
    section: "bg-black !py-[240px]",
    wrapper: "mx-auto max-w-2xl rounded-xl text-center",
    body:    "text-lg leading-relaxed text-white/80",
} as const;
