import { Router } from "express";
import { createCoupon, deleteCoupon, getAllCoupon, useCoupon } from "../controllers/couponController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";


const router = Router();


router.route("/").post(authMiddleware, adminMiddleware, createCoupon)
router.route("/").get(authMiddleware, adminMiddleware, getAllCoupon)
router.route("/:id").delete(authMiddleware, adminMiddleware, deleteCoupon)
router.route("/use/:id").post(authMiddleware, useCoupon)


export default router