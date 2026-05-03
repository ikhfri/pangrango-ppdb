import { Router } from "express";
import registrationRoutes from "@/modules/registration/registration.route";
import campaignRoutes from "@/modules/campaign/campaign.route";
import paymentRoutes from "@/modules/payment/payment.route";
import documentRoutes from "@/modules/document/document.route";
import subjectRoutes from "@/modules/subject/subject.route";
import scoreRoutes from "@/modules/score/score.route";
import selectionRoutes from "@/modules/selection/selection.route";

const router = Router();
router.use("/subject", subjectRoutes);
router.use("/score", scoreRoutes);
router.use("/registration", registrationRoutes);
router.use("/campaign", campaignRoutes);
router.use("/payment", paymentRoutes);
router.use("/document", documentRoutes);
router.use("/selection", selectionRoutes);

export default router;
