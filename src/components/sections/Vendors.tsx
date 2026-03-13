import { useState } from "react";
import Section from "../layout/Section";

type VendorTab = "food" | "arts";

// Vendor names sourced from the archived site pages (representative subset)
const FOOD_VENDORS = [
    {
        name: "The Moo Bar",
        description: "Bubble tea and specialty drinks.",
        page: "/74256206069953c1a1d97d/the-moo-bar.html",
    },
    {
        name: "Pho Ha",
        description: "Vietnamese pho and noodle bowls.",
        page: "/74256206069953c1a1d97d/pho-ha.html",
    },
    { name: "Phe", description: "Thai-inspired specialties.", page: "/74256206069953c1a1d97d/phe.html" },
    {
        name: "Peachy X Noodle",
        description: "Noodle bowls and snacks.",
        page: "/74256206069953c1a1d97d/peachyxnoodle.html",
    },
    {
        name: "Sunright",
        description: "Taiwanese shaved ice and drinks.",
        page: "/74256206069953c1a1d97d/sunright.html",
    },
    {
        name: "Tapioca Express",
        description: "Bubble tea and refreshments.",
        page: "/74256206069953c1a1d97d/tapioca-express.html",
    },
];

const ARTS_VENDORS = [
    {
        name: "Biscuitfloof Studios",
        description: "Handmade plush and art prints.",
        page: "/74256206069953c1a1d97d/biscuitfloof-studios.html",
    },
    {
        name: "Clara Jane Studio",
        description: "Illustration and stationery.",
        page: "/74256206069953c1a1d97d/clara-jane-studio.html",
    },
    {
        name: "Misha Charms",
        description: "Custom charms and accessories.",
        page: "/74256206069953c1a1d97d/mishacharms.html",
    },
    {
        name: "Shooley Art",
        description: "Original prints and enamel pins.",
        page: "/74256206069953c1a1d97d/shooley-art.html",
    },
    {
        name: "Stephanie Mai Designs",
        description: "Jewelry and accessories.",
        page: "/74256206069953c1a1d97d/stephanie-mai-designs.html",
    },
];

export default function Vendors() {
    const [activeTab, setActiveTab] = useState<VendorTab>("food");

    const vendors = activeTab === "food" ? FOOD_VENDORS : ARTS_VENDORS;

    return (
        <Section id="vendors" title="Vendors">
            {/* Tabs */}
            <div className="mb-8 flex justify-center gap-4">
                <button
                    className={`rounded-full px-6 py-2 text-sm font-semibold transition-colors ${
                        activeTab === "food"
                            ? "bg-blossom-400 text-white"
                            : "border border-night-600 text-warm-white/90 hover:border-blossom-400/40"
                    }`}
                    onClick={() => setActiveTab("food")}
                >
                    Food
                </button>
                <button
                    className={`rounded-full px-6 py-2 text-sm font-semibold transition-colors ${
                        activeTab === "arts"
                            ? "bg-blossom-400 text-white"
                            : "border border-night-600 text-warm-white/90 hover:border-blossom-400/40"
                    }`}
                    onClick={() => setActiveTab("arts")}
                >
                    Arts &amp; Crafts
                </button>
            </div>

            {/* Vendor grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {vendors.map(({ name, description, image, page }) => (
                    <a key={name} href={page ?? "#"} className="group">
                        <div className="rounded-xl border border-night-600 bg-night-800/60 p-6 transition-colors hover:border-lantern-400/40">
                            <div className="mb-4 h-32 w-full overflow-hidden rounded-lg bg-night-700">
                                {image ? (
                                    // Use archived asset path so user doesn't need to upload
                                    // assets into the React app.
                                    <img
                                        src={image}
                                        alt={name}
                                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-sm text-warm-white/60">No image</div>
                                )}
                            </div>

                            <h3 className="mb-1 font-display text-lg font-semibold text-warm-white">
                                {name}
                            </h3>
                            <p className="text-sm text-warm-white/80">{description}</p>
                        </div>
                    </a>
                ))}
            </div>
        </Section>
    );
}
