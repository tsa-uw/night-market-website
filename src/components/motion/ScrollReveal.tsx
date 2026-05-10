import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    x?: number;
    y?: number;
    scale?: number;
    once?: boolean;
}

export default function ScrollReveal({
    children,
    className,
    delay = 0,
    duration = 0.65,
    x = 0,
    y = 28,
    scale = 0.98,
    once = true,
}: ScrollRevealProps) {
    const prefersReducedMotion = useReducedMotion();

    if (prefersReducedMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, x, y, scale }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            viewport={{ once, amount: 0.18, margin: "0px 0px -8% 0px" }}
            transition={{
                delay,
                duration,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {children}
        </motion.div>
    );
}
