import { Request, Response } from "express";
import { AdminService } from "./admin.service";

export const AdminController = {
  async summary(req: Request, res: Response) {
    const result = await AdminService.getSummary();
    res.json(result);
  },

  async registrations(req: Request, res: Response) {
    const result = await AdminService.getRegistrations(req.query);
    res.json(result);
  },

  async registrationDetail(req: Request<{ id: string }>, res: Response) {
    const result = await AdminService.getRegistrationDetail(req.params.id);
    res.json(result);
  },

  async documentStats(req: Request, res: Response) {
    const result = await AdminService.getDocumentStats();
    res.json(result);
  },

  async paymentStats(req: Request, res: Response) {
    const result = await AdminService.getPaymentStats();
    res.json(result);
  },
};
