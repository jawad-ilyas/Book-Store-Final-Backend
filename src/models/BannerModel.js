import mongoose, { Schema } from "mongoose";

const BannerSchema = new Schema({

    heroTitle: {
        type: String,
        default: ""
    },
    heroSubtitle: {
        type: String,
        default: ""
    },
    heroImage: {
        type: String,
        default: ""
    },

    // Single banner image (matches your controller)
    bannerImage: {
        type: String,
        default: ""
    },

    // Optional list of books to highlight
    topSellerBookIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        default: []
    }],

    promoText: {
        type: String,
        default: ""
    },
    promoLink: {
        type: String,
        default: ""
    },
    isActive: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

export const Banner = mongoose.model("Banner", BannerSchema);
