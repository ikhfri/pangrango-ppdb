import { z } from "zod";

export const createRegistrationSchema = z.object({
  namaLengkap: z.string(),
  email: z.string().email(),
  noHp: z.string(),
  nisn: z.string(),
  level: z.enum(["SD", "SMP", "SMA"]),
  campaignId: z.string(),
});

export type CreateRegistrationDto = z.infer<typeof createRegistrationSchema>;
