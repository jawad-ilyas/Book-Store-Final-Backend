import asyncHandler from "express-async-handler";
import { Author } from "../models/Author.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { deleteFromCloudinary } from "../utils/deleteFromCloudinary.js";

// ------------------- CREATE AUTHOR -------------------
const createAuthor = asyncHandler(async (req, res) => {
    let photoUrl = "";

    // Upload photo if exists
    if (req.file?.path) {
        const uploaded = await uploadCloudinary(req.file.path);
        photoUrl = uploaded?.url || "";
    }

    const author = await Author.create({
        name: req.body.name,
        bio: req.body.bio,
        socialLinks: req.body.socialLinks || [],
        photo: photoUrl
    });

    res.status(201).json({
        success: true,
        message: "Author created successfully",
        author,
    });
});

// ------------------- GET ALL AUTHORS -------------------
const getAllAuthors = asyncHandler(async (req, res) => {
    const authors = await Author.find().populate("books");

    res.status(200).json({
        success: true,
        message: "Authors fetched successfully",
        authors,
    });
});

// ------------------- GET SINGLE AUTHOR -------------------
const getAuthorById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const author = await Author.findById(id).populate("books");

    if (!author) {
        return res.status(404).json({
            success: false,
            message: "Author not found",
        });
    }

    res.status(200).json({
        success: true,
        message: "Author fetched successfully",
        author,
    });
});

// ------------------- UPDATE AUTHOR -------------------
const updateAuthor = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const author = await Author.findById(id);
    if (!author) {
        return res.status(404).json({
            success: false,
            message: "Author not found",
        });
    }

    // Update photo if new file uploaded
    if (req.file?.path) {
        if (author.photo) await deleteFromCloudinary(author.photo); // delete old photo
        const uploaded = await uploadCloudinary(req.file.path);
        author.photo = uploaded?.url || "";
    }

    // Update other fields
    author.name = req.body.name || author.name;
    author.bio = req.body.bio || author.bio;
    author.socialLinks = req.body.socialLinks || author.socialLinks;

    await author.save();

    res.status(200).json({
        success: true,
        message: "Author updated successfully",
        author,
    });
});

// ------------------- DELETE AUTHOR -------------------
const deleteAuthor = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const author = await Author.findById(id);
    if (!author) {
        return res.status(404).json({
            success: false,
            message: "Author not found",
        });
    }

    // Delete photo from cloud if exists
    if (author.photo) {
        await deleteFromCloudinary(author.photo);
    }

    await Author.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: "Author deleted successfully",
    });
});

export { createAuthor, getAllAuthors, getAuthorById, updateAuthor, deleteAuthor };
