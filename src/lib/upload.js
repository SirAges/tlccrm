import { v2 as cloudinary } from "cloudinary";

export const uploadFile = async path => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_API_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    if (!path) {
        return "Image path is required";
    }

    try {
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            timeout: 60000,
            transformation: [{ width: 1000, height: 752, crop: "scale" }]
        };

        const result = await cloudinary.uploader.upload(path, options);
console.log(result)
        return result;
    } catch (error) {
        console.log(error);
        return "Failed to upload file on Cloudinary" + error;
    }
};
