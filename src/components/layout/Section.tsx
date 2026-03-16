import type { ReactNode } from "react";
import { section, layout } from "../../styles/tokens";

interface SectionProps {
    id: string;
    title?: string;
    className?: string;
    paddingY?: string;
    children: ReactNode;
}

export default function Section({
    id,
    title,
    className = "",
    paddingY = "py-16 md:py-24",
    children,
}: SectionProps) {
    return (
        <section id={id} className={`${layout.pagePadding} ${paddingY} ${className}`}>
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
