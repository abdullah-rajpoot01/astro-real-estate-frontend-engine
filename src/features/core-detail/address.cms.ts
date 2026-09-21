import type { CollectionFile } from "@sveltia/cms";

export const addressConfig: CollectionFile = {
    name: "address_settings",
    label: "Address & Location Settings",
    file: "core-detail/address.json",
    format: "json",
    fields: [
        // --- Direct Root Level Fields ---
        { name: "addressLine1", label: "Address Line 1", widget: "string", required: true },
        { name: "addressLine2", label: "Address Line 2", widget: "string", required: true },
        { name: "city", label: "City", widget: "string", required: true },
        { name: "province", label: "Province / State", widget: "string", required: true },
        { name: "postalCode", label: "Postal / ZIP Code", widget: "string", required: true },
        { name: "country", label: "Country", widget: "string", required: true },

        // --- Nested Coordinate Object ---
        {
            name: "location",
            label: "Geographic Coordinates",
            widget: "object",
            fields: [
                { 
                    name: "latitude", 
                    label: "Latitude", 
                    widget: "number", 
                    value_type: "float", 
                    required: true 
                },
                { 
                    name: "longitude", 
                    label: "Longitude", 
                    widget: "number", 
                    value_type: "float", 
                    required: true 
                }
            ]
        }
    ]
};
