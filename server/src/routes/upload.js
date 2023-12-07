const express = require('express');
import multer from "multer";
import {  uploadImage, uploadImages, updateImage } from "../controllers/upload"
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";
const router = express.Router();

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "ecommer",
        
    }
});

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now())
//     }
//   })

const upload = multer({ storage: storage });


router.post("/upload", upload.single("images"), uploadImage);
router.post("/uploads", upload.array("images", 5), uploadImages);
router.put("/upload/:publicId", upload.single("images"), updateImage);


export default router;