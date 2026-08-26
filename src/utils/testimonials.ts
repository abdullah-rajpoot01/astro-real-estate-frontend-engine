import { z } from "astro/zod";
import { loadAndValidateDirectory } from "./load-file-folder";

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
     return loadAndValidateDirectory("src/content/testimonials", testimonialItemSchema);
}
