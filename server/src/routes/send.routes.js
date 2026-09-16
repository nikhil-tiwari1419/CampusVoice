import express from 'express'
import { verifyToken, authorize } from '../middleware/auth.middelware.js'
import { Writecomplain } from '../controller/complainBox.controller.js'


const router = express.Router();
router.post('/complain', verifyToken, authorize, Writecomplain)
export default router
