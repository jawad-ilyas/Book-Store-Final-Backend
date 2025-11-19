import mongoose, { Schema } from "mongoose";



const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    coverImage: {
        type: String,
        required: true
    },
    isActive: {
        type: String,
        default: true
    }
})

export const Category = mongoose.model("Category", CategorySchema)