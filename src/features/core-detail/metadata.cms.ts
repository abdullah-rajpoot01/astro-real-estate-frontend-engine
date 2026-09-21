import type { CollectionFile } from "@sveltia/cms";

export const siteMetadataConfig: CollectionFile = {
    name: "siteMetadata",
    label: "SEO & Page Metadata Settings",
    file: "core-detail/metadata.json",
    format: "json",
    fields: [
        {
            name: "home",
            label: "Home Page Metadata",
            widget: "object",
            required: true,
            fields: [
                { name: "title", label: "Meta Title", widget: "string", default: "Welcome to {{name}} | Find Your Dream Properties", required: true },
                { name: "description", label: "Meta Description", widget: "text", default: "Browse the latest premium real estate listings, luxury homes, and commercial properties with {{name}}.", required: true },
                { name: "image", label: "Image", widget: "image", required: false }
            ]
        },
        {
            name: "properties",
            label: "Properties Metadata",
            widget: "object",
            required: true,
            fields: [
                { name: "title", label: "Meta Title", widget: "string", default: "Available Properties for Sale & Rent | {{name}}", required: true },
                { name: "description", label: "Meta Description", widget: "text", default: "Explore our comprehensive directory of houses, apartments, and land spaces managed by {{name}}.", required: true },
                { name: "image", label: "Image", widget: "image", required: false }
            ]
        },
        {
            name: "categories",
            label: "Categories Metadata",
            widget: "object",
            required: true,
            fields: [
                { name: "title", label: "Meta Title", widget: "string", default: "Property Categories & Collections | {{name}}", required: true },
                { name: "description", label: "Meta Description", widget: "text", default: "Filter real estate spaces by type, lifestyle, or location criteria to match your requirements with {{name}}.", required: true },
                { name: "image", label: "Image", widget: "image", required: false }
            ]
        },
        {
            name: "about",
            label: "About Page Metadata",
            widget: "object",
            required: true,
            fields: [
                { name: "title", label: "Meta Title", widget: "string", default: "About Our Agency & Expert Agents | {{name}}", required: true },
                { name: "description", label: "Meta Description", widget: "text", default: "Meet the professional real estate brokers, consultants, and dedicated team behind {{name}}.", required: true },
                { name: "image", label: "Image", widget: "image", required: false }
            ]
        },
        {
            name: "contact",
            label: "Contact Page Metadata",
            widget: "object",
            required: true,
            fields: [
                { name: "title", label: "Meta Title", widget: "string", default: "Get in Touch With Our Team | {{name}}", required: true },
                { name: "description", label: "Meta Description", widget: "text", default: "Have questions about a listing or market valuations? Contact the real estate advisors at {{name}} today.", required: true },
                { name: "image", label: "Image", widget: "image", required: false }
            ]
        },
        {
            name: "testimonials",
            label: "Testimonials Page Metadata",
            widget: "object",
            required: true,
            fields: [
                { name: "title", label: "Meta Title", widget: "string", default: "Client Testimonials & Success Stories | {{name}}", required: true },
                { name: "description", label: "Meta Description", widget: "text", default: "Read verified reviews from homeowners, investors, and renters who achieved their goals using {{name}}.", required: true },
                { name: "image", label: "Image", widget: "image", required: false }
            ]
        },
        {
            name: "propertyDetail",
            label: "Property Detail Page Metadata (Fallback)",
            widget: "object",
            required: true,
            fields: [
                { name: "title", label: "Meta Title Blueprint", widget: "string", default: "View Property Listing Details | {{name}}", required: true },
                { name: "description", label: "Meta Description Blueprint", widget: "text", default: "Get explicit price sheets, structural floor plans, neighborhood metrics, and viewing schedules on {{name}}.", required: true },
                { name: "image", label: "Fallback Image", widget: "image", required: false }
            ]
        },
        {
            name: "categoryDetail",
            label: "Category Detail Page Metadata (Fallback)",
            widget: "object",
            required: true,
            fields: [
                { name: "title", label: "Meta Title Blueprint", widget: "string", default: "Browse Curated Property Types | {{name}}", required: true },
                { name: "description", label: "Meta Description Blueprint", widget: "text", default: "Discover specialized real estate collections filtered explicitly under the {{name}} platform.", required: true },
                { name: "image", label: "Fallback Image", widget: "image", required: false }
            ]
        },
        {
            name: "default",
            label: "Global Default Fallback Metadata",
            widget: "object",
            required: true,
            fields: [
                { name: "title", label: "Meta Title", widget: "string", default: "Premium Real Estate Agency | {{name}}", required: true },
                { name: "description", label: "Meta Description", widget: "text", default: "Discover luxury residential listings and commercial opportunities with {{name}}.", required: true },
                { name: "image", label: "Fallback Image", widget: "image", required: false }
            ]
        }
    ]
};
