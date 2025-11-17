import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

import {
    createBanner,
    getAllBanners,
    updateBanner,
    updateHeroImage,
    updateBannerImage,
    deleteBanner
} from "../controllers/bannerController.js";

const router = Router();

// Create a banner (admin only)
router.route("/admin/createBanner").post(authMiddleware, adminMiddleware, createBanner);

// Get all banners (public)
router.route("/getAllBanners").get(getAllBanners);

// Update banner details (admin only)
router.route("/admin/updateBanner/:id").post(authMiddleware, adminMiddleware, updateBanner);

// Update hero image of a banner (admin only)
router.route("/admin/updateHeroImage").post(authMiddleware, adminMiddleware, updateHeroImage);

// Update main/banner image of a banner (admin only)
router.route("/admin/updateBannerImage").post(authMiddleware, adminMiddleware, updateBannerImage);

// Delete a banner (admin only)
router.route("/admin/deleteBanner/:id").post(authMiddleware, adminMiddleware, deleteBanner);

export default router;
