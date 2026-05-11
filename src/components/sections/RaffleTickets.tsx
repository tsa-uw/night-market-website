import { Clock, MapPin, Plane, Ticket, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { CSSProperties, PointerEvent, ReactNode } from "react";
import cinematicSky from "../../assets/images/CinematicSky.png";
import ScrollReveal from "../motion/ScrollReveal";
import OptimizedImage from "../media/OptimizedImage";

function AirlineLogo() {
    return (
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border border-[rgba(251,184,72,0.2)] bg-[rgba(251,184,72,0.07)] sm:h-12 sm:w-12">
            <OptimizedImage
                src="/alaska_airlines_eskimo-logo.png"
                alt="Alaska Airlines"
                className="h-9 w-9 object-contain sm:h-10 sm:w-10"
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

const INFO_CARD_POSITIONS = [
    "sm:mt-0",
    "sm:mt-7",
    "sm:mt-3",
];

const INFO_CARD_TILTS = [
    "sm:-rotate-1",
    "sm:rotate-[0.8deg]",
    "sm:-rotate-[0.45deg]",
];

type TicketTiltStyle = CSSProperties & {
    "--ticket-glow-x": string;
    "--ticket-glow-y": string;
    "--ticket-lift": string;
    "--ticket-rotate-x": string;
    "--ticket-rotate-y": string;
};

const TICKET_TILT_STYLE: TicketTiltStyle = {
    "--ticket-glow-x": "50%",
    "--ticket-glow-y": "50%",
    "--ticket-lift": "0px",
    "--ticket-rotate-x": "0deg",
    "--ticket-rotate-y": "0deg",
};

function handleTicketPointerMove(event: PointerEvent<HTMLDivElement>) {
    const { currentTarget, clientX, clientY } = event;
    const rect = currentTarget.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;

    currentTarget.style.setProperty("--ticket-glow-x", `${Math.round(x * 100)}%`);
    currentTarget.style.setProperty("--ticket-glow-y", `${Math.round(y * 100)}%`);
    currentTarget.style.setProperty("--ticket-lift", "-3px");
    currentTarget.style.setProperty("--ticket-rotate-x", `${((0.5 - y) * 3).toFixed(2)}deg`);
    currentTarget.style.setProperty("--ticket-rotate-y", `${((x - 0.5) * 4).toFixed(2)}deg`);
}

function handleTicketPointerLeave(event: PointerEvent<HTMLDivElement>) {
    const { currentTarget } = event;

    currentTarget.style.setProperty("--ticket-glow-x", "50%");
    currentTarget.style.setProperty("--ticket-glow-y", "50%");
    currentTarget.style.setProperty("--ticket-lift", "0px");
    currentTarget.style.setProperty("--ticket-rotate-x", "0deg");
    currentTarget.style.setProperty("--ticket-rotate-y", "0deg");
}

export default function RaffleTickets() {
    return (
        <section
            id="raffle"
            className="relative overflow-hidden border-t border-night-700/75 px-4 py-16 md:py-24"
        >
            {/* Cinematic sky background */}
            <div className="pointer-events-none absolute inset-0 -z-20">
                <OptimizedImage
                    src={cinematicSky}
                    alt=""
                    className="h-full w-full object-cover object-center"
                />
                {/* Gradient: sky visible at top, fades to night at bottom */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(to bottom, rgba(6,9,16,0.05) 0%, rgba(6,9,16,0.30) 50%, rgba(6,9,16,0.65) 75%, rgba(6,9,16,0.85) 100%)",
                    }}
                />
            </div>

            {/* Ambient side glows */}
            <div className="pointer-events-none absolute top-10 -left-20 -z-10 h-52 w-52 rounded-full bg-blossom-400/10 blur-3xl" />
            <div className="pointer-events-none absolute right-0 bottom-0 -z-10 h-64 w-64 rounded-full bg-lantern-400/10 blur-3xl" />

            <div className="mx-auto max-w-6xl">
                <ScrollReveal y={26}>
                    <h2
                        className="mb-10 text-center text-3xl tracking-wide text-lantern-100 md:text-4xl"
                        style={{ fontFamily: '"TenPounds", "Georgia", serif' }}
                    >
                        Raffle Tickets
                    </h2>
                </ScrollReveal>

                {/* Ticket */}
                <ScrollReveal y={42} scale={0.96} duration={0.75}>
                    <div
                        className="group/ticket relative mx-auto mb-8 max-w-195 rounded-xl [perspective:1200px]"
                        style={TICKET_TILT_STYLE}
                        onPointerMove={handleTicketPointerMove}
                        onPointerLeave={handleTicketPointerLeave}
                    >
                        <div className="ticket-depth-card relative rounded-xl shadow-[0_8px_48px_rgba(0,0,0,0.65),0_0_32px_rgba(251,184,72,0.08),0_0_64px_rgba(244,92,141,0.06)] transition-[transform,box-shadow] duration-300 ease-out [transform:rotateX(var(--ticket-rotate-x))_rotateY(var(--ticket-rotate-y))_translateY(var(--ticket-lift))] [transform-style:preserve-3d] group-hover/ticket:shadow-[0_16px_58px_rgba(0,0,0,0.76),0_0_34px_rgba(251,184,72,0.13),0_0_60px_rgba(244,92,141,0.09)]">
                            <div className="pointer-events-none absolute -inset-4 rounded-2xl bg-[radial-gradient(circle_at_var(--ticket-glow-x)_var(--ticket-glow-y),rgba(246,239,223,0.075),transparent_42%)] opacity-0 blur-xl transition-opacity duration-300 group-hover/ticket:opacity-85" />
                        <div className="relative flex overflow-hidden rounded-xl border border-[rgba(251,184,72,0.18)] bg-[rgba(8,13,24,0.82)] backdrop-blur-md">
                            <div
                                className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-soft-light"
                                style={{
                                    backgroundImage:
                                        "radial-gradient(circle at 1px 1px, rgba(246,239,223,0.5) 1px, transparent 0), linear-gradient(115deg, rgba(255,255,255,0.04), transparent 38%, rgba(0,0,0,0.18))",
                                    backgroundSize: "7px 7px, 100% 100%",
                                }}
                            />
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_var(--ticket-glow-x)_var(--ticket-glow-y),rgba(246,239,223,0.085),transparent_34%)] opacity-0 mix-blend-screen transition-opacity duration-300 group-hover/ticket:opacity-80" />
                            <ScallopEdge />
                            <ScallopEdge flip />

                            {/* Body */}
                            <div className="relative flex-1 overflow-hidden p-4 sm:p-7">
                                {/* Header */}
                                <div className="relative mb-5 grid gap-3 sm:mb-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
                                    <div className="flex min-w-0 items-center gap-3">
                                        <AirlineLogo />
                                        <div className="min-w-0">
                                            <div className="mb-1 text-[9px] leading-tight font-semibold tracking-[0.18em] text-[rgba(251,184,72,0.68)] uppercase sm:mb-0.5 sm:text-[10px] sm:tracking-[0.2em]">
                                                Grand Prize · Sponsored by
                                            </div>
                                            <div
                                                className="text-[20px] leading-[1.05] tracking-wide text-lantern-100 sm:text-[22px] sm:leading-tight"
                                                style={{ fontFamily: '"TenPounds", "Georgia", serif' }}
                                            >
                                                Alaska Airlines Round-Trip
                                            </div>
                                        </div>
                                    </div>
                                    <span className="w-fit shrink-0 whitespace-nowrap rounded-full border border-[rgba(244,92,141,0.3)] bg-[rgba(244,92,141,0.1)] px-3 py-1 text-[11px] font-semibold tracking-[0.08em] text-blossom-300 uppercase sm:text-xs">
                                        2 Winners
                                    </span>
                                </div>

                                {/* Route display — single compact row */}
                                <div className="relative mb-5 grid grid-cols-[1fr_minmax(74px,0.8fr)_1fr] items-end gap-2 sm:mb-4 sm:flex sm:items-center sm:gap-3">
                                    {/* FROM */}
                                    <div className="min-w-0">
                                        <div className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[rgba(251,184,72,0.5)]">From</div>
                                        <div
                                            className="text-[31px] leading-none tracking-tight text-lantern-100 sm:text-[38px]"
                                            style={{ fontFamily: '"TenPounds", "Georgia", serif' }}
                                        >
                                            SEA
                                        </div>
                                        <div className="text-[10px] leading-tight text-warm-white/45 sm:text-[11px]">Seattle · Tacoma</div>
                                    </div>

                                    {/* Flight path */}
                                    <div className="flex min-w-0 flex-col items-center gap-1.5 self-center sm:flex-1">
                                        <div className="flex w-full items-center gap-1.5">
                                            <div
                                                className="flex-1"
                                                style={{
                                                    height: "1px",
                                                    background: "repeating-linear-gradient(to right, rgba(251,184,72,0.35) 0 4px, transparent 4px 8px)",
                                                }}
                                            />
                                            <Plane size={15} className="text-lantern-400/70 -rotate-[10deg] shrink-0" aria-hidden="true" />
                                            <div
                                                className="flex-1"
                                                style={{
                                                    height: "1px",
                                                    background: "repeating-linear-gradient(to right, rgba(251,184,72,0.35) 0 4px, transparent 4px 8px)",
                                                }}
                                            />
                                        </div>
                                        <span className="rounded-full border border-[rgba(244,92,141,0.25)] bg-[rgba(244,92,141,0.07)] px-2 py-px text-[8px] font-semibold tracking-[0.1em] text-blossom-300/80 uppercase sm:text-[9px] sm:tracking-[0.12em]">
                                            Round-Trip
                                        </span>
                                    </div>

                                    {/* TO */}
                                    <div className="min-w-0 text-right">
                                        <div className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[rgba(244,92,141,0.5)]">To</div>
                                        <div
                                            className="text-[32px] leading-none tracking-tight text-blossom-200 sm:text-[38px]"
                                            style={{ fontFamily: '"TenPounds", "Georgia", serif' }}
                                        >
                                            ???
                                        </div>
                                        <div className="text-[10px] leading-tight text-warm-white/45 sm:text-[11px]">Anywhere AS flies</div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div
                                    className="relative mb-4 h-px"
                                    style={{
                                        background: "linear-gradient(90deg, transparent, rgba(251,184,72,0.2), transparent)",
                                    }}
                                />

                                {/* Bottom row */}
                                <div className="relative grid gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
                                    <div className="flex items-baseline gap-2">
                                        <span
                                            className="text-3xl leading-none text-lantern-300"
                                            style={{ fontFamily: '"TenPounds", "Georgia", serif' }}
                                        >
                                            $3
                                        </span>
                                        <span className="text-sm text-warm-white/50">per ticket</span>
                                    </div>
                                    <div className="grid grid-cols-1 gap-2 min-[380px]:grid-cols-2 sm:flex sm:flex-wrap">
                                        <span className="flex items-center justify-center gap-1.5 rounded-md border border-dashed border-[rgba(251,184,72,0.2)] bg-[rgba(251,184,72,0.04)] px-2.5 py-1.5 text-xs text-warm-white/60 sm:justify-start sm:py-1">
                                            <Ticket size={12} aria-hidden="true" />
                                            TSA Info Booth
                                        </span>
                                        <span className="flex items-center justify-center gap-1.5 rounded-md border border-dashed border-[rgba(251,184,72,0.2)] bg-[rgba(251,184,72,0.04)] px-2.5 py-1.5 text-xs text-warm-white/60 sm:justify-start sm:py-1">
                                            <Clock size={12} aria-hidden="true" />
                                            Drawing at 8:35 PM
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
                                    animation: "ticket-perforation-drift 3.8s linear infinite",
                                    boxShadow: "0 0 18px rgba(251,184,72,0.14)",
                                }}
                            >
                                <div className="absolute -top-2.5 left-1/2 z-[4] h-5 w-5 -translate-x-1/2 rounded-full border border-[rgba(251,184,72,0.2)] bg-night-900" />
                                <div className="absolute -bottom-2.5 left-1/2 z-[4] h-5 w-5 -translate-x-1/2 rounded-full border border-[rgba(251,184,72,0.2)] bg-night-900" />
                            </div>

                            {/* Stub — hidden on mobile */}
                            <div className="relative hidden w-[120px] shrink-0 flex-col items-center justify-between gap-3 bg-[rgba(6,9,16,0.45)] px-4 py-7 sm:flex">
                                <div
                                    className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] opacity-35"
                                    style={{
                                        background: "linear-gradient(90deg, transparent, #fbb848, transparent)",
                                    }}
                                />
                                <span
                                    className="text-[8px] font-semibold uppercase tracking-[0.3em] text-warm-white/30"
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
                                    className="text-[8px] font-semibold uppercase tracking-[0.3em] text-warm-white/30"
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
                    </div>
                </ScrollReveal>

                {/* Info stubs */}
                <div className="mx-auto grid max-w-195 grid-cols-1 items-start gap-4 pt-1 sm:grid-cols-3 sm:gap-5 sm:pt-3">
                    {INFO_CARDS.map(({ Icon, title, body, accent }, i) => {
                        const a = ACCENT[accent];
                        return (
                            <ScrollReveal
                                key={title}
                                className={`h-full ${INFO_CARD_POSITIONS[i] ?? ""}`}
                                delay={i * 0.08}
                                y={34}
                                scale={0.97}
                            >
                                <div className="group relative h-full">
                                    <div
                                        className={`pointer-events-none absolute inset-0 rounded-none border bg-[rgba(8,13,24,0.68)] shadow-[0_12px_26px_rgba(0,0,0,0.28)] backdrop-blur-sm transition-[border-color,box-shadow,background-color,transform] duration-300 ${INFO_CARD_TILTS[i] ?? ""} ${a.card}`}
                                        aria-hidden="true"
                                    />
                                    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-none" aria-hidden="true">
                                        <div
                                            className={`absolute inset-0 bg-linear-to-br from-warm-white/[0.035] via-transparent to-night-900/45 ${INFO_CARD_TILTS[i] ?? ""}`}
                                        />
                                    </div>
                                    <div className="relative h-full overflow-hidden rounded-none">
                                        {/* Stub header */}
                                        <div className="relative flex h-11 items-center justify-between px-5">
                                            <span className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${a.label}`}>
                                                Stub No. 0{i + 1}
                                            </span>
                                            <span className={`flex h-6 w-6 items-center justify-center rounded-none border ${a.iconBox}`}>
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
                                        <div className="relative px-5 pb-5 pt-4">
                                            <div className={`mb-1.5 text-base font-semibold ${a.title}`}>{title}</div>
                                            <p className="text-sm leading-relaxed text-warm-white/70">{body}</p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
