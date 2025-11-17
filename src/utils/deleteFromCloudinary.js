import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config(); // ✅ ensures env variables available here too


console.log('====================================');
console.log("process.env.CLOUDINARY_API_KEY,", process.env.CLOUDINARY_API_KEY);
console.log("process.env.CLOUDINARY_SECRET_KEY,", process.env.CLOUDINARY_SECRET_KEY);
console.log('====================================');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// delete old image
const deleteFromCloudinary = async (url) => {
    if (!url) return;

    const publicId = url.split("/").pop().split(".")[0]; // extract public_id
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.log("Cloudinary delete error:", error);
    }
};
export { deleteFromCloudinary }