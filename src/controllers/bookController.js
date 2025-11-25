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
    // console.log("title into creaet book ", title)
    // console.log("title into creaet category ", category)
    // console.log("title into creaet price ", price)
    // console.log("title into creaet slug ", slug)
    // console.log("title into creaet author ", author)
    const coverImageLocalPath = req.files?.coverImage[0]?.path; // uploaded image path from Cloudinary
    // console.log("coverImageLocalPath", req.files?.coverImage)
    // console.log("coverImageLocalPath", req.files?.coverImage[0])
    // console.log("coverImageLocalPath", req.files?.coverImage[0]?.path)
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
    // console.log("authorId", authorId)
    // console.log("categoryId", categoryId)
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
  const id = req.params.id;

  if (!id) return res.status(400).json({ success: false, message: "Book id missing" });

  const book = await Book.findById(id);
  if (!book) return res.status(404).json({ success: false, message: "Book not found" });

  // ----------------------------
  // Parse incoming text fields
  // ----------------------------
  const {
    title,
    author,
    category,
    subCategory,
    price,
    discountPercent,
    stock,
    slug,
    description,
    topSeller,
    recommended,
  } = req.body;

  // ----------------------------
  // Parse existing images (JSON string sent from frontend)
  // ----------------------------
  let parsedExistingImages = [];
  if (req.body.images) {
    try {
      parsedExistingImages = JSON.parse(req.body.images);
      if (!Array.isArray(parsedExistingImages)) parsedExistingImages = [];
    } catch (err) {
      parsedExistingImages = [];
    }
  }

  // ----------------------------
  // Upload new additional images to Cloudinary (if any)
  // ----------------------------
  const newFiles = req.files?.images || []; // array of file objects from multer
  let uploadedAdditionalUrls = [];

  if (newFiles.length) {
    // collect local paths (multer stores path property if diskStorage used)
    const localPaths = newFiles.map((f) => f.path).filter(Boolean);

    if (localPaths.length) {
      // uploadMultipleCloudinary should return array of URLs (strings)
      uploadedAdditionalUrls = await uploadMultipleCloudinary(localPaths);

      // optional: remove local temp files after upload
      await Promise.all(
        localPaths.map(async (p) => {
          try {
            await fs.unlink(p);
          } catch (err) {
            // ignore unlink errors
          }
        })
      );
    }
  }

  // ----------------------------
  // Handle cover image upload (if new one provided)
  // ----------------------------
  let finalCoverUrl = book.coverImage || null;

  const coverFile = req.files?.coverImage?.[0];
  if (coverFile?.path) {
    // upload single cover image
    const uploadedCover = await uploadCloudinary(coverFile.path);
    if (uploadedCover?.url) finalCoverUrl = uploadedCover.url;

    // optional: remove local cover file
    try {
      await fs.unlink(coverFile.path);
    } catch (err) {
      // ignore
    }
  }

  // ----------------------------
  // Merge final images array: existing + newly uploaded
  // ----------------------------
  const finalImages = [...parsedExistingImages, ...uploadedAdditionalUrls];

  // ----------------------------
  // Build update payload
  // ----------------------------
  const updatePayload = {
    // only set fields that are defined (you can adjust to validate/whitelist)
    ...(title !== undefined && { title }),
    ...(author !== undefined && { author }),
    ...(category !== undefined && { category }),
    ...(subCategory !== undefined && { subCategory }),
    ...(price !== undefined && { price }),
    ...(discountPercent !== undefined && { discountPercent }),
    ...(stock !== undefined && { stock }),
    ...(slug !== undefined && { slug }),
    ...(description !== undefined && { description }),
    ...(topSeller !== undefined && { topSeller: topSeller === "true" || topSeller === true }),
    ...(recommended !== undefined && { recommended: recommended === "true" || recommended === true }),
    coverImage: finalCoverUrl,
    images: finalImages,
  };

  const updated = await Book.findByIdAndUpdate(id, updatePayload, { new: true });

  return res.status(200).json({
    success: true,
    message: "Book updated successfully",
    data: updated,
  });
});



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
// const getBooks = asyncHandler(async (req, res) => {

//     const { search, category, minPrice, maxPrice, minRating } = req.query;

//     // console.log("typof category", typeof category)

//     const filter = {}


//     if (search) {
//         filter.title = { $regex: search, $options: "i" };
//     }

//     // Category filter
//     if (category) {
//         const categoryArray = Array.isArray(category)
//             ? category
//             : category.split(","); // support CSV or array

//         filter.category = { $in: categoryArray };
//     }

//     if (minPrice || maxPrice) {
//         filter.price = {}
//         if (minPrice) filter.price.$gte = Number(minPrice);
//         if (maxPrice) filter.price.$lte = Number(maxPrice);
//     }

//     if (minRating) {
//         filter.rating = { $gte: Number(minRating) }
//     }



//     const books = await Book.find(filter).populate("author category");

//     res.status(200).json({
//         success: true,
//         books,
//         message: "Book are fetched successfully",

//     });
// })

const getBooks = asyncHandler(async (req, res) => {
    const { search, category, minRating, page = 1, limit = 12 } = req.query;

    const filter = {};

    if (search) {
        filter.title = { $regex: search, $options: "i" }; // case-insensitive
    }

    if (category) {
        const categoryArray = Array.isArray(category) ? category : category.split(",");
        filter.category = { $in: categoryArray };
    }

    if (minRating) {
        filter.rating = { $gte: Number(minRating) };
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Book.countDocuments(filter); // total books matching filter
    const books = await Book.find(filter)
        .populate("author category")
        .skip(skip)
        .limit(Number(limit));

    res.status(200).json({
        success: true,
        books,
        total,
        page: Number(page),
        totalPages: Math.ceil(total / limit),
    });
});
const getTopSellers = asyncHandler(async (_, res) => {

    const books = await Book.find({ topSeller: true }).populate("author category")

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
