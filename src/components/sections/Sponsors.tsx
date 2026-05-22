import { Sparkles } from "lucide-react";
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
    "alaska-airlines-logo": "Alaska Airlines",
    "american-campus-communities-logo": "American Campus",
    "formosa-logo": "Formosus",
    "ocac-logo": "OCAC",
    "supreme-dumplings-logo": "Supreme Dumplings",
    "teco-education-division-logo": "TECO San Francisco",
    "teco-seattle-logo": "TECO Seattle",
    "tnt-supermarket-logo": "T&T Supermarket",
    "weichuan-logo": "Wei-Chuan",
    "tta-logo": "Taiwan Tourism Administration",
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

const LOGO_SCALE: Record<string, string> = {
    "american-campus-communities-logo": "scale-105",
    "formosa-logo": "scale-110",
    "supreme-dumplings-logo": "scale-105",
    "weichuan-logo": "scale-110",
};

const WHITE_BG_LOGOS = new Set([
    "alaska-airlines-logo",
    "american-campus-communities-logo",
    "ocac-logo",
    "supreme-dumplings-logo",
    "teco-education-division-logo",
    "teco-seattle-logo",
    "tnt-supermarket-logo",
    "weichuan-logo",
]);

function getLogoBg(slug: string) {
    return WHITE_BG_LOGOS.has(slug)
        ? "rounded-lg bg-white px-3 py-2.5 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08)]"
        : "";
}

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
                <ScrollReveal
                    className="mx-auto mb-12 max-w-3xl text-center"
                    y={30}
                >
                    <span className="inline-flex items-center gap-2 rounded-full border border-lantern-100/30 bg-night-900/40 px-4 py-1 text-xs font-semibold tracking-[0.25em] text-lantern-100/85 uppercase backdrop-blur-md">
                        <Sparkles
                            className="h-3.5 w-3.5 text-lantern-300"
                            aria-hidden="true"
                        />
                        Community partners
                    </span>
                    <h2
                        className="mt-5 text-5xl leading-tight text-lantern-100 drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)] md:text-6xl"
                        style={{ fontFamily: '"TenPounds", "Georgia", serif' }}
                    >
                        Sponsors
                    </h2>
                    <p className="mt-3 text-base leading-7 text-warm-white/60">
                        Thank you to the local businesses and cultural partners
                        helping bring the market to life.
                    </p>
                </ScrollReveal>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
                    {SPONSORS.map(({ name, image, slug }, index) => (
                        <ScrollReveal
                            key={name}
                            delay={index * 0.035}
                            y={24}
                            scale={0.97}
                        >
                            <article className="group relative isolate flex h-full flex-col items-center overflow-hidden rounded-xl border border-lantern-100/10 bg-night-800/50 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-lantern-300/30 hover:bg-night-700/60 hover:shadow-[0_8px_32px_rgba(251,184,72,0.12)]">
                                <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-lantern-400/5 via-transparent to-blossom-400/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-lantern-300/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                <div className="flex min-h-20 w-full flex-1 items-center justify-center py-1 sm:min-h-24">
                                    <OptimizedPicture
                                        picture={image}
                                        alt={name}
                                        className={`block max-h-14 max-w-[88%] object-contain object-center opacity-90 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100 sm:max-h-16 ${getLogoBg(slug)} ${LOGO_SCALE[slug] ?? ""}`}
                                        sizes="(min-width: 1024px) 180px, (min-width: 640px) 220px, 48vw"
                                    />
                                </div>

                                <h3 className="mt-2.5 text-center text-[11px] font-semibold tracking-wide text-lantern-100/70 transition-colors duration-200 group-hover:text-lantern-100/95 sm:text-xs">
                                    {name}
                                </h3>
                            </article>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
