// const express = require('express');
import express from 'express';
import { create, getAll, update, remove, getOne } from "../controllers/color"
const router = express.Router()
router.get( "/", getAll )
router.get( "/:id", getOne )

router.post( "/", create )
router.put( "/:id", update )
router.delete( "/:id", remove )
export default router