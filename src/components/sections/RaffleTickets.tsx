import Section from "../layout/Section";

export default function RaffleTickets() {
    return (
        <Section id="raffle" title="Raffle Tickets">
            <div className="mx-auto max-w-2xl rounded-xl border border-lantern-400/30 bg-night-800/60 p-8 text-center">
                <p className="text-lg leading-relaxed text-warm-white/90">
                    {/* TODO: Add raffle details, pricing, and prizes */}
                    Raffle ticket details, pricing, and prize information coming
                    soon!
                </p>
            </div>
        </Section>
    );
}
