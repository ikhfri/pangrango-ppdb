import { Router } from "express";
import { ScoreController } from "./score.controller";
import { authMiddleware } from "@/core/middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, ScoreController.create);
router.post("/bulk", authMiddleware, ScoreController.bulk);
router.get("/:id", authMiddleware, ScoreController.get);

export default router;
