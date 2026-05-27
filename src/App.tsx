import Navbar from "./components/layout/Navbar";
import ScrollProgress from "./components/layout/ScrollProgress";
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
            <ScrollProgress />
            <Navbar />
            <main className="relative">
                <Hero />
                <EventTrailer />
                <Logistics />
                <RaffleTickets />
                <Schedule />
                <Vendors />
                <Sponsors />
                <FAQ />
            </main>
            <footer className="border-t border-night-700 bg-night-900 px-4 py-8 text-center text-sm text-lantern-100/55">
                <p>&copy; 2026 TSA Night Market. All rights reserved.</p>
                <p className="mt-3">
                    Site by{" "}
                    <a
                        href="https://connorlin.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lantern-100/75 underline-offset-2 transition-colors hover:text-lantern-100 hover:underline"
                    >
                        Connor Lin
                    </a>
                    {" · "}
                    <a
                        href="https://www.linkedin.com/in/connor-lin-dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lantern-100/75 underline-offset-2 transition-colors hover:text-lantern-100 hover:underline"
                    >
                        LinkedIn
                    </a>
                    {" · "}
                    <a
                        href="mailto:me@connorlin.dev"
                        className="text-lantern-100/75 underline-offset-2 transition-colors hover:text-lantern-100 hover:underline"
                    >
                        me@connorlin.dev
                    </a>
                </p>
            </footer>
        </>
    );
}
