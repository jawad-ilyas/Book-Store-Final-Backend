import mongoose, { Schema } from "mongoose";

const RecentlyViewedSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
        }
    ]
}, { timestamps: true });

export const RecentlyViewed = mongoose.model("RecentlyViewed", RecentlyViewedSchema);
