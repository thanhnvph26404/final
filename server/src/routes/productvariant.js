import express from "express"
import { authMiddlware, isAdmin } from "../middleware/checkPermission"
import { getAll, create, remove, update } from "../controllers/productVariant"
const router = express.Router()
router.get( "/", getAll )
router.post( "/",create )
router.patch( "/:id", update )
router.delete( "/:id", authMiddlware, isAdmin,remove )
export default router