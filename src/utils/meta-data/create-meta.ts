// src/utils/metadataRegistry.ts

interface RegistryContext {
    title?: string;
    description?: string;
    image?: string;
}

interface MetaOutput {
    title?: string;
    description?: string;
    image?: string;
}

export function getMetadataByName(pageName?: string, context?: RegistryContext): MetaOutput {
    const fallbackImage = "/default/og.png";

    switch (pageName) {
        case "home":
            return {
                title: "Welcome to {{name}} | Find Your Dream Home",
                description: "Browse the latest premium real estate listings, luxury homes, and commercial properties with {{name}}.",
                image: context?.image || fallbackImage
            };

        case "properties":
            return {
                title: "Available Properties for Sale & Rent | {{name}}",
                description: "Explore our comprehensive directory of houses, apartments, and land spaces managed by {{name}}.",
                image: context?.image || fallbackImage
            };

        case "categories":
            return {
                title: "Property Categories & Collections | {{name}}",
                description: "Filter real estate spaces by type, lifestyle, or location criteria to match your requirements with {{name}}.",
                image: context?.image || fallbackImage
            };

        case "about":
            return {
                title: "About Our Agency & Expert Agents | {{name}}",
                description: "Meet the professional real estate brokers, consultants, and dedicated team behind {{name}}.",
                image: context?.image || fallbackImage
            };

        case "contact":
            return {
                title: "Get in Touch With Our Team | {{name}}",
                description: "Have questions about a listing or market valuations? Contact the real estate advisors at {{name}} today.",
                image: context?.image || fallbackImage
            };

        case "testimonials":
            return {
                title: "Client Testimonials & Success Stories | {{name}}",
                description: "Read verified reviews from homeowners, investors, and renters who achieved their goals using {{name}}.",
                image: context?.image || fallbackImage
            };

        // 🚀 Dynamic Listing Page: Strictly builds around context values
        case "property-detail":
            return {
                title: context?.title
                    ? `${context.title} for Sale | {{name}}`
                    : "View Property Listing Details | {{name}}",
                description: context?.description
                    ? context.description
                    : "Get explicit price sheets, structural floor plans, neighborhood metrics, and viewing schedules on {{name}}.",
                image: context?.image || fallbackImage
            };

        // 🚀 Dynamic Category Page: Strictly builds around context values
        case "category-detail":
            return {
                title: context?.title
                    ? `Premium ${context.title} Properties | {{name}}`
                    : "Browse Curated Property Types | {{name}}",
                description: context?.description
                    ? context.description
                    : "Discover specialized real estate collections filtered explicitly under the {{name}} platform.",
                image: context?.image || fallbackImage
            };

        // Global fallback if pageName is completely omitted or unmapped
        default:
            return {
                title: context?.title || "Premium Real Estate Agency | {{name}}",
                description: context?.description || "Discover luxury residential listings and commercial opportunities with {{name}}.",
                image: context?.image || fallbackImage
            };
    }
}
