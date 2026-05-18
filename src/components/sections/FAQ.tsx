import { ChevronDown } from "lucide-react";
import { useState } from "react";
import ScrollReveal from "../motion/ScrollReveal";

interface FAQItem {
    question: string;
    answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
    {
        question: "When and where is the Night Market?",
        answer:
            "Saturday, May 23, 2026 from 4:30 PM to 10:00 PM at Red Square, University of Washington, 4063 Spokane Ln, Seattle, WA 98195.",
    },
    {
        question: "Is there an entry fee?",
        answer:
            "No. UW Night Market is free and open to everyone. Food, raffle tickets, and select vendor items are purchased separately.",
    },
    {
        question: "What forms of payment are accepted?",
        answer:
            "Vendors are card and Apple Pay only, so plan to bring a card or mobile wallet.",
    },
    {
        question: "Is parking available?",
        answer:
            "Free parking is available in East Campus lots E1, E12, E18, and E19. Limited paid parking is available in Central Plaza Garage. For transit, take Link Light Rail to University of Washington Station and walk onto campus.",
    },
    {
        question: "Where do I buy raffle tickets?",
        answer:
            "Raffle tickets are $3 per entry and are sold at the TSA Information Booth from 4:30 PM to 8:00 PM. Winners are drawn on the main stage at 8:35 PM and must be present to claim prizes.",
    },
    {
        question: "Where can I get help during the event?",
        answer:
            "Visit the TSA Information Booth next to Odegaard Library for event questions, raffle tickets, and general help.",
    },
];

function Accordion({ question, answer }: FAQItem) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-b border-night-700/75">
            <button
                className="group flex w-full items-center justify-between py-4 text-left transition-colors duration-200 hover:text-lantern-100"
                onClick={() => setOpen((prev) => !prev)}
                aria-expanded={open}
            >
                <span className="pr-4 font-medium text-warm-white/85 transition-colors duration-200 group-hover:text-warm-white">
                    {question}
                </span>
                <ChevronDown
                    className={`h-5 w-5 shrink-0 text-blossom-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                    aria-hidden="true"
                />
            </button>
            {/* CSS grid rows trick for smooth height animation */}
            <div
                className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
                <div className="overflow-hidden">
                    <p className="pb-4 text-sm leading-relaxed text-warm-white/65">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function FAQ() {
    return (
        <section
            id="faq"
            className="relative overflow-hidden border-t border-night-700/75 px-4 py-20 md:py-28"
        >
            <div className="pointer-events-none absolute inset-0 -z-20 bg-linear-to-b from-night-900/70 via-night-900/95 to-night-800/95" />
            <div className="pointer-events-none absolute top-10 -left-20 -z-10 h-52 w-52 rounded-full bg-blossom-400/10 blur-3xl" />
            <div className="pointer-events-none absolute right-0 bottom-0 -z-10 h-64 w-64 rounded-full bg-lantern-400/10 blur-3xl" />

            <div className="mx-auto max-w-6xl">
                <ScrollReveal
                    className="mx-auto mb-12 max-w-3xl text-center"
                    y={30}
                >
                    <span className="inline-flex rounded-full border border-lantern-100/30 bg-night-900/40 px-4 py-1 text-xs font-semibold tracking-[0.25em] text-lantern-100/85 uppercase backdrop-blur-md">
                        Need to know
                    </span>
                    <h2
                        className="mt-5 text-5xl leading-tight text-lantern-100 drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)] md:text-6xl"
                        style={{ fontFamily: '"TenPounds", "Georgia", serif' }}
                    >
                        FAQ
                    </h2>
                    <p className="mt-3 text-base leading-7 text-warm-white/60">
                        The essentials for planning your night at Red Square.
                    </p>
                </ScrollReveal>

                <div className="mx-auto max-w-2xl">
                    {FAQ_ITEMS.map((item, index) => (
                        <ScrollReveal
                            key={item.question}
                            delay={index * 0.05}
                            y={24}
                            scale={0.99}
                        >
                            <Accordion {...item} />
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
