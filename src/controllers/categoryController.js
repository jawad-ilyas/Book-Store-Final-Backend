import asyncHandler from "express-async-handler";
import { Category } from "../models/Category.js";
import { uploadCloudinary } from "../utils/cloudinary.js";


// ----------------------
// Create Category
// ----------------------
const createCategory = asyncHandler(async (req, res) => {
    const { name, slug, description } = req.body;
    const coverImageLocalPath = req.file?.path;

    if (!name || !slug || !coverImageLocalPath) {
        return res.status(400).json({
            success: false,
            message: "name, slug, and coverImage are required"
        });
    }

    // Check slug
    const isSlugExists = await Category.findOne({ slug });
    if (isSlugExists) {
        return res.status(409).json({
            success: false,
            message: "Slug already exists"
        });
    }

    // Upload Image
    const image = await uploadCloudinary(coverImageLocalPath);
    if (!image?.url) {
        return res.status(500).json({
            success: false,
            message: "Failed to upload cover image"
        });
    }

    const category = await Category.create({
        name,
        slug,
        description: description || "",
        coverImage: image.url
    });

    res.status(201).json({
        success: true,
        message: "Category created successfully",
        category
    });
});


// ----------------------
// Update Category
// ----------------------
const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
        return res.status(404).json({
            success: false,
            message: "Category not found"
        });
    }

    let updatedData = { ...req.body };

    // Optional image upload
    if (req.file?.path) {
        const img = await uploadCloudinary(req.file.path);
        if (img?.url) updatedData.coverImage = img.url;
    }

    const updatedCategory = await Category.findByIdAndUpdate(
        id,
        updatedData,
        { new: true }
    );

    res.status(200).json({
        success: true,
        message: "Category updated successfully",
        category: updatedCategory
    });
});


// ----------------------
// Delete Category
// ----------------------
const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
        return res.status(404).json({
            success: false,
            message: "Category not found"
        });
    }

    res.status(200).json({
        success: true,
        message: "Category deleted successfully"
    });
});


// ----------------------
// Get All Categories
// ----------------------
const getAllCategories = asyncHandler(async (req, res) => {
    let categories = await Category.find({ isActive: true })
        .sort({ createdAt: -1 })   // NEW → ensure new category comes first
        .lean();                   // NEW → returns POJO, not mongoose docs

    res.status(200).json({
        success: true,
        message: "Categories fetched successfully",
        categoriesList: [...categories] // NEW → return NEW array reference
    });
});

// ----------------------
// Get Category by ID
// ----------------------
const getCategoryById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
        return res.status(404).json({
            success: false,
            message: "Category not found"
        });
    }

    res.status(200).json({
        success: true,
        message: "Category fetched successfully",
        category
    });
});



export {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById
};
