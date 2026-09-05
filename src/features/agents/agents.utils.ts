import { z } from "astro/zod";
import { loadAndValidateDirectory } from "@/features/reusable";

export const agentSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  title: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  phone: z.string(),
  email: z.email(),
  whatsapp: z.string(),
  bio: z.string().optional().nullable(),
  count: z.number().optional().nullable(),
  featured: z.boolean(),
})

export type AgentType = z.infer<typeof agentSchema>

export function getAllAgents(): AgentType[] {
    return loadAndValidateDirectory("src/content/agents", agentSchema);

}