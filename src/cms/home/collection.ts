import type { Collection } from "@sveltia/cms";
import { heroConfig } from "./hero-section";
import { categoriesSectionConfig } from "./categories-section";
import { listingsSectionConfig } from "./listingsSection";
import { featuresSectionConfig } from "./features-section";
import { testimonialsSectionConfig } from "./testimonials-section";
import { ctaSectionConfig } from "./cta-section";

export const homePageCollection: Collection = {
    name: "home",
    label: "Home Page",
    // A file collection manages specific configuration files rather than a folder layout
    files: [
        heroConfig,
        categoriesSectionConfig,
        listingsSectionConfig,
        featuresSectionConfig,
        testimonialsSectionConfig,
        ctaSectionConfig
    ]
};
