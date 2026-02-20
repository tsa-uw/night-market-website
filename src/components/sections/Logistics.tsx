import Section from "../layout/Section";

const INFO_CARDS = [
    {
        heading: "Payment Info",
        body: "Details about accepted payment methods will go here.",
    },
    {
        heading: "Directions & Parking",
        body: "How to get to Red Square and where to park.",
    },
    {
        heading: "Other Information",
        body: "Important warnings and things to know before you arrive.",
    },
    {
        heading: "Questions?",
        body: "Come find us at the info booth!",
    },
] as const;

export default function Logistics() {
    return (
        <Section id="logistics" title="Logistics">
            <div className="grid gap-6 sm:grid-cols-2">
                {INFO_CARDS.map(({ heading, body }) => (
                    <div
                        key={heading}
                        className="rounded-xl border border-night-600 bg-night-800/60 p-6 transition-colors hover:border-blossom-400/40"
                    >
                        <h3 className="mb-2 font-display text-xl font-semibold text-warm-white">
                            {heading}
                        </h3>
                        <p className="text-sm leading-relaxed text-warm-white/85">
                            {body}
                        </p>
                    </div>
                ))}
            </div>
        </Section>
    );
}
