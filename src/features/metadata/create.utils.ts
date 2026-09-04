// src/utils/metadataRegistry.ts

import { getSiteMetadata } from "@/features/core-detail";

interface RegistryContext {
    title?: string | null;
    description?: string | null;
    image?: string | null;
}

interface MetaOutput {
    title: string;
    description: string;
    image: string;
}

export function getMetadataByName(pageName?: string, context?: RegistryContext): MetaOutput {
    const fallbackImage = "/default-og.png";

    // 1. Direct call without try/catch so any schema validation error stops the build
    const cmsData = getSiteMetadata();

    switch (pageName) {
        case "home":
            return {
                title: context?.title || cmsData.home.title,
                description: context?.description || cmsData.home?.description,
                image: context?.image || cmsData.home?.image || fallbackImage
            };

        case "properties":
            return {
                title: context?.title || cmsData.properties.title,
                description: context?.description || cmsData.properties.description,
                image: context?.image || cmsData?.properties?.image || fallbackImage
            };

        case "categories":
            return {
                title: context?.title || cmsData.categories.title,
                description: context?.description || cmsData.categories.description,
                image: context?.image || cmsData?.categories?.image || fallbackImage
            };

        case "about":
            return {
                title: context?.title || cmsData.about.title,
                description: context?.description || cmsData.about.description,
                image: context?.image || cmsData?.about?.image || fallbackImage
            };

        case "contact":
            return {
                title: context?.title || cmsData.contact.title,
                description: context?.description || cmsData.contact.description,
                image: context?.image || cmsData?.contact?.image || fallbackImage
            };

        case "testimonials":
            return {
                title: context?.title || cmsData.testimonials.title,
                description: context?.description || cmsData.testimonials.description,
                image: context?.image || cmsData?.testimonials?.image || fallbackImage
            };

        // 🚀 Dynamic Listing Page: Context title generates structured fallback before CMS blueprints run
        case "property-detail":
            return {
                title: context?.title
                    ? `${context.title} | {{name}}`
                    : cmsData.propertyDetail.title,
                description: context?.description
                    ? context.description
                    : cmsData.propertyDetail.description,
                image: context?.image || cmsData?.propertyDetail?.image || fallbackImage
            };

        // 🚀 Dynamic Category Page: Context title generates structured fallback before CMS blueprints run
        case "category-detail":
            return {
                title: context?.title
                    ? `Explore ${context.title} Properties | {{name}}`
                    : cmsData.categoryDetail.title,
                description: context?.description
                    ? context.description
                    : cmsData.categoryDetail.description,
                image: context?.image || cmsData?.categoryDetail?.image || fallbackImage
            };

        // Global fallback if pageName is completely omitted or unmapped
        default:
            return {
                title: context?.title || cmsData.default.title,
                description: context?.description || cmsData.default.description,
                image: context?.image || cmsData?.default?.image || fallbackImage
            };
    }
}
