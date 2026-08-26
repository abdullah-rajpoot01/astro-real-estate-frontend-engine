import type { Collection } from "@sveltia/cms";
import { categoriesPageConfig } from "./page-config";


export const categoriesPageCollection: Collection = {
    name: "categories-page",
    label: "Categories Page",
    // A file collection manages specific configuration files rather than a folder layout
    files: [
        categoriesPageConfig
    ]
};