import { Router } from "express";
import { RegistrationController } from "./registration.controller";

const router = Router();

router.post("/", RegistrationController.create);

export default router;
