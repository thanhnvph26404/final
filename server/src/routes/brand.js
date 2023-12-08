// const express = require('express');
import express from 'express';
import { authMiddlware, isAdmin } from "../middleware/checkPermission"
import { creatBrand, deleteBrand, getAllBrand, getOneBrand, updateBrand } from "../controllers/brand"
const router = express.Router()
router.get( "/", getAllBrand )
router.get( "/:id", authMiddlware, isAdmin, getOneBrand )
router.post( "/", creatBrand )
router.put( "/:id", authMiddlware, isAdmin, updateBrand )
router.delete( "/:id", authMiddlware, isAdmin, deleteBrand )
export default router