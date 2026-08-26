import type { Collection } from "@sveltia/cms";
import { socialConfig } from "./socail";
import { addressConfig } from "./address";
import { contactConfig } from "./contact";
import { businessHoursConfig } from "./business-hours";
import { siteDetailConfig } from "./site-detail";
import { brandingConfig } from "./branding";
import { siteMetadataConfig } from "./meta-data";

export const coreDetailCollection: Collection = {
    name: "core-detail",
    label: "Core Detail",
    // A file collection manages specific configuration files rather than a folder layout
    files: [
        siteDetailConfig,
        contactConfig,
        addressConfig,
        businessHoursConfig,
        socialConfig,
        brandingConfig,
        siteMetadataConfig
    ]
};
