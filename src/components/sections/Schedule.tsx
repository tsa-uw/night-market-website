import {
    Clapperboard,
    Expand,
    PersonStanding,
    Sparkles,
    Star,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import OptimizedImage from "../media/OptimizedImage";

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
    type: string;
    desc: string;
    image?: string;
    imagePosition?: string;
    logo?: string;
    headliner?: boolean;
}

const TYPE_COLORS: Record<
    string,
    { bg: string; border: string; text: string }
> = {
    Opening: {
        bg: "rgba(198,138,70,0.15)",
        border: "rgba(198,138,70,0.35)",
        text: "#c68a46",
    },
    "Martial Arts": {
        bg: "rgba(244,92,141,0.12)",
        border: "rgba(244,92,141,0.35)",
        text: "#ff89ad",
    },
    Interactive: {
        bg: "rgba(251,184,72,0.12)",
        border: "rgba(251,184,72,0.35)",
        text: "#ffd06a",
    },
    Dance: {
        bg: "rgba(244,92,141,0.10)",
        border: "rgba(244,92,141,0.28)",
        text: "#ff89ad",
    },
    Cultural: {
        bg: "rgba(198,138,70,0.12)",
        border: "rgba(198,138,70,0.32)",
        text: "#fbb848",
    },
    Break: {
        bg: "rgba(63,79,115,0.25)",
        border: "rgba(63,79,115,0.4)",
        text: "#94a3b8",
    },
    Music: {
        bg: "rgba(244,92,141,0.12)",
        border: "rgba(244,92,141,0.35)",
        text: "#ff89ad",
    },
    Acrobatics: {
        bg: "rgba(198,138,70,0.15)",
        border: "rgba(198,138,70,0.35)",
        text: "#fbb848",
    },
    Headliner: {
        bg: "rgba(251,184,72,0.14)",
        border: "rgba(251,184,72,0.45)",
        text: "#ffd06a",
    },
};

const TYPE_MEDIA_GRAD: Record<string, [string, string]> = {
    Opening: ["#1a1206", "#2d1f0a"],
    "Martial Arts": ["#1a0612", "#2d0a1c"],
    Interactive: ["#1a1206", "#2d1f0a"],
    Dance: ["#1a0612", "#2d0a1c"],
    Cultural: ["#1a1206", "#2d1f0a"],
    Break: ["#0e1424", "#19233a"],
    Music: ["#1a0612", "#2d0a1c"],
    Acrobatics: ["#1a1206", "#2d1f0a"],
    Headliner: ["#1a1206", "#3d2806"],
};

