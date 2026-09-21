import { z } from "astro/zod";
import { loadAndValidateDirectory } from "@/features/reusable";

// Define the single feature validation rule matching your JSON block exactly
export const featureItemSchema = z.object({
  id: z.z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string()
});

// Infer the TypeScript type directly from your schema requirements
export type FeatureItemType = z.infer<typeof featureItemSchema>;

/**
 * Fetches and parses all individual feature files from src/content/features.
 * Throws a fatal error to halt the build if the folder is missing OR if any file is invalid.
 */
export function getAllFeatures(): FeatureItemType[] {
  return loadAndValidateDirectory("src/content/features", featureItemSchema);

}
