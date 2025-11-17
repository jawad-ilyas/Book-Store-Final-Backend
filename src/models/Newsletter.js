import mongoose, { Schema } from "mongoose";



const NewsletterSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const Newsletter = mongoose.model('Newsletter', NewsletterSchema)