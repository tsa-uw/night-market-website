import Section from "../layout/Section";
import { sponsors } from "../../styles/tokens";

// Representative sponsor list pulled from archived site assets
const SPONSORS = [
    { name: "ASUW", image: "/assets/archive/asuw_orig.png" },
    { name: "TECO Seattle", image: "/assets/archive/teco-seattle_2.jpg" },
];

export default function Sponsors() {
    return (
        <Section id="sponsors" title="Sponsors">
            <p className={sponsors.description}>
                Thank you to our sponsors for making this event possible!
            </p>

            <div className={sponsors.grid}>
                {SPONSORS.map(({ name, image }) => (
                    <div
                        key={name}
                        className="flex h-28 items-center justify-center overflow-hidden rounded-xl border border-night-600/50 bg-night-800/50 backdrop-blur-sm transition-all duration-300 hover:border-lantern-400/35 hover:shadow-[0_0_24px_rgba(251,184,72,0.1)]"
                    >
                        {image ? (
                            <img
                                src={image}
                                alt={name}
                                className={sponsors.logo}
                            />
                        ) : (
                            <span className={sponsors.fallback}>{name}</span>
                        )}
                    </div>
                ))}
            </div>
        </Section>
    );
}
