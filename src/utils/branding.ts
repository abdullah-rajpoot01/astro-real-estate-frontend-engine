import fs from "fs";
import path from "path";
import { z } from "astro/zod";

// Define the branding schema structure
export const brandingSchema = z.object({
    // Use z.record to allow dynamic key/value string pairs for colors
    theme: z.string(),
    font: z.object({
        heading: z.string(),
        body: z.string()
    }),
    favico: z.url(),
    appName: z.string(),
    appLogo: z.url()
});

// Infer the TypeScript type directly from your schema rules
export type BrandingData = z.infer<typeof brandingSchema>;

/**
 * Fetches and parses the global branding JSON configuration.
 * Throws a fatal error to halt the build if the file is missing OR if the data layout is invalid.
 */
export function getStoreBranding(): BrandingData {
    try {
        // Construct the absolute path pointing exactly to /src/content/config/branding.json
        const filePath = path.join(process.cwd(), "src/content/config/branding.json");

        // Check if the file actually exists on the drive
        if (!fs.existsSync(filePath)) {
            console.error(`❌ [CMS ERROR] Required file missing: Branding configuration file not found at: ${filePath}`);
            throw new Error("Cloudflare build stopped: The required file 'branding.json' is missing.");
        }

        // Read the text contents of the file
        const fileContent = fs.readFileSync(filePath, "utf-8");

        // Convert plain text string to a JavaScript object
        const rawJson = JSON.parse(fileContent);

        // Validate the data structure layout using your schema requirements
        const validationResult = brandingSchema.safeParse(rawJson);

        if (!validationResult.success) {
            console.error("❌ [CMS VALIDATION ERROR] Branding JSON formatting is invalid:");
            console.error(JSON.stringify(validationResult.error.format(), null, 2));

            // Throw an error to intentionally crash the Cloudflare Pages build pipeline
            throw new Error("Cloudflare build stopped: Malformed configuration inside branding.json.");
        }

        // Return the strongly-typed data successfully
        return validationResult.data;

    } catch (error) {
        console.error("Failed to load store branding structures:", error);
        throw error;
    }
}
