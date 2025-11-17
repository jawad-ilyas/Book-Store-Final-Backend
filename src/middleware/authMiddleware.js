import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User } from "../models/User.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
    // ---- 1. Get token from header or cookies ----
    const token =
        req.headers?.authorization?.split(" ")[1] ||
        req.cookies?.token
    console.log("token", token)
    if (!token) {
        return res.status(401).json({
            message: "No token provided. Authorization denied."
        });
    }

    // ---- 2. Verify token ----
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded?._id) {
        return res.status(401).json({
            message: "Invalid token."
        });
    }

    // ---- 3. Get the user ----
    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
        return res.status(404).json({
            message: "User not found."
        });
    }

    // ---- 4. Attach user to request ----
    req.user = user;

    // IMPORTANT: move to next middleware or controller
    next();
});

export { authMiddleware }
