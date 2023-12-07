const express = require('express');
import { authMiddlware, isAdmin } from "../middleware/checkPermission"

import { create, getAll, getCategoryProduct, getOne, remove, update } from "../controllers/categories";



const router = express.Router();

router.get( "/", getAll );
router.get( "/:id", getOne );
router.post( "/", create );
router.patch( "/:id", update );
router.delete( "/:id", remove );
router.get( "/getproduct/:id", getCategoryProduct )

export default router;