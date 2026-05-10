import { useState } from "react";
import Section from "../layout/Section";
import { vendors } from "../../styles/tokens";

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

    const vendorList = activeTab === "food" ? FOOD_VENDORS : ARTS_VENDORS;

    return (
        <Section id="vendors" title="Vendors">
            {/* Tabs */}
            <div className={vendors.tabs}>
                <button
                    className={`rounded-full px-6 py-2 text-sm font-semibold transition-all duration-200 ${
                        activeTab === "food"
                            ? "bg-blossom-400 text-night-900 shadow-[0_0_16px_rgba(244,92,141,0.35)]"
                            : "border border-night-600/50 text-warm-white/75 hover:border-blossom-400/40 hover:text-warm-white"
                    }`}
                    onClick={() => setActiveTab("food")}
                >
                    Food
                </button>
                <button
                    className={`rounded-full px-6 py-2 text-sm font-semibold transition-all duration-200 ${
                        activeTab === "arts"
                            ? "bg-blossom-400 text-night-900 shadow-[0_0_16px_rgba(244,92,141,0.35)]"
                            : "border border-night-600/50 text-warm-white/75 hover:border-blossom-400/40 hover:text-warm-white"
                    }`}
                    onClick={() => setActiveTab("arts")}
                >
                    Arts &amp; Crafts
                </button>
            </div>

            {/* Vendor grid */}
            <div className={vendors.grid}>
                {vendorList.map(({ name, description, image, page }) => (
                    <a key={name} href={page ?? "#"} className="group">
                        <div className="rounded-xl border border-night-600/50 bg-night-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-lantern-400/40 hover:bg-night-700/55 hover:shadow-[0_0_32px_rgba(251,184,72,0.1)]">
                            <div className="mb-4 h-32 w-full overflow-hidden rounded-lg bg-night-700/80">
                                {image ? (
                                    <img
                                        src={image}
                                        alt={name}
                                        className={vendors.cardImg}
                                    />
                                ) : (
                                    <div className={vendors.cardImageFallback}>No image</div>
                                )}
                            </div>

                            <h3 className="mb-1 text-lg font-semibold text-lantern-100">
                                {name}
                            </h3>
                            <p className="text-sm text-warm-white/65">{description}</p>
                        </div>
                    </a>
                ))}
            </div>
        </Section>
    );
}