const SCHEDULE_EVENTS: ScheduleEvent[] = [
    {
        time: "4:30 PM",
        title: "Intro",
        type: "Opening",
        desc: "The night begins. Welcome to the UW Night Market — a celebration of culture, community, and performance.",
    },
    {
        time: "4:33 PM",
        title: "Husky Wushu",
        type: "Martial Arts",
        desc: "Wushu is a Chinese martial art and international sport derived from hundreds of years of traditional Chinese Kung Fu. Husky Wushu has been an active club at UW since 2009, with a mission to foster an inclusive community around the practice of Chinese martial arts. They will perform a medley of individual forms, group forms, and fight sets - including hand forms and weapon forms such as sword, staff, and fan.",
        image: "/entertainment group images/Husky Wushu.jpg",
        logo: "/entertainment group images/Husky Wushu Logo.png",
    },
    {
        time: "4:50 PM",
        title: "TSA Food Eating Contest",
        type: "Interactive",
        desc: "Who has what it takes? Audience members battle it out in this crowd-favorite eating contest. Cheer on your champion.",
    },
    {
        time: "5:08 PM",
        title: "We Are Taiwan I",
        type: "Dance",
        desc: "We are honored to welcome a special performance from the National Taiwan University of Sport. As part of their U.S. tour titled '2026 We Are Taiwan,' these talented students bring together athletic excellence, artistry, and cultural pride. Through dynamic movement and powerful storytelling, they showcase the energy, creativity, and spirit of Taiwan.",
        image: "/entertainment group images/we are taiwan banner.jpg",
        imagePosition: "object-right",
        logo: "/entertainment group images/we are tw logo.jpg",
    },
    {
        time: "5:21 PM",
        title: "Last Chance",
        type: "Dance",
        desc: "An electrifying dance crew performance pushing the boundaries of movement, synchrony, and stage presence.",
    },
    {
        time: "5:39 PM",
        title: "We Are Taiwan II",
        type: "Dance",
        desc: "We are honored to welcome a special performance from the National Taiwan University of Sport. As part of their U.S. tour titled '2026 We Are Taiwan,' these talented students bring together athletic excellence, artistry, and cultural pride. Through dynamic movement and powerful storytelling, they showcase the energy, creativity, and spirit of Taiwan.",
        image: "/entertainment group images/we are taiwan banner.jpg",
        imagePosition: "object-right",
        logo: "/entertainment group images/we are tw logo.jpg",
    },
    {
        time: "5:52 PM",
        title: "Mak Fai Dragon and Lion Dance Association",
        type: "Cultural",
        desc: "The legendary Mak Fai Association brings good luck and fortune with a thunderous traditional lion and dragon dance performance.",
    },
    {
        time: "6:07 PM",
        title: "Intermission & Sponsor Speeches",
        type: "Break",
        desc: "A brief intermission. Visit the vendors, grab a bite, and hear from the incredible sponsors who made this night possible.",
    },
    {
        time: "6:27 PM",
        title: "Mitsu &  Remi Vernon",
        type: "Music",
        desc: "Singer-songwriter Remi Vernon takes the stage for a captivating live performance. Expect soulful melodies and heartfelt lyrics.",
    },
    {
        time: "6:43 PM",
        title: "VSA Moonlit Dance Crew",
        type: "Dance",
        desc: "VSA's Moonlit Dance Crew opens with a stunning set — fluid choreography inspired by the beauty of moonlit nights.",
    },
    {
        time: "6:49 PM",
        title: "Divine Dance Crew",
        type: "Dance",
        desc: "DIVINE DANCE CREW is a dance crew established in 2024 that does a variety of dance covers including K-Pop. Our members come from different places around the world but are united through a shared love and passion for dance and K-Pop. We aim to bring the excitement and enjoyment of performance to everyone!",
        image: "/entertainment group images/Divine Group pic.JPG",
        logo: "/entertainment group images/DIVINE LOGO.png",
    },
    {
        time: "7:02 PM",
        title: "VSA Moonlit Dance Crew",
        type: "Dance",
        desc: "VSA Moonlit returns for a second set, escalating the night's energy with a new routine.",
    },
    {
        time: "7:06 PM",
        title: "Step Up Dance Crew",
        type: "Dance",
        desc: "Precision meets passion as Step Up delivers sharp, synchronized choreography that commands the stage.",
    },
    {
        time: "7:19 PM",
        title: "Apex Diabolo",
        type: "Acrobatics",
        desc: "Watch in awe as Apex Diabolo performs breathtaking feats of skill — spinning, launching, and catching with unreal precision.",
    },
    {
        time: "7:30 PM",
        title: "PRYVT",
        type: "Headliner",
        desc: "The night's headliner. PRYVT closes out the Night Market with a genre-defying live set that will leave you speechless.",
        headliner: true,
    },
];

const regularEvents = SCHEDULE_EVENTS.filter((e) => !e.headliner);
const headlinerEvent = SCHEDULE_EVENTS.find((e) => e.headliner)!;
function MediaIcon({ type, headliner }: { type: string; headliner?: boolean }) {
    const color = headliner
        ? "#fbb848"
        : (TYPE_COLORS[type]?.text ?? "#ff89ad");
    const iconProps = {
        size: 36,
        color,
        opacity: headliner || type === "Music" ? 0.35 : 0.4,
        "aria-hidden": true,
    } as const;

    if (type === "Martial Arts") return <Star {...iconProps} />;
    if (type === "Dance" || type === "Cultural")
        return <PersonStanding {...iconProps} />;
    if (type === "Music" || type === "Headliner")
        return (
            <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill={color}
                opacity={0.35}
                aria-hidden="true"
            >
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
        );
    if (type === "Acrobatics") return <Sparkles {...iconProps} />;
    return <Clapperboard {...iconProps} opacity={0.35} />;
}

type PreviewImageItem = {
    src: string;
    alt: string;
    imagePosition?: string;
};

