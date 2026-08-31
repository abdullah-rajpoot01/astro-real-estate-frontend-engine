import { z } from "astro/zod";
import { loadAndValidateFile } from "./load-file-folder";

// ==========================================
// 1. Individual Section Schema Definitions
// ==========================================

const heroSectionSchema = z.object({
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  button: z.object({
    text: z.string().optional().nullable(),
    icon: z.string().optional().nullable(),
    url: z.string().optional().nullable(),
  }).optional().nullable(),
  enabled: z.boolean()
});

const featuresSectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  enabled: z.boolean()
});

const teamSectionSchema = z.object({
  badge: z.string(),
  title: z.string(),
  description: z.string(),
  enabled: z.boolean()
});

const ctaSectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  buttonText: z.string(),
  buttonIcon: z.string().optional().nullable(),
  buttonUrl: z.string(),
  enabled: z.boolean()
});

// Infer individual TypeScript types for type safety in your components
export type AboutHeroData = z.infer<typeof heroSectionSchema>;
export type AboutFeaturesData = z.infer<typeof featuresSectionSchema>;
export type AboutTeamData = z.infer<typeof teamSectionSchema>;
export type AboutCtaData = z.infer<typeof ctaSectionSchema>;

// ==========================================
// 2. Section Fetching Functions
// ==========================================

/**
 * Fetches and parses the about page hero section from hero.json
 */
export function getAboutHeroSection(): AboutHeroData {
  return loadAndValidateFile("src/content/about-page/hero.json", heroSectionSchema);
}

/**
 * Fetches and parses the about page features overview section from features.json
 */
export function getAboutFeaturesSection(): AboutFeaturesData {
  return loadAndValidateFile("src/content/about-page/features.json", featuresSectionSchema);
}

/**
 * Fetches and parses the about page team section from team.json
 */
export function getAboutTeamSection(): AboutTeamData {
  return loadAndValidateFile("src/content/about-page/team.json", teamSectionSchema);
}

/**
 * Fetches and parses the about page call-to-action block from cta.json
 */
export function getAboutCtaSection(): AboutCtaData {
  return loadAndValidateFile("src/content/about-page/cta.json", ctaSectionSchema);
}
