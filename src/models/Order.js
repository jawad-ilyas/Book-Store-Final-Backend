// import mongoose, { Schema } from "mongoose";

// const OrderSchema = new Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     items: [{
//         bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
//         quantity: { type: Number, default: 1 },
//         priceAtPurchase: { type: Number, required: true }
//     }],
//     totalAmount: { type: Number, required: true },
//     paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], required: true },
//     orderStatus: { type: String, enum: ['processing', 'shipped', 'delivered'], default: 'processing', required: true },
//     paymentMethod: { type: String, enum: ['card', 'cod', 'paypal'], default: 'cod', required: true },
//     shippingAddress: { type: String, required: true },
//     transactionId: { type: String }
// }, { timestamps: true });

// export const Order = mongoose.model("Order", OrderSchema);


import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
        quantity: { type: Number, default: 1 },
        priceAtPurchase: { type: Number, required: true }
    }],
    currency: { type: String, default: "usd" },
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], required: true, default: "pending" },
    orderStatus: { type: String, enum: ['processing', 'shipped', 'delivered'], default: 'processing', required: true },
    paymentMethod: { type: String, enum: ['card', 'cod', 'paypal'], default: 'cod', required: true },
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address", // reference the Address model
        required: true
    },
    transactionId: { type: String } // optional, store gateway transaction ID
}, { timestamps: true });

export const Order = mongoose.model("Order", OrderSchema);
