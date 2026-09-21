import type { Collection } from "@sveltia/cms";
import { aboutHeroSectionConfig } from "./hero.cms";
import { aboutCtaSectionConfig } from "./cta.cms";
import { aboutFeaturesSectionConfig } from "./features.cms";
import { aboutTeamSectionConfig } from "./team.cms";

export const aboutPageCollection: Collection = {
    name: "about",
    label: "About Page",
    files: [
        aboutHeroSectionConfig,
        aboutFeaturesSectionConfig, 
        aboutTeamSectionConfig,
        aboutCtaSectionConfig
    ]
};
