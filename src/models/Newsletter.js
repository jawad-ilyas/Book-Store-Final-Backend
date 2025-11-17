import mongoose, { Schema } from "mongoose";



const NewsletterSchema = new Schema({
    email: {
        type: String,
        required: true,
    },

}, { timestamps: true })

export const Newsletter = mongoose.model('Newsletter', NewsletterSchema)