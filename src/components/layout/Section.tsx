import type { ReactNode } from "react";
import ScrollReveal from "../motion/ScrollReveal";

interface SectionProps {
    id: string;
    title?: string;
    className?: string;
    children: ReactNode;
}

export default function Section({
    id,
    title,
    className = "",
    children,
}: SectionProps) {
    return (
        <section
            id={id}
            className={`relative overflow-hidden border-t border-night-700/75 px-4 py-16 md:py-24 ${className}`}
        >
            <div className="pointer-events-none absolute inset-0 -z-20 bg-linear-to-b from-night-900/70 via-night-900/95 to-night-800/95" />
            <div className="pointer-events-none absolute top-10 -left-20 -z-10 h-52 w-52 rounded-full bg-blossom-400/10 blur-3xl" />
            <div className="pointer-events-none absolute right-0 bottom-0 -z-10 h-64 w-64 rounded-full bg-lantern-400/10 blur-3xl" />

            <div className="mx-auto max-w-6xl">
                {title && (
                    <ScrollReveal y={26}>
                        <h2
                            className="mb-10 text-center text-3xl tracking-wide text-lantern-100 md:text-4xl"
                            style={{ fontFamily: '"TenPounds", "Georgia", serif' }}
                        >
                            {title}
                        </h2>
                    </ScrollReveal>
                )}
                {children}
            </div>
        </section>
    );
}
