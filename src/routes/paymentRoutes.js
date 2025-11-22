import { Router } from "express";
import { storePayment } from "../controllers/paymentController.js";
import { createPaymentIntent } from "../controllers/paymentIntentController.js";

const router = Router();


// router.route("/create-payment-intent").post(storePayment);

router.post("/create-payment-intent", createPaymentIntent);
export default router;
