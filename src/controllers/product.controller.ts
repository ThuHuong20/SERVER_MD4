import productModel from "../models/product.model";
import { Request, Response } from "express";
import { uploadFileToStorage } from '../meobase';
import fs from 'fs';

export default {
    create: async function (req: Request, res: Response) {
        console.log("req", req.body);
        console.log("files", req.files);

        try {
            // Parse the product data from req.body.product
            const productData = JSON.parse(req.body.product);

            // Initialize an empty array to store productPictures URLs
            const productPictures = [];

            // Handle avatar upload if available
            if (req.files && Array.isArray(req.files) && req.files.length > 1) {
                const avatarFile = req.files[0];
                const avatarPath = `products/${avatarFile.filename}`;
                // Read the avatar file into a buffer
                const avatarBuffer = fs.readFileSync(avatarFile.path);
                // Upload avatar to storage
                await uploadFileToStorage(avatarFile, avatarBuffer, avatarPath);

                // Update the newProduct object with the avatar URL
                productData.avatar = avatarPath;

                // Delete the temporary local avatar file
                fs.unlinkSync(avatarFile.path);
            }

            // Handle productPictures upload if available
            if (req.files && Array.isArray(req.files) && req.files.length > 1) {
                for (let i = 1; i < req.files.length; i++) {
                    const pictureFile = req.files[i];
                    const picturePath = `products/${pictureFile.filename}`;

                    // Read the picture file into a buffer
                    const pictureBuffer = fs.readFileSync(pictureFile.path);

                    // Upload product picture to storage
                    await uploadFileToStorage(pictureFile, picturePath, pictureBuffer);

                    // Add the picture URL to the productPictures array
                    productPictures.push(picturePath);

                    // Delete the temporary local picture file
                    fs.unlinkSync(pictureFile.path);
                }
            }

            // Update the newProduct object with productPictures
            productData.productPictures = productPictures;

            console.log("newProduct", productData);

            // Call productModel.create() with the updated productData object
            const modelRes = await productModel.create(productData, productPictures);

            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            // console.error("Error:", err);
            return res.status(500).json({
                message: "Lỗi controller"
            });
        }
    }
}
