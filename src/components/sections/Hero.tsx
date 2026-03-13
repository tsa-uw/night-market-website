import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function Hero() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

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
                <video
                    ref={videoRef}
                    className="h-full w-full object-cover"
                    src="/TSA NM 2025 NM Cut.mp4"
                    autoPlay
                    muted
                    playsInline
                    onLoadedMetadata={() => {
                        if (videoRef.current) {
                            videoRef.current.currentTime = 99;
                        }
                    }}
                    onEnded={() => {
                        if (videoRef.current) {
                            videoRef.current.currentTime = 99;
                            videoRef.current.play();
                        }
                    }}
                />
            </motion.div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />

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
