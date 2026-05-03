import { Request, Response } from "express";
import { SubjectService } from "./subject.service";
import { createSubjectSchema } from "./subject.dto";

export const SubjectController = {
  async create(req: Request, res: Response) {
    try {
      const parsed = createSubjectSchema.parse(req.body);
      const result = await SubjectService.create(parsed);
      res.json(result);
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  },

  async findAll(req: Request, res: Response) {
    const result = await SubjectService.findAll();
    res.json(result);
  },

  async delete(req: Request<{ id: string }>, res: Response) {
    await SubjectService.delete(req.params.id);
    res.json({ message: "Deleted" });
  },
};
