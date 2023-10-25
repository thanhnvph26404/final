import express, { Router } from "express"

import { authMiddlware, isAdmin } from "../middleware/checkPermission"
import { BlockUser, getAllUser, getOneUser, getUserByToken, logIn, register, removeUser, editAddressToken, unBlockUser, updateUser, verify } from "../controllers/auth"

const router = express.Router()
router.post( '/register', register )
router.post( '/login', logIn )

router.post( '/verify', verify )
router.put( '/block-user/:id', authMiddlware, isAdmin, BlockUser )
router.put( '/unblock-user/:id', authMiddlware, isAdmin, unBlockUser )
router.put( '/saveaddress', authMiddlware, editAddressToken )
router.get( '/getAllUser', getAllUser )
router.get( '/getOneUser/:id', authMiddlware, isAdmin, getOneUser )
router.delete( '/removeUser/:id', removeUser )
router.post( "/get-user-token", authMiddlware, getUserByToken )
router.put( '/updateUser', authMiddlware, updateUser )






export default router