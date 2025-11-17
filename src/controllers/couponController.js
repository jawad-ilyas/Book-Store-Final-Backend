import asyncHandler from "express-async-handler";
import { Coupon } from "../models/Coupon.js";

// Create a new coupon
const createCoupon = asyncHandler(async (req, res) => {
    const {
        code,
        couponName,
        discountType,
        discountValue,
        minOrderAmount,
        startDate,
        endDate,
        usageLimit,
        isActive
    } = req.body;

    // Validate required fields
    if (
        !code ||
        !couponName ||
        !discountType ||
        discountValue === undefined ||
        minOrderAmount === undefined ||
        !startDate ||
        !endDate ||
        usageLimit === undefined ||
        isActive === undefined
    ) {
        return res.status(400).json({
            message: "All fields are required",
            success: false
        });
    }

    // Prevent duplicate coupon code
    const existing = await Coupon.findOne({ code });
    if (existing) {
        return res.status(409).json({
            message: "Coupon code already exists",
            success: false
        });
    }

    const coupon = await Coupon.create({ ...req.body });

    return res.status(201).json({
        message: "New coupon created successfully",
        success: true,
        coupon
    });
});

// Get all coupons
const getAllCoupon = asyncHandler(async (req, res) => {
    const coupons = await Coupon.find({});
    return res.status(200).json({
        message: "All coupons fetched successfully",
        success: true,
        coupons
    });
});

// Delete a coupon
const deleteCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const coupon = await Coupon.findById(id);
    if (!coupon) {
        return res.status(404).json({
            message: "Coupon not found",
            success: false
        });
    }

    await Coupon.findByIdAndDelete(id);

    return res.status(200).json({
        message: "Coupon deleted successfully",
        success: true
    });
});

// Apply/use a coupon for a user
const useCoupon = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { id: couponId } = req.params;
    const { code } = req.body
    const coupon = await Coupon.findById(couponId);
    
    if (!coupon) {
        return res.status(404).json({ message: "Coupon not found", success: false });
    }

    if (!code === coupon.code) {
        return res.status(404).json({ message: "Coupon code are not matched", success: false });
    }

    // Check if user already used the coupon
    if (coupon.usedBy.includes(userId)) {
        return res.status(400).json({
            message: "You have already used this coupon",
            success: false
        });
    }

    // Check usage limit
    if (coupon.usedBy.length >= coupon.usageLimit) {
        return res.status(400).json({
            message: "Coupon usage limit reached",
            success: false
        });
    }

    // Add user to usedBy array
    coupon.usedBy.push(userId);
    await coupon.save();

    return res.status(200).json({
        message: "Coupon applied successfully",
        success: true,
        coupon
    });
});

export { createCoupon, getAllCoupon, deleteCoupon, useCoupon };
