import express from 'express'
import { 
    registerUser, 
    verifyEmail, 
    login, 
    logOut, 
    forgotPassword, 
    resetPassword, 
    IsAuth, 
    refreshAccessToken }  from '../controller/auth.controller.js'
    
import { verifyToken, authorize } from '../middleware/auth.middelware.js'
import limiter from '../limiter/auth.limiter.js'
import { registerUserValidationRules } from '../limiter/adminValidationRules.limiter.js'

const router = express.Router();
router.post('/register', limiter.registerLimiter, registerUserValidationRules, registerUser)
router.post('/verify-email', limiter.otpLimiter, verifyEmail)
router.post('/login', limiter.loginLimiter, login)
router.post('/logout', logOut)
router.post('/forgot-pass', limiter.forgotLimiter, forgotPassword)
router.post('/reset-pass', limiter.otpLimiter, resetPassword)
router.get('/is-auth', verifyToken, authorize("user", "admin", "super_admin"), IsAuth)
router.post('/refresh-token', refreshAccessToken)

export default router;

