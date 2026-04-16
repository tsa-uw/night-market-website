import { useEffect, useRef, useState } from "react";

// Deterministic particle data — no random values at runtime
const PARTICLES = [
    { left: 12, dur: 22, delay: 0, size: 2, gold: false },
    { left: 28, dur: 18, delay: 4, size: 3, gold: true },
    { left: 45, dur: 26, delay: 2, size: 2, gold: false },
    { left: 63, dur: 20, delay: 7, size: 3, gold: true },
    { left: 78, dur: 24, delay: 1, size: 2, gold: false },
    { left: 35, dur: 19, delay: 9, size: 2, gold: true },
    { left: 55, dur: 28, delay: 3, size: 3, gold: false },
    { left: 88, dur: 21, delay: 6, size: 2, gold: true },
    { left: 20, dur: 25, delay: 11, size: 2, gold: false },
    { left: 70, dur: 17, delay: 5, size: 3, gold: true },
    { left: 8, dur: 23, delay: 8, size: 2, gold: false },
    { left: 93, dur: 29, delay: 13, size: 2, gold: true },
] as const;

interface ScheduleEvent {
    time: string;
    title: string;
    headliner?: boolean;
}

const SCHEDULE_EVENTS: ScheduleEvent[] = [
    { time: "4:30 PM", title: "Intro" },
    { time: "4:33 PM", title: "Husky Wushu" },
    { time: "4:50 PM", title: "TSA Food Eating Contest" },
    { time: "5:08 PM", title: "We Are Taiwan I" },
    { time: "5:21 PM", title: "Last Chance" },
    { time: "5:39 PM", title: "We Are Taiwan II" },
    { time: "5:52 PM", title: "Mak Fai Dragon and Lion Dance Association" },
    { time: "6:07 PM", title: "Intermission & Sponsor Speeches" },
    { time: "6:27 PM", title: "Remi Vernon" },
    { time: "6:43 PM", title: "VSA Moonlit Dance Crew" },
    { time: "6:49 PM", title: "Divine Dance Crew" },
    { time: "7:02 PM", title: "VSA Moonlit Dance Crew" },
    { time: "7:06 PM", title: "Step Up Dance Crew" },
    { time: "7:19 PM", title: "Apex Diabolo" },
    { time: "7:30 PM", title: "PRYVT", headliner: true },
];

const regularEvents = SCHEDULE_EVENTS.filter((e) => !e.headliner);
const headlinerEvent = SCHEDULE_EVENTS.find((e) => e.headliner)!;

