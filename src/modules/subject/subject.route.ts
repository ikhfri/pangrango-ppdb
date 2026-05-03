import { Router } from "express";
import { SubjectController } from "./subject.controller";
import { authMiddleware } from "@/core/middlewares/auth.middleware";
import { roleMiddleware } from "@/core/middlewares/role.middleware";

const router = Router();

// admin manage subject
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN_PPDB", "SUPER_ADMIN"),
  SubjectController.create,
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN_PPDB", "SUPER_ADMIN"),
  SubjectController.delete,
);

// public (frontend ambil list)
router.get("/", SubjectController.findAll);

export default router;
