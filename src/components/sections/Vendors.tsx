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
                    className={activeTab === "food" ? vendors.tabActive : vendors.tabInactive}
                    onClick={() => setActiveTab("food")}
                >
                    Food
                </button>
                <button
                    className={activeTab === "arts" ? vendors.tabActive : vendors.tabInactive}
                    onClick={() => setActiveTab("arts")}
                >
                    Arts &amp; Crafts
                </button>
            </div>

            {/* Vendor grid */}
            <div className={vendors.grid}>
                {vendorList.map(({ name, description, image, page }) => (
                    <a key={name} href={page ?? "#"} className="group">
                        <div className={vendors.card}>
                            <div className={vendors.cardImage}>
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

                            <h3 className={vendors.cardName}>
                                {name}
                            </h3>
                            <p className={vendors.cardDesc}>{description}</p>
                        </div>
                    </a>
                ))}
            </div>
        </Section>
    );
}
