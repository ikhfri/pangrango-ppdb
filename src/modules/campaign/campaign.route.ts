import { Router } from "express";
import { CampaignController } from "./campaign.controller";
import { authMiddleware } from "@/core/middlewares/auth.middleware";
import { roleMiddleware } from "@/core/middlewares/role.middleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN", "ADMIN_PPDB"),
  CampaignController.create,
);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN", "ADMIN_PPDB"),
  CampaignController.update,
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN", "ADMIN_PPDB"),
  CampaignController.delete,
);

router.get("/", CampaignController.findAll);
router.get("/:id", CampaignController.findById);

export default router;
