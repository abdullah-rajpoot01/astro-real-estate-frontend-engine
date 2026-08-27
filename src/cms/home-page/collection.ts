import type { Collection } from "@sveltia/cms";
import { heroConfig } from "./hero";
import { categoriesSectionConfig } from "./categories";
import { listingsSectionConfig } from "./listings";
import { featuresSectionConfig } from "./features";
import { testimonialsSectionConfig } from "./testimonials";
import { ctaSectionConfig } from "./cta";

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
