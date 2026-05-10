import { Clock, MapPin, Plane, Ticket, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Section from "../layout/Section";
import OptimizedImage from "../media/OptimizedImage";

function AirlineLogo() {
    return (
        <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[10px] border border-[rgba(251,184,72,0.2)] bg-[rgba(251,184,72,0.07)]">
            <OptimizedImage
                src="/alaska_airlines_eskimo-logo.png"
                alt="Alaska Airlines"
                className="h-11 w-11 object-contain"
            />
        </div>
    );
}

function ScallopEdge({ flip = false }: { flip?: boolean }) {
    const d = flip
        ? "M0,0 Q10,10 20,0 Q30,10 40,0 Q50,10 60,0 Q70,10 80,0 Q90,10 100,0 Q110,10 120,0 Q130,10 140,0 Q150,10 160,0 Q170,10 180,0 Q190,10 200,0 Q210,10 220,0 Q230,10 240,0 Q250,10 260,0 Q270,10 280,0 Q290,10 300,0 Q310,10 320,0 Q330,10 340,0 Q350,10 360,0 Q370,10 380,0 Q390,10 400,0 Q410,10 420,0 Q430,10 440,0 Q450,10 460,0 Q470,10 480,0 Q490,10 500,0 Q510,10 520,0 Q530,10 540,0 Q550,10 560,0 Q570,10 580,0 Q590,10 600,0 Q610,10 620,0 Q630,10 640,0 Q650,10 660,0 Q670,10 680,0 Q690,10 700,0 Q710,10 720,0 Q730,10 740,0 Q750,10 760,0 Q770,10 780,0 V10 H0Z"
        : "M0,10 Q10,0 20,10 Q30,0 40,10 Q50,0 60,10 Q70,0 80,10 Q90,0 100,10 Q110,0 120,10 Q130,0 140,10 Q150,0 160,10 Q170,0 180,10 Q190,0 200,10 Q210,0 220,10 Q230,0 240,10 Q250,0 260,10 Q270,0 280,10 Q290,0 300,10 Q310,0 320,10 Q330,0 340,10 Q350,0 360,10 Q370,0 380,10 Q390,0 400,10 Q410,0 420,10 Q430,0 440,10 Q450,0 460,10 Q470,0 480,10 Q490,0 500,10 Q510,0 520,10 Q530,0 540,10 Q550,0 560,10 Q570,0 580,10 Q590,0 600,10 Q610,0 620,10 Q630,0 640,10 Q650,0 660,10 Q670,0 680,10 Q690,0 700,10 Q710,0 720,10 Q730,0 740,10 Q750,0 760,10 Q770,0 780,10 V0 H0Z";

    return (
        <svg
            className={`pointer-events-none absolute left-0 right-0 z-[2] block w-full ${flip ? "-bottom-px" : "-top-px"}`}
            height="10"
            viewBox="0 0 780 10"
            preserveAspectRatio="none"
        >
            <path d={d} fill="#060910" />
        </svg>
    );
}

function TicketGlowTrace({
    wrapperRef,
}: {
    wrapperRef: React.RefObject<HTMLDivElement | null>;
}) {
    const [dims, setDims] = useState<{ w: number; h: number } | null>(null);

    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;
        const ro = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setDims({ w: width, h: height });
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, [wrapperRef]);

    if (!dims || dims.w <= 0 || dims.h <= 0) return null;

    const rx = Math.min(11, dims.w / 2, dims.h / 2);
    const { w, h } = dims;
    const perimeter =
        2 * (w - 2 - 2 * rx) + 2 * (h - 2 - 2 * rx) + 2 * Math.PI * rx;
    const segLen = Math.round(perimeter * 0.06);
    const gap = Math.round(perimeter - segLen);

    const anim = "ticket-trace 8s ease-in-out 2s infinite";
    const rect = { x: 1, y: 1, width: w - 2, height: h - 2, rx, ry: rx } as const;

    return (
        <svg
            className="pointer-events-none absolute inset-0 z-5 h-full w-full"
            style={{ overflow: "visible" }}
            aria-hidden="true"
        >
            {/* Outermost diffuse halo */}
            <rect
                {...rect} fill="none"
                stroke="rgba(251,184,72,0.05)"
                strokeWidth="28"
                strokeDasharray={`${segLen} ${gap}`}
                strokeLinecap="round"
                style={{ strokeDashoffset: perimeter, animation: anim, filter: "blur(14px)" }}
            />
            {/* Mid bloom */}
            <rect
                {...rect} fill="none"
                stroke="rgba(251,184,72,0.1)"
                strokeWidth="12"
                strokeDasharray={`${segLen} ${gap}`}
                strokeLinecap="round"
                style={{ strokeDashoffset: perimeter, animation: anim, filter: "blur(6px)" }}
            />
            {/* Inner glow */}
            <rect
                {...rect} fill="none"
                stroke="rgba(251,184,72,0.22)"
                strokeWidth="4"
                strokeDasharray={`${segLen} ${gap}`}
                strokeLinecap="round"
                style={{ strokeDashoffset: perimeter, animation: anim, filter: "blur(2px)" }}
            />
            {/* Bright core */}
            <rect
                {...rect} fill="none"
                stroke="rgba(251,184,72,0.7)"
                strokeWidth="1"
                strokeDasharray={`${segLen} ${gap}`}
                strokeLinecap="round"
                style={{ strokeDashoffset: perimeter, animation: anim }}
            />
        </svg>
    );
}