type PreviewLogoItem = {
    src: string;
    alt: string;
};

function getPreviewImages(previewedMedia: ReadonlySet<string>) {
    const seen = new Set<string>();

    return SCHEDULE_EVENTS.reduce<PreviewImageItem[]>((items, event) => {
        if (!event.image || !previewedMedia.has(event.image)) return items;
        if (seen.has(event.image)) return items;

        seen.add(event.image);
        items.push({
            src: event.image,
            alt: event.title,
            imagePosition: event.imagePosition,
        });
        return items;
    }, []);
}

function getPreviewLogos(previewedMedia: ReadonlySet<string>) {
    const seen = new Set<string>();

    return SCHEDULE_EVENTS.reduce<PreviewLogoItem[]>((items, event) => {
        if (!event.logo || !previewedMedia.has(event.logo)) return items;
        if (seen.has(event.logo)) return items;

        seen.add(event.logo);
        items.push({
            src: event.logo,
            alt: `${event.title} logo`,
        });
        return items;
    }, []);
}

function ScheduleMediaCache({
    previewedMedia,
}: {
    previewedMedia: ReadonlySet<string>;
}) {
    return (
        <div
            aria-hidden="true"
            style={{
                height: 1,
                opacity: 0,
                overflow: "hidden",
                pointerEvents: "none",
                position: "absolute",
                width: 1,
            }}
        >
            {[...previewedMedia].map((src) => (
                <OptimizedImage
                    key={src}
                    src={src}
                    alt=""
                    fetchPriority="low"
                    loading="eager"
                    style={{ height: 1, width: 1 }}
                />
            ))}
        </div>
    );
}

