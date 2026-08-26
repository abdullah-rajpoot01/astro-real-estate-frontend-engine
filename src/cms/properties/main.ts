import type { Collection } from "@sveltia/cms";

export const listingsCollection: Collection = {
    name: "listings",
    label: "Listings",
    label_singular: "Listing",
    folder: "src/content/listings",
    format: "json",
    create: true,
    limit: 200,
    slug: "{{title}}", // File names will be derived from a clean slug of the title
    fields: [
        {
            name: "id",
            label: "ID",
            widget: "hidden",
            default: "{{uuid_short}}"
        },
        {
            name: "title",
            label: "Title",
            widget: "string",
            required: true
        },
        {
            name: "type",
            label: "Listing Type",
            widget: "select",
            options: ["sale", "rent"],
            required: true
        },
        {
            name: "category",
            label: "Category",
            widget: "relation",
            collection: "categories", // References the property-types collection
            search_fields: ["name"],      // Allows searching by name in the CMS dropdown
            value_field: "id",            // Saves the propertyType's unique ID string 
            display_fields: ["name"],     // Displays the clear name text to the user
            required: true
        },
        {
            name: "status",
            label: "Status",
            widget: "select",
            options: ["available", "sold", "rented", "pending"],
            required: true
        },
        {
            name: "saleLable",
            label: "Sale Label (e.g., 'Hot Offer')",
            widget: "string",
            required: false
        },
        {
            name: "price",
            label: "Price",
            widget: "number",
            required: true
        },
        {
            name: "comparePrice",
            label: "Compare Price",
            widget: "number",
            required: false
        },
        {
            name: "images",
            label: "Images",
            widget: "list",
            max: 8,
            min: 1,
            field: { label: "Image", name: "image", widget: "image" },
            required: true
        },
        {
            name: "description",
            label: "Description",
            widget: "text",
            required: false
        },
        {
            name: "location",
            label: "Location Details",
            widget: "object",
            required: true,
            fields: [
                { name: "address", label: "Address", widget: "string", required: false },
                { name: "city", label: "City", widget: "string", required: false },
                { name: "state", label: "State", widget: "string", required: false },
                { name: "country", label: "Country", widget: "string", required: false },
                { name: "postalCode", label: "Postal Code", widget: "string", required: false },
                { name: "latitude", label: "Latitude", widget: "number", value_type: "float", required: false },
                { name: "longitude", label: "Longitude", widget: "number", value_type: "float", required: false }
            ]
        },
        {
            name: "features",
            label: "Features List",
            widget: "list",
            field: { label: "Feature", name: "feature", widget: "string" },
            required: false
        },
        {
            name: "specifications",
            label: "Specifications",
            widget: "list",
            required: false,
            fields: [
                { name: "key", label: "Key (e.g., Bedrooms)", widget: "string", required: true },
                { name: "value", label: "Value (e.g., 3)", widget: "string", required: true }
            ]
        },
        {
            name: "agentId",
            label: "Assigned Agent",
            widget: "relation",
            collection: "agents",
            search_fields: ["name"],
            value_field: "id",
            display_fields: ["name"],
            required: false
        },
        {
            name: "featured",
            label: "Featured Listing",
            widget: "boolean",
            default: false,
            required: true
        }
    ]
};
