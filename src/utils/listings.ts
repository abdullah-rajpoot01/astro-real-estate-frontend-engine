import fs from "fs";
import path from "path";
import { z } from "astro/zod";

export const locationSchema = z.object({
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
})

export const specificationSchema = z.object({
  key: z.string(),
  value: z.string(),
})

export const listingSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  type: z.enum(["sale", "rent"]),
  propertyType: z.string(),
  status: z.enum(["available", "sold", "rented", "pending"]),
  saleLable: z.string().optional(),
  price: z.number(),
  comparePrice: z.number().optional(),
  images: z.array(z.string()),
  description: z.string().optional(),
  location: locationSchema,
  features: z.array(z.string()).optional(),
  specifications: z.array(specificationSchema).optional(),
  agentId: z.string().optional(),
  featured: z.boolean(),
})
export type Listing = z.infer<typeof listingSchema>
export type Location = z.infer<typeof locationSchema>
export type Specification = z.infer<typeof specificationSchema>


export function getAllListings(): Listing[] {
  try {
    const productsDir = path.join(process.cwd(), "src/content/listings");

    if (!fs.existsSync(productsDir)) {
      console.error(`Products directory not found: ${productsDir}`);
      return [];
    }

    const files = fs
      .readdirSync(productsDir)
      .filter((file) => file.endsWith(".json"));

    return files.flatMap((file) => {
      try {
        const filePath = path.join(productsDir, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const rawJson = JSON.parse(fileContent);

        const validationResult = listingSchema.safeParse(rawJson);

        if (!validationResult.success) {
          console.error(`❌ [CMS VALIDATION ERROR] Invalid listing structure in: ${file}`);
          console.error(JSON.stringify(validationResult.error.format(), null, 2));
          // Crash the Cloudflare build to block bad deployment
          throw new Error(`Build failed: Malformed listing configuration found in ${file}.`);
        }

        return [validationResult.data];
      } catch (error) {
        console.error(`Failed to execute parser framework on file: ${file}`, error);
        throw error; // Re-throw to halt deployment
      }
    });
  } catch (error) {
    console.error("Critical error in listing resolution chain:", error);
    throw error;
  }
}