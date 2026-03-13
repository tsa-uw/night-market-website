import { useMemo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useActiveSection } from "../../hooks/useActiveSection";

const NAV_ITEMS = [
    { label: "Home", href: "#home", id: "home" },
    { label: "Details", href: "#details", id: "details" },
    { label: "Raffle", href: "#raffle", id: "raffle" },
    { label: "Trailer", href: "#trailer", id: "trailer" },
    { label: "Schedule", href: "#schedule", id: "schedule" },
    { label: "Vendors", href: "#vendors", id: "vendors" },
    { label: "Sponsors", href: "#sponsors", id: "sponsors" },
    { label: "Volunteer", href: "#volunteer", id: "volunteer" },
    { label: "FAQ", href: "#faq", id: "faq" },
] as const;

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);
const SLIDE_TRANSITION = { duration: 1, ease: [0.16, 1, 0.3, 1] } as const;

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const activeSection = useActiveSection(useMemo(() => SECTION_IDS, []));
    const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(0);
    const isHovered = useRef(false);

    useEffect(() => {
        const onScroll = () => {
            if (isHovered.current) return;
            const current = window.scrollY;
            setVisible(current < lastScrollY.current || current < 10);
            lastScrollY.current = current;
        };
        const onMouseMove = (e: MouseEvent) => {
            if (e.clientY < 72) setVisible(true);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("mousemove", onMouseMove, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, []);

    const hoverHandlers = {
        onMouseEnter: () => { isHovered.current = true; setVisible(true); },
        onMouseLeave: () => { isHovered.current = false; },
    };

    return (
        <>
            {/* Logo — separate fixed element, no blend */}
            <motion.img
                src="/NM Logo Black Words.png"
                alt="Night Market Logo"
                className="fixed left-8 z-50 hidden h-24 w-auto md:block"
                animate={{ top: visible ? 24 : -120 }}
                transition={SLIDE_TRANSITION}
                {...hoverHandlers}
            />

            {/* Nav links — blend mode on the nav itself so it composites against the page backdrop */}
            <motion.nav
                className="fixed right-0 z-50 flex items-start justify-end px-8 pt-6 [mix-blend-mode:difference]"
                animate={{ top: visible ? 0 : -120 }}
                transition={SLIDE_TRANSITION}
                {...hoverHandlers}
            >
                {/* Desktop nav links */}
                <div className="hidden items-center md:flex">
                    {NAV_ITEMS.map(({ label, href, id }) => (
                        <a
                            key={id}
                            href={href}
                            className={`px-3 py-2 text-sm font-semibold text-white transition-opacity ${
                                activeSection === id ? "opacity-100" : "opacity-50 hover:opacity-100"
                            }`}
                        >
                            {label}
                        </a>
                    ))}
                </div>

                {/* Mobile: hamburger + dropdown */}
                <div className="relative md:hidden">
                    <button
                        className="p-2 text-white"
                        onClick={() => setMobileOpen((prev) => !prev)}
                        aria-label="Toggle navigation menu"
                        aria-expanded={mobileOpen}
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            {mobileOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>

                    <AnimatePresence>
                        {mobileOpen && (
                            <motion.ul
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 top-full mt-1 text-right"
                            >
                                {NAV_ITEMS.map(({ label, href, id }) => (
                                    <li key={id}>
                                        <a
                                            href={href}
                                            className={`block px-3 py-1.5 text-sm font-semibold text-white transition-opacity ${
                                                activeSection === id ? "opacity-100" : "opacity-50 hover:opacity-100"
                                            }`}
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </div>
            </motion.nav>
        </>
    );
}
