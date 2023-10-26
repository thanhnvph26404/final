import express from "express"
import { authMiddlware, isAdmin } from "../middleware/checkPermission"
import { getAll, create, remove, update ,getOne} from "../controllers/productVariant"
const router = express.Router()
router.get("/", getAll)
router.get( "/:id", getOne )
router.post( "/",create )
router.patch( "/:id", update )
router.delete( "/:id",remove )
export default router