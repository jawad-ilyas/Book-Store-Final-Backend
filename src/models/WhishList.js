import mongoose, { Schema } from "mongoose";

const WishlistSchema = new Schema({

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

export const Wishlist = mongoose.model("Wishlist", WishlistSchema);
