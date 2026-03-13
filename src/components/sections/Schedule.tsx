import Section from "../layout/Section";

interface Performer {
    name: string;
    duration: string;
    time?: string;
    tentative?: boolean;
    note?: string;
    description: string;
    image?: string;
    imagePosition?: string;
    logo?: string;
}

const PERFORMERS: Performer[] = [
    {
        name: "Husky Wushu",
        duration: "15 min",
        time: "4:33 PM",
        tentative: true,
        description:
            "Wushu is a Chinese martial art and international sport derived from hundreds of years of traditional Chinese Kung Fu. Husky Wushu has been an active club at UW since 2009, with a mission to foster an inclusive community around the practice of Chinese martial arts. They will perform a medley of individual forms, group forms, and fight sets — including hand forms and weapon forms such as sword, staff, and fan.",
        image: "/entertainment group images/Husky Wushu.JPEG",
        logo: "/entertainment group images/Husky Wushu Logo.png",
    },
    {
        name: "Apex Diabolo",
        duration: "5–10 min",
        note: "Evening performance with lights",
        description:
            "Apex is a performance group based in Seattle specializing in a unique circus prop called the diabolo, or Chinese Yo-yo. They have performed at the Night Market in previous years as well as other cultural events in the Seattle area. Tonight they combine elements of modern pop with traditional techniques to bring you an unforgettable show.",
    },
    {
        name: "Divine Dance Crew",
        duration: "10 min",
        description:
            "DIVINE DANCE CREW is a dance crew established in 2024 that does a variety of dance covers including K-Pop. Our members come from different places around the world but are united through a shared love and passion for dance and K-Pop. We aim to bring the excitement and enjoyment of performance to everyone!",
        image: "/entertainment group images/Divine Group pic.JPG",
        logo: "/entertainment group images/DIVINE LOGO.png",
    },
    {
        name: "Food Eating Contest",
        duration: "15 min",
        description: "Hosted by TSA. Think you have what it takes?",
    },
    {
        name: "Step Up Dance Crew",
        duration: "5–10 min",
        description: "An energetic performance from Step Up Dance Crew.",
    },
    {
        name: "National Taiwan University of Sport",
        duration: "10 min",
        note: "2026 We Are Taiwan — U.S. Tour",
        description:
            "We are honored to welcome a special performance from the National Taiwan University of Sport. As part of their U.S. tour titled '2026 We Are Taiwan,' these talented students bring together athletic excellence, artistry, and cultural pride. Through dynamic movement and powerful storytelling, they showcase the energy, creativity, and spirit of Taiwan.",
        image: "/entertainment group images/we are taiwan banner.jpg",
        imagePosition: "object-right",
        logo: "/entertainment group images/we are tw logo.jpg",
    },
];

export default function Schedule() {
    return (
        <Section id="schedule" title="Entertainment Schedule">
            <div className="grid border-l border-t border-black sm:grid-cols-2 lg:grid-cols-3">
                {PERFORMERS.map(({ name, duration, time, tentative, note, description, image, imagePosition, logo }) => (
                    <div key={name} className="overflow-hidden border-r border-b border-black">
                        {image && (
                            <div className="relative h-64 w-full overflow-hidden">
                                <img
                                    src={image}
                                    alt={name}
                                    className={`h-full w-full object-cover ${imagePosition ?? ""}`}
                                />
                                {logo && (
                                    <img
                                        src={logo}
                                        alt={`${name} logo`}
                                        className="absolute bottom-3 left-3 h-12 w-12 rounded-full object-cover shadow-lg"
                                    />
                                )}
                            </div>
                        )}
                        <div className="p-6">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                                <h3 className="text-lg font-semibold text-black">{name}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {time && (
                                        <span className="border border-black px-3 py-1 text-xs font-medium text-black/80">
                                            {time}{tentative && " (tentative)"}
                                        </span>
                                    )}
                                    <span className="border border-black px-3 py-1 text-xs font-medium text-black/60">
                                        {duration}
                                    </span>
                                </div>
                            </div>
                            {note && (
                                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-black/50">{note}</p>
                            )}
                            <p className="mt-3 text-sm leading-relaxed text-black/70">{description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
