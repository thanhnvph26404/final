import express from "express";
import { authMiddlware, isAdmin } from "../middleware/checkPermission"

import { create, getAll, getOne, updateProduct } from "../controllers/products";
const router = express.Router();

router.get( "/", getAll );
router.get( "/:id", authMiddlware, isAdmin, getOne );
router.post( "/", authMiddlware, isAdmin, create );
router.put( "/:id", authMiddlware, isAdmin, updateProduct );

export default router;
