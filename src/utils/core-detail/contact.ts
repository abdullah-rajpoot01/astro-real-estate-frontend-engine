import { z } from "astro/zod";
import { loadAndValidateFile } from "../load-file-folder";

// Define the contact schema matching your JSON structure exactly
export const contactSchema = z.object({
  whatsapp: z.string(),
  phone: z.string(),
  email: z.email() // Ensures it validates as a proper email format
});

// Infer the TypeScript type directly from your schema rules
export type ContactData = z.infer<typeof contactSchema>;

/**
 * Fetches and parses the store contact configuration.
 * Throws a fatal error to halt the build if the file is missing OR if the data layout is invalid.
 */
export function getContact(): ContactData {
    return loadAndValidateFile("src/content/config/contact.json", contactSchema);

}
