import mongoose, { Schema } from "mongoose";

const AuthorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String,
    },
    photo: {
        type: String,
    },
    socialLinks: [{
        type: String
    }],
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }],
}, { timestamps: true });

export const Author = mongoose.model("Author", AuthorSchema);
