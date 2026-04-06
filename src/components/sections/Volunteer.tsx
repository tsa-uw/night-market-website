import Section from "../layout/Section";
import { text, volunteer } from "../../styles/tokens";

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
            <div className={volunteer.wrapper}>
                <p className={volunteer.description}>
                    Join us in bringing one of UW's biggest cultural events to life! Volunteers help with food booths,
                    games, photography, and more — earning up to <span className={text.subheading}>5 volunteer hours</span> and
                    a <span className={text.subheading}>free Night Market t-shirt</span>.
                </p>

                <h3 className={volunteer.stepHeading}>How to get involved</h3>
                <ol className={volunteer.stepList}>
                    {STEPS.map(({ label }, i) => (
                        <li key={i} className={volunteer.step}>
                            <span className={volunteer.stepNum}>
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
