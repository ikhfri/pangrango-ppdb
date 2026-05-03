import { Router } from "express";
import authRoutes from "./auth.routes";
import ppdbRoutes from "./ppdb.routes";
import schoolRoutes from "./school.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/ppdb", ppdbRoutes);
router.use("/school", schoolRoutes);

export default router;
