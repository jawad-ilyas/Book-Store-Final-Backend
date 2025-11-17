import mongoose, { Schema } from "mongoose";

const BlogSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
    },
    content: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
    tags: [{
        type: String
    }],
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date
    }

}, { timestamps: true });

export const Blog = mongoose.model("Blog", BlogSchema);
