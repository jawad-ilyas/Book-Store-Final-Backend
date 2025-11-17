import asyncHandler from "express-async-handler";
import { Payment } from "../models/Payment.js";
import { Order } from "../models/Order.js";

/**
 * Store payment response from provider (Stripe, PayPal)
 * and update the order payment status
 */
const storePayment = asyncHandler(async (req, res) => {
    const { userId, orderId, amount, status, provider, transactionId } = req.body;

    if (!userId || !orderId || !amount || !status || !provider || !transactionId) {
        return res.status(400).json({
            success: false,
            message: "All payment fields are required",
        });
    }

    // Check if payment already exists (prevent duplicates)
    const existingPayment = await Payment.findOne({ transactionId });
    if (existingPayment) {
        return res.status(409).json({
            success: false,
            message: "Payment with this transaction ID already exists",
        });
    }

    // Store payment in DB
    const payment = await Payment.create({
        userId,
        orderId,
        amount,
        status,
        provider,
        transactionId,
    });

    // Update order paymentStatus
    const order = await Order.findById(orderId);
    if (order) {
        order.paymentStatus = status === "completed" ? "paid" : "failed";
        await order.save();
    }

    res.status(201).json({
        success: true,
        message: "Payment stored successfully",
        payment,
    });
});

export { storePayment };
