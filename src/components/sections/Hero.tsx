export default function Hero() {
    return (
        <section
            id="home"
            className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-16 text-center"
        >
            {/* Background placeholder — swap with asset later */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night-800 via-night-900 to-night-900" />

            {/* Cherry blossom decoration placeholders */}
            {/* TODO: Replace with drawn cherry blossom assets */}

            <h1 className="font-display text-5xl font-bold leading-tight text-warm-white md:text-7xl">
                TSA Night Market
            </h1>

            <p className="mt-4 text-xl font-medium text-blossom-500 md:text-2xl">
                May 23, 2026
            </p>

            <p className="mt-2 text-lg text-warm-white/85">
                {/* TODO: Fill in actual times */}
                00:00 – 00:00 @ Red Square
            </p>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 animate-bounce">
                <svg
                    className="h-6 w-6 text-warm-white/70"
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
