import { z } from "astro/zod";
import { loadAndValidateDirectory } from "./load-file-folder";

export const agentSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  title: z.string().optional(),
  image: z.string().optional(),
  phone: z.string(),
  email: z.email(),
  whatsapp: z.string(),
  bio: z.string().optional(),
  count: z.number().optional(),
  featured: z.boolean(),
})

export type Agent = z.infer<typeof agentSchema>

export function getAllAgents(): Agent[] {
    return loadAndValidateDirectory("src/content/agents", agentSchema);

}