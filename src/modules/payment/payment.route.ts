import { Router } from "express";
import { PaymentController } from "./payment.controller";
import { authMiddleware } from "@/core/middlewares/auth.middleware";

const router = Router();

router.get("/snap/:id", authMiddleware, PaymentController.getSnapToken);

router.post("/webhook", PaymentController.webhook);

export default router;
