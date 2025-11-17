import asyncHandler from "express-async-handler";
import { CartModel } from "../models/CartModel.js";
import { Order } from "../models/Order.js";
import { Payment } from "../models/Payment.js";
import { Address } from "../models/Address.js";

// Controller to create order from cart
const createOrder = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { addressId, paymentMethod, provider, transactionId } = req.body;

    // 1. Validate required fields
    if (!addressId || !paymentMethod) {
        return res.status(400).json({
            success: false,
            message: "Address and payment method are required"
        });
    }

    // 2. Get user's cart
    const cart = await CartModel.findOne({ userId }).populate("items.bookId");
    if (!cart || cart.items.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Cart is empty"
        });
    }

    // 3. Validate address
    const address = await Address.findById(addressId);
    if (!address) {
        return res.status(404).json({
            success: false,
            message: "Address not found"
        });
    }

    // 4. Calculate total amount
    let totalAmount = 0;
    const orderItems = cart.items.map(item => {
        const price = item.bookId.price; // price at purchase
        totalAmount += price * item.quantity;
        return {
            bookId: item.bookId._id,
            quantity: item.quantity,
            priceAtPurchase: price
        };
    });

    // 5. Create the order
    const order = await Order.create({
        userId,
        items: orderItems,
        totalAmount,
        paymentStatus: paymentMethod === "cod" ? "pending" : "paid",
        paymentMethod,
        shippingAddress: address._id,
        transactionId: transactionId || null
    });

    // 6. If payment method is online, save payment info
    if (paymentMethod !== "cod" && transactionId && provider) {
        await Payment.create({
            userId,
            orderId: order._id,
            amount: totalAmount,
            status: "completed",
            provider,
            transactionId
        });
    }

    // 7. Clear user cart
    cart.items = [];
    await cart.save();

    // 8. Return response
    const populatedOrder = await Order.findById(order._id)
        .populate("items.bookId")
        .populate("shippingAddress");

    res.status(201).json({
        success: true,
        message: "Order created successfully",
        order: populatedOrder
    });
})

const getOrderById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Validate order existence
    const order = await Order.findById(id)
        .populate("items.bookId")
        .populate("shippingAddress");

    if (!order) {
        return res.status(404).json({
            success: false,
            message: "Order not found"
        });
    }

    res.status(200).json({
        success: true,
        message: "Order fetched successfully",
        order
    });
});

const getOrdersByUser = asyncHandler(async (req, res) => {
    const userId = req.user?._id; // better to get from auth middleware

    // Fetch all orders for the user
    const orders = await Order.find({ userId })
        .populate("items.bookId"); // populate books in each order

    if (!orders || orders.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No orders found for this user"
        });
    }

    res.status(200).json({
        success: true,
        message: "Orders fetched successfully",
        orders
    });
});


const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find()
        .populate("items.bookId")
        .populate("shippingAddress");

    if (!orders || orders.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No orders found"
        });
    }

    res.status(200).json({
        success: true,
        message: "Orders fetched successfully",
        orders
    });
});

const updateOrderStatus = asyncHandler(async (req, res) => {
    const { id: orderId } = req.params;
    const { orderStatus } = req.body;

    const verifyOrder = await Order.findById(orderId);

    if (!verifyOrder) {
        return res.status(404).json({
            success: false,
            message: "Order not found"
        });
    }

    verifyOrder.orderStatus = orderStatus;

    await verifyOrder.save();

    res.status(200).json({
        success: true,
        message: "Order status updated successfully",
        order: verifyOrder
    });
});



export { createOrder, getOrderById, getOrdersByUser, getAllOrders, updateOrderStatus };
