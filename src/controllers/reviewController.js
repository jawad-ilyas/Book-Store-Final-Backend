import asyncHandler from "express-async-handler"
import { Book } from "../models/Book.js";
import { Review } from "../models/Review.js";

const addReview = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { bookId, rating, comment } = req.body;

    if (!bookId || !rating || !comment) {
        return res.status(400).json({ message: "All fields are required for review", success: false });
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Rating must be between 1 and 5", success: false });
    }

    const book = await Book.findById(bookId);
    if (!book) {
        return res.status(404).json({ message: "Book not found", success: false });
    }

    // Prevent duplicate review
    const existingReview = await Review.findOne({ userId, bookId });
    if (existingReview) {
        return res.status(409).json({ message: "You already reviewed this book", success: false });
    }

    const review = await Review.create({
        userId,
        bookId,
        rating,
        comment
    });

    res.status(201).json({
        message: "Review added successfully",
        success: true,
        review
    });
});

const updateReview = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { id: reviewId } = req.params
    const { bookId, rating, comment } = req.body;

    if (!bookId || !rating || !comment) {
        return res.status(400).json({ message: "All fields are required for review", success: false });
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Rating must be between 1 and 5", success: false });
    }

    const book = await Book.findById(bookId);
    if (!book) {
        return res.status(404).json({ message: "Book not found", success: false });
    }

    const review = await Review.findById(reviewId)


    if (review) {
        review.comment = comment
        review.rating = rating

        await review.save();
        res.status(201).json({
            message: "Review Updated successfully",
            success: true,
            review
        });
    }
    else {
        review = await Review.create({
            userId,
            bookId, rating, comment
        })
        res.status(201).json({
            message: "Review added successfully",
            success: true,
            review
        });
    }

})

const deleteReview = asyncHandler(async (req, res) => {
    const { id: reviewId } = req.params;

    // Find and delete the review
    const deletedReview = await Review.findOneAndDelete({ _id: reviewId });

    if (!deletedReview) {
        return res.status(404).json({
            message: "Review not found",
            success: false,
        });
    }

    // Optional: Only allow owner or admin to delete
    if (deletedReview.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized to delete this review", success: false, });
    }

    res.status(200).json({
        message: "Review deleted successfully",
        success: true,
    });
});

const getReviewsByBook = asyncHandler(async (req, res) => {
    const { id: bookId } = req.params;

    const booksReview = await Review.find({ bookId });

    res.status(200).json({
        message: booksReview.length ? "Reviews by book fetched successfully" : "No reviews found for this book",
        success: true,
        booksReview
    });
});

const getReviewsByUser = asyncHandler(async (req, res) => {
    const userId = req?.user?._id;

    const userReview = await Review.find({ userId });

    res.status(200).json({
        message: userReview.length ? "Reviews by user fetched successfully" : "No reviews found for this user",
        success: true,
        userReview
    });
});

export { addReview, updateReview, deleteReview, getReviewsByBook, getReviewsByUser }