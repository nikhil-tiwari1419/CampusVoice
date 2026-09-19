import express from 'express'
import { authorize, verifyToken } from '../middleware/auth.middelware.js';
import { addBranch, getallComplain, getAllStudent } from '../controller/admin.controller.js';


const router = express.Router();
router.post('/create-batch', verifyToken, authorize('admin'), addBranch)
router.get('/getAllStudent', verifyToken, authorize('admin'), getAllStudent)
router.get('/getallComplain', verifyToken, authorize('admin'), getallComplain)

export default router;
