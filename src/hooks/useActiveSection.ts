import { useEffect, useState } from "react";

/**
 * Returns the section whose bounds contain the viewport midpoint.
 * This prevents switching to the next section too early.
 */
export function useActiveSection(sectionIds: string[]) {
    const [activeId, setActiveId] = useState(sectionIds[0]);

    useEffect(() => {
        const sections = sectionIds
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => Boolean(el));

        if (sections.length === 0) return;

        const updateActiveSection = () => {
            const threshold = window.innerHeight / 4;

            let currentActive = sectionIds[0];

            for (const section of sections) {
                const { top, bottom } = section.getBoundingClientRect();

                if (top <= threshold && bottom > threshold) {
                    currentActive = section.id;
                    break;
                }

                if (top <= threshold) {
                    currentActive = section.id;
                }
            }

            setActiveId(currentActive);
        };

        updateActiveSection();
        window.addEventListener("scroll", updateActiveSection, {
            passive: true,
        });
        window.addEventListener("resize", updateActiveSection);

        return () => {
            window.removeEventListener("scroll", updateActiveSection);
            window.removeEventListener("resize", updateActiveSection);
        };
    }, [sectionIds]);

    return activeId;
}
