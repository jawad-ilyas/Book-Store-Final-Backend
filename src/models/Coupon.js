import mongoose, { Schema } from "mongoose";

const CouponSchema = new Schema({

    code: {
        type: String,
    },
    discountType: {
        type: String,
    },
    discountValue: {
        type: Number       // FIXED
    },
    minOrderAmount: {
        type: Number
    },
    maxOrderAmount: {
        type: Number
    },
    startDate: {           // FIXED
        type: Date
    },
    endDate: {             // FIXED
        type: Date
    },
    usageLimit: {
        type: Number       // FIXED
    },
    usedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    ],
    isActive: {
        type: Boolean
    }

}, { timestamps: true });

export const Coupon = mongoose.model("Coupon", CouponSchema);
