import type { CollectionFile } from "@sveltia/cms";

export const businessHoursConfig: CollectionFile = {
    name: "business_hours_settings",
    label: "Business Hours Settings",
    file: "src/content/sections/business-hours.json",
    format: "json",
    fields: [
        {
            name: "businessHours",
            label: "Schedule Blocks",
            widget: "list",
            // The 'key' property treats the list items as dynamic object keys instead of an array!
            key: "dayName", 
            fields: [
                { 
                    name: "dayName", 
                    label: "Day / Block Name", 
                    widget: "string", 
                    required: true 
                },
                { 
                    name: "open", 
                    label: "Opening Time", 
                    widget: "string", 
                    default: "09:00", 
                    required: true 
                },
                { 
                    name: "close", 
                    label: "Closing Time", 
                    widget: "string", 
                    default: "17:00", 
                    required: true 
                },
                { 
                    name: "closed", 
                    label: "Closed All Day", 
                    widget: "boolean", 
                    default: false, 
                    required: true 
                }
            ]
        }
    ]
};
