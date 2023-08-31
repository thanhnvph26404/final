import express from "express";
import multer from "multer";
import {  uploadImage } from "../controllers/upload"
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


router.post("/upload", upload.array("images", 10), uploadImage);


export default router;