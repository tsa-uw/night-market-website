import { useEffect, useState } from "react";

/**
 * Observes all sections matching the given IDs and returns the one
 * currently most visible in the viewport.
 */
export function useActiveSection(sectionIds: string[]) {
    const [activeId, setActiveId] = useState(sectionIds[0]);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        const visibilityMap = new Map<string, number>();

        for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (!el) continue;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    visibilityMap.set(id, entry.intersectionRatio);

                    // Pick the section with the highest visible ratio
                    let best = sectionIds[0];
                    let bestRatio = 0;
                    for (const [key, ratio] of visibilityMap) {
                        if (ratio > bestRatio) {
                            bestRatio = ratio;
                            best = key;
                        }
                    }
                    setActiveId(best);
                },
                { threshold: [0, 0.25, 0.5, 0.75, 1] },
            );

            observer.observe(el);
            observers.push(observer);
        }

        return () => observers.forEach((o) => o.disconnect());
    }, [sectionIds]);

    return activeId;
}
