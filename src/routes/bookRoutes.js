import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { createBook, deleteBook, getBookById, getBooks, getRecommendedBooks, getTopSellers, updateBook } from "../controllers/bookController.js";



const router = Router();
// ----------------------
// Admin Routes (Protected)
// ----------------------
router.route("/admin/createBook").post(authMiddleware, adminMiddleware, createBook)
router.route("/admin/updateBook/:id").put(authMiddleware, adminMiddleware, updateBook)
router.route("/admin/deleteBook/:id").delete(authMiddleware, adminMiddleware, deleteBook)

// ----------------------
// Public Routes
// ----------------------
router.route("/:id ").get(getBookById)
router.route("/getBooks").get(getBooks)
router.route("/getRecommendedBooks").get(getRecommendedBooks)
router.route("/getTopSellers").get(getTopSellers)

export default router;