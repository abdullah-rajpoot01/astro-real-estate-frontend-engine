import { z } from "astro/zod";
import { loadAndValidateFile } from "@/features/reusable";

// Define the social media schema with all fields marked optional
export const socialSchema = z.object({
  facebook: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  tiktok: z.string().optional().nullable(),
  youtube: z.string().optional().nullable(),
  x: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable()
});

// Infer the TypeScript type directly from your schema rules
export type SocialDataType = z.infer<typeof socialSchema>;

/**
 * Fetches and parses the social media links JSON configuration.
 * Throws a fatal error to halt the build if the file is missing OR if the data structure is corrupt.
 */
export function getSocials(): SocialDataType {
  return loadAndValidateFile("src/content/core-detail/social.json", socialSchema);

}
