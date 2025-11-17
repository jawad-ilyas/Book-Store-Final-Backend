import { Router } from "express";
import { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } from "../controllers/blogController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { upload } from "../middleware/multer.middlerware.js";


const router = Router();



// ------------------- BLOG ROUTES -------------------

// Create a new blog (admin only)
router.post("/", authMiddleware, adminMiddleware, upload.single("thumbnail"), createBlog);

// Get all blogs (public)
router.get("/", getAllBlogs);

// Get single blog by ID (public)
router.get("/:id", getBlogById);

// Update a blog (admin only)
router.put("/:id", authMiddleware, adminMiddleware, upload.single("thumbnail"), updateBlog);

// Delete a blog (admin only)
router.delete("/:id", authMiddleware, adminMiddleware, deleteBlog);

export default router;
