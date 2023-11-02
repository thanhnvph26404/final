import express, { Router } from "express"

import { authMiddlware, isAdmin } from "../middleware/checkPermission"
import { BlockUser, getAllUser, getOneUser, getUserByToken, logIn, register, removeUser, editAddressToken, unBlockUser, updateUser, verify, addToCart, emptyCart, updateOderStatus } from "../controllers/auth"

const router = express.Router()
router.post( '/register', register )
router.post( '/login', logIn )
router.post( '/add-to-cart', authMiddlware, addToCart );

router.post( '/verify', verify )
router.put( '/block-user/:id', authMiddlware, isAdmin, BlockUser )
router.put( '/unblock-user/:id', authMiddlware, isAdmin, unBlockUser )
router.put( '/saveaddress', authMiddlware, editAddressToken )
router.get( '/getAllUser', getAllUser )
router.get( '/getOneUser/:id', authMiddlware, isAdmin, getOneUser )
router.delete( '/removeUser/:id', removeUser )
router.post( "/get-user-token", authMiddlware, getUserByToken )
router.put( '/updateUser', authMiddlware, updateUser )
router.delete( "/emptyCart", authMiddlware, emptyCart )
router.put( "/update-order/:id", authMiddlware, isAdmin, updateOderStatus )






export default router