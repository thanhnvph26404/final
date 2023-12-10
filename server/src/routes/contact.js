import express, { Router } from "express"
import { creatContact } from "../controllers/contact"
const router = express.Router()
router.post( "/creatContact", creatContact )
export default router