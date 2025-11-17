import mongoose, { Schema } from "mongoose";

const SubscriptionPlanSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    priceMonthly: {
        type: Number,
        required: true
    },
    priceYearly: {
        type: Number,
        required: true
    },
    featured: {
        type: [String],
        default: []
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export const SubscriptionPlan = mongoose.model("SubscriptionPlan", SubscriptionPlanSchema);
