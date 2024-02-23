

import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

const uploadImageToCloudinary = async (image,folder = '') => {
    if (!image) {
        throw new Error("Image File Not Detected")
    }
    try {
        const result = await cloudinary.uploader.upload(image, {
            folder: "IT-EXPERTS" + folder,
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            timeout: 1200000,
            resource_type: 'auto'
        });
        return result;
    } catch (error) {
      throw new Error(error)
    }
};


export { uploadImageToCloudinary };