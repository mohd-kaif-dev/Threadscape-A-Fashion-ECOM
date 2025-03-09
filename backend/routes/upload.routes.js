import express from "express";
import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
import streamifier from "streamifier";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

//Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer setup using memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        // Function to handle the stream upload to Cloudinary
        const streamUpload = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream((error, result) => {
                    if (result) resolve(result);
                    else reject(error);
                });
                // Use streamifier to convert the file buffer to a readable stream
                streamifier.createReadStream(fileBuffer).pipe(stream);
            })
        }
        // Call the streamUpload function with the file buffer
        const result = await streamUpload(req.file.buffer);

        //Response with uplaoded image URL
        res.status(200).json({ imageId: result.public_id, imageURL: result.secure_url });
    } catch (error) {
        console.error("Error in uploadImage controller : ", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
});

router.delete("/:imageId", async (req, res) => {
    try {
        const { imageId } = req.params;
        if (!imageId) return res.status(400).json({ message: "No imageId provided" });

        // Function to handle the stream deletion from Cloudinary
        const streamDelete = (imageId) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.destroy(imageId, (error, result) => {
                    if (result) resolve(result);
                    else reject(error);
                });
            })
        }
        // Call the streamDelete function with the imageId
        const result = await streamDelete(imageId);

        //Response with deleted image URL
        res.status(200).json({ message: "Image deleted successfully", result });
    } catch (error) {
        console.error("Error in deleteImage controller : ", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
});


export default router;
