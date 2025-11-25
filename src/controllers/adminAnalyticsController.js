import asyncHandler from "express-async-handler";
import { User } from "../models/User.js";
import { Order } from "../models/Order.js";
import { Book } from "../models/Book.js";

const getAdminAnalytics = asyncHandler(async (req, res) => {
    // Total Users
    const totalUsers = await User.countDocuments();

    // Total Orders
    const totalOrders = await Order.countDocuments();

    // All Orders
    const allOrders = await Order.find();

    // Total Income
    const totalIncome = allOrders.reduce((sum, order) => sum + order.totalAmount, 0);

    // Daily Sales
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dailyOrders = await Order.find({
        createdAt: { $gte: today, $lt: tomorrow }
    });

    const dailySales = dailyOrders.reduce((sum, order) => sum + order.totalAmount, 0);

    // Monthly Sales
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const monthlyOrders = await Order.find({
        createdAt: { $gte: startOfMonth, $lt: startOfNextMonth }
    });

    const monthlySales = monthlyOrders.reduce((sum, order) => sum + order.totalAmount, 0);

    // -----------------------------
    // 📌 NEW: 12-MONTH SALES HISTORY
    // -----------------------------
    const monthlySalesHistory = [];

    for (let i = 11; i >= 0; i--) {
        const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

        const ordersInMonth = allOrders.filter(order =>
            order.createdAt >= start && order.createdAt < end
        );

        const total = ordersInMonth.reduce((sum, order) => sum + order.totalAmount, 0);

        monthlySalesHistory.push({
            month: start.toLocaleString("default", { month: "short" }),
            sales: total
        });
    }

    // Best Selling Books
    const booksMap = {};
    allOrders.forEach(order => {
        order.items.forEach(item => {
            if (booksMap[item.bookId]) {
                booksMap[item.bookId] += item.quantity;
            } else {
                booksMap[item.bookId] = item.quantity;
            }
        });
    });

    const bestSellingBooks = Object.entries(booksMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(entry => entry[0]);

    const bestSellingBooksPopulated = await Book.find({
        _id: { $in: bestSellingBooks }
    });

    res.status(200).json({
        success: true,
        analytics: {
            totalUsers,
            totalOrders,
            totalIncome,
            dailySales,
            monthlySales,
            monthlySalesHistory,   // 🔥 New field
            bestSellingBooks: bestSellingBooksPopulated,
        }
    });
});

export { getAdminAnalytics };
