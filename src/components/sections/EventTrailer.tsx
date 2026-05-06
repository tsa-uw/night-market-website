import { useEffect, useRef } from "react";

export default function EventTrailer() {
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const video = videoRef.current;
        if (!section || !video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry) return;

                if (entry.intersectionRatio >= 0.35) {
                    video.preload = "auto";
                }

                if (entry.intersectionRatio >= 0.65) {
                    void video.play().catch(() => {
                        // Autoplay can still be blocked by browser policy.
                    });
                    return;
                }

                if (entry.intersectionRatio < 0.2) {
                    video.pause();
                }
            },
            { threshold: [0, 0.2, 0.35, 0.65, 1] },
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="trailer"
            className="relative isolate flex min-h-screen scroll-mt-0 snap-start items-center justify-center overflow-hidden bg-black px-4 py-8"
        >
            <h2 className="sr-only">Event Trailer</h2>

            <div className="absolute inset-0 -z-20 bg-night-900" />
            <div className="pointer-events-none absolute inset-0 -z-10 bg-radial from-blossom-400/16 via-night-900/70 to-black" />

            <div className="h-full w-full max-w-[min(133.333vh,100vw)]">
                <div className="aspect-4/3 w-full overflow-hidden bg-night-900 shadow-2xl shadow-black/60">
                    <video
                        ref={videoRef}
                        className="h-full w-full object-contain"
                        controls
                        muted
                        playsInline
                        preload="metadata"
                        poster="/Promo-poster.jpg"
                    >
                        <source
                            src="/Promo-960.mp4"
                            type="video/mp4"
                            media="(max-width: 767px)"
                        />
                        <source src="/Promo.mp4" type="video/mp4" />
                        Your browser does not support the event trailer video.
                    </video>
                </div>
            </div>
        </section>
    );
}
