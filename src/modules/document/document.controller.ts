import { Request, Response } from "express";
import { DocumentService } from "./document.service";
import { uploadDocumentSchema, reviewDocumentSchema } from "./document.dto";

export const DocumentController = {
  async upload(req: any, res: Response) {
    try {
      const parsed = uploadDocumentSchema.parse(req.body);

      const result = await DocumentService.upload(
        parsed.registrationId,
        parsed.documentTypeId,
        req.file,
      );

      res.json({
        message: "Upload success",
        data: result,
      });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  async getByRegistration(req: Request<{ id: string }>, res: Response) {
    const result = await DocumentService.findByRegistration(req.params.id);
    res.json(result);
  },

  async review(req: Request<{ id: string }>, res: Response) {
    try {
      const parsed = reviewDocumentSchema.parse(req.body);

      const result = await DocumentService.review(
        req.params.id,
        parsed.status,
        parsed.note,
      );

      res.json({
        message: "Document reviewed",
        data: result,
      });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },
};
