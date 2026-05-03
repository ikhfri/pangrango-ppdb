import { Router } from "express";
import { SelectionController } from "./selection.controller";
import { authMiddleware } from "@/core/middlewares/auth.middleware";
import { roleMiddleware } from "@/core/middlewares/role.middleware";

const router = Router();

router.post(
  "/run",
  authMiddleware,
  roleMiddleware("ADMIN_PPDB"),
  SelectionController.run,
);
router.get("/ranking", authMiddleware, SelectionController.ranking);

export default router;
