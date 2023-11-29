import express from "express";
import { authMiddlware, isAdmin } from "../middleware/checkPermission"

import { create, getAll, getOne, remove, updateProduct } from "../controllers/products";
const router = express.Router();

router.get( "/", getAll );
router.get( "/:id", getOne );
router.post( "/", create );
router.put( "/:id", updateProduct );
router.delete( "/:id", remove );

export default router;
