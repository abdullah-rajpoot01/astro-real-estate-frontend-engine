import type { Collection } from "@sveltia/cms";
import { propertyTypesPageConfig } from "./page-config";


export const propertyTypesPageCollection: Collection = {
    name: "property-types-page",
    label: "Property Types Page",
    // A file collection manages specific configuration files rather than a folder layout
    files: [
        propertyTypesPageConfig
    ]
};