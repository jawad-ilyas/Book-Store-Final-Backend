import asyncHandler from "express-async-handler"
import { Address } from "../models/Address.js"

const getAddresses = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const addresses = await Address.find({ userId });

    res.status(200).json({
        success: true,
        message: "Addresses fetched successfully",
        addresses
    });
});
const createAddress = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { isDefault } = req.body;

    if (isDefault) {
        // Reset default flag for all other addresses of this user
        await Address.updateMany({ userId }, { $set: { isDefault: false } });
    }

    const address = await Address.create({
        ...req.body,
        userId
    });

    res.status(201).json({
        success: true,
        message: "Address created successfully",
        address
    });
});
const deleteAddress = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deleted = await Address.findByIdAndDelete(id);

    if (!deleted) throw new Error("Address not found");

    res.status(200).json({
        success: true,
        message: "Address deleted successfully"
    });
});
// const updateAddress = asyncHandler(async (req, res) => {
//     const { id: addressId } = req.params;
//     const { isDefault } = req.body;

//     const address = await Address.findById(addressId);
//     if (!address) throw new Error("Address not found");

//     if (isDefault) {
//         await Address.updateMany({ userId: address.userId }, { $set: { isDefault: false } });
//     }

//     Object.assign(address, req.body);
//     await address.save();

//     res.status(200).json({
//         success: true,
//         message: "Address updated successfully",
//         address
//     });
// });
const updateAddress = asyncHandler(async (req, res) => {
    const { id: addressId } = req.params;
    const { isDefault, ...rest } = req.body;

    // If this address is set to default, reset others
    if (isDefault) {
        const address = await Address.findById(addressId);
        if (!address) {
            return res.status(404).json({ success: false, message: "Address not found" });
        }

        await Address.updateMany(
            { userId: address.userId },
            { $set: { isDefault: false } }
        );
    }

    // Update the address
    const updatedAddress = await Address.findByIdAndUpdate(
        addressId,
        { ...rest, ...(isDefault && { isDefault: true }) },
        { new: true }
    );

    if (!updatedAddress) {
        return res.status(404).json({ success: false, message: "Address not found" });
    }

    res.status(200).json({
        success: true,
        message: "Address updated successfully",
        address: updatedAddress
    });
});

export { createAddress, deleteAddress, getAddresses, updateAddress }