import Section from "../layout/Section";

const INFO_CARDS = [
    {
        heading: "Payment Info",
        body:
            "UW Night Market is FREE to attend. Most vendors accept card or Apple Pay for food and activities; cash availability varies by vendor.",
    },
    {
        heading: "Directions & Parking",
        body:
            "Take Link Light Rail to University of Washington Station, cross the pedestrian bridge, and head northwest along Rainier Vista (about 0.4 miles) to Red Square. We recommend Central Plaza Parking Garage (free starting at noon, first-come, first-served); see UW Maps for lot locations.",
    },
    {
        heading: "Other Information",
        body:
            "Bring a reusable bag, stay hydrated, and expect campus foot traffic. Event setup and vendor locations are shown on our event map.",
    },
    {
        heading: "Questions?",
        body: "Email us at info@uwnightmarket.com or visit the information booth on-site.",
    },
] as const;

export default function Logistics() {
    return (
        <Section id="logistics" title="Logistics">
            <div className="grid gap-6 sm:grid-cols-2">
                {INFO_CARDS.map(({ heading, body }) => (
                    <div
                        key={heading}
                        className="rounded-xl border border-crimson-600 bg-crimson-800/60 p-6 transition-colors hover:border-blossom-400/40"
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
