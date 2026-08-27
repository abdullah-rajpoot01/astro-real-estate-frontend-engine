import type { CollectionFile } from "@sveltia/cms";

export const businessHoursConfig: CollectionFile = {
    name: "business_hours_settings",
    label: "Business Hours Settings",
    file: "src/content/core-detail/business-hours.json",
    format: "json",
    fields: [
        {
            name: "businessHours",
            label: "Business Hours",
            widget: "list",
            summary: "{{fields.name}}: {{#if fields.closed}} Closed {{else}}{{fields.open}} - {{fields.close}}{{/if}}",
            fields: [
                {
                    name: "name",
                    label: "Day / Period Name",
                    widget: "string",
                    required: true
                },
                {
                    name: "closed",
                    label: "Is Closed?",
                    widget: "boolean",
                    default: false,
                    required: true
                },
                {
                    name: "open",
                    label: "Opening Time",
                    widget: "datetime",
                    format: "HH:mm",
                    date_format: false,
                    time_format: "HH:mm",
                    required: false
                },
                {
                    name: "close",
                    label: "Closing Time",
                    widget: "datetime",
                    format: "HH:mm",
                    date_format: false,
                    time_format: "HH:mm",
                    required: false
                }
            ]
        }
    ]
};
