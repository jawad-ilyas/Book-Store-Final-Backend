import mongoose, { Schema } from "mongoose";

const BannerSchema = new Schema({

    heroTitle: {
        type: String,
    },
    heroSubtitle: {
        type: String,
    },
    heroImage: {
        type: String,
    },
    bannerImage: [{
        type: String
    }],
    topSellerBookIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }],
    promoText: {
        type: String,
    },
    promoLink: {
        type: String
    }
}, { timestamps: true });

export const Banner = mongoose.model("Banner", BannerSchema);
