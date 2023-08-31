import express from "express";
import { create, getAll, getOne } from "../controllers/products";
const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", create);
export default router;
