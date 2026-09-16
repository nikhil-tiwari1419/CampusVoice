import express from "express"
import { verifyToken, authorize } from "../middleware/auth.middelware.js"
import { createAdmin, getAllAdmin, removeAdmin } from "../controller/SuperAdmin.controller.js";
import { createAdminValidationRules } from "../limiter/adminValidationRules.limiter.js";

const router = express.Router();

router.post('/create-admin', verifyToken, authorize("super_admin"),createAdminValidationRules,createAdmin)
router.get('/alladmin', verifyToken, authorize("super_admin"),getAllAdmin)
router.delete('/admin/:id', verifyToken, authorize("super_admin"),removeAdmin)

router.get('/all-sttudent',verifyToken,authorize("admin"),)

export default router;
