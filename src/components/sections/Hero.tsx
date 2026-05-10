import { ChevronDown } from "lucide-react";
import landingPageBackground from "../../assets/images/LandingPageBackground.jpg";

export default function Hero() {
    return (
        <section
            id="home"
            className="relative isolate flex min-h-screen items-center overflow-hidden px-4 pb-16 pt-24 text-center md:px-8"
        >
            <img
                src={landingPageBackground}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-30 h-full w-full object-cover object-center"
            />
            <div className="animate-hero-darken pointer-events-none absolute inset-0 -z-20 bg-night-900/10" />
            <div className="animate-hero-darken pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-night-900/5 via-night-900/20 to-night-900" />
            <div className="animate-hero-darken pointer-events-none absolute -top-28 left-1/2 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-blossom-300/20 blur-3xl" />

            <div className="animate-hero-fade-in mx-auto w-full max-w-4xl">
                <p className="inline-flex rounded-full border border-lantern-100/30 bg-night-900/30 px-4 py-1 text-xs font-semibold tracking-[0.25em] text-lantern-100/85 uppercase backdrop-blur-md md:text-sm">
                    TSAUW
                </p>

                <h1
                    className="mt-6 text-6xl leading-[0.9] text-lantern-100 drop-shadow-[0_8px_30px_rgba(0,0,0,0.55)] sm:text-7xl md:text-8xl"
                    style={{ fontFamily: '"TenPounds", "Georgia", serif' }}
                >
                    UW Night Market
                </h1>

                <p className="mt-6 text-xl font-medium text-lantern-100 md:text-2xl">
                    May 23, 2026 | 4:30 PM - 10:00 PM
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                    <a
                        href="#raffle"
                        className="rounded-full bg-lantern-300 px-6 py-3 text-sm font-bold tracking-wide text-night-900 shadow-xl shadow-night-900/25 transition hover:bg-lantern-200 md:text-base"
                    >
                        Get Raffle Info
                    </a>
                    <a
                        href="#schedule"
                        className="rounded-full border border-lantern-100/55 bg-night-900/20 px-6 py-3 text-sm font-bold tracking-wide text-lantern-100 backdrop-blur-sm transition hover:border-lantern-100 hover:bg-night-900/35 md:text-base"
                    >
                        View Schedule
                    </a>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="animate-hero-fade-in-late absolute bottom-8">
                <div className="animate-bounce">
                    <ChevronDown
                        className="h-6 w-6 text-lantern-100/75"
                        aria-hidden="true"
                    />
                </div>
            </div>
        </section>
    );
}
