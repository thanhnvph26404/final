import express from "express"

import { getAllUser, getOneUser, register, removeUser, updateUser, verify } from "../controllers/auth"
import { authMiddlware } from "../middleware/checkPermission"

const router = express.Router()
router.post( '/register', register )

router.post( '/verify', verify )
router.get( '/getAllUser', authMiddlware, getAllUser )
router.get( '/getOneUser/:id', getOneUser )
router.delete( '/removeUser/:id', removeUser )
router.put( '/updateUser/:id', updateUser )






export default router