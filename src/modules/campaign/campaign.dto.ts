import { z } from "zod";

export const createCampaignSchema = z.object({
  name: z.string().min(3),
  price: z.number().min(0),
  quota: z.number().optional(),
  startDate: z.string(),
  endDate: z.string(),
  isActive: z.boolean().optional(),
});

export const updateCampaignSchema = createCampaignSchema.partial();
