import { z } from "astro/zod";
import { loadAndValidateFile } from "@/features/reusable";

// ==========================================
// 1. Shared & Specific Schema Definitions
// ==========================================

const gridSectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  buttonText: z.string(),
  buttonIcon: z.string(),
  maxItems: z.number(),
  enabled: z.boolean()
});

const ctaSectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  buttonText: z.string(),
  buttonUrl: z.string(),
  enabled: z.boolean()
});

const simpleSectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  enabled: z.boolean()
});


export const heroSchema = z.object({
  heading: z.string().optional().nullable(),
  subHeading1: z.string(),
  subHeading2: z.string(),
  description: z.string().optional().nullable(),
  images: z.array(
    z.object({ image: z.string(), link: z.string().optional().nullable() }),
  ).max(10).min(1),
  buttons: z.array(
    z.object({
      type: z.enum(["default", "destructive", "outline", "secondary", "ghost", "link"]),
      text: z.string(),
      link: z.string(),
      icon: z.string()
    })
  ).min(1).max(3)
})



// Infer individual TypeScript types for explicit typing where needed
export type HomeHeroSectionDataType = z.infer<typeof heroSchema>;
export type HomeGridSectionDataType = z.infer<typeof gridSectionSchema>;
export type HomeCtaSectionDataType = z.infer<typeof ctaSectionSchema>;
export type HomeSimpleSectionDataType = z.infer<typeof simpleSectionSchema>;

// ==========================================
// 2. Individual Section Fetching Functions
// ==========================================

/**
 * Fetches and parses the hero section JSON configuration.
 * Throws a fatal error to halt the build if the file is missing OR if the data is invalid.
 */
export function getHeroSection(): HomeHeroSectionDataType {
  return loadAndValidateFile("src/content/home-page/hero.json", heroSchema);

}

/**
 * Fetches and parses the home page categories section layout from categories.json
 */
export function getHomeCategoriesSection(): HomeGridSectionDataType {
  return loadAndValidateFile("src/content/home-page/categories.json", gridSectionSchema);
}

/**
 * Fetches and parses the home page listings section layout from listings.json
 */
export function getHomeListingsSection(): HomeGridSectionDataType {
  return loadAndValidateFile("src/content/home-page/listings.json", gridSectionSchema);
}

/**
 * Fetches and parses the home page features section visibility from features.json
 */
export function getHomeFeaturesSection(): HomeSimpleSectionDataType {
  return loadAndValidateFile("src/content/home-page/features.json", simpleSectionSchema);
}

/**
 * Fetches and parses the home page testimonials section visibility from testimonials.json
 */
export function getHomeTestimonialsSection(): HomeSimpleSectionDataType {
  return loadAndValidateFile("src/content/home-page/testimonials.json", simpleSectionSchema);
}

/**
 * Fetches and parses the home page Call-To-Action section layout from cta.json
 */
export function getHomeCtaSection(): HomeCtaSectionDataType {
  return loadAndValidateFile("src/content/home-page/cta.json", ctaSectionSchema);
}
