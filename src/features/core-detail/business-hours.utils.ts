import { z } from "astro/zod";
import { loadAndValidateFile } from "@/features/reusable";

// 1. Define the internal schema rule for an individual schedule block
const dayScheduleSchema = z.array(z.object({
  name: z.string(),
  open: z.string(),
  close: z.string(),
  closed: z.boolean()
}))

// 2. Wrap it with z.record() to allow any dynamic string key configurations
export const businessHoursSchema = z.record(z.string(), dayScheduleSchema);

// Infer the TypeScript type directly from your schema rules
export type BusinessHoursDataType = z.infer<typeof businessHoursSchema>;

/**
 * Fetches and parses the business hours configuration.
 * Throws a fatal error to halt the build if the file is missing OR if the data layout is invalid.
 */
export function getBusinessHours(): BusinessHoursDataType {
  return loadAndValidateFile("src/content/core-detail/business-hours.json", businessHoursSchema);

}
