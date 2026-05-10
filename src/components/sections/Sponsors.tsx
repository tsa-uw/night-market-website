import { HeartHandshake, Sparkles } from "lucide-react";
import { OptimizedPicture } from "../media/OptimizedImage";
import ScrollReveal from "../motion/ScrollReveal";

const sponsorImageModules = import.meta.glob<ImagePicture>(
    "../../assets/images/sponsors/*.png",
    {
        eager: true,
        import: "default",
        query: "?w=240;480&format=avif;webp;png&as=picture",
    },
);

const SPONSOR_NAME_OVERRIDES: Record<string, string> = {
    "boba-up-logo": "Boba Up",
    "cafe-happy-logo": "Cafe Happy",
    "ding-tea-logo": "Ding Tea",
    "don-t-yell-at-me-logo": "Don't Yell at Me",
    "ocac-logo": "OCAC",
    "seattle-best-tea-logo": "Seattle Best Tea",
    "teco-sf": "TECO SF",
    "timeless-tea-logo": "Timeless Tea",
    "tta-logo": "TTA",
    "young-tea-logo": "Young Tea",
};

function getSponsorSlug(path: string) {
    const fileName = path.split("/").pop() ?? "";

    return fileName
        .replace(/\.[^.]+$/, "")
        .replace(/_/g, "-")
        .toLowerCase();
}

function formatSponsorName(path: string) {
    const slug = getSponsorSlug(path);
    const overriddenName = SPONSOR_NAME_OVERRIDES[slug];

    if (overriddenName) return overriddenName;

    return slug
        .replace(/-logo$/, "")
        .split("-")
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

const SPONSORS = Object.entries(sponsorImageModules)
    .map(([path, image]) => ({
        image,
        name: formatSponsorName(path),
        slug: getSponsorSlug(path),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

const LOGO_TREATMENTS: Record<string, string> = {
    "cafe-happy-logo": "scale-115",
    "don-t-yell-at-me-logo": "scale-110",
    "timeless-tea-logo": "scale-110",
};

const WIDE_MOBILE_LOGOS = new Set([
    "ocac-logo",
    "seattle-best-tea-logo",
    "teco-sf",
    "tta-logo",
]);

function getMobileLogoSpan(slug: string) {
    return WIDE_MOBILE_LOGOS.has(slug) ? "col-span-2" : "col-span-1";
}

function getSponsorTileShape(slug: string) {
    return WIDE_MOBILE_LOGOS.has(slug)
        ? "min-h-24"
        : "aspect-[1.08/1] min-h-26";
};

export default function Sponsors() {
    return (
        <section
            id="sponsors"
            className="relative overflow-hidden border-t border-night-700/75 px-4 py-20 md:py-28"
        >
            <div className="pointer-events-none absolute inset-0 -z-20 bg-linear-to-b from-night-900/70 via-night-900/95 to-night-800/95" />
            <div className="pointer-events-none absolute top-8 right-[12%] -z-10 h-72 w-72 rounded-full bg-lantern-400/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-6 left-[6%] -z-10 h-80 w-80 rounded-full bg-blossom-400/8 blur-3xl" />

            <div className="mx-auto max-w-6xl">
                <ScrollReveal className="mx-auto mb-12 max-w-3xl text-center" y={30}>
                    <span className="inline-flex items-center gap-2 rounded-full border border-lantern-100/30 bg-night-900/40 px-4 py-1 text-xs font-semibold tracking-[0.25em] text-lantern-100/85 uppercase backdrop-blur-md">
                        <Sparkles className="h-3.5 w-3.5 text-lantern-300" aria-hidden="true" />
                        Community partners
                    </span>
                    <h2
                        className="mt-5 text-5xl leading-tight text-lantern-100 drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)] md:text-6xl"
                        style={{ fontFamily: '"TenPounds", "Georgia", serif' }}
                    >
                        Sponsors
                    </h2>
                    <p className="mt-3 text-base leading-7 text-warm-white/60">
                        Thank you to the local businesses and cultural partners helping bring the market to life.
                    </p>
                </ScrollReveal>

                <div className="relative">
                    <div className="pointer-events-none absolute -inset-x-4 top-1/2 h-px bg-linear-to-r from-transparent via-lantern-300/28 to-transparent" />

                    <div className="relative grid grid-flow-row-dense grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                        {SPONSORS.map(({ name, image, slug }, index) => (
                            <ScrollReveal
                                key={name}
                                className={`${getMobileLogoSpan(slug)} sm:col-span-1`}
                                delay={index * 0.035}
                                y={30}
                                scale={0.97}
                            >
                                <article
                                    className={`group relative isolate grid grid-rows-[1fr_auto] overflow-hidden rounded-lg border border-lantern-100/10 bg-night-800/46 p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-lantern-300/35 hover:bg-night-700/60 hover:shadow-[0_0_24px_rgba(251,184,72,0.1)] sm:aspect-auto sm:min-h-36 sm:bg-night-800/58 sm:p-4 ${getSponsorTileShape(slug)}`}
                                >
                                    <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-lantern-400/6 via-transparent to-blossom-400/6 opacity-65 transition-opacity duration-300 group-hover:opacity-100" />
                                    <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-linear-to-r from-transparent via-lantern-300/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                    <div className="grid h-full min-h-16 w-full place-items-center self-center sm:h-22 sm:min-h-0">
                                        <div
                                            className={`grid h-full w-full place-items-center ${LOGO_TREATMENTS[slug] ?? ""}`}
                                        >
                                            <OptimizedPicture
                                                picture={image}
                                                alt={name}
                                                className="mx-auto block max-h-15 max-w-[82%] object-contain object-center opacity-92 brightness-110 drop-shadow-[0_8px_18px_rgba(0,0,0,0.28)] transition duration-300 group-hover:scale-105 group-hover:opacity-100 sm:max-h-18 sm:max-w-[82%]"
                                                sizes="(min-width: 1024px) 180px, (min-width: 640px) 240px, 50vw"
                                            />
                                        </div>
                                    </div>

                                    <h3 className="hidden min-h-5 text-center text-sm font-semibold tracking-wide text-lantern-100/82 transition-colors duration-200 group-hover:text-lantern-100 sm:block">
                                        {name}
                                    </h3>
                                </article>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>

                <ScrollReveal y={24} delay={0.12}>
                    <div className="mx-auto mt-10 flex max-w-2xl items-center justify-center gap-3 rounded-lg border border-warm-white/10 bg-night-800/35 px-4 py-4 text-center text-sm leading-6 text-warm-white/58 backdrop-blur-sm">
                        <HeartHandshake className="h-5 w-5 shrink-0 text-blossom-300" aria-hidden="true" />
                        <p>
                            Sponsor support keeps Night Market free to attend and helps us host a full evening of food, performances, and community.
                        </p>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