type Accent = "lantern" | "blossom";

interface InfoCardData {
    Icon: LucideIcon;
    title: string;
    accent: Accent;
    body: ReactNode;
}

const em = "font-semibold text-warm-white/95";

const ACCENT: Record<
    Accent,
    {
        card: string;
        notch: string;
        label: string;
        iconBox: string;
        title: string;
        tear: string;
    }
> = {
    lantern: {
        card: "border-lantern-400/15 hover:border-lantern-400/30 hover:shadow-[0_0_24px_rgba(251,184,72,0.07)]",
        notch: "border-lantern-400/15",
        label: "text-[rgba(251,184,72,0.5)]",
        iconBox: "border-lantern-400/15 bg-[rgba(251,184,72,0.07)] text-[rgba(251,184,72,0.7)]",
        title: "text-lantern-100",
        tear: "rgba(251,184,72,0.25)",
    },
    blossom: {
        card: "border-blossom-400/20 hover:border-blossom-400/35 hover:shadow-[0_0_24px_rgba(244,92,141,0.09)]",
        notch: "border-blossom-400/20",
        label: "text-[rgba(244,92,141,0.55)]",
        iconBox: "border-blossom-400/20 bg-[rgba(244,92,141,0.09)] text-blossom-300",
        title: "text-blossom-100",
        tear: "rgba(244,92,141,0.3)",
    },
};

const INFO_CARDS: InfoCardData[] = [
    {
        Icon: Trophy,
        title: "Drawing & Winners",
        accent: "blossom",
        body: (
            <>
                Winning tickets drawn <strong className={em}>on the main stage</strong> at{" "}
                <strong className={em}>8:35 PM</strong> in Red Square. Winners must be present and show matching ticket to claim prize.
            </>
        ),
    },
    {
        Icon: MapPin,
        title: "Where to Buy",
        accent: "lantern",
        body: (
            <>
                Purchase at the <strong className={em}>TSA Information Booth</strong> on the day of the event. Sales open at{" "}
                <strong className={em}>4:30 PM</strong> and close at <strong className={em}>8:00 PM</strong>.
            </>
        ),
    },
    {
        Icon: Ticket,
        title: "Multiple Entries",
        accent: "lantern",
        body: (
            <>
                Buy as many tickets as you like —{" "}
                <strong className={em}>each ticket is one entry</strong> for one plane ticket. More tickets = more chances to win!
            </>
        ),
    },
];

const DETAIL_CELLS = [
    { label: "Destination", value: "Anywhere AS flies" },
    { label: "Class", value: "Round-Trip Airfare" },
    { label: "Entries", value: "1 ticket = 1 entry" },
] as const;

