import { useState } from "react";
import Section from "../layout/Section";
import { faq } from "../../styles/tokens";

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
        answer: "No — the Night Market is free to attend. Food and activities are paid by vendors.",
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
        <div className={faq.item}>
            <button
                className={faq.button}
                onClick={() => setOpen((prev) => !prev)}
                aria-expanded={open}
            >
                <span className={faq.question}>
                    {question}
                </span>
                <svg
                    className={`${faq.icon} ${open ? "rotate-180" : ""}`}
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
                <div className={faq.answer}>
                    {answer}
                </div>
            )}
        </div>
    );
}

export default function FAQ() {
    return (
        <Section id="faq" title="FAQ">
            <div className={faq.wrapper}>
                {FAQ_ITEMS.map((item) => (
                    <Accordion key={item.question} {...item} />
                ))}
            </div>
        </Section>
    );
}
