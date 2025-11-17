import asyncHandler from "express-async-handler";
import { Blog } from "../models/Blog.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { deleteFromCloudinary } from "../utils/deleteFromCloudinary.js";

// ------------------- CREATE BLOG -------------------
const createBlog = asyncHandler(async (req, res) => {
    let thumbnailUrl = "";

    // Upload thumbnail if file exists
    if (req.file?.path) {
        const uploaded = await uploadCloudinary(req.file.path);
        thumbnailUrl = uploaded?.url || "";
    }

    const blog = await Blog.create({
        name: req.body.name,
        slug: req.body.slug,
        content: req.body.content,
        tags: req.body.tags || [],
        authorId: req.body.authorId, // or req.user._id if using auth
        thumbnail: thumbnailUrl,
    });

    res.status(201).json({
        success: true,
        message: "Blog created successfully",
        blog,
    });
});

// ------------------- GET ALL BLOGS -------------------
const getAllBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find().populate("authorId", "name email");

    res.status(200).json({
        success: true,
        message: "Blogs fetched successfully",
        blogs,
    });
});

// ------------------- GET SINGLE BLOG -------------------
const getBlogById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const blog = await Blog.findById(id).populate("authorId", "name email");

    if (!blog) {
        return res.status(404).json({
            success: false,
            message: "Blog not found",
        });
    }

    res.status(200).json({
        success: true,
        message: "Blog fetched successfully",
        blog,
    });
});

// ------------------- UPDATE BLOG -------------------
const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) {
        return res.status(404).json({
            success: false,
            message: "Blog not found",
        });
    }

    // Update thumbnail if new file uploaded
    if (req.file?.path) {
        if (blog.thumbnail) await deleteFromCloudinary(blog.thumbnail); // delete old thumbnail
        const uploaded = await uploadCloudinary(req.file.path);
        blog.thumbnail = uploaded?.url || "";
    }

    // Update other fields
    blog.name = req.body.name || blog.name;
    blog.slug = req.body.slug || blog.slug;
    blog.content = req.body.content || blog.content;
    blog.tags = req.body.tags || blog.tags;

    await blog.save();

    res.status(200).json({
        success: true,
        message: "Blog updated successfully",
        blog,
    });
});

// ------------------- DELETE BLOG -------------------
const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) {
        return res.status(404).json({
            success: false,
            message: "Blog not found",
        });
    }

    // Delete thumbnail if exists
    if (blog.thumbnail) {
        await deleteFromCloudinary(blog.thumbnail);
    }

    await Blog.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: "Blog deleted successfully",
    });
});

export { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog };
