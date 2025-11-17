import asyncHandler from "express-async-handler"
import { Book } from "../models/Book.js";
import { Author } from "../models/Author";
import { Category } from "../models/Category.js";
import { uploadCloudinary } from "../utils/cloudinary.js";




const createBook = asyncHandler(async (req, res) => {
    const {
        title,
        author,
        category,
        subCategory,
        price,
        discountPercent,
        description,
        stock,
        rating,
        ratingCounts,
        publisher,
        isbn,
        pages,
        language,
        tags,
        topSeller,
        recommended,
        slug
    } = req.body;

    const coverImageLocalPath = req.file?.path; // uploaded image path from Cloudinary

    // 1. Required fields validation
    if (!title || !author || !category || !price || !coverImageLocalPath || !slug) {
        return res.status(400).json({
            success: false,
            message: "title, author, category, price, coverImage and slug are required"
        });
    }



    // 2. Check if book already exists
    const isBookExists = await Book.findOne({ title });
    if (isBookExists) {
        return res.status(409).json({ success: false, message: "Book already exists" });
    }

    // 3. Validate author and category IDs
    const validAuthor = await Author.findById(author);
    if (!validAuthor) {
        return res.status(400).json({ success: false, message: "Invalid Author ID" });
    }

    const validCategory = await Category.findById(category);
    if (!validCategory) {
        return res.status(400).json({ success: false, message: "Invalid Category ID" });
    }

    // 4. Create the book
    const coverImage = await uploadCloudinary(coverImageLocalPath);
    if (!coverImage?.url) {
        return res.status(500).json({
            success: false,
            message: "Failed to upload cover image"
        });
    }

    const isSlugExists = await Book.findOne({ slug });
    if (isSlugExists) {
        return res.status(409).json({ success: false, message: "Slug already exists" });
    }

    const book = await Book.create({
        title,
        author,
        category,
        subCategory: subCategory || "",
        price,
        discountPercent: discountPercent || 0,
        description: description || "",
        stock: stock || 0,
        rating: rating || 0,
        ratingCounts: ratingCounts || 0,
        publisher: publisher || "",
        isbn: isbn || "",
        pages: pages || 0,
        language: Array.isArray(language) ? language : [],
        tags: Array.isArray(tags) ? tags : [],
        topSeller: !!topSeller,
        recommended: !!recommended,
        coverImage: coverImage.url,
        slug
    });
    res.status(201).json({
        success: true,
        message: "Book created successfully",
        book
    });
});


const updateBook  = asyncHandler(async ()=>{

})

export { createBook ,updateBook };
