import fs from "fs";
import path from "path";
import { z } from "astro/zod";

// Define the schema exactly as you provided
export const featuresSchema = z.object({
  title: z.string(),
  description: z.string(),
  features: z.array(
    z.object({ title: z.string(), description: z.string(), icon: z.string() })
  )
});

// Infer the TypeScript type directly from your schema
export type FeaturesData = z.infer<typeof featuresSchema>;

/**
 * Fetches and parses the features section JSON configuration.
 * Throws a fatal error to halt the build if the file is missing OR if the data is invalid.
 */
export function getFeaturesSection(): FeaturesData {
  try {
    // Construct the absolute path pointing to /src/content/sections/features.json
    const filePath = path.join(process.cwd(), "src/content/sections/features.json");

    // Check if the file actually exists
    if (!fs.existsSync(filePath)) {
      console.error(`❌ [CMS ERROR] Required file missing: Features section file not found at: ${filePath}`);
      throw new Error("Cloudflare build stopped: The required file 'features.json' is missing.");
    }

    // Read the text contents of the file
    const fileContent = fs.readFileSync(filePath, "utf-8");
    
    // Convert text to a plain JS object
    const rawJson = JSON.parse(fileContent);

    // Validate the data layout using your schema
    const validationResult = featuresSchema.safeParse(rawJson);

    if (!validationResult.success) {
      console.error("❌ [CMS VALIDATION ERROR] Features section JSON formatting is invalid:");
      console.error(JSON.stringify(validationResult.error.format(), null, 2));
      
      // Throw an error to intentionally crash the Cloudflare build
      throw new Error("Cloudflare build stopped: Malformed configuration inside features.json.");
    }

    // Return the strongly-typed data successfully
    return validationResult.data;

  } catch (error) {
    console.error("Failed to load features section:", error);
    // Re-throw the error so it bubbles up and stops the deployment build
    throw error;
  }
}
