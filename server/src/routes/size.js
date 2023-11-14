import express from "express"
import { getAll, create, update, remove } from "../controllers/size"
const router = express.Router()
router.get( "/", getAll )
router.post( "/", create )
router.patch( "/:id", update )
router.delete( "/:id", remove )
export default router