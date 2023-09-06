import express from "express"
import { creatVoucher, updateVoucher, checkVoucher, getAll, getOne, remove } from "../controllers/voucher"
import { loginMiddleware } from "../middleware/loginPermission";

const router = express.Router()
router.get("/", getAll);
router.get("/:id", getOne);
router.post("/creatVoucher", creatVoucher),
    router.put("/updateVoucher/:id", updateVoucher)
router.post("/check-voucher", loginMiddleware, checkVoucher);
router.delete("/:id", remove)

export default router;