export default function Schedule() {
    const [visible, setVisible] = useState<boolean[]>(() =>
        new Array(regularEvents.length).fill(false),
    );
    const [headlinerVisible, setHeadlinerVisible] = useState(false);
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
    const headlinerRef = useRef<HTMLDivElement>(null);

    // Scroll-triggered reveal
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    if (entry.target === headlinerRef.current) {
                        setHeadlinerVisible(true);
                        return;
                    }

                    const idx = itemRefs.current.findIndex(
                        (ref) => ref === entry.target,
                    );
                    if (idx !== -1) {
                        setVisible((prev) => {
                            const next = [...prev];
                            next[idx] = true;
                            return next;
                        });
                    }
                });
            },
            { threshold: 0.15 },
        );

        const refs = [...itemRefs.current];
        refs.forEach((ref) => ref && observer.observe(ref));
        if (headlinerRef.current) observer.observe(headlinerRef.current);

        return () => {
            refs.forEach((ref) => ref && observer.unobserve(ref));
            if (headlinerRef.current) observer.unobserve(headlinerRef.current);
        };
    }, []);

    return (
        <section
            id="schedule"
            className="relative overflow-hidden border-t border-night-700/75 px-4 py-20 md:py-32"
        >
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 -z-20 bg-linear-to-b from-night-900/70 via-night-900/95 to-night-800/95" />

            {/* Static ambient orbs */}
            <div
                className="pointer-events-none absolute inset-0 -z-10"
                aria-hidden="true"
            >
                <div className="absolute top-0 left-[10%] h-96 w-96 rounded-full bg-blossom-400/8 blur-3xl" />
                <div className="absolute bottom-[15%] right-[8%] h-80 w-80 rounded-full bg-lantern-400/10 blur-3xl" />
                <div className="absolute top-[40%] left-[40%] h-120 w-120 rounded-full bg-blossom-300/6 blur-[80px]" />
            </div>

            {/* Floating particles — like drifting lanterns */}
            <div
                className="pointer-events-none absolute inset-0 overflow-hidden"
                aria-hidden="true"
            >
                {PARTICLES.map((p, i) => (
                    <div
                        key={i}
                        className="absolute bottom-0 rounded-full"
                        style={{
                            left: `${p.left}%`,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            background: p.gold
                                ? "rgba(255,208,106,0.85)"
                                : "rgba(244,92,141,0.85)",
                            boxShadow: p.gold
                                ? `0 0 ${p.size * 4}px 1px rgba(255,208,106,0.6)`
                                : `0 0 ${p.size * 4}px 1px rgba(244,92,141,0.6)`,
                            animation: `float-particle ${p.dur}s linear ${p.delay}s infinite`,
                        }}
                    />
                ))}
            </div>

            <div className="mx-auto max-w-5xl">
                {/* Section header */}
                <div className="mb-16 text-center">
                    <span className="inline-flex rounded-full border border-lantern-100/30 bg-night-900/40 px-4 py-1 text-xs font-semibold tracking-[0.25em] text-lantern-100/85 uppercase backdrop-blur-md">
                        May 23, 2026
                    </span>
                    <h2
                        className="mt-5 text-5xl leading-tight text-lantern-100 drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)] md:text-6xl"
                        style={{ fontFamily: '"TenPounds", "Georgia", serif' }}
                    >
                        Entertainment Schedule
                    </h2>
                    <p className="mt-3 text-base tracking-wide text-warm-white/50">
                        A night of culture, performances &amp; celebration
                    </p>
                </div>

                {/* Compact timeline */}
                <div className="mx-auto max-w-xl">
                    {/*
                     * ml-28 (7rem) reserves space for the time column.
                     * Time:  absolute, right-full w-24 mr-4  → exactly fills the 7 rem.
                     * Line:  absolute at x = 0 of this div   → 7 rem from container edge.
                     * Node:  absolute left-0 -translate-x-1/2 → centered on the line.
                     */}
                    <div className="relative ml-28">
                        {/* Gradient line */}
                        <div
                            className="pointer-events-none absolute -left-px top-3 bottom-3 w-px bg-linear-to-b from-blossom-400/60 via-lantern-400/40 to-transparent"
                            aria-hidden="true"
                        />

                        {/*
                         * Scanner glow — a radial orb that travels from top to
                         * bottom of the line.  The wrapper matches the line's
                         * inset-y span; `top: 0%→100%` is relative to that
                         * wrapper, so it always covers exactly the line length.
                         */}
                        <div
                            className="pointer-events-none absolute inset-y-0 left-0 w-0"
                            aria-hidden="true"
                        >
                            <div
                                className="absolute -translate-x-1/2 h-14 w-1 rounded-full"
                                style={{
                                    background:
                                        "radial-gradient(ellipse at center, rgba(244,92,141,0.95) 0%, rgba(244,92,141,0.35) 45%, transparent 70%)",
                                    filter: "blur(1.5px)",
                                    animation:
                                        "timeline-scan 5s ease-in-out 2s infinite",
                                }}
                            />
                        </div>

                        <ol>
                            {regularEvents.map(({ time, title }, i) => {
                                const isVisible = visible[i];
                                const delay = `${i * 0.045}s`;

                                return (
                                    <li
                                        key={i}
                                        ref={(el) => {
                                            itemRefs.current[i] = el;
                                        }}
                                        className="group relative flex items-center py-[0.65rem] pl-8"
                                        style={{
                                            opacity: isVisible ? 1 : 0,
                                            transform: isVisible
                                                ? "translateX(0)"
                                                : "translateX(10px)",
                                            transition: `opacity 0.5s ease ${delay}, transform 0.5s ease ${delay}`,
                                        }}
                                    >
                                        {/* Hover background sweep — gradient from left edge */}
                                        <div className="pointer-events-none absolute inset-y-0.5 -left-28 right-0 rounded-r-md opacity-0 transition-opacity duration-250 group-hover:opacity-100 bg-linear-to-r from-blossom-400/10 via-blossom-400/5 to-transparent" />

                                        {/* Left accent bar */}
                                        <div className="pointer-events-none absolute -left-28 top-0.5 bottom-0.5 w-px rounded-full bg-blossom-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

                                        {/* Time */}
                                        <time className="absolute right-full mr-4 w-24 text-right text-sm tabular-nums font-medium text-lantern-300/65 transition-colors duration-200 group-hover:text-lantern-200">
                                            {time}
                                        </time>

                                        {/* Node */}
                                        <div className="absolute left-0 z-10 h-[0.625rem] w-[0.625rem] -translate-x-1/2 rounded-full bg-blossom-400/55 shadow-[0_0_6px_rgba(244,92,141,0.4)] transition-all duration-250 group-hover:bg-blossom-300 group-hover:shadow-[0_0_10px_rgba(244,92,141,0.75)]" />

                                        {/* Title */}
                                        <span className="text-[0.9375rem] leading-relaxed text-warm-white/70 transition-colors duration-200 group-hover:text-warm-white">
                                            {title}
                                        </span>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>

                    {/* Bridge connector — links timeline to headliner */}
                    <div
                        className="ml-28 flex flex-col items-center"
                        style={{ width: 1 }}
                    >
                        <div className="h-6 w-px bg-linear-to-b from-lantern-400/50 to-transparent" />
                    </div>

                    {/* Headliner card */}
                    <div
                        ref={headlinerRef}
                        className="group relative overflow-hidden rounded-2xl border border-lantern-300/20 bg-night-800/60 p-5 backdrop-blur-sm transition-all duration-500 hover:border-lantern-300/40 hover:shadow-[0_0_40px_rgba(255,208,106,0.1)]"
                        style={{
                            opacity: headlinerVisible ? 1 : 0,
                            transform: headlinerVisible
                                ? "translateY(0)"
                                : "translateY(16px)",
                            transition:
                                "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s, border-color 0.5s, box-shadow 0.5s",
                        }}
                    >
                        {/* Ambient gold glow inside card */}
                        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-lantern-400/5 via-transparent to-transparent transition-opacity duration-500 group-hover:opacity-150" />

                        {/* Shimmer sweep on hover */}
                        <div
                            className="pointer-events-none absolute inset-0 -translate-x-full opacity-0 group-hover:animate-shimmer-sweep"
                            style={{
                                background:
                                    "linear-gradient(105deg, transparent 35%, rgba(255,208,106,0.08) 50%, transparent 65%)",
                            }}
                        />

                        <div className="relative flex items-center justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2.5">
                                    <span className="rounded-full border border-lantern-300/45 bg-lantern-400/12 px-2.5 py-0.5 text-[0.6rem] font-bold tracking-[0.22em] text-lantern-200 uppercase">
                                        Headliner
                                    </span>
                                    <time className="text-sm tabular-nums font-medium text-lantern-300/75">
                                        {headlinerEvent.time}
                                    </time>
                                </div>
                                <p
                                    className="mt-2 text-3xl font-bold text-lantern-100 drop-shadow-[0_2px_14px_rgba(255,208,106,0.35)] md:text-4xl"
                                    style={{
                                        fontFamily:
                                            '"TenPounds", "Georgia", serif',
                                    }}
                                >
                                    {headlinerEvent.title}
                                </p>
                            </div>

                            {/* Decorative music note orb */}
                            <div className="relative hidden h-14 w-14 shrink-0 sm:block">
                                <div className="animate-node-pulse-gold absolute inset-0 rounded-full bg-lantern-300/20 blur-lg" />
                                <div className="relative z-10 flex h-full w-full items-center justify-center rounded-full border border-lantern-300/35 bg-lantern-400/10">
                                    <svg
                                        className="h-5 w-5 text-lantern-300"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
