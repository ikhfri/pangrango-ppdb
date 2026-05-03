import { z } from "zod";

export const uploadDocumentSchema = z.object({
  registrationId: z.string(),
  documentTypeId: z.string(),
});

export const reviewDocumentSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED"]),
  note: z.string().optional(),
});
