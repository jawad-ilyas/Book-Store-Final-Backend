import asyncHandler from "express-async-handler"
import { Book } from "../models/Book.js";
import { Author } from "../models/Author.js";
import { Category } from "../models/Category.js";
import { uploadCloudinary, uploadMultipleCloudinary } from "../utils/cloudinary.js";




const createBook = asyncHandler(async (req, res) => {
    console.log("REQ.FILES ====>", req.files);
    console.log("REQ.BODY ====>", req.body);
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
    console.log("title into creaet book ", title)
    console.log("title into creaet category ", category)
    console.log("title into creaet price ", price)
    console.log("title into creaet slug ", slug)
    console.log("title into creaet author ", author)
    const coverImageLocalPath = req.files?.coverImage[0]?.path; // uploaded image path from Cloudinary
    console.log("coverImageLocalPath", req.files?.coverImage)
    console.log("coverImageLocalPath", req.files?.coverImage[0])
    console.log("coverImageLocalPath", req.files?.coverImage[0]?.path)
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
    const authorId = typeof author === "string" ? author.trim() : author;
    const categoryId = typeof category === "string" ? category.trim() : category;
    console.log("authorId", authorId)
    console.log("categoryId", categoryId)
    const validAuthor = await Author.findById(authorId);
    if (!validAuthor) {
        return res.status(400).json({ success: false, message: "Invalid Author ID" });
    }

    const validCategory = await Category.findById(categoryId);
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
    // const coverImage = req.files?.coverImage
    //     ? req.files.coverImage[0].path
    //     : null;

    // Get other images

    const additionalImagesPaths = req.files?.images?.map(img => img.path) || [];
    const uploadedAdditionalImages = await uploadMultipleCloudinary(additionalImagesPaths);
    const book = await Book.create({
        title,
        author: validAuthor,
        category: validCategory,
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
        slug,
        images: uploadedAdditionalImages
    });
    validAuthor.books.push(book?._id)
    validAuthor.save();
    const verifyBook = await Book.findById(book?._id)
    res.status(201).json({
        success: true,
        message: "Book created successfully",
        book: verifyBook
    });
});
const updateBook = asyncHandler(async (req, res) => {



    const { id } = req.params

    if (!id) {
        return res.status(400).json({ message: "Please send the book ID", success: false });
    }

    const bookId = await Book.findById(id)

    if (!bookId) {
        return res.status(404).json({ message: "Book not found", success: false });
    }

    const updateBook = await Book.findByIdAndUpdate(
        id,
        { ...req.body },
        {
            new: true
        }
    )
    res.status(201).json({
        success: true,
        message: "Book updated  successfully",
        book: updateBook
    });
})
const deleteBook = asyncHandler(async (req, res) => {

    const { id } = req.params

    if (!id) {
        return res.status(400).json({ message: "Book Id is not found ", success: false })
    }

    const book = await Book.findByIdAndDelete({ _id: id })

    if (!book) {
        return res.status(404).json({ message: "Book not found", success: false });
    }

    res.status(200).json({
        success: true,
        message: "Book delete   successfully",

    });
})
const getBookById = asyncHandler(async (req, res) => {


    const { id } = req.params

    if (!id) {
        return res.status(400).json({ message: "Invalid or missing ID", success: false });
    }

    const book = await Book.findById(id).populate("author");


    if (!book) {
        return res.status(404).json({ success: false, message: "Book not found" });
    }

    res.status(200).json({
        success: true,
        book,
        message: "Book are fetched successfully",

    });
})
const getBooks = asyncHandler(async (req, res) => {

    const { search, category, minPrice, maxPrice, minRating } = req.query;


    const filter = {}


    if (search) {
        filter.title = { $regex: search }
    }

    if (category) {
        filter.category = category
    }

    if (minPrice || maxPrice) {
        filter.price = {}
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (minRating) {
        filter.rating = { $gte: Number(minRating) }
    }



    const books = await Book.find(filter).populate("author");

    res.status(200).json({
        success: true,
        books,
        message: "Book are fetched successfully",

    });
})
const getTopSellers = asyncHandler(async (_, res) => {

    const books = await Book.find({ topSeller: true }).populate("author")

    res.status(200).json({
        success: true,
        message: "Top seller books fetched successfully",
        books
    });

})
const getRecommendedBooks = asyncHandler(async (_, res) => {

    const books = await Book.find({ recommended: true }).populate("author")

    res.status(200).json({
        success: true,
        message: "Recommended books fetched successfully",
        books
    });
})

export { createBook, updateBook, deleteBook, getBookById, getBooks, getTopSellers, getRecommendedBooks };
