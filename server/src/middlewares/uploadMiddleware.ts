import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

// Configure storage for Multer to upload files to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "feed_posts", // Cloudinary folder where files will be stored
      format: "png", // Optional: specify file format (e.g., "jpeg" or "png")
      public_id: `${Date.now()}-${file.originalname}`, // Optional: set a unique public_id
    };
  },
});

const upload = multer({ storage });

export default upload;
