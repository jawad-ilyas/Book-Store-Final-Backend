import asyncHandler from "express-async-handler"
import bcrypt from "bcrypt"
import { User } from "../models/User.js";
import jwt from "jsonwebtoken"

const generateAccessAndRefreshToken = asyncHandler(async (id, email, role) => {


    const accessToken = jwt.sign(
        {
            _id: id,
            email,
            role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
    const refreshToken = jwt.sign(
        {
            _id: id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )

    return { accessToken, refreshToken }



}


)
const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password, role = 'user' } = req?.body;

    if (!email || !name || !password) {
        return res.status(400).json({ message: "All fields are required", success: false });
    }

    const isUserExisted = await User.findOne({ email });
    if (isUserExisted) {
        return res.status(409).json({ message: "User already exists", success: false });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashPassword,
        role
    });

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id, user.email, user.role);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    const newUser = await User.findById(user._id).select("-password -refreshToken");

    res.status(201).json({
        message: "New user created successfully",
        success: true,
        user: newUser,
        accessToken
    });
});
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req?.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found", success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Incorrect password", success: false });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id, user.email, user.role);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // const { password: pwd, refreshToken: rToken, ...safeUser } = user.toObject();
    const { password: pwd, refreshToken: rToken, ...safeUser } = user.toObject();
    res.status(200).json({
        message: "User logged in successfully",
        success: true,
        user: safeUser,
        accessToken
    });
});
const updateUserProfile = asyncHandler(async (req, res) => {

    const id = req.params || req.user?._id;


    const user = await User.findByIdAndUpdate(id, { ...req.body }, { new: true });

    if (!user) {
        return res.status(404).json({ message: "User not found", success: false });
    }

    const { password: psd, refreshToken: rToken, ...safeUser } = user.toObject();
    res.status(200).json({
        message: "User is Updated Succesfully",
        success: true,
        user: safeUser,
    });
})
const changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ success: false, message: "Both current and new password are required" });
    }

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, req.user.password);
    if (!isMatch) {
        return res.status(401).json({ success: false, message: "Current password is incorrect" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update and save
    req.user.password = hashedPassword;
    await req.user.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Password updated successfully"
    });
});
const getUserProfile = asyncHandler(async (req, res) => {



    const userId = req.use._id


    const user = await User.findById(userId)

    const { password: psd, refreshToken: rftoken, ...safeUser } = user.toObject();

    res.status(200).json({
        message: "User is fetched Succesfully",
        success: true,
        user: safeUser,
    });

})
export { registerUser, loginUser, updateUserProfile, changePassword, getUserProfile }