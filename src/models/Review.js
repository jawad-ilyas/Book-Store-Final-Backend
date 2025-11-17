import mongoose, { Schema } from "mongoose";

const ReviewSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    },
    rating: {
        type: Number,
        default: 5,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },

}, { timestamps: true });

export const Review = mongoose.model("Review", ReviewSchema);
