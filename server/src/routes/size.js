const express = require('express');
import { getAll, create, update, remove, getOne } from "../controllers/size"
const router = express.Router()
router.get("/", getAll)
router.get("/:id", getOne)
router.post( "/", create )
router.put( "/:id", update )
router.delete( "/:id", remove )
export default router