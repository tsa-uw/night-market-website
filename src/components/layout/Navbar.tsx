import { Menu, X } from "lucide-react";
import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useActiveSection } from "../../hooks/useActiveSection";

const NAV_ITEMS = [
    { label: "Home", href: "#home", id: "home" },
    { label: "Trailer", href: "#trailer", id: "trailer" },
    { label: "Details", href: "#logistics", id: "logistics" },
    { label: "Raffle", href: "#raffle", id: "raffle" },
    { label: "Schedule", href: "#schedule", id: "schedule" },
    { label: "Vendors", href: "#vendors", id: "vendors" },
    { label: "Sponsors", href: "#sponsors", id: "sponsors" },
    { label: "FAQ", href: "#faq", id: "faq" },
] as const;

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);
const LOGO_SIZE = 28;
const LOGO_TEXT_GAP = 2;
const SCROLL_HIDE_THRESHOLD = 8;
const TOP_VISIBILITY_OFFSET = 32;

interface LogoPos {
    x: number;
}

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const activeSection = useActiveSection(useMemo(() => SECTION_IDS, []));

    const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
    const pillRef = useRef<HTMLDivElement>(null);
    const lastScrollYRef = useRef(0);

    const [logoPos, setLogoPos] = useState<LogoPos>({ x: 0 });

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

    useEffect(() => {
        lastScrollYRef.current = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollYRef.current;

            if (currentScrollY <= TOP_VISIBILITY_OFFSET) {
                setHidden(false);
                lastScrollYRef.current = currentScrollY;
                return;
            }

            if (Math.abs(delta) < SCROLL_HIDE_THRESHOLD) return;

            setHidden(delta > 0);
            lastScrollYRef.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            className="fixed top-4 left-4 z-50 md:left-8"
            animate={{
                opacity: hidden && !mobileOpen ? 0 : 1,
                y: hidden && !mobileOpen ? -28 : 0,
                pointerEvents: hidden && !mobileOpen ? "none" : "auto",
            }}
            transition={{ duration: 0.24, ease: "easeOut" }}
        >
            {/* Desktop glassmorphism pill */}
            <div
                ref={pillRef}
                className="relative hidden items-center gap-2 rounded-full border border-lantern-100/20 bg-night-900/62 px-12 py-3 shadow-2xl shadow-black/35 backdrop-blur-xl md:flex"
            >
                {/* Logo that slides to the left of the active link */}
                <motion.div
                    className="pointer-events-none absolute top-1/2 left-0 z-20 -translate-y-1/2"
                    animate={{ x: logoPos.x }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                    <img
                        src="/nm_logo.png"
                        alt="Night Market Logo"
                        className="drop-shadow-lg"
                        width={LOGO_SIZE}
                        height={LOGO_SIZE}
                    />
                </motion.div>

                {NAV_ITEMS.map(({ label, href, id }) => {
                    const isActive = activeSection === id;

                    return (
                        <a
                            key={id}
                            href={href}
                            ref={(el) => {
                                if (el) itemRefs.current.set(id, el);
                            }}
                            className={`relative rounded-full px-4 py-2 text-base font-semibold transition-colors ${
                                isActive
                                    ? "bg-lantern-300/15 text-lantern-100"
                                    : "text-lantern-100/65 hover:bg-night-800/75 hover:text-lantern-100"
                            }`}
                        >
                            <span className="relative z-10">{label}</span>
                        </a>
                    );
                })}
            </div>

            {/* Mobile hamburger */}
            <div className="flex items-center gap-3 rounded-full border border-lantern-100/20 bg-night-900/75 px-4 py-2 shadow-2xl shadow-black/35 backdrop-blur-xl md:hidden">
                <img src="/nm_logo.png" alt="Night Market Logo" className="h-6 w-6" />
                <span className="text-sm font-semibold text-lantern-100">
                    Night Market
                </span>
                <button
                    className="ml-2 text-lantern-100/80"
                    onClick={() => setMobileOpen((prev) => !prev)}
                    aria-label="Toggle navigation menu"
                    aria-expanded={mobileOpen}
                >
                    {mobileOpen ? (
                        <X className="h-5 w-5" aria-hidden="true" />
                    ) : (
                        <Menu className="h-5 w-5" aria-hidden="true" />
                    )}
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
                        className="mt-2 rounded-2xl border border-lantern-100/15 bg-night-900/85 px-4 py-3 shadow-2xl shadow-black/35 backdrop-blur-xl md:hidden"
                    >
                        {NAV_ITEMS.map(({ label, href, id }) => (
                            <li key={id}>
                                <a
                                    href={href}
                                    className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                                        activeSection === id
                                            ? "bg-lantern-300/15 text-lantern-100"
                                            : "text-lantern-100/70 hover:bg-night-800/70 hover:text-lantern-100"
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
