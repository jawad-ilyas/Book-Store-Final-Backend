import { Router } from "express";
import { 
    createSubscriptionPlan,
    getAllSubscriptionPlans,
    getSubscriptionPlanById,
    updateSubscriptionPlan,
    deleteSubscriptionPlan,
    togglePlanStatus
} from "../controllers/subscriptionPlanController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = Router();

// CREATE plan (Admin)
router.post("/", authMiddleware, adminMiddleware, createSubscriptionPlan);

// GET all plans
router.get("/", getAllSubscriptionPlans);

// GET single plan
router.get("/:id", getSubscriptionPlanById);

// UPDATE plan (Admin)
router.put("/:id", authMiddleware, adminMiddleware, updateSubscriptionPlan);

// DELETE plan (Admin)
router.delete("/:id", authMiddleware, adminMiddleware, deleteSubscriptionPlan);

// TOGGLE Active/Inactive (Admin)
router.patch("/:id/status", authMiddleware, adminMiddleware, togglePlanStatus);

export default router;
