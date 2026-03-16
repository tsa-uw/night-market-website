import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useActiveSection } from "../../hooks/useActiveSection";

const NAV_ITEMS = [
    { label: "Home", href: "#home", id: "home" },
    { label: "Logistics", href: "#logistics", id: "logistics" },
    { label: "Raffle", href: "#raffle", id: "raffle" },
    { label: "Trailer", href: "#trailer", id: "trailer" },
    { label: "Schedule", href: "#schedule", id: "schedule" },
    { label: "Vendors", href: "#vendors", id: "vendors" },
    { label: "Sponsors", href: "#sponsors", id: "sponsors" },
    { label: "FAQ", href: "#faq", id: "faq" },
] as const;

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);
const LOGO_SIZE = 18;
const LOGO_TEXT_GAP = 8;

interface LogoPos {
    x: number;
}

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const activeSection = useActiveSection(useMemo(() => SECTION_IDS, []));

    const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
    const pillRef = useRef<HTMLDivElement>(null);

    const [logoPos, setLogoPos] = useState<LogoPos>({ x: 0 });
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

    const recalc = useCallback(() => {
        const pillEl = pillRef.current;
        const linkEl = itemRefs.current.get(activeSection);
        if (!pillEl || !linkEl) return;

        const pillRect = pillEl.getBoundingClientRect();
        const linkRect = linkEl.getBoundingClientRect();
        const linkStyles = window.getComputedStyle(linkEl);
        const paddingLeft = Number.parseFloat(linkStyles.paddingLeft) || 0;

        setLogoPos({
            x:
                linkRect.left -
                pillRect.left +
                paddingLeft -
                LOGO_SIZE -
                LOGO_TEXT_GAP,
        });
    }, [activeSection]);

    useEffect(() => {
        recalc();
    }, [recalc]);

    useEffect(() => {
        window.addEventListener("resize", recalc);
        return () => window.removeEventListener("resize", recalc);
    }, [recalc]);

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 flex justify-center"
            animate={{ y: visible ? 0 : -100 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => { isHovered.current = true; setVisible(true); }}
            onMouseLeave={() => { isHovered.current = false; }}
        >
            {/* Desktop glassmorphism pill */}
            <div
                ref={pillRef}
                className="relative hidden items-center gap-2 rounded-b-3xl bg-warm-gold px-8 py-3 md:flex"
            >
                {/* Logo that slides to the left of the active link */}
                <motion.div
                    className="pointer-events-none absolute top-1/2 left-0 z-20 -translate-y-1/2"
                    animate={{ x: logoPos.x }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                    <img
                        src="/tsa_logo.png"
                        alt="TSA Logo"
                        className="[filter:drop-shadow(0_0_1px_rgba(245,209,106,0.25))]"
                        width={LOGO_SIZE}
                        height={LOGO_SIZE}
                    />
                </motion.div>

                {NAV_ITEMS.map(({ label, href, id }) => {
                    return (
                        <a
                            key={id}
                            href={href}
                            ref={(el) => {
                                if (el) itemRefs.current.set(id, el);
                            }}
                            className="relative inline-flex items-center rounded-full px-4 py-2 text-base font-semibold transition-colors"
                        >
                            <span
                                className={`relative z-10 ${
                                    activeSection === id
                                        ? "text-crimson-500"
                                        : "text-crimson-500/50 hover:text-crimson-500"
                                }`}
                            >
                                {label}
                            </span>
                        </a>
                    );
                })}
            </div>

            {/* Mobile hamburger */}
            <div className="flex items-center gap-3 bg-warm-gold px-4 py-2 shadow-lg md:hidden">
                <img src="/tsa_logo.png" alt="TSA Logo" className="h-6 w-6" />
                <span className="text-sm font-semibold text-crimson-500">
                    Night Market
                </span>
                <button
                    className="ml-2 text-crimson-500/80"
                    onClick={() => setMobileOpen((prev) => !prev)}
                    aria-label="Toggle navigation menu"
                    aria-expanded={mobileOpen}
                >
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        {mobileOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile dropdown */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 bg-warm-gold px-4 py-3 shadow-lg md:hidden"
                    >
                        {NAV_ITEMS.map(({ label, href, id }) => (
                            <li key={id}>
                                <a
                                    href={href}
                                    className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                                        activeSection === id
                                            ? "text-crimson-500"
                                            : "text-crimson-500/60 hover:text-crimson-500"
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
        </motion.nav>
    );
}
