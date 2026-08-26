import { z } from "astro/zod";
import { loadAndValidateFile } from "../load-file-folder";

// Define the social media schema with all fields marked optional
export const socialSchema = z.object({
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  tiktok: z.string().optional(),
  youtube: z.string().optional(),
  x: z.string().optional(),
  linkedin: z.string().optional()
});

// Infer the TypeScript type directly from your schema rules
export type SocialData = z.infer<typeof socialSchema>;

/**
 * Fetches and parses the social media links JSON configuration.
 * Throws a fatal error to halt the build if the file is missing OR if the data structure is corrupt.
 */
export function getSocials(): SocialData {
  return loadAndValidateFile("src/content/config/social.json", socialSchema);

}
