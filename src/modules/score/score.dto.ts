import { z } from "zod";

export const createScoreSchema = z.object({
  registrationId: z.string(),
  subjectId: z.string(),
  semester: z.number(),
  value: z.number().min(0).max(100),
});
