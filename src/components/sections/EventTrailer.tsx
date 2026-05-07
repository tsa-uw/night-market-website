import { RotateCcw, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CONTROL_BUTTON_CLASS =
    "absolute bottom-4 grid h-11 w-11 place-items-center rounded-full border border-lantern-100/25 bg-night-900/70 text-lantern-100 shadow-xl shadow-black/40 backdrop-blur-md transition duration-200 ease-out hover:scale-110 hover:border-lantern-300/50 hover:bg-night-800/90 hover:text-lantern-300 hover:shadow-[0_0_16px_2px_theme(colors.lantern.300/20%)] active:scale-95 active:duration-75 focus:outline-none md:bottom-6";

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
            className="relative isolate flex h-[100svh] scroll-mt-0 items-center justify-center overflow-hidden bg-black"
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
                        <RotateCcw className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        className={`${CONTROL_BUTTON_CLASS} right-4 md:right-6`}
                        aria-label={muted ? "Unmute trailer" : "Mute trailer"}
                        aria-pressed={!muted}
                        onClick={() => setMuted((current) => !current)}
                    >
                        {muted ? (
                            <VolumeX className="h-5 w-5" aria-hidden="true" />
                        ) : (
                            <Volume2 className="h-5 w-5" aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>
        </section>
    );
}
