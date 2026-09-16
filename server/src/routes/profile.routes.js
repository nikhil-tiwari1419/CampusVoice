import express from 'express'
import { verifyToken, authorize } from '../middleware/auth.middelware.js'
import { UserProfile, getProfile } from '../controller/userProfile.controller.js'
import { getMyBranchAllCompain } from '../controller/allcomplain.controller.js';


const router = express.Router();
router.patch('/Complet-profile', verifyToken, authorize("user"), UserProfile)
router.get('/get-profile', verifyToken, authorize('user'), getProfile)
router.get('/batchViceComplain', verifyToken, authorize('user'), getMyBranchAllCompain)
export default router


