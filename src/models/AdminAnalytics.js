import mongoose, { Schema } from "mongoose";

const AdminAnalyticsSchema = new Schema({

    dailySales: {
        type: Number
    },
    monthlySales: {
        type: Number
    },
    totalUsers: {
        type: Number
    },
    totalOrders: {
        type: Number
    },
    bestSellingBooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }],
    totalIncome: {
        type: Number
    }

}, { timestamps: true });

export const AdminAnalytics = mongoose.model('AdminAnalytics', AdminAnalyticsSchema);
