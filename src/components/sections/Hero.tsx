export default function Hero() {
    return (
        <section
            id="home"
            className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-16 text-center"
        >
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-warm-gold/60">
                The UW Taiwanese Student Association presents
            </p>

            <h1 className="font-display text-6xl font-bold leading-tight text-warm-gold md:text-8xl">
                UW Night Market
            </h1>

            <div className="mt-8 flex flex-col items-center gap-2 text-warm-gold/90 sm:flex-row sm:gap-6">
                <span className="text-base font-medium">May 23, 2026 &nbsp;·&nbsp; 4:30 – 10:00 PM</span>
                <span className="hidden sm:block text-warm-gold/40">|</span>
                <span className="text-base">Red Square, University of Washington</span>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 animate-bounce">
                <svg
                    className="h-6 w-6 text-warm-gold/70"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>
        </section>
    );
}
