import { z } from "astro/zod";
import { loadAndValidateFile } from "@/features/reusable/load-file-folder";

/**
 * Reusable schema wrapper for standard page metadata blocks
 */
const metadataItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string().optional().nullable(),
});

/**
 * Comprehensive schema for core-detail/meta-data.json
 */
const siteMetadataSchema = z.object({
  home: metadataItemSchema,
  properties: metadataItemSchema,
  categories: metadataItemSchema,
  about: metadataItemSchema,
  contact: metadataItemSchema,
  testimonials: metadataItemSchema,
  propertyDetail: metadataItemSchema,
  categoryDetail: metadataItemSchema,
  default: metadataItemSchema,
});

// Infer individual TypeScript types for type safety in your components
export type SiteMetadataData = z.infer<typeof siteMetadataSchema>;
export type SinglePageMetadata = z.infer<typeof metadataItemSchema>;


/**
 * Fetches, parses, and validates the global page SEO settings from core-detail/meta-data.json
 */
export function getSiteMetadata(): SiteMetadataData {
  return loadAndValidateFile("src/content/core-detail/metadata.json", siteMetadataSchema);
}
