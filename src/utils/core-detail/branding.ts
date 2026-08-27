import { z } from "astro/zod";
import { loadAndValidateFile } from "../load-file-folder";

// Define the branding schema structure
export const brandingSchema = z.object({
    // Use z.record to allow dynamic key/value string pairs for colors
    theme: z.string(),
    favico: z.url(),
});

// Infer the TypeScript type directly from your schema rules
export type BrandingData = z.infer<typeof brandingSchema>;

export function getStoreBranding(): BrandingData {
    return loadAndValidateFile("src/content/core-detail/branding.json", brandingSchema);
}