import { Router } from "express";
import { addToCart, addToWishlist, removeFromCart, removeFromWishlist, updateCartItem } from "../controllers/userController.js";
import { changePassword, getUserProfile, updateUserProfile } from "../controllers/authController.js";


const router = Router();



router.route("/wishlist/add").post(addToWishlist)
router.route("/wishlist/remove").post(removeFromWishlist)
router.route("/cart/add").post(addToCart)
router.route("/cart/remove").post(removeFromCart)
router.route("/cart/update").post(updateCartItem)
router.route("/profile").post(getUserProfile)


export default router;