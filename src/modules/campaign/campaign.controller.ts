import { Request, Response } from "express";
import { CampaignService } from "./campaign.service";
import { createCampaignSchema, updateCampaignSchema } from "./campaign.dto";

export const CampaignController = {
  async create(req: Request, res: Response) {
    try {
      const parsed = createCampaignSchema.parse(req.body);
      const result = await CampaignService.create(parsed);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  async findAll(req: Request, res: Response) {
    const result = await CampaignService.findAll();
    res.json(result);
  },

  async findById(req: Request, res: Response) {
    try {
      const result = await CampaignService.findById(req.params.id as string);
      res.json(result);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const parsed = updateCampaignSchema.parse(req.body);
      const result = await CampaignService.update(req.params.id as string, parsed);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  async delete(req: Request, res: Response) {
    await CampaignService.delete(req.params.id as string);
    res.json({ message: "Deleted" });
  },
};
