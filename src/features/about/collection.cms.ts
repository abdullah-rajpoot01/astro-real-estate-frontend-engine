import type { Collection } from "@sveltia/cms";
import { aboutHeroConfig } from "./hero.cms";
import { aboutCtaSectionConfig } from "./cta.cms";
import { aboutFeaturesSectionConfig } from "./features.cms";
import { aboutTeamSectionConfig } from "./team.cms";

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
