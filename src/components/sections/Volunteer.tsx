import Section from "../layout/Section";
import { text, border } from "../../styles/tokens";

const STEPS = [
    { label: "Sign up through our Google Form." },
    { label: "Submit your Liability Waiver." },
    { label: "Apply for a Food Handler's Permit if working at food booths." },
    { label: "Attend Volunteer Orientation." },
    { label: "Get ready for Night Market — Saturday, May 23rd, 2026!" },
];

export default function Volunteer() {
    return (
        <Section id="volunteer" title="Volunteer">
            <div className="mx-auto max-w-2xl">
                <p className={`mb-8 text-center text-lg leading-relaxed ${text.body}`}>
                    Join us in bringing one of UW's biggest cultural events to life! Volunteers help with food booths,
                    games, photography, and more — earning up to <span className={text.subheading}>5 volunteer hours</span> and
                    a <span className={text.subheading}>free Night Market t-shirt</span>.
                </p>

                <h3 className={`mb-4 font-display text-xl ${text.subheading}`}>How to get involved</h3>
                <ol className="space-y-3">
                    {STEPS.map(({ label }, i) => (
                        <li key={i} className="flex items-start gap-4">
                            <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center ${border.default} text-xs font-bold ${text.muted}`}>
                                {i + 1}
                            </span>
                            <span className={text.body}>{label}</span>
                        </li>
                    ))}
                </ol>
            </div>
        </Section>
    );
}
