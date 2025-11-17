import mongoose, { Schema } from "mongoose";

// Book Schema: Stores all information about books in the bookstore
const BookSchema = new Schema({
    // Book title
    title: {
        type: String,
        required: true,
    },

    // Author name or reference to Author model (pro-level)
    // For now, keeping string, can later change to: { type: ObjectId, ref: 'Author' }
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required : true 
    },

    // Category reference
    // Using ObjectId to link to Category collection
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },

    // Subcategory as optional string
    subCategory: {
        type: String,
    },

    // Book price
    price: {
        type: Number,
        required: true,
    },

    // Discount price or percentage
    discountPercent: {
        type: Number,
        default: 0, // default 0 means no discount
    },

    // Book description
    description: {
        type: String,
    },

    // Main cover image (required)
    coverImage: {
        type: String,
        required: true,
    },

    // Additional images (optional)
    images: [
        {
            type: String,
        },
    ],

    // Stock quantity
    stock: {
        type: Number,
        default: 0,
    },

    // Average rating of the book
    rating: {
        type: Number,
        default: 0,
    },

    // Number of ratings, helps calculate average
    ratingCounts: {
        type: Number,
        default: 0,
    },

    // Publisher name (optional)
    publisher: {
        type: String,
    },

    // ISBN stored as string for leading zeros / hyphens
    isbn: {
        type: String,
    },

    // Number of pages
    pages: {
        type: Number,
    },

    // Languages book is available in
    language: [
        {
            type: String,
        },
    ],

    // Tags for filtering / search
    tags: [
        {
            type: String,
        },
    ],

    // Flag for homepage Top Seller section
    topSeller: {
        type: Boolean,
        default: false,
    },

    // Flag for homepage Recommended section
    recommended: {
        type: Boolean,
        default: false,
    },

    // SEO-friendly slug for URL
    slug: {
        type: String,
        unique: true,
    },

    // Created timestamp
   
},{timestamps : true});
export const Book = mongoose.model("Book", BookSchema)
