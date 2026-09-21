import type { Collection } from "@sveltia/cms";
import { homeHeroSectionConfig } from "./hero.cms";
import { homeCategoriesSectionConfig } from "./categories.cms";
import { homeListingsSectionConfig } from "./listings.cms";
import { HomeFeaturesSectionConfig } from "./features.cms";
import { homeTestimonialsSectionConfig } from "./testimonials.cms";
import { homeCtaSectionConfig } from "./cta.cms";

export const homePageCollection: Collection = {
    name: "home",
    label: "Home Page",
    // A file collection manages specific configuration files rather than a folder layout
    files: [
        homeHeroSectionConfig,
        homeCategoriesSectionConfig,
        homeListingsSectionConfig,
        HomeFeaturesSectionConfig,
        homeTestimonialsSectionConfig,
        homeCtaSectionConfig
    ]
};
