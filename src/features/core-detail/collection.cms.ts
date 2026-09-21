import type { Collection } from "@sveltia/cms";
import { socialConfig } from "./social.cms";
import { addressConfig } from "./address.cms";
import { contactConfig } from "./contact.cms";
import { businessHoursConfig } from "./business-hours.cms";
import { siteDetailConfig } from "./site-detail.cms";
import { brandingConfig } from "./branding.cms";
import { siteMetadataConfig } from "./metadata.cms";

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
