import type { Collection } from "@sveltia/cms";
import { propertiesPageConfig } from "./page-config";


export const propertiesPageCollection: Collection = {
    name: "properties-page",
    label: "Properties Page",
    // A file collection manages specific configuration files rather than a folder layout
    files: [
        propertiesPageConfig
    ]
};