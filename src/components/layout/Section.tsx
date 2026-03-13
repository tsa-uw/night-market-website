import type { ReactNode } from "react";
import { section } from "../../styles/tokens";

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
        <section id={id} className={`px-8 py-16 md:py-24 ${className}`}>
            <div>
                {title && (
                    <h2 className={section.title}>
                        {title}
                    </h2>
                )}
                {children}
            </div>
        </section>
    );
}
