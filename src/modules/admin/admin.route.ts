import { Router } from "express";
import { AdminController } from "./admin.controller";
import { authMiddleware } from "@/core/middlewares/auth.middleware";
import { roleMiddleware } from "@/core/middlewares/role.middleware";

const router = Router();

router.use(
  authMiddleware,
  roleMiddleware("SUPER_ADMIN", "ADMIN_PPDB", "STAFF"),
);

router.get("/summary", AdminController.summary);

router.get("/registration", AdminController.registrations);
router.get("/registration/:id", AdminController.registrationDetail);

router.get("/document/stats", AdminController.documentStats);

router.get("/payment/stats", AdminController.paymentStats);

export default router;