import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const LOOP_START = 99;
const VIDEO_ID = "nieWaGD-Rtc";

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        YT: any;
        onYouTubeIframeAPIReady: () => void;
    }
}


export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const playerRef = useRef<YT.Player | null>(null);
    const [videoReady, setVideoReady] = useState(false);

    useEffect(() => {
        const initPlayer = () => {
            playerRef.current = new window.YT.Player("yt-bg-player", {
                videoId: VIDEO_ID,
                playerVars: {
                    autoplay: 1,
                    mute: 1,
                    controls: 0,
                    showinfo: 0,
                    rel: 0,
                    modestbranding: 1,
                    playsinline: 1,
                    start: LOOP_START,
                },
                events: {
                    onReady: (e) => {
                        e.target.seekTo(LOOP_START, true);
                        e.target.playVideo();
                        setTimeout(() => setVideoReady(true), 500);
                    },
                    onStateChange: (e) => {
                        if (e.data === window.YT.PlayerState.ENDED) {
                            e.target.seekTo(LOOP_START, true);
                            e.target.playVideo();
                        }
                    },
                },
            });
        };

        if (window.YT && window.YT.Player) {
            initPlayer();
        } else {
            window.onYouTubeIframeAPIReady = initPlayer;
            if (!document.getElementById("yt-api-script")) {
                const script = document.createElement("script");
                script.id = "yt-api-script";
                script.src = "https://www.youtube.com/iframe_api";
                document.head.appendChild(script);
            }
        }

        return () => {
            playerRef.current?.destroy();
        };
    }, []);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative flex min-h-screen flex-col overflow-hidden px-8 pb-12 pt-16"
        >
            {/* Background video with parallax */}
            <motion.div className="absolute inset-0 h-[125%]" style={{ y: videoY }}>
                <div
                    id="yt-bg-player"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-125"
                    style={{ width: "177.78vh", height: "56.25vw", minWidth: "100%", minHeight: "100%" }}
                />
            </motion.div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />
            {/* Buffering cover — fades out once video is ready */}
            <div className={`absolute inset-0 bg-black transition-opacity duration-1000 ${videoReady ? "opacity-0 pointer-events-none" : "opacity-100"}`} />

            {/* Bottom content */}
            <div className="relative z-10 mt-auto">
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/60">
                    The UW Taiwanese Student Association presents
                </p>
                <h1 className="font-display text-6xl font-bold leading-tight text-white md:text-8xl">
                    UW Night Market
                </h1>
                <div className="mt-4 flex items-center justify-between gap-6 text-white">
                    <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                        <span className="text-base font-medium">May 23, 2026 &nbsp;·&nbsp; 4:30 – 10:00 PM</span>
                        <span className="hidden sm:block opacity-40">|</span>
                        <span className="text-base">Red Square, University of Washington</span>
                    </div>
                    <div className="animate-bounce">
                        <svg
                            className="h-6 w-6 text-white/70"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}
