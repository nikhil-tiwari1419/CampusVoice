import express from 'express'
import { authUser } from '../middleware/auth.middelware.js'
import { UserProfile, getProfile } from '../controller/userProfile.controller.js'


const router = express.Router();
router.patch('/Complet-profile', authUser, UserProfile)
router.get('/get-profile', authUser, getProfile)
export default router


