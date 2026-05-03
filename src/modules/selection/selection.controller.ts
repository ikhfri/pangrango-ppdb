import { Request, Response } from "express";
import { SelectionService } from "./selection.service";

export const SelectionController = {
  async run(req: Request, res: Response) {
  const result = await SelectionService.runSelection();

  res.json({
    message: "Global selection completed",
    total: result.length,
  });
},

async ranking(req: Request, res: Response) {
  const result = await SelectionService.getRanking();
  res.json(result);
}
};
