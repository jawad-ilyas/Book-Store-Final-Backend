import mongoose, { Schema } from "mongoose";

const CartModelSchema = new Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    // fixed wrong ref
    sessionId: {
        type: String
    },

    items: [
        {
            bookId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book',
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],

}, { timestamps: true });

export const CartModel = mongoose.model("CartModel", CartModelSchema);
