import type { Collection } from "@sveltia/cms";

export const testimonialsCollection: Collection = {
    name: "testimonials",
    label: "Testimonials",
    label_singular: "Testimonial",
    folder: "testimonials",
    format: "json",
    create: true,
    slug: "{{id}}", // File names will be derived from a clean slug of the author's name
    fields: [
        {
            name: "id",
            label: "ID",
            widget: "hidden",
            default: "{{uuid_short}}" // Automatically generates a unique 12-char ID
        },
        {
            name: "name",
            label: "Author Name",
            widget: "string",
            required: true
        },
        
        {
            name: "role",
            label: "Role / Position (e.g., Homeowner, Client)",
            widget: "string",
            required: true
        },
        {
            name: "message",
            label: "Testimonial Message",
            widget: "text",
            required: true
        }
    ]
};
