import express from "express"
import { authMiddlware, isAdmin } from "../middleware/checkPermission"
import { getAll, create, remove, update ,getbyidatribute , getOne } from "../controllers/valueattribute"
const router = express.Router()
router.get("/", getAll)
router.get("/:id", getOne)
router.get("/byidatribute/:id", getbyidatribute )
router.post( "/",create )
router.patch( "/:id", update )
router.delete( "/:id",remove )
export default router