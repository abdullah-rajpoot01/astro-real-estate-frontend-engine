import type { Collection } from "@sveltia/cms";

export const categoriesCollection: Collection = {
    name: "categories",
    label: "Categories",
    label_singular: "Category",
    folder: "categories",
    format: "json",
    create: true,
    limit:200,
    // Automatically names the .json file based on the created 'name' property safely
    slug: "{{name}}",
    fields: [
        {
            name: "id",
            label: "ID",
            widget: "hidden", // Hides the field from the user UI
            default: "{{uuid_short}}" // Sveltia automatically generates a unique 12-char ID
        },
        {
            name: "name",
            label: "Name",
            widget: "string",
            required: true,

        },
        {
            name: "description",
            label: "Description",
            widget: "text",
            required: true
        },
        {
            name: "image",
            label: "Image",
            widget: "image",
            required: true
        },
        {
            name: "featured",
            label: "Featured",
            widget: "boolean",
            default: false,
            required: true
        }
    ]
};
