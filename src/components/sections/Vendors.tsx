import { ChevronDown, ChevronUp, MapPin, Search, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import vendorsData from "../../data/vendors.json";

type VendorCategory = "food" | "crafts";
type VendorFilter = "all" | VendorCategory;

interface Vendor {
    type: VendorCategory;
    name: string;
    booth: string;
    location: string;
    specificType: string;
}

const VENDORS = vendorsData as Vendor[];

const FILTERS: VendorFilter[] = ["all", "food", "crafts"];
const MOBILE_FILTERS: VendorFilter[] = ["food", "crafts"];
const MOBILE_VISIBLE_VENDOR_COUNT = 6;
const DESKTOP_ALL_VISIBLE_VENDOR_COUNT = 12;

const FILTER_LABELS: Record<VendorFilter, string> = {
    all: "All",
    food: "Food",
    crafts: "Arts & Crafts",
};

const CATEGORY_STYLES: Record<
    VendorCategory,
    {
        active: string;
        card: string;
        chip: string;
        marquee: string;
        thumbnail: string;
        typeBadge: string;
    }
> = {
    food: {
        active: "bg-blossom-400 text-night-900 shadow-[0_0_16px_rgba(244,92,141,0.35)]",
        card: "before:from-blossom-400 before:to-blossom-300 hover:border-blossom-300/35 hover:shadow-[0_16px_42px_rgba(244,92,141,0.14)]",
        chip: "hover:border-blossom-300/40 hover:text-blossom-100",
        marquee: "text-blossom-300 drop-shadow-[0_0_20px_rgba(244,92,141,0.4)]",
        thumbnail: "border-blossom-300/15 bg-blossom-400/12 text-blossom-200",
        typeBadge: "border-blossom-300/28 bg-blossom-400/10 text-blossom-200",
    },
    crafts: {
        active: "bg-lantern-300 text-night-900 shadow-[0_0_16px_rgba(251,184,72,0.3)]",
        card: "before:from-lantern-300 before:to-lantern-500 hover:border-lantern-300/35 hover:shadow-[0_16px_42px_rgba(251,184,72,0.12)]",
        chip: "hover:border-lantern-300/40 hover:text-lantern-100",
        marquee: "text-lantern-300 drop-shadow-[0_0_20px_rgba(251,184,72,0.38)]",
        thumbnail: "border-lantern-300/15 bg-lantern-400/10 text-lantern-200",
        typeBadge: "border-lantern-300/28 bg-lantern-400/10 text-lantern-200",
    },
};

const PARTICLES = [
    { left: 10, dur: 23, delay: 1, size: 2, gold: false },
    { left: 25, dur: 18, delay: 5, size: 3, gold: true },
    { left: 42, dur: 27, delay: 2, size: 2, gold: false },
    { left: 58, dur: 20, delay: 7, size: 3, gold: true },
    { left: 73, dur: 24, delay: 4, size: 2, gold: false },
    { left: 88, dur: 29, delay: 9, size: 2, gold: true },
] as const;

function getInitials(name: string) {
    return name
        .split(/\s+/)
        .filter((word) => /^[A-Za-z]/.test(word))
        .slice(0, 2)
        .map((word) => word[0])
        .join("");
}

function getSearchText(vendor: Vendor) {
    return [
        vendor.name,
        vendor.type,
        vendor.specificType,
        vendor.location,
        vendor.booth,
    ]
        .join(" ")
        .toLowerCase();
}

function getInterleavedVendors(vendors: Vendor[]) {
    const midpoint = Math.ceil(vendors.length / 2);
    const row: Vendor[] = [];

    for (let i = 0; i < midpoint; i += 1) {
        row.push(vendors[i]);
        if (vendors[i + midpoint]) row.push(vendors[i + midpoint]);
    }

    return row;
}

function MarqueeRow({
    vendors,
    reverse = false,
}: {
    vendors: Vendor[];
    reverse?: boolean;
}) {
    const repeatedVendors = [...vendors, ...vendors];

    return (
        <div className="overflow-hidden border-b border-warm-white/6 py-4 last:border-b-0 md:py-5">
            <div
                className="vendors-marquee-track inline-flex whitespace-nowrap group-hover/marquees:[animation-play-state:paused]"
                style={{
                    animation: `${reverse ? "vendors-marquee-right" : "vendors-marquee-left"} ${reverse ? 76 : 62}s linear infinite`,
                }}
            >
                {repeatedVendors.map((vendor, index) => {
                    const shouldAccent = index % (reverse ? 4 : 5) === 2;
                    const accentClass = shouldAccent
                        ? CATEGORY_STYLES[vendor.type].marquee
                        : "text-warm-white";

                    return (
                        <span key={`${vendor.name}-${index}`} className="inline-flex items-center">
                            <span
                                className={`px-5 text-3xl leading-none tracking-normal transition-colors duration-200 hover:text-lantern-100 md:px-8 md:text-5xl ${accentClass}`}
                                style={{
                                    fontFamily: '"TenPounds", "Georgia", serif',
                                }}
                            >
                                {vendor.name}
                            </span>
                            <span
                                className="text-2xl text-warm-white/18"
                                aria-hidden="true"
                                style={{
                                    fontFamily: '"TenPounds", "Georgia", serif',
                                }}
                            >
                                *
                            </span>
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

function FilterButton({
    count,
    filter,
    isActive,
    onClick,
}: {
    count: number;
    filter: VendorFilter;
    isActive: boolean;
    onClick: (filter: VendorFilter) => void;
}) {
    const categoryStyle = filter === "all" ? "" : CATEGORY_STYLES[filter].chip;
    const activeStyle =
        filter === "all"
            ? "bg-warm-white text-night-900 shadow-[0_0_16px_rgba(246,239,223,0.16)]"
            : CATEGORY_STYLES[filter].active;

    return (
        <button
            type="button"
            aria-pressed={isActive}
            onClick={() => onClick(filter)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                isActive
                    ? `border-transparent ${activeStyle}`
                    : `border-warm-white/12 text-warm-white/72 ${categoryStyle}`
            }`}
        >
            {FILTER_LABELS[filter]}
            <span
                className={`rounded-full px-2 py-0.5 text-[0.68rem] tabular-nums ${
                    isActive
                        ? "bg-night-900/16 text-night-900/70"
                        : "bg-warm-white/6 text-warm-white/52"
                }`}
            >
                {count}
            </span>
        </button>
    );
}

function VendorCard({ vendor }: { vendor: Vendor }) {
    const categoryStyle = CATEGORY_STYLES[vendor.type];

    return (
        <article
            className={`group relative isolate flex min-h-28 gap-4 overflow-hidden rounded-lg border border-warm-white/8 bg-night-800/50 p-4 backdrop-blur-sm transition-all duration-300 before:absolute before:top-0 before:bottom-0 before:left-0 before:w-1 before:bg-linear-to-b before:opacity-70 hover:-translate-y-0.5 hover:bg-night-700/55 ${categoryStyle.card}`}
        >
            <div
                className={`relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-md border text-2xl ${categoryStyle.thumbnail}`}
                style={{ fontFamily: '"TenPounds", "Georgia", serif' }}
            >
                <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent_0_8px,rgb(255_255_255_/_4%)_8px_9px)]" />
                <span
                    className="absolute inset-0 flex items-center justify-center text-center"
                    style={{
                        lineHeight: 0.8,
                        transform: "translateY(0.08em)",
                    }}
                >
                    {getInitials(vendor.name)}
                </span>
            </div>

            <div className="min-w-0 flex-1">
                <h3 className="truncate text-lg leading-6 font-semibold text-lantern-100">
                    {vendor.name}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span
                        className={`rounded-full border px-2 py-1 text-[0.62rem] font-bold tracking-[0.18em] uppercase ${categoryStyle.typeBadge}`}
                    >
                        {vendor.specificType}
                    </span>
                    <span className="rounded-full border border-warm-white/10 bg-night-900/35 px-2 py-1 text-xs font-semibold text-warm-white/58">
                        Booth {vendor.booth}
                    </span>
                </div>

                <p className="mt-3 flex items-center gap-1.5 text-xs text-warm-white/56 transition-colors duration-200 group-hover:text-warm-white/75">
                    <MapPin className="h-3.5 w-3.5 text-lantern-300/72" aria-hidden="true" />
                    <span>{vendor.location}</span>
                </p>
            </div>
        </article>
    );
}

export default function Vendors() {
    const [activeFilter, setActiveFilter] = useState<VendorFilter>("all");
    const [isMobileFilter, setIsMobileFilter] = useState(false);
    const [isListExpanded, setIsListExpanded] = useState(false);
    const [query, setQuery] = useState("");

    const counts = useMemo(
        () => ({
            all: VENDORS.length,
            food: VENDORS.filter((vendor) => vendor.type === "food").length,
            crafts: VENDORS.filter((vendor) => vendor.type === "crafts").length,
        }),
        [],
    );

    const marqueeVendors = useMemo(() => getInterleavedVendors(VENDORS), []);
    const visibleFilters = isMobileFilter ? MOBILE_FILTERS : FILTERS;

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 639px)");
        const syncMobileFilter = () => {
            setIsMobileFilter(mediaQuery.matches);

            if (mediaQuery.matches) {
                setActiveFilter((currentFilter) =>
                    currentFilter === "all" ? "food" : currentFilter,
                );
            }
        };

        syncMobileFilter();
        mediaQuery.addEventListener("change", syncMobileFilter);

        return () => {
            mediaQuery.removeEventListener("change", syncMobileFilter);
        };
    }, []);

    const filteredVendors = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        return VENDORS.filter((vendor) => {
            const matchesFilter =
                activeFilter === "all" || vendor.type === activeFilter;
            const matchesQuery =
                !normalizedQuery ||
                getSearchText(vendor).includes(normalizedQuery);

            return matchesFilter && matchesQuery;
        });
    }, [activeFilter, query]);

    const collapsedVendorCount = isMobileFilter
        ? MOBILE_VISIBLE_VENDOR_COUNT
        : activeFilter === "all"
          ? DESKTOP_ALL_VISIBLE_VENDOR_COUNT
          : filteredVendors.length;
    const shouldCollapseList = filteredVendors.length > collapsedVendorCount;
    const visibleVendors = shouldCollapseList
        ? filteredVendors.slice(0, collapsedVendorCount)
        : filteredVendors;
    const hiddenVendors = shouldCollapseList
        ? filteredVendors.slice(collapsedVendorCount)
        : [];
    const hiddenVendorCount = hiddenVendors.length;
    const hiddenPanelMaxHeight =
        isListExpanded && hiddenVendors.length > 0
            ? `${hiddenVendors.length * 148}px`
            : "0px";

    const handleFilterChange = (filter: VendorFilter) => {
        setActiveFilter(filter);
        setIsListExpanded(false);
    };

    const handleQueryChange = (value: string) => {
        setQuery(value);
        setIsListExpanded(false);
    };

    return (
        <section
            id="vendors"
            className="relative overflow-hidden border-t border-night-700/75 px-4 py-20 md:py-32"
        >
            <div className="pointer-events-none absolute inset-0 -z-20 bg-linear-to-b from-night-900/70 via-night-900/95 to-night-800/95" />
            <div className="pointer-events-none absolute top-0 left-[9%] -z-10 h-96 w-96 rounded-full bg-blossom-400/8 blur-3xl" />
            <div className="pointer-events-none absolute right-[6%] bottom-[12%] -z-10 h-80 w-80 rounded-full bg-lantern-400/10 blur-3xl" />
            <div className="pointer-events-none absolute top-[42%] left-[42%] -z-10 h-110 w-110 rounded-full bg-blossom-300/6 blur-[80px]" />

            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
                {PARTICLES.map((particle) => (
                    <span
                        key={`${particle.left}-${particle.delay}`}
                        className="absolute bottom-0 rounded-full"
                        style={{
                            left: `${particle.left}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            background: particle.gold
                                ? "rgba(255,208,106,0.85)"
                                : "rgba(244,92,141,0.85)",
                            boxShadow: `0 0 ${particle.size * 4}px 1px ${
                                particle.gold
                                    ? "rgba(255,208,106,0.6)"
                                    : "rgba(244,92,141,0.6)"
                            }`,
                            animation: `float-particle ${particle.dur}s linear ${particle.delay}s infinite`,
                        }}
                    />
                ))}
            </div>

            <div className="mx-auto max-w-6xl">
                <div className="mb-12 text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-lantern-100/30 bg-night-900/40 px-4 py-1 text-xs font-semibold tracking-[0.25em] text-lantern-100/85 uppercase backdrop-blur-md">
                        <Sparkles className="h-3.5 w-3.5 text-blossom-300" aria-hidden="true" />
                        {VENDORS.length} vendors - one night
                    </span>
                    <h2
                        className="mt-5 text-5xl leading-tight text-lantern-100 drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)] md:text-6xl"
                        style={{ fontFamily: '"TenPounds", "Georgia", serif' }}
                    >
                        Meet the Vendors
                    </h2>
                    <p className="mx-auto mt-3 max-w-2xl text-base leading-7 tracking-wide text-warm-white/58">
                        Food vendors in Red Square and makers along Rainier Vista, all pulled from this year's vendor lineup.
                    </p>
                </div>

                <div
                    className="group/marquees relative mb-9 overflow-hidden border-y border-warm-white/8 bg-night-800/25 before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-20 before:bg-linear-to-r before:from-night-900 before:to-transparent after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-20 after:bg-linear-to-l after:from-night-900 after:to-transparent md:before:w-36 md:after:w-36"
                    aria-hidden="true"
                >
                    <MarqueeRow vendors={marqueeVendors} />
                    <MarqueeRow vendors={[...marqueeVendors].reverse()} reverse />
                </div>

                <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="mr-1 text-xs font-bold tracking-[0.22em] text-warm-white/45 uppercase">
                            Browse
                        </span>
                        {visibleFilters.map((filter) => (
                            <FilterButton
                                key={filter}
                                count={counts[filter]}
                                filter={filter}
                                isActive={activeFilter === filter}
                                onClick={handleFilterChange}
                            />
                        ))}
                    </div>

                    <label className="relative w-full lg:ml-auto lg:max-w-xs">
                        <span className="sr-only">Search vendors</span>
                        <Search
                            className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-warm-white/45"
                            aria-hidden="true"
                        />
                        <input
                            type="search"
                            value={query}
                            onChange={(event) => handleQueryChange(event.target.value)}
                            placeholder="Search vendors or booths"
                            className="w-full rounded-full border border-warm-white/10 bg-night-800/60 py-2.5 pr-4 pl-10 text-sm text-warm-white outline-none transition duration-200 placeholder:text-warm-white/36 focus:border-blossom-300/45 focus:bg-night-800/85"
                        />
                    </label>
                </div>

                {filteredVendors.length > 0 ? (
                    <>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {visibleVendors.map((vendor) => (
                                <VendorCard key={`${vendor.name}-${vendor.booth}`} vendor={vendor} />
                            ))}
                        </div>

                        {shouldCollapseList && (
                            <>
                                <div
                                    id="vendors-reveal-panel"
                                    className={`grid overflow-hidden transition-[max-height,opacity,transform] duration-500 ease-out sm:grid-cols-2 lg:grid-cols-3 ${
                                        isListExpanded
                                            ? "mt-3 gap-3 opacity-100"
                                            : "mt-0 gap-0 -translate-y-1 opacity-0"
                                    }`}
                                    style={{
                                        maxHeight: hiddenPanelMaxHeight,
                                    }}
                                >
                                    {hiddenVendors.map((vendor) => (
                                        <VendorCard
                                            key={`${vendor.name}-${vendor.booth}`}
                                            vendor={vendor}
                                        />
                                    ))}
                                </div>

                                <div className="mt-5 flex justify-center">
                                    <button
                                        type="button"
                                        aria-controls="vendors-reveal-panel"
                                        aria-expanded={isListExpanded}
                                        onClick={() =>
                                            setIsListExpanded((expanded) => !expanded)
                                        }
                                        className="inline-flex items-center gap-2 rounded-full border border-lantern-300/28 bg-night-800/60 px-5 py-2.5 text-sm font-bold text-lantern-100 shadow-[0_0_18px_rgba(251,184,72,0.08)] backdrop-blur-sm transition duration-200 hover:border-lantern-300/45 hover:bg-night-700/70"
                                    >
                                        {isListExpanded ? (
                                            <>
                                                Show fewer
                                                <ChevronUp
                                                    className="h-4 w-4 text-lantern-300"
                                                    aria-hidden="true"
                                                />
                                            </>
                                        ) : (
                                            <>
                                                Show {hiddenVendorCount} more
                                                <ChevronDown
                                                    className="h-4 w-4 text-lantern-300"
                                                    aria-hidden="true"
                                                />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <div
                        className="rounded-lg border border-dashed border-warm-white/14 bg-night-800/35 px-6 py-12 text-center"
                        role="status"
                    >
                        <p
                            className="text-3xl text-lantern-100/72"
                            style={{
                                fontFamily: '"TenPounds", "Georgia", serif',
                            }}
                        >
                            No vendors found
                        </p>
                        <p className="mt-2 text-sm text-warm-white/48">
                            Try another search or category.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
