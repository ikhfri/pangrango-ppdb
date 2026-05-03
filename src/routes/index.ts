import { Router } from "express";
import authRoutes from "./auth.routes";
import ppdbRoutes from "./ppdb.routes";
import schoolRoutes from "./school.routes";
import adminRoutes from "@/modules/admin/admin.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/ppdb", ppdbRoutes);
router.use("/school", schoolRoutes);
router.use("/admin", adminRoutes);

export default router;
