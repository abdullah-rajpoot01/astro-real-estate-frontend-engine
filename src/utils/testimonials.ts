import fs from "fs";
import path from "path";
import { z } from "astro/zod";

// Define the single testimonial validation rule
export const testimonialItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  message: z.string()
});

// Infer the TypeScript type directly from your schema requirements
export type TestimonialItem = z.infer<typeof testimonialItemSchema>;

/**
 * Fetches and parses all individual testimonial files from src/content/testimonials.
 * Throws a fatal error to halt the build if the folder is missing OR if any file is invalid.
 */
export function getAllTestimonials(): TestimonialItem[] {
  try {
    // Construct the absolute path pointing directly to your testimonials directory
    const testimonialsDir = path.join(process.cwd(), "src/content/testimonials");

    // Check if the directory itself exists on the disk
    if (!fs.existsSync(testimonialsDir)) {
      console.error(`❌ [CMS ERROR] Required directory missing: Testimonials directory not found at: ${testimonialsDir}`);
      throw new Error(`Cloudflare build stopped: The directory "${testimonialsDir}" is missing.`);
    }

    // 1. Read all files from the directory and filter for .json extensions
    const files = fs
      .readdirSync(testimonialsDir)
      .filter((file) => file.endsWith(".json"));

    // 2. Loop through each file, validate its structure, and build the array stream
    return files.flatMap((file) => {
      try {
        const filePath = path.join(testimonialsDir, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const rawJson = JSON.parse(fileContent);

        // Validate individual file layout structure properties
        const validationResult = testimonialItemSchema.safeParse(rawJson);

        if (!validationResult.success) {
          console.error(`❌ [CMS VALIDATION ERROR] Invalid layout structure in testimonial file [${file}]:`);
          console.error(JSON.stringify(validationResult.error.format(), null, 2));
          // Crash the Cloudflare build to block bad deployment
          throw new Error(`Build failed: Malformed testimonial configuration found in ${file}.`);
        }

        // Return the strictly-validated data array item
        return [validationResult.data];
      } catch (error) {
        console.error(`Failed to execute parser framework on file: ${file}`, error);
        throw error; // Re-throw to halt deployment pipeline execution
      }
    });

  } catch (error) {
    console.error("Critical error in testimonials folder validation workflow:", error);
    throw error; // Propagate exception to halt compilation
  }
}
