import type { Collection } from "@sveltia/cms";
import { propertiesPageConfig } from "./listing-page.cms";


export const propertiesPageCollection: Collection = {
    name: "properties-page",
    label: "Properties Page",
    // A file collection manages specific configuration files rather than a folder layout
    files: [
        propertiesPageConfig
    ]
};