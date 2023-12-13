import express, { Router } from "express"
import { findProductsDiscounted, findProductsSoldOverTwenty, productSold, productsbysalesrange } from "../controllers/productDisount";

const router = express.Router();

router.get( "/", findProductsDiscounted );
router.get( "/sold", findProductsSoldOverTwenty );
router.get( "/productsold", productSold );
router.get( "/products-by-sales-range", productsbysalesrange );




export default router;
