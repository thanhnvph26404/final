import express from "express";

import { create } from "../controller/product";
import { checkPermission } from "../middleware/checkPermission";

const router = express.Router();

router.post("/", checkPermission, create);


export default router;
