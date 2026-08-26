import { z } from "astro/zod";
import { loadAndValidateFile } from "./load-file-folder";

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
  heading: z.string(),
  subHeading1: z.string(),
  subHeading2: z.string(),
  description: z.string(),
  carouselImages: z.array(
    z.object({ image: z.string(), link: z.string().optional() }),
  ).max(10).min(1),
  buttons: z.array(
    z.object({
      type: z.string(),
      text: z.string(),
      link: z.string(),
      icon: z.string()
    })
  )
})



// Infer individual TypeScript types for explicit typing where needed
export type HeroData = z.infer<typeof heroSchema>;
export type GridSectionData = z.infer<typeof gridSectionSchema>;
export type CtaSectionData = z.infer<typeof ctaSectionSchema>;
export type SimpleSectionData = z.infer<typeof simpleSectionSchema>;

// ==========================================
// 2. Individual Section Fetching Functions
// ==========================================

/**
 * Fetches and parses the hero section JSON configuration.
 * Throws a fatal error to halt the build if the file is missing OR if the data is invalid.
 */
export function getHeroSection(): HeroData {
  return loadAndValidateFile("src/content/home-page/hero.json", heroSchema);

}

/**
 * Fetches and parses the home page categories section layout from categories.json
 */
export function getHomeCategoriesSection(): GridSectionData {
  return loadAndValidateFile("src/content/home-page/categories.json", gridSectionSchema);
}

/**
 * Fetches and parses the home page listings section layout from listings.json
 */
export function getHomeListingsSection(): GridSectionData {
  return loadAndValidateFile("src/content/home-page/listings.json", gridSectionSchema);
}

/**
 * Fetches and parses the home page features section visibility from features.json
 */
export function getHomeFeaturesSection(): SimpleSectionData {
  return loadAndValidateFile("src/content/home-page/features.json", simpleSectionSchema);
}

/**
 * Fetches and parses the home page testimonials section visibility from testimonials.json
 */
export function getHomeTestimonialsSection(): SimpleSectionData {
  return loadAndValidateFile("src/content/home-page/testimonials.json", simpleSectionSchema);
}

/**
 * Fetches and parses the home page Call-To-Action section layout from cta.json
 */
export function getHomeCtaSection(): CtaSectionData {
  return loadAndValidateFile("src/content/home-page/cta.json", ctaSectionSchema);
}
