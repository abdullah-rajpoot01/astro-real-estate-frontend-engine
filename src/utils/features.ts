import fs from "fs";
import path from "path";
import { z } from "astro/zod";

// Define the single feature validation rule matching your JSON block exactly
export const featureItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string()
});

// Infer the TypeScript type directly from your schema requirements
export type FeatureItem = z.infer<typeof featureItemSchema>;

/**
 * Fetches and parses all individual feature files from src/content/features.
 * Throws a fatal error to halt the build if the folder is missing OR if any file is invalid.
 */
export function getAllFeatures(): FeatureItem[] {
  try {
    // Construct the absolute path pointing directly to your features directory
    const featuresDir = path.join(process.cwd(), "src/content/features");

    // Check if the directory itself exists on the disk
    if (!fs.existsSync(featuresDir)) {
      console.error(`❌ [CMS ERROR] Required directory missing: Features directory not found at: ${featuresDir}`);
      throw new Error(`Cloudflare build stopped: The directory "${featuresDir}" is missing.`);
    }

    // 1. Read all files from the directory and filter for .json extensions
    const files = fs
      .readdirSync(featuresDir)
      .filter((file) => file.endsWith(".json"));

    // 2. Loop through each file, validate its structure, and build the array stream
    return files.flatMap((file) => {
      try {
        const filePath = path.join(featuresDir, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const rawJson = JSON.parse(fileContent);

        // Validate individual file layout structure properties
        const validationResult = featureItemSchema.safeParse(rawJson);

        if (!validationResult.success) {
          console.error(`❌ [CMS VALIDATION ERROR] Invalid layout structure in feature file [${file}]:`);
          console.error(JSON.stringify(validationResult.error.format(), null, 2));
          // Crash the Cloudflare build to block bad deployment
          throw new Error(`Build failed: Malformed feature configuration found in ${file}.`);
        }

        // Return the strictly-validated data array item
        return [validationResult.data];
      } catch (error) {
        console.error(`Failed to execute parser framework on file: ${file}`, error);
        throw error; // Re-throw to halt deployment pipeline execution
      }
    });

  } catch (error) {
    console.error("Critical error in features folder validation workflow:", error);
    throw error; // Propagate exception to halt compilation
  }
}
