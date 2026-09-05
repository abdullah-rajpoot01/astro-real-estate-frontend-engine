
import type { Collection, CollectionFile } from "@sveltia/cms";

const contactPageConfig: CollectionFile = {
    name: "contactPageConfig",
    label: "Contact Page Settings",
    file: "pages/contact.json",
    format: "json",
    fields: [
        { 
            name: "title", 
            label: "Main Title", 
            widget: "string", 
            required: true 
        },
        { 
            name: "subTitle", 
            label: "Sub Title", 
            widget: "string", 
            required: true 
        },
        { 
            name: "description", 
            label: "Description Text", 
            widget: "text", 
            required: true 
        }
    ]
};


export const contactPageCollection: Collection = {
    name: "contactPage",
    label: "Contact Page",
    // A file collection manages specific configuration files rather than a folder layout
    files: [
        contactPageConfig
    ]
};
