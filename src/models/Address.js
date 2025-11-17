import mongoose, { Schema } from "mongoose";

const AddressSchema = new Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
    },
    addressLine1: {
        type: String
    },
    addressLine2: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    postalCode: {
        type: String
    },
    country: {
        type: String,
    },
    phone: {
        type: String
    },
    isDefault: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const Address = mongoose.model("Address", AddressSchema);
