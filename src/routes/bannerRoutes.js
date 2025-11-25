import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

import {
    createBanner,
    getAllBanners,
    updateBanner,
    updateHeroImage,
    updateBannerImage,
    deleteBanner,
    getBanner
} from "../controllers/bannerController.js";
import { upload } from "../middleware/multer.middlerware.js";

const router = Router();

// Create a banner (admin only)
router.route("/admin/createBanner").post(authMiddleware, adminMiddleware, upload.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "bannerImage", maxCount: 1 }
]), createBanner);

// Get all banners (public)
router.route("/getAllBanners").get(getAllBanners);

// Update banner details (admin only)
router.route("/admin/getBanner/:id").get(authMiddleware, adminMiddleware, getBanner);
router.route("/admin/updateBanner/:id").put(authMiddleware, adminMiddleware, updateBanner);

// Update hero image of a banner (admin only)
router.route("/admin/updateHeroImage/:id").put(authMiddleware, adminMiddleware, upload.single("heroImage"), updateHeroImage);

// Update main/banner image of a banner (admin only)
router.route("/admin/updateBannerImage/:id").put(authMiddleware, adminMiddleware, upload.single("bannerImage"), updateBannerImage);

// Delete a banner (admin only)
router.route("/admin/deleteBanner/:id").delete(authMiddleware, adminMiddleware, deleteBanner);

export default router;
