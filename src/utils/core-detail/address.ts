import { z } from "astro/zod";
import { loadAndValidateFile } from "../load-file-folder";

// Define the schema exactly as you provided
export const addressSchema = z.object({
  addressLine1: z.string(),
  addressLine2: z.string(),
  city: z.string(),
  province: z.string(),
  postalCode: z.string(),
  country: z.string(),
  location: z.object({ 
    latitude: z.number(), 
    longitude: z.number() 
  })
});

// Infer the TypeScript type directly from your schema rules
export type AddressData = z.infer<typeof addressSchema>;

/**
 * Fetches and parses the store address JSON configuration.
 * Throws a fatal error to halt the build if the file is missing OR if the data layout is invalid.
 */
export function getAddress(): AddressData {
    return loadAndValidateFile("src/content/core-detail/address.json", addressSchema);
}