import express from 'express'
import { authorize, verifyToken } from '../middleware/auth.middelware.js';
import { getMyBranchAllCompain, getProfile, UserProfile } from '../controller/user.controller.js';
import { Writecomplain } from '../controller/complainBox.controller.js';
import { checkProfileComplete } from '../middleware/complain.middelware.js';
import { togglevote, getVoteStatus } from '../controller/vote.controller.js';
const router = express.Router();
router.post('/complain', verifyToken, authorize('student'), Writecomplain)
router.get('/getComplain', verifyToken, authorize('student'), checkProfileComplete, getMyBranchAllCompain)
router.patch('/create-profile', verifyToken, authorize('student'), UserProfile)
router.get('/get-profile', verifyToken, authorize('student'), getProfile)


router.post('/complaint/:complaintId/vote', verifyToken, authorize('student'), togglevote);
router.get('/complaint/:complaintId/vote-status', verifyToken, authorize('student'), getVoteStatus);
export default router;
