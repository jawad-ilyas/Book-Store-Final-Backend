import { Router } from "express";
import { storePayment } from "../controllers/paymentController.js";

const router = Router();


router.route("/").post(storePayment);

export default router;
