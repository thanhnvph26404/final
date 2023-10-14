import express from "express"

import { authMiddlware, isAdmin } from "../middleware/checkPermission"
import { getAllUser, getOneUser, logIn, register, removeUser, updateUser, verify } from "../controllers/auth"

const router = express.Router()
router.post( '/register', register )
router.post( '/login', logIn )

router.post( '/verify', verify )
router.get( '/getAllUser', getAllUser )
router.get( '/getOneUser/:id', authMiddlware, isAdmin, getOneUser )
router.delete( '/removeUser/:id', removeUser )
router.put( '/updateUser/:id', authMiddlware, isAdmin, updateUser )






export default router