import { Request, Response } from "express";
import { PaymentService } from "./payment.service";

export const PaymentController = {
  async getSnapToken(req: any, res: Response) {
    try {
      const registrationId = req.params.id as string;

      const result = await PaymentService.createSnapToken(registrationId);

      res.json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  async webhook(req: Request, res: Response) {
    try {
      await PaymentService.handleWebhook(req.body);
      res.status(200).json({ message: "OK" });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },
};
