import type { Collection } from "@sveltia/cms";
import { listingsPageConfig } from "./listings-page.cms";


export const listingsPageCollection: Collection = {
    name: "listings-page",
    label: "Properties Page",
    // A file collection manages specific configuration files rather than a folder layout
    files: [
        listingsPageConfig
    ]
};