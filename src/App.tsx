import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Details from "./components/sections/Details";
import RaffleTickets from "./components/sections/RaffleTickets";
import EventTrailer from "./components/sections/EventTrailer";
import Schedule from "./components/sections/Schedule";
import Vendors from "./components/sections/Vendors";
import Sponsors from "./components/sections/Sponsors";
import FAQ from "./components/sections/FAQ";
import Volunteer from "./components/sections/Volunteer";

export default function App() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <Details />
                <RaffleTickets />
                <EventTrailer />
                <Schedule />
                <Vendors />
                <Sponsors />
                <Volunteer />
                <FAQ />
            </main>
            <footer className="border-t border-black px-8 py-8 text-center text-sm text-black/40">
                &copy; 2026 TSA Night Market. All rights reserved.
            </footer>
        </>
    );
}