export default function RaffleTickets() {
    const ticketRef = useRef<HTMLDivElement>(null);

    return (
        <Section id="raffle" title="Raffle Tickets">
            {/* Ticket */}
            <div ref={ticketRef} className="relative mx-auto mb-8 max-w-195 rounded-xl shadow-[0_8px_48px_rgba(0,0,0,0.55),0_0_32px_rgba(251,184,72,0.08),0_0_64px_rgba(244,92,141,0.06)] transition-shadow duration-350 ease-in-out hover:shadow-[0_12px_56px_rgba(0,0,0,0.65),0_0_48px_rgba(251,184,72,0.18),0_0_80px_rgba(244,92,141,0.12)]">
                    <TicketGlowTrace wrapperRef={ticketRef} />
                <div className="relative flex overflow-hidden rounded-xl border border-[rgba(251,184,72,0.18)] bg-night-800">
                    <ScallopEdge />
                    <ScallopEdge flip />

                    {/* Body */}
                    <div className="relative flex-1 overflow-hidden p-6 sm:p-10">
                        {/* Grid texture */}
                        <div
                            className="pointer-events-none absolute inset-0"
                            style={{
                                backgroundImage:
                                    "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
                                backgroundSize: "32px 32px",
                            }}
                        />
                        {/* Blossom warmth */}
                        <div className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full bg-blossom-400/10 blur-3xl" />

                        {/* Header */}
                        <div className="relative mb-6 flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <AirlineLogo />
                                <div>
                                    <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[rgba(251,184,72,0.65)]">
                                        Grand Prize · Sponsored by
                                    </div>
                                    <div
                                        className="text-[26px] leading-snug tracking-wide text-lantern-100"
                                        style={{ fontFamily: '"TenPounds", "Georgia", serif' }}
                                    >
                                        Alaska Airlines Round-Trip
                                    </div>
                                </div>
                            </div>
                            <span className="shrink-0 whitespace-nowrap rounded-full border border-[rgba(244,92,141,0.3)] bg-[rgba(244,92,141,0.1)] px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-blossom-300">
                                2 Winners
                            </span>
                        </div>

                        {/* Detail cells — boarding-pass fields */}
                        <div className="relative mb-6 grid grid-cols-3 divide-x divide-dashed divide-[rgba(251,184,72,0.18)] overflow-hidden rounded-lg border border-dashed border-[rgba(251,184,72,0.18)] bg-[rgba(251,184,72,0.025)]">
                            {DETAIL_CELLS.map(({ label, value }) => (
                                <div key={label} className="p-3 sm:p-4">
                                    <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[rgba(251,184,72,0.6)]">
                                        {label}
                                    </div>
                                    <div className="inline-block border-b border-dotted border-[rgba(251,184,72,0.3)] pb-0.5 text-sm font-semibold text-lantern-100 sm:text-base">
                                        {value}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Divider */}
                        <div
                            className="relative mb-6 h-px"
                            style={{
                                background: "linear-gradient(90deg, transparent, rgba(251,184,72,0.2), transparent)",
                            }}
                        />

                        {/* Bottom row */}
                        <div className="relative flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-baseline gap-2">
                                <span
                                    className="text-4xl leading-none text-lantern-300"
                                    style={{ fontFamily: '"TenPounds", "Georgia", serif' }}
                                >
                                    $3
                                </span>
                                <span className="text-sm text-warm-white/55">per ticket</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="flex items-center gap-1.5 rounded-md border border-dashed border-[rgba(251,184,72,0.2)] bg-[rgba(251,184,72,0.04)] px-3 py-1.5 text-xs text-warm-white/70">
                                    <Ticket size={13} aria-hidden="true" />
                                    TSA Info Booth
                                </span>
                                <span className="flex items-center gap-1.5 rounded-md border border-dashed border-[rgba(251,184,72,0.2)] bg-[rgba(251,184,72,0.04)] px-3 py-1.5 text-xs text-warm-white/70">
                                    <Clock size={13} aria-hidden="true" />
                                    Sales close 8:00 PM
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Perforation */}
                    <div
                        className="relative z-[3] w-[2px] shrink-0"
                        style={{
                            background:
                                "repeating-linear-gradient(to bottom, transparent 0px, transparent 6px, rgba(251,184,72,0.25) 6px, rgba(251,184,72,0.25) 12px)",
                        }}
                    >
                        <div className="absolute -top-2.5 left-1/2 z-[4] h-5 w-5 -translate-x-1/2 rounded-full border border-[rgba(251,184,72,0.2)] bg-night-900" />
                        <div className="absolute -bottom-2.5 left-1/2 z-[4] h-5 w-5 -translate-x-1/2 rounded-full border border-[rgba(251,184,72,0.2)] bg-night-900" />
                    </div>

                    {/* Stub — hidden on mobile */}
                    <div className="relative hidden w-[120px] shrink-0 flex-col items-center justify-between gap-3 bg-[rgba(6,9,16,0.4)] px-4 py-7 sm:flex">
                        <div
                            className="pointer-events-none absolute top-0 left-0 right-0 h-[3px] opacity-40"
                            style={{
                                background: "linear-gradient(90deg, transparent, #fbb848, transparent)",
                            }}
                        />
                        <span
                            className="text-[8px] font-semibold uppercase tracking-[0.3em] text-warm-white/35"
                            style={{
                                writingMode: "vertical-lr",
                                textOrientation: "mixed",
                                transform: "rotate(180deg)",
                            }}
                        >
                            Night Market
                        </span>
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[rgba(251,184,72,0.15)] bg-[rgba(251,184,72,0.06)] text-[rgba(251,184,72,0.5)]">
                            <Plane size={20} aria-hidden="true" />
                        </div>
                        <span
                            className="text-3xl leading-none text-lantern-400/65"
                            style={{
                                fontFamily: '"TenPounds", "Georgia", serif',
                                writingMode: "vertical-lr",
                                textOrientation: "mixed",
                                transform: "rotate(180deg)",
                                letterSpacing: "0.08em",
                            }}
                        >
                            #
                        </span>
                        <span
                            className="text-[8px] font-semibold uppercase tracking-[0.3em] text-warm-white/35"
                            style={{
                                writingMode: "vertical-lr",
                                textOrientation: "mixed",
                                transform: "rotate(180deg)",
                            }}
                        >
                            2026
                        </span>
                    </div>
                </div>
            </div>

            {/* Info stubs */}
            <div className="mx-auto grid max-w-195 grid-cols-1 gap-4 sm:grid-cols-3">
                {INFO_CARDS.map(({ Icon, title, body, accent }, i) => {
                    const a = ACCENT[accent];
                    return (
                        <div
                            key={title}
                            className={`group relative overflow-hidden rounded-[10px] border bg-night-800/50 backdrop-blur-sm transition-all duration-300 ${a.card}`}
                        >
                            {/* Stub header */}
                            <div className="flex h-11 items-center justify-between px-5">
                                <span className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${a.label}`}>
                                    Stub No. 0{i + 1}
                                </span>
                                <span className={`flex h-6 w-6 items-center justify-center rounded-md border ${a.iconBox}`}>
                                    <Icon size={13} aria-hidden="true" />
                                </span>
                            </div>

                            {/* Perforated tear line */}
                            <div
                                className="pointer-events-none absolute inset-x-0 top-11 h-px"
                                style={{
                                    background: `repeating-linear-gradient(to right, transparent 0 4px, ${a.tear} 4px 8px)`,
                                }}
                            />
                            <div className={`absolute -left-1.5 top-11 h-3 w-3 -translate-y-1/2 rounded-full border bg-night-900 ${a.notch}`} />
                            <div className={`absolute -right-1.5 top-11 h-3 w-3 -translate-y-1/2 rounded-full border bg-night-900 ${a.notch}`} />

                            {/* Stub body */}
                            <div className="px-5 pb-5 pt-4">
                                <div className={`mb-1.5 text-base font-semibold ${a.title}`}>{title}</div>
                                <p className="text-sm leading-relaxed text-warm-white/75">{body}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
}
