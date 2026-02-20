import { useState } from "react";
import Section from "../layout/Section";

interface FAQItem {
    question: string;
    answer: string;
}

// TODO: Replace with actual FAQ content
const FAQ_ITEMS: FAQItem[] = [
    {
        question: "When and where is the Night Market?",
        answer: "May 23, 2026 at Red Square. Specific hours TBA.",
    },
    {
        question: "Is there an entry fee?",
        answer: "Entry details coming soon.",
    },
    {
        question: "What forms of payment are accepted?",
        answer: "Payment information coming soon.",
    },
    {
        question: "Is parking available?",
        answer: "Parking and directions information coming soon.",
    },
];

function Accordion({ question, answer }: FAQItem) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-b border-night-600">
            <button
                className="flex w-full items-center justify-between py-4 text-left"
                onClick={() => setOpen((prev) => !prev)}
                aria-expanded={open}
            >
                <span className="pr-4 font-medium text-warm-white/90">
                    {question}
                </span>
                <svg
                    className={`h-5 w-5 shrink-0 text-blossom-300 transition-transform ${open ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>
            {open && (
                <div className="pb-4 text-sm leading-relaxed text-warm-white/60">
                    {answer}
                </div>
            )}
        </div>
    );
}

export default function FAQ() {
    return (
        <Section id="faq" title="FAQ">
            <div className="mx-auto max-w-2xl">
                {FAQ_ITEMS.map((item) => (
                    <Accordion key={item.question} {...item} />
                ))}
            </div>
        </Section>
    );
}
