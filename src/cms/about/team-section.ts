import type { CollectionFile } from "@sveltia/cms";

export const aboutTeamSectionConfig: CollectionFile = {
    name: "teamSection",
    label: "Team Section",
    file: "src/content/about-page/team.json",
    format: "json",
    fields: [
        { 
            name: "enabled", 
            label: "Enable Section", 
            widget: "boolean", 
            default: true, 
            required: true 
        },
        { 
            name: "badge", 
            label: "Badge", 
            widget: "string", 
            required: true 
        },
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
        }
    ]
};
