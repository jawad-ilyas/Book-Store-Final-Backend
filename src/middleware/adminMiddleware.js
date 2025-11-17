// import jwt from "jsonwebtoken";
// import asyncHandler from "express-async-handler";
// import { User } from "../models/User.js";

// const adminMiddleware = asyncHandler(async (req, res, next) => {

//     // 1. Get token
//     const token =
//         req.cookies?.token ||
//         (req.headers.authorization?.startsWith("Bearer") &&
//             req.headers.authorization.split(" ")[1]);

//     if (!token) {
//         return res.status(401).json({ message: "No token. Authorization denied." });
//     }

//     // 2. Verify token
//     let decoded;
//     try {
//         decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     } catch (err) {
//         return res.status(401).json({ message: "Invalid token." });
//     }

//     // 3. Find user
//     const admin = await User.findById(decoded._id).select("-password");

//     if (!admin) {
//         return res.status(404).json({ message: "Admin not found." });
//     }

//     // 4. Check role
//     if (admin.role !== "admin") {
//         return res.status(403).json({ message: "Access denied. Admin only." });
//     }

//     // 5. Store admin on request
//     req.admin = admin;

//     // 6. Continue
//     next();
// });


// export { adminMiddleware }


import asyncHandler from "express-async-handler";

const adminMiddleware = asyncHandler(async (req, res, next) => {

    // authMiddleware must run before this
    if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admin only." });
    }

    next();
});

export { adminMiddleware };
