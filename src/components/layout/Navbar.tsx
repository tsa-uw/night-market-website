import { useState } from "react";

const NAV_ITEMS = [
    { label: "Home", href: "#home" },
    { label: "Logistics", href: "#logistics" },
    { label: "Raffle", href: "#raffle" },
    { label: "Trailer", href: "#trailer" },
    { label: "Schedule", href: "#schedule" },
    { label: "Vendors", href: "#vendors" },
    { label: "Sponsors", href: "#sponsors" },
    { label: "FAQ", href: "#faq" },
] as const;

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="fixed top-0 z-50 w-full bg-night-900/90 backdrop-blur-sm border-b border-night-600">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
                <a
                    href="#home"
                    className="font-display text-lg font-bold text-lantern-300"
                >
                    TSA Night Market
                </a>

                {/* Desktop nav */}
                <ul className="hidden gap-6 md:flex">
                    {NAV_ITEMS.map(({ label, href }) => (
                        <li key={href}>
                            <a
                                href={href}
                                className="text-sm font-medium text-warm-white/80 transition-colors hover:text-blossom-300"
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile hamburger */}
                <button
                    className="text-warm-white md:hidden"
                    onClick={() => setMobileOpen((prev) => !prev)}
                    aria-label="Toggle navigation menu"
                    aria-expanded={mobileOpen}
                >
                    <svg
                        className="h-6 w-6"
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
            {mobileOpen && (
                <ul className="border-t border-night-600 bg-night-900/95 px-4 pb-4 md:hidden">
                    {NAV_ITEMS.map(({ label, href }) => (
                        <li key={href}>
                            <a
                                href={href}
                                className="block py-2 text-sm text-warm-white/80 transition-colors hover:text-blossom-300"
                                onClick={() => setMobileOpen(false)}
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
}
