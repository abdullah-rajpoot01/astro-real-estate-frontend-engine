import fs from "fs";
import path from "path";
import { z } from "astro/zod";

// Define the schema exactly as you provided
export const testimonialsSchema = z.object({
  title: z.string(),
  description: z.string(),
  testimonials: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      role: z.string(),
      message: z.string()
    })
  ),
  limit: z.number().optional()
});

// Infer the TypeScript type directly from your schema
export type TestimonialsData = z.infer<typeof testimonialsSchema>;

/**
 * Fetches and parses the testimonials page JSON configuration.
 * Throws a fatal error to halt the build if the file is missing OR if the data is invalid.
 */
export function getTestimonials(): TestimonialsData {
  try {
    // Construct the absolute path pointing specifically to /src/content/pages/testimonials.json
    const filePath = path.join(process.cwd(), "src/content/pages/testimonials.json");

    // Check if the file actually exists
    if (!fs.existsSync(filePath)) {
      console.error(`❌ [CMS ERROR] Required file missing: Testimonials page file not found at: ${filePath}`);
      throw new Error("Cloudflare build stopped: The required file 'testimonials.json' is missing.");
    }

    // Read the text contents of the file
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // Convert text to a plain JS object
    const rawJson = JSON.parse(fileContent);

    // Validate the data layout using your schema
    const validationResult = testimonialsSchema.safeParse(rawJson);

    if (!validationResult.success) {
      console.error("❌ [CMS VALIDATION ERROR] Testimonials JSON formatting is invalid:");
      console.error(JSON.stringify(validationResult.error.format(), null, 2));

      // Throw an error to intentionally crash the Cloudflare build
      throw new Error("Cloudflare build stopped: Malformed configuration inside testimonials.json.");
    }

    // Return the strongly-typed data successfully
    return validationResult.data;

  } catch (error) {
    console.error("Failed to load testimonials content:", error);
    // Re-throw the error so it bubbles up and stops the deployment build
    throw error;
  }
}
