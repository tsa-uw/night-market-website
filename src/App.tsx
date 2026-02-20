import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Logistics from "./components/sections/Logistics";
import RaffleTickets from "./components/sections/RaffleTickets";
import EventTrailer from "./components/sections/EventTrailer";
import Schedule from "./components/sections/Schedule";
import Vendors from "./components/sections/Vendors";
import Sponsors from "./components/sections/Sponsors";
import FAQ from "./components/sections/FAQ";

export default function App() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <Logistics />
                <RaffleTickets />
                <EventTrailer />
                <Schedule />
                <Vendors />
                <Sponsors />
                <FAQ />
            </main>
            <footer className="border-t border-night-600 px-4 py-8 text-center text-sm text-warm-white/40">
                &copy; 2026 TSA Night Market. All rights reserved.
            </footer>
        </>
    );
}
