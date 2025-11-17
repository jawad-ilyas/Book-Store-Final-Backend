import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    avatar: { type: String, default: "" },
    address: { type: String },
    refreshToken: { type: String },
    phone: { type: String },
    wishlist: [   // FIXED
        { type: mongoose.Schema.Types.ObjectId, ref: "Book" }
    ],
    cart: [
        {
            bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
            quantity: { type: Number, default: 1 }
        }
    ],
    orders: [   // FIXED
        { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }
    ]
}, { timestamps: true });

export const User = mongoose.model("User", UserSchema);
