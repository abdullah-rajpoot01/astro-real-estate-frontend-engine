import { z } from "astro/zod";
import { loadAndValidateDirectory } from "./load-file-folder";

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
  slug: z.string().optional(),
  type: z.enum(["sale", "rent"]),
  category: z.string(),
  status: z.enum(["available", "sold", "rented", "pending"]),
  saleLable: z.string().optional(),
  price: z.number(),
  comparePrice: z.number().optional().nullable(),
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
  return loadAndValidateDirectory("src/content/listings", listingSchema);

}