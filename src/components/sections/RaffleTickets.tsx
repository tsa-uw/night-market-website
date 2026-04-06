import Section from "../layout/Section";
import { raffle, section } from "../../styles/tokens";

export default function RaffleTickets() {
    return (
        <Section id="raffle" className={raffle.section} paddingY="py-[200px]">
            <h2 className={section.titleWhite}>Raffle Tickets</h2>
            <div className={raffle.wrapper}>
                <p className={raffle.body}>
                    {/* TODO: Add raffle details, pricing, and prizes */}
                    Raffle ticket details, pricing, and prize information coming
                    soon!
                </p>
            </div>
        </Section>
    );
}
