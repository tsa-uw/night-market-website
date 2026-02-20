import { useState } from "react";
import Section from "../layout/Section";

type VendorTab = "food" | "arts";

// TODO: Replace with actual vendor data
const FOOD_VENDORS = [
    { name: "Vendor 1", description: "Menu and prices coming soon." },
    { name: "Vendor 2", description: "Menu and prices coming soon." },
    { name: "Vendor 3", description: "Menu and prices coming soon." },
];

const ARTS_VENDORS = [
    { name: "Artist 1", description: "Bio and portfolio coming soon." },
    { name: "Artist 2", description: "Bio and portfolio coming soon." },
    { name: "Artist 3", description: "Bio and portfolio coming soon." },
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
                {vendors.map(({ name, description }) => (
                    <div
                        key={name}
                        className="rounded-xl border border-night-600 bg-night-800/60 p-6 transition-colors hover:border-lantern-400/40"
                    >
                        {/* TODO: Add vendor logo / images */}
                        <div className="mb-4 h-32 w-full rounded-lg bg-night-700" />

                        <h3 className="mb-1 font-display text-lg font-semibold text-warm-white">
                            {name}
                        </h3>
                        <p className="text-sm text-warm-white/80">
                            {description}
                        </p>
                    </div>
                ))}
            </div>
        </Section>
    );
}
