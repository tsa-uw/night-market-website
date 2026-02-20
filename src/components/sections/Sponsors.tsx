import Section from "../layout/Section";

// TODO: Replace with actual sponsor data & logos
const SPONSORS = [
    { name: "Sponsor 1" },
    { name: "Sponsor 2" },
    { name: "Sponsor 3" },
    { name: "Sponsor 4" },
];

export default function Sponsors() {
    return (
        <Section id="sponsors" title="Sponsors">
            <p className="mb-8 text-center text-warm-white/85">
                Thank you to our sponsors for making this event possible!
            </p>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                {SPONSORS.map(({ name }) => (
                    <div
                        key={name}
                        className="flex h-28 items-center justify-center rounded-xl border border-night-600 bg-night-800/60"
                    >
                        {/* TODO: Replace with sponsor logo images */}
                        <span className="text-sm text-warm-white/75">
                            {name}
                        </span>
                    </div>
                ))}
            </div>
        </Section>
    );
}
