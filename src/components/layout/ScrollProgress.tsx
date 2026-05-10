import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 28,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className="fixed top-0 left-0 z-60 h-px w-full origin-left bg-linear-to-r from-blossom-300 via-lantern-300 to-blossom-300 shadow-[0_0_18px_rgba(255,208,106,0.45)]"
            style={{ scaleX }}
            aria-hidden="true"
        />
    );
}
