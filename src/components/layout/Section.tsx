import type { ReactNode } from "react";

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
        <section id={id} className={`px-4 py-16 md:py-24 ${className}`}>
            <div className="mx-auto max-w-6xl">
                {title && (
                    <h2 className="mb-10 text-center font-display text-3xl font-bold tracking-wide text-lantern-300 md:text-4xl">
                        {title}
                    </h2>
                )}
                {children}
            </div>
        </section>
    );
}
