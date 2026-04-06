export default function EventTrailer() {
    return (
        <section id="trailer" className="relative mt-4 h-screen w-full overflow-hidden">
            {/* YouTube — autoplaying, looping, muted background */}
            <iframe
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full scale-[1.4] pointer-events-none"
                src="https://www.youtube.com/embed/3W0OGt1qlZM?autoplay=1&mute=1&loop=1&playlist=3W0OGt1qlZM&controls=0&rel=0&modestbranding=1&playsinline=1&disablekb=1"
                title="Event Trailer"
                allow="autoplay; encrypted-media"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50 pointer-events-none" />

            {/* Text — top left */}
            <div className="absolute left-8 top-8 right-8 z-10">
                <h2 className="font-display text-4xl font-bold tracking-wide text-white md:text-6xl">
                    Event Trailer
                </h2>
                <p className="mt-2 leading-normal text-[18px] font-[400] tracking-wide text-white/80">
                    In development. Here's our trailer from last year.
                </p>
            </div>
        </section>
    );
}
