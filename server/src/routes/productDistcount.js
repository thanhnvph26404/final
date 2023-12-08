import express, { Router } from "express"
import { findProductsDiscounted, findProductsSoldOverTwenty } from "../controllers/productDisount";

const router = express.Router();

router.get( "/", findProductsDiscounted );
router.get( "/sold", findProductsSoldOverTwenty );


export default router;
