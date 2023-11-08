import express from "express"
import { creatVoucher, updateVoucher, checkVoucher, getAll, getOne, remove } from "../controllers/voucher"
import { loginMiddleware } from "../middleware/loginPermission";

const router = express.Router()
router.get("/", getAll);
router.get("/:id", getOne);
router.post("/createVoucher", creatVoucher),
router.put("/:id", updateVoucher)
router.post("/check-voucher", loginMiddleware, checkVoucher);
router.delete("/:id", remove)

export default router;
