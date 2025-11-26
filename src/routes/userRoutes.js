import { Router } from "express";
import { addToCart, addToWishlist, getCart, getWishlist, updateProfileImage, getCartCount, removeFromCart, removeFromWishlist, updateCartItem, AllUserList } from "../controllers/userController.js";
import { changePassword, getUserProfile, updateUserProfile } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multer.middlerware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";


const router = Router();



router.route("/wishlist/getWishlist").get(authMiddleware, adminMiddleware, getWishlist)
router.route("/alluserlist").get(authMiddleware, AllUserList)
router.route("/wishlist/add").post(authMiddleware, addToWishlist)
router.route("/wishlist/remove").post(authMiddleware, removeFromWishlist)
router.route("/cart/").get(authMiddleware, getCart)
router.route("/cartcount/").get(authMiddleware, getCartCount)
router.route("/cart/add").post(authMiddleware, addToCart)
router.route("/cart/remove").put(authMiddleware, removeFromCart)
router.route("/cart/update").put(authMiddleware, updateCartItem)
router.route("/profile").get(authMiddleware, getUserProfile)
router.route("/updateUserProfile").put(authMiddleware, updateUserProfile)
router.route("/updateImage").put(authMiddleware, upload.single("avatar"), updateProfileImage)


export default router;  