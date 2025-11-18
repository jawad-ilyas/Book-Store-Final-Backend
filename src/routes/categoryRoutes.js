import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { upload } from "../middleware/multer.middlerware.js";


import {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById
} from "../controllers/categoryController.js";


const router = Router();

// ----------------------
// Admin Routes (Protected)
// ----------------------
router.post(
    "/admin/createCategory",
    authMiddleware,
    adminMiddleware,
    upload.single("coverImage"),
    createCategory
);

router.put(
    "/admin/updateCategory/:id",
    authMiddleware,
    adminMiddleware,
    upload.single("coverImage"),
    updateCategory
);

router.delete(
    "/admin/deleteCategory/:id",
    authMiddleware,
    adminMiddleware,
    deleteCategory
);

// ----------------------
// Public Routes
// ----------------------
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

export default router;
