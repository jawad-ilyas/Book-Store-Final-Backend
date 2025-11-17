import mongoose, { Schema } from "mongoose";



const AIRecommendationSchema = new Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    bookPreferences: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
        }
    ],
    categoryPreferences: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        }
    ],
    aiVector: {
        type: String
    },
    lastUpdate: {
        type: Date
    }
}, { timestamps: true })

export const AIRecommendation = mongoose.model("AIRecommendation", AIRecommendationSchema)