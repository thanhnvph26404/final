import express from "express"
import { creatVoucher, updateVoucher,checkVoucher } from "../controllers/voucher"
import { loginMiddleware } from "../middleware/loginPermission";

const router = express.Router()
router.post( "/creatVoucher", creatVoucher ),
router.put( "/updateVoucher/:id", updateVoucher )
router.post("/check-voucher", loginMiddleware, checkVoucher);

export default router;
