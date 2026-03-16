import { useState } from "react";
import Section from "../layout/Section";

type VendorTab = "food" | "arts";

type Vendor = {
    name: string;
    description: string;
    page: string;
    image?: string;
};

// Vendor names sourced from the archived site pages (representative subset)
const FOOD_VENDORS: Vendor[] = [
    {
        name: "To be determined!",
        description: "Applications welcome.",
        page: "/#",
    },
];

const ARTS_VENDORS: Vendor[] = [
    {
        name: "To be determined!",
        description: "Applications welcome.",
        page: "/#",
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
                            : "border border-crimson-600 text-warm-gold/90 hover:border-blossom-400/40"
                    }`}
                    onClick={() => setActiveTab("food")}
                >
                    Food
                </button>
                <button
                    className={`rounded-full px-6 py-2 text-sm font-semibold transition-colors ${
                        activeTab === "arts"
                            ? "bg-blossom-400 text-white"
                            : "border border-crimson-600 text-warm-gold/90 hover:border-blossom-400/40"
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
                        <div className="rounded-xl p-6">
                            <div className="mb-4 h-32 w-full overflow-hidden rounded-lg">
                                {image ? (
                                    // Use archived asset path so user doesn't need to upload
                                    // assets into the React app.
                                    <img
                                        src={image}
                                        alt={name}
                                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-sm text-warm-gold/60">No image</div>
                                )}
                            </div>

                            <h3 className="mb-1 font-display text-lg font-semibold text-warm-gold">
                                {name}
                            </h3>
                            <p className="text-sm text-warm-gold/80">{description}</p>
                        </div>
                    </a>
                ))}
            </div>
        </Section>
    );
}
