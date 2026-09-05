import { z } from "astro/zod";
import { loadAndValidateDirectory } from "@/features/reusable";

export const locationSchema = z.object({
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  postalCode: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
})

export const specificationSchema = z.object({
  key: z.string(),
  value: z.string(),
})

export const listingSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string().optional().nullable(),
  type: z.enum(["sale", "rent"]),
  category: z.string(),
  status: z.enum(["available", "sold", "rented", "pending"]),
  saleLable: z.string().optional().nullable(),
  price: z.number(),
  comparePrice: z.number().optional().nullable(),
  images: z.array(z.string()),
  description: z.string().optional().nullable(),
  location: locationSchema,
  features: z.array(z.string()).optional().nullable(),
  specifications: z.array(specificationSchema).optional().nullable(),
  agentId: z.string().optional().nullable(),
  featured: z.boolean(),
})
export type ListingType = z.infer<typeof listingSchema>
export type ListingLocationType = z.infer<typeof locationSchema>
export type ListingSpecificationType = z.infer<typeof specificationSchema>


export function getAllListings(): ListingType[] {
  return loadAndValidateDirectory("src/content/listings", listingSchema);

}