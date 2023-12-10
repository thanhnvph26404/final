import express, { Router } from "express"
import { creatComment, getAllComment, updateComment, deleteComment, getOneComment, getCommentbyidproduct } from "../controllers/comment"
const router = express.Router()
router.get( "/", getAllComment )
router.get( "/byidproduct/:id", getCommentbyidproduct )
router.get( "/:id", getOneComment )
router.post( "/", creatComment )
router.put( "/:id", updateComment )
router.delete( "/:id", deleteComment )
export default router