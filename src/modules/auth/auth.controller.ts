import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { loginSchema, changePasswordSchema } from "./auth.dto";

export const AuthController = {
  async login(req: Request, res: Response) {
    try {
      const parsed = loginSchema.parse(req.body);

      const result = await AuthService.login(parsed.username, parsed.password);

      res.json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  async changePassword(req: any, res: Response) {
    try {
      const parsed = changePasswordSchema.parse(req.body);

      const result = await AuthService.changePassword(
        req.user.id,
        parsed.oldPassword,
        parsed.newPassword,
      );

      res.json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },
};
