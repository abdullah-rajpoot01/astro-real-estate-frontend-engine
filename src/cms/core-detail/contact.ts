import type { CollectionFile } from "@sveltia/cms";

export const contactConfig: CollectionFile = {
    name: "contact_settings",
    label: "Contact Information Settings",
    file: "src/content/sections/contact.json",
    format: "json",
    fields: [
        { name: "whatsapp", label: "WhatsApp Number", widget: "string", required: true },
        { name: "phone", label: "Phone Number", widget: "string", required: true },
        { 
            name: "email", 
            label: "Email Address", 
            widget: "string", 
            required: true 
            // Note: Sveltia CMS utilizes standard HTML text input validation. 
            // Entering an invalid format here will trigger standard browser validation errors.
        }
    ]
};
