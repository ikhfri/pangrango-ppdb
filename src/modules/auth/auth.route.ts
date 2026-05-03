import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authMiddleware } from "@/core/middlewares/auth.middleware";

const router = Router();

router.post("/login", AuthController.login);
router.post("/change-password", authMiddleware, AuthController.changePassword);

export default router;
