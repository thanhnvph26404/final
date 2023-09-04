import express from "express"
import { creatVoucher, updateVoucher } from "../controllers/voucher"
const router = express.Router()
router.post( "/creatVoucher", creatVoucher ),
    router.put( "/updateVoucher/:id", updateVoucher )

export default router