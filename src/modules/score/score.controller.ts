import { Request, Response } from "express";
import { ScoreService } from "./score.service";
import { createScoreSchema } from "./score.dto";

export const ScoreController = {
  async create(req: Request, res: Response) {
    try {
      const parsed = createScoreSchema.parse(req.body);
      const result = await ScoreService.create(parsed);
      res.json(result);
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  },

  async bulk(req: Request, res: Response) {
    try {
      const result = await ScoreService.bulkCreate(req.body);
      res.json(result);
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  },

  async get(req: Request<{ id: string }>, res: Response) {
    const result = await ScoreService.getByRegistration(req.params.id);
    res.json(result);
  },
};
