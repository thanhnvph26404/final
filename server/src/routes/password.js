import express, { Router } from "express"

import
{
  getSecurityCode,
  resetPassword,
  getCode,
  checkCode,
  changePassword,
} from "../controllers/password";
import { authMiddlware } from "../middleware/checkPermission";


const router = express.Router();

router.post( "/forgot-password", getSecurityCode );
router.post( "/reset-password", resetPassword );

router.post( "/send-code", authMiddlware, getCode );
router.post( "/check-code", checkCode );
router.post( "/change-pass", changePassword );

export default router;