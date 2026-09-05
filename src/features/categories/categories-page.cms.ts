import type { Collection } from "@sveltia/cms";
import type { CollectionFile } from "@sveltia/cms";

const categoriesPageConfig: CollectionFile = {
    name: "categoriesPageConfig",
    label: "Categories Page Settings",
    file: "pages/categories.json",
    format: "json",
    fields: [
        {
            name: "title",
            label: "Main Title",
            widget: "string",
            required: true
        },
        {
            name: "description",
            label: "Description Text",
            widget: "text",
            required: true
        },
        {
            name: "listingPerPage",
            label: "Listings Per Page",
            widget: "number",
            value_type: "int", // Restricts input to integers only
            min: 1,            // Enforces minimum value constraint
            required: true
        }
    ]
};


export const categoriesPageCollection: Collection = {
    name: "categories-page",
    label: "Categories Page",
    // A file collection manages specific configuration files rather than a folder layout
    files: [
        categoriesPageConfig
    ]
};