import type { Collection } from "@sveltia/cms";
import { aboutHeroConfig } from "./hero-section";
import { aboutCtaSectionConfig } from "./cta-section";
import { aboutFeaturesSectionConfig } from "./features-section";
import { aboutTeamSectionConfig } from "./team-section";

export const aboutPageCollection: Collection = {
    name: "about",
    label: "About Page",
    // A file collection manages specific configuration files rather than a folder layout
    files: [
        aboutHeroConfig,
        aboutFeaturesSectionConfig, 
        aboutTeamSectionConfig,
        aboutCtaSectionConfig
    ]
};
