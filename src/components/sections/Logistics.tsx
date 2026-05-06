import Section from "../layout/Section";

const INFO_CARDS = [
    {
        heading: "Payment Info",
        body: "UW Night Market is FREE to attend. Most vendors accept card or Apple Pay for food and activities; cash availability varies by vendor.",
    },
    {
        heading: "Directions & Parking",
        body: "Take Link Light Rail to University of Washington Station, cross the pedestrian bridge, and head northwest along Rainier Vista (about 0.4 miles) to Red Square. We recommend Central Plaza Parking Garage (free starting at noon, first-come, first-served); see UW Maps for lot locations.",
    },
    {
        heading: "Other Information",
        body: "Bring a reusable bag, stay hydrated, and expect campus foot traffic. Event setup and vendor locations are shown on our event map.",
    },
    {
        heading: "Questions?",
        body: "Email us at tsauw1@gmail.com or visit the information booth on-site.",
    },
] as const;

export default function Logistics() {
    return (
        <Section id="logistics" title="Logistics" className="snap-start">
            <div className="grid gap-6 sm:grid-cols-2">
                {INFO_CARDS.map(({ heading, body }) => (
                    <div
                        key={heading}
                        className="rounded-xl border border-night-600/50 bg-night-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-blossom-400/35 hover:bg-night-700/55 hover:shadow-[0_0_32px_rgba(244,92,141,0.13)]"
                    >
                        <h3 className="mb-2 text-xl font-semibold text-lantern-100">
                            {heading}
                        </h3>
                        <p className="text-sm leading-relaxed text-warm-white/75">
                            {body}
                        </p>
                    </div>
                ))}
            </div>
        </Section>
    );
}
