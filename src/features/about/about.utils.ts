import { z } from "astro/zod";
import { loadAndValidateFile } from "@/features/reusable";

// ==========================================
// 1. Individual Section Schema Definitions
// ==========================================

const aboutHeroSectionSchema = z.object({
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

const aboutFeaturesSectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  enabled: z.boolean()
});

const aboutTeamSectionSchema = z.object({
  badge: z.string(),
  title: z.string(),
  description: z.string(),
  enabled: z.boolean()
});

const aboutCtaSectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  buttonText: z.string(),
  buttonIcon: z.string().optional().nullable(),
  buttonUrl: z.string(),
  enabled: z.boolean()
});

// Infer individual TypeScript types for type safety in your components
export type AboutHeroSectionDataType = z.infer<typeof aboutHeroSectionSchema>;
export type AboutFeaturesSectionDataType = z.infer<typeof aboutFeaturesSectionSchema>;
export type AboutTeamSectionDataType = z.infer<typeof aboutTeamSectionSchema>;
export type AboutCtaSectionDataType = z.infer<typeof aboutCtaSectionSchema>;

// ==========================================
// 2. Section Fetching Functions
// ==========================================

/**
 * Fetches and parses the about page hero section from hero.json
 */
export function getAboutHeroSection(): AboutHeroSectionDataType {
  return loadAndValidateFile("src/content/about-page/hero.json", aboutHeroSectionSchema);
}

/**
 * Fetches and parses the about page features overview section from features.json
 */
export function getAboutFeaturesSection(): AboutFeaturesSectionDataType {
  return loadAndValidateFile("src/content/about-page/features.json", aboutFeaturesSectionSchema);
}

/**
 * Fetches and parses the about page team section from team.json
 */
export function getAboutTeamSection(): AboutTeamSectionDataType {
  return loadAndValidateFile("src/content/about-page/team.json", aboutTeamSectionSchema);
}

/**
 * Fetches and parses the about page call-to-action block from cta.json
 */
export function getAboutCtaSection(): AboutCtaSectionDataType {
  return loadAndValidateFile("src/content/about-page/cta.json", aboutCtaSectionSchema);
}
