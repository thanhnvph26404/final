import express from "express"
import { creatComment, getAllComment, updateComment, deleteComment, getOneComment } from "../controllers/comment"
const router = express.Router()
router.get("/", getAllComment)
router.get("/:id", getOneComment)

router.post("/", creatComment)
router.put("/:id", updateComment)
router.delete("/:id", deleteComment)
export default router