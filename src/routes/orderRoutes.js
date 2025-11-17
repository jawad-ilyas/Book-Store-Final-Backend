import { Router } from "express";
import { createOrder, getAllOrders, getOrderById, getOrdersByUser, updateOrderStatus } from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";


const router = Router();


router.route('/').get(authMiddleware, adminMiddleware, getAllOrders)
router.route('/').post(authMiddleware, createOrder)
router.route('/user').get(authMiddleware, getOrdersByUser)
router.route('/:id').get(authMiddleware, getOrderById)
router.route('/:id').put(authMiddleware, adminMiddleware, updateOrderStatus)


export default router;