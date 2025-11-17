import mongoose, { Schema } from "mongoose";

const NotificationSchema = new Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
    },
    body: {
        type: String,
    },
    read: {
        type: Boolean,
        default: false
    },
    type: {
        type: String, 
        enum: ['order_update', 'promotion', 'general']
    }

}, { timestamps: true });

export const Notification = mongoose.model("Notification", NotificationSchema);
