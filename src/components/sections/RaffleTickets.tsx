import Section from "../layout/Section";

export default function RaffleTickets() {
    return (
        <Section id="raffle" title="Raffle Tickets">
            <div className="mx-auto max-w-2xl rounded-xl border border-lantern-400/30 bg-night-800/50 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:border-lantern-400/50 hover:shadow-[0_0_32px_rgba(251,184,72,0.1)]">
                <p className="text-lg leading-relaxed text-warm-white/75">
                    {/* TODO: Add raffle details, pricing, and prizes */}
                    Raffle ticket details, pricing, and prize information coming
                    soon!
                </p>
            </div>
        </Section>
    );
}
