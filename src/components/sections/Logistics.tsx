import {
    Accessibility,
    CalendarDays,
    Car,
    CreditCard,
    Info,
    MapPin,
    PawPrint,
    Train,
} from "lucide-react";
import landingPageBackground from "../../assets/images/LandingPageBackground.jpg";

const DETAIL_CARDS = [
    {
        heading: "When & Where",
        image: "/Promo-poster.jpg",
        items: [
            {
                icon: CalendarDays,
                title: "Saturday, May 23, 2026",
                detail: "4:30 PM - 10:00 PM",
            },
            {
                icon: MapPin,
                title: "Red Square @ UW",
                detail: "4063 Spokane Ln, Seattle, WA 98105",
            },
        ],
    },
    {
        heading: "Getting There",
        image: "/assets/archive/parking_orig.png",
        items: [
            {
                icon: Car,
                title: "Free parking",
                detail: "East Campus Lots E1, E12, E18, E19",
            },
            {
                icon: Car,
                title: "Limited paid parking",
                detail: "Central Plaza Garage",
            },
            {
                icon: Train,
                title: "Light Rail Lines 1 & 2",
                detail: "to UW District Station",
            },
            {
                icon: MapPin,
                title: "Bus stops",
                detail: "near campus",
            },
        ],
    },
    {
        heading: "Accommodations",
        image: landingPageBackground,
        items: [
            {
                icon: Accessibility,
                title: "12 portable restrooms",
                detail: "2 ADA-accessible",
            },
            {
                icon: Info,
                title: "Info booth",
                detail: "next to Odegaard Library",
            },
            {
                icon: PawPrint,
                title: "Animals",
                detail: "must be leashed",
            },
            {
                icon: CreditCard,
                title: "Card & Apple Pay",
                detail: "only",
            },
        ],
    },
] as const;

export default function Logistics() {
    return (
        <section
            id="logistics"
            className="relative overflow-hidden border-y border-lantern-100/10 bg-night-900"
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgb(244_92_141_/_13%),transparent_32%),radial-gradient(circle_at_86%_18%,rgb(251_184_72_/_10%),transparent_34%)]" />

            <div className="relative">
                <div className="relative isolate flex min-h-[72svh] items-center justify-center overflow-hidden px-4 py-24 text-center md:px-8">
                    <img
                        src={landingPageBackground}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 -z-30 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 -z-20 bg-night-900/72" />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night-900/45 via-night-900/62 to-night-900" />

                    <div className="mx-auto max-w-5xl">
                        <p className="mb-4 text-xs font-bold tracking-[0.28em] text-lantern-300/90 uppercase">
                            Details
                        </p>
                        <h2
                            className="text-5xl text-lantern-100 drop-shadow-[0_8px_26px_rgba(0,0,0,0.55)] md:text-7xl"
                            style={{
                                fontFamily: '"TenPounds", "Georgia", serif',
                            }}
                        >
                            About
                        </h2>
                        <p className="mx-auto mt-8 max-w-4xl text-lg leading-8 font-medium text-warm-white/86 md:text-2xl md:leading-10">
                            The UW Night Market is one of the{" "}
                            <strong className="text-lantern-100">
                                largest student-run events
                            </strong>{" "}
                            at the University of Washington. Come celebrate its{" "}
                            <strong className="text-lantern-100">
                                26th year
                            </strong>{" "}
                            with cultural performances, fun games, delicious
                            food, and raffle prizes. It's{" "}
                            <strong className="text-lantern-100">
                                free and open to all!
                            </strong>
                        </p>
                    </div>
                </div>

                <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 md:grid-cols-3 md:px-6 md:py-8">
                    {DETAIL_CARDS.map(({ heading, image, items }) => (
                        <article
                            key={heading}
                            className="group relative isolate min-h-[24rem] overflow-hidden border border-lantern-100/10 bg-night-800 shadow-2xl shadow-black/25"
                        >
                            <img
                                src={image}
                                alt=""
                                aria-hidden="true"
                                className="absolute inset-0 -z-30 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 -z-20 bg-night-900/72 transition duration-500 group-hover:bg-night-900/66" />
                            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/18 via-night-900/48 to-black/82" />

                            <div className="flex h-full min-h-[24rem] flex-col justify-center px-6 py-10 text-center md:px-8">
                                <h3 className="text-sm font-black tracking-[0.22em] text-lantern-200/86 uppercase">
                                    {heading}
                                </h3>

                                <div className="mt-8 space-y-5">
                                    {items.map(({ icon: Icon, title, detail }) => (
                                        <div
                                            key={`${title}-${detail}`}
                                            className="mx-auto flex max-w-sm items-start gap-3 text-left"
                                        >
                                            <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-lantern-300/25 bg-night-900/55 text-lantern-300">
                                                <Icon
                                                    className="h-4 w-4"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                            <p className="text-base leading-6 text-warm-white/82">
                                                <strong className="font-extrabold text-lantern-100">
                                                    {title}
                                                </strong>
                                                <span className="block text-warm-white/76">
                                                    {detail}
                                                </span>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