function PreviewCard({
    event,
    previewedMedia,
    visible,
}: {
    event: ScheduleEvent | null;
    previewedMedia: ReadonlySet<string>;
    visible: boolean;
}) {
    const isHeadliner = event?.headliner;
    const typeColor = event ? TYPE_COLORS[event.type] : null;
    const previewImages = getPreviewImages(previewedMedia);
    const previewLogos = getPreviewLogos(previewedMedia);
    const [g1, g2] = event
        ? (TYPE_MEDIA_GRAD[event.type] ?? ["#0e1424", "#19233a"])
        : ["#0e1424", "#19233a"];

    return (
        <div
            aria-live="polite"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible
                    ? "translateX(0) scale(1)"
                    : "translateX(-10px) scale(0.97)",
                transition: "opacity 0.22s ease, transform 0.22s ease",
            }}
        >
            {event && (
                <div
                    style={{
                        background: isHeadliner
                            ? "linear-gradient(135deg, rgba(14,20,36,0.97) 0%, rgba(25,14,4,0.97) 100%)"
                            : "rgba(14,20,36,0.96)",
                        border: isHeadliner
                            ? "1px solid rgba(251,184,72,0.3)"
                            : "1px solid rgba(246,239,223,0.1)",
                        borderRadius: 16,
                        overflow: "hidden",
                        backdropFilter: "blur(16px)",
                        boxShadow: isHeadliner
                            ? "0 8px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(251,184,72,0.08), 0 0 40px rgba(251,184,72,0.06)"
                            : "0 8px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(246,239,223,0.04)",
                        animation: "card-in 0.22s ease both",
                    }}
                >
                    {/* Media area */}
                    <div
                        style={{
                            width: "100%",
                            height: 188,
                            background: `linear-gradient(135deg, ${g1} 0%, ${g2} 100%)`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                            overflow: "hidden",
                            animation: "card-media-in 0.28s ease both",
                        }}
                    >
                        {event.image ? (
                            <>
                                {previewImages.map(
                                    ({ src, alt, imagePosition }) => {
                                        const isActive = src === event.image;

                                        return (
                                            <OptimizedImage
                                                key={src}
                                                src={src}
                                                alt={isActive ? alt : ""}
                                                aria-hidden={!isActive}
                                                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-150 ${imagePosition ?? ""}`}
                                                style={{
                                                    opacity: isActive ? 1 : 0,
                                                }}
                                            />
                                        );
                                    },
                                )}
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        background:
                                            "linear-gradient(180deg, rgba(14,20,36,0.05) 0%, rgba(14,20,36,0.35) 100%)",
                                    }}
                                />
                                <span
                                    style={{
                                        position: "absolute",
                                        left: 12,
                                        bottom: 12,
                                        fontSize: 10.5,
                                        fontWeight: 500,
                                        letterSpacing: "0.18em",
                                        textTransform: "uppercase",
                                        color: "rgba(246,239,223,0.82)",
                                        textShadow:
                                            "0 2px 8px rgba(0,0,0,0.65)",
                                    }}
                                >
                                    preview
                                </span>
                                {event.logo && (
                                    <>
                                        {previewLogos.map(({ src, alt }) => {
                                            const isActive =
                                                src === event.logo;

                                            return (
                                                <OptimizedImage
                                                    key={src}
                                                    src={src}
                                                    alt={isActive ? alt : ""}
                                                    aria-hidden={!isActive}
                                                    style={{
                                                        position: "absolute",
                                                        right: 12,
                                                        bottom: 12,
                                                        maxWidth: 74,
                                                        maxHeight: 46,
                                                        objectFit: "contain",
                                                        borderRadius: 8,
                                                        background:
                                                            "rgba(246,239,223,0.86)",
                                                        padding: 6,
                                                        boxShadow:
                                                            "0 8px 24px rgba(0,0,0,0.35)",
                                                        opacity: isActive
                                                            ? 1
                                                            : 0,
                                                        transition:
                                                            "opacity 0.15s ease",
                                                    }}
                                                />
                                            );
                                        })}
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        backgroundImage:
                                            "repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(246,239,223,0.02) 29px)",
                                    }}
                                />
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%,-50%)",
                                        width: 120,
                                        height: 120,
                                        borderRadius: "50%",
                                        background: isHeadliner
                                            ? "radial-gradient(circle, rgba(251,184,72,0.12) 0%, transparent 70%)"
                                            : "radial-gradient(circle, rgba(244,92,141,0.10) 0%, transparent 70%)",
                                        filter: "blur(12px)",
                                    }}
                                />
                                <div
                                    style={{
                                        position: "relative",
                                        zIndex: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: 10,
                                    }}
                                >
                                    <MediaIcon
                                        type={event.type}
                                        headliner={isHeadliner}
                                    />
                                    <span
                                        style={{
                                            fontSize: 10.5,
                                            fontWeight: 500,
                                            letterSpacing: "0.18em",
                                            textTransform: "uppercase",
                                            color: isHeadliner
                                                ? "rgba(251,184,72,0.4)"
                                                : "rgba(246,239,223,0.25)",
                                        }}
                                    >
                                        {isHeadliner ? "headliner" : "preview"}
                                    </span>
                                </div>
                                <div
                                    style={{
                                        position: "absolute",
                                        bottom: 8,
                                        right: 10,
                                        fontSize: 10,
                                        color: "rgba(246,239,223,0.18)",
                                        letterSpacing: "0.1em",
                                        fontStyle: "italic",
                                    }}
                                >
                                    img · video
                                </div>
                            </>
                        )}
                        {isHeadliner && (
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background:
                                        "linear-gradient(105deg, transparent 35%, rgba(255,208,106,0.06) 50%, transparent 65%)",
                                    animation:
                                        "shimmer-sweep 3.5s ease 1s infinite",
                                }}
                            />
                        )}
                    </div>

                    {/* Card body */}
                    <div style={{ padding: "16px 18px 18px" }}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                marginBottom: 8,
                            }}
                        >
                            <time
                                style={{
                                    fontSize: 11,
                                    fontWeight: 600,
                                    letterSpacing: "0.05em",
                                    color: isHeadliner
                                        ? "rgba(251,184,72,0.7)"
                                        : "rgba(251,184,72,0.55)",
                                    fontVariantNumeric: "tabular-nums",
                                }}
                            >
                                {event.time}
                            </time>
                            {typeColor && (
                                <span
                                    style={{
                                        fontSize: 10,
                                        fontWeight: 600,
                                        letterSpacing: "0.16em",
                                        textTransform: "uppercase",
                                        padding: "2px 9px",
                                        borderRadius: 20,
                                        background: typeColor.bg,
                                        border: `1px solid ${typeColor.border}`,
                                        color: typeColor.text,
                                    }}
                                >
                                    {event.type}
                                </span>
                            )}
                        </div>
                        <h3
                            style={{
                                fontFamily: '"TenPounds", "Georgia", serif',
                                fontSize: isHeadliner ? 30 : 24,
                                lineHeight: 1.1,
                                color: isHeadliner
                                    ? "var(--color-lantern-100)"
                                    : "var(--color-warm-white)",
                                marginBottom: 10,
                                letterSpacing: isHeadliner ? "0.01em" : 0,
                                textShadow: isHeadliner
                                    ? "0 2px 18px rgba(255,208,106,0.25)"
                                    : "none",
                                animation: "fade-up 0.25s ease 0.06s both",
                            }}
                        >
                            {event.title}
                        </h3>
                        <p
                            style={{
                                fontSize: 13.5,
                                lineHeight: 1.65,
                                color: "rgba(246,239,223,0.58)",
                                animation: "fade-up 0.25s ease 0.1s both",
                            }}
                        >
                            {event.desc}
                        </p>
                    </div>
                </div>
            )}

            {/* Connector arrow pointing left toward the active row */}
            {visible && (
                <div
                    style={{
                        position: "absolute",
                        left: -8,
                        top: 28,
                        width: 0,
                        height: 0,
                        borderTop: "7px solid transparent",
                        borderBottom: "7px solid transparent",
                        borderRight: "8px solid rgba(14,20,36,0.95)",
                        filter: "drop-shadow(-2px 0 4px rgba(0,0,0,0.3))",
                    }}
                />
            )}
        </div>
    );
}

export default function Schedule() {
    const [activeIdx, setActiveIdx] = useState<number | null>(null);
    const [previewedMedia, setPreviewedMedia] = useState<Set<string>>(
        () => new Set(),
    );
    const [visible, setVisible] = useState<boolean[]>(() =>
        new Array(regularEvents.length).fill(false),
    );
    const [headlinerVisible, setHeadlinerVisible] = useState(false);
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
    const headlinerRef = useRef<HTMLDivElement>(null);

    const activatePreview = (idx: number) => {
        const event =
            idx < regularEvents.length ? regularEvents[idx] : headlinerEvent;

        setActiveIdx(idx);
        setPreviewedMedia((current) => {
            const next = new Set(current);
            if (event.image) next.add(event.image);
            if (event.logo) next.add(event.logo);

            return next.size === current.size ? current : next;
        });
    };

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
                        (r) => r === entry.target,
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
        const headlinerEl = headlinerRef.current;

        refs.forEach((ref) => ref && observer.observe(ref));
        if (headlinerEl) observer.observe(headlinerEl);

        return () => {
            refs.forEach((ref) => ref && observer.unobserve(ref));
            if (headlinerEl) observer.unobserve(headlinerEl);
        };
    }, []);

    return (
        /*
         * overflow-x-clip instead of overflow-hidden: clips horizontal content
         * (particles, orbs) without creating a scroll container, which would
         * break position:sticky on the preview card.
         */
        <section
            id="schedule"
            className="relative overflow-x-clip border-t border-night-700/75 px-4 py-20 md:py-32"
        >
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 -z-20 bg-linear-to-b from-night-900/70 via-night-900/95 to-night-800/95" />

            {/* Ambient orbs */}
            <div
                className="pointer-events-none absolute inset-0 -z-10"
                aria-hidden="true"
            >
                <div className="absolute top-0 left-[10%] h-96 w-96 rounded-full bg-blossom-400/8 blur-3xl" />
                <div className="absolute bottom-[15%] right-[8%] h-80 w-80 rounded-full bg-lantern-400/10 blur-3xl" />
                <div className="absolute top-[40%] left-[40%] h-120 w-120 rounded-full bg-blossom-300/6 blur-[80px]" />
            </div>

            {/* Floating particles */}
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

                {/* Two-column layout: timeline + sticky preview card */}
                <div
                    className="flex items-start justify-center gap-8"
                    onMouseLeave={() => setActiveIdx(null)}
                >
                    {/* Timeline + headliner column */}
                    <div className="min-w-0">
                        <div className="relative ml-28">
                            {/* Gradient line */}
                            <div
                                className="pointer-events-none absolute -left-px top-3 bottom-3 w-0.5 bg-linear-to-b from-blossom-400 via-lantern-400/60 to-transparent"
                                aria-hidden="true"
                            />

                            {/* Scanner glow */}
                            <div
                                className="pointer-events-none absolute inset-y-0 left-0 w-0"
                                aria-hidden="true"
                            >
                                <div
                                    className="absolute -translate-x-1/2 h-14 w-1.5 rounded-full"
                                    style={{
                                        background:
                                            "radial-gradient(ellipse at center, rgba(244,92,141,1) 0%, rgba(244,92,141,0.5) 50%, transparent 75%)",
                                        filter: "blur(2px)",
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
                                            onMouseEnter={() =>
                                                activatePreview(i)
                                            }
                                        >
                                            {/* Sweep background */}
                                            <div className="pointer-events-none absolute inset-y-0.5 -left-28 right-0 overflow-hidden rounded-r-md">
                                                <div className="h-full w-full -translate-x-full bg-linear-to-r from-blossom-400/20 via-blossom-400/8 to-transparent transition-transform duration-500 ease-out group-hover:translate-x-0" />
                                            </div>

                                            {/* Left accent bar */}
                                            <div className="pointer-events-none absolute -left-28 top-1 bottom-1 w-0.5 origin-center scale-y-0 rounded-full bg-blossom-400 shadow-[0_0_6px_rgba(244,92,141,0.8)] transition-transform duration-300 ease-out group-hover:scale-y-100" />

                                            {/* Time */}
                                            <time className="absolute right-full mr-4 w-24 -translate-x-1 text-right text-sm tabular-nums font-medium text-lantern-300/65 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:text-lantern-200">
                                                {time}
                                            </time>

                                            {/* Node */}
                                            <div className="absolute left-0 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-blossom-400 shadow-[0_0_8px_rgba(244,92,141,0.7)] transition-all duration-300 ease-out group-hover:scale-[1.5] group-hover:bg-blossom-300 group-hover:shadow-[0_0_0_2px_rgba(244,92,141,0.35),0_0_16px_rgba(244,92,141,1)]" />

                                            {/* Title */}
                                            <span className="text-[0.9375rem] leading-relaxed text-warm-white/70 transition-all duration-200 ease-out group-hover:translate-x-0.5 group-hover:text-warm-white">
                                                {title}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ol>
                        </div>

                        {/* Bridge connector */}
                        <div
                            className="ml-28 flex flex-col items-center"
                            style={{ width: 1 }}
                        >
                            <div className="h-6 w-px bg-linear-to-b from-lantern-400/50 to-transparent" />
                        </div>

                        {/* Headliner card — original styling */}
                        <div
                            ref={headlinerRef}
                            className="group relative overflow-hidden rounded-2xl border border-lantern-300/20 bg-night-800/60 p-5 backdrop-blur-sm transition-all duration-500 hover:border-lantern-300/40 hover:shadow-[0_0_40px_rgba(255,208,106,0.1)]"
                            onMouseEnter={() =>
                                activatePreview(regularEvents.length)
                            }
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

                    {/* Preview card — sticky within the flex row, hidden on mobile.
                        top: calc(50vh - 10rem) keeps the card vertically centered in
                        the viewport when stuck without shifting it in normal flow. */}
                    <div className="relative hidden w-84 shrink-0 self-start pt-10 md:sticky md:top-[calc(40vh-11rem)] md:block">
                        <ScheduleMediaCache previewedMedia={previewedMedia} />
                        <PreviewCard
                            event={
                                activeIdx !== null
                                    ? activeIdx < regularEvents.length
                                        ? regularEvents[activeIdx]
                                        : headlinerEvent
                                    : null
                            }
                            previewedMedia={previewedMedia}
                            visible={activeIdx !== null}
                        />

                        {/* Idle hint */}
                        <div
                            className="pointer-events-none text-center transition-opacity duration-300"
                            style={{ opacity: activeIdx !== null ? 0 : 1 }}
                        >
                            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-warm-white/12">
                                <Expand
                                    size={18}
                                    color="rgba(246,239,223,0.25)"
                                    aria-hidden="true"
                                />
                            </div>
                            <p className="text-xs leading-relaxed text-warm-white/25">
                                Hover a performance
                                <br />
                                to preview it
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
