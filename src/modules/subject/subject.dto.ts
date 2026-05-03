import { z } from "zod";

export const createSubjectSchema = z.object({
  name: z.string().min(2),
  isActive: z.boolean().optional(),
});
