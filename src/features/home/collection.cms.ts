import type { Collection } from "@sveltia/cms";
import { heroConfig } from "./hero.cms";
import { categoriesSectionConfig } from "./categories.cms";
import { listingsSectionConfig } from "./listings.cms";
import { featuresSectionConfig } from "./features.cms";
import { testimonialsSectionConfig } from "./testimonials.cms";
import { ctaSectionConfig } from "./cta.cms";

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
