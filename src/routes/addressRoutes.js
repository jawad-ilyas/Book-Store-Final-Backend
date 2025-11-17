import { Router } from "express";
import { createAddress, deleteAddress, getAddresses, updateAddress } from "../controllers/addressController";
import { authMiddleware } from "../middleware/authMiddleware.js";


const router = Router();



router.route("/").get(authMiddleware ,getAddresses)
router.route("/createAddress").post(authMiddleware ,createAddress)
router.route("/deleteAddress/:id").delete(authMiddleware ,deleteAddress)
router.route("/updateAddress/:id").put(authMiddleware ,updateAddress)


export default router;