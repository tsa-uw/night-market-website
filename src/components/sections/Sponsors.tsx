import Section from "../layout/Section";

// Representative sponsor list pulled from archived site assets
const SPONSORS = [
    { name: "ASUW", image: "/assets/archive/asuw_orig.png" },
    { name: "TECO Seattle", image: "/assets/archive/teco-seattle_2.jpg" },
];

export default function Sponsors() {
    return (
        <Section id="sponsors" title="Sponsors">
            <p className="mb-8 text-center text-black/85">
                Thank you to our sponsors for making this event possible!
            </p>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-6">
                {SPONSORS.map(({ name, image }) => (
                    <div
                        key={name}
                        className="flex h-28 items-center justify-center rounded-xl border border-black bg-red-800/60 overflow-hidden"
                    >
                        {image ? (
                            <img
                                src={image}
                                alt={name}
                                className="h-full max-h-20 w-auto object-contain"
                            />
                        ) : (
                            <span className="text-sm text-white/75">{name}</span>
                        )}
                    </div>
                ))}
            </div>
        </Section>
    );
}
