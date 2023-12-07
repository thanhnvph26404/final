const express = require('express');
import { creatContact } from "../controllers/contact"
const router = express.Router()
router.post( "/creatContact", creatContact )
export default router