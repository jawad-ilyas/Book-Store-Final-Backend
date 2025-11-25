import asyncHandler from "express-async-handler"
import { Banner } from "../models/BannerModel.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { deleteFromCloudinary } from "../utils/deleteFromCloudinary.js";


const createBanner = asyncHandler(async (req, res) => {
    let heroImageUrl = "";
    let bannerImageUrl = "";

    // heroImage upload
    console.log("req.files?.heroImage?.[0]?.path", req.files?.heroImage?.[0]?.path)
    if (req.files?.heroImage?.[0]?.path) {
        const uploadedHero = await uploadCloudinary(req.files.heroImage[0].path);
        heroImageUrl = uploadedHero?.url || "";
    }

    // bannerImage upload
    if (req.files?.bannerImage?.[0]?.path) {
        const uploadedBanner = await uploadCloudinary(req.files.bannerImage[0].path);
        bannerImageUrl = uploadedBanner?.url || "";
    }

    const banner = await Banner.create({
        ...req.body,
        heroImage: heroImageUrl,
        bannerImage: bannerImageUrl
    });

    res.status(201).json({
        success: true,
        message: "Banner created successfully",
        banner
    });
});

const getAllBanners = asyncHandler(async (req, res) => {

    const banners = await Banner.find();

    res.status(200).json({
        success: true,
        message: "All Banners are Fetched",
        banners
    });

})
const getSingleBanner = asyncHandler(async (req, res) => {

    const banners = await Banner.findOne({ isActive: active });

    res.status(200).json({
        success: true,
        message: "All Banners are Fetched",
        banners
    });

})
const getBanner = asyncHandler(async (req, res) => {
    const { id: bannerId } = req?.params
    console.log("banner id of the banners ", bannerId)
    const bannerData = await Banner.findById(bannerId);

    res.status(200).json({
        success: true,
        message: " Banners are Fetched",
        bannerData
    });

})

const updateBanner = asyncHandler(async (req, res) => {
    const { id: bannerId } = req.params;
    console.log("banner id for the update banner is this ", bannerId)
    const banner = await Banner.findById(bannerId);
    console.log("req?.body for update case ", req?.body)
    if (!banner) {
        return res.status(404).json({
            success: false,
            message: "Banner not found",
        });
    }
    console.log("check banner is already present or not ", banner)

    const bannerData = await Banner.findByIdAndUpdate(
        bannerId,
        { ...req.body },
        { new: true }
    );
    console.log("banner is update and new data after update ", bannerData)
    res.status(200).json({
        success: true,
        message: "Banner updated successfully",
        // banner: updatedBanner
    });
});

const updateHeroImage = asyncHandler(async (req, res) => {
    const heroImageLocalPath = req.file?.path;
    console.log("hero image local path for banner update  case ", heroImageLocalPath)
    const { id: heroId } = req.params;

    if (!heroImageLocalPath) {
        return res.status(400).json({
            success: false,
            message: "Please upload the hero image",
        });
    }

    // check banner exist
    const banner = await Banner.findById(heroId);
    if (!banner) {
        return res.status(404).json({
            success: false,
            message: "Banner not found",
        });
    }

    // --------------------------
    // 🗑️ DELETE OLD HERO IMAGE
    // --------------------------
    if (banner.heroImage) {
        await deleteFromCloudinary(banner.heroImage);
    }

    // --------------------------
    // ☁️ UPLOAD NEW HERO IMAGE
    // --------------------------
    const heroImage = await uploadCloudinary(heroImageLocalPath);
    if (!heroImage?.url) {
        return res.status(500).json({
            success: false,
            message: "Failed to upload hero image",
        });
    }

    // update database
    banner.heroImage = heroImage.url;
    await banner.save();

    return res.status(200).json({
        success: true,
        message: "Hero image updated successfully",
        // heroImage: heroImage.url
    });
});

const updateBannerImage = asyncHandler(async (req, res) => {
    const bannerImageLocalPath = req.file?.path;
    const { id: bannerId } = req.params;

    if (!bannerImageLocalPath) {
        return res.status(400).json({
            success: false,
            message: "Please upload the banner image",
        });
    }

    // check banner exist
    const banner = await Banner.findById(bannerId);
    if (!banner) {
        return res.status(404).json({
            success: false,
            message: "Banner not found",
        });
    }

    // --------------------------
    // 🗑️ DELETE OLD HERO IMAGE
    // --------------------------
    if (banner.bannerImage) {
        await deleteFromCloudinary(banner.bannerImage);
    }

    // --------------------------
    // ☁️ UPLOAD NEW HERO IMAGE
    // --------------------------
    const bannerImage = await uploadCloudinary(bannerImageLocalPath);
    if (!bannerImage?.url) {
        return res.status(500).json({
            success: false,
            message: "Failed to upload banner image",
        });
    }

    // update database
    banner.bannerImage = bannerImage.url;
    await banner.save();

    return res.status(200).json({
        success: true,
        message: "Banner image updated successfully",
        bannerImage: bannerImage.url
    });
});

const deleteBanner = asyncHandler(async (req, res) => {
    const { id: bannerId } = req.params;

    // Find banner
    const banner = await Banner.findById(bannerId);
    if (!banner) {
        return res.status(404).json({
            success: false,
            message: "Banner not found",
        });
    }

    // Delete heroImage if exists
    if (banner.heroImage) {
        await deleteFromCloudinary(banner.heroImage);
    }
    if (banner.bannerImage) {
        await deleteFromCloudinary(banner.bannerImage);
    }

    // Delete all bannerImages if exists (assuming array)
    // if (banner.bannerImage && banner.bannerImage.length > 0) {
    //     for (const imgUrl of banner.bannerImage) {
    //         await deleteFromCloudinary(imgUrl);
    //     }
    // }

    // Delete banner from DB
    await Banner.findByIdAndDelete(bannerId);

    res.status(200).json({
        success: true,
        message: "Banner deleted successfully",
    });
});

export { createBanner, getAllBanners, updateBanner, updateHeroImage, updateBannerImage, deleteBanner, getSingleBanner, getBanner }