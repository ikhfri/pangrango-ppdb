import { Router } from "express";
import authModule from "@/modules/auth/auth.route";

const router = Router();

router.use("/", authModule);

export default router;
