import express from 'express'
import authRouter from '../controller/auth.controller.js'
import { authUser } from '../middleware/auth.middelware.js'
import limiter from '../limiter/auth.limiter.js'
import validationRules from '../middleware/validation.middelware.js'

const router = express.Router();
router.post('/register', limiter.registerLimiter, validationRules.registerUserValidationRules, authRouter.registerUser)
router.post('/verify-email', authRouter.verifyEmail)
router.post('/login', limiter.loginLimiter, authRouter.login)
router.post('/logout', authRouter.logOut)
router.post('/forgot-pass', limiter.forgotLimiter, authRouter.forgotPassword)
router.post('/reset-pass', limiter.otpLimiter, authRouter.resetPassword)
router.get('/is-auth', authUser, authRouter.IsAuth)
router.post('/refresh-token', authRouter.refreshAccessToken)

export default router;

