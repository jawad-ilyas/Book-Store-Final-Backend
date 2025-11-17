import { Router } from "express";
import { 
    createSubscriptionPlan,
    getAllSubscriptionPlans,
    getSubscriptionPlanById,
    updateSubscriptionPlan,
    deleteSubscriptionPlan,
    togglePlanStatus
} from "../controllers/subscriptionPlanController.js";

import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";

const router = Router();

// CREATE plan (Admin)
router.post("/", authMiddleware, isAdmin, createSubscriptionPlan);

// GET all plans
router.get("/", getAllSubscriptionPlans);

// GET single plan
router.get("/:id", getSubscriptionPlanById);

// UPDATE plan (Admin)
router.put("/:id", authMiddleware, isAdmin, updateSubscriptionPlan);

// DELETE plan (Admin)
router.delete("/:id", authMiddleware, isAdmin, deleteSubscriptionPlan);

// TOGGLE Active/Inactive (Admin)
router.patch("/:id/status", authMiddleware, isAdmin, togglePlanStatus);

export default router;
