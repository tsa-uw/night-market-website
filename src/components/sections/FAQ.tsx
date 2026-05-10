import { ChevronDown } from "lucide-react";
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
        answer:
            "May 23, 2026 — 4:30 PM to 10:00 PM at Red Square, University of Washington (Seattle, WA 98195).",
    },
    {
        question: "Is there an entry fee?",
        answer:
            "No — the Night Market is free to attend. Food and activities are paid by vendors.",
    },
    {
        question: "What forms of payment are accepted?",
        answer:
            "Most vendors accept card or Apple Pay. Cash acceptance varies by vendor; bring card or mobile pay when possible.",
    },
    {
        question: "Is parking available?",
        answer:
            "We recommend the Central Plaza Parking Garage (free starting at noon on a first-come, first-served basis). For transit, take Link Light Rail to University of Washington Station and walk across the pedestrian bridge to campus (~0.4 miles).",
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
        <Section id="faq" title="FAQ">
            <div className="mx-auto max-w-2xl">
                {FAQ_ITEMS.map((item) => (
                    <Accordion key={item.question} {...item} />
                ))}
            </div>
        </Section>
    );
}
