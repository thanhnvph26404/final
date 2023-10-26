import express from "express"
import { authMiddlware, isAdmin } from "../middleware/checkPermission"
import { getAll, create, remove, update } from "../controllers/attribute"
const router = express.Router()
router.get( "/", getAll )
router.post( "/",create )
router.patch( "/:id", update )
router.delete( "/:id",remove )
export default router