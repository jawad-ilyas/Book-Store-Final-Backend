import mongoose, { Schema } from "mongoose";

const LogsSchema = new Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    metaData: {
        type: String,
    },
    message: {
        type: String,
    },
    type: {
        type: String, 
        enum: ['error', 'auth', 'adminAction', 'system']
    }

}, { timestamps: true });

export const Logs = mongoose.model("Logs", LogsSchema);
