import mongoose, { Schema } from "mongoose";



const SearchHistorySchema = new Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    query: {
        type: String
    }



}, { timestamps: true })

export const SearchHistory = mongoose.model("SearchHistory", SearchHistorySchema)