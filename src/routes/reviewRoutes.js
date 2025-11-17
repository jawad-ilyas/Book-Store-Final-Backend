import { Router } from "express";
import { addReview, deleteReview, getReviewsByBook, getReviewsByUser, updateReview } from "../controllers/reviewController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";


const router = Router();


router.route("/").post(authMiddleware, addReview)
router.route("/:id").put(authMiddleware, updateReview)
router.route("/:id").delete(authMiddleware, deleteReview)



router.route("/book/:id").get(getReviewsByBook)
router.route("/user").get(authMiddleware, getReviewsByUser)



export default router