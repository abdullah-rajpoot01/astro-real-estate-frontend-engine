import fs from "fs";
import path from "path";
import { z } from "astro/zod";

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
  try {
    // Construct the absolute path pointing exactly to /src/content/config/social.json
    const filePath = path.join(process.cwd(), "src/content/config/social.json");

    // Check if the file actually exists on the drive
    if (!fs.existsSync(filePath)) {
      console.error(`❌ [CMS ERROR] Required file missing: Social links configuration file not found at: ${filePath}`);
      throw new Error("Cloudflare build stopped: The required file 'social.json' is missing.");
    }

    // Read the text contents of the file
    const fileContent = fs.readFileSync(filePath, "utf-8");
    
    // Convert plain text string to a JavaScript object
    const rawJson = JSON.parse(fileContent);

    // Validate the data structure layout using your schema requirements
    const validationResult = socialSchema.safeParse(rawJson);

    if (!validationResult.success) {
      console.error("❌ [CMS VALIDATION ERROR] Social JSON formatting is invalid:");
      console.error(JSON.stringify(validationResult.error.format(), null, 2));
      
      // Throw an error to intentionally crash the Cloudflare Pages build pipeline
      throw new Error("Cloudflare build stopped: Malformed configuration inside social.json.");
    }

    // Return the strongly-typed data successfully
    return validationResult.data;

  } catch (error) {
    console.error("Failed to load store social structures:", error);
    // Re-throw the error so it bubbles up and stops the deployment build execution
    throw error;
  }
}
