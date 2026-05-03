import { Request, Response } from "express";
import { RegistrationService } from "./registration.service";
import { createRegistrationSchema } from "./registration.dto";

export const RegistrationController = {
  async create(req: Request, res: Response) {
    try {
      const parsed = createRegistrationSchema.parse(req.body);

      const result = await RegistrationService.create(parsed);

      res.json({
        message: "Registration success",
        data: result,
      });
    } catch (err: any) {
      res.status(400).json({
        message: err.message,
      });
    }
  },
};
