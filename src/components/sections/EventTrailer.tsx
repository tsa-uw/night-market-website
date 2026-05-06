import { useEffect, useRef, useState } from "react";

const CONTROL_BUTTON_CLASS =
    "absolute bottom-4 grid h-11 w-11 place-items-center rounded-full border border-lantern-100/25 bg-night-900/70 text-lantern-100 shadow-xl shadow-black/40 backdrop-blur-md transition hover:bg-night-800/85 focus:ring-2 focus:ring-lantern-300 focus:ring-offset-2 focus:ring-offset-black focus:outline-none md:bottom-6";

export default function EventTrailer() {
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [muted, setMuted] = useState(true);

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

    useEffect(() => {
        if (!videoRef.current) return;

        videoRef.current.muted = muted;
        if (!muted) {
            void videoRef.current.play().catch(() => {
                setMuted(true);
            });
        }
    }, [muted]);

    const restartVideo = () => {
        const video = videoRef.current;
        if (!video) return;

        video.currentTime = 0;
        void video.play().catch(() => {
            // Autoplay can still be blocked by browser policy.
        });
    };

    return (
        <section
            ref={sectionRef}
            id="trailer"
            className="relative isolate flex h-[100svh] scroll-mt-0 snap-start snap-always items-center justify-center overflow-hidden bg-black"
        >
            <h2 className="sr-only">Event Trailer</h2>

            <div className="absolute inset-0 -z-20 bg-night-900" />
            <div className="pointer-events-none absolute inset-0 -z-10 bg-radial from-blossom-400/16 via-night-900/70 to-black" />

            <div className="w-full max-w-[min(calc(133.333svh-4rem),calc(100vw-2rem))]">
                <div className="relative aspect-4/3 w-full overflow-hidden bg-night-900 shadow-2xl shadow-black/60">
                    <video
                        ref={videoRef}
                        className="h-full w-full object-contain"
                        loop
                        muted={muted}
                        playsInline
                        preload="metadata"
                        poster="/Promo-poster.jpg"
                    >
                        <source
                            src="/Promo-960.mp4"
                            type="video/mp4"
                            media="(max-width: 767px)"
                        />
                        <source src="/Promo-cloudflare.mp4" type="video/mp4" />
                        Your browser does not support the event trailer video.
                    </video>
                    <button
                        type="button"
                        className={`${CONTROL_BUTTON_CLASS} left-4 md:left-6`}
                        aria-label="Restart trailer"
                        onClick={restartVideo}
                    >
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-5.5 2.5L3 8"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 3v5h5"
                            />
                        </svg>
                    </button>
                    <button
                        type="button"
                        className={`${CONTROL_BUTTON_CLASS} right-4 md:right-6`}
                        aria-label={muted ? "Unmute trailer" : "Mute trailer"}
                        aria-pressed={!muted}
                        onClick={() => setMuted((current) => !current)}
                    >
                        {muted ? (
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11 5 6 9H3v6h3l5 4V5Z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m19 9-4 4m0-4 4 4"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11 5 6 9H3v6h3l5 4V5Z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </section>
    );
}
