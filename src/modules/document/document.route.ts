import { Router } from "express";
import { DocumentController } from "./document.controller";
import { upload } from "@/core/utils/upload";
import { authMiddleware } from "@/core/middlewares/auth.middleware";
import { roleMiddleware } from "@/core/middlewares/role.middleware";

const router = Router();

router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  DocumentController.upload,
);

router.get("/:id", authMiddleware, DocumentController.getByRegistration);

router.patch(
  "/review/:id",
  authMiddleware,
  roleMiddleware("ADMIN_PPDB", "STAFF"),
  DocumentController.review,
);

export default router;
