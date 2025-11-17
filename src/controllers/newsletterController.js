import asyncHandler from "express-async-handler";
import { Newsletter } from "../models/Newsletter.js";

const subscribe = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required"
        });
    }

    const existing = await Newsletter.findOne({ email });

    if (existing) {
        return res.status(409).json({
            success: false,
            message: "Email is already subscribed"
        });
    }

    const newsLetter = await Newsletter.create({ email });

    return res.status(201).json({
        success: true,
        message: "Email subscribed successfully",
        newsLetter
    });
});


const unsubscribe = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required"
        });
    }

    const existing = await Newsletter.findOne({ email });

    if (!existing) {
        return res.status(404).json({
            success: false,
            message: "Email is not subscribed"
        });
    }

    await Newsletter.deleteOne({ email });

    return res.status(200).json({
        success: true,
        message: "Email unsubscribed successfully"
    });
});

export { subscribe, unsubscribe };
