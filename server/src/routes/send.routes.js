import express from 'express'
import { authUser } from '../middleware/auth.middelware.js'
import { Writecomplain } from '../controller/complainBox.controller.js'


const router = express.Router();
router.post('/complain', authUser, Writecomplain)
export default router