import mongoose, { Schema } from "mongoose";

const InventoryLogSchema = new Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    note: {
        type: String
    },
    changeType: {
        type: String,
        enum: ['add_stock', 'remove_stock', 'sale', 'refund']
    },

    currentStock: {
        type: Number      // FIXED
    },
    quantityChanged: {
        type: Number      // FIXED
    }

}, { timestamps: true });

export const InventoryLog = mongoose.model("InventoryLog", InventoryLogSchema);
