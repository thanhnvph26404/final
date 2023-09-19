import express from "express"
import { authMiddlware, isAdmin } from "../middleware/checkPermission"
import { getAll, getOne, create, remove, update } from "../controllers/size"
const router = express.Router()
router.get("/", getAll)
router.get("/:id", authMiddlware, isAdmin, getOne)
router.post("/", authMiddlware, isAdmin, create)
router.patch("/:id", authMiddlware, isAdmin, update)
router.delete("/:id", authMiddlware, isAdmin, remove)
export default router