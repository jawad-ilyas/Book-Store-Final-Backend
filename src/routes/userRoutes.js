import { Router } from "express";
import { addToCart, addToWishlist,getCart, getWishlist, removeFromCart, removeFromWishlist, updateCartItem } from "../controllers/userController.js";
import { changePassword, getUserProfile, updateUserProfile } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";


const router = Router();



router.route("/wishlist/getWishlist").get(authMiddleware, getWishlist)
router.route("/wishlist/add").post(authMiddleware, addToWishlist)
router.route("/wishlist/remove").post(authMiddleware, removeFromWishlist)
router.route("/cart/").get(authMiddleware, getCart)
router.route("/cart/add").post(authMiddleware, addToCart)
router.route("/cart/remove").put(authMiddleware, removeFromCart)
router.route("/cart/update").put(authMiddleware, updateCartItem)
router.route("/profile").post(authMiddleware, getUserProfile)
router.route("/updateUserProfile/:id").put(authMiddleware, updateUserProfile)


export default router;