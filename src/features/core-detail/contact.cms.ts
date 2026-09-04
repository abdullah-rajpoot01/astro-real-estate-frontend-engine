import type { CollectionFile } from "@sveltia/cms";

export const contactConfig: CollectionFile = {
    name: "contact_settings",
    label: "Contact Information Settings",
    file: "core-detail/contact.json",
    format: "json",
    fields: [
        {
            name: "whatsapp", label: "WhatsApp Number", widget: "string", required: true, pattern: [
                "^\\+?[1-9]\\d{1,14}$",
                "Please enter a valid phone number in standard international format (e.g., +1234567890)"
            ]
        },
        {
            name: "phone", label: "Phone Number", widget: "string", required: true, pattern: [
                "^\\+?[1-9]\\d{1,14}$",
                "Please enter a valid phone number in standard international format (e.g., +1234567890)"
            ]
        },
        {
            name: "email",
            label: "Email Address",
            widget: "string",
            required: true,
            pattern: [
                "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
                "Please enter a valid email address (e.g., name@example.com)"
            ]
        }
    ]
};
