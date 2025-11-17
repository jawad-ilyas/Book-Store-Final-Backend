import { User } from "../models/User.js";
import { Book } from "../models/Book.js";
import asyncHandler from "express-async-handler";
import { Wishlist } from "../models/WhishList.js";
import { CartModel } from "../models/CartModel.js";



const addToWishlist = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { books } = req.body;

    if (!books || !Array.isArray(books) || books.length === 0) {
            return res.status(400).json({ message: "Books are required", success: false });
    }

    // Validate all books exist
    const validBooks = await Book.find({ _id: { $in: books } });
    if (validBooks.length !== books.length) {
        return res.status(409).json({ message: "Some Books are invalid", success: false });
    }

    // Add books to wishlist using $addToSet and $each (upsert if wishlist doesn't exist)
    await Wishlist.updateOne(
        { userId },
        { $addToSet: { books: { $each: books } } },
        { upsert: true }
    );
    // const wishlist = await Wishlist.findById(userId)
    // if (!wishlist) {
    //     await wishlist.create({ userId, books: [{ bookId }] })
    // } else {
    //     wishlist.books.push({ bookId })
    // }
    // await wishlist.save();
    // Get the updated wishlist to return
    const updatedWishlist = await Wishlist.findOne({ userId }).populate("books");

    res.status(200).json({
        message: "Books added to wishlist successfully",
        success: true,
        wishlist: updatedWishlist
    });
});

const removeFromWishlist = asyncHandler(async (req, res) => {
    const userId = req.user._id

    const { books } = req.body

    if (!books || !Array.isArray(books) || books.length === 0) {
        return res.status(400).json({ message: "Books are required ", success: false });
    }

    //  lets validate all the books
    const validBooks = await Book.find({ _id: { $in: books } })

    if (books.length !== validBooks.length) {
        return res.status(409).json({ message: "Some Books are invalid ", success: false });
    }

    const wishlist = await Wishlist.findOne({ userId })

    if (!wishlist) {
        return res.status(404).json({ message: "Wishlist not found", success: false });

    }


    wishlist.books = wishlist.books.filter(
        (bookId) => !books.includes(bookId.toString())
    )

    await wishlist.save();


    res.status(200).json({
        message: "Books removed from wishlist successfully",
        success: true,
        wishlist
    });

})

const addToCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { bookId, quantity = 1 } = req.body;

    if (!bookId || quantity <= 0) {
        return res.status(400).json({ message: "Book and quantity are required", success: false });
    }

    // Find existing cart
    let cart = await CartModel.findOne({ userId });

    if (!cart) {
        // Create new cart if not exist
        cart = await CartModel.create({
            userId,
            items: [{ bookId, quantity }]
        });
    } else {
        // Check if book already exists in cart
        const itemIndex = cart.items.findIndex(item => item.bookId.toString() === bookId);

        if (itemIndex > -1) {
            // Increment quantity
            cart.items[itemIndex].quantity += quantity;
        } else {
            // Add new item
            cart.items.push({ bookId, quantity });
        }

        await cart.save();
    }

    // Return updated cart with populated book details
    const updatedCart = await CartModel.findOne({ userId }).populate("items.bookId");

    res.status(200).json({
        message: "Book added to cart successfully",
        success: true,
        cart: updatedCart
    });
});

const removeFromCart = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    const { bookId, quantity = 1 } = req.body;

    if (!bookId || quantity <= 0) {
        return res.status(400).json({
            message: "Book and quantity are required",
            success: false
        });
    }

    // Get the cart
    let cart = await CartModel.findOne({ userId });

    if (!cart) {
        return res.status(404).json({
            message: "Cart not found",
            success: false
        });
    }

    // Find index of book inside cart
    const itemIndex = cart.items.findIndex(
        item => item.bookId.toString() === bookId
    );

    if (itemIndex === -1) {
        return res.status(404).json({
            message: "Book not found in cart",
            success: false
        });
    }

    // If more quantity exists → subtract
    if (cart.items[itemIndex].quantity > quantity) {
        cart.items[itemIndex].quantity -= quantity;
    } else {
        // If quantity becomes 0 or less → remove item
        cart.items.splice(itemIndex, 1);
    }

    // Save cart
    await cart.save();

    // Get updated cart and populate books
    const updatedCart = await CartModel.findOne({ userId })
        .populate("items.bookId");

    res.status(200).json({
        message: "Item removed from cart successfully",
        success: true,
        cart: updatedCart
    });
});
 const updateCartItem = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { bookId, quantity } = req.body;

    // Validate inputs
    if (!bookId || !quantity || quantity < 0) {
        return res.status(400).json({
            success: false,
            message: "bookId and valid quantity are required",
        });
    }

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book not found",
        });
    }

    // Get user's cart
    let cart = await CartModel.findOne({ userId });
    if (!cart) {
        return res.status(404).json({
            success: false,
            message: "Cart not found",
        });
    }

    // Find item in cart
    const itemIndex = cart.items.findIndex(
        (item) => item.book.toString() === bookId
    );

    if (itemIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Book not found in cart",
        });
    }

    // If quantity is 0 → remove the item
    if (quantity === 0) {
        cart.items.splice(itemIndex, 1);
    } else {
        // Update quantity
        cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();

    res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        cart,
    });
});

export { addToWishlist, removeFromWishlist, addToCart, removeFromCart  ,updateCartItem}